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
	
	defeated: function() {
		for (m=0;m<this.stats.move;m++) {
			ai.flee(this);
		};
	},
	
	flee: function(mob) {
	
		var moveOptions = mob.rangeOptions();
		var dangers = ai.findTargets(moveOptions);
				
		var fleeDirections = {northwest:true,northeast:true,east:true,southeast:true,southwest:true,west:true,};
		for (i in dangers) {
			if (dangers[i].location.x >= mob.location.x && dangers[i].location.y > mob.location.y) {
				fleeDirections.southeast = false;
			} else if (dangers[i].location.x >= mob.location.x && dangers[i].location.y < mob.location.y) {
				fleeDirections.northeast = false;
			} else if (dangers[i].location.x <= mob.location.x && dangers[i].location.y > mob.location.y) {
				fleeDirections.southwest = false;
			} else if (dangers[i].location.x <= mob.location.x && dangers[i].location.y < mob.location.y) {
				fleeDirections.northwest = false;
			} else if (dangers[i].location.x > mob.location.x && dangers[i].location.y === mob.location.y) {
				fleeDirections.east = false;
			} else if (dangers[i].location.x > mob.location.x && dangers[i].location.y === mob.location.y) {
				fleeDirections.west = false;
			};
		};
		var fleeArray = [];
		for (i in fleeDirections) {
			if (fleeDirections[i]) {fleeArray.push(i);};
		};
		var fleeDirection = fleeArray[Math.random() * fleeArray.length << 0];
		var fleeHex = undefined;
		if (fleeDirection === "southeast") {
			fleeHex = map.findHex(mob.location.x+1,mob.location.y+1);
		} else if (fleeDirection === "northeast") {
			fleeHex = map.findHex(mob.location.x+1,mob.location.y-1);
		} else if (fleeDirection === "southwest") {
			fleeHex = map.findHex(mob.location.x-1,mob.location.y+1);
		} else if (fleeDirection === "northwest") {
			fleeHex = map.findHex(mob.location.x-1,mob.location.y-1);
		} else if (fleeDirection === "east") {
			fleeHex = map.findHex(mob.location.x+1,mob.location.y);
		} else if (fleeDirection === "west") {
			fleeHex = map.findHex(mob.location.x-1,mob.location.y);
		};
		if (fleeHex !== undefined && fleeHex.type === "open") {
			mob.move(fleeHex);
		};
		
		console.log(moveOptions);
		console.log(dangers);
		console.log(fleeDirections);
		console.log(fleeArray);
		console.log(fleeDirection);
	
	},
	
	// AI Subroutines
	
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
	
	strongestManeuver: function(mob) {

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
	
	wander: function(mob,moveOptions) {
		mob.move(moveOptions[Math.random() * moveOptions.length << 0]);
	},

};