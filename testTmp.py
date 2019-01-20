import paho.mqtt.client as mqtt
import time
from random import random, sample
import json
from anim import *
from comm import *

client = mqtt.Client()
client.on_message = on_message
client.connect("mpd.lan")
client.subscribe("laumio/status/advertise")
client.loop_start()
client.publish("laumio/all/discover")
lampes = ["Laumio_1D9486", "Laumio_104A13", "Laumio_0FBFBF", "Laumio_104F03", "Laumio_10508F", "Laumio_10805F",  "Laumio_CD0522", "Laumio_0FC168", "Laumio_D454DB", "Laumio_107DA8"]

comBlue= { 'command' : 'fill', 'rgb' :[255,255,51]}
client.publish('laumio/{}/json'.format(lampes[0]), json.dumps(comBlue))
comBlue= { 'command' : 'fill', 'rgb' :[255,255,255]}
client.publish('laumio/{}/json'.format(lampes[0]), json.dumps(comBlue))
if getLEDState(client,1) == 'ON':
  comBlue= { 'command' : 'fill', 'rgb' :[51,255,51]}
  client.publish('laumio/{}/json'.format(lampes[0]), json.dumps(comBlue))
  print("on")
else:
  comBlue= { 'command' : 'fill', 'rgb' :[204,0,0]}
  client.publish('laumio/'+lampes[0]+'/json', json.dumps(comBlue))
  print("off")

time.sleep(1)