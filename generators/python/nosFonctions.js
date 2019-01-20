
'use strict';

goog.provide('Blockly.Python.nosFonctions');

goog.require('Blockly.Python');



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "["+parseInt(result[1],16)+","+parseInt(result[2],16)+","+parseInt(result[3],16)+"]": null;
}

Blockly.Python['changerCouleurTous'] = function(block) {
  var code = "comBlue= { 'command' : 'fill', 'rgb' :"+hexToRgb(block.getFieldValue('COULEUR'))+"}"+"\n"
               +"client.publish('laumio/all/json', json.dumps(comBlue))\n"

  return code;
   };


Blockly.Python['changerCouleur'] = function(block) {
 var code = "comBlue= { 'command' : 'fill', 'rgb' :"+hexToRgb(block.getFieldValue('COULEUR'))+"}"+"\n"
              +"client.publish('laumio/'+lampes["+block.getFieldValue('ID')+"]+'/json', json.dumps(comBlue))\n"

 return code;
};


Blockly.Python['eteindre'] = function(block) {
  var code = "comBlue= { 'command' : 'fill', 'rgb' :[0,0,0]}"+"\n"
               +"client.publish('laumio/'+lampes["+block.getFieldValue('ID')+"]+'/json', json.dumps(comBlue))\n"

  return code;
   };
   Blockly.Python['allumer'] = function(block) {
     var code = "comBlue= { 'command' : 'fill', 'rgb' :[255,255,255]}"+"\n"
                  +"client.publish('laumio/'+lampes["+block.getFieldValue('ID')+"]+'/json', json.dumps(comBlue))\n"

     return code;
      };

Blockly.Python['Pluie'] = function(block) {
  var code = "pluie(client, lampes[" + block.getFieldValue('ID') + "], " + block.getFieldValue('TIME') + ")\n"
  return code;
};

Blockly.Python['Spiral'] = function(block) {
  var code = "spiral(client, lampes[" + block.getFieldValue('ID') + "], " + block.getFieldValue('TIME') + ")\n"
  return code;
};

Blockly.Python['Animer'] = function(block) {
  var code = "comBlue= { 'command' : 'animate_rainbow'}"+"\n"
               +"client.publish('laumio/'+lampes["+block.getFieldValue('ID')+"]+'/json', json.dumps(comBlue))\n"

  return code;
};

Blockly.Python['AnimerTous'] = function(block) {
  var code = "comBlue= { 'command' : 'animate_rainbow'}"+"\n"
               +"client.publish('laumio/all/json', json.dumps(comBlue))\n"

  return code;
};
