var dataEthnicities = {

	min: {
		blackEumelanin:1,
		brownEumelanin:1,
		pinkPheomelanin:1,
		greenKeratin:0,
		noseShading:-90,
		nosePinkness:0,
		lipShading:-90,
		lipPinkness:0,
		earShading:-90,
		earPinkness:0,
		templePosition:5,
		templeWidth:0,
		templeHeight:2,
		cheekbonePosition:5,
		cheekboneWidth:0,
		cheekboneHeight:2,
		chinHeight:40,
		chinWidth:10,
		eyeDistance:9,
		eyeSize:6,
		browSize:0,
		insideEyelidCurve:-2,
		outsideEyelidCurve:2,
		lowerEyelidCurve:4,
		noseHeight:20,
		noseSize:1,
		noseWidth:4,
		nostrilHeight:1,
		noseBump:-10,
		mouthWidth:10,
		lipSize:1,
		teeth:0,
		leftTusk:0,
		rightTusk:0,
		earSize:4,
		earDip:-20,
		earTilt:-10,
		earWidth:-50,
		earLobe:4,
		hairCurl:1,
		horns:0,
		shoulders:30,
		belly:15,
		hips:15,
		feet:0,
		
		leftBrowTilt: -4,
		rightBrowTilt: -4,
		smile: -7,
		mouthOpen: 0,
		hairLength: 0,
		hairPart: -10,
		hairBangs: 2,
		hairBangsLength: 0,
		hairSweep: 0,
		topHairHeight: 0,
		topHairBase: 2,
		topHairWidth: 0,
		bust: 0,
		},
	max: {
		blackEumelanin:80,
		brownEumelanin:90,
		pinkPheomelanin:90,
		greenKeratin:40,
		noseShading:90,
		nosePinkness:50,
		lipShading:90,
		lipPinkness:50,
		earShading:90,
		earPinkness:50,
		templePosition:20,
		templeWidth:5,
		templeHeight:10,
		cheekbonePosition:20,
		cheekboneWidth:7,
		cheekboneHeight:10,
		chinHeight:50,
		chinWidth:40,
		eyeDistance:25,
		eyeSize:10,
		browSize:5,
		insideEyelidCurve:5,
		outsideEyelidCurve:8,
		lowerEyelidCurve:7,
		noseHeight:90,
		noseSize:5,
		noseWidth:10,
		nostrilHeight:15,
		noseBump:10,
		mouthWidth:15,
		lipSize:7,
		teeth:4,
		leftTusk:2,
		rightTusk:2,
		earSize:25,
		earDip:-2,
		earTilt:10,
		earWidth:50,
		earLobe:15,
		hairCurl:20,
		horns:10,
		shoulders:40,
		belly:25,
		hips:23,
		feet:20,
		
		leftBrowTilt: 5,
		rightBrowTilt: 5,
		smile: 7,
		mouthOpen: 5,
		hairLength: 80,
		hairPart: 10,
		hairBangs: 8,
		hairBangsLength: 30,
		hairSweep: 11,
		topHairHeight: 11,
		topHairBase: 25,
		topHairWidth: 30,
		bust: 32,
		},
	
	centaur: {neighbors:['faunic','satyric'],lipPinkness:25, earShading:31, earPinkness:44, templePosition:9, templeWidth:2, templeHeight:6, cheekbonePosition:9, chinHeight:45, chinWidth:16, eyeDistance:17, eyeSize:8.5, browSize:5, noseHeight:60, noseSize:4, noseWidth:6, nostrilHeight:6, noseBump:8, mouthWidth:12, teeth:1, leftTusk:0, rightTusk:0, earSize:18, earDip:-5.5, earTilt:6, earWidth:-25.5, earLobe:8, hairCurl:15, horns:0, shoulders:37, belly:20, hips:20, feet:0},
	dwarven: {neighbors:['gnomish','halfling','ogrish','gigantic'],pinkPheomelanin:36, greenKeratin:0, lipPinkness:34, earShading:78, earPinkness:12, templePosition:8, templeWidth:3, templeHeight:5, cheekbonePosition:13, chinHeight:42, chinWidth:30, eyeDistance:14, eyeSize:8, browSize:3.5, noseHeight:38, noseSize:2, noseWidth:6, nostrilHeight:5, noseBump:7, mouthWidth:12, teeth:0, leftTusk:0, rightTusk:0, earSize:11, earDip:-7.5, earTilt:0.5, earWidth:0.5, earLobe:15, horns:0, shoulders:33, belly:23, hips:22, feet:14,},
	elvish: {neighbors:['elvish','faunic','satyric','halfling','orcish'],greenKeratin:0, lipPinkness:35, earShading:-10, earPinkness:46, templePosition:12, templeWidth:2, templeHeight:7, cheekbonePosition:5, chinHeight:44, chinWidth:17, eyeDistance:13, eyeSize:6, browSize:1, noseHeight:39, noseSize:1, noseWidth:5, nostrilHeight:3, noseBump:-2, lipSize:2, teeth:0, leftTusk:0, rightTusk:0, earSize:20, earDip:-20, earTilt:2.5, earWidth:-12.5, earLobe:15, hairCurl:1, horns:0, shoulders:32, belly:15, hips:15, feet:11},
	faunic: {neighbors:['satyric','centaur','minotaur','elvish'],lipPinkness:0, earShading:-40, earPinkness:40, templePosition:13, templeWidth:4, templeHeight:3, cheekbonePosition:9, chinHeight:45, chinWidth:19, eyeDistance:15, eyeSize:7.25, browSize:4, noseHeight:54, noseSize:4, noseWidth:4, nostrilHeight:4, noseBump:8, teeth:1, leftTusk:0, rightTusk:0, earSize:18, earDip:-5, earTilt:7, earWidth:27, earLobe:8, hairCurl:20, horns:3, shoulders:35, belly:17, hips:20, feet:2},
	gigantic: {neighbors:['ogrish','dwarven'],pinkPheomelanin:1, greenKeratin:0, lipPinkness:10, earShading:61, earPinkness:7, templePosition:13, templeWidth:2, templeHeight:6, cheekbonePosition:13, chinHeight:45, chinWidth:16, eyeDistance:17, eyeSize:6.5, noseHeight:39, noseSize:4, noseWidth:6, nostrilHeight:4, noseBump:6, mouthWidth:11, teeth:0, leftTusk:0, rightTusk:0, earSize:11, earDip:-8.5, earTilt:0.5, earWidth:15.5, earLobe:11.5, horns:2, shoulders:40, belly:25, hips:23, feet:12},
	gnollish: {neighbors:['orcish','goblin'],blackEumelanin:20, brownEumelanin: 50, pinkPheomelanin:1, greenKeratin:0, lipPinkness:50, earShading:-25, earPinkness:40, templePosition:13, templeWidth:2, templeHeight:5, cheekbonePosition:13, chinHeight:40, chinWidth:26, eyeDistance:14, eyeSize:9, browSize:0.75, insideEyelidCurve:-1, outsideEyelidCurve:8, lowerEyelidCurve:5, noseHeight:69, noseSize:2, noseWidth:6, nostrilHeight:7, noseBump:10, mouthWidth:15, lipSize:2, teeth:1, leftTusk:1, rightTusk:1, earSize:20, earDip:-20, earTilt:3.5, earWidth:50, earLobe:15, hairCurl:20, horns:0, shoulders:33, belly:15, hips:15, feet:6},
	gnomish: {neighbors:['halfling','dwarven'],pinkPheomelanin:13, greenKeratin:0, lipPinkness:50, earShading:57, earPinkness:44, templePosition:19, templeWidth:3, templeHeight:5, cheekbonePosition:12, chinHeight:45, chinWidth:17, eyeDistance:15, eyeSize:8.25, browSize:1.25, noseHeight:53, noseSize:4, noseWidth:8, nostrilHeight:10, noseBump:10, mouthWidth:10, lipSize:3, teeth:0, leftTusk:0, rightTusk:0, earSize:20, earDip:-7, earTilt:-6, earWidth:-1, earLobe:15, horns:0, shoulders:30, belly:19, hips:15, feet:20},
	goblin: {neighbors:['orcish','gnollish'],pinkPheomelanin:1, greenKeratin:40, lipPinkness:0, earShading:56, earPinkness:0, templePosition:13, templeWidth:2, templeHeight:3, cheekbonePosition:12, chinHeight:42, chinWidth:15, eyeDistance:12, eyeSize:6, noseHeight:37, noseSize:2, noseWidth:5, nostrilHeight:8, noseBump:10, mouthWidth:10, lipSize:1, teeth:5, leftTusk:0, rightTusk:0, earSize:16, earDip:-20, earTilt:0, earWidth:-17, earLobe:10, hairCurl:13.5, horns:0, shoulders:30, belly:15, hips:15, feet:20},
	halfling: {
		neighbors:['elvish','dwarven','gnomish'],
		pinkPheomelanin:0,
		greenKeratin:0,
		noseShading:0,
		nosePinkness:0,
		lipShading:0,
		lipPinkness:0,
		earShading:0,
		earPinkness:0,
		templePosition:13,
		templeWidth:2,
		templeHeight:6,
		cheekbonePosition:13,
		cheekboneWidth:4,
		cheekboneHeight:6,
		chinHeight:45,
		chinWidth:25,
		eyeDistance:17,
		eyeSize:8,
		browSize:2,
		insideEyelidCurve:1,
		outsideEyelidCurve:5,
		lowerEyelidCurve:6,
		noseHeight:56,
		noseSize:3,
		noseWidth:7,
		nostrilHeight:8,
		noseBump:0,
		mouthWidth:13,
		lipSize:4,
		teeth:2,
		leftTusk:-2,
		rightTusk:-2,
		earSize:12,
		earDip:-11,
		earTilt:0,
		earWidth:-2,
		earLobe:9,
		hairCurl:10,
		horns:1,
		shoulders:35,
		belly:20,
		hips:17,
		feet:10,
		},
	kobold: {neighbors:['kobold'],pinkPheomelanin:1, greenKeratin:0, lipPinkness:0, templePosition:20, templeWidth:5, templeHeight:5, cheekbonePosition:9, chinHeight:46, chinWidth:15, eyeDistance:23, eyeSize:8.5, noseHeight:38, noseSize:3, noseWidth:7, nostrilHeight:1, noseBump:10, mouthWidth:15, lipSize:5, teeth:4, leftTusk:0, rightTusk:0, earSize:4, earDip:-20, earTilt:-10, earWidth:-50, earLobe:4, horns:0, shoulders:34, belly:22, hips:17, feet:6},
	minotaur: {neighbors:['centaur','faunic','satyric'],pinkPheomelanin:36, greenKeratin:0, lipPinkness:50, earShading:9, earPinkness:47, templePosition:18, templeWidth:2, templeHeight:8, cheekbonePosition:20, chinHeight:50, chinWidth:32, eyeDistance:22, eyeSize:9.5, browSize:5, noseHeight:79, noseSize:4, noseWidth:9, nostrilHeight:7, noseBump:-10, mouthWidth:14, teeth:0, leftTusk:0, rightTusk:0, earSize:20, earDip:-6.5, earTilt:2, earWidth:6.5, earLobe:4, horns:10, shoulders:39, hips:23, feet:0},
	orcish: {neighbors:['trollish','elvish','goblin','gnollish'],greenKeratin:32, lipPinkness:0, earShading:-37, earPinkness:0, templePosition:8, templeWidth:3, templeHeight:3, cheekbonePosition:17, chinHeight:48, chinWidth:38, eyeDistance:12, eyeSize:6.75, browSize:0, noseHeight:20, noseSize:1, noseWidth:5, nostrilHeight:2, noseBump:-10, mouthWidth:15, lipSize:1, teeth:3, leftTusk:2, rightTusk:2, earSize:11, earDip:-16, earTilt:6.5, earWidth:31, earLobe:14, hairCurl:1, horns:0, shoulders:38, belly:21, feet:12},
	ogrish: {neighbors:['gigantic','dwarven'],pinkPheomelanin:82, greenKeratin:21, lipPinkness:36, earShading:-11, earPinkness:46, templePosition:5, templeWidth:5, templeHeight:10, cheekbonePosition:20, chinHeight:47, chinWidth:18, eyeDistance:19, eyeSize:8, browSize:5, noseHeight:43, noseSize:2, noseWidth:7, nostrilHeight:9, noseBump:10, mouthWidth:15, teeth:4, leftTusk:2, rightTusk:2, earSize:13, earDip:-6.5, earTilt:2.5, earWidth:-7, earLobe:15, horns:4, shoulders:37, belly:25, hips:23, feet:10},
	trollish: {neighbors:['orcish','orcish','elvish'],pinkPheomelanin:1, greenKeratin:8, lipPinkness:0, earShading:56, earPinkness:0, templePosition:16, templeWidth:3, templeHeight:3, cheekbonePosition:14, chinHeight:50, chinWidth:10, eyeSize:4, browSize:0.75, noseHeight:20, noseSize:1, noseWidth:4, nostrilHeight:1, noseBump:-10, mouthWidth:8, lipSize:1, teeth:2, leftTusk:1, rightTusk:1, earSize:20, earDip:-20, earTilt:-6, earWidth:-3, earLobe:15, horns:0, shoulders:32, belly:17, hips:17, feet:20},
	satyric: {neighbors:['faunic','minotaur','centaur','elvish'],lipPinkness:0, earShading:-40, earPinkness:40, templePosition:13, templeWidth:4, templeHeight:3, cheekbonePosition:9, chinHeight:45, chinWidth:19, eyeDistance:15, eyeSize:7.25, browSize:4, noseHeight:54, noseSize:4, noseWidth:4, nostrilHeight:4, noseBump:8, teeth:1, leftTusk:0, rightTusk:0, earSize:18, earDip:-5, earTilt:7, earWidth:27, earLobe:8, hairCurl:20, horns:3, shoulders:35, belly:17, hips:20, feet:2},

};
 
 var dataWounds = {
 
 	bite: {
 		names: ["Bite","Bitten","Savaged","Mauled","Chewed Up"],
 		stat: "strength",
 	},
 
 	blunt: {
 		names: ["Dazed","Dizzy","Concussion"],
 		stat: "focus",
 	},
 
 	fire: {
 		names: ["Light Burns","Moderate Burns","Serious Burns"],
 		stat: "strength",
 	},
 
 	cold: {
 		names: ["Chilled","Frozen"],
 		stat: "move",
 	},
 
 	sharp: {
 		names: ["Just a Scratch","Cut Up","Seriously Lacerated","Blood Everywhere"],
 		stat: "strength",
 	},
 
 	fear: {
 		names: ["Daunted","Intimidated","Scared","Terrified"],
 		stat: "focus",
 	},
 	
 	restraints: {
 		names: ["Tangled","Restrained","Trussed Up"],
 		stat: "move",
 	},
 
 	sting: {
 		names: ["Stung"],
 		stat: "focus",
 	},
 	
 	torsion: {
 		names: ['Strain','Sprain','Dislocated Joint','Broken Bone'],
 		stat: 'move',
 	},
 	
 	vertigo: {
 		names: ['Dizzy','Nauseous'],
 		stat: 'move',
 	},
 	
 
 };
 
 var dataManeuvers = {
 	
 	arcaneBeam: {
 		name: "Arcane Beam",
 		id: 'arcaneBeam',
 		description: 'A magical ranged attack which may burn or terrify the target.',
 		img: '',
 		cost: {move:1,focus:1},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 10,
 		projectileImg: 'img/rainbow.png',
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'focus',defender,'armor',true,[dataWounds.fire,dataWounds.fear])
 			view.bounceMob(attacker,defender.location);
 			view.beamAnimate(attacker.location,defender.location,'img/rainbow.png');
 		},
 	},
 
 	bite: {
 		name: "Bite",
 		id: 'bite',
 		description: 'Teeth!  Rahr!',
 		img: '',
 		cost: {move:1},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 1,
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'strength',defender,'armor',true,[dataWounds.bite])
 			view.attackAnimate(attacker,defender.location);
 		},
 	},
 	
 	defensiveStance: {
 		name: "Defensive Stance",
 		id: 'defensiveStance',
 		description: 'Converts 1 Strength into 2 Move for better defense and weaker attacks.',
 		img: '',
 		cost: {strength:1},
 		target: false,
 		range: 0,
 		execute: function() {
 			view.focus.mob.stats.move = Math.min(view.focus.mob.stats.move+2,view.focus.mob.stats.moveMax);
 		},
 	},
 	
 	exhort: {
 		name: "Exhort",
 		id: 'exhort',
 		description: 'Encourage a companion to fight on.  Costs a fifth of your own morale and increases theirs by twice your cost.',
 		img: '',
 		cost: {move:1,focus:1},
 		target: true,
 		targetHostiles: false,
 		targetTeam: true,
 		range: 2,
 		execute: function(enactor,target) {
 			var moraleCost = enactor.stats.morale * 0.2;
 			target.adjustMorale(moraleCost*2);
 			enactor.adjustMorale(-1 * moraleCost);
 			view.attackAnimate(enactor,target.location);
 			view.bounceMob(target);
 		},
 	},
 	
 	firstAid: {
 		name: "First Aid",
 		id: 'firstAid',
 		description: 'Heals all wounds with a penalty of -1.',
 		img: '',
 		cost: {move:1,focus:1},
 		target: true,
 		targetHostiles: false,
 		targetTeam: true,
 		range: 1,
 		execute: function(enactor,target) {
 			var woundCount = 0;
 			for (s in target.wounds) {
 				for (w in target.wounds[s]) {
 					if (target.wounds[s][w].penalty === -1) {
 						target.wounds[s].splice(w,1);
 						woundCount++;
 						target.stats.move = 0;
 						enactor.stats.move = 1;
 					};
 				};
 			};
 			view.attackAnimate(enactor,target.location);
 			if (woundCount > 0) {
				view.bounceMob(target);
 			};
 		},
 	},
 
 	hack: {
 		name: "Hack",
 		id: 'hack',
 		description: 'A simple hand-to-hand attack.',
 		img: '',
 		cost: {move:1,strength:1},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 1,
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'strength',defender,'armor',true,[dataWounds.sharp])
 			view.attackAnimate(attacker,defender.location);
 		},
 	},
 
 	lunge: {
 		name: "Lunge",
 		id: 'lunge',
 		description: 'A hand-to-hand attack with increased reach.',
 		img: '',
 		cost: {move:1,strength:1},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 2,
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'focus',defender,'armor',true,[dataWounds.sharp])
 			view.attackAnimate(attacker,defender.location);
 		},
 	},
 
 	overhead: {
 		name: "Overhead Strike",
 		id: 'overhead',
 		description: 'A stunning hand-to-hand attack that may injure and demoralize.',
 		img: '',
 		cost: {move:1,strength:2},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 1,
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'strength',defender,'armor',true,[dataWounds.sharp])
 			game.simpleAttack(attacker,'strength',defender,'armor',true,[dataWounds.fear])
 			view.attackAnimate(attacker,defender.location);
 		},
 	},
 	
 	puppyKisses: {
 		name: "Puppy Kisses",
 		id: 'puppyKisses',
 		description: 'Increase the morale of your people.',
 		img: '',
 		cost: {move:1,focus:1},
 		target: true,
 		targetHostiles: false,
 		targetTeam: true,
 		range: 1,
 		execute: function(enactor,target) {
 			target.adjustMorale(100);
 			view.attackAnimate(enactor,target.location);
 			view.bounceMob(target);
 		},
 	},
 	
 	quickTrance: {
 		name: "Quick Trance",
 		id: 'quickTrance',
 		description: 'Converts 2 Move into 4 Focus.',
 		img: '',
 		cost: {move:2},
 		target: false,
 		range: 0,
 		execute: function() {
 			view.focus.mob.stats.focus = Math.min(view.focus.mob.stats.focus+4,view.focus.mob.stats.focusMax);
 		},
 	},
 
 	shieldSlam: {
 		name: "Shield Slam",
 		id: 'shieldSlam',
 		description: 'A simple hand-to-hand attack.  May knock back the target.',
 		img: '',
 		cost: {move:1},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 1,
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'strength',defender,'strength',true,[dataWounds.blunt]);
 			view.attackAnimate(attacker,defender.location);
 		},
 	},
 
 	slash: {
 		name: "Slash",
 		id: 'slash',
 		description: 'A simple hand-to-hand attack.',
 		img: '',
 		cost: {move:1,strength:1},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 1,
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'focus',defender,'armor',true,[dataWounds.sharp])
 			view.attackAnimate(attacker,defender.location);
 		},
 	},
 	
 	taunt: {
 		name: "Taunt",
 		id: 'taunt',
 		description: "I don't even know, man.",
 		img: '',
 		cost: {move:1},
 		target: false,
 		range: 2,
 		execute: function() {},
 	},
 
 };
 
 var dataItems = {
 
 	firstAidKit: {
 		name: "First Aid Kit",
 		slot: ['item0','item1','item2'],
 		maneuvers: [
 			dataManeuvers.firstAid,
 		],
 	},
 	
 	initiateSpellbook: {
 		name: "Initiate's Spellbook",
 		slot:['left','right'],
 		maneuvers: [
 			dataManeuvers.quickTrance,
 		],
 	},
 	
 	initiatesRobes: {
 		name: "Initiate's Robes",
 		slot: ['armor'],
 		passiveDefense: 2,
 		simpleColoring: {
 			torso: {fill:'beige'},
 			upperArms: {fill:'beige'},
 			lowerArms: {fill:'beige'},
 			legs: {fill:'beige'},
 		},
 		svgNodes: function(mob,bodyConstants) {
 			var svgNodes = document.createElementNS('http://www.w3.org/2000/svg',"g");
 			
			// Robe Bottom
 			var robePath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			robePath.setAttribute("fill",'beige');
			robePath.setAttribute("stroke","#000000");
			robePath.setAttribute("stroke-width","1");
			robePath.setAttribute("stroke-linecap","round");
			
			// start right hip
			x = 100 - mob.faceData.hips;
			y = bodyConstants.neck + 53;
			var path = 'm '+x+','+y;
			
			// to right knee
			x = -27 + mob.faceData.hips;
			y = 20;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y-3;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// to fold on top of right foot
			x = 5;
			y = 12;
			c1x = 0;
			c1y = 3;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			path += ' l 3,2 l -3,-2';
			
			// to outside of fold
			x = -2;
			y = 4;
			c1x = -3;
			c1y = -2;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// to floor
			x = 24;
			y = 7;
			c1x = 0;
			c1y = 0;
			c2x = x - 10;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// to top of left foot
			x = 22;
			y = -7;
			c1x = 10;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// to left knee
			x = 5;
			y = -16;
			c1x = 0;
			c1y = 3;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// to left hip
			x = -27 + mob.faceData.hips;
			y = -18;
			c1x = 0;
			c1y = -3;
			c2x = x;
			c2y = y-10;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			robePath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(robePath);
 			
			// Panel
 			var panelPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			panelPath.setAttribute("fill",'darkblue');
			panelPath.setAttribute("stroke","gold");
			panelPath.setAttribute("stroke-width","3");
			panelPath.setAttribute("stroke-linecap","round");
			
			// start right top
			x = 92;
			y = bodyConstants.neck;
			var path = 'm '+x+','+y;
			
			// down to bustline
			x = 0 - Math.max(0,mob.faceData.bust / 8);
			y = 24;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y - Math.max(0,mob.faceData.bust / 8);
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// down to belly
			x = 0 + Math.max(0,mob.faceData.bust / 8) - Math.max(0,mob.faceData.belly / 8);
			y = 20;
			c1x = 0;
			c1y = Math.max(0,mob.faceData.bust / 8);
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// down to floor
			x = Math.max(0,mob.faceData.belly / 8) - 2;
			y = 45;
			c1x = 0;
			c1y = 0;
			c2x = x+2;
			c2y = y-2;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// across to left bottom
			x = 20;
			y = 0;
			c1x = 0;
			c1y = 4;
			c2x = x;
			c2y = y+4;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// up to belly
			x = Math.max(0,mob.faceData.belly / 8) - 2;
			y = -45;
			c1x = -2;
			c1y = -2;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// up to bustline
			x = Math.max(0,mob.faceData.bust / 8) - Math.max(0,mob.faceData.belly / 8);
			y = -20;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y + Math.max(0,mob.faceData.bust / 8);
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// up to neck
			x = 0 - Math.max(0,mob.faceData.bust / 8);
			y = -25;
			c1x = 0;
			c1y = 0 - Math.max(0,mob.faceData.bust / 8);
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			path += ' z';
			panelPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(panelPath);
 			
			// Belt
 			var beltPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			beltPath.setAttribute("fill",'darkblue');
			beltPath.setAttribute("stroke","#000000");
			beltPath.setAttribute("stroke-width","1");
			beltPath.setAttribute("stroke-linecap","round");
			
			var bellyDip = 0;
			if (mob.faceData.belly > 0) {
				bellyDip = (mob.faceData.belly-15) * 0.7;
			};
			
			// start right top
			x = 98 - mob.faceData.hips;
			y = bodyConstants.neck + 51;
			var path = 'm '+x+','+y;
			
			// go to left top with belly dip
			x = mob.faceData.hips * 2 + 4;
			y = 0;
			c1x = 0;
			c1y = bellyDip;
			c2x = x;
			c2y = y+bellyDip;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to left bottom
			x = 0;
			y = 4;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to right bottom with belly dip
			x = mob.faceData.hips * -2 - 4;
			y = 2;
			c1x = 0;
			c1y = bellyDip;
			c2x = x;
			c2y = y+bellyDip;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			path += ' z';
			beltPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(beltPath);
			 			
 			return svgNodes;
 		},
 	},
 
 	daisySword: {
 		name: "Daisy's Sword",
 		slot: ['right'],
 		size: 2,
 		maneuvers: [
 			dataManeuvers.lunge,
 			dataManeuvers.overhead,
 		],
 	},
 
 	mothersSword: {
 		name: "Mother's Sword",
 		slot: ['right'],
 		maneuvers: [
 			dataManeuvers.slash,
 			dataManeuvers.defensiveStance,
 		],
 	},
 	
 	roughspun: {
 		name: "Roughspun Clothes",
 		slot: ['armor'],
 		passiveDefense: 0,
 		penalty: {move:0,focus:0},
 		simpleColoring: {
 			upperArms: {fill:'firebrick'},
 			feet: {fill:'saddlebrown'},
 		},
 		svgNodes: function(mob,bodyConstants) {
 			var svgNodes = document.createElementNS('http://www.w3.org/2000/svg',"g");
 			
 			// Shirt
 			var shirtGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
 			
 			var shirtPath = document.createElementNS('http://www.w3.org/2000/svg',"use");
			shirtPath.setAttribute("fill",'firebrick');
			shirtPath.setAttribute("href",'#torso');
			shirtGroup.appendChild(shirtPath);
 			
 			var rightBreast = document.createElementNS('http://www.w3.org/2000/svg',"use");
			rightBreast.setAttribute("fill",'firebrick');
			rightBreast.setAttribute("href",'#rightBreast');
			shirtGroup.appendChild(rightBreast);
 			
 			var leftBreast = document.createElementNS('http://www.w3.org/2000/svg',"use");
			leftBreast.setAttribute("fill",'firebrick');
			leftBreast.setAttribute("href",'#leftBreast');
			shirtGroup.appendChild(leftBreast);
 			
 			var defs = document.createElementNS('http://www.w3.org/2000/svg',"defs");
 			var collarClipPath = document.createElementNS('http://www.w3.org/2000/svg',"clipPath");
 			var collarPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			collarClipPath.appendChild(collarPath);
			collarClipPath.id = 'collarClipPath';
			defs.appendChild(collarClipPath);
			svgNodes.appendChild(defs);
			
			// start right top
			x = 100 - mob.faceData.shoulders * 0.5;
			y = bodyConstants.neck;
			var path = 'm '+x+','+y;
			
			// go to left top with dip
			x = mob.faceData.shoulders;
			y = 0;
			c1x = 0;
			c1y = 30;
			c2x = x;
			c2y = y + 30;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			var liningPath = path;
			
			path += 'h100 v100 h-250 v-100 z';
			
			collarPath.setAttributeNS(null,"d",path);
			shirtGroup.setAttribute("clip-path","url(#collarClipPath)");
			svgNodes.appendChild(shirtGroup);
			
			// Bustline
 			var bustline = document.createElementNS('http://www.w3.org/2000/svg',"path");
			bustline.setAttribute("fill",'firebrick');
			bustline.setAttribute("stroke",'none');
			bustline.setAttribute("stroke-width","1");
			bustline.setAttribute("stroke-linecap","round");
						
			// start right top
			x = 100 - mob.faceData.bust / 2;
			y = bodyConstants.neck + 22;
			var depth = mob.faceData.bust / 2 + 1.5;
			var path = 'm '+x+','+y+' v'+depth+' h'+mob.faceData.bust+' v-'+depth;
			
			bustline.setAttributeNS(null,"d",path);
			svgNodes.appendChild(bustline);
			
 			var collarLining = document.createElementNS('http://www.w3.org/2000/svg',"path");
			collarLining.setAttribute("fill",'none');
			collarLining.setAttribute("stroke",'#000000');
			collarLining.setAttribute("stroke-width","1");
			collarLining.setAttribute("stroke-linecap","round");
			collarLining.setAttributeNS(null,"d",liningPath);
			svgNodes.appendChild(collarLining);
			
			
			// Shorts
 			var shortsPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			shortsPath.setAttribute("fill",'tan');
			shortsPath.setAttribute("stroke","#000000");
			shortsPath.setAttribute("stroke-width","1");
			shortsPath.setAttribute("stroke-linecap","round");
			
			var bellyDip = 0;
			if (mob.faceData.belly > 0) {
				bellyDip = (mob.faceData.belly-15) * 0.5;
			};
			
			// start right top
			x = 100 - mob.faceData.hips;
			y = bodyConstants.neck + 58;
			var path = 'm '+x+','+y;
			
			// go to left top with belly dip
			x = mob.faceData.hips * 2;
			y = 0;
			c1x = 0;
			c1y = bellyDip;
			c2x = x;
			c2y = y+bellyDip;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to outside left knee
			x = 25 - mob.faceData.hips;
			y = 15;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to inside left knee
			x = -10;
			y = 5;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to crotch
			x = -15;
			y = -12;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to inside right knee
			x = -15;
			y = 12;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to outside right knee
			x = -10;
			y = -5;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			path += ' z';
			shortsPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(shortsPath);
			
			
			// Belt
 			var beltPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			beltPath.setAttribute("fill",'SaddleBrown');
			beltPath.setAttribute("stroke","#000000");
			beltPath.setAttribute("stroke-width","1");
			beltPath.setAttribute("stroke-linecap","round");
			
			var bellyDip = 0;
			if (mob.faceData.belly > 0) {
				bellyDip = (mob.faceData.belly-15) * 0.5;
			};
			
			// start right top
			x = 100 - mob.faceData.hips;
			y = bodyConstants.neck + 55;
			var path = 'm '+x+','+y;
			
			// go to left top with belly dip
			x = mob.faceData.hips * 2;
			y = 0;
			c1x = 0;
			c1y = bellyDip;
			c2x = x;
			c2y = y+bellyDip;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to left bottom
			x = 0;
			y = 3;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			// go to right bottom with belly dip
			x = mob.faceData.hips * -2;
			y = 0;
			c1x = 0;
			c1y = bellyDip;
			c2x = x;
			c2y = y+bellyDip;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			path += ' z';
			beltPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(beltPath);
			 			
 			return svgNodes;
 		},
 	},
 	
 	scrapArmor: {
 		name: "Scrap Armor",
 		slot: ['armor'],
 		passiveDefense: 1,
 		penalty: {move:1,focus:1},
 		simpleColoring: {
 			bust: {fill:'none',stroke:'none'},
 			legs: {fill:'tan'},
 			feet: {fill:'darkgrey'},
 		},
 		svgNodes: function(mob,bodyConstants) {
 			var svgNodes = document.createElementNS('http://www.w3.org/2000/svg',"g");
 			
 			var scrapColors = ['#A0522D','#A05221','#A0452D'];
 			
 			// Skirt Straps
 			var startX;
 			var startY; 
 			for (i in [0,1,2]) {
				newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
				newPath.setAttribute("fill",scrapColors[i]);
				newPath.setAttribute("stroke","#000000");
				newPath.setAttribute("stroke-width","1");
				newPath.setAttribute("stroke-linecap","round");
			
				otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
				otherNewPath.setAttribute("fill",scrapColors[2-i]);
				otherNewPath.setAttribute("stroke","#000000");
				otherNewPath.setAttribute("stroke-width","1");
				otherNewPath.setAttribute("stroke-linecap","round");
				
				var startX = 100 - i * mob.faceData.hips/3;
				var startY = bodyConstants.neck + 70 + i * mob.faceData.hips/-3 ;
				
				var path = 'm '+startX+','+startY;
				path += ' l -10,10 l -3,-3 l 8,-12';
				
				var startX = 100 + i * mob.faceData.hips/3;
				
				var otherPath = 'm '+startX+','+startY;
				otherPath += ' l 10,10 l 3,-3 l -8,-12';
				
				newPath.setAttributeNS(null,"d",path);
				svgNodes.appendChild(newPath);
				
				otherNewPath.setAttributeNS(null,"d",otherPath);
				svgNodes.appendChild(otherNewPath);

 			}
 			
 			// Shoulder Straps
 			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",scrapColors[0]);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			var x = 100 - mob.faceData.shoulders * 0.9;
			var y = bodyConstants.neck + 3;
			path = 'm '+x+','+y;
			path += 'l 10,-2 l 2,20 l -12,0 z'
			
			newPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(newPath);
			
 			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",scrapColors[1]);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			var x = 100 + mob.faceData.shoulders * 0.9;
			var y = bodyConstants.neck + 3;
			path = 'm '+x+','+y;
			path += 'l -10,-2 l -2,20 l 12,0 z'
			
			newPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(newPath);
 			
 			var scraps = [
 				{x:4+mob.faceData.hips,y:15},
 				{x:4+mob.faceData.belly,y:10},
 				{x:4+mob.faceData.shoulders*0.8,y:15},
 				{x:4+mob.faceData.shoulders*0.9,y:10},
 				{x:4+mob.faceData.shoulders,y:0},
 			];
 			
 			var currentY = 50;
 			for (i=0;i<scraps.length-1;i++) {
				
				var startY = bodyConstants.neck + currentY + scraps[i].x;
				
				var color = scrapColors[i % 3];
 				newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
				newPath.setAttribute("fill",color);
				newPath.setAttribute("stroke","#000000");
				newPath.setAttribute("stroke-width","1");
				newPath.setAttribute("stroke-linecap","round");
				var overstepY = scraps[i].y + scraps[i].x - scraps[i+1].y;
				path = 'm 100,'+startY;
				x = scraps[i].x;
				y = scraps[i].x;
				path += 'c 5,0 '+x+',-'+y+' '+x+',-'+y;
				x = scraps[i+1].x - scraps[i].x;
				y = -1 * scraps[i].y;
				if (i < scraps.length-2) {path += 'l '+x+','+y;};
				path += 'l -2,-2';
				x = -1 * scraps[i+1].x - 3;
				y = scraps[i].x + 5;
				if (i === scraps.length-2) {y -= scraps[i].y -1;};
				path += 'l '+x+','+y;
				path += ' z';
				newPath.setAttributeNS(null,"d",path);
				svgNodes.appendChild(newPath);
				
				color = scrapColors[(scraps.length-i) % 3];
 				newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
				newPath.setAttribute("fill",color);
				newPath.setAttribute("stroke","#000000");
				newPath.setAttribute("stroke-width","1");
				newPath.setAttribute("stroke-linecap","round");
				var overstepY = scraps[i].y + scraps[i].x - scraps[i+1].y;
				path = 'm 100,'+startY;
				x = -1 * scraps[i].x;
				y = scraps[i].x;
				path += 'c -5,0 '+x+',-'+y+' '+x+',-'+y;
				x = scraps[i].x - scraps[i+1].x;
				y = -1 * scraps[i].y;
				if (i < scraps.length-2) {path += 'l '+x+','+y;};
				path += 'l 2,-2';
				x = scraps[i+1].x + 3;
				y = scraps[i].x + 5;
				if (i === scraps.length-2) {y -= scraps[i].y -1;};
				path += 'l '+x+','+y;
				path += ' z';
				newPath.setAttributeNS(null,"d",path);
				svgNodes.appendChild(newPath);
				
				currentY -= 15;
 			};
 			
 			return svgNodes;
 		},
 	},
 	
 	scrapShield: {
 		name: "Simple Shield",
 		slot: ['left','right'],
 		maneuvers: [
 			dataManeuvers.shieldSlam,
 		],
 	},
 	
 	simpleAxe: {
 		name: "Simple Axe",
 		slot: ['left','right'],
 		maneuvers: [
 			dataManeuvers.hack,
 		],
 	},
 	
 	mysticalSwordOfLegend: {
 		name: "Mystical Sword of Legend which also Sings, Probably",
 		slot: ['left','right'],
 		maneuvers: [
 			dataManeuvers.hack,
 			dataManeuvers.quickTrance,
 			dataManeuvers.taunt,
 		],
 	},
 
 };
 
 var dataMobs = {
 
 	hellhound: {
 		name: "Hellhound",
 		img: "img/hellpuppy.svg",
 		ai: 'basic',
 		stats: {
 			morale: 100,
 			move: 6,
 			moveMax: 6,
 			strength: 5,
 			strengthMax: 5,
 			focus: 2,
 			focusMax: 2,
 			armor: 4,
 		},
 		maneuvers: [
 			dataManeuvers.puppyKisses,
 		],
 	},
 
 	rat: {
 		name: "Rat",
 		img: "img/rat.svg",
 		ai: 'basic',
 		stats: {
 			morale: 100,
 			move: 3,
 			moveMax: 3,
 			strength: 2,
 			strengthMax: 2,
 			focus: 1,
 			focusMax: 1,
 			armor: 1,
 		},
 		maneuvers: [
 			dataManeuvers.bite,
 		],
 	},
 
 	beulahHill: {
 		name: "Beulah Hill",
 		img: "img/giant.png",
 		ai: 'basic',
 		stats: {
 			morale: 100,
 			move: 1,
 			moveMax: 1,
 			strength: 1,
 			strengthMax: 1,
 			focus: 2,
 			focusMax: 2,
 			armor: 2,
 		},
 	},
 	
 	daisy: {
 		name: "Daisy Moucau",
 		img: "img/minotaur.svg",
 		ai: "basic",
 		stats: {
 			morale: 100,
 			move: 3,
 			moveMax: 3,
 			strength: 5,
 			strengthMax: 5,
 			focus: 2,
 			focusMax: 2,
 			armor: 4,
 		},
 		maneuvers: [
 			dataManeuvers.lunge,
 			dataManeuvers.overhead,
 		],
 		equipment: {
 			left: dataItems.daisySword,
 			armor: dataItems.scrapArmor,
 		},
 	},
 
 	elderBock: {
 		name: "Elder Bock",
 		img: "img/dwarf.png",
 		ai: 'basic',
 		stats: {
 			morale: 100,
 			move: 2,
 			moveMax: 2,
 			strength: 1,
 			strengthMax: 1,
 			focus: 2,
 			focusMax: 2,
 			armor: 2,
 		},
 	},
 	
 	guildmasterMoucau: {
 		name: "Guildmaster Moucau",
 		img: "img/guildmasterMoucau.png",
 		ai: 'basic',
 		stats: {
 			morale: 100,
 			move: 5,
 			moveMax: 5,
 			strength: 2,
 			strengthMax: 2,
 			focus: 2,
 			focusMax: 2,
 			armor: 2,
 		},
 	},
 	
 	looter: {
 		name: "Looter",
 		img: "img/centaur.png",
 		ai: 'basic',
 		stats: {
 			morale: 100,
 			move: 3,
 			moveMax: 3,
 			strength: 3,
 			strengthMax: 3,
 			focus: 1,
 			focusMax: 1,
 			armor: 2,
 		},
 		maneuvers: [
 			dataManeuvers.slash,
 		],
 	},
 	
 	assassin: {
 		name: "Assassin",
 		img: "img/assassin.png",
 		ai: 'basic',
 		stats: {
 			morale: 100,
 			move: 2,
 			moveMax: 2,
 			strength: 3,
 			strengthMax: 3,
 			focus: 3,
 			focusMax: 3,
 			armor: 3,
 		},
 		maneuvers: [
 			dataManeuvers.slash,
 		],
 	},
 	
 	motherSkullgoblet: {
 		name: "Mother Skullgoblet",
 		img: "img/motherSkullgoblet.png",
 		ai: 'basic',
 		stats: {
 			morale: 100,
 			move: 1,
 			moveMax: 1,
 			strength: 5,
 			strengthMax: 5,
 			focus: 2,
 			focusMax: 2,
 			armor: 2,
 		},
 	},
 
 };
 
 
 var heroes = [
 
 	{
 		name: "Eleanor",
 		id: "p1",
 		race: "point",
 		img: 'img/eleanor.svg',
 		stats: {
 			morale: 100,
 			move: 4,
 			moveMax: 4,
 			strength: 4,
 			strengthMax: 4,
 			focus: 3,
 			focusMax: 3,
 			armor: 3,
 		},
 		maneuvers: [
 			dataManeuvers.slash,
 			dataManeuvers.defensiveStance,
 			dataManeuvers.exhort,
 		],
 		equipment: {
 			armor: dataItems.scrapArmor,
 			right: dataItems.mothersSword,
 			left: undefined,
 			item0: undefined,
 			item1: undefined,
 			item2: undefined,
 		},
 		skills: {
 			maneuvers: [
				dataManeuvers.slash,
				dataManeuvers.defensiveStance,
 			],
 			passives: [
 			],
 		},
 	},
 
 	{
 		name: "Mx. Stout",
 		id: "stout",
 		img: 'img/stout.svg',
 		race: "halfbreed",
 		stats: {
 			morale: 100,
 			move: 3,
 			moveMax: 3,
 			strength: 3,
 			strengthMax: 3,
 			focus: 5,
 			focusMax: 5,
 			armor: 4,
 		},
 		maneuvers: [
 			dataManeuvers.hack,
 			dataManeuvers.quickTrance,
 			dataManeuvers.arcaneBeam,
 			dataManeuvers.firstAid,
 		],
 		equipment: {
 			armor: dataItems.initiatesRobes,
 			right: dataItems.simpleAxe,
 			left: dataItems.initiateSpellbook,
 			item0: dataItems.firstAidKit,
 			item1: undefined,
 			item2: undefined,
 		},
 		skills: {
 			maneuvers: [
				dataManeuvers.arcaneBeam,
 			],
 			passives: [
 			],
 		},
 	},
 	
 ];

 var company = {
 
 	armory: [
 		dataItems.scrapArmor,
 		dataItems.simpleShield,
 	],
 	
 	completed: [
 	],
 	
 	deeds: {
 	},
 
 };