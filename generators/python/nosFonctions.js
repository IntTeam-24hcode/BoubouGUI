
'use strict';

goog.provide('Blockly.Python.nosFonctions');

goog.require('Blockly.Python');


Blockly.Python['text'] = function(block) {
 // Text value.
 var code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
 return [code, Blockly.Python.ORDER_ATOMIC];
};
