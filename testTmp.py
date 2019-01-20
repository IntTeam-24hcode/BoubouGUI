
import paho.mqtt.client as mqtt
import time
import json
from anim import *import time

laumios = set()
needLEDState = [False] * 5
LEDState = [None] * 5
funBP = [None] * 5

def on_message(client, userdata, msg):
	global needLEDState, laumios
	s = str(msg.payload)[2:-1]
	print(msg.topic, s)
	if msg.topic == "laumio/status/advertise":
		if s != "discover" and (s not in laumios):
			laumios.add(s)
	elif msg.topic.startswith("capteur_bp/switch/led") and msg.topic.endswith("/state"):
		i = int(msg.topic[len("capteur_bp/switch/led")])
		LEDState[i] = s
		needLEDState[i] = False
	elif msg.topic.startswith("capteur_bp/binary_sensor/bp") and msg.topic.endswith("/state"):
		i = int(msg.topic[len("capteur_bp/binary_sensor/bp")])
		if funBP[i] != None:
			funBP[i](client, s)
	else:
		print("Not traited:", msg.topic, s)

def getLEDState(client, i):
	needLEDState[i] = True
	client.subscribe("capteur_bp/switch/led{}/state".format(i))
	while needLEDState[i]:
		time.sleep(0.02)
	return LEDState[i]

client = mqtt.Client()
client.on_message = on_message
#client.connect("mpd.lan")
client.subscribe("laumio/status/advertise")
for i in range(1, 5):
      client.subscribe("capteur_bp/binary_sensor/bp{}/state".format(i))
client.loop_start()
client.publish("laumio/all/discover")
lampes = ["Laumio_1D9486", "Laumio_104A13", "Laumio_0FBFBF", "Laumio_104F03", "Laumio_10508F", "Laumio_10805F",  "Laumio_CD0522", "Laumio_0FC168", "Laumio_D454DB", "Laumio_107DA8"]

def fun(client, s):
  	com = { 'command' : 'fill', 'rgb' :null}
  	client.publish('laumio/all/json', json.dumps(com))
funBP[1] = fun
if True:
  com = { 'command' : 'fill', 'rgb' :null}
  client.publish('laumio/'+lampes[0]+'/json', json.dumps(com))

time.sleep(10)
