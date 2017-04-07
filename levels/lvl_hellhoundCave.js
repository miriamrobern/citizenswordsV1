var hellhoundCave = {
	
	name: "The Lair of the Hellhound",
	description: "<p>One day, people will ask each other, 'What were you doing when the city declared itself sovereign?'</p><p>You will have to answer, 'I was fighting giant rats to save a puppy from angry villagers.'</p>",
 
 	sizeX: 22,
 	sizeY: 12,
 	
 	background: 'img/hellhoundCave.svg',
 	
 	startLocations: [
 		{x:6,y:1},
 		{x:5,y:2}
 	],
 	
 	walls: [
		{x:6,y:4},
		{x:13,y:0},
		{x:14,y:0},
		{x:15,y:0},
		{x:14,y:1},
		{x:13,y:2},
		{x:12,y:3},
		{x:13,y:3},
		{x:15,y:3},
		{x:13,y:4},
		{x:14,y:5},
		{x:15,y:6},
		{x:15,y:7},
		{x:14,y:8},
		{x:11,y:5},
		{x:11,y:6},
		{x:12,y:7},
		{x:11,y:8},
		{x:11,y:9},
		{x:9,y:10},
		{x:10,y:10},
		{x:16,y:3},
		{x:17,y:3},
		{x:18,y:3},
		{x:19,y:3},
		{x:20,y:3},
		{x:21,y:3},
		],
 		
 	pits: [
		{x:8,y:0},
		{x:9,y:0},
		{x:10,y:0},
		{x:11,y:0},
		{x:9,y:1},
		{x:10,y:1},
		{x:11,y:1},
		{x:9,y:2},
		{x:9,y:3},
		{x:8,y:5},
		{x:9,y:5},
		{x:6,y:6},
		{x:7,y:6},
		{x:8,y:6},
		{x:9,y:6},
		{x:6,y:7},
		{x:7,y:7},
		{x:8,y:7},
		{x:9,y:7},
		{x:10,y:7},
		{x:6,y:8},
		{x:7,y:8},
		{x:8,y:8},
		{x:9,y:8},
		{x:6,y:9},
		{x:7,y:9},
		{x:8,y:9},
		{x:9,y:9},
		{x:5,y:6},
		{x:5,y:7},
		{x:5,y:8},
		{x:5,y:9},
		{x:5,y:10},
		{x:6,y:10},
		{x:7,y:10},
		{x:8,y:10},
		{x:4,y:2},
		{x:4,y:3},
		{x:4,y:4},
		{x:4,y:5},
		{x:4,y:6},
		{x:5,y:7},
		{x:3,y:4},
		{x:2,y:4},
		{x:2,y:3},
		{x:1,y:4},
		{x:0,y:4},
		{x:0,y:3},
		{x:7,y:0},
		{x:5,y:0},
		{x:4,y:0},
		{x:3,y:0},
		{x:2,y:0},
		{x:1,y:0},
		{x:0,y:0},
		{x:11,y:10},
		{x:12,y:10},
		{x:13,y:10},
		{x:14,y:10},
		{x:15,y:10},
		{x:16,y:10},
		{x:16,y:0},
		{x:16,y:2},
		{x:16,y:4},
		{x:16,y:5},
		{x:16,y:6},
		{x:16,y:8},
		{x:16,y:9},
		{x:17,y:1},
		{x:17,y:7},
		],
 	
 	teams: {
 	
 		player: {
 			id: 'player',
 			truce: ['civilians'],
 		},
 		
 		rats: {
 			id: 'rats',
 			truce: ['hell'],
 		},
 		
 		hell: {
 			id: 'hell',
 		},
 	
 	},
 	
 	mobs: [
 		{
			x:15,
			y:2,
			type:dataMobs.hellhound,
			id: "puppy",
			name: "Hellpuppy",
			ai: 'dormant',
			team: 'hell',
 		},
 		
 		{
			x:12,
			y:9,
			type:dataMobs.rat,
			ai: 'dormant',
			team: 'rats',
 		},
 		
 		{
			x:13,
			y:9,
			type:dataMobs.rat,
			ai: 'dormant',
			team: 'rats',
 		},
 		
//  		{
// 			x:8,
// 			y:2,
// 			type:dataMobs.rat,
//			id: 'targetRat',
// 			ai: 'defeated',
// 			team: 'rats',
//  		},
 		
 		{
			x:100,
			y:100,
			id: 'doti',
			type:dataMobs.doti,
			ai: 'dormant',
 		},
 	],
 	
 	triggers: [
 		{
 			x: 8,
 			y: 4,
 			event: 'intro',
 		},
 		
 		{
 			x: 15,
 			y: 5,
 			event: 'noHellhound',
 		},
 		
 		{
 			x: 14,
 			y: 2,
 			event: 'puppy',
 		},
 		
 		{
 			x: 11,
 			y: 4,
 			event: 'rats',
 		},
 	],
 	
 	events: {
 		intro: function() {
 			view.displayDialogue("The hellhound that has plagued the locals lurks within this cave!",this.name,this.imgBust,"left");
 			this.location.event = undefined;
 			var mobIndex = 0;
 			if (mobs[0] === this) {
 				mobIndex = 1;
 			};
 			view.nextEvent('intro2',mobIndex);
 		},
 		
 		intro2: function(mobIndex) {
 			view.displayDialogue("I am skeptical of the wisdom of the two of us, mere youngsters looking to make our mark, trying to take down a hellhound.  Yet, my steadfast loyalty to you, my childhood friend, impels me to join you in this misadventure.",mobs[mobIndex].name,mobs[mobIndex].imgBust,"right");
 		},
 		
 		rats: function() {
 			view.displayDialogue("Ugh, I see rat droppings.  Is this cave filled with giant rats?  What is this, the first level of a fantasy RPG?",this.name,this.imgBust,"left");
 			this.location.event = undefined;
 			mobs[4].stats.move = 4;
 			mobs[4].move(map.hexes[167]);
 			mobs[3].stats.move = 4;
 			mobs[3].move(map.hexes[189]);
 			mobs[3].ai = ai.basic;
 			mobs[4].ai = ai.basic;
 		},
 		
 		noHellhound: function() {
 			view.displayDialogue("You know, it was probably those rats terrorizing the locals.  I bet there isn't even a hellhound in this cave at all!",this.name,this.imgBust,"left");
 			this.location.event = undefined;
 		},
 		
 		puppy: function() {
 			view.displayDialogue("Growl?  >snurfle<  Woof.","Terrifying Hellhound... Whelp",mobs[2].imgBust,"right");
 			this.location.event = undefined;
 			for (i in mobs) {
 				if (mobs[i] === this) {
 					mobIndex = i;
 				};
 			};
 			view.nextEvent('puppy2',mobIndex);
 		},
 		
 		puppy2: function(mobIndex) {
 			view.displayDialogue("Gasp!  Aren't you just the cutest little puppy?  Yes you are!  YES YOU ARE!!!<br />That's it, I'm taking you home!",mobs[mobIndex].name,mobs[mobIndex].imgBust,"left");
 			mobs[2].player = true;
 			heroes.push(mobs[2]);
 			view.nextEvent('puppyJoin');
  		},
 		
 		puppyJoin: function() {
 			view.displayDialogue("Hellpuppy has joined the party!",undefined,mobs[2].imgBust,"left");
 			map.hexes[96].event = hellhoundCave.events.home;
 		},
 		
 		home: function() {
 			if (this.id === "puppy") {
 				view.displayDialogue("Look at him go!",mobs[0].name,mobs[0].imgBust,"left");
 				view.nextEvent('home2');
 			};
 		},
 		
 		home2: function() {
 			var narratorBust = new Image();
 			narratorBust.src = 'img/narrator.jpg';
 			view.displayDialogue("The road back to Pileus is not long, but takes the remainder of the day.  By the time you reach the city that you call home, the sun is pregnant on the horizon and supper is at the forefront of your mind.  But the everyday sounds and bustle of the city at dinnertime is not what you encounter.  Instead, the city is alight with torches and full of shouting, cheering, shouting.  Something is happening… something big.","Narrator",narratorBust,"right")
			view.nextEvent('wall');
 		},
 		
 		wall: function() {
 			view.displayDialogue("What the what, now?  Hey, Doti's at the gatehouse.  She probably knows what's happening.<br />HEY DOTI WHAT'S HAPPENING?",mobs[1].name,mobs[1].imgBust,"left");
 			view.nextEvent('wall2');
 		},
 		
 		wall2: function() {
 			var doti = game.findMob('doti');
 			view.displayDialogue("The City Council has denounced the Ogre King and declared us independent!  It's madness inside.  Everyone fears the King will come crush us overnight, like some all-powerful god.  Pfft.  Civilians.","Doti",doti.imgBust,"right");
 			view.nextEvent('wall3');
 		},
 		
 		wall3: function() {
 			view.displayDialogue("But the King is going to come crush us, right?",mobs[1].name,mobs[1].imgBust,"left");
 			view.nextEvent('wall4');
 		},
 		
 		wall4: function() {
 			var doti = game.findMob('doti');
 			view.displayDialogue("He can try.  Since the war, his armies are crippled and scattered.  We have enough time to prepare.  We won't go down without a fight.<br />In fact, the Council is chartering companies of soldiers now.","Doti",doti.imgBust,"right");
 			view.nextEvent('wall5');
 		},
 		
 		wall5: function() {
 			view.displayDialogue("Oh my gods!  Do you know what this means?",mobs[0].name,mobs[0].imgBust,"left");
 			view.nextEvent('wall6');
 		},
 		
 		wall6: function() {
 			view.displayDialogue("That the city will be sacked, pillaged, and destroyed before I ever complete my training?",mobs[1].name,mobs[1].imgBust,"right");
 			view.nextEvent('wall7');
 		},
 		
 		wall7: function() {
 			view.displayDialogue("No!  I can finally realize my lifelong dream... of becoming a badass hero!  We can get one of those charters.  You and me.  We can form a company of fighters, we can defend the city, we can finally be somebody.  We'll be <em>awesome</em>.",mobs[0].name,mobs[0].imgBust,"left");
 			view.setupReturn();
 		},
 	},
 
 };