var handlers = {

	newGame: function() {
		handlers.randomCharacter();
		document.getElementById('characterCreationDiv').style.display = 'block';
		document.getElementById('introDiv').style.display = 'none';
	},
	
	resumeGame: function() {
	},
	
	saveGame: function() {
		var name = 'Citizen Swords';
		if (company.lastSaveName !== undefined) {name = company.lastSaveName;};
		var saveName = prompt("Overwrite current save or rename:",name);
		saveName = 'CitizenSwordsSave ' + saveName;
		localStorage[saveName] = JSON.stringify(game.flattenCompany());
	},
	
	loadGame: function(saveName) {
		var gameSave = JSON.parse(localStorage['CitizenSwordsSave ' + saveName]);
		game.unflattenCompany(gameSave,saveName);
		view.switchToHeadquartersMode();
	},
	
	deleteSave: function(saveName) {
		localStorage.removeItem('CitizenSwordsSave ' + saveName);
		view.refreshSaveLoad();
	},
	
	toggleOptions: function() {
		var optionsDiv = document.getElementById('optionsDiv');
		if (optionsDiv.style.display == 'none') {
			optionsDiv.style.display = 'block';
		} else {
			optionsDiv.style.display = 'none';
		}
	},
	
	updateDebug: function() {
		if (document.getElementById('debugToggle').value == 0) {
			document.getElementById('optionDebugOff').className = 'optionSelected';
			document.getElementById('optionDebugOn').className = 'optionDeselected';
			view.options.debug = false;
		} else {
			document.getElementById('optionDebugOff').className = 'optionDeselected';
			document.getElementById('optionDebugOn').className = 'optionSelected';
			view.options.debug = true;
		};
		view.displayMapGrid();
	},

	loadLevel: function(level) {
		
		console.log(level);
		
		view.clearLevel();
		view.switchToLevelMode();
	
		game.loadLevel(level);
		
		view.displayMap();
	},
	
	
	hexMouseOver: function(x,y,style) {
		view.mouseOverTile(x,y,style);
	},
	
	mobMouseOver: function(index) {
	},
	
	hexSelect: function(x,y) {
		for (i in map.hexes) {
			if (map.hexes[i].x === x && map.hexes[i].y === y) {
				selectedHex = map.hexes[i]
			};
		}
		if (this.mode === "move" && view.focus.range.indexOf(selectedHex) !== -1) {
			view.focus.mob.move(selectedHex);
			this.mode = undefined;
		} else if (this.mode === "target" && view.focus.range.indexOf(selectedHex) !== -1) {
			console.log('targeting',selectedHex);
			handlers.executeManeuver(view.focus.maneuver,selectedHex);
			view.focus.mob.refreshManeuvers();
			view.displayFocusMob();
		};
	},
	
	mobSelect: function(index) {
		var x = mobs[index].location.x;
		var y = mobs[index].location.y;
		for (i in map.hexes) {
			if (map.hexes[i].x === x && map.hexes[i].y === y) {
				selectedHex = map.hexes[i]
			};
		}
		
		if (this.mode == undefined && mobs[index].stats.move > 0) {
			this.mode = 'move';
			view.selectMob(mobs[index]);
		} else if (this.mode === 'move') {
			view.selectMob(mobs[index]);
		} else if (this.mode === 'target' && view.focus.range.indexOf(selectedHex) !== -1) {
			handlers.executeManeuver(view.focus.maneuver,mobs[index]);
			view.focus.mob.refreshManeuvers();
			view.displayFocusMob();
		} else {
			this.mode = undefined;
			view.selectMob(mobs[index]);
		};
	},
	
	endTurn: function() {
		handlers.mode = undefined;
		game.endTurn();
	},
	
	showDialogueDiv: function() {
		document.getElementById('dialogueBacksplash').style.display = 'block';
	},
	
	hideDialogueDiv: function() {
		document.getElementById('dialogueBacksplash').style.display = 'none';
	},
	
	selectManeuver: function(maneuver,button) {
		maneuver = dataManeuvers[maneuver];
		console.log(maneuver);
		if (this.mode === "target") {
			view.deselectAllManeuverButtons();
			view.drawHexRange(view.focus.range,'open');
			this.mode = undefined;
			view.focus.range = undefined;
		};
		if (view.focus.maneuver === maneuver) {
			button.className = 'focusMobManeuverButton';
			view.focus.maneuver = undefined;
		} else if (maneuver.target) {
			console.log('check');
			this.mode = 'target';
			view.focus.maneuver = maneuver;
			view.drawHexRange(view.focus.range,'open');
			button.className = 'focusMobManeuverButton focusMobManeuverButtonSelected';
			var targetableHexes = view.focus.mob.rangeOptions(undefined,maneuver);
			view.drawHexRange(targetableHexes,'targetable');
		} else {
			button.className = 'focusMobManeuverButton focusMobManeuverButtonSelected';
			handlers.executeManeuver(maneuver);
		};
		button.blur();
	},
	
	executeManeuver: function(maneuver,target) {

		this.mode = undefined;
		maneuver.execute(view.focus.mob,target);
		
		// Maneuver Cost
		for (i in maneuver.cost) {
			view.focus.mob.stats[i] -= maneuver.cost[i];
		};
		var timedEvent = setTimeout(view.displayFocusMob.bind(this,view.focus.mob),250);
		view.drawHexRange(view.focus.range,'open');
		view.focus.range = undefined;
		view.focus.maneuver = undefined;
	},
	
	returnHome: function() {
		game.archiveHeroes();
		handlers.hideDialogueDiv();
		view.switchToHeadquartersMode();
	},
	
	switchTab: function(tab) {
		document.getElementById('rumorsDiv').style.display = 'none';
		document.getElementById('rosterDiv').style.display = 'none';
		document.getElementById('provisioningDiv').style.display = 'none';
		document.getElementById('adventuresDiv').style.display = 'none';
		
		document.getElementById(tab).style.display = 'block';
		
	},
	
	displayHeroInRoster: function(index) {
		var hero = heroes[index];
		view.refreshRosterDescription();
		view.displayHeroInRoster(hero);
	},
	
	refreshRosterManeuverDescription: function(maneuver) {
		view.refreshRosterDescription('maneuver',maneuver);
	},
	
	// Moving Roster Items
	
	pickupItem: function(e) {
		if (e.srcElement.nodeName === "DIV") {
			var slot = e.srcElement.parentElement.id.slice(11);
			e.srcElement.parentElement.innerHTML = '<p class="rosterEquipEmpty">Empty</p>';
			slot = slot.substring(0,slot.length-3).toLowerCase();
			view.focus.item = view.focus.hero.equipment[slot];
			view.focus.hero.equipment[slot] = undefined;
			view.focus.hero.imgMob = draw.drawMob(view.focus.hero);
			view.focus.hero.imgPortrait = draw.drawMob(view.focus.hero);
			view.focus.hero.imgBust = draw.drawMob(view.focus.hero);
			view.focus.hero.refreshManeuvers();
		} else {
			var item = company.armory[e.srcElement.id.slice(10)];
			view.focus.item = item;
			company.armory.splice(company.armory.indexOf(item),1);
		};
		view.disableHighlight(e);
		
		if (view.focus.item.size === 2) {
			e.srcElement.className = 'HQItem rosterItem divBoatWide';
		} else {
			e.srcElement.className = 'HQItem rosterItem divBoat';
		};
		document.body.appendChild(e.srcElement);
		view.focus.divBoat = e.srcElement;
		
		var slot = view.focus.item.slot;
		for (i in slot) {
			var slotName = 'rosterEquip' + slot[i].charAt(0).toUpperCase() + slot[i].slice(1) + 'Div';
			document.getElementById(slotName).style.borderColor = 'red';
		}
		
		window.addEventListener('mousemove',handlers.moveItem,true);
		view.refreshRosterDescription('item');
	},
	
	moveItem: function(e) {
		view.disableHighlight(e);
		var divBoatX = e.clientX - 50;
		var divBoatY = e.clientY - 40;
		view.focus.divBoat.style.top = divBoatY + 'px';
		view.focus.divBoat.style.left = divBoatX + 'px';
	},
	
	dropItem: function(e) {
		window.removeEventListener('mousemove',handlers.moveItem,true);
		if (view.focus.divBoat !== undefined) {
			for (i in {rosterEquipArmorDiv:0,rosterEquipLeftDiv:0,rosterEquipRightDiv:0,rosterEquipItem0Div:0,rosterEquipItem1Div:0,rosterEquipItem2Div:0,}) {
				document.getElementById(i).style.borderColor = 'darkblue';
			};
		};
		if (view.focus.divBoat !== undefined && view.focus.slot !== undefined) {
			var slotCheck = false;
			var itemSlot = view.focus.item.slot;
			var slotName = view.focus.slot.id;
			for (i in itemSlot) {
				if (slotName.indexOf(itemSlot[i].slice(1)) !== -1) {
					slotCheck = true;
				};
			};
			view.refreshRoster();
		};
		if (view.focus.divBoat !== undefined && view.focus.slot !== undefined && slotCheck) {
			view.focus.divBoat.className = 'HQItem rosterItem';
			view.focus.slot.innerHTML = '';
			view.focus.slot.appendChild(view.focus.divBoat);
			
			var slot = view.focus.slot.id.slice(11);
			slot = slot.substring(0,slot.length-3).toLowerCase();
			
			view.focus.hero.equip(view.focus.item,slot);
			
			view.focus.divBoat = undefined;
			view.refreshRoster();
			
		} else if (view.focus.divBoat !== undefined) {
			view.focus.divBoat.className = 'HQItem rosterItem';
			document.getElementById('armoryList').appendChild(view.focus.divBoat);
			
			// add item to armory
			company.armory.push(view.focus.item);
			view.refreshArmory();
			
			view.focus.divBoat = undefined;
			view.refreshRosterDescription('clear');
			view.refreshRoster();
		};

	},
	
	refreshMarketDescription: function(type,itemIndex) {
		var item;
		if (type === 'wares') {
			item = view.focus.market.wares[itemIndex];
		} else {
			item = company.armory[itemIndex];
		};
		view.refreshMarketDescription(type,item);
	},
	
	buyItem: function(item,value) {
		game.buyItem(item,value);
		view.displayMarket();
		view.refreshArmory();
	},
	
	sellItem: function(item,value) {
		game.sellItem(item,value);
		view.displayMarket();
		view.refreshArmory();
	},
	
	// Character Creation
	updateFace: function(mob) {
		if (mob == undefined) {mob = p1};
		
		face = mob.faceData;
	
		var value;
		for (i in face) {
			value = document.getElementById( i + "Input" ).value;
			if (i.indexOf('olor') == -1) {
				value = parseInt(value);
			};
			face[i] = value;
		};

		face = mobDesign.updateColoring(face);
	
		var mobSVG = draw.drawMob(p1);
		view.updateFaceDiv(mobSVG);
	},
	
	randomCharacter: function() {
		view.setSliders();
		
		var newFace = mobDesign.randomizeFace();
		for (i in newFace) {
			document.getElementById( i + "Input" ).value = newFace[i]
		};
		p1.faceData = newFace;
		handlers.updateFace();
	},
	
	selectClass: function(className) {
		document.getElementById('classWork').style.borderStyle = 'outset';
		document.getElementById('classFight').style.borderStyle = 'outset';
		document.getElementById('classPray').style.borderStyle = 'outset';
		
		if (className === "work") {
			company.deeds.p1classWork = true;
			p1.equipment.armor = dataItems.roughspun;
			p1.equipment.left = dataItems.cargoHook;
			p1.skills.maneuvers = [dataManeuvers.exhort];
			p1.skills.passives = [dataPassives.ofThePeople];
			p1.stats.move = 4;
			p1.stats.strength = 3;
			p1.stats.focus = 3;
			p1.stats.armor = 2;
			document.getElementById('classWork').style.borderStyle = 'inset';
		} else if (className === "fight") {
			company.deeds.p1classFight = true;
			p1.equipment.armor = dataItems.scrapArmor;
			p1.equipment.left = dataItems.scrapShield;
			p1.skills.maneuvers = [dataManeuvers.exhort];
			p1.skills.passives = [];
			p1.stats.move = 3;
			p1.stats.strength = 4;
			p1.stats.focus = 3;
			p1.stats.armor = 4;
			document.getElementById('classFight').style.borderStyle = 'inset';
		} else if (className === "pray") {
			company.deeds.p1classPray = true;
			p1.equipment.armor = dataItems.initiatesRobes;
			p1.equipment.left = dataItems.initiatesSpellbook;
			p1.skills.maneuvers = [dataManeuvers.focusedStrength,dataManeuvers.exhort];
			p1.skills.passives = [];
			p1.stats.move = 3;
			p1.stats.strength = 3;
			p1.stats.focus = 4;
			p1.stats.armor = 3;
			document.getElementById('classPray').style.borderStyle = 'inset';
		};
		
		p1.stats.moveMax = p1.stats.move;
		p1.stats.strengthMax = p1.stats.strength;
		p1.stats.focusMax = p1.stats.focus;
		
		handlers.updateFace();
	},
	
	confirmCharacterCreation: function() {
		p1.imgMob = draw.drawMob(p1);
		p1.imgPortrait = draw.drawMob(p1);
		p1.imgBust = draw.drawMob(p1);
		p1.name = document.getElementById('nameInput').value;
		p1.pronouns = document.getElementById('pronounsInput').value;
		heroes[0] = p1;
		company.marks = 110 + p1.faceData.earDip * 5;
		handlers.loadLevel(hellhoundCave);
	},


};

window.addEventListener('mouseup',handlers.dropItem,false);

// dismissing dialogue pane
window.onclick = function(event) {
	var dialogueBacksplash = document.getElementById('dialogueBacksplash');
	if (event.target == dialogueBacksplash) {
		if (document.getElementById('dialogueCloseButton').offsetParent !== null) {
			document.getElementById('dialogueCloseButton').click();
		} else if (document.getElementById('dialogueContinueButton').offsetParent !== null) {
			document.getElementById('dialogueContinueButton').click();
		};
	};
};

// keybindings
document.addEventListener('keydown',function(event) {
	if (Number.isInteger(parseInt(event.key)) && view.focus.mob !== undefined) {
		if (view.focus.mob.player) {
			var num = event.key - 1;
			document.getElementById('focusMobManeuverButton'+num).click();
		}
	}
});
