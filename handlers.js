var handlers = {

	loadLevel: function(level) {
		
		view.clearLevel();
		view.switchToLevelMode();
	
		level = dataLevels[level];
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
		if (this.mode === "target") {
			view.deselectAllManeuverButtons();
			view.drawHexRange(view.focus.range,'open');
			this.mode = undefined;
			view.focus.range = undefined;
		};
		if (view.focus.maneuver === maneuver) {
			button.className = 'focusMobManeuverButton';
		} else if (maneuver.target) {
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
		view.displayHeroInRoster(hero);
	},
	
	// Moving Roster Items
	
	pickupItem: function(e) {
		if (e.srcElement.nodeName === "DIV") {
			var slot = e.srcElement.parentElement.id.slice(11);
			slot = slot.substring(0,slot.length-3).toLowerCase();
			view.focus.item = view.focus.hero.equipment[slot];
			view.focus.hero.equipment[slot] = undefined;
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
		var divBoatX = e.clientX + 5;
		var divBoatY = e.clientY + 5;
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
		};
		if (view.focus.divBoat !== undefined && view.focus.slot !== undefined && slotCheck) {
			view.focus.divBoat.className = 'HQItem rosterItem';
			view.focus.slot.innerHTML = '';
			view.focus.slot.appendChild(view.focus.divBoat);
			
			var slot = view.focus.slot.id.slice(11);
			slot = slot.substring(0,slot.length-3).toLowerCase();
			
			view.focus.hero.equip(view.focus.item,slot);
			
			view.focus.divBoat = undefined;
			
		} else if (view.focus.divBoat !== undefined) {
			view.focus.divBoat.className = 'HQItem rosterItem';
			document.getElementById('armoryList').appendChild(view.focus.divBoat);
			
			// add item to armory
			company.armory.push(view.focus.item);
			view.refreshArmory();
			
			view.focus.divBoat = undefined;
			view.refreshRosterDescription('clear');
		};
	},


};

window.addEventListener('mouseup',handlers.dropItem,false);

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

document.addEventListener('keydown',function(event) {
	if (Number.isInteger(parseInt(event.key)) && view.focus.mob !== undefined) {
		if (view.focus.mob.player) {
			var num = event.key - 1;
			document.getElementById('focusMobManeuverButton'+num).click();
		}
	}
});
