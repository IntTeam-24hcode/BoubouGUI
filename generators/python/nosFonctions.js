
'use strict';

goog.provide('Blockly.Python.nosFonctions');

goog.require('Blockly.Python');


Blockly.Python['changerCouleur'] = function(block) {
 // Text value.
 var code = "changerCouleur("+block.getFieldValue('ID')+","+Blockly.Python.quote_(block.getFieldValue('COULEUR'))+")";
 return code;
};
