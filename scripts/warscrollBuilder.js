function army(t) {
    this.name = t, this.units = [], this.heroes = [], this.monsters = [], this.warmachines = [], this.formations = []
}

function loadArmyFromURL() {
    var t = window.location.search.substring(1);
    if ("" !== t) {
        var a = JSON.parse(LZString.decompressFromEncodedURIComponent(t));
        currentPointType = a.currentPointType, currentSubType = a.currentSubType, $(".limitSpan").empty().append(a.pointLimit), "SDK" === currentPointType ? ($("#poolChoiceButton").removeClass("btn-primary active").addClass("btn-default"), "KDV" === currentSubType ? $("#kdvChoiceButton").addClass("btn-primary active") : $("#sdkChoiceButton").addClass("btn-primary active")) : "SCGT" === currentSubType && ($("#poolChoiceButton").removeClass("btn-primary active").addClass("btn-default"), $("#scgtPoolButton").addClass("btn-primary active"));
        for (var e in a)
            if (a.hasOwnProperty(e)) {
                if ("currentPointType" === e || "pointLimit" === e || "currentSubType" === e) continue;
                $("#dropdownMenu1").text(e + " ").append('<span class="caret"></span>'), $("#dropdownMenu1").popover("destroy"), currentArmyLink = a[e].armyLink, currentFactionType = a[e].faction, currentLoadedArmy = currentPointType === SDK ? availableSDKArmies[a[e].armyid] : jQuery.extend(!0, {}, availablePoolArmies[a[e].armyid]), loadUnits(), (null === armyListData[e] || void 0 === armyListData[e]) && (armyListData[e] = new army(e), armyListData[e].armyLink = currentArmyLink, armyListData[e].faction = currentFactionType, armyListData[e].armyid = a[e].armyid), currentLoadedArmyLabel = e, $.each(a[e].heroes,
                    function(t, a) {
                        addHero(a.name, a)
                    }), $.each(a[e].units,
                    function(t, a) {
                        addUnit(a.name, a)
                    }), $.each(a[e].monsters,
                    function(t, a) {
                        addMonster(a.name)
                    }), $.each(a[e].warmachines,
                    function(t, a) {
                        addWarmachine(a.name)
                    }), $.each(a[e].formations,
                    function(t, a) {
                        addFormation(a.name)
                    })
            }
    }
}

function loadAllArmies() {
    allArmies = $("#armiesDropDownList li a"), $.each(allArmies,
        function(t, a) {
            var e = a.dataset.armyid,
                n = armyFileNames[e];
            loadAndSavePoints("data/" + n + ".csv", "data/" + n + ".json", "data/SDK" + n + ".json", e)
        })
}

function addToArmySelectionDropDown(t, a, e, n) {
    $("#armiesDropDownList").append("<li><a href='#' data-faction='" + a + "' data-armyid='" + e + "'' data-armylink=''>" + t + "</a></li>")
}

function fillArmyDropDownWithFactionType(t) {
    $("#armiesDropDownList").empty(), "Chaos" === t ? (addToArmySelectionDropDown("Beasts", "chaos", "BEASTMEN", ""), addToArmySelectionDropDown("Daemons", "chaos", "DAEMONSOFCHAOS", ""), addToArmySelectionDropDown("Khorne Bloodbound", "chaos", "KHORNEBLOODBOUND", ""), addToArmySelectionDropDown("Legion Of Azgorh", "chaos", "LEGIONOFAZGORH", ""), addToArmySelectionDropDown("Mortals", "chaos", "WARRIORSOFCHAOS", ""), addToArmySelectionDropDown("Skaven", "chaos", "SKAVEN", ""), addToArmySelectionDropDown("Tamurkhan's Horde", "chaos", "TAMURKHANSHORDE", "")) : "Order" === t ? (addToArmySelectionDropDown("Bretonnia", "order", "BRETONNIA", ""), addToArmySelectionDropDown("Dark Aelves", "order", "DARKELVES", ""), addToArmySelectionDropDown("Duardin", "order", "DWARFS", ""), addToArmySelectionDropDown("Humans", "order", "EMPIRE", ""), addToArmySelectionDropDown("High Aelves", "order", "HIGHELVES", ""), addToArmySelectionDropDown("Seraphon", "order", "LIZARDMEN", ""), addToArmySelectionDropDown("Stormcast", "order", "STORMCASTETERNALS", ""), addToArmySelectionDropDown("Sylvaneth", "order", "SYLVANETH", ""), addToArmySelectionDropDown("Wood Aelves", "order", "WOODELVES", "")) : "Destruction" === t ? (addToArmySelectionDropDown("Beastclaw Raiders", "destruction", "BEASTCLAWRAIDERS", ""), addToArmySelectionDropDown("Bonesplitterz", "destruction", "BONESPLITTERZ", ""), addToArmySelectionDropDown("Grots", "destruction", "GROTS", ""), addToArmySelectionDropDown("Ironjawz", "destruction", "IRONJAWZ", ""), addToArmySelectionDropDown("Ogors", "destruction", "OGREKINGDOMS", ""), addToArmySelectionDropDown("Orruks", "destruction", "ORRUKS", "")) : "Death" === t ? (addToArmySelectionDropDown("Flesh Eater Courts", "death", "FLESHEATERCOURTS", ""), addToArmySelectionDropDown("Tomb Kings", "death", "TOMBKINGS", ""), addToArmySelectionDropDown("Vampires", "death", "VAMPIRECOUNTS", "")) : "Monstrous Arcanum" === t && addToArmySelectionDropDown("Monstrous Arcanum", "ma", "MONSTROUSARCANUM", ""), $("#armiesDropDownList li a").click(
        function(t) {
            $("#dropdownMenu1").text(this.text + " ").append('<span class="caret"></span>'), $("#dropdownMenu1").popover("destroy"), currentFactionType = this.dataset.faction, currentLoadedArmy = currentPointType === SDK ? availableSDKArmies[this.dataset.armyid] : jQuery.extend(!0, {}, availablePoolArmies[this.dataset.armyid]), loadUnits(), (null === armyListData[this.text] || void 0 === armyListData[this.text]) && (armyListData[this.text] = new army(this.text), armyListData[this.text].armyLink = currentArmyLink, armyListData[this.text].faction = currentFactionType, armyListData[this.text].armyid = this.dataset.armyid), currentLoadedArmyLabel = this.text, t.preventDefault()
        })
}

function init() {
    armyFileNames.BEASTMEN = "beastmen", armyFileNames.BEASTCLAWRAIDERS = "beastclawraiders", armyFileNames.BONESPLITTERZ = "bonesplitterz", armyFileNames.BRETONNIA = "bretonnia", armyFileNames.DAEMONSOFCHAOS = "daemonsofchaos", armyFileNames.DARKELVES = "darkelves", armyFileNames.DWARFS = "dwarfs", armyFileNames.FLESHEATERCOURTS = "flesheatercourts", armyFileNames.HIGHELVES = "highelves", armyFileNames.IRONJAWZ = "ironjawz", armyFileNames.KHORNEBLOODBOUND = "khornebloodbound", armyFileNames.LEGIONOFAZGORH = "legionofazgorh", armyFileNames.LIZARDMEN = "lizardmen", armyFileNames.MONSTROUSARCANUM = "monstrousarcanum", armyFileNames.OGREKINGDOMS = "ogrekingdoms", armyFileNames.GROTS = "grots", armyFileNames.ORRUKS = "orruks", armyFileNames.SKAVEN = "skaven", armyFileNames.SYLVANETH = "sylvaneth", armyFileNames.STORMCASTETERNALS = "stormcasteternals", armyFileNames.EMPIRE = "empire", armyFileNames.TAMURKHANSHORDE = "tamurkhanshorde", armyFileNames.TOMBKINGS = "tombkings", armyFileNames.VAMPIRECOUNTS = "vampirecounts", armyFileNames.WARRIORSOFCHAOS = "warriorsofchaos", armyFileNames.WOODELVES = "woodelves", loadAllArmies(), fillArmyDropDownWithFactionType("Chaos"), $(
        function() {
            $('[data-toggle="popover"]').popover()
        }), loadBannerOptions(), loadOptionalLoadouts(), loadMountOptions(), loadMusicianOptions(), loadAlternatePoolPoints(), loadGWPoolPoints(), loadKDVPoints(), loadartefacts(), loadCommandTraits(), origSDKUnits = sdkUnits, origSDKOptions = sdkUnitOptions, origSDKChampions = sdkUnitChampions, $("#armiesDropDownList li a").click(
        function(t) {
            $("#dropdownMenu1").text(this.text + " ").append('<span class="caret"></span>'), $("#dropdownMenu1").popover("destroy"), currentFactionType = this.dataset.faction, currentLoadedArmy = currentPointType === SDK ? availableSDKArmies[this.dataset.armyid] : jQuery.extend(!0, {}, availablePoolArmies[this.dataset.armyid]), loadUnits(), (null === armyListData[this.text] || void 0 === armyListData[this.text]) && (armyListData[this.text] = new army(this.text), armyListData[this.text].armyLink = currentArmyLink, armyListData[this.text].faction = currentFactionType, armyListData[this.text].armyid = this.dataset.armyid), currentLoadedArmyLabel = this.text, t.preventDefault()
        }), $("#factionTypeButtonGroup button").click(
        function() {
            var t = $(this).text();
            $("#factionTypeButtonGroup button").removeClass("btn-primary active").addClass("btn-default"), $(this).removeClass("btn-default").addClass("btn-primary active"), $("#dropdownMenu1").text("Select an Army").append('<span class="caret"></span>'), $("#heroesDropDownList").empty(), $("#unitsDropDownList").empty(), $("#monstersDropDownList").empty(), $("#warmachinesDropDownList").empty(), $("#formationsDropDownList").empty(), fillArmyDropDownWithFactionType(t)
        }), $("#pointTypeButtonGroup button").click(
        function() {
            currentPointType = $(this).text(), armyListData = {}, $("#pointTypeButtonGroup button").removeClass("btn-primary active").addClass("btn-default"), $(this).removeClass("btn-default").addClass("btn-primary active"), $("#dropdownMenu1").text("Select an Army").append('<span class="caret"></span>'), $("#heroesDropDownList").empty(), $("#unitsDropDownList").empty(), $("#monstersDropDownList").empty(), $("#warmachinesDropDownList").empty(), $("#formationsDropDownList").empty(), $("#heroesPanelBody").empty(), $("#unitsPanelBody").empty(), $("#monstersPanelBody").empty(), $("#warmachinesPanelBody").empty(), $("#formationsPanelBody").empty(), totalScrolls = 0, totalWounds = 0, totalPoints = 0, $("#totalWoundsSpan").empty().append("0"), $(".totalPointsSpan").empty().append("0"), currentPointType === SDK ? (currentSubType = "", sdkUnits = origSDKUnits, sdkUnitOptions = origSDKOptions, sdkUnitChampions = origSDKChampions, $("#scrollIcon").css("display", "none"), $(".limitSpan").empty().append(" " + sdkLimit)) : currentPointType === KDV ? (currentPointType = SDK, currentSubType = KDV, sdkUnits = kdvUnits, sdkUnitOptions = kdvUnitOptions, sdkUnitChampions = kdvUnitChampions, $("#scrollIcon").css("display", "inline-block"), $(".limitSpan").empty().append(" " + kdvLimit)) : currentPointType === SCGT ? (currentPointType = POOL, currentSubType = SCGT, $("#scrollIcon").css("display", "inline-block"), $(".limitSpan").empty().append(" " + scgtLimit)) : (currentSubType = GW, $("#scrollIcon").css("display", "inline-block"), $(".limitSpan").empty().append(" " + poolLimit))
        })
}

