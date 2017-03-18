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
		for (i in level.startLocations) {
			var newMob = new Mob(heroes[i],level.startLocations[i].x,level.startLocations[i].y);
			newMob.look(newMob.location);
		};
	
		for (i in level.mobs) {
			var newMob = new Mob(level.mobs[i].id,level.mobs[i].x,level.mobs[i].y);
			if (level.mobs[i].ai !== undefined) {
				newMob.ai = ai[level.mobs[i].ai];
			};
		};

	
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
	
		for (i in mobs) {
			if (!mobs[i].player && mobs[i].stats.morale > 0) {
				mobs[i].ai();
			};
		};
	
		// Refresh Move
		for (i in mobs) {
		
			var adjustedStrengthMax = mobs[i].stats.strengthMax;
			for (w in mobs[i].wounds.strength) {
				adjustedStrengthMax += mobs[i].wounds.strength[w].penalty;
			};
			if (mobs[i].stats.strength < adjustedStrengthMax) {
				mobs[i].stats.strength++;
			};
			
			var adjustedFocusMax = mobs[i].stats.focusMax;
			for (w in mobs[i].wounds.focus) {
				adjustedFocusMax += mobs[i].wounds.focus[w].penalty;
			};
			if (mobs[i].stats.focus < adjustedFocusMax) {
				mobs[i].stats.focus = Math.min(adjustedFocusMax,mobs[i].stats.focus + mobs[i].stats.move);
			};
			
			var adjustedMoveMax = mobs[i].stats.moveMax;
			for (w in mobs[i].wounds.move) {
				adjustedMoveMax += mobs[i].wounds.move[w].penalty;
			};
			if (mobs[i].stats.move < adjustedMoveMax) {
				mobs[i].stats.move = adjustedMoveMax;
			};
			
			if (mobs[i].stats.morale <= 0) {
				mobs[i].stats.move = 0;
			};
			
			view.displayFocusMob(view.focus.mob);
		};
	
	},
	
	simpleAttack: function(attacker,attackStat,defender,defenseStat,dodge,wounds) {
		
		if (wounds == undefined) {wounds = [dataWounds.blunt];};
		wound = wounds[Math.random() * wounds.length << 0];
		
		var result;
		
		var toHit = 0;
		for (i=0;i<attacker.stats[attackStat];i++) {
			toHit += Math.random();
		};

		var toDefend = 0;
		var passiveDefense = defender.stats[defenseStat];
		var activeDefense = 0;
		if (dodge) {activeDefense = defender.stats.move;};
		for (i=0;i<passiveDefense+activeDefense;i++) {
			toDefend += Math.random();
		};
		
		var woundType;
		if (toHit > toDefend) {
			console.log('wounded: ',toHit,' vs ',toDefend);
			var woundLevel = Math.floor(toHit/toDefend)-1;
			if (wound.names.length > woundLevel) {
				woundName = wound.names[woundLevel];
			} else {
				console.log(wound);
				woundName = wound.names[wound.names.length-1];
			};
			woundPenalty = -1 * (1+woundLevel);
			console.log(attacker.name,'inflicts a',woundName,'on',defender.name);
			defender.takeWound({type:wound,name:woundName,stat:wound.stat,penalty:woundPenalty});
			result = woundType;
		} else {
			console.log('defend: ',toHit,' vs ',toDefend);
			result = false;
		};
		
		return result;
		
	},
};

function Map(level) {
	if (level == undefined) {level = firstLevel};
	
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
	for (i in level.events) {
		for (h in hexes) {
			if (hexes[h].x == level.events[i].x && hexes[h].y == level.events[i].y) {
				hexes[h].event = level.events[i];
			};
		};
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
		
	
	// End Map
};

function Hex(x,y,type) {
	
	if ( type == undefined ) { type = "open" };
	
	this.x = x;
	this.y = y;
	this.type = type;
	
	this.adjacent = [];
	
};

function Mob(id,x,y) {

	for (h in map.hexes) {
		if (map.hexes[h].x === x && map.hexes[h].y === y) {
			this.location = map.hexes[h];
		}
	};
	
	this.name = id.name;
	this.img = id.img;
	
	this.stats = {};
	for (s in id.stats) {
		this.stats[s] = id.stats[s];
	};
	
	if (id.wounds == undefined) {
		this.wounds = {move:[],strength:[],focus:[]};
	} else {
		this.wounds = id.wounds;
	};
	
	this.maneuvers = id.maneuvers;
	
	if (id.ai == undefined) {
		this.player = true;
	} else {
		this.ai = ai[id.ai];
	};
	
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
		rangeOptions = this.removeBlockedHexes(rangeOptions,vantage);
		
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
				var timedEvent = setTimeout(path[p].event.execute.bind(this),p*250+250);
				p = 999;
			};
		};
		view.selectMob(this);
		if (this.stats.move < 1 && this.player) {
			game.checkEndTurn();
		};
	};
	
	this.takeWound = function(wound) {
		console.log('taking a wound: ',wound);
		
		// jiggle
		var timedEvent = setTimeout(view.tiltMob.bind(this,this,15),1);
		var timedEvent = setTimeout(view.tiltMob.bind(this,this,-15),150);
		var timedEvent = setTimeout(view.tiltMob.bind(this,this,0),300);
		
		// add wound
		this.wounds[wound.stat].push(wound);
		
		// adjust morale
		this.stats.morale = Math.max(0,this.stats.morale + ( 200 * wound.penalty / (this.stats.moveMax + this.stats.strengthMax + this.stats.focusMax) ) );
		if (this.stats.morale === 0) {
			var timedEvent = setTimeout(view.tiltMob.bind(this,this,90),1000);
			this.state = 'defeated';
		};
		
		view.selectMob(view.focus.mob);
	};
};