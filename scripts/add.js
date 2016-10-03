var currentUnitRules = [];
var rules = {};


function addRule () {
	// body...
	var phase = $('#phase').val();
	var type = $('#type').val();
	var value = $('#value').val();
	var name = $('#name').val();
	var text = $('#text').val().replace(/(\n)+/g, " ");

	var rule = {phase : phase, type : type, value : value, name : name, text : text};

	currentUnitRules.push(rule);      

	var s = JSON.stringify(rule);       
	$('#rules').append("<p>" + s + "</p>");   

	$('#value').val("");
	$('#name').val("");
	$('#text').val("");
	display();
}

function finishUnit () {
	var unitName = $('#unitName').val();
	console.log(unitName);
	rules[unitName] = { rules : [] };
	rules[unitName].rules = currentUnitRules;

	currentUnitRules = [];
	$('#rules').empty();
	$('#units').append(unitName + "<br>");
	$('#unitName').val("");
	display();
}

function display () {
	var rulesSoFar = JSON.parse(JSON.stringify(rules));
	console.log(rulesSoFar);
	if (currentUnitRules.length > 0) {
		var unitName = $('#unitName').val();
		rulesSoFar[unitName] = { rules : [] };
		rulesSoFar[unitName].rules = currentUnitRules;
	};

	$('#jsonOutput').empty();
	$('#jsonOutput').append(JSON.stringify(rulesSoFar));
}