function loadAlternatePoolPoints() {
    $.get("data/scgtPoints.csv",
        function(t) {
            dataStr = new String(t), lines = dataStr.split("\n");
            for (var a = 0; a < lines.length; a++)
                if ("" !== lines[a]) {
                    var e = (lines[a], lines[a].split(",")),
                        n = e[0];
                    if (3 != e.length)
                        for (var o = 1; o < e.length - 2; o++) n += e[o];
                    n = n.toLowerCase();
                    var s = e[e.length - 1];
                    s = s.replace(/\r?\n|\r/g, "");
                    var i = e[e.length - 2];
                    "Formation" === i && (n = "Formation: " + n);
                    var r = "" + n.replace(/"/g, "").replace(/ /g, "").replace(/-/g, "").toLowerCase();
                    void 0 === scgtPoints[r] && (scgtPoints[r] = []), scgtPoints[r].push({
                        name: n,
                        value: s,
                        models: i
                    })
                }
        }, "text")
}

function loadGWPoolPoints() {
    $.get("data/gwPoolPoints.csv",
        function(t) {
            dataStr = new String(t), lines = dataStr.split("\n");
            for (var a = 0; a < lines.length; a++)
                if ("" !== lines[a]) {
                    var e = (lines[a], lines[a].split(",")),
                        n = e[0];
                    if (4 != e.length)
                        for (var o = 1; o < e.length - 2; o++) n += e[o];
                    n = n.toLowerCase();
                    var s = e[e.length - 1];
                    s = s.replace(/\r?\n|\r/g, "");
                    var i = e[e.length - 2],
                        r = e[e.length - 3],
                        d = "" + n.replace(/"/g, "").replace(/ /g, "").replace(/-/g, "").toLowerCase();
                    void 0 === gwPoints[d] && (gwPoints[d] = []), gwPoints[d].push({
                        name: n,
                        value: s,
                        models: i,
                        desc: r
                    })
                }
        }, "text")
}

function loadartefacts() {
    $.get("data/artefacts.csv",
        function(t) {
            dataStr = new String(t), lines = dataStr.split("\n");
            for (var a = 0; a < lines.length; a++)
                if ("" !== lines[a]) {
                    var e = (lines[a], lines[a].split(",")),
                        n = e[0];
                    n = n.toLowerCase();
                    var o = e[1];
                    o = o.replace(/\r?\n|\r/g, "");
                    var s = "" + n.replace(/"/g, "").replace(/ /g, "").replace(/-/g, "").toLowerCase();
                    void 0 === artefacts[s] && (artefacts[s] = []), artefacts[s].push({
                        artefact: o
                    })
                }
        }, "text")
}

function loadCommandTraits() {
    $.get("data/commandTraits.csv",
        function(t) {
            dataStr = new String(t), lines = dataStr.split("\n");
            for (var a = 0; a < lines.length; a++)
                if ("" !== lines[a]) {
                    var e = (lines[a], lines[a].split(",")),
                        n = e[0];
                    n = n.toLowerCase();
                    var o = e[1];
                    o = o.replace(/\r?\n|\r/g, "");
                    var s = "" + n.replace(/"/g, "").replace(/ /g, "").replace(/-/g, "").toLowerCase();
                    void 0 === commandTraits[s] && (commandTraits[s] = []), commandTraits[s].push({
                        commandTrait: o
                    })
                }
        }, "text")
}

function loadBannerOptions() {
    $.get("data/bannerOptions.csv",
        function(t) {
            dataStr = new String(t), lines = dataStr.split("\n");
            for (var a = 0; a < lines.length; a++)
                if ("" !== lines[a]) {
                    var e = (lines[a], lines[a].split(",")),
                        n = e[0];
                    if (2 != e.length)
                        for (var o = 1; o < e.length - 1; o++) n += e[o];
                    var s = null; - 1 !== n.indexOf("-") && (s = n.split("-"), n = n.substring(0, n.indexOf("-"))), n = n.toLowerCase();
                    var i = e[e.length - 1];
                    i = i.replace(/\r?\n|\r/g, ""), null !== s && (nameId = "" + n.replace(/"/g, "").replace(/ /g, "").toLowerCase(), void 0 === bannerOptions[nameId] && (bannerOptions[nameId] = []), bannerOptions[nameId].push({
                        option: s[1],
                        value: i
                    }))
                }
        }, "text")
}

function loadOptionalLoadouts() {
    $.get("data/optionalLoadoutOptions.csv",
        function(t) {
            dataStr = new String(t), lines = dataStr.split("\n");
            for (var a = 0; a < lines.length; a++)
                if ("" !== lines[a]) {
                    var e = (lines[a], lines[a].split(",")),
                        n = e[0];
                    if (2 != e.length)
                        for (var o = 1; o < e.length - 1; o++) n += e[o];
                    var s = null; - 1 !== n.indexOf("-") && (s = n.split("-"), n = n.substring(0, n.indexOf("-"))), n = n.toLowerCase();
                    var i = e[e.length - 1];
                    i = i.replace(/\r?\n|\r/g, ""), null !== s && (nameId = "" + n.replace(/"/g, "").replace(/ /g, "").toLowerCase(), void 0 === optionalLoadoutOptions[nameId] && (optionalLoadoutOptions[nameId] = []), optionalLoadoutOptions[nameId].push({
                        option: s[1],
                        value: i
                    }))
                }
        }, "text")
}

function loadAndSavePoints(t, a, e, n) {
    var o, s;
    if (void 0 !== loadedSDKFiles[t]) return void loadArmy(a);
    $.get(t,
        function(i) {
            o = new String(i), s = o.split("\n"), loadedSDKFiles[t] = !0;
            for (var r = "!", d = 0; d < s.length; d++)
                if ("" !== s[d]) {
                    var p = (s[d], s[d].split(",")),
                        l = p[0];
                    if (2 != p.length)
                        for (var c = 1; c < p.length - 1; c++) l += p[c];
                    var u = null; - 1 !== l.indexOf("-") && (u = l.split("-"), l = l.substring(0, l.indexOf("-")));
                    var m = l;
                    l = l.toLowerCase();
                    var h = p[p.length - 1];
                    if (h = h.replace(/\r?\n|\r/g, ""), void 0 === sdkUnits["" + l.replace(/"/g, "").replace(/ /g, "").toLowerCase()] && (sdkUnits["" + l.replace(/"/g, "").replace(/ /g, "").toLowerCase()] = h), null !== u && (nameId = "" + l.replace(/"/g, "").replace(/ /g, "").toLowerCase(), void 0 === sdkUnitOptions[nameId] && (sdkUnitOptions[nameId] = []), sdkUnitOptions[nameId].push({
                            option: u[1],
                            value: h
                        })), m.indexOf(r) >= 0 && m !== r && !(m.indexOf(" on ") >= 0)) {
                        var y = "" + r.replace(/"/g, "").replace(/ /g, "").toLowerCase();
                        sdkUnitChampions[y] = m
                    }
                    r = m
                }
            loadAndSaveArmy(a, e, n)
        }, "text")
}

function loadAndSaveArmy(t, a, e) {
    $.getJSON(t,
        function(t) {
            availablePoolArmies[e] = t, totalArmies++, totalArmies === 2 * allArmies.length && loadArmyFromURL()
        }), $.getJSON(a,
        function(t) {
            availableSDKArmies[e] = t, totalArmies++, totalArmies === 2 * allArmies.length && loadArmyFromURL()
        })
}

function loadKDVPoints() {
    var t, a;
    $.get("data/kdv.csv",
        function(e) {
            t = new String(e), a = t.split("\n");
            for (var n = "!", o = 0; o < a.length; o++)
                if ("" !== a[o]) {
                    var s = (a[o], a[o].split(",")),
                        i = s[0];
                    if (2 != s.length)
                        for (var r = 1; r < s.length - 1; r++) i += s[r];
                    var d = null; - 1 !== i.indexOf("-") && (d = i.split("-"), i = i.substring(0, i.indexOf("-")));
                    var p = i;
                    i = i.toLowerCase();
                    var l = s[s.length - 1];
                    if (l = l.replace(/\r?\n|\r/g, ""), void 0 === kdvUnits["" + i.replace(/"/g, "").replace(/ /g, "").toLowerCase()] && (kdvUnits["" + i.replace(/"/g, "").replace(/ /g, "").toLowerCase()] = l), null !== d && (nameId = "" + i.replace(/"/g, "").replace(/ /g, "").toLowerCase(), void 0 === kdvUnitOptions[nameId] && (kdvUnitOptions[nameId] = []), kdvUnitOptions[nameId].push({
                            option: d[1],
                            value: l
                        })), p.indexOf(n) >= 0 && p !== n && !(p.indexOf(" on ") >= 0)) {
                        var c = "" + n.replace(/"/g, "").replace(/ /g, "").toLowerCase();
                        kdvUnitChampions[c] = p
                    }
                    n = p
                }
        }, "text")
}

function loadPoints(t, a) {
    var e, n;
    if (void 0 !== loadedSDKFiles[t]) return void loadArmy(a);
    $.get(t,
        function(o) {
            e = new String(o), n = e.split("\n"), loadedSDKFiles[t] = !0;
            for (var s = 0; s < n.length; s++)
                if ("" !== n[s]) {
                    var i = (n[s], n[s].split(",")),
                        r = i[0];
                    if (2 != i.length)
                        for (var d = 1; d < i.length - 1; d++) r += i[d];
                    var p = null; - 1 !== r.indexOf("-") && (p = r.split("-"), r = r.substring(0, r.indexOf("-"))), r = r.toLowerCase();
                    var l = i[i.length - 1];
                    l = l.replace(/\r?\n|\r/g, ""), void 0 === sdkUnits["" + r.replace(/"/g, "").replace(/ /g, "").toLowerCase()] && (sdkUnits["" + r.replace(/"/g, "").replace(/ /g, "").toLowerCase()] = l), null !== p && (nameId = "" + r.replace(/"/g, "").replace(/ /g, "").toLowerCase(), void 0 === sdkUnitOptions[nameId] && (sdkUnitOptions[nameId] = []), sdkUnitOptions[nameId].push({
                        option: p[1],
                        value: l
                    }))
                }
            loadArmy(a)
        }, "text")
}

function loadMountOptions() {
    $.getJSON("data/mountOptions.json",
        function(t) {
            mountOptions = t
        })
}

function loadMusicianOptions() {
    $.getJSON("data/musicianOptions.json",
        function(t) {
            musicianOptions = t
        })
}

function loadArmy(t) {
    $.getJSON(t,
        function(t) {
            currentLoadedArmy = t, loadUnits()
        })
}

function getUnitID(t) {
    return t.replace(/,/g, "").replace(/ /g, "").replace(/-/g, "").toLowerCase()
}

