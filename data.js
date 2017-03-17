 
 
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
 		},
 	},
 	
 	exhort: {
 		name: "Exhort",
 		id: 'exhort',
 		img: '',
 		cost: {move:1},
 		target: true,
 		targetHostiles: false,
 		targetTeam: true,
 		range: 2,
 		execute: function(enactor,target) {
 			var moraleCost = enactor.stats.morale * 0.2;
 			target.stats.morale = Math.min(100,target.stats.morale + moraleCost*2);
 			enactor.stats.morale -= moraleCost;
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
 			target.stats.morale = 100;
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
 			game.simpleAttack(attacker,'strength',defender,'strength',true,[dataWounds.blunt])
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
 		cost: {move:4},
 		target: false,
 		range: 0,
 		execute: function() {
 			view.focus.mob.stats.focus = view.focus.mob.stats.focusMax;
 		},
 	},
 
 };
 
 
 var heroes = [
 
 	{
 		name: "Daisy Moucau",
 		img: 'img/minotaur.png',
 		stats: {
 			morale: 70,
 			move: 4,
 			moveMax: 4,
 			strength: 5,
 			strengthMax: 5,
 			focus: 4,
 			focusMax: 4,
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
 			morale: 60,
 			move: 3,
 			moveMax: 3,
 			strength: 3,
 			strengthMax: 3,
 			focus: 6,
 			focusMax: 6,
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
 		stats: {
 			morale: 100,
 			move: 2,
 			moveMax: 2,
 			strength: 2,
 			strengthMax: 2,
 			focus: 2,
 			focusMax: 2,
 			armor: 1,
 		},
 	},
 
 	giant: {
 		name: "Giant",
 		img: "img/giant.png",
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
 
 
 var firstLevel = {
 
 	sizeX: 10,
 	sizeY: 10,
 	
 	background: 'img/background.png',
 	
 	startLocations: [
 		{x:0,y:0},
 		{x:0,y:1}
 	],
 	
 	walls: [
 		{x:0,y:4},
 		{x:7,y:0},
 		{x:8,y:0},
 		{x:9,y:0},
 		{x:8,y:1},
 		{x:9,y:1},
 		{x:7,y:2},
 		{x:6,y:3},
 		{x:7,y:3},
 		{x:9,y:3},
 		{x:7,y:4},
 		{x:8,y:5},
 		{x:9,y:6},
 		{x:9,y:7},
 		{x:8,y:8},
 		{x:9,y:8},
 		{x:8,y:9},
 		{x:9,y:9},
 		{x:5,y:5},
 		{x:5,y:6},
 		{x:6,y:7},
 		{x:5,y:8},
 		{x:5,y:9},
 	],
 		
 	pits: [
 		{x:2,y:0},
 		{x:3,y:0},
 		{x:4,y:0},
 		{x:5,y:0},
 		{x:3,y:1},
 		{x:4,y:1},
 		{x:5,y:1},
 		{x:3,y:2},
 		{x:3,y:3},
 		{x:2,y:5},
 		{x:3,y:5},
 		{x:0,y:6},
 		{x:1,y:6},
 		{x:2,y:6},
 		{x:3,y:6},
 		{x:0,y:7},
 		{x:1,y:7},
 		{x:2,y:7},
 		{x:3,y:7},
 		{x:4,y:7},
 		{x:0,y:8},
 		{x:1,y:8},
 		{x:2,y:8},
 		{x:3,y:8},
 		{x:0,y:9},
 		{x:1,y:9},
 		{x:2,y:9},
 		{x:3,y:9},
 	],
 	
 	mobs: [
 		{
			x:9,
			y:2,
			id:dataMobs.hellhound,
 		},
 		
 		{
			x:6,
			y:9,
			id:dataMobs.rat,
 		},
 		
 		{
			x:7,
			y:9,
			id:dataMobs.rat,
 		},
 	],
 	
 	events: [
 		{
 			x: 2,
 			y: 4,
 			execute: function() {
 				view.displayDialogue("The hellhound that has plagued the locals lurks within this cave!",this.name,this.img,"left");
 				this.location.event = undefined;
 			},
 		},
 		
 		{
 			x: 8,
 			y: 2,
 			execute: function() {
 				view.displayDialogue("Aren't you just the cutest little puppy?  Yes you are!  YES YOU ARE!!!<br />That's it, I'm taking you home!",this.name,this.img,"left");
 				this.location.event = undefined;
 				mobs[2].player = true;
 			},
 		},
 		
 		{
 			x: 5,
 			y: 4,
 			execute: function() {
 				view.displayDialogue("Ugh, I see rat droppings.  Is this cave filled with giant rats?  What is this, the first level of a fantasy RPG?",this.name,this.img,"left");
 				this.location.event = undefined;
 				mobs[4].stats.move = 4;
 				mobs[4].move(map.hexes[67]);
 				mobs[3].stats.move = 4;
 				mobs[3].move(map.hexes[77]);
 			},
 		},
 	],
 
 };