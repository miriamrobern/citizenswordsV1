var map = {};
var mobs = [];

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

	this.x = x;
	this.y = y;	
	for (h in map.hexes) {
		if (map.hexes[h].x === x && map.hexes[h].y === y) {
			this.location = map.hexes[h];
		}
	};
	
	this.img = id.img;
	
	this.move = 4;
	this.remainingMove = 4;
	
	mobs.push(this);
	
	// Functions
	this.look = function() {

		var visible = [this.location];
		for (i=0;i<5;i++) {
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
		var mobCoords = {x:this.location.x,y:this.location.y};
		if (this.location.y % 2 === 0) {mobCoords.x += 0.5};
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

		for (i in visible) {
			if (!visible[i].seen) {
				visible[i].seen = true;
				view.dispelFog(visible[i]);
			}
		};
	};
	
	this.moveOptions = function() {
		var moveOptions = [this.location];
		var newMoveOptions = [];
		for (i=0;i<this.remainingMove;i++) {
			for (h in moveOptions) {
				for (a in moveOptions[h].adjacent) {
					if (moveOptions.indexOf(moveOptions[h].adjacent[a]) == -1 && moveOptions[h].adjacent[a].type === "open") {
						newMoveOptions.push(moveOptions[h].adjacent[a]);
					};
				};
			};
			moveOptions = moveOptions.concat(newMoveOptions);
			newMoveOptions = [];
		};
		view.selectableHexes(moveOptions);
	};
	
	this.move = function(hex) {
		this.x = hex.x;
		this.y = hex.y;
		this.location = hex;
		
// 		this.remainingMove -= path.length;
		
		view.moveMob(this);
		this.look();
	};
};