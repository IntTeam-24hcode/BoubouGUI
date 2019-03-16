from flask import Flask
from flask import request
import time
import paho.mqtt.client as mqtt
import time
import json
#from anim import *


app = Flask(__name__)
Connected = False   #global variable for the state of the connection
 
laumios = set()
needLEDState = [False] * 4
LEDState = [None] * 4
funBP = [None] * 4
temp = 0

def on_connect(client, userdata, flags, rc):
 
    if rc == 0:
 
        print("Connected to broker")
 
        global Connected                #Use global variable
        Connected = True                #Signal connection 
 
    else:
 
        print("Connection failed")

def on_message(client, userdata, msg):
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
	elif msg.topic == "atmosphere/temperature":
		global temp
		temp = int(s)
	else:
		print("Not traited:", msg.topic, s)

client = mqtt.Client()
broker_address= "localhost"  #Broker address
port = 1883                         #Broker port
client.on_connect= on_connect   

client.on_message = on_message
client.connect(broker_address)    

client.loop_start()  
while Connected != True:    #Wait for connection
    time.sleep(0.1)

def getLEDState( i):
	needLEDState[i] = True
	client.subscribe("capteur_bp/switch/led{}/state".format(i))
	print("capteur_bp/switch/led{}/state".format(i))
	while not needLEDState[i]:
		time.sleep(0.02)
	return LEDState[i]
			


client.subscribe("laumio/status/advertise")
client.subscribe("atmosphere/temperature")
for i in range(1, 5):
	client.subscribe("capteur_bp/binary_sensor/bp{}/state".format(i))

client.publish("laumio/all/discover")
lampes = ["Laumio_1D9486", "Laumio_104A13", "Laumio_0FBFBF", "Laumio_104F03", "Laumio_10508F", "Laumio_10805F",  "Laumio_CD0522", "Laumio_0FC168", "Laumio_D454DB", "Laumio_107DA8"]


for i in range(4):			
	print(getLEDState(i))


def launch( code):
	exec(code)

@app.route('/output', methods = ['POST'])
def get_post_javascript_data():
	
	jsdata = request.data
	launch(jsdata)
	return "{'statut': 'OK'}", 201

if __name__ == "__main__":
	app.run()