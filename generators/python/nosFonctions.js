
'use strict';

goog.provide('Blockly.Python.nosFonctions');

goog.require('Blockly.Python');



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "["+result[1]+","+result[2]+","+result[3]+"]": null;
}

Blockly.Python['changerCouleurTous'] = function(block) {
    var code = "changerCouleurTous("+hexToRgb(block.getFieldValue('COULEUR'))+")";
    return code;
   };


Blockly.Python['changerCouleur'] = function(block) {
 var code = "changerCouleur("+block.getFieldValue('ID')+","+hexToRgb(block.getFieldValue('COULEUR'))+")";
 return code;
};


Blockly.Python['eteindre'] = function(block) {
    var code = "changerCouleur("+block.getFieldValue('ID')+",[0,0,0])";
    return code;
   };

Blockly.Python['allumer'] = function(block) {
    var code = "changerCouleur("+block.getFieldValue('ID')+",[255,255,255])";
    return code;
   };
   
Blockly.Python['animer'] = function(block) {
    var code = "animer("+block.getFieldValue('ID')+")";
    return code;
};

Blockly.Python['animerTous'] = function(block) {
    var code = "animerTous()";
    return code;
};

Blockly.Python['capteur_bp_status'] = function(block) {
    var code = "getStatusBP()";
    return code;
};

   