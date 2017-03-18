 
 
 var dataWounds = {
 
 	bite: {
 		names: ["Bitten"],
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
 	
 	arcaneBolt: {
 		name: "Arcane Bolt",
 		id: 'arcaneBolt',
 		img: '',
 		cost: {focus:1,move:1},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 10,
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'focus',defender,'armor',true,[dataWounds.fire,dataWounds.fear])
 			view.attackAnimate(attacker,defender.location);
 		},
 	},
 
 	bite: {
 		name: "Bite",
 		id: 'bite',
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
 	
 	exhort: {
 		name: "Exhort",
 		id: 'exhort',
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
 		},
 	},
 
 	hack: {
 		name: "Hack",
 		id: 'hack',
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
 		img: '',
 		cost: {move:1,strength:3},
 		target: true,
 		targetHostiles: true,
 		targetTeam: false,
 		range: 1,
 		execute: function(attacker,defender) {
 			game.simpleAttack(attacker,'strength',defender,'armor',true,[dataWounds.sharp,dataWounds.fear])
 			view.attackAnimate(attacker,defender.location);
 		},
 	},
 	
 	puppyKisses: {
 		name: "Puppy Kisses",
 		id: 'puppyKisses',
 		img: '',
 		cost: {move:1,focus:1},
 		target: true,
 		targetHostiles: false,
 		targetTeam: true,
 		range: 1,
 		execute: function(enactor,target) {
 			target.adjustMorale(100);
 		},
 	},
 
 	shieldSlam: {
 		name: "Shield Slam",
 		id: 'shieldSlam',
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
 	
 	taunt: {
 		name: "Taunt",
 		id: 'taunt',
 		img: '',
 		cost: {move:1},
 		target: false,
 		range: 2,
 		execute: function() {},
 	},
 	
 	trance: {
 		name: "Quick Trance",
 		id: 'trance',
 		img: '',
 		cost: {move:2},
 		target: false,
 		range: 0,
 		execute: function() {
 			view.focus.mob.stats.focus = Math.min(view.focus.mob.stats.focus+4,view.focus.mob.stats.focusMax);
 		},
 	},
 
 };
 
 
 var heroes = [
 
 	{
 		name: "Daisy Moucau",
 		img: 'img/minotaur.png',
 		stats: {
 			morale: 100,
 			move: 4,
 			moveMax: 4,
 			strength: 4,
 			strengthMax: 4,
 			focus: 3,
 			focusMax: 3,
 			armor: 2,
 		},
 		maneuvers: [
 			dataManeuvers.lunge,
 			dataManeuvers.overhead,
 			dataManeuvers.exhort,
 		],
 	},
 
 	{
 		name: "Mx. Stout",
 		img: 'img/dwarf.png',
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
 			dataManeuvers.shieldSlam,
 			dataManeuvers.arcaneBolt,
 			dataManeuvers.trance,
 		],
 	},
 	
 ];
 
 var dataMobs = {
 
 	hellhound: {
 		name: "Hellhound",
 		img: "img/hellhound.png",
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
 		img: "img/rat.png",
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
 
 	giant: {
 		name: "Giant",
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
 
 };
 