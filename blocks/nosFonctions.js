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
    "type": "text",
    "message0": "%1",
    "args0": [{
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    }],
    "output": "String",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "extensions": [
      "text_quotes",
      "parent_tooltip_when_inline"
    ]
  }])
