
'use strict';

goog.provide('Blockly.Python.nosFonctions');

goog.require('Blockly.Python');



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "["+parseInt(result[1],16)+","+parseInt(result[2],16)+","+parseInt(result[3],16)+"]": null;
}

var ntab = 0;
function indent(line) {
  var res = line;
  for(var i = 0; i < ntab; i++)
    res = "  " + line;
  return res + "\n";
}

Blockly.Python['changerCouleurTous'] = function(block) {
  var code = indent("com = { 'command' : 'fill', 'rgb' :"+hexToRgb(block.getFieldValue('COULEUR'))+"}")
               + indent("client.publish('laumio/all/json', json.dumps(com))");
  return code;
};


Blockly.Python['changerCouleur'] = function(block) {
 var code = indent("com = { 'command' : 'fill', 'rgb' :"+hexToRgb(block.getFieldValue('COULEUR'))+"}")
              + indent("client.publish('laumio/'+lampes["+block.getFieldValue('ID')+"]+'/json', json.dumps(com))");
 return code;
};


Blockly.Python['eteindre'] = function(block) {
  var code = indent("comBlue= { 'command' : 'fill', 'rgb' :[0,0,0]}")
               + indent("client.publish('laumio/'+lampes["+block.getFieldValue('ID')+"]+'/json', json.dumps(comBlue))");
  return code;
};
   Blockly.Python['allumer'] = function(block) {
     var code = indent("comBlue= { 'command' : 'fill', 'rgb' :[255,255,255]}")
                  + indent("client.publish('laumio/'+lampes["+block.getFieldValue('ID')+"]+'/json', json.dumps(comBlue))");
     return code;
};

Blockly.Python['Pluie'] = function(block) {
  var code = indent("pluie(client, lampes[" + block.getFieldValue('ID') + "], " + block.getFieldValue('TIME') + ")");
  return code;
};

Blockly.Python['Spiral'] = function(block) {
  var code = indent("spiral(client, lampes[" + block.getFieldValue('ID') + "], " + block.getFieldValue('TIME') + ")");
  return code;
};

Blockly.Python['Animer'] = function(block) {
  var code = indent("com = { 'command' : 'animate_rainbow'}")
               + indent("client.publish('laumio/'+lampes["+block.getFieldValue('ID')+"]+'/json', json.dumps(com))");
  return code;
};

Blockly.Python['AnimerTous'] = function(block) {
  var code = indent("com = { 'command' : 'animate_rainbow'}")
               + indent("client.publish('laumio/all/json', json.dumps(com))");
  return code;
};

Blockly.Python['Pause'] = function(block) {
  var code = indent("time.sleep(" + block.getFieldValue('ID') + ")");
  return code;
};

Blockly.Python['Message'] = function(block) {
  var code = "s";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['EtatLED'] = function(block) {
  var code = "getLEDState(" + block.getFieldValue('ID') + ")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['Etatbp'] = function(block) {
  var code = indent("def fun(client, s):");
  ntab += 1;
  code += Blockly.Python.statementToCode(block, 'CODE') || Blockly.Python.PASS;
  ntab -= 1;
  code += indent("funBP[" + block.getFieldValue('ID') + "] = fun");
  return code
}