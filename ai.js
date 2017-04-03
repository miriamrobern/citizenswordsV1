var ai = {
	
	dormant: function() {
	},

	basic: function() {
		
		var strongestManevuer = ai.strongestManeuver(this);
		console.log(strongestManeuver);
		if (strongestManevuer.target !== undefined) {
			// Perform strongest maneuver on target within maneuver range
			strongestManevuer.maneuver.execute(this,strongestManevuer.target);
		} else {
			// Move Towards a Mob within Move Range
			var moveOptions = this.moveOptions();
			var targets = ai.findHexesAdjacentToTargets(moveOptions);
			var target = targets[Math.random() * targets.length << 0];
		
			if (target !== undefined) {
				this.move(target);
			
				// And if there's still move remaining, execute maneuver
				var strongestManeuver = ai.strongestManeuver(this);
				if (strongestManeuver.target !== undefined) {
					strongestManeuver.maneuver.execute(this,strongestManeuver.target);
				};
				
			} else {
				ai.wander(this,moveOptions);
			};
		};
		
	},
	
	// AI Subroutines
	
	strongestManeuver: function(mob) {

		console.log('strongestManeuver checkin',mob);
		var maneuverTarget;
		var maneuverToDo;
		for (man in mob.maneuvers) {
			var canAfford = true;
			for (c in mob.maneuvers.cost) {
				if (mob.maneuvers.cost[c] > mob.stats[c]) {
					canAfford = false;
				};
			};
			if (canAfford) {
				var rangeOptions = mob.rangeOptions(mob.location,mob.maneuvers[man]);
				var targets = ai.findTargets(rangeOptions);
				var target = targets[Math.random() * targets.length << 0];
				if (target !== undefined) {
					maneuverTarget = target;
					maneuverToDo = mob.maneuvers[man];
				};
			};
			
			return {target:maneuverTarget,maneuver:maneuverToDo};
		};

	},
	
	findTargets: function(options) {
		var targets = [];
		for (i in options) {
			for (m in mobs) {
				if (mobs[m].location === options[i] && mobs[m].player) {
					targets.push(mobs[m]);
				};
			};
		};
		
		return targets;
	},
	
	findHexesAdjacentToTargets: function(options) {
		var targets = [];
		for (i in options) {
			for (m in mobs) {
				if (mobs[m].location !== undefined && mobs[m].location.adjacent.indexOf(options[i]) !== -1 && mobs[m].player) {
					targets.push(options[i]);
				};
			};
		};
		return targets;
	},
	
	wander: function(mob,moveOptions) {
		mob.move(moveOptions[Math.random() * moveOptions.length << 0]);
	},

};