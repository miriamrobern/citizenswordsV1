
 
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
 	
 	scrapArmor: {
 		name: "Scrap Armor",
 		slot: ['armor'],
 		passiveDefense: 1,
 		penalty: {move:1,focus:1},
 	},
 	
 	simpleAxe: {
 		name: "Simple Axe",
 		slot: ['left','right'],
 		maneuvers: [
 			dataManeuvers.hack,
 		],
 	},
 	
 	simpleShield: {
 		name: "Simple Shield",
 		slot: ['left','right'],
 		maneuvers: [
 			dataManeuvers.shieldSlam,
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
 		img: "img/minotaur.png",
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
 		img: 'img/eleanor.png',
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
 		img: 'img/gnome.png',
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