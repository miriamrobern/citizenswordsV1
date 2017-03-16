var handlers = {

	newGame: function() {
	
		var level = firstLevel;
	
		// Map
		map = {};
		mobs = [];
		document.getElementById('mapGridDiv').innerHTML = '';
		document.getElementById('mapMobDiv').innerHTML = '';
		map = new Map(level);
		view.displayMapBackground(level);
		view.displayFog();
		
		// Mobs
		for (i in level.startLocations) {
			var newMob = new Mob(heroes[i],level.startLocations[i].x,level.startLocations[i].y);
			newMob.player = true;
			newMob.look();
		};
	
		for (i in level.mobs) {
			var newMob = new Mob(level.mobs[0].id,level.mobs[0].x,level.mobs[0].y);
		};
		
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
			view.focus.mob.move(selectedHex);
		};
	},
	
	mobMouseOver: function(index) {
	},
	
	mobSelect: function(index) {
		view.selectMob(mobs[index]);
	},

}