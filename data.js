 
 
 var dataWounds = {
 
 	bewitched: {
 		name: "Bewitched",
 		stat: "focus",
 		penalty: -3,
 	},
 
 	bite: {
 		name: "Bite",
 		stat: "strength",
 		penalty: -2,
 	},
 
 	dazed: {
 		name: "Dazed",
 		stat: "focus",
 		penalty: -1,
 	},
 
 	laceration: {
 		name: "Lacerated Chest",
 		stat: "strength",
 		penalty: -3,
 	},
 
 	intimidation: {
 		name: "Intimidated",
 		stat: "focus",
 		penalty: -1,
 	},
 
 	scratch: {
 		name: "Just a Scratch",
 		stat: "strength",
 		penalty: -1,
 	},
 
 	sprain: {
 		name: "Sprained Ankle",
 		stat: "move",
 		penalty: -2,
 	},
 
 	stab: {
 		name: "Stab Wound",
 		stat: "strength",
 		penalty: -4,
 	},
 
 	sting: {
 		name: "Sting",
 		stat: "focus",
 		penalty: -1,
 	},
 
 	strain: {
 		name: "Strained Knee",
 		stat: "move",
 		penalty: -1,
 	},
 
 	terror: {
 		name: "Terror",
 		stat: "focus",
 		penalty: -3,
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
 		execute: function() {},
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
 		execute: function() {},
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
 		execute: function(target) {},
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
 		execute: function(target) {},
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
 		execute: function(target) {},
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
 		execute: function() {},
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
 			focus: 6,
 			focusMax: 6,
 		},
 		maneuvers: [
 			dataManeuvers.hack,
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
 	],
 
 };