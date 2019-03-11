import time
import paho.mqtt.client as mqtt
import time
import json
import requests

Connected = False   #global variable for the state of the connection

def on_message(client, userdata, msg):
    s = str(msg.payload)[2:-1]
    print(msg.topic, s)
    if msg.topic == "capteur_bp/binary_sensor/bp1/state":
        if s == 'ON':
            requests.get("http://192.168.74.186:8080/json.htm?type=command&param=switchlight&idx=2&switchcmd=On")
        else:
            requests.get("http://192.168.74.186:8080/json.htm?type=command&param=switchlight&idx=2&switchcmd=Off")
    else:
        print("Not traited:", msg.topic, s)


def on_connect(client, userdata, flags, rc):
 
    if rc == 0:
 
        print("Connected to broker")
 
        global Connected                #Use global variable
        Connected = True                #Signal connection 
 
    else:
 
        print("Connection failed")

client = mqtt.Client()
client.on_message = on_message
broker_address= "localhost"  #Broker address
port = 1883                         #Broker port
client.on_connect= on_connect   
client.connect(broker_address)    
client.subscribe("capteur_bp/binary_sensor/bp1/state")

client.loop_start()  


while Connected != True:    #Wait for connection
    time.sleep(0.1)



client.loop_forever()