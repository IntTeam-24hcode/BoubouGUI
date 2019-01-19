import paho.mqtt.client as mqtt
import time
from random import random, sample
import json

laumios = set()
selec = -1
selected = set()
isPlaying = False
answer = None

def on_message(client, userdata, msg):
	global selec, answer, isPlaying, lampes, selected
	s = str(msg.payload)[2:-1]
	if msg.topic == "laumio/status/advertise":
		if s != "discover" and (s not in laumios):
			laumios.add(s)
	elif isPlaying and msg.topic.startswith("remote/") and msg.topic.endswith("/state"):
		if s == "ON":
			i = int(msg.topic[7])
			if selec == i:
				answer = i
			elif i not in selected:
				if selec != -1:
					client.publish("laumio/{}/json".format(lampes[selec]), json.dumps(comBlack))
				selec = i
				client.publish("laumio/{}/json".format(lampes[i]), json.dumps(comBlue))

client = mqtt.Client()
client.on_message = on_message
client.connect("mpd.lan")
lampes = ["Laumio_1D9486", "Laumio_104A13", "Laumio_0FBFBF", "Laumio_104F03", "Laumio_10508F", "Laumio_10805F",  "Laumio_CD0522", "Laumio_0FC168", "Laumio_D454DB", "Laumio_107DA8"]

comBlue= { 'command' : 'fill', 'rgb' :[255,255,0]}
client.publish('laumio/'+lampes[6]+'/json', json.dumps(comBlue))
client.loop_start()
