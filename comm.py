import time

laumios = set()
needLEDState = [False] * 5
LEDState = [None] * 5

def on_message(client, userdata, msg):
	global needLEDState
	s = str(msg.payload)[2:-1]
	if msg.topic == "laumio/status/advertise":
		if s != "discover" and (s not in laumios):
			laumios.add(s)
	elif msg.topic.startswith("capteur_bp/switch/led") and msg.topic.endswith("/state"):
		i = msg.topic[len("capteur_bp/switch/led")]
		LEDState[i] = s
		needLEDState[i] = False

def getLEDState(client, i):
	client.subscribe("capteur_bp/switch/led{}/state".format(i))
	needLEDState[i] = True
	while needLEDState[i]:
		time.sleep(0.02)
	return LEDState[i]
	