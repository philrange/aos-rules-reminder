
var anyRules = [];
var deploymentRules = [];
var heroRules = [];
var movementRules = [];
var shootingRules = [];
var chargeRules = [];
var combatRules = [];
var battleshockRules = [];
var traits = {};
var artefacts = {};
var missing = new Set();
var ruleId = 1;


function loadArmyFromURL() {
    var army = window.location.search.substring(1);
    if ("" !== army) {
        
        toggleText();
        displayJson(army);
    }
}

function go() {
    toggleText();

    displayJson($('#text').val());
}

function restart() {
	toggleText();

	clearRules();
}

function about() {
    $('#aboutModal').modal("show");
}

function instructions() {
    $('#instructionsModal').modal("show");
}

function print() {
    $('#printableRules').printThis();
}

function displayPrintable() {

    $("#printableRules").empty();
    $("#printableRules").append("<div class='print'>");
    $("#printableRules").append(buildSectionHtml("Any", filterRules(anyRules)));
    $("#printableRules").append(buildSectionHtml("Deployment", filterRules(deploymentRules)));
    $("#printableRules").append(buildSectionHtml("Hero", filterRules(heroRules)));
    $("#printableRules").append(buildSectionHtml("Movement", filterRules(movementRules)));
    $("#printableRules").append(buildSectionHtml("Shooting", filterRules(shootingRules)));
    $("#printableRules").append(buildSectionHtml("Charge", filterRules(chargeRules)));
    $("#printableRules").append(buildSectionHtml("Combat", filterRules(combatRules)));
    $("#printableRules").append(buildSectionHtml("Battleshock", filterRules(battleshockRules)));
    $("#printableRules").append("</div>");
    $('#printModal').modal("show");
}

function filterRules(rulesArray) {
    return rulesArray.filter(function (rule) {
        return rule.enabled == true;
    });
}

function clearRules() {
    $('#rules').empty();
    $('#missing').empty();
    $('#debug').empty();
    missing = new Set()
    ruleId = 1;
    anyRules = [];
    deploymentRules = [];
    heroRules = [];
    movementRules = [];
    shootingRules = [];
    chargeRules = [];
    combatRules = [];
    battleshockRules = [];
}

function toggleText() {
	//slide text box in/out, and toggle restart button once complete
	$('#inputBox').slideToggle("slow", function () {$('#restartBox').toggle();});
}

function displayJson (base64) {
	
	var json=JSON.parse(LZString.decompressFromEncodedURIComponent(base64));
    // console.log(JSON.stringify(json));
	createRules(json);
}

function createRules(armyListData) {
// console.log(JSON.stringify(armyListData));

    loadTraits();
    loadArtefacts();

    $.each(armyListData,
        function (t, army) {

        if (army.name != null) {
            var armyName = army.name.toLowerCase();
            console.log("Loading file for " + armyName);
            //load data
            $.ajax({
               type: "GET",
               crossDomain:true,
               cache: false,
               url: "data/" + armyName + ".json", 
               success: function (ruleData) { 

                //build rules
                buildRules(ruleData, army);

                //add rules to page
                $("#rules").empty();
                $("#rules").append(buildSectionHtml("Any", anyRules));
                $("#rules").append(buildSectionHtml("Deployment", deploymentRules));
                $("#rules").append(buildSectionHtml("Hero", heroRules));
                $("#rules").append(buildSectionHtml("Movement", movementRules));
                $("#rules").append(buildSectionHtml("Shooting", shootingRules));
                $("#rules").append(buildSectionHtml("Charge", chargeRules));
                $("#rules").append(buildSectionHtml("Combat", combatRules));
                $("#rules").append(buildSectionHtml("Battleshock", battleshockRules));
                addListeners();

                //debug outut
                logMissingUnits()

                },
                error: function (argument) {
                    // console.log(argument);
                    $("#debug").append("Error loading file for " + army.name + "<br>");
                }  
            }); 
        }

        }
    );
}

function buildRules (ruleData, army) {

    var faction = army.faction;

    buildRulesForUnitType(ruleData, army.units, faction);
    buildRulesForUnitType(ruleData, army.heroes, faction);
    buildRulesForUnitType(ruleData, army.monsters, faction);
    buildRulesForUnitType(ruleData, army.warmachines, faction);
    buildRulesForUnitType(ruleData, army.battalions, faction);
}

function buildRulesForUnitType (ruleData, unitList, faction) {
    var unitsAlreadyDone = new Set();
   $.each(unitList, function (t, unit) {
        if (!unitsAlreadyDone.has(unit.name)) {
            buildRulesForUnit(t, unit, ruleData, faction);
            unitsAlreadyDone.add(unit.name);
        };
    });
}

function buildRulesForUnit(t, unit, ruleData, faction) {
    var unitRules = ruleData[unit.name];
    var rulesForUnitType = "";
    if (unitRules == null) {
        missing.add(unit);
    } else {
        var isGeneral = unit.general != null && unit.general == "Yes";

        //get basic rules
        $.each(unitRules.rules, 
            function (t, rule) {

                var id = ruleId++;
                var fullRule = {enabled : true, id : id, type : rule.type, iconText : rule.value, unitName : unit.name, ruleName : rule.name, description : rule.text};
                if (rule.commandAbility && !isGeneral) {
                    // console.log("command rule doesn't apply");
                    return;
                };

                //also filter rules that rely on equipment
                // console.log(unit.name + " equipped with " + unit.equip);
                    
                //if not filtered out, add the rule to the list
                addToPhaseRules(rule.phase, id, fullRule);

            }
        );

        // add general command trait
        var commandTrait = unit.commandTrait;
        if (isGeneral && commandTrait != null && commandTrait != "None") {

//            console.log("Get general's command trait for faction " + faction + ", trait " + unit.commandTrait + " " + unit.name);
            var rule = getGeneralTraitRule(commandTrait, faction);
            if (rule != null) {
                var id = ruleId++;
                var fullRule = {enabled : true, id : id, type : rule.type, iconText : rule.value, unitName : unit.name, ruleName : commandTrait, description : rule.text};

                //todo
//                addToPhaseRules(rule.phase, id, fullRule);
            }
        };

        //add artefact rule
        var artefact = unit.artefact;
        if (artefact != null && artefact != "None") {

//            console.log("Get artefact for faction " + faction + ", artefact " + artefact + " " + unit.name);
            var rule = getArtefactRule(artefact, faction);
            if (rule != null) {
                var id = ruleId++;
                var fullRule = {enabled : true, id : id, type : rule.type, iconText : rule.value, unitName : unit.name, ruleName : artefact, description : rule.text};

                //todo
//                addToPhaseRules(rule.phase, id, fullRule);
            }
        };


    }

    // console.log(rulesForUnitType);
    return rulesForUnitType;
}

function loadTraits() {
        $.ajax({
                   type: "GET",
                   crossDomain:true,
                   cache: false,
                   url: "data/traits.json",
                   success: function (t) {
//                      console.log(t);
                        traits = t;
                    },
                    error: function (argument) {
                         console.log(argument);
                        $("#debug").append("Error loading traits file <br>");
                    }
                });

}

function getGeneralTraitRule(trait, faction) {

    var factionTraits = traits[faction];
    var traitRule = factionTraits[trait];

    return traitRule;
}

function loadArtefacts() {
        $.ajax({
                   type: "GET",
                   crossDomain:true,
                   cache: false,
                   url: "data/artefacts.json",
                   success: function (a) {
//                      console.log(a);
                        artefacts = a;
                    },
                    error: function (argument) {
                         console.log(argument);
                        $("#debug").append("Error loading artefacts file <br>");
                    }
                });
}

function getArtefactRule(artefact, faction) {

    var factionArtefacts = artefacts[faction];
    var artefactRule = factionArtefacts[artefact];

    return artefactRule;
}

function addToPhaseRules(phase, id, fullRule) {
	if (phase == null || phase == "") {
		phaseName = "any";
	} else {
		phaseName = phase.toLowerCase();
	}
    eval(phaseName + 'Rules')[id] = fullRule;
}

function buildSectionHtml(phase, rules) {

    if (rules.length > 0) {
        var section = "<div class='panel panel-default'><div class='panel-heading phase'>" + phase + "</div>";
        section += "<div class='panel panel-body'>";

        $.each(rules, function (t, rule) {
            if (rule != null) {
                // console.log(rule);
                section += buildRuleHtml(phase, rule);
            }
        })

        section += "</div></div>";
    }

    return section;
}

function buildRuleHtml(phase, rule) {
    var html = "";

    var checkBoxDiv = "<div class='checkbox-container'><input type='checkbox' class='checkbox' value='" + phase + "' id='checkbox-" + rule.id + "'></div>";
    var type = getTypeClass(rule.type, rule.iconText);
    var iconText = rule.iconText != null ? rule.iconText.toUpperCase() : "";
    var iconDiv = `<div class='icon rounded-corners ` + type.class + `'>
    <div class='icon-img'>` + type.text + `</div>
    <div class='icon-text'>` + iconText + `</div>
    </div>`;

    var unitNameDiv = "<div class='unit-name text-nowrap'>" + rule.unitName + "</div>";
    var ruleNameDiv = "<div class='rule-name text-nowrap'>" + rule.ruleName + "</div>";
    var textDiv = "<div class='description-container'><span class='description'>" + rule.description + "</span></div>";

    html += "<div class='panel panel-default rule row' id='ruleRow-" + rule.id + "'>";
    html += checkBoxDiv; 
    html += unitNameDiv; 
    html += iconDiv;
    html += ruleNameDiv;
    html += textDiv + "</div>";

    // console.log(html);
    return html;
}

function getTypeClass(type, value) {
    // console.log(value);
    var typeValues = [];
    typeValues.text = "&nbsp;";
    if (type.toLowerCase() == "buff") {
        typeValues.class = "buff";
        typeValues.text = "+1";
    } else if (type.toLowerCase() == "debuff") {
        typeValues.class = "debuff";
        typeValues.text = "-1";
    } else if (type.toLowerCase() == "reroll") {
        typeValues.class = "reroll";
        typeValues.text = "&#9860;";
    } else if (type.toLowerCase() == "save") {
        typeValues.class = "save";
    } else {
        if (value == null || value == "") {
            typeValues.class = "other-empty";
        } else {
            typeValues.class = "other";
        }
    }

    return typeValues;
}

function logMissingUnits() {
    if (missing.size > 0) {
        $('#missing').append("<h4>Rules Not Found</h4>");
        missing.forEach(function(unit) {
            $('#missing').append("<br>" + unit.name);
            // $('#missing').append("<br>" + unit.name + " " + JSON.stringify(unit));
        });
    }
}

function addListeners() {

    $(".checkbox").on('change', function() {
        var id = this.id.substring(9);
        var elementId = '#ruleRow-' + id;
        var element = $(elementId);

        var phase = this.value;
    if(this.checked) {
        toggleRule(phase, id, false);
        element.fadeTo(200,0.2);

    } else {
        toggleRule(phase, id, true);
        element.fadeTo(200,1);
    }
    });
}

function toggleRule(phase, id, enabled) {
    eval(phase.toLowerCase() + 'Rules')[id].enabled = enabled;
}