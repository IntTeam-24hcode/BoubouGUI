'use strict';

goog.provide('Blockly.Blocks.nosFonctions');  // Deprecated
goog.provide('Blockly.Constants.nosFonctions');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg['TEXTS_HUE']. (2018 April 5)
 */
Blockly.Constants.Text.HUE = 160;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for text value
  {
    "type": "changerCouleurTous",
    "message0": "Changer couleur de tous en %1",
    "args0": [ {
      "type": "field_colour",
      "name": "COULEUR",
      "text": ""
    }]
  },
  {
    "type": "changerCouleur",
    "message0": "Changer couleur de %1 en %2",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    },
    {
      "type": "field_colour",
      "name": "COULEUR",
      "text": ""
    }]
  },
  {
    "type": "allumer",
    "message0": "Allumer %1",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    }]
  },
  {
    "type": "eteindre",
    "message0": "Eteindre %1 ",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    }]
  },
  {
    "type": "Animer",
    "message0": "Animer %1",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    }]
  },
  {
    "type": "AnimerTous",
    "message0": "Animer tous",
  }
  /**
   * 
   * CAPTEUR BP
   * 
   */,
  {
    "type": "capteur_bp_status",
    "message0": "Statut Capteur Btns",
    "output": "String"
  },
  {
    "type": "capteur_bp/switch/ledX/state",
    "message0": "Etat led %1",
    "output": "String",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    }]
  },
  {
    "type": "capteur_bp/binary_sensor/bpX/state",
    "message0": "Etat bouton %1 ",
    "output": "String",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    }]
  },
  {
    "type": "capteur_bp/switch/ledX/command/allumer",
    "message0": "Allumer led %1 ",
    "output": "String",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    }]
  },
  {
    "type": "capteur_bp/switch/ledX/command/eteindre",
    "message0": "Eteindre led %1 ",
    "output": "String",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    }]
  }
  /**
   * Télécommande infrarouge
   */
  ,
  {
    "type": "remote/NOM_DE_LA_TOUCHE/state",
    "message0": "Etat bouton telecommande %1 ",
    "output": "String",
    "args0": [{
      "type": "field_input",
      "name": "NAME_BTN",
      "check": "String"
    }]
  }

  /**
   * Capteur détecteur de présence
   */
  ,
  {
    "type": "presence/state",
    "message0": "Etat détection",
    "output": "String"
  } 
    /**
   * Capteur de distance
   */
  ,
  {
    "type": "distance/value",
    "message0": "Etat détection",
    "output": "Number"
  } 
  /**
   * Capteur atmosphérique
   */
  ,
  {
    "type": "atmosphere/temperature",
    "message0": "Temperature",
    "output": "Number"
  } 
  ,
  {
    "type": "atmosphere/pression",
    "message0": "Pression",
    "output": "Number"
  } 
  ,
  {
    "type": "atmosphere/humidite",
    "message0": "Humidite Absolu",
    "output": "Number"
  } 
  ,
  {
    "type": "atmosphere/humidite_absolue",
    "message0": "Humidite Absolu",
    "output": "Number"
  }   
  /**
  * musique
  */
 ,
 {
   "type": "music/control/getstate",
   "message0": "Etat Musique",
   "output": "String"
 } ,
 {
   "type": "music/control/getvol",
   "message0": "Volume",
   "output": "Number"
 },
 {
   "type": "music/control/next",
   "message0": "Suivant"
 },
 {
   "type": "music/control/previous",
   "message0": "Précédent"
 },
 {
   "type": "music/control/stop",
   "message0": "Arreter"
 },
 {
   "type": "music/control/play",
   "message0": "Jouer"
 },
 {
   "type": "music/control/pause",
   "message0": "Pause"
 },
 {
   "type": "music/control/setvol",
   "message0": "Toogle",
   "args0": [{
    "type": "field_input",
    "name": "VOLUME",
    "check": "Number"
  }]
 }

])
