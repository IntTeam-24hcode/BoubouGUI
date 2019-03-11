from tkinter import *
import json
from random import *
import time
import paho.mqtt.client as mqtt



laumios = set()
needLEDState = [False] * 4
LEDState = [None] * 4
funBP = [None] * 4
telecPresence = None
temperature = None
humidite = None


fenetre = Tk()
canvas = Canvas(fenetre, width = 300, height = 300)

lampe_1 = canvas.create_rectangle(0,0,100,100, fill = "yellow")
lampe_2 = canvas.create_rectangle(100,0,200,100, fill = "yellow")
lampe_3 = canvas.create_rectangle(200,0,300,100, fill = "yellow")
lampe_4 = canvas.create_rectangle(0,100,100,200, fill = "yellow")
lampe_5 = canvas.create_rectangle(100,100,200,200, fill = "yellow")
lampe_6 = canvas.create_rectangle(200,100,300,200, fill = "yellow")
lampe_7 = canvas.create_rectangle(0,200,100,300, fill = "yellow")
lampe_8 = canvas.create_rectangle(100,200,200,300, fill = "yellow")
lampe_9 = canvas.create_rectangle(200,200,300,300, fill = "yellow")

canvas.pack()

def modifier_lampe(lampe, message) :
    message_decode = json.loads(message)
    commande = message_decode["command"]
    if commande == "set_pixel" :
        couleur = "#%02x%02x%02x" % (message_decode["rgb"][0], message_decode["rgb"][1], message_decode["rgb"][2])
        canvas.itemconfig(match_lampes[lampe], fill=couleur)
    elif commande == "set_wipe" :
        couleur = "#%02x%02x%02x" % (message_decode["rgb"][0], message_decode["rgb"][1], message_decode["rgb"][2])
        canvas.itemconfig(match_lampes[lampe], fill=couleur)
    elif commande == "animate_rainbow" :
        for i in range(20) :
            couleur = "#%02x%02x%02x" % (randint(0,255), randint(0,255), randint(0,255))
            canvas.itemconfig(match_lampes[lampe], fill=couleur)
            time.sleep(0.02)
    elif commande == "fill" :
        couleur = "#%02x%02x%02x" % (message_decode["rgb"][0], message_decode["rgb"][1], message_decode["rgb"][2])
        for lampe_p in lampes :
            canvas.itemconfig(match_lampes[lampe_p], fill=couleur)
    else:
        print("Comprends pas Bro")

Connected = False

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        global Connected
        Connected = True
    else:
        print("Connection failed")

def on_message(client, userdata, msg):
    s = str(msg.payload)[2:-1]
    print(msg.topic, s)
    if msg.topic == "laumio/status/advertise":
    	if s != "discover" and (s not in laumios):
    	    laumios.add(s)
    elif msg.topic.startswith("laumio/all") :
        for lampe in lampes :
            modifier_lampe(lampe, s)
    elif msg.topic.startswith("capteur_bp/switch/led") and msg.topic.endswith("/state"):
    	i = int(msg.topic[len("capteur_bp/switch/led")])
    	LEDState[i] = s
    	needLEDState[i] = False
    elif msg.topic.startswith("capteur_bp/binary_sensor/bp") and msg.topic.endswith("/state"):
    	i = int(msg.topic[len("capteur_bp/binary_sensor/bp")])
    	if funBP[i] != None:
    	    funBP[i](client, s)
    elif msg.topic == "presence/state" :
        telecPresence = s
    elif msg.topic == "atmosphere/temperature" :
        temperature = s
    elif msg.topic == "atmosphere/humidite" :
        humidite = s
    else:
    	print("Not traited:", msg.topic, s)

client = mqtt.Client()
client.on_message = on_message
broker_address= "localhost"  #Broker address
port = 1883                         #Broker port
client.on_connect= on_connect
client.connect(broker_address)

client.loop_start()  
while Connected != True:    #Wait for connection
    time.sleep(0.1)

client.subscribe("laumio/status/advertise")

for i in range(1, 5):
    client.subscribe("capteur_bp/binary_sensor/bp{}/state".format(i))

client.publish("laumio/all/discover")
lampes = ["Laumio_1D9486", "Laumio_104A13", "Laumio_0FBFBF", "Laumio_104F03", "Laumio_10508F", "Laumio_10805F",  "Laumio_CD0522", "Laumio_0FC168", "Laumio_D454DB"]
commandes = ["set_pixel", "set_wipe", "animate_rainbow", "fill"]
match_lampes = {"Laumio_1D9486" : lampe_1, "Laumio_104A13" : lampe_2, "Laumio_0FBFBF" : lampe_3, "Laumio_104F03" : lampe_4, "Laumio_10508F" : lampe_5, "Laumio_10805F" : lampe_6,  "Laumio_CD0522" : lampe_7, "Laumio_0FC168" : lampe_8, "Laumio_D454DB" : lampe_9}

for i in range(4) :
    needLEDState[i] = True
    client.subscribe("capteur_bp/switch/led{}/state".format(i))
    print("capteur_bp/switch/led{}/state".format(i))
    while not needLEDState[i]:
	    time.sleep(0.02)

client.subscribe("presence/state")

client.subscribe("atmosphere/temperature")

client.subscribe("atmosphere/humidite")

for lampe in lampes :
    client.subscribe("laumio/"+lampe+"/json")
client.subscribe("laumio/all/json")

fenetre.mainloop()