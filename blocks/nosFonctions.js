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
    "type": "changerCouleur",
    "message0": "Changer couleur de %1 en %2",
    "args0": [{
      "type": "field_number",
      "name": "ID",
      "check": "Number",
      "value": 0
    },
    {
      "type": "field_input",
      "name": "COULEUR",
      "check": "String",
      "text": ""
    }],
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
  }])
