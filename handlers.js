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
			newMob.look(newMob.location);
		};
	
		for (i in level.mobs) {
			var newMob = new Mob(level.mobs[0].id,level.mobs[0].x,level.mobs[0].y);
		};
		
		document.getElementById('endTurnButton').disabled = false;
		
		view.displayMap();
	},
	
	hexMouseOver: function(x,y,style) {
		view.mouseOverTile(x,y,style);
	},
	
	mobMouseOver: function(index) {
	},
	
	hexSelect: function(x,y) {
		for (i in map.hexes) {
			if (map.hexes[i].x === x && map.hexes[i].y === y) {
				selectedHex = map.hexes[i]
			};
		}
		if (this.mode === "move" && view.focus.range.indexOf(selectedHex) !== -1) {
			view.focus.mob.move(selectedHex);
			this.mode = undefined;
		} else if (this.mode === "target" && view.focus.range.indexOf(selectedHex) !== -1) {
			console.log('targeting',selectedHex);
			handlers.executeManeuver(view.focus.maneuver,selectedHex);
		};
	},
	
	mobSelect: function(index) {
		var x = mobs[index].location.x;
		var y = mobs[index].location.y;
		for (i in map.hexes) {
			if (map.hexes[i].x === x && map.hexes[i].y === y) {
				selectedHex = map.hexes[i]
			};
		}
		
		if (this.mode == undefined && mobs[index].stats.move > 0) {
			this.mode = 'move';
			view.selectMob(mobs[index]);
		} else if (this.mode === 'target' && view.focus.range.indexOf(selectedHex) !== -1) {
			handlers.executeManeuver(view.focus.maneuver,mobs[index]);
		} else {
			this.mode = undefined;
			view.selectMob(mobs[index]);
		};
	},
	
	endTurn: function() {
		handlers.mode = undefined;
		game.endTurn();
	},
	
	showDialogueDiv: function() {
		document.getElementById('dialogueBacksplash').style.display = 'block';
	},
	
	hideDialogueDiv: function() {
		document.getElementById('dialogueBacksplash').style.display = 'none';
	},
	
	selectManeuver: function(maneuver,button) {
		maneuver = dataManeuvers[maneuver];
		console.log(button);
		if (this.mode === "target") {
			view.deselectAllManeuverButtons();
		};
		if (view.focus.maneuver === maneuver) {
			this.mode = undefined;
			view.focus.maneuver = undefined;
			view.drawHexRange(view.focus.range,'open');
			view.focus.range = undefined;
			button.className = 'focusMobManeuverLi';
		} else if (maneuver.target) {
			this.mode = 'target';
			view.focus.maneuver = maneuver;
			view.drawHexRange(view.focus.range,'open');
			button.className = 'focusMobManeuverLi focusMobManeuverLiSelected';
			var targetableHexes = view.focus.mob.rangeOptions(undefined,maneuver);
			view.drawHexRange(targetableHexes,'targetable');
			console.log('find target');
		} else {
			console.log('no target');
			button.className = 'focusMobManeuverLi focusMobManeuverLiSelected';
			handlers.executeManeuver(maneuver);
		};
	},
	
	executeManeuver: function(maneuver,target) {
		console.log('execute ',maneuver,'on',target);
		this.mode = undefined;
		
		// Maneuver Cost
		for (i in maneuver.cost) {
			view.focus.mob.stats[i] -= maneuver.cost[i];
		};
		var timedEvent = setTimeout(view.selectMob.bind(this,view.focus.mob),250);
	},


}

window.onclick = function(event) {
	var dialogueBacksplash = document.getElementById('dialogueBacksplash');
	if (event.target == dialogueBacksplash) {
		dialogueBacksplash.style.display = 'none';
	};
}

document.addEventListener('keydown',function(event) {
	if (Number.isInteger(parseInt(event.key)) && view.focus.mob !== undefined) {
		if (view.focus.mob.player) {
			var num = event.key - 1;
			document.getElementById('focusMobManeuverLi'+num).click();
		}
	}
});