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
	
	centaur: {neighbors:['faunic','satyric'],greenKeratin:0,lipPinkness:25, earShading:31, earPinkness:44, templePosition:9, templeWidth:2, templeHeight:6, cheekbonePosition:9, chinHeight:45, chinWidth:16, eyeDistance:17, eyeSize:8.5, browSize:5, noseHeight:60, noseSize:4, noseWidth:6, nostrilHeight:6, noseBump:8, mouthWidth:12, teeth:1, leftTusk:0, rightTusk:0, earSize:18, earDip:-5.5, earTilt:6, earWidth:-25.5, earLobe:8, hairCurl:15, horns:0, shoulders:37, belly:20, hips:20, feet:0},
	dwarven: {neighbors:['gnomish','halfling','ogrish','gigantic'],pinkPheomelanin:36, greenKeratin:0, lipPinkness:34, earShading:78, earPinkness:12, templePosition:8, templeWidth:3, templeHeight:5, cheekbonePosition:13, chinHeight:42, chinWidth:30, eyeDistance:14, eyeSize:8, browSize:3.5, noseHeight:38, noseSize:2, noseWidth:6, nostrilHeight:5, noseBump:7, mouthWidth:12, teeth:0, leftTusk:0, rightTusk:0, earSize:11, earDip:-7.5, earTilt:0.5, earWidth:0.5, earLobe:15, horns:0, shoulders:33, belly:23, hips:22, feet:14,},
	elvish: {neighbors:['elvish','faunic','satyric','halfling','orcish'],greenKeratin:0, lipPinkness:35, earShading:-10, earPinkness:46, templePosition:12, templeWidth:2, templeHeight:7, cheekbonePosition:5, chinHeight:44, chinWidth:17, eyeDistance:13, eyeSize:6, browSize:1, noseHeight:39, noseSize:1, noseWidth:5, nostrilHeight:3, noseBump:-2, lipSize:2, teeth:0, leftTusk:0, rightTusk:0, earSize:20, earDip:-20, earTilt:2.5, earWidth:-12.5, earLobe:15, hairCurl:1, horns:0, shoulders:32, belly:15, hips:15, feet:11},
	faunic: {neighbors:['satyric','centaur','minotaur','elvish'],lipPinkness:0, earShading:-40, earPinkness:40, templePosition:13, templeWidth:4, templeHeight:3, cheekbonePosition:9, chinHeight:45, chinWidth:19, eyeDistance:15, eyeSize:7.25, browSize:4, noseHeight:54, noseSize:4, noseWidth:4, nostrilHeight:4, noseBump:8, teeth:1, leftTusk:0, rightTusk:0, earSize:18, earDip:-5, earTilt:7, earWidth:27, earLobe:8, hairCurl:20, horns:3, shoulders:35, belly:17, hips:20, feet:2},
	gigantic: {neighbors:['ogrish','dwarven'],pinkPheomelanin:1, greenKeratin:0, lipPinkness:10, earShading:61, earPinkness:7, templePosition:13, templeWidth:2, templeHeight:6, cheekbonePosition:13, chinHeight:45, chinWidth:16, eyeDistance:17, eyeSize:6.5, noseHeight:39, noseSize:4, noseWidth:6, nostrilHeight:4, noseBump:6, mouthWidth:11, teeth:0, leftTusk:0, rightTusk:0, earSize:11, earDip:-8.5, earTilt:0.5, earWidth:15.5, earLobe:11.5, horns:2, shoulders:40, belly:25, hips:23, feet:12},
	gnollish: {neighbors:['orcish','goblin'],blackEumelanin:20, brownEumelanin: 50, pinkPheomelanin:1, greenKeratin:0, lipPinkness:50, earShading:-25, earPinkness:40, templePosition:13, templeWidth:2, templeHeight:5, cheekbonePosition:13, chinHeight:40, chinWidth:26, eyeDistance:14, eyeSize:9, browSize:0.75, insideEyelidCurve:-1, outsideEyelidCurve:8, lowerEyelidCurve:5, noseHeight:69, noseSize:2, noseWidth:6, nostrilHeight:7, noseBump:10, mouthWidth:15, lipSize:2, teeth:1, leftTusk:1, rightTusk:1, earSize:20, earDip:-20, earTilt:3.5, earWidth:50, earLobe:15, hairCurl:20, horns:0, shoulders:33, belly:15, hips:15, feet:6},
	gnomish: {neighbors:['halfling','dwarven'],pinkPheomelanin:13, greenKeratin:0, lipPinkness:50, earShading:57, earPinkness:44, templePosition:19, templeWidth:3, templeHeight:5, cheekbonePosition:12, chinHeight:45, chinWidth:17, eyeDistance:15, eyeSize:8.25, browSize:1.25, noseHeight:53, noseSize:4, noseWidth:8, nostrilHeight:10, noseBump:10, mouthWidth:10, lipSize:3, teeth:0, leftTusk:0, rightTusk:0, earSize:20, earDip:-7, earTilt:-6, earWidth:-1, earLobe:15, horns:0, shoulders:30, belly:19, hips:15, feet:20},
	goblin: {neighbors:['orcish','gnollish'],pinkPheomelanin:1, greenKeratin:40, lipPinkness:0, earShading:56, earPinkness:0, templePosition:13, templeWidth:2, templeHeight:3, cheekbonePosition:12, chinHeight:42, chinWidth:15, eyeDistance:12, eyeSize:6, noseHeight:37, noseSize:2, noseWidth:5, nostrilHeight:8, noseBump:10, mouthWidth:10, lipSize:1, teeth:5, leftTusk:0, rightTusk:0, earSize:16, earDip:-20, earTilt:0, earWidth:-17, earLobe:10, hairCurl:13.5, horns:0, shoulders:30, belly:15, hips:15, feet:20},
	halfling: {neighbors:['elvish','dwarven','gnomish'],pinkPheomelanin:14, greenKeratin:0, lipPinkness:36, earShading:16, earPinkness:35, templePosition:17, templeWidth:3, templeHeight:2, cheekbonePosition:17, chinHeight:46, chinWidth:23, eyeDistance:15, eyeSize:6.75, browSize:5, noseHeight:55, noseSize:4, noseWidth:7, nostrilHeight:7, noseBump:7, mouthWidth:11, leftTusk:0, rightTusk:0, earSize:12, earDip:-5.5, earTilt:2, earWidth:-0.5, earLobe:11.5, hairCurl:11, horns:0, shoulders:32, belly:25, hips:18, feet:20},
	kobold: {neighbors:['kobold'],pinkPheomelanin:1, greenKeratin:0, lipPinkness:0, templePosition:20, templeWidth:5, templeHeight:5, cheekbonePosition:9, chinHeight:46, chinWidth:15, eyeDistance:23, eyeSize:8.5, noseHeight:38, noseSize:3, noseWidth:7, nostrilHeight:1, noseBump:10, mouthWidth:15, lipSize:5, teeth:4, leftTusk:0, rightTusk:0, earSize:4, earDip:-20, earTilt:-10, earWidth:-50, earLobe:4, horns:0, shoulders:34, belly:22, hips:17, feet:6, hairLength:0, topHairHeight:0, bangsLength:0},
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
 			return draw.simpleRobe(mob,bodyConstants,['beige','darkblue','gold']);
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
 			feet: {fill:'saddlebrown',stroke:'#000000'},
 		},
 		svgNodes: function(mob,bodyConstants) {return draw.roughspun(mob,bodyConstants);},
 	},
 	
 	scrapArmor: {
 		name: "Scrap Armor",
 		slot: ['armor'],
 		passiveDefense: 1,
 		penalty: {move:1,focus:1},
 		simpleColoring: {
 			upperArms: {fill:'tan'},
 			bust: {fill:'none',stroke:'none'},
 			legs: {fill:'tan'},
 			feet: {fill:'darkgrey',stroke:'#000000'},
 		},
 		svgNodes: function(mob,bodyConstants) {return draw.scrapArmor(mob,bodyConstants);},
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
 		imgPath: "img/hellpuppy.svg",
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
 		imgPath: "img/rat.svg",
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
 		imgPath: "img/giant.png",
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
 		imgPath: "img/minotaur.svg",
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
 		imgPath: "img/dwarf.png",
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
 		imgPath: "img/guildmasterMoucau.png",
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
 		imgPath: "img/centaur.png",
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
 		imgPath: "img/assassin.png",
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
 		imgPath: "img/motherSkullgoblet.png",
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
 		imgPath: 'img/eleanor.svg',
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
				dataManeuvers.defensiveStance,
 			],
 			passives: [
 			],
 		},
 	},
 
 	{
 		name: "Mx. Stout",
 		id: "stout",
//  		imgPath: 'img/stout.svg',
 		race: "halfbreed",
 		faceData: {skinColor:'#d9895a', templePosition:12, templeWidth:2, templeHeight:5, cheekbonePosition:11, cheekboneWidth:2, cheekboneHeight:6, chinHeight:43, chinWidth:22, eyeColor:'#0e9bb4', eyeDistance:13, eyeSize:8, browSize:4, leftBrowTilt:2, rightBrowTilt:0, insideEyelidCurve:1, outsideEyelidCurve:7, lowerEyelidCurve:5, noseColor:'#de6c50', noseHeight:46, noseSize:3, noseWidth:6, nostrilHeight:8, noseBump:10, lipColor:'#e96557', mouthWidth:13, lipSize:5, smile:3, mouthOpen:3, teeth:2, leftTusk:0, rightTusk:0, earColor:'#e08465', earSize:14, earDip:-8, earTilt:-3, earWidth:-5, earLobe:14, hairColor:'#0a10e2', hairLength:14, hairCurl:4, hairPart:-7, hairBangs:6, hairBangsLength:14, hairSweep:5, topHairHeight:2, topHairBase:12, topHairWidth:6, horns:0, shoulders:32, bust:10, belly:20, hips:15, feet:20},
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
//  		dataItems.simpleShield,
 	],
 	
 	completed: [
 	],
 	
 	deeds: {
 	},
 
 };
 
 var p1 = {
	
	name: "Player One",
	id: "p1",
	
	faceData: {
		skinColor: '#000',
		templePosition: 0,
		templeWidth: 0,
		templeHeight: 0,
		cheekbonePosition: 0,
		cheekboneWidth: 0,
		cheekboneHeight: 0,
		chinHeight: 0,
		chinWidth: 0,
		eyeColor: '#000',
		eyeDistance: 0,
		eyeSize: 0,
		browSize: 0,
		leftBrowTilt: 0,
		rightBrowTilt: 0,
		insideEyelidCurve: 0,
		outsideEyelidCurve: 0,
		lowerEyelidCurve: 0,
		noseColor: '#000',
		noseHeight: 0,
		noseSize: 0,
		noseWidth: 0,
		nostrilHeight: 0,
		noseBump: 0,
		lipColor: '#000',
		mouthWidth: 0,
		lipSize: 0,
		smile: 0,
		mouthOpen: 0,
		teeth: 0,
		leftTusk: 0,
		rightTusk: 0,
		earColor: '#000',
		earSize: 0,
		earDip: 0,
		earTilt: 0,
		earWidth: 0,
		earLobe: 0,
		hairColor: 0,
		hairLength: 0,
		hairCurl: 0,
		hairPart: 0,
		hairBangs: 0,
		hairBangsLength: 0,
		hairSweep: 0,
		topHairHeight: 0,
		topHairBase: 0,
		topHairWidth: 0,
		horns: 0,
		shoulders: 0,
		bust: 0,
		belly: 0,
		hips: 0,
		feet: 0,
	},
	race: undefined,
	img: undefined,
	
	stats: {
		morale: 100,
		move: 4,
		moveMax: 4,
		strength: 3,
		strengthMax: 3,
		focus: 2,
		focusMax: 2,
		armor: 2,
	},
	
	equipment: {
		armor: dataItems.roughspun,
		right: dataItems.mothersSword,
		left: undefined,
		item0: undefined,
		item1: undefined,
		item2: undefined,
	},
	
	skills: {
		maneuvers: [
			dataManeuvers.exhort,
		],
		passives: [
			'dataPassives.ofThePeople',
		],
	},
	
};