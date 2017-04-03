var map = {};
var mobs = [];

var game = {

	loadLevel: function(level) {

		// Map
		map = {};
		mobs = [];
		map = new Map(level);
		
		view.displayMapBackground(level);
		view.displayFog();
		
		// Mobs
		for (mob=0;mob<Math.min(level.startLocations.length,heroes.length);mob++) {
			var newMob = new Mob(heroes[mob],level.startLocations[mob].x,level.startLocations[mob].y,heroes[mob].id);
			newMob.player = true;
			newMob.look(newMob.location);
		};
	
		for (mobIndex in level.mobs) {
			var newMob = new Mob(level.mobs[mobIndex].type,level.mobs[mobIndex].x,level.mobs[mobIndex].y,level.mobs[mobIndex].id,level.mobs[mobIndex].name,level.mobs[mobIndex].heritage);
			if (level.mobs[mobIndex].ai !== undefined) {
				newMob.ai = ai[level.mobs[mobIndex].ai];
			};
		};

	
	},
	
	findMob: function(id) {
		for (mob in mobs) {
			if (mobs[mob].id === id) {return mobs[mob]};
		}
	},
	
	archiveHeroes: function() {
		heroes = [];
		for (i in mobs) {
			if (mobs[i].player) {
				heroes.push(mobs[i]);
			};
		};
		mobs = [];
	},

	checkEndTurn: function() {
		var endTurn = true;
		for (i in mobs) {
			if (mobs[i].player && mobs[i].stats.move > 0) {
				endTurn = false;
			};
		};
		if (endTurn) {game.endTurn()};
	},
	
	endTurn: function() {

		// Refresh Stats for AI Mobs
		for (i in mobs) {
			if (!mobs[i].player) {
				game.refreshStats(mobs[i]);
			};
		};
	
		for (i in mobs) {
			if (!mobs[i].player && mobs[i].stats.morale > 0) {
				mobs[i].ai();
			};
		};
	
		// Refresh Stats for Player Mobs
		for (i in mobs) {
			if (mobs[i].player) {
				game.refreshStats(mobs[i]);
			};
		};
	
	},
	
	refreshStats: function(mob) {
		var adjustedStrengthMax = mob.stats.strengthMax;
		for (w in mob.wounds.strength) {
			adjustedStrengthMax += mob.wounds.strength[w].penalty;
		};
		if (mob.stats.strength < adjustedStrengthMax) {
			mob.stats.strength++;
		};
		
		var adjustedFocusMax = mob.stats.focusMax;
		for (w in mob.wounds.focus) {
			adjustedFocusMax += mob.wounds.focus[w].penalty;
		};
		if (mob.stats.focus < adjustedFocusMax) {
			mob.stats.focus = Math.min(adjustedFocusMax,mob.stats.focus + mob.stats.move);
		};
		
		var adjustedMoveMax = mob.stats.moveMax;
		for (w in mob.wounds.move) {
			adjustedMoveMax += mob.wounds.move[w].penalty;
		};
		if (mob.stats.move < adjustedMoveMax) {
			mob.stats.move = adjustedMoveMax;
		};
		
		if (mob.stats.morale <= 0) {
			mob.stats.move = 0;
		};
		
		if (view.focus.mob === mob) {
			view.displayFocusMob();
		};
	},
	
	simpleAttack: function(attacker,attackStat,defender,defenseStat,dodge,wounds) {
		
		if (wounds == undefined) {wounds = [dataWounds.blunt];};
		wound = wounds[Math.random() * wounds.length << 0];
		
		var result;
		
		var toHit = 0;
		for (i=0;i<attacker.stats[attackStat];i++) {
			toHit += Math.random()*0.9 + 0.1;
		};

		var toDefend = 0;
		var passiveDefense = defender.stats[defenseStat];
		var activeDefense = 0;
		if (dodge) {activeDefense = defender.stats.move;};
		for (i=0;i<passiveDefense+activeDefense;i++) {
			toDefend += Math.random()*0.9 + 0.1;
		};
		
		if (toHit > toDefend) {
			console.log('wounded: ',toHit,' vs ',toDefend);
			var penalty = Math.ceil(toHit/toDefend);
			defender.takeWound(wound,penalty);
			result = wound;
		} else {
			console.log('defended: ',toHit,' vs ',toDefend);
			result = false;
		};
		
		return result;
		
	},
	
	gainItem: function(items) {
		company.haul = company.haul.concat(items);
		var itemString = '';
		var article = '';
		for (i in items) {
			if (items[i].article == undefined) {article = 'a';} else {article = items[i].article;};
			itemString += ' '+article+' '+items[i].name;
			if (i < items.length -2) {
				itemString += ',';
			} else if (i == items.length-2) {
				itemString += ', and ';
			};
		};
		view.displayDialogue('You gain '+itemString+'!')
	},
};

function Map(level) {
	if (level == undefined) {level = hellhoundCave};
	
	// Blank Map
	var hexes = [];
	for (y=0;y<level.sizeY;y++) {
		for (x=0;x<level.sizeX;x++) {
			var newHex = new Hex(x,y);
			hexes.push(newHex);
		};
	};
	this.hexes = hexes;
	
	// Walls
	for (i in level.walls) {
		for (h in hexes) {
			if (hexes[h].x == level.walls[i].x && hexes[h].y == level.walls[i].y ) {
				hexes[h].type = "wall";
			};
		};
	};
	
	// Pits
	for (i in level.pits) {
		for (h in hexes) {
			if (hexes[h].x == level.pits[i].x && hexes[h].y == level.pits[i].y ) {
				hexes[h].type = "pit";
			};
		};
	};
	
	// Events
	for (i in level.triggers) {
		for (h in hexes) {
			if (hexes[h].x == level.triggers[i].x && hexes[h].y == level.triggers[i].y) {
				hexes[h].event = level.events[level.triggers[i].event];
			};
		};
	};
	this.events = {};
	for (i in level.events) {
		this.events[i] = level.events[i];
	};
	
	// Adjacency
	for (i in hexes) {
		var hexRight = undefined;
		var hexLeft = undefined;
		var hexUp = undefined;
		var hexDown = undefined;
		var hexUp2 = undefined;
		var hexDown2 = undefined;
		for (q in hexes) {
			if (hexes[q].x === hexes[i].x+1 && hexes[q].y === hexes[i].y) {
				hexRight = hexes[q]
			};
			if (hexes[q].x === hexes[i].x-1 && hexes[q].y === hexes[i].y) {
				hexLeft = hexes[q]
			};
			if (hexes[q].x === hexes[i].x && hexes[q].y === hexes[i].y+1) {
				hexUp = hexes[q]
			};
			if (hexes[q].x === hexes[i].x && hexes[q].y === hexes[i].y-1) {
				hexDown = hexes[q]
			};
			if (hexes[i].y % 2 == 0) {
				if (hexes[q].x === hexes[i].x+1 && hexes[q].y === hexes[i].y+1) {
					hexUp2 = hexes[q]
				};
				if (hexes[q].x === hexes[i].x+1 && hexes[q].y === hexes[i].y-1) {
					hexDown2 = hexes[q]
				};
			} else {
				if (hexes[q].x === hexes[i].x-1 && hexes[q].y === hexes[i].y+1) {
					hexUp2 = hexes[q]
				};
				if (hexes[q].x === hexes[i].x-1 && hexes[q].y === hexes[i].y-1) {
					hexDown2 = hexes[q]
				};
			};
		};
		if (hexRight !== undefined) {hexes[i].adjacent.push(hexRight);};
		if (hexLeft !== undefined) {hexes[i].adjacent.push(hexLeft);};
		if (hexUp !== undefined) {hexes[i].adjacent.push(hexUp);};
		if (hexDown !== undefined) {hexes[i].adjacent.push(hexDown);};
		if (hexUp2 !== undefined) {hexes[i].adjacent.push(hexUp2);};
		if (hexDown2 !== undefined) {hexes[i].adjacent.push(hexDown2);};
	};
		
	
	// Map Functions
	
	this.findHex = function(x,y) {
		for (i in this.hexes) {
			if (this.hexes[i].x === x && this.hexes[i].y === y) {
				return this.hexes[i];
			};
		};
	};
	
	// End Map
};

function Hex(x,y,type) {
	
	if ( type == undefined ) { type = "open" };
	
	this.x = x;
	this.y = y;
	this.type = type;
	
	this.adjacent = [];
	
	// End Hex
};

function Mob(type,x,y,id,name,heritage) {

	for (h in map.hexes) {
		if (map.hexes[h].x === x && map.hexes[h].y === y) {
			this.location = map.hexes[h];
		}
	};
	
	if (id == undefined) {
		this.id = 'Generic ' + type.name + " " + x + "_" + y;
	} else {
		this.id = id;
	};
	
	if (name == undefined) {
		this.name = type.name;
	} else {
		this.name = name;
	};	

	if (type.imgPath !== undefined) { // outside image file
		this.imgMob = new Image();
		this.imgMob.src = type.imgPath;
		this.imgPortrait = new Image();
		this.imgPortrait.src = type.imgPath;
		this.imgBust = new Image();
		this.imgBust.src = type.imgPath;
	} else if (type.imgMob !== undefined) { // internal pre-rendered image
		this.imgMob = type.imgMob;
		this.imgPortrait = type.imgPortrait;
		this.imgBust = type.imgBust;
	} else if (type.faceData !== undefined) { // render from faceData
		this.faceData = type.faceData;
		this.imgMob = draw.drawMob(type);
		this.imgBust = draw.drawMob(type);
		this.imgPortrait = draw.drawMob(type);
	} else if (type.heritage !== undefined) { // create faceData, then render
		this.faceData = mobDesign.randomizeFace(type.heritage);
		this.imgMob = draw.drawMob(this);
		this.imgBust = draw.drawMob(this);
		this.imgPortrait = draw.drawMob(this);
	} else { // fallback
		this.imgMob = new Image();
		this.imgMob.src = 'img/rat.svg';
		this.imgBust = new Image();
		this.imgBust.src = 'img/rat.svg';
		this.imgPortrait = new Image();
		this.imgPortrait.src = 'img/rat.svg';
	};
	this.imgMob.className = 'mobImg';
	this.imgPortrait.className = 'portraitImg';
	this.imgBust.className = 'bustImg';
	
	if (type.faceData !== undefined) {
		this.faceData = type.faceData;
	};
	
	if (type.race !== undefined) {
		this.race = type.race;
	};
	
	this.stats = {};
	for (s in type.stats) {
		this.stats[s] = type.stats[s];
	};
	
	if (type.wounds == undefined) {
		this.wounds = {move:[],strength:[],focus:[]};
	} else {
		this.wounds = type.wounds;
	};
	
	this.maneuvers = type.maneuvers;
	this.skills = type.skills;
	
	if (type.ai == undefined) {
		this.player = true;
	} else {
		this.ai = ai[type.ai];
	};
	
	this.equipment = type.equipment;
	this.loot = type.loot;
	
	mobs.push(this);
	
	// Functions
	this.look = function(vantage) {

		var visible = [vantage];
		for (i=0;i<10;i++) {
			for (v in visible) {
				for (a in visible[v].adjacent) {
					if (visible.indexOf(visible[v].adjacent[a]) == -1) {
						visible.push(visible[v].adjacent[a]);
					};
				};
			};
		};
		
		// remove hexes whose sightlines collide with a wall
		var walls = [];
		for (i in visible) {
			if (visible[i].type === "wall") {
				walls.push(visible[i]);
			};
		}
		
		var removeList = [];
		var mobCoords = {x:vantage.x,y:vantage.y};
		if (vantage.y % 2 === 0) {mobCoords.x += 0.5};
		for (i in visible) {
			var targetCoords = {x:visible[i].x,y:visible[i].y};
			if (visible[i].y % 2 === 0) {targetCoords.x += 0.5}
			var sightlineDist = Math.pow(Math.pow(targetCoords.x-mobCoords.x,2)+Math.pow(targetCoords.y-mobCoords.y,2),.5);
			for (w=0;w<walls.length;w++) {
				var wallCoords = {x:walls[w].x,y:walls[w].y};
				if (walls[w].y % 2 === 0) {wallCoords.x += 0.5};
				var mobWallDist = Math.pow(Math.pow(wallCoords.x-mobCoords.x,2)+Math.pow(wallCoords.y-mobCoords.y,2),.5);
				var targetWallDist = Math.pow(Math.pow(targetCoords.x-wallCoords.x,2)+Math.pow(targetCoords.y-wallCoords.y,2),.5);
				var semiperimeter = ( sightlineDist + mobWallDist + targetWallDist ) / 2;
				var area = Math.pow(semiperimeter*(semiperimeter - sightlineDist)*(semiperimeter - mobWallDist)*(semiperimeter - targetWallDist),.5);
				var height = 2 * area / sightlineDist;
				if (height < 0.7 && mobWallDist < sightlineDist && targetWallDist < sightlineDist  && walls[w] !== visible[i]) {
					removeList.push(visible[i]);
					w = 999;
					}
			};
		};
		
		for (i in removeList) {
			visible.splice(visible.indexOf(removeList[i]),1);
		};

		// Dispel Fog Hexes
		for (i in visible) {
			if (!visible[i].seen) {
				visible[i].seen = true;
				view.dispelFog(visible[i]);
			}
		};
	};
	
	this.removeBlockedHexes = function(visible,vantage) {

		// remove hexes whose sightlines collide with a wall
		var walls = [];
		for (i in visible) {
			if (visible[i].type === "wall") {
				walls.push(visible[i]);
			};
		}
		
		var removeList = [];
		var mobCoords = {x:vantage.x,y:vantage.y};
		if (vantage.y % 2 === 0) {mobCoords.x += 0.5};
		for (i in visible) {
			var targetCoords = {x:visible[i].x,y:visible[i].y};
			if (visible[i].y % 2 === 0) {targetCoords.x += 0.5}
			var sightlineDist = Math.pow(Math.pow(targetCoords.x-mobCoords.x,2)+Math.pow(targetCoords.y-mobCoords.y,2),.5);
			for (w=0;w<walls.length;w++) {
				var wallCoords = {x:walls[w].x,y:walls[w].y};
				if (walls[w].y % 2 === 0) {wallCoords.x += 0.5};
				var mobWallDist = Math.pow(Math.pow(wallCoords.x-mobCoords.x,2)+Math.pow(wallCoords.y-mobCoords.y,2),.5);
				var targetWallDist = Math.pow(Math.pow(targetCoords.x-wallCoords.x,2)+Math.pow(targetCoords.y-wallCoords.y,2),.5);
				var semiperimeter = ( sightlineDist + mobWallDist + targetWallDist ) / 2;
				var area = Math.pow(semiperimeter*(semiperimeter - sightlineDist)*(semiperimeter - mobWallDist)*(semiperimeter - targetWallDist),.5);
				var height = 2 * area / sightlineDist;
				if (height < 0.7 && mobWallDist < sightlineDist && targetWallDist < sightlineDist  && walls[w] !== visible[i]) {
					removeList.push(visible[i]);
					w = 999;
					}
			};
		};
		
		for (i in removeList) {
			visible.splice(visible.indexOf(removeList[i]),1);
		};
	
		return visible;
	};
	
	this.moveOptions = function() {
		var moveOptions = [this.location];
		var newMoveOptions = [];
		for (i=0;i<this.stats.move;i++) {
			for (h in moveOptions) {
				for (a in moveOptions[h].adjacent) {
					if (moveOptions.indexOf(moveOptions[h].adjacent[a]) == -1 && moveOptions[h].adjacent[a].type === "open") {
						var unoccupied = true;
						for (m in mobs) {
							if (mobs[m].location === moveOptions[h].adjacent[a] && mobs[m].stats.morale > 0) {
								unoccupied = false;
							};
						};
						if (unoccupied) {
							newMoveOptions.push(moveOptions[h].adjacent[a]);
						}
					};
				};
			};
			moveOptions = moveOptions.concat(newMoveOptions);
			newMoveOptions = [];
		};
		
		// Needs to remove hexes that are already occupied
		
		return moveOptions;
	};
	
	this.rangeOptions = function(vantage,maneuver) {
		var range;
		if (vantage == undefined) {vantage = this.location};
		if (maneuver == undefined) {
			range = 10
		} else {
			range = maneuver.range;
		};
		
		var rangeOptions = [this.location];
		var newRangeOptions = [];
		for (i=0;i<range;i++) {
			for (h in rangeOptions) {
				for (a in rangeOptions[h].adjacent) {
					if (rangeOptions.indexOf(rangeOptions[h].adjacent[a]) == -1) {
						newRangeOptions.push(rangeOptions[h].adjacent[a]);
					};
				};
			};
			rangeOptions = rangeOptions.concat(newRangeOptions);
			newRangeOptions = [];
		};
		
		// Limit to hexes with mobs on them
		var mobHexesWithinRange = [];
		var potentialTargets = mobs;
		for (m in potentialTargets) {
			if (rangeOptions.indexOf(potentialTargets[m].location) !== -1) {
				mobHexesWithinRange.push(potentialTargets[m].location);
			};
		};
		
		rangeOptions = this.removeBlockedHexes(mobHexesWithinRange,vantage);
		
		var openRangeOptions = []
		for (i in rangeOptions) {
			if (rangeOptions[i].type === 'open') {
				openRangeOptions.push(rangeOptions[i]);
			};
		};
		return openRangeOptions;
	};
	
	this.move = function(hex) {
	
		var paths = [[this.location]];
		var newPath;
		var newPaths = [];
		for (i=0;i<this.stats.move+1;i++) {
			for (p in paths) {
				var end = paths[p][paths[p].length-1];
				if (end === hex) {
					var path = paths[p];
					i = 999;
				} else {
					for (h in end.adjacent) {
						if (end.adjacent[h].type === "open") {
							newPath = paths[p].concat(end.adjacent[h]);
							newPaths.push(newPath);
						}
					};
				};
			};
			paths = paths.concat(newPaths);
		};

		for (p=1;p<path.length;p++) {
			var timedEvent = setTimeout(view.moveMob.bind(view,this,path[p]),p*200);
			if (this.player) {
				var timedEvent = setTimeout(this.look.bind(this,path[p]),p*200);
			};
			this.location = path[p];
			this.stats.move--;
			if (this.location.event !== undefined && this.player) {
				var timedEvent = setTimeout(path[p].event.bind(this),p*250+250);
				p = 999;
			};
		};
// 		view.selectMob(this);
		if (this.stats.move < 1 && this.player) {
			game.checkEndTurn();
		};
	};
	
	this.takeWound = function(woundType,penalty) {
			
		// jiggle
		view.jiggleMob(this);
		
		// add wound
		var woundExists = false;
		for (i in this.wounds[woundType.stat]) {
			if (this.wounds[woundType.stat][i].type == woundType) {
				woundExists = true;
				this.wounds[woundType.stat][i].penalty -= penalty;
				this.wounds[woundType.stat][i].name = woundType.names[(this.wounds[woundType.stat][i].penalty * -1)-1];
				if (this.wounds[woundType.stat][i].name == undefined) {
					this.wounds[woundType.stat][i].name = woundType.names[woundType.names.length-1];
				};
			};
		};
		if (!woundExists) {
			var woundName = woundType.names[penalty-1];
			this.wounds[woundType.stat].push({name:woundName,type:woundType,penalty:(penalty*-1)});
		};
		
		// adjust morale
		var moraleHit = -200 * penalty / (this.stats.moveMax + this.stats.strengthMax + this.stats.focusMax);
		this.adjustMorale(moraleHit);
	};
	
	this.adjustMorale = function(gain) {
		this.stats.morale = Math.max(0,Math.min(100,this.stats.morale + gain));
		
		if (this.state === "defeated") {
			this.state = "upright";
			view.reviveMob(this);
		};
		
		if (this.stats.morale === 0) {
			this.state = "defeated";
			view.defeatMob(this);
		};
		
		view.displayFocusMob();
	};
	
	this.equip = function(item,slot) {
		if (this.equipment[slot] !== undefined) {
			company.armory.push(this.equipment[slot]);
		};
		if (item.size === 2 && slot === 'right') {
			if (this.equipment.left !== undefined) {
				company.armory.push(this.equipment.left);
			}
			this.equipment.left = undefined;
		} else if (item.size === 2 && slot === 'item0') {
			if (this.equipment.item1 !== undefined) {
				company.armory.push(this.equipment.item1);
			}
			this.equipment.item1 = undefined;
		} else if (item.size === 2 && slot === 'item1') {
			if (this.equipment.item2 !== undefined) {
				company.armory.push(this.equipment.item2);
			}
			this.equipment.item2 = undefined;
		};
		this.equipment[slot] = item;
		
		// needs to change armor value
		if (item.slot[0] === "armor") {
			console.log('change armor value');
			this.stats.armor = 1 + item.slot[0].armor;
		};
		
		this.imgMob = draw.drawMob(this);
		this.imgPortrait = draw.drawMob(this);
		this.imgBust = draw.drawMob(this);
		
		this.refreshManeuvers();
	};
	
	this.train = function(item,skill) {
	};
	
	this.refreshManeuvers = function() {
	
		var maneuvers = [];
	
		var maneuverSources = [];
		maneuverSources.push(this.equipment.right);
		if (this.equipment.left !== this.equipment.right) {
			maneuverSources.push(this.equipment.left);
		};
		maneuverSources.push(this.equipment.armor);
		maneuverSources.push(this.skills);
		maneuverSources.push(this.equipment.item0);
		maneuverSources.push(this.equipment.item1);
		maneuverSources.push(this.equipment.item2);
		
		var adjacentMobs = [];
		var disarm = false; var slaughter = false; var execute = false; var restrain = false;
		for (hex in this.location.adjacent) {
			for (mob in mobs) {
				if (mobs[mob].location === this.location.adjacent[hex] && mobs[mob].stats.morale === 0) {
					adjacentMobs.push(mobs[mob]);
					if (mobs[mob].equipment !== undefined) {
						disarm = true;
					};
					if (mobs[mob].loot !== undefined) {
						slaughter = true;
					} else {
						execute = true;
						if ((this.equipment.item0 !== undefined && this.equipment.item0.restraint > 0) || (this.equipment.item1 !== undefined && this.equipment.item1.restraint > 0) || (this.equipment.item2 !== undefined && this.equipment.item2.restraint > 0) ) {
							restrain = true;
						};
					};
				};
			};
		};
		
		if (adjacentMobs.length > 0) { // if next to defeated mob, enable defeat maneuvers
			var defeatManeuvers = {maneuvers:[]};
			if (disarm) {defeatManeuvers.maneuvers.push(dataManeuvers.zDisarm)};
			if (execute) {defeatManeuvers.maneuvers.push(dataManeuvers.zExecute)};
			if (restrain) {defeatManeuvers.maneuvers.push(dataManeuvers.zRestrain)};
			if (slaughter) {defeatManeuvers.maneuvers.push(dataManeuvers.zSlaughter)};
			maneuverSources.push(defeatManeuvers);
		};

		for (i in maneuverSources) {
			if (maneuverSources[i] !== undefined && maneuverSources[i].maneuvers !== undefined) {
				maneuvers = maneuvers.concat(maneuverSources[i].maneuvers);
			};
		};
				
		this.maneuvers = maneuvers;
	
	};
	
	// End Mob
};