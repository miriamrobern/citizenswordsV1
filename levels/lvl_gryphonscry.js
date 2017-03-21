var gryphonscry = {
	
	name: "The Vault under Gryphonscry Mountain",
	description: "<p>When the war was at its direst, the Ogre King hid away his riches and treasures in secret vaults throughout the kingdom.</p><p>One of those vaults has been identified: a series of caverns beneath Gryphonscry Mountain. A cabal of loyalist Sovereign cultists are said to guard the cache, which is also worryingly close to a Deeps community.</p><p>Still, the prize is tempting. What treasures – lucrative or magical – might lurk down there?</p>",
 
 	sizeX: 22,
 	sizeY: 12,
 	
 	background: 'img/returnToPileus.png',
 	
 	startLocations: [
 		{x:1,y:1},
 		{x:0,y:2},
 		{x:2,y:1},
 		{x:2,y:2}
 	],
 	
 	walls: [
 		{x:3,y:2},
 	],
 		
 	pits: [
 		{x:3,y:1},
 	],
 	
 	mobs: [
 		{
			x:2,
			y:3,
			type:dataMobs.hellhound,
			id: "puppy",
			name: "Puppy",
			ai: 'dormant',
 		},
 	],
 	
 	triggers: [
 		{
 			x: 3,
 			y: 3,
 			event: 'intro',
 		},
 	],
 	
 	events: {
 		intro: function() {
 			view.displayDialogue("Somebody left this event lying here on the ground!",this.name,this.img,"left");
 			this.location.event = undefined;
 		},
 	},
 
 };