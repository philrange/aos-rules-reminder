

function go() {
    toggleText();

    displayJson($('#text').val());
}

function restart() {
	toggleText();

	clearRules();
}

function clearRules() {
    $('#rules').empty();
    $('#missing').empty();
    $('#debug').empty();
}

function toggleText() {
	//slide text box in/out, and toggle restart button once complete
	$('#inputBox').slideToggle("slow", function () {$('#restartBox').toggle();});
}

function displayJson (base64) {
	
	var json=JSON.parse(LZString.decompressFromEncodedURIComponent(base64))
	createRules(json);
}

function createRules(armyListData) {
console.log(JSON.stringify(armyListData));

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
                $("#rules").empty();
                $("#rules").append(getRules(ruleData, army));
                },
                error: function (argument) {
                    console.log(argument);
                    $("#debug").append("Error loading file for " + army.name + "<br>");
                }  
            }); 
        }

        }
    );
}

function getRules (ruleData, army) {
    var missing = new Set();
	var rules = getRulesForPhase("Deployment", ruleData, army, missing);
    rules += getRulesForPhase("Hero", ruleData, army, missing);
    rules += getRulesForPhase("Movement", ruleData, army, missing);
    rules += getRulesForPhase("Shooting", ruleData, army, missing);
    rules += getRulesForPhase("Charge", ruleData, army, missing);
    rules += getRulesForPhase("Combat", ruleData, army, missing);
	rules += getRulesForPhase("Battleshock", ruleData, army, missing);

    logMissingUnits(missing);

	return rules;
}

function getRulesForPhase (phase, ruleData, army, missing) {
    // var rulesForPhase = "<div class='phase'>" + phase + "</div>";
	var rulesForPhase = "<div class='panel panel-default'><div class='panel-heading phase'>" + phase + "</div>";
    rulesForPhase += "<div class='panel panel-body'>";

    rulesForPhase += getRulesForEachUnit(army.units, phase, ruleData, army, missing, rulesForPhase);
    rulesForPhase += getRulesForEachUnit(army.heroes, phase, ruleData, army, missing, rulesForPhase);
    rulesForPhase += getRulesForEachUnit(army.monsters, phase, ruleData, army, missing, rulesForPhase);
    rulesForPhase += getRulesForEachUnit(army.warmachines, phase, ruleData, army, missing, rulesForPhase);
    rulesForPhase += getRulesForEachUnit(army.battalions, phase, ruleData, army, missing, rulesForPhase);
 
    rulesForPhase += "</div></div>";

	return rulesForPhase;
}

function getRulesForEachUnit(units, phase, ruleData, army, missing, rulesForPhase) {
    var r = "";
    var unitsAlreadyDone = new Set();
   $.each(units, function (t, unit) {
        if (!unitsAlreadyDone.has(unit.name)) {
            r += getRulesForUnitType(t, unit, phase, ruleData, missing);
            unitsAlreadyDone.add(unit.name);
        };
    });

   return r;
}

function getRulesForUnitType (t, unit, phase, ruleData, missing) {
    var unitRules = ruleData[unit.name];
    var rulesForUnitType = "";
    if (unitRules == null) {
        missing.add(unit);
    } else {
        $.each(unitRules.rules, 
            function (t, rule) {
                if (rule.phase === phase.toUpperCase()) {

                    var type = getTypeClass(rule.type);
                    var iconText = rule.value != null ? rule.value.toUpperCase() : "";
                    var iconDiv = `<div class='icon rounded-corners ` + type + `'>
                    <div class='icon-img'>&nbsp;</div>
                    <div class='icon-text'>` + iconText + `</div>
                    </div>`;

                    var unitNameDiv = "<div class='unit-name text-nowrap'>" + unit.name + "</div>";
                    var ruleNameDiv = "<div class='rule-name text-nowrap'>" + rule.name + "</div>";
                    var textDiv = "<div class='description-container'><span class='description'>" + rule.text + "</span></div>";

                    rulesForUnitType += "<div class='panel panel-default rule row'>";
                    rulesForUnitType += unitNameDiv; 
                    rulesForUnitType += iconDiv;
                    rulesForUnitType += ruleNameDiv;
                    rulesForUnitType += textDiv + "</div>";
                    
                };
            }
        );
    }

    // console.log(rulesForUnitType);
    return rulesForUnitType;
}

function getTypeClass(type) {
    var typeClass;
    if (type.toLowerCase() == "buff") {
        typeClass = "buff";
    } else if (type.toLowerCase() == "debuff") {
        typeClass = "debuff";
    } else if (type.toLowerCase() == "reroll") {
        typeClass = "reroll";
    } else if (type.toLowerCase() == "save") {
        typeClass = "save";
    } else {
        typeClass = "other";
    }

    return typeClass;
}

function logMissingUnits(missing) {
    if (missing.size > 0) {
        $('#missing').append("<h4>Rules Not Found</h4>");
        missing.forEach(function(unit) {
            $('#missing').append("<br>" + unit.name + " " + JSON.stringify(unit));
        });
    }
}

function createTextArmy(armyListData) {
     $("#textListSpan").empty(), $("#textListSpan").append("<b>Leaders</b><br>"), $.each(armyListData,
        function (t, a) {
            $.each(a.heroes,
                function (t, a) {
                    $("#textListSpan").append("" + a.name + " (" + a.cost + ")<br>"), "No" !== a.general && $("#textListSpan").append(" -<small> General</small><br>"), void 0 !== a.equip && $("#textListSpan").append(" -<small> " + a.equip + "</small><br>"), "None" !== a.commandTrait && $("#textListSpan").append(" -<small> Trait: " + a.commandTrait.split("-")[0] + "</small><br>"), "None" !== a.artefact && $("#textListSpan").append(" -<small> Artefact: " + a.artefact.split("-")[0] + "</small><br>")
                })
        }), $("#textListSpan").append("<br>"), $("#textListSpan").append("<b>Units</b><br>"), $.each(armyListData,
        function (t, a) {
            $.each(a.units,
                function (t, a) {
                    $("#textListSpan").append("" + a.name + " x " + a.models + " (" + a.cost + ")<br>"), void 0 !== a.equip && $("#textListSpan").append(" -<small> " + a.equip + "</small><br>")
                })
        }), $("#textListSpan").append("<br>"), $("#textListSpan").append("<b>Behemoths</b><br>"), $.each(armyListData,
        function (t, a) {
            $.each(a.monsters,
                function (t, a) {
                    $("#textListSpan").append("" + a.name + " (" + a.cost + ")<br>")
                })
        }), $("#textListSpan").append("<br>"), $("#textListSpan").append("<b>War Machines</b><br>"), $.each(armyListData,
        function (t, a) {
            $.each(a.warmachines,
                function (t, a) {
                    $("#textListSpan").append("" + a.name + " (" + a.cost + ")<br>")
                })
        }), $("#textListSpan").append("<br>"), $("#textListSpan").append("<b>Batallions</b><br>"), $.each(armyListData,
        function (t, a) {
            $.each(a.formations,
                function (t, a) {
                    $("#textListSpan").append("" + a.name + " (" + a.cost + ")<br>")
                })
        }), $("#textListSpan").append("<br>"),
        $("#textListSpan").append("<b>Total:</b> " + totalPoints + "/" + poolLimit), $("#textListSpan").append("<br><br>");
}