function loadUnitInfo(t, a, e, n) {
    var o = n.name.replace(/,/g, "").replace(/ /g, "").replace(/-/g, "").toLowerCase();
    if (currentPointType === SDK)
        if (void 0 === sdkUnits[o]) n.points = "0", $(t).append('<li><a href="#">' + n.name + " (0)</a></li>");
        else {
            var s = sdkUnits[o];
            void 0 !== n.models && (s *= parseFloat(n.models)), $(t).append('<li><a href="#">' + n.name + " (" + s + ")</a></li>")
        }
    else if (void 0 !== n.points)
        if (currentSubType === SCGT) void 0 === scgtPoints[o] || "" !== scgtPoints[o][0].value && $(t).append('<li><a href="#">' + n.name + " (" + scgtPoints[o][0].value + ")</a></li>");
        else if (currentSubType === GW) {
        if (void 0 === gwPoints[o]);
        else if ("" !== gwPoints[o][0].value)
            if (gwPoints[o][0].desc.indexOf("Battleline") >= 0) {
                var i = gwPoints[o][0].desc.split("-");
                i[i.length - 1] = "<span style='color:brown'>" + i[i.length - 1] + "</span>";
                for (var r = "", d = 0; d < i.length; d++) 0 !== d && (r += " - "), r += i[d];
                $(t).append('<li><a href="#"><b>' + n.name + "</b> (" + gwPoints[o][0].value + ") <small><i>" + r + "</i></small></a></li>")
            } else $(t).append('<li><a href="#"><b>' + n.name + "</b> (" + gwPoints[o][0].value + ") <small><i>" + gwPoints[o][0].desc + "</i></small></a></li>")
    } else $(t).append('<li><a href="#">' + n.name + " (" + n.points + ")</a></li>");
    else $(t).append('<li><a href="#">' + n.name + " (1)</a></li>");
    if (a[n.name] = n, currentSubType === SCGT)
        if (void 0 === scgtPoints[o]);
        else {
            a[n.name];
            if (a[n.name].points = scgtPoints[o][0].value, void 0 !== a[n.name].models && "Formation" !== scgtPoints[o][0].models) {
                var p = parseInt(a[n.name].wounds) / parseInt(a[n.name].models);
                a[n.name].models = scgtPoints[o][0].models, a[n.name].wounds = parseInt(scgtPoints[o][0].models) * p
            }
        }
    if (currentSubType === GW)
        if (void 0 === gwPoints[o]);
        else {
            a[n.name];
            if (a[n.name].points = gwPoints[o][0].value, a[n.name].desc = gwPoints[o][0].desc, gwPoints[o][0].desc.indexOf("Battleline") >= 0) {
                var i = gwPoints[o][0].desc.split("-");
                i[i.length - 1] = "<span style='color:brown'>" + i[i.length - 1] + "</span>";
                for (var r = "", d = 0; d < i.length; d++) 0 !== d && (r += " - "), r += i[d];
                a[n.name].desc = r
            }
            if (void 0 !== a[n.name].models && "Formation" !== gwPoints[o][0].models) {
                var p = parseInt(a[n.name].wounds) / parseInt(a[n.name].models);
                a[n.name].models = gwPoints[o][0].models, a[n.name].wounds = parseInt(gwPoints[o][0].models) * p
            }
        }
}

function loadUnits() {
    void 0 !== currentLoadedArmy && ($("#heroesDropDownList").empty(), $.each(currentLoadedArmy.heroes,
        function(t, a) {
            loadUnitInfo("#heroesDropDownList", currentLoadedHeroes, t, a)
        }), $("#unitsDropDownList").empty(), $.each(currentLoadedArmy.units,
        function(t, a) {
            loadUnitInfo("#unitsDropDownList", currentLoadedUnits, t, a)
        }), $("#monstersDropDownList").empty(), $.each(currentLoadedArmy.monsters,
        function(t, a) {
            loadUnitInfo("#monstersDropDownList", currentLoadedMonsters, t, a)
        }), $("#warmachinesDropDownList").empty(), void 0 !== currentLoadedArmy.warmachines && $.each(currentLoadedArmy.warmachines,
        function(t, a) {
            loadUnitInfo("#warmachinesDropDownList", currentLoadedWarmachines, t, a)
        }), $("#formationsDropDownList").empty(), void 0 !== currentLoadedArmy.formations && $.each(currentLoadedArmy.formations,
        function(t, a) {
            loadUnitInfo("#formationsDropDownList", currentLoadedFormations, t, a)
        }), $("#heroesDropDownList li a").click(
        function(t) {
            addHero($(this).text().substring(0, $(this).text().indexOf("(") - 1)), t.preventDefault()
        }), $("#unitsDropDownList li a").click(
        function(t) {
            addUnit($(this).text().substring(0, $(this).text().indexOf("(") - 1)), t.preventDefault()
        }), $("#monstersDropDownList li a").click(
        function(t) {
            addMonster($(this).text().substring(0, $(this).text().indexOf("(") - 1)), t.preventDefault()
        }), $("#warmachinesDropDownList li a").click(
        function(t) {
            addWarmachine($(this).text().substring(0, $(this).text().indexOf("(") - 1)), t.preventDefault()
        }), $("#formationsDropDownList li a").click(
        function(t) {
            addFormation($(this).text().substring(0, $(this).text().indexOf("(") - 1)), t.preventDefault()
        }), $("#heroesDropDownList li").sort(asc_sort).appendTo("#heroesDropDownList"), $("#unitsDropDownList li").sort(asc_sort).appendTo("#unitsDropDownList"), $("#monstersDropDownList li").sort(asc_sort).appendTo("#monstersDropDownList"), $("#warmachinesDropDownList li").sort(asc_sort).appendTo("#warmachinesDropDownList"), $("#formationsDropDownList li").sort(asc_sort).appendTo("#formationsDropDownList"))
}

function createArmyLink(t, a) {
    var e = "";
    "Beasts Of Chaos" == currentLoadedArmyLabel ? e = "BC" : "Bretonnia" == currentLoadedArmyLabel ? e = "BR" : "Daemons Of Chaos" == currentLoadedArmyLabel ? e = "DC" : "Dark Aelves" == currentLoadedArmyLabel ? e = "DA" : "Duardin" == currentLoadedArmyLabel ? e = "DU" : "High Aelves" == currentLoadedArmyLabel ? e = "HE" : "Legion Of Azgorh" == currentLoadedArmyLabel ? e = "LA" : "Seraphon" == currentLoadedArmyLabel ? e = "SN" : "Monstrous Arcanum" == currentLoadedArmyLabel ? e = "MA" : "Ogors Of Destruction" == currentLoadedArmyLabel ? e = "OD" : "Orruks And Grots Of Destruction" == currentLoadedArmyLabel ? e = "OG" : "Skaven" == currentLoadedArmyLabel ? e = "SK" : "Stormcast Eternals" == currentLoadedArmyLabel ? e = "SE" : "Free People" == currentLoadedArmyLabel ? e = "FP" : "Tamurkhans Horde" == currentLoadedArmyLabel ? e = "TH" : "Tomb Kings" == currentLoadedArmyLabel ? e = "TK" : "Vampires" == currentLoadedArmyLabel ? e = "VA" : "Mortals Of Chaos" == currentLoadedArmyLabel ? e = "MC" : "Wood Aelves" == currentLoadedArmyLabel ? e = "WA" : "Khorne Bloodbound" == currentLoadedArmyLabel && (e = "KB");
    var n = "";
    if ("chaos" === a ? (n = "label-danger", e = "") : "order" === a ? (n = "label-info", e = "") : "death" === a ? (n = "label-default", e = "") : "destruction" === a ? (n = "label-success", e = "") : "ma" === a && (n = "label-warning", e = ""), null === currentArmyLink || void 0 === currentArmyLink) {
        "http://www.games-workshop.com/resources/PDF/AoS_Warscrolls/warhammer-aos-" + t.replace(/ /g, "").replace(/-/g, "").toLowerCase() + "-en.pdf";
        return '<span class="label ' + n + '" style="margin-right:10px !important;margin-left:10px !important; font-size: 11px !important">' + e + "</span>"
    }
    return '<span class="label ' + n + '"  style="margin-right:10px !important;margin-left:10px !important;font-size: 11px !important ">' + e + "</span>"
}

function createFactionLabel(t) {
    return ""
}

function updateArmyCounts() {
    var t = 1,
        a = 4,
        e = 2,
        n = 2,
        o = 2;
    poolLimit >= 1001 && (t = 1, a = 6, e = 3, n = 4, o = 4), poolLimit >= 2001 && (t = 1, a = 8, e = 4, n = 5, o = 5), $("#leaderConter").css("color", "black"), $("#battlelineCounter").css("color", "black"), $("#behemothCounter").css("color", "black"), $("#artilleryCounter").css("color", "black"), $("#leaderConter").empty().append("<b>Leaders:</b> " + leaderUnits.length + "/" + a), leaderUnits.length < t && ($("#leaderConter").append("<small> (Min " + t + ")</small>"), $("#leaderConter").css("color", "brown")), leaderUnits.length > a && $("#leaderConter").css("color", "brown"), $("#battlelineCounter").empty().append("<b>Battelines:</b> " + battlelineUnits.length), battlelineUnits.length < e && ($("#battlelineCounter").append("<small> (Min " + e + ")</small>"), $("#battlelineCounter").css("color", "brown")), $("#behemothCounter").empty().append("<b>Behemoths:</b> " + behemothUnits.length + "/" + n), behemothUnits.length > n && $("#behemothCounter").css("color", "brown"), $("#artilleryCounter").empty().append("<b>Artillery:</b> " + artilleryUnits.length + "/" + o), artilleryUnits.length > o && $("#artilleryCounter").css("color", "brown"), 0 === leaderUnits.length && (generalSelected = !1)
}

function addHero(t, a) {
    leaderUnits.push(t), currentLoadedHeroes[t].desc.indexOf("Behemoth") >= 0 && behemothUnits.push(t), updateArmyCounts();
    var e = {};
    e.id = idCounter++, armyListData[currentLoadedArmyLabel].heroes.push(e);
    var n = "";
    n += '<div class="panel panel-default"><div class="panel-heading"><div class="row"><div class="col-xs-4"><b>' + t + "</b>", n += '</div><div class="col-xs-5" style="text-align: right"><span> ' + currentLoadedHeroes[t].wounds + "</span>", n += ' <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span><span>', e.name = t, e.wounds = currentLoadedHeroes[t].wounds;
    var o = getUnitID(t);
    if (void 0 !== sdkUnits[o] && currentPointType === SDK) {
        var s = a ? a.cost : sdkUnits[o];
        n += "&nbsp&nbsp&nbsp" + s + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', e.cost = s
    } else if (void 0 !== currentLoadedHeroes[t].points) {
        var s = a ? a.cost : currentLoadedHeroes[t].points;
        n += "&nbsp&nbsp&nbsp" + s + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', e.cost = s
    }
    n += "</span></div>";
    var i = ++idCounter + "removeID";
    n += '<div class="col-xs-3" style="text-align: right"><button type="button" class="btn btn-default btn-xs" data-name="' + t + '" id="' + i + '" aria-label="Remove"><span  class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div></div><div class="panel-body smallerTextPanel">';
    var r = ++idCounter + "generalDropDown",
        d = ++idCounter + "generalDropDownList",
        p = ++idCounter + "thisGeneralSpanID";
    n += '<span class="dropdown generalDropDown" id=\'' + p + "' style='padding-right:5px'>", n += "<span style='color:brown'>General:</span> ", n += '<button class="btn btn-default dropdown-toggle btn-xs " type="button" id="' + r + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">', n += "No", n += '<span class="caret"></span>', n += "</button>", n += '<ul class="dropdown-menu" aria-labelledby="' + r + '" id="' + d + '">', n += '<li><a href="#" data-parentDropDownId="' + r + '">Yes</a></li>', n += "</ul>", n += "</span>", e.general = "No";
    var l = ++idCounter + "dropDown",
        c = ++idCounter + "dropDownList";
    if (void 0 !== sdkUnitOptions[o])
        if (currentPointType === SDK) {
            n += "<span class=\"dropdown\" style='padding-right:5px'>", n += "Equip: ", n += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + l + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
            var u = a ? a.selectedWeapon : sdkUnitOptions[o][0].option + " (" + sdkUnitOptions[o][0].value + ") ";
            n += u, n += '<span class="caret"></span>', n += "</button>", n += '<ul class="dropdown-menu" aria-labelledby="ddId" id="' + c + '">';
            for (var m = 0; m < sdkUnitOptions[o].length; m++) {
                n += '<li><a href="#" onClick="changeHeroOption(this)" data-parentDropDownId="' + l + '" data-cost="' + sdkUnitOptions[o][m].value + '">' + sdkUnitOptions[o][m].option + " (" + sdkUnitOptions[o][m].value + ")</a></li>"
            }
            n += "</ul>", n += "</span>", e.equip = a ? a.equip : sdkUnitOptions[o][0].option, e.selectedWeapon = u
        } else {
            n += "<span class=\"dropdown\" style='padding-right:5px'>", n += "Equip: ", n += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + l + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
            var u = a ? a.selectedWeapon : sdkUnitOptions[o][0].option + " ";
            n += u, n += '<span class="caret"></span>', n += "</button>", n += '<ul class="dropdown-menu" aria-labelledby="ddId" id="' + c + '">';
            for (var m = 0; m < sdkUnitOptions[o].length; m++) {
                n += '<li><a href="#" data-parentDropDownId="' + l + '" data-cost="' + sdkUnitOptions[o][m].value + '">' + sdkUnitOptions[o][m].option + "</a></li>"
            }
            n += "</ul>", n += "</span>", e.equip = a ? a.equip : sdkUnitOptions[o][0].option, e.selectedWeapon = u
        }
    var h = ++idCounter + "mountDropDown",
        y = ++idCounter + "mountDropDownList";
    if (void 0 !== mountOptions[t] && currentPointType !== SDK) {
        n += '<span class="dropdown" >', n += "Mount: ", n += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + h + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
        var v = a ? a.mount : "None";
        n += v, n += '<span class="caret"></span>', n += "</button>", n += '<ul class="dropdown-menu" aria-labelledby="' + h + '" id="' + y + '">', $.each(mountOptions[t],
            function(t, a) {
                n += '<li><a href="#" data-parentDropDownId="' + h + '">' + a.name + "</a></li>"
            }), n += "</ul>", n += "</span>", e.mount = v
    }
    var f = ++idCounter + "artefactDropDown",
        g = ++idCounter + "artefactDropDownList";
    if (e.artefact = "None", void 0 !== artefacts[currentFactionType] && currentLoadedHeroes[t].desc.indexOf("Unique") < 0) {
        n += "<span class=\"dropdown\" style='padding-right:5px'>", n += "Artefact: ", n += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + f + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
        var L = a ? a.artefact : "None";
        n += L, n += '<span class="caret"></span>', n += "</button>", n += '<ul class="dropdown-menu" aria-labelledby="' + f + '" id="' + g + '">', $.each(artefacts[currentFactionType],
            function(t, a) {
                n += '<li><a href="#" data-parentDropDownId="' + f + '">' + a.artefact + "</a></li>"
            }), void 0 !== artefacts[currentLoadedArmyLabel.toLowerCase().replace(/ /g, "")] && $.each(artefacts[currentLoadedArmyLabel.toLowerCase().replace(/ /g, "")],
            function(t, a) {
                var e = a.artefact.replace("(Wizard Only)", "<small>- Wizard Only</small>");
                n += '<li><a href="#" data-parentDropDownId="' + f + '">' + e + "<small> - " + currentLoadedArmyLabel + "</small></a></li>"
            }), n += "</ul>", n += "</span>", e.artefact = L
    }
    var D = ++idCounter + "artefactDropDown",
        b = ++idCounter + "artefactDropDownList",
        w = ++idCounter + "commandTraitSpan";
    if (e.commandTrait = "None", void 0 !== commandTraits[currentFactionType] && currentLoadedHeroes[t].desc.indexOf("Unique") < 0) {
        n += "<span class=\"dropdown\" style='padding-right:5px; display:none' id='" + w + "'>", n += "Command Trait: ", n += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + D + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
        var S = a ? a.commandTrait : "None";
        n += S, n += '<span class="caret"></span>', n += "</button>", n += '<ul class="dropdown-menu" aria-labelledby="' + D + '" id="' + b + '">', $.each(commandTraits[currentFactionType],
            function(t, a) {
                n += '<li><a href="#" data-parentDropDownId="' + D + '">' + a.commandTrait + "</a></li>"
            }), void 0 !== commandTraits[currentLoadedArmyLabel.toLowerCase().replace(/ /g, "")] && $.each(commandTraits[currentLoadedArmyLabel.toLowerCase().replace(/ /g, "")],
            function(t, a) {
                var e = a.commandTrait.replace("(Wizard Only)", "<small>- Wizard Only</small>");
                n += '<li><a href="#" data-parentDropDownId="' + D + '">' + e + "<small> - " + currentLoadedArmyLabel + "</small></a></li>"
            }), n += "</ul>", n += "</span>", e.commandTrait = S
    }
    if (n += '<span style="float:right">' + currentLoadedHeroes[t].desc + " " + createArmyLink(t, currentFactionType) + " " + createFactionLabel(currentFactionType) + "</span></div></div>", $("#heroesPanelBody").append(n), void 0 !== sdkUnitOptions[o] && (currentPointType === SDK ? $("#" + c + " li a").click(
            function(t) {
                changeHeroOption(this), e.equip = this.text.split("(")[0], e.cost = this.dataset.cost, e.selectedWeapon = this.text, t.preventDefault()
            }) : $("#" + c + " li a").click(
            function(t) {
                $("#" + this.dataset.parentdropdownid).text(this.text + " ").append('<span class="caret"></span>'), e.equip = this.text, e.selectedWeapon = this.text, t.preventDefault()
            })), void 0 !== mountOptions[t] && currentPointType !== SDK && $("#" + y + " li a").click(
            function(t) {
                $("#" + this.dataset.parentdropdownid).text(this.text + " ").append('<span class="caret"></span>'), e.mount = this.text, t.preventDefault()
            }), void 0 !== artefacts[currentFactionType] && $("#" + g + " li a").click(
            function(t) {
                var a = this.text.split("-")[0];
                $("#" + this.dataset.parentdropdownid).text(a + " ").append('<span class="caret"></span>'), e.artefact = this.text, t.preventDefault()
            }), void 0 !== commandTraits[currentFactionType] && $("#" + b + " li a").click(
            function(t) {
                var a = this.text.split("-")[0];
                $("#" + this.dataset.parentdropdownid).text(a + " ").append('<span class="caret"></span>'), e.commandTrait = this.text, t.preventDefault()
            }), generalSelected && $("#" + p).css("display", "none"), $("#" + d + " li a").click(
            function(t) {
                "Yes" === this.text ? ($("#" + this.dataset.parentdropdownid).text(this.text + " ").append('<span class="caret"></span>'), e.general = this.text, generalSelected = !0, $.each($(".generalDropDown"),
                    function(t, a) {
                        $(a).css("display", "none")
                    }), $("#" + p).css("display", "inline-block"), $("#" + w).css("display", "inline-block"), this.text = "No") : ($("#" + this.dataset.parentdropdownid).text(this.text + " ").append('<span class="caret"></span>'), e.general = this.text, e.commandTrait = "None", generalSelected = !1, $.each($(".generalDropDown"),
                    function(t, a) {
                        $(a).css("display", "inline-block")
                    }), $("#" + w).css("display", "none"), this.text = "Yes"), t.preventDefault()
            }), $("#" + i).click(
            function(t) {
                removePanel(this, e), t.preventDefault()
            }), $(".totalPointsSpan").empty(), void 0 !== sdkUnits[o] && currentPointType === SDK) {
        var U = a ? a.cost : sdkUnits[o];
        totalPoints += parseFloat(U)
    } else void 0 !== currentLoadedHeroes[t].points ? totalPoints += parseFloat(currentLoadedHeroes[t].points) : ++totalPoints;
    $(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), totalWounds += parseInt(currentLoadedHeroes[t].wounds), $("#totalWoundsSpan").append(totalWounds)
}

function addUnit(t, a) {
    for (var e = 1, n = 0; e > n; n++) currentLoadedUnits[t].desc.indexOf("Behemoth") >= 0 && behemothUnits.push(t), currentLoadedUnits[t].desc.indexOf("Battleline") >= 0 && battlelineUnits.push(t), currentLoadedUnits[t].desc.indexOf("Artillery") >= 0 && artilleryUnits.push(t), updateArmyCounts();
    var o = {};
    o.id = idCounter++, o.name = t, o.champDelta = a ? a.champDelta : 0, armyListData[currentLoadedArmyLabel].units.push(o);
    var s = "",
        i = idCounter++,
        r = idCounter++,
        d = idCounter++,
        p = idCounter++,
        l = "pointSpan" + idCounter++;
    s += a ? '<div class="panel panel-default" data-count="' + a.addCount + '"><div class="panel-heading"><div class="row"><div class="col-xs-4"><b>' + t + "</b>" : '<div class="panel panel-default" data-count="1"><div class="panel-heading"><div class="row"><div class="col-xs-4"><b>' + t + "</b>", s += '</div><div class="col-xs-5" style="text-align: right"><p class="text-nowrap">';
    var c = a ? a.wounds : currentLoadedUnits[t].wounds,
        u = a ? a.models : currentLoadedUnits[t].models;
    o.wounds = parseInt(c),

        o.models = u, o.addCount = a ? a.addCount : 1, s += u + ' <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp&nbsp&nbsp', s += c + ' <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>';
    var m, h = getUnitID(t),
        y = "";
    if (void 0 !== sdkUnits[h] && currentPointType === SDK)
        if (m = sdkUnits[h] * parseFloat(currentLoadedUnits[t].models), void 0 !== sdkUnitOptions[h]) {
            y = a ? a.weaponCost : sdkUnitOptions[h][0].value;
            var v = a ? a.cost : y * parseFloat(currentLoadedUnits[t].models);
            s += "&nbsp&nbsp&nbsp<span id='" + l + "'>" + v + '</span> <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', o.cost = v, o.weaponCost = y, o.pointSpanId = l
        } else {
            var v = a ? a.cost : m;
            s += "&nbsp&nbsp&nbsp<span id='" + l + "'>" + v + '</span> <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', o.cost = v, o.pointSpanId = l
        }
    else if (void 0 !== currentLoadedUnits[t].points) {
        var v = a ? a.cost : currentLoadedUnits[t].points;
        s += "&nbsp&nbsp&nbsp" + v + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', o.cost = v
    }
    s += '</p></div><div class="col-xs-3" style="text-align: right"><button type="button" class="btn btn-default btn-xs" style="float:left" data-name="' + t + '" data-weapon="' + y + '" id="' + i + '" aria-label="Subtract"><span  class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><button type="button" class="btn btn-default btn-xs" style="float:left" data-name="' + t + '" data-weapon="' + y + '" id="' + r + '" aria-label="Add"><span  class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><button type="button" class="btn btn-default btn-xs" style="" data-name="' + t + '" data-weapon="' + y + '" id="' + p + '"  aria-label="Add"><span  class="glyphicon glyphicon-duplicate" aria-hidden="true"></span></button><button type="button" class="btn btn-default btn-xs" style="" data-name="' + t + '" data-weapon="' + y + '" id="' + d + '" aria-label="Remove"><span  class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div></div><div class="panel-body smallerTextPanel">';
    var f = ++idCounter + "dropDown",
        g = ++idCounter + "dropDownList",
        L = ++idCounter + "noCostDropDown",
        D = ++idCounter + "noCostDropDownList",
        b = ++idCounter + "chmpDropDown",
        w = ++idCounter + "chmpDropDownList",
        S = !0;
    if (void 0 !== sdkUnitOptions[h])
        if (currentPointType === SDK) {
            s += "<span class=\"dropdown\" style='padding-right:5px'>", s += "Equip: ", s += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + f + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
            var U = a ? a.selectedWeapon : sdkUnitOptions[h][0].option + " (" + sdkUnitOptions[h][0].value + ") ";
            s += U, s += '<span class="caret"></span>', s += "</button>", s += '<ul class="dropdown-menu" aria-labelledby="ddId" id="' + g + '">';
            for (var n = 0; n < sdkUnitOptions[h].length; n++) {
                s += '<li><a href="#" data-parentDropDownId="' + f + '" data-cost="' + sdkUnitOptions[h][n].value + '" data-updateList="' + [i, r, d] + '">' + sdkUnitOptions[h][n].option + " (" + sdkUnitOptions[h][n].value + ")</a></li>"
            }
            s += "</ul>", s += "</span>", o.equip = a ? a.equip : sdkUnitOptions[h][0].option, o.selectedWeapon = U
        } else {
            s += "<span class=\"dropdown\" style='padding-right:5px'>", s += "Equip: ", s += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + f + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
            var U = a ? a.selectedWeapon : sdkUnitOptions[h][0].option + " ";
            s += U, s += '<span class="caret"></span>', s += "</button>", s += '<ul class="dropdown-menu" aria-labelledby="ddId" id="' + g + '">';
            for (var n = 0; n < sdkUnitOptions[h].length; n++) {
                s += '<li><a href="#" data-parentDropDownId="' + f + '" data-cost="' + sdkUnitOptions[h][n].value + '" data-updateList="' + [i, r, d] + '">' + sdkUnitOptions[h][n].option + "</a></li>"
            }
            s += "</ul>", s += "</span>", o.equip = a ? a.equip : sdkUnitOptions[h][0].option, o.selectedWeapon = U
        }
    if (void 0 !== sdkUnitChampions[h] && currentPointType === SDK) {
        s += "<span class=\"dropdown\" style='padding-right:5px'>", s += "Champion: ", s += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + b + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
        var x = a && "None" != a.champion ? a.champion + " (" + a.champDelta + ")" : "None ";
        if (s += x, s += '</span><span class="caret"></span>', s += "</button>", s += '<ul class="dropdown-menu" aria-labelledby="' + b + '" id="' + w + '">', s += '<li><a href="#" data-parentDropDownId="' + b + '" data-cost="" data-updateList="' + [i, r, d] + '">None</a></li>', void 0 === sdkUnitOptions[h] && void 0 !== sdkUnitOptions[getUnitID(sdkUnitChampions[h])])
            for (var n = 0; n < sdkUnitOptions[getUnitID(sdkUnitChampions[h])].length; n++) s += '<li><a href="#" data-parentDropDownId="' + b + '" data-chmpCost="' + sdkUnitOptions[getUnitID(sdkUnitChampions[h])][n].value + '" data-updateList="' + [i, r, d] + '">' + sdkUnitChampions[h] + "-" + sdkUnitOptions[getUnitID(sdkUnitChampions[h])][n].option + "</a></li>";
        else if (void 0 !== sdkUnitOptions[h] && void 0 !== sdkUnitOptions[getUnitID(sdkUnitChampions[h])])
            if (sdkUnitOptions[h].length !== sdkUnitOptions[getUnitID(sdkUnitChampions[h])].length ? S = !1 : $.each(sdkUnitOptions[h],
                    function(t, a) {
                        sdkUnitOptions[h][t].option !== sdkUnitOptions[getUnitID(sdkUnitChampions[h])][t].option && (S = !1)
                    }), S) s += '<li><a href="#" data-parentDropDownId="' + b + '" data-cost="" data-updateList="' + [i, r, d] + '">' + sdkUnitChampions[h] + "</a></li>";
            else
                for (var n = 0; n < sdkUnitOptions[getUnitID(sdkUnitChampions[h])].length; n++) s += '<li><a href="#" data-parentDropDownId="' + b + '" data-chmpCost="' + sdkUnitOptions[getUnitID(sdkUnitChampions[h])][n].value + '" data-updateList="' + [i, r, d] + '">' + sdkUnitChampions[h] + "-" + sdkUnitOptions[getUnitID(sdkUnitChampions[h])][n].option + "</a></li>";
        else s += '<li><a href="#" data-parentDropDownId="' + b + '" data-cost="" data-updateList="' + [i, r, d] + '">' + sdkUnitChampions[h] + "</a></li>";
        s += "</ul>", s += "</span>", o.champion = "None " === x ? "None" : x
    }
    if (void 0 !== bannerOptions[h]) {
        s += "<span class=\"dropdown\" style='padding-right:5px'>", s += "Banner: ", s += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + L + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
        var P = a ? a.banner : bannerOptions[h][0].option + " ";
        s += P, s += '</span><span class="caret"></span>', s += "</button>", s += '<ul class="dropdown-menu" aria-labelledby="' + L + '" id="' + D + '">';
        for (var n = 0; n < bannerOptions[h].length; n++) {
            s += '<li><a href="#" data-parentDropDownId="' + L + '" data-cost="' + bannerOptions[h][n].value + '" data-updateList="' + [i, r, d] + '">' + bannerOptions[h][n].option + "</a></li>"
        }
        s += "</ul>", s += "</span>", o.banner = P
    }
    var O = ++idCounter + "mountDropDown",
        T = ++idCounter + "mountDropDownList";
    if (void 0 !== musicianOptions[t]) {
        s += '<span class="dropdown" >', s += "Musician: ", s += '<button class="btn btn-default dropdown-toggle btn-xs" type="button" id="' + O + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
        var k = a ? a.mus : musicianOptions[t][0].name + " ";
        s += k, s += '<span class="caret"></span>', s += "</button>", s += '<ul class="dropdown-menu" aria-labelledby="' + O + '" id="' + T + '">', $.each(musicianOptions[t],
            function(t, a) {
                s += '<li><a href="#" data-parentDropDownId="' + O + '">' + a.name + "</a></li>"
            }), s += "</ul>", s += "</span>", o.mus = k
    }
    var A = [];
    void 0 !== optionalLoadoutOptions[h] && currentPointType !== SDK && (o.optionalLoadouts = [], $.each(optionalLoadoutOptions[h],
        function(t, a) {
            var e = ++idCounter + "optLoadInput";
            A.push(e), o.optionalLoadouts.push({
                type: a.option,
                amount: 0
            }), s += "<span style='display:inline-block; padding-left:10px'>", s += "<form class='form-inline'>", s += a.option + ":<input class='form-control' id='" + e + '\' style=\'width:40px !important; padding: 0px !important;padding-left: 5px !important; height:25px !important; margin: 2px !important; display:inline !important\' type="number" name="quantity" min="0" max="1000" value=\'0\'>', s += "</form>", s += "</span>"
        })), s += '<span style="float:right"> ' + currentLoadedUnits[t].desc + " " + createArmyLink(t, currentFactionType) + " " + createFactionLabel(currentFactionType) + "</span></div></div>", $("#unitsPanelBody").append(s), void 0 !== musicianOptions[t] && $("#" + T + " li a").click(
        function(t) {
            $("#" + this.dataset.parentdropdownid).text(this.text + " ").append('<span class="caret"></span>'), o.mus = this.text, t.preventDefault()
        }), void 0 !== sdkUnitChampions[h] && $("#" + w + " li a").click(
        function(t) {
            var a = this.dataset;
            if (o.champion !== this.text.split("(")[0]) {
                if ("None" === this.text) return $("#" + l).empty().append(o.cost - o.champDelta), $(".totalPointsSpan").empty(), totalPoints -= o.champDelta, $(".totalPointsSpan").append(totalPoints), o.cost = o.cost - o.champDelta, o.champDelta = 0, o.champion = "None", $("#" + this.dataset.parentdropdownid).text("None ").append('<span class="caret"></span>'), void t.preventDefault();
                var e = this.text.indexOf("-") > 0,
                    n = getUnitID(e ? this.text.split("-")[0] : this.text.split("(")[0]),
                    s = sdkUnitOptions[n];
                if (o.champion = this.text.split("(")[0], void 0 === s) {
                    if (!e) {
                        var i = sdkUnits[n],
                            r = sdkUnits[h],
                            d = i - r;
                        $("#" + l).empty().append(o.cost + d), $(".totalPointsSpan").empty(), totalPoints += d, $(".totalPointsSpan").append(totalPoints), o.champDelta = d, o.cost = o.cost + o.champDelta, $("#" + this.dataset.parentdropdownid).text(this.text + " (" + d + ") ").append('<span class="caret"></span>')
                    }
                } else if (void 0 !== o.equip && "" !== o.equip && S) $.each(s,
                    function(t, e) {
                        if (e.option.toLowerCase().replace(/ /g, "") === o.equip.toLowerCase().replace(/ /g, "")) {
                            var n = e.value,
                                s = parseFloat(o.weaponCost),
                                i = n - s;
                            $("#" + l).empty().append(o.cost + i), $(".totalPointsSpan").empty(), totalPoints += i, $(".totalPointsSpan").append(totalPoints), o.champDelta = i, o.cost = o.cost + o.champDelta, $("#" + a.parentdropdownid).text(o.champion + " (" + i + ") ").append('<span class="caret"></span>')
                        }
                    });
                else {
                    var p = sdkUnitOptions[n],
                        c = this.text.split("-")[1];
                    $.each(p,
                        function(t, e) {
                            if (e.option.toLowerCase().replace(/ /g, "") === c.toLowerCase().replace(/ /g, "")) {
                                var n = e.value,
                                    s = parseFloat(sdkUnits[h]);
                                void 0 !== o.equip && (s = parseFloat(o.weaponCost));
                                var i = n - s;
                                o.cost = o.cost - o.champDelta, totalPoints -= o.champDelta, $("#" + l).empty().append(o.cost + i), $(".totalPointsSpan").empty(), totalPoints += i, $(".totalPointsSpan").append(totalPoints), o.champDelta = i, o.cost = o.cost + o.champDelta, $("#" + a.parentdropdownid).text(o.champion + " (" + i + ") ").append('<span class="caret"></span>')
                            }
                        })
                }
                t.preventDefault()
            }
        }), $.each(A,
        function(t, a) {
            $("#" + a).click(
                function() {
                    o.optionalLoadouts[t].amount = this.value
                })
        }), void 0 !== sdkUnitOptions[h] && (currentPointType === SDK ? $("#" + g + " li a").click(
        function(t) {
            changeUnitOption(this, o), o.equip = this.text.split("(")[0], o.selectedWeapon = this.text;
            var a = $("#" + b).text();
            if ("None " === a || "" === a) return void t.preventDefault();
            var e = getUnitID(a.split("(")[0]);
            a.indexOf("-") > 0 && (e = getUnitID(a.split("-")[0]));
            var n = sdkUnitOptions[e];
            if (o.champion = a.split("(")[0], o.cost = o.cost - o.champDelta, totalPoints -= o.champDelta, void 0 === n) {
                var s = sdkUnits[e],
                    i = sdkUnits[h],
                    r = s - i;
                $("#" + l).empty().append(o.cost + r), $(".totalPointsSpan").empty(), totalPoints += r, $(".totalPointsSpan").append(totalPoints), o.champDelta = r, o.cost = o.cost + o.champDelta, $("#" + b).text(o.champion + " (" + r + ") ").append('<span class="caret"></span>')
            } else if (S) $.each(n,
                function(t, a) {
                    if (a.option.toLowerCase().replace(/ /g, "") === o.equip.toLowerCase().replace(/ /g, "")) {
                        var e = a.value,
                            n = parseFloat(o.weaponCost),
                            s = e - n;
                        $("#" + l).empty().append(o.cost + s), $(".totalPointsSpan").empty(), totalPoints += s, $(".totalPointsSpan").append(totalPoints), o.champDelta = s, o.cost = o.cost + o.champDelta, $("#" + b).text(o.champion + " (" + s + ") ").append('<span class="caret"></span>')
                    }
                });
            else {
                var d = sdkUnitOptions[e],
                    p = $("#" + b).text().split("-")[1].split("(")[0];
                $.each(d,
                    function(t, a) {
                        if (a.option.toLowerCase().replace(/ /g, "") === p.toLowerCase().replace(/ /g, "")) {
                            var e = a.value,
                                n = parseFloat(sdkUnits[h]);
                            void 0 !== o.equip && (n = parseFloat(o.weaponCost));
                            var s = e - n;
                            $("#" + l).empty().append(o.cost + s), $(".totalPointsSpan").empty(), totalPoints += s, $(".totalPointsSpan").append(totalPoints), o.champDelta = s, o.cost = o.cost + o.champDelta, $("#" + b).text(o.champion + " (" + s + ") ").append('<span class="caret"></span>')
                        }
                    })
            }
            t.preventDefault()
        }) : $("#" + g + " li a").click(
        function(t) {
            $("#" + this.dataset.parentdropdownid).text(this.text + " ").append('<span class="caret"></span>'), o.equip = this.text, o.selectedWeapon = this.text, t.preventDefault()
        })), void 0 !== bannerOptions[h] && $("#" + D + " li a").click(
        function(t) {
            $("#" + this.dataset.parentdropdownid).text(this.text + " ").append('</span><span class="caret"></span>'), o.banner = this.text, t.preventDefault()
        }), $("#" + i).click(
        function(t) {
            removeUnitsFromThisScroll(this, o), t.preventDefault()
        }), $("#" + r).click(
        function(t) {
            addUnitsToThisScroll(this, o), t.preventDefault()
        }), $("#" + d).click(
        function(t) {
            removeUnitPanel(this, o), t.preventDefault()
        }), $("#" + p).click(
        function(t) {
            addUnit(o.name, o), t.preventDefault()
        }), $(".totalPointsSpan").empty(), totalPoints += a ? parseFloat(a.cost) : parseFloat(o.cost), $(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), totalWounds += a ? a.wounds : parseInt(currentLoadedUnits[t].wounds), $("#totalWoundsSpan").append(totalWounds)
}

function addMonster(t) {
    currentLoadedMonsters[t].desc.indexOf("Behemoth") >= 0 && behemothUnits.push(t), currentLoadedMonsters[t].desc.indexOf("Battleline") >= 0 && battlelineUnits.push(t), currentLoadedMonsters[t].desc.indexOf("Artillery") >= 0 && artilleryUnits.push(t), updateArmyCounts();
    var a = {};
    a.id = idCounter++, a.name = t, armyListData[currentLoadedArmyLabel].monsters.push(a);
    var e = "";
    e += '<div class="panel panel-default"><div class="panel-heading"><div class="row"><div class="col-xs-4"><b>' + t + "</b>", e += '</div><div class="col-xs-5" style="text-align: right">' + currentLoadedMonsters[t].wounds + ' <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>';
    var n = getUnitID(t);
    void 0 !== sdkUnits[n] && currentPointType === SDK ? (e += "&nbsp&nbsp&nbsp" + sdkUnits[n] + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = sdkUnits[n]) : void 0 !== currentLoadedMonsters[t].points && (e += "&nbsp&nbsp&nbsp" + currentLoadedMonsters[t].points + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = currentLoadedMonsters[t].points);
    var o = ++idCounter + "monsterRemoveID";
    e += '</div><div class="col-xs-3" style="text-align: right"><button type="button" class="btn btn-default btn-xs" data-name="' + t + '" id="' + o + '" aria-label="Remove"><span  class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div></div><div class="panel-body smallerTextPanel"><span style="float:right">' + currentLoadedMonsters[t].desc + " " + createArmyLink(t, currentFactionType) + " " + createFactionLabel(currentFactionType) + "</span></div></div>", $("#monstersPanelBody").append(e), $("#" + o).click(
        function(t) {
            removeMonsterPanel(this, a)
        }), $(".totalPointsSpan").empty(), void 0 !== sdkUnits[n] && currentPointType === SDK ? totalPoints += parseFloat(sdkUnits[n]) : void 0 !== currentLoadedMonsters[t].points ? totalPoints += parseFloat(currentLoadedMonsters[t].points) : ++totalPoints, $(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), totalWounds += parseInt(currentLoadedMonsters[t].wounds), $("#totalWoundsSpan").append(totalWounds)
}

function addWarmachine(t) {
    currentLoadedWarmachines[t].desc.indexOf("Behemoth") >= 0 && behemothUnits.push(t), currentLoadedWarmachines[t].desc.indexOf("Battleline") >= 0 && battlelineUnits.push(t), currentLoadedWarmachines[t].desc.indexOf("Artillery") >= 0 && artilleryUnits.push(t), updateArmyCounts();
    var a = {};
    a.id = idCounter++, a.name = t, armyListData[currentLoadedArmyLabel].warmachines.push(a);
    var e = "";
    e += '<div class="panel panel-default"><div class="panel-heading"><div class="row"><div class="col-xs-4"><b>' + t + "</b>", e += '</div><div class="col-xs-5" style="text-align: right">' + currentLoadedWarmachines[t].wounds + ' <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>';
    var n = getUnitID(t);
    void 0 !== sdkUnits[n] && currentPointType === SDK ? (e += "&nbsp&nbsp&nbsp" + sdkUnits[n] + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = sdkUnits[n]) : void 0 !== currentLoadedWarmachines[t].points && (e += "&nbsp&nbsp&nbsp" + currentLoadedWarmachines[t].points + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = currentLoadedWarmachines[t].points);
    var o = ++idCounter + "wmRemoveID";
    e += '</div><div class="col-xs-3" style="text-align: right"><button type="button" class="btn btn-default btn-xs" data-name="' + t + '" id="' + o + '" aria-label="Remove"><span  class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div></div><div class="panel-body smallerTextPanel"><span style="float:right">' + currentLoadedWarmachines[t].desc + " " + createArmyLink(t, currentFactionType) + " " + createFactionLabel(currentFactionType) + "</span></div></div>", $("#warmachinesPanelBody").append(e), $("#" + o).click(
        function(t) {
            removeWarmachinePanel(this, a)
        }), $(".totalPointsSpan").empty(), void 0 !== sdkUnits[n] && currentPointType === SDK ? totalPoints += parseFloat(sdkUnits[n]) : void 0 !== currentLoadedWarmachines[t].points ? totalPoints += parseFloat(currentLoadedWarmachines[t].points) : ++totalPoints, $(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), totalWounds += parseInt(currentLoadedWarmachines[t].wounds), $("#totalWoundsSpan").append(totalWounds)
}

function addFormation(t) {
    var a = {};
    a.id = idCounter++, a.name = t, armyListData[currentLoadedArmyLabel].formations.push(a);
    var e = "";
    e += '<div class="panel panel-default"><div class="panel-heading"><div class="row"><div class="col-xs-4"><b>' + t + "</b>", e += '</div><div class="col-xs-5" style="text-align: right">';
    var n = getUnitID(t);
    void 0 !== sdkUnits[n] && currentPointType === SDK ? (e += "&nbsp&nbsp&nbsp" + sdkUnits[n] + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = sdkUnits[n]) : void 0 !== currentLoadedFormations[t].points && (e += "&nbsp&nbsp&nbsp" + currentLoadedFormations[t].points + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = currentLoadedFormations[t].points);
    var o = ++idCounter + "wmRemoveID";
    e += '</div><div class="col-xs-3" style="text-align: right"><button type="button" class="btn btn-default btn-xs" data-name="' + t + '" id="' + o + '" aria-label="Remove"><span  class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div></div><div class="panel-body smallerTextPanel"><span style="float:right">' + currentLoadedFormations[t].desc + " " + createArmyLink(t, currentFactionType) + " " + createFactionLabel(currentFactionType) + "</span></div></div>", $("#formationsPanelBody").append(e), $("#" + o).click(
        function(t) {
            removeFormationPanel(this, a)
        }), $(".totalPointsSpan").empty(), void 0 !== sdkUnits[n] && currentPointType === SDK ? totalPoints += parseFloat(sdkUnits[n]) : void 0 !== currentLoadedFormations[t].points ? totalPoints += parseFloat(currentLoadedFormations[t].points) : ++totalPoints, $(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), totalWounds = totalWounds, $("#totalWoundsSpan").append(totalWounds)
}

function removePanel(t, a) {
    var e = leaderUnits.indexOf(a.name);
    e > -1 && (e = leaderUnits.splice(e, 1)), e = behemothUnits.indexOf(a.name), e > -1 && (e = behemothUnits.splice(e, 1)), updateArmyCounts(), $("#totalWoundsSpan").empty(), totalWounds -= parseInt(currentLoadedHeroes[t.dataset.name].wounds), $("#totalWoundsSpan").append(totalWounds), $(".totalPointsSpan").empty();
    var n = getUnitID(t.dataset.name);
    if (void 0 !== sdkUnits[n] && currentPointType === SDK) {
        var o = t.parentNode.parentNode,
            s = o.childNodes[1],
            i = s.childNodes[s.childNodes.length - 1],
            r = parseFloat(i.textContent);
        totalPoints -= r
    } else void 0 !== currentLoadedHeroes[t.dataset.name].points ? totalPoints -= parseFloat(currentLoadedHeroes[t.dataset.name].points) : --totalPoints;
    $(".totalPointsSpan").append(totalPoints);
    for (var d in armyListData) armyListData.hasOwnProperty(d) && (armyListData[d].heroes = armyListData[d].heroes.filter(
        function(t) {
            return JSON.stringify(t) !== JSON.stringify(a)
        }));
    $(t.parentNode.parentNode.parentNode.parentNode).remove()
}

function removeUnitPanel(t, a) {
    var e = t.parentNode.parentNode.parentNode.parentNode.dataset.count,
        n = battlelineUnits.indexOf(a.name);
    n > -1 && (n = battlelineUnits.splice(n, 1)), n = behemothUnits.indexOf(a.name), n > -1 && (n = behemothUnits.splice(n, 1)), n = artilleryUnits.indexOf(a.name), n > -1 && (n = artilleryUnits.splice(n, 1)), updateArmyCounts(), totalScrolls -= e, $(".totalPointsSpan").empty();
    var o = getUnitID(t.dataset.name);
    if (void 0 !== sdkUnits[o] && currentPointType === SDK)
        if ("" !== t.dataset.weapon) totalPoints = totalPoints - parseFloat(t.dataset.weapon) * (parseFloat(currentLoadedUnits[t.dataset.name].models) + (e - 1)) - a.champDelta;
        else {
            var s = currentLoadedUnits[t.dataset.name].models * parseFloat(sdkUnits[o]),
                i = parseFloat(sdkUnits[o]) * (e - 1);
            totalPoints = totalPoints - s - i - a.champDelta
        }
    else void 0 !== currentLoadedUnits[t.dataset.name].points ? totalPoints -= parseFloat(currentLoadedUnits[t.dataset.name].points * e) : --totalPoints;
    if ($(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), void 0 !== sdkUnits[o] && currentPointType === SDK) {
        var r = currentLoadedUnits[t.dataset.name].wounds,
            d = parseInt(currentLoadedUnits[t.dataset.name].wounds) / parseInt(currentLoadedUnits[t.dataset.name].models),
            p = (e - 1) * d;
        totalWounds = totalWounds - r - p
    } else totalWounds -= parseInt(currentLoadedUnits[t.dataset.name].wounds) * e;
    $("#totalWoundsSpan").append(totalWounds);
    for (var l in armyListData) armyListData.hasOwnProperty(l) && (armyListData[l].units = armyListData[l].units.filter(
        function(t) {
            return JSON.stringify(t) !== JSON.stringify(a)
        }));
    $(t.parentNode.parentNode.parentNode.parentNode).remove()
}

function removeMonsterPanel(t, a) {
    var e = battlelineUnits.indexOf(a.name);
    e > -1 && (e = battlelineUnits.splice(e, 1)), e = behemothUnits.indexOf(a.name), e > -1 && (e = behemothUnits.splice(e, 1)), e = artilleryUnits.indexOf(a.name), e > -1 && (e = artilleryUnits.splice(e, 1)), updateArmyCounts(), $(".totalPointsSpan").empty();
    var n = getUnitID(t.dataset.name);
    void 0 !== sdkUnits[n] && currentPointType === SDK ? totalPoints -= parseFloat(sdkUnits[n]) : void 0 !== currentLoadedMonsters[t.dataset.name].points ? totalPoints -= parseFloat(currentLoadedMonsters[t.dataset.name].points) : --totalPoints, $(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), totalWounds -= parseInt(currentLoadedMonsters[t.dataset.name].wounds), $("#totalWoundsSpan").append(totalWounds);
    for (var o in armyListData) armyListData.hasOwnProperty(o) && (armyListData[o].monsters = armyListData[o].monsters.filter(
        function(t) {
            return JSON.stringify(t) !== JSON.stringify(a)
        }));
    $(t.parentNode.parentNode.parentNode.parentNode).remove()
}

function removeWarmachinePanel(t, a) {
    var e = battlelineUnits.indexOf(a.name);
    e > -1 && (e = battlelineUnits.splice(e, 1)), e = behemothUnits.indexOf(a.name), e > -1 && (e = behemothUnits.splice(e, 1)), e = artilleryUnits.indexOf(a.name), e > -1 && (e = artilleryUnits.splice(e, 1)), updateArmyCounts(), $(".totalPointsSpan").empty();
    var n = getUnitID(t.dataset.name);
    void 0 !== sdkUnits[n] && currentPointType === SDK ? totalPoints -= parseFloat(sdkUnits[n]) : void 0 !== currentLoadedWarmachines[t.dataset.name].points ? totalPoints -= parseFloat(currentLoadedWarmachines[t.dataset.name].points) : --totalPoints, $(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), totalWounds = totalWounds, $("#totalWoundsSpan").append(totalWounds);
    for (var o in armyListData) armyListData.hasOwnProperty(o) && (armyListData[o].warmachines = armyListData[o].warmachines.filter(
        function(t) {
            return JSON.stringify(t) !== JSON.stringify(a)
        }));
    $(t.parentNode.parentNode.parentNode.parentNode).remove()
}

function removeFormationPanel(t, a) {
    $(".totalPointsSpan").empty();
    var e = getUnitID(t.dataset.name);
    void 0 !== sdkUnits[e] && currentPointType === SDK ? totalPoints -= parseFloat(sdkUnits[e]) : void 0 !== currentLoadedFormations[t.dataset.name].points ? totalPoints -= parseFloat(currentLoadedFormations[t.dataset.name].points) : --totalPoints, $(".totalPointsSpan").append(totalPoints), $("#totalWoundsSpan").empty(), totalWounds -= parseInt(currentLoadedFormations[t.dataset.name].wounds), $("#totalWoundsSpan").append(totalWounds);
    for (var n in armyListData) armyListData.hasOwnProperty(n) && (armyListData[n].formations = armyListData[n].formations.filter(
        function(t) {
            return JSON.stringify(t) !== JSON.stringify(a)
        }));
    $(t.parentNode.parentNode.parentNode.parentNode).remove()
}

function changeHeroOption(t) {
    var a = t.parentNode.parentNode.parentNode.parentNode.parentNode;
    updateHeroCost(a, t.dataset.cost), $("#" + t.dataset.parentdropdownid).text(t.text + " ").append('<span class="caret"></span>')
}

function changeUnitOption(t, a) {
    for (var e = t.dataset.updatelist.split(","), n = $("#" + e[0])[0].dataset.weapon, o = 0; o < e.length; o++) $("#" + e[o]).attr("data-weapon", t.dataset.cost);
    t.parentNode.parentNode.parentNode;
    updateScroll($("#" + e[0])[0], n, a), $("#" + t.dataset.parentdropdownid).text(t.text + " ").append('<span class="caret"></span>'), a.weaponCost = t.dataset.cost
}

function updateHeroCost(t, a) {
    var e = t.childNodes[0],
        n = e.childNodes[0],
        o = n.childNodes[1],
        s = o.childNodes[o.childNodes.length - 1],
        i = parseFloat(s.textContent);
    $(s).empty(), $(s).append("&nbsp&nbsp&nbsp" + a + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>'), $(".totalPointsSpan").empty(), totalPoints = totalPoints - i + parseFloat(a), $(".totalPointsSpan").append(totalPoints)
}

function updateScroll(t, a, e) {
    var n = parseInt(t.parentNode.parentNode.parentNode.parentNode.dataset.count);
    t.parentNode.parentNode.parentNode.parentNode.dataset.count = n, currentPointType === POOL && ($(t.parentNode.parentNode.childNodes[0]).empty(), $(t.parentNode.parentNode.childNodes[0]).append("<b>" + t.dataset.name + "</b> (" + n + ' <span class="glyphicon glyphicon-file" aria-hidden="true"></span>)')), $(t.parentNode.parentNode.childNodes[1]).empty();
    var o, s;
    if (currentPointType === POOL) o = parseInt(currentLoadedUnits[t.dataset.name].models) * n, s = parseInt(currentLoadedUnits[t.dataset.name].wounds) * n;
    else if (currentPointType === SDK) {
        var i = parseInt(currentLoadedUnits[t.dataset.name].wounds) / parseInt(currentLoadedUnits[t.dataset.name].models);
        o = parseInt(currentLoadedUnits[t.dataset.name].models) + (n - 1), s = i * o
    }
    var r = "<p>";
    r += o + ' <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp&nbsp&nbsp' + s + ' <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>';
    var d = getUnitID(t.dataset.name);
    if (void 0 !== sdkUnits[d] && currentPointType === SDK) {
        $(".totalPointsSpan").empty(), "" !== t.dataset.weapon ? (totalPoints -= o * parseFloat(a), totalPoints += o * parseFloat(t.dataset.weapon)) : totalPoints += parseFloat(sdkUnits[d]), $(".totalPointsSpan").append(totalPoints);
        var p = o * parseFloat(sdkUnits[d]);
        "" !== t.dataset.weapon && (p = o * t.dataset.weapon), p += e.champDelta, r += "&nbsp&nbsp&nbsp&nbsp<span id='" + e.pointSpanId + "'>" + p + '</span> <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', e.cost = p
    }
    $(t.parentNode.parentNode.childNodes[1]).append(r + "</p>")
}

function addUnitsToThisScroll(t, a) {
    $("#totalWoundsSpan").empty();
    var e = parseInt(t.parentNode.parentNode.parentNode.parentNode.dataset.count);
    ++e, t.parentNode.parentNode.parentNode.parentNode.dataset.count = e, $(t.parentNode.parentNode.childNodes[1]).empty();
    var n, o;
    if (currentPointType === POOL) n = parseInt(currentLoadedUnits[t.dataset.name].models) * e, o = parseInt(currentLoadedUnits[t.dataset.name].wounds) * e, totalWounds += parseInt(currentLoadedUnits[t.dataset.name].wounds);
    else if (currentPointType === SDK) {
        var s = parseInt(currentLoadedUnits[t.dataset.name].wounds) / parseInt(currentLoadedUnits[t.dataset.name].models);
        n = parseInt(currentLoadedUnits[t.dataset.name].models) + (e - 1), o = s * n, totalWounds += s
    }
    $("#totalWoundsSpan").append(totalWounds);
    var i = "<p>";
    i += n + ' <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp&nbsp&nbsp' + o + ' <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>', a.models = n, a.wounds = o, a.addCount = e;
    var r = getUnitID(t.dataset.name);
    if (void 0 !== sdkUnits[r] && currentPointType === SDK) {
        $(".totalPointsSpan").empty(), totalPoints += "" !== t.dataset.weapon ? parseFloat(t.dataset.weapon) : parseFloat(sdkUnits[r]), $(".totalPointsSpan").append(totalPoints);
        var d = n * parseFloat(sdkUnits[r]);
        "" !== t.dataset.weapon && (d = n * t.dataset.weapon), d += a.champDelta, i += "&nbsp&nbsp&nbsp<span id='" + a.pointSpanId + "'>" + d + '</span> <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = d
    } else if (void 0 !== currentLoadedUnits[t.dataset.name].points) {
        $(".totalPointsSpan").empty(), totalPoints += parseFloat(currentLoadedUnits[t.dataset.name].points), $(".totalPointsSpan").append(totalPoints);
        var d = parseFloat(currentLoadedUnits[t.dataset.name].points) * e;
        i += "&nbsp&nbsp&nbsp" + d + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = d
    }
    $(t.parentNode.parentNode.childNodes[1]).append(i + "</p>")
}

function removeUnitsFromThisScroll(t, a) {
    var e = parseInt(t.parentNode.parentNode.parentNode.parentNode.dataset.count);
    if (1 !== e) {
        $("#totalWoundsSpan").empty();
        var e = parseInt(t.parentNode.parentNode.parentNode.parentNode.dataset.count);
        --e, t.parentNode.parentNode.parentNode.parentNode.dataset.count = e, $(t.parentNode.parentNode.childNodes[1]).empty();
        var n, o;
        if (currentPointType === POOL) n = parseInt(currentLoadedUnits[t.dataset.name].models) * e, o = parseInt(currentLoadedUnits[t.dataset.name].wounds) * e, totalWounds -= parseInt(currentLoadedUnits[t.dataset.name].wounds);
        else if (currentPointType === SDK) {
            var s = parseInt(currentLoadedUnits[t.dataset.name].wounds) / parseInt(currentLoadedUnits[t.dataset.name].models);
            n = parseInt(currentLoadedUnits[t.dataset.name].models) + (e - 1), o = s * n, totalWounds -= s
        }
        $("#totalWoundsSpan").append(totalWounds);
        var i = "<p>";
        i += n + ' <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp&nbsp&nbsp' + o + ' <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>', a.models = n, a.wounds = o, a.addCount = e;
        var r = getUnitID(t.dataset.name);
        if (void 0 !== sdkUnits[r] && currentPointType === SDK) {
            $(".totalPointsSpan").empty(), totalPoints -= "" !== t.dataset.weapon ? parseFloat(t.dataset.weapon) : parseFloat(sdkUnits[r]), $(".totalPointsSpan").append(totalPoints);
            var d = n * parseFloat(sdkUnits[r]);
            "" !== t.dataset.weapon && (d = n * t.dataset.weapon), d += a.champDelta, i += "&nbsp&nbsp&nbsp<span id='" + a.pointSpanId + "'>" + d + '</span> <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = d
        } else if (void 0 !== currentLoadedUnits[t.dataset.name].points) {
            $(".totalPointsSpan").empty(), totalPoints -= parseFloat(currentLoadedUnits[t.dataset.name].points), $(".totalPointsSpan").append(totalPoints);
            var d = parseFloat(currentLoadedUnits[t.dataset.name].points) * e;
            i += "&nbsp&nbsp&nbsp" + d + ' <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>', a.cost = d
        }
        $(t.parentNode.parentNode.childNodes[1]).append(i + "</p>")
    }
}

function asc_sort(t, a) {
    return $(a).text() < $(t).text() ? 1 : -1
}

function dec_sort(t, a) {
    return $(a).text() > $(t).text() ? 1 : -1
}

function handleIt(t) {
    var a = $("#armyLimitInput").val(),
        e = parseInt(a);
    return isNaN(e) ? ($(".limitSpan").popover("hide"), t.preventDefault(), !1) : (currentPointType === POOL ? poolLimit = a : sdkLimit = a, $(".limitSpan").empty(), $(".limitSpan").append("" + a), $(".limitSpan").popover("hide"), updateArmyCounts(), t.preventDefault(), !1)
}

function closeArmyLimit(t) {
    $(".limitSpan").popover("hide"), t.preventDefault()
}

function showLimitPopover(t) {
    return t.preventDefault(), !1
}

function createTextArmy(t) {
    t.preventDefault(), $("#textArmyModal").modal("show"), $("#textListSpan").empty(), $("#textListSpan").append("<b>Leaders</b><br>"), $.each(armyListData,
            function(t, a) {
                $.each(a.heroes,
                    function(t, a) {
                        $("#textListSpan").append("" + a.name + " (" + a.cost + ")<br>"), "No" !== a.general && $("#textListSpan").append(" -<small> General</small><br>"), void 0 !== a.equip && $("#textListSpan").append(" -<small> " + a.equip + "</small><br>"), "None" !== a.commandTrait && $("#textListSpan").append(" -<small> Trait: " + a.commandTrait.split("-")[0] + "</small><br>"), "None" !== a.artefact && $("#textListSpan").append(" -<small> Artefact: " + a.artefact.split("-")[0] + "</small><br>")
                    })
            }), $("#textListSpan").append("<br>"), $("#textListSpan").append("<b>Units</b><br>"), $.each(armyListData,
            function(t, a) {
                $.each(a.units,
                    function(t, a) {
                        $("#textListSpan").append("" + a.name + " x " + a.models + " (" + a.cost + ")<br>"), void 0 !== a.equip && $("#textListSpan").append(" -<small> " + a.equip + "</small><br>")
                    })
            }), $("#textListSpan").append("<br>"), $("#textListSpan").append("<b>Behemoths</b><br>"), $.each(armyListData,
            function(t, a) {
                $.each(a.monsters,
                    function(t, a) {
                        $("#textListSpan").append("" + a.name + " (" + a.cost + ")<br>")
                    })
            }), $("#textListSpan").append("<br>"), $("#textListSpan").append("<b>War Machines</b><br>"), $.each(armyListData,
            function(t, a) {
                $.each(a.warmachines,
                    function(t, a) {
                        $("#textListSpan").append("" + a.name + " (" + a.cost + ")<br>")
                    })
            }), $("#textListSpan").append("<br>"), $("#textListSpan").append("<b>Batallions</b><br>"), $.each(armyListData,
            function(t, a) {
                $.each(a.formations,
                    function(t, a) {
                        $("#textListSpan").append("" + a.name + " (" + a.cost + ")<br>")
                    })
            }), $("#textListSpan").append("<br>"),
        $("#textListSpan").append("<b>Total:</b> " + totalPoints + "/" + poolLimit), $("#textListSpan").append("<br><br>")
}

function selectText(t) {
    if (document.selection) {
        var a = document.body.createTextRange();
        a.moveToElementText(document.getElementById(t)), a.select()
    } else if (window.getSelection) {
        var a = document.createRange();
        a.selectNode(document.getElementById(t)), window.getSelection().addRange(a)
    }
}

function createArmyURL(t) {
    t.preventDefault();
    window.location.protocol + "//" + window.location.host + "/";
    armyListData.currentPointType = currentPointType, armyListData.pointLimit = $(".limitSpan")[0].text, armyListData.currentSubType = currentSubType;
    var a = "";
    a += "http://www.scrollbuilder.com?";
    var e = LZString.compressToEncodedURIComponent(JSON.stringify(armyListData));
    a += e;
    var n = encodeURIComponent(JSON.stringify(armyListData));
    JSON.parse(decodeURIComponent(n));
    delete armyListData.currentPointType, delete armyListData.pointLimit, delete armyListData.currentSubType, $.getJSON("http://api.bitly.com/v3/shorten?callback=?", {
            format: "json",
            apiKey: "R_7a9a6993703940519347564e8612876f",
            login: "warscrollbuilder",
            longUrl: a
        },
        function(t) {
            $("#urlSpan").empty().append(t.data.url), $("#urlModal").modal("show")
        })
}

function myprint(t) {
    function a() {
        pageHeight = e.internal.pageSize.height, o * n >= pageHeight - 20 && (e.addPage(), o = 2)
    }
    t.preventDefault();
    var e = new jsPDF("p", "pt", "letter"),
        n = 25,
        o = 2;
    e.setFont("Helvetica"), e.setFontSize(12);
    var s = "Warscroll Builder - www.warscrollbuilder.com",
        i = e.getStringUnitWidth(s) * e.internal.getFontSize() / e.internal.scaleFactor,
        r = (e.internal.pageSize.width - i) / 2;
    e.text(r, o * n, s);
    var d = $(".totalPointsSpan")[0].innerHTML,
        p = $(".limitSpan")[0].text;
    o++;
    var l = [],
        c = [],
        u = [],
        m = [],
        h = [];
    for (var y in armyListData)
        if (armyListData.hasOwnProperty(y)) {
            for (var v in armyListData[y].heroes) l.push(armyListData[y].heroes[v]);
            for (var v in armyListData[y].units) c.push(armyListData[y].units[v]);
            for (var v in armyListData[y].monsters) u.push(armyListData[y].monsters[v]);
            for (var v in armyListData[y].warmachines) m.push(armyListData[y].warmachines[v]);
            for (var v in armyListData[y].formations) h.push(armyListData[y].formations[v])
        }
    l.length > 0 && (e.setFontSize(18), e.setFontType("normal"), e.setTextColor(0), e.text(20, o * n, "LEADERS"), e.line(20, o * n + 5, e.internal.pageSize.width - 20, o * n + 5), o++);
    for (var v in l) e.setFontSize(18), e.setFontType("normal"), e.setTextColor(0), a(), e.text(20, o * n, l[v].name + " (" + l[v].cost + ")"), o++, e.setFontSize(14), void 0 !== l[v].general && "No" !== l[v].general && (a(), e.text(25, o * n, "- General"), o++), void 0 !== l[v].equip && (a(), e.text(25, o * n, "- " + l[v].equip), o++), void 0 !== l[v].mount && "None" !== l[v].mount && (a(), e.text(25, o * n, "- " + l[v].mount), o++), void 0 !== l[v].artefact && "None" !== l[v].artefact && (a(), e.text(25, o * n, "- Artefact : " + l[v].artefact.split("-")[0]), o++), void 0 !== l[v].commandTrait && "None" !== l[v].commandTrait && (a(), e.text(25, o * n, "- Command Trait : " + l[v].commandTrait.split("-")[0]), o++);
    c.length > 0 && (o++, e.setFontSize(18), e.setFontType("normal"), e.setTextColor(0), a(), e.text(20, o * n, "UNITS"), e.line(20, o * n + 5, e.internal.pageSize.width - 20, o * n + 5), o++);
    for (var v in c)
        if (e.setFontSize(18), e.setTextColor(0), e.setFontType("normal"), a(), e.text(20, o * n, c[v].name + " x " + c[v].models + " (" + c[v].cost + ")"), o++, e.setFontSize(14), void 0 !== c[v].champion && " None" !== c[v].champion && (a(), e.text(25, o * n, "- " + c[v].champion), o++), void 0 !== c[v].equip && " None" !== c[v].equip && (a(), e.text(25, o * n, "-" + c[v].equip), o++), void 0 !== c[v].banner && (a(), e.text(25, o * n, "-" + c[v].banner), o++), void 0 !== c[v].mus && (a(), e.text(25, o * n, "- " + c[v].mus), o++), void 0 !== c[v].optionalLoadouts)
            for (var f in c[v].optionalLoadouts) a(), e.text(25, o * n, "-" + c[v].optionalLoadouts[f].type + " : " + c[v].optionalLoadouts[f].amount), o++;
    u.length > 0 && (o++, e.setFontSize(18), e.setFontType("normal"), e.setTextColor(0), a(), e.text(20, o * n, "MONSTERS"), e.line(20, o * n + 5, e.internal.pageSize.width - 20, o * n + 5), o++);
    for (var v in u) e.setFontSize(18), e.setTextColor(0), e.setFontType("normal"), a(), e.text(20, o * n, u[v].name + " (" + u[v].cost + ")"), o++;
    m.length > 0 && (o++, e.setFontSize(18), e.setFontType("normal"), e.setTextColor(0), a(), e.text(20, o * n, "WAR MACHINES"), e.line(20, o * n + 5, e.internal.pageSize.width - 20, o * n + 5), o++);
    for (var v in m) e.setFontSize(18), e.setTextColor(0), e.setFontType("normal"), a(), e.text(20, o * n, m[v].name + " (" + m[v].cost + ")"), o++;
    h.length > 0 && (o++, e.setFontSize(18), e.setFontType("normal"), e.setTextColor(0), a(), e.text(20, o * n, "BATTALIONS"), e.line(20, o * n + 5, e.internal.pageSize.width - 20, o * n + 5), o++);
    for (var v in h) e.setFontSize(18), e.setTextColor(0), e.setFontType("normal"), a(), e.text(20, o * n, h[v].name + " (" + h[v].cost + ")"), o++;
    o++, e.setFontSize(18), e.setFontType("normal"), s = "WOUNDS:    " + totalWounds + "     TOTAL POINTS:    " + d + " / " + p, i = e.getStringUnitWidth(s) * e.internal.getFontSize() / e.internal.scaleFactor, r = (e.internal.pageSize.width - i) / 2, a(), e.text(r, o * n, s);
    var g = prompt("Name of list?", "warscrollBuilderList");
    g = g.replace(/ /g, ""), e.save(g + ".pdf")
}
var armyFileNames = {},
    availablePoolArmies = {},
    availableSDKArmies = {},
    SDK = "SDK",
    POOL = "Pool",
    SCGT = "SCGT",
    KDV = "KDV",
    GW = "GW",
    poolLimit = "2000",
    sdkLimit = "1500",
    scgtLimit = "150",
    kdvLimit = "1500",
    currentPointType = POOL,
    currentSubType = GW,
    currentLoadedArmy = null,
    currentLoadedHeroes = [],
    currentLoadedUnits = [],
    currentLoadedMonsters = [],
    currentLoadedWarmachines = [],
    currentLoadedFormations = [],
    currentArmyLink = "",
    currentFactionType = "",
    scgtPoints = [],
    gwPoints = [],
    totalScrolls = 0,
    totalWounds = 0,
    totalPoints = 0,
    origSDKUnits = [],
    origSDKOptions = [],
    origSDKChampions = [],
    sdkUnits = [],
    sdkUnitOptions = [],
    sdkUnitChampions = [],
    kdvUnits = [],
    kdvUnitOptions = [],
    kdvUnitChampions = [],
    bannerOptions = [],
    optionalLoadoutOptions = [],
    mountOptions = {},
    musicianOptions = {},
    artefacts = {},
    commandTraits = {},
    generalSelected = !1,
    loadedSDKFiles = {},
    idCounter = 1,
    armyListData = {},
    currentLoadedArmyLabel = "",
    allArmies, totalArmies = 0,
    battlelineUnits = [],
    leaderUnits = [],
    behemothUnits = [],
    artilleryUnits = [];