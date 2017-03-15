var map = {};
var mobs = [];

function Map(sizeX,sizeY) {
	if (sizeX == undefined) {sizeX = 30};
	if (sizeY == undefined) {sizeY = 15};
	
	var hexes = [];
	
	for (y=0;y<sizeY;y++) {
		for (x=0;x<sizeX;x++) {
			var type = ["open","open","open","pit","wall"][Math.random() * 5 << 0]
			var newHex = new Hex(x,y,type);
			hexes.push(newHex);
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
	
	this.hexes = hexes;
};

function Hex(x,y,type) {
	this.x = x;
	this.y = y;
	this.type = type;
	
	this.adjacent = [];
	this.visible = [];
	this.passable = [];
	
};

function Mob() {
	this.x = 0;
	this.y = 0;
	this.location = map.hexes[0];
	this.img = "img/figure.png";
	
	this.move = 3;
	this.remainingMove = 3;
	
	mobs.push(this);
	
	// Functions
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
	
	this.move = function(hex,path) {
		this.x = hex.x;
		this.y = hex.y;
		this.location = hex;
		
		this.remainingMove -= path.length;
		
		view.moveMob(this,path);
	};
};