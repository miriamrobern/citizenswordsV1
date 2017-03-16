var handlers = {

	newGame: function() {
		map = new Map();
		mob = new Mob();
		view.setupFog();
		view.displayMap();
	},
	
	hexMouseOver: function(x,y,style) {
		view.mouseOverTile(x,y,style);
	},
	
	hexSelect: function(x,y) {
		for (i in map.hexes) {
			if (map.hexes[i].x === x && map.hexes[i].y === y) {
				selectedHex = map.hexes[i]
			};
		}
		if (view.focus.mob !== undefined && view.focus.range.indexOf(selectedHex) !== -1) {
			view.focus.mob.move(selectedHex,[]);
		};
	},
	
	mobMouseOver: function(index) {
	},
	
	mobSelect: function(index) {
		view.selectMob(mobs[index]);
	},

}