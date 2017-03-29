
var p1 = {
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
	},
	

	equipment: {
		armor: dataItems.roughspun,
		right: dataItems.mothersSword,
		left: undefined,
		item0: undefined,
		item1: undefined,
		item2: undefined,
	},
	
};

var handlers = {

	updateFace: function(mob) {
		if (mob == undefined) {mob = p1};
		
		face = mob.faceData;
	
		var value;
		for (i in face) {
			value = document.getElementById(i + "Input").value;
			if (i.indexOf('olor') == -1) {
				value = parseInt(value);
			};
			face[i] = value;
		};
	
		view.drawMob(p1);
	},
	
	updateColoring: function() {
		
		var skinRed = 255;
		var skinGreen = 237;
		var skinBlue = 220;
		
		// Black Eumelanin
		var blackEumelanin = 100 - document.getElementById('blackEumelaninInput').value;
		skinRed *= blackEumelanin / 100;
		skinGreen *= blackEumelanin / 100;
		skinBlue *= blackEumelanin / 100;
		
		// Brown Eumelanin
		var brownEumelanin = 100 - document.getElementById('brownEumelaninInput').value;
		skinBlue *= brownEumelanin / 100;

		// Pink Pheomelanin
		var pinkPheomelanin = 100 - document.getElementById('pinkPheomelaninInput').value;
		skinGreen *= pinkPheomelanin / 100;
		skinBlue *= pinkPheomelanin / 100;

		// Green Keratin
		var greenKeratin = document.getElementById('greenKeratinInput').value;
		var greenDiff = greenKeratin/100 * (255 - skinGreen)
		skinGreen += greenDiff;
		skinRed = Math.max(0,skinRed - greenDiff);
		skinBlue = Math.max(0,skinBlue - greenDiff);
		
// 		console.log('pigments',100-blackEumelanin,100-brownEumelanin,100-pinkPheomelanin);
// 		console.log('RGB',Math.round(skinRed),Math.round(skinGreen),Math.round(skinBlue));
		
		var skinColor = "#" + ("0" + Math.round(skinRed).toString(16)).substr(-2) + ("0" + Math.round(skinGreen).toString(16)).substr(-2) + ("0" + Math.round(skinBlue).toString(16)).substr(-2);
		document.getElementById('skinColorInput').value = skinColor;
		
		var noseShading = parseInt(document.getElementById('noseShadingInput').value);
		var targetShade = 255;
		if (noseShading < 0) {
			var noseRed = skinRed * (100 + noseShading)/100;
			var noseGreen = skinGreen * (100 + noseShading)/100;
			var noseBlue = skinBlue * (100 + noseShading)/100;
		} else {		
			var noseRed = skinRed + (255-skinRed)*noseShading/100;
			var noseGreen = skinGreen + (255-skinGreen)*noseShading/100;
			var noseBlue = skinBlue + (255-skinBlue)*noseShading/100;
		};
		var nosePinkness = parseInt(document.getElementById('nosePinknessInput').value);
		if (nosePinkness > 0) {
			noseGreen *= (100 - nosePinkness)/100;
			noseBlue *= (100 - nosePinkness)/100;
		};
		var noseColor= "#" + ("0" + Math.round(noseRed).toString(16)).substr(-2) + ("0" + Math.round(noseGreen).toString(16)).substr(-2) + ("0" + Math.round(noseBlue).toString(16)).substr(-2);
		document.getElementById('noseColorInput').value = noseColor;
		
		var lipShading = parseInt(document.getElementById('lipShadingInput').value);
		var targetShade = 255;
		if (lipShading < 0) {
			var lipRed = skinRed * (100 + lipShading)/100;
			var lipGreen = skinGreen * (100 + lipShading)/100;
			var lipBlue = skinBlue * (100 + lipShading)/100;
		} else {		
			var lipRed = skinRed + (255-skinRed)*lipShading/100;
			var lipGreen = skinGreen + (255-skinGreen)*lipShading/100;
			var lipBlue = skinBlue + (255-skinBlue)*lipShading/100;
		};
		var lipPinkness = parseInt(document.getElementById('lipPinknessInput').value);
		if (lipPinkness > 0) {
			lipGreen *= (100 - lipPinkness)/100;
			lipBlue *= (100 - lipPinkness)/100;
		};
		var lipColor= "#" + ("0" + Math.round(lipRed).toString(16)).substr(-2) + ("0" + Math.round(lipGreen).toString(16)).substr(-2) + ("0" + Math.round(lipBlue).toString(16)).substr(-2);
		document.getElementById('lipColorInput').value = lipColor;
		
		var earShading = parseInt(document.getElementById('earShadingInput').value);
		var targetShade = 255;
		if (earShading < 0) {
			var earRed = skinRed * (100 + earShading)/100;
			var earGreen = skinGreen * (100 + earShading)/100;
			var earBlue = skinBlue * (100 + earShading)/100;
		} else {		
			var earRed = skinRed + (255-skinRed)*earShading/100;
			var earGreen = skinGreen + (255-skinGreen)*earShading/100;
			var earBlue = skinBlue + (255-skinBlue)*earShading/100;
		};
		var earPinkness = parseInt(document.getElementById('earPinknessInput').value);
		if (earPinkness > 0) {
			earGreen *= (100 - earPinkness)/100;
			earBlue *= (100 - earPinkness)/100;
		};
		var earColor= "#" + ("0" + Math.round(earRed).toString(16)).substr(-2) + ("0" + Math.round(earGreen).toString(16)).substr(-2) + ("0" + Math.round(earBlue).toString(16)).substr(-2);
		document.getElementById('earColorInput').value = earColor;
		
		
		handlers.updateFace(p1);
	},
	
	randomizeFace: function() {
		for (i in p1.faceData) {
			var slider = document.getElementById(i+"Input");
			if (i.indexOf('olor') == -1) {
				slider.value = 1 + ( Math.random() * (parseInt(slider.max) - parseInt(slider.min)) << 0 ) + parseInt(slider.min);
			} else {
				var red = Math.random() * 255 << 0;
				var green = Math.random() * 255  << 0;
				var blue = Math.random() * 255 << 0;
				slider.value = "#" + ("0" + red.toString(16)).substr(-2) + ("0" + green.toString(16)).substr(-2) + ("0" + blue.toString(16)).substr(-2);
			};
		};
		var coloringSliders = {
			blackEumelaninInput:0,
			brownEumelaninInput:0,
			pinkPheomelaninInput:0,
			greenKeratinInput:0,
			noseShadingInput:0,
			nosePinknessInput:0,
			lipShadingInput:0,
			lipPinknessInput:0,
			earShadingInput:0,
			earPinknessInput:0,
			};
		for (i in coloringSliders) {
			slider = document.getElementById(i);
			slider.value = ( Math.random() * (parseInt(slider.max) - parseInt(slider.min)) << 0 ) + parseInt(slider.min);
		};
		handlers.updateColoring();
		handlers.updateFace(p1);
	},
	
	matchToSkinColor: function(input) {
		document.getElementById(input).value = document.getElementById('skinColorInput').value;
		handlers.updateFace();
	},
	
	typicalFeatures: function() {
	},
	
	selectClass: function(className) {
		document.getElementById('classWork').style.borderStyle = 'outset';
		document.getElementById('classFight').style.borderStyle = 'outset';
		document.getElementById('classPray').style.borderStyle = 'outset';
		
		if (className === "work") {
			p1.equipment.armor = dataItems.roughspun;
			p1.equipment.left = undefined;
			document.getElementById('classWork').style.borderStyle = 'inset';
		} else if (className === "fight") {
			p1.equipment.armor = dataItems.scrapArmor;
			p1.equipment.left = dataItems.scrapShield;
			document.getElementById('classFight').style.borderStyle = 'inset';
		} else if (className === "pray") {
			p1.equipment.armor = dataItems.initiatesRobes;
			p1.equipment.left = dataItems.initiatesSpellbook;
			document.getElementById('classPray').style.borderStyle = 'inset';
		};
		
		view.drawMob(p1);
	},
};

var view = {

	drawMob: function(mob) {

		var face = mob.faceData;
		var eyeline = 33;
		var neck = 90;
		var muzzle = false;
		var noseStroke = false;

		var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		svg.setAttribute('viewBox','0 0 200 200');
	
		var faceDiv = document.getElementById('faceDiv')
		faceDiv.innerHTML = '';
		faceDiv.appendChild(svg);
		
		// Shadow
		var shadow = document.createElementNS('http://www.w3.org/2000/svg',"ellipse");
			shadow.setAttribute("fill",'#000000');
			shadow.setAttribute("opacity",0.2);
			shadow.setAttribute("cx",100);
			shadow.setAttribute("cy",95 + neck);
			shadow.setAttribute("rx",face.shoulders * 1.3);
			shadow.setAttribute("ry",13);
		svg.appendChild(shadow);
		
		// Hair in Back
		if (face.hairLength > 0) {
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			var templeClearance = face.templePosition / -30 + 7 / 6;

			// start 
			var x = 100;
			var y = 20;
			var path = 'm '+x+','+y;
			
			// to above temple	
			var stepX = (25 + face.templeWidth) / face.hairCurl;
			var stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = templeClearance * ( 0.03 * Math.pow((stepX * (i+1)),2) - 0.03 * Math.pow((stepX * (i)),2) ) + (i % 3) - 1;
				c1x = 25 / face.hairCurl;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to bottom left
			stepX = 0.2 * face.hairLength / (face.hairCurl * 3);
			stepY = (face.hairLength + eyeline) / (face.hairCurl * 3);
			for (i=0;i<face.hairCurl*3;i++) {
				x = stepX + (i % 3) - 1;
				y = stepY;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to center bottom
			stepX = (-25 - face.templeWidth - 0.2 * face.hairLength) / face.hairCurl;
			stepY = 0 / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			if (face.hairCurl % 3 === 1) {
				path += ' v2';
			} else if (face.hairCurl % 3 === 0) {
				path += ' v-1';
			};
			
			// to bottom right
			stepX = (-25 - face.templeWidth - 0.2 * face.hairLength) / face.hairCurl;
			stepY = 0 / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to above right temple
			stepX = 0.2 * face.hairLength / (face.hairCurl * 3);
			stepY = (face.hairLength + eyeline) / (face.hairCurl * -3);
			for (i=0;i<face.hairCurl*3;i++) {
				x = stepX + ((i+2) % 3) - 1;
				y = stepY;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}

			// to center top
			stepX = (25 + face.templeWidth) / face.hairCurl;
			stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y =  -1 * templeClearance * ( 0.03 * Math.pow((stepX * (face.hairCurl - i)),2) - 0.03 * Math.pow((stepX * (face.hairCurl - i-1)),2) ) + ((i+1) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x - 25/face.hairCurl;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
		
			path += 'z';
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
		};
		
		// Body
		var bodyGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		bodyGroup.id = 'bodyGroup';
		bodyGroup.setAttribute("fill",face.skinColor);
		svg.appendChild(bodyGroup);
		
		// Arms
		
		var rightArmGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		rightArmGroup.id = 'rightArmGroup';
		bodyGroup.appendChild(rightArmGroup);
		
		var leftArmGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		leftArmGroup.id = 'leftArmGroup';
		bodyGroup.appendChild(leftArmGroup);
		
		var armWidth = 10;
		var upperArmLength = 30;
		
		rightUpperArmPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightUpperArmPath.id = 'rightArm';
		rightUpperArmPath.setAttribute("fill",face.skinColor);
		rightUpperArmPath.setAttribute("stroke","#000000");
		rightUpperArmPath.setAttribute("stroke-width","1");
		rightUpperArmPath.setAttribute("stroke-linecap","round");
		
		leftUpperArmPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftUpperArmPath.id = 'leftArm';
		leftUpperArmPath.setAttribute("fill",face.skinColor);
		leftUpperArmPath.setAttribute("stroke","#000000");
		leftUpperArmPath.setAttribute("stroke-width","1");
		leftUpperArmPath.setAttribute("stroke-linecap","round");

		// start 
		x = 100 - face.shoulders + armWidth * 0.5;
		y = neck + 5;
		var pivotPoint = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			pivotPoint.id = 'rightShoulderPivot';
			pivotPoint.setAttribute("fill","none");
			pivotPoint.setAttribute("stroke",'none');
			pivotPoint.setAttribute("cx",x);
			pivotPoint.setAttribute("cy",y + armWidth * 0.5);
			pivotPoint.setAttribute("r",0);
			rightArmGroup.appendChild(pivotPoint);
		path = 'm '+x+','+y;
		rightArmGroup.setAttributeNS(null,'transform','translate(0) rotate(30 '+pivotPoint.cx.animVal.value+' '+pivotPoint.cy.animVal.value+')');
		
		x = 100 + face.shoulders - armWidth * 0.5;
		pivotPoint = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			pivotPoint.id = 'leftShoulderPivot';
			pivotPoint.setAttribute("fill","none");
			pivotPoint.setAttribute("stroke",'none');
			pivotPoint.setAttribute("cx",x);
			pivotPoint.setAttribute("cy",y + armWidth * 0.5);
			pivotPoint.setAttribute("r",0);
			rightArmGroup.appendChild(pivotPoint);
		otherPath = 'm '+x+','+y;
		leftArmGroup.setAttributeNS(null,'transform','translate(0) rotate(-30 '+pivotPoint.cx.animVal.value+' '+pivotPoint.cy.animVal.value+')');

		// to outside shoulder
		x = -0.5 * armWidth;
		y = 0.5 * armWidth;
		c1x = -0.3 * armWidth;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside elbow
		x = 0;
		y = upperArmLength;
		c1x = -5;
		c1y = 10;
		c2x = x+2;
		c2y = y-10;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to elbow end
		x = armWidth * 0.5;
		y = armWidth * 0.5;
		c1x = 0;
		c1y = armWidth * 0.2;
		c2x = x - armWidth * 0.2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside elbow
		x = armWidth * 0.5;
		y = armWidth * -0.5;
		c1x = armWidth * 0.2;
		c1y = 0;
		c2x = x;
		c2y = y + armWidth * 0.2;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside shoulder
		x = 0;
		y = -1 * upperArmLength;
		c1x = 0 - armWidth * 0.2;
		c1y = 0 - armWidth * 0.7;
		c2x = x + armWidth * 0.2;
		c2y = y + armWidth * 0.5;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top of shoulder
		x = -0.5 * armWidth;
		y = -0.5 * armWidth;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += ' z';
		rightUpperArmPath.setAttributeNS(null,"d",path);
		rightArmGroup.appendChild(rightUpperArmPath);
	
		otherPath += ' z';
		leftUpperArmPath.setAttributeNS(null,"d",otherPath);
		leftArmGroup.appendChild(leftUpperArmPath);
		
		// Forearms
		var rightForearmGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		rightForearmGroup.id = 'rightForearmGroup';
		rightArmGroup.appendChild(rightForearmGroup);
		
		var leftForearmGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		leftForearmGroup.id = 'leftForearmGroup';
		leftArmGroup.appendChild(leftForearmGroup);
		
		var rightLowerArmPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightLowerArmPath.id = 'rightForearm';
		rightLowerArmPath.setAttribute("fill",face.skinColor);
		rightLowerArmPath.setAttribute("stroke","#000000");
		rightLowerArmPath.setAttribute("stroke-width","1");
		rightLowerArmPath.setAttribute("stroke-linecap","round");
		
		var leftLowerArmPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftLowerArmPath.id = 'leftForearm';
		leftLowerArmPath.setAttribute("fill",face.skinColor);
		leftLowerArmPath.setAttribute("stroke","#000000");
		leftLowerArmPath.setAttribute("stroke-width","1");
		leftLowerArmPath.setAttribute("stroke-linecap","round");

		// start 
		x = 100 + armWidth * 0.5 - face.shoulders ;
		y = neck + 5 + upperArmLength;
		pivotPoint = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			pivotPoint.id = 'rightElbowPivot';
			pivotPoint.setAttribute("fill","none");
			pivotPoint.setAttribute("stroke",'none');
			pivotPoint.setAttribute("cx",x);
			pivotPoint.setAttribute("cy",y + armWidth * 0.5);
			pivotPoint.setAttribute("r",0);
			rightArmGroup.appendChild(pivotPoint);
		rightForearmGroup.setAttributeNS(null,'transform','rotate(-50 '+pivotPoint.cx.animVal.value+' '+pivotPoint.cy.animVal.value+')');
		pivotPoint = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			pivotPoint.id = 'rightWristPivot';
			pivotPoint.setAttribute("fill","none");
			pivotPoint.setAttribute("stroke",'none');
			pivotPoint.setAttribute("cx",x);
			pivotPoint.setAttribute("cy",y + armWidth * 0.5 + 20);
			pivotPoint.setAttribute("r",0);
			rightForearmGroup.appendChild(pivotPoint);
			var rightWristPivot = pivotPoint;
		path = 'm '+x+','+y;
		
		x = 100 - armWidth * 0.5 + face.shoulders ;
		pivotPoint = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			pivotPoint.id = 'leftElbowPivot';
			pivotPoint.setAttribute("fill","none");
			pivotPoint.setAttribute("stroke",'none');
			pivotPoint.setAttribute("cx",x);
			pivotPoint.setAttribute("cy",y + armWidth * 0.5);
			pivotPoint.setAttribute("r",0);
			rightArmGroup.appendChild(pivotPoint);
		leftForearmGroup.setAttributeNS(null,'transform','rotate(50 '+pivotPoint.cx.animVal.value+' '+pivotPoint.cy.animVal.value+')');
		pivotPoint = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			pivotPoint.id = 'leftWristPivot';
			pivotPoint.setAttribute("fill","none");
			pivotPoint.setAttribute("stroke",'none');
			pivotPoint.setAttribute("cx",x);
			pivotPoint.setAttribute("cy",y + armWidth * 0.5 + 20);
			pivotPoint.setAttribute("r",0);
			leftForearmGroup.appendChild(pivotPoint);
			var leftWristPivot = pivotPoint;
		otherPath = 'm '+x+','+y;

		// to outside elbow
		x = -0.5 * armWidth;
		y = 0.5 * armWidth;
		c1x = -0.3 * armWidth;
		c1y = -0.2 * armWidth;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside wrist
		x = 0.2 * armWidth;
		y = 20;
		c1x = -0.2 * armWidth;
		c1y = 0.5 * armWidth;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to wrist end
		x = armWidth * 0.3;
		y = armWidth * 0.5;
		c1x = 0;
		c1y = 0;
		c2x = x - 0.2 * armWidth;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside wrist
		x = armWidth * 0.3;
		y = armWidth * -0.5;
		c1x = 0.2 * armWidth;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside elbow
		x = armWidth * 0.2;
		y = -20;
		c1x = 0;
		c1y = 0;
		c2x = x + 0.2 * armWidth;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		rightLowerArmPath.setAttributeNS(null,"d",path);
		rightForearmGroup.appendChild(rightLowerArmPath);
	
		leftLowerArmPath.setAttributeNS(null,"d",otherPath);
		leftForearmGroup.appendChild(leftLowerArmPath);
				
		// Legs
		var rightLegPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightLegPath.id = 'rightLeg';
		rightLegPath.setAttribute("fill",face.skinColor);
		rightLegPath.setAttribute("stroke","#000000");
		rightLegPath.setAttribute("stroke-width","1");
		rightLegPath.setAttribute("stroke-linecap","round");
		
		var leftLegPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftLegPath.id = 'leftLeg';
		leftLegPath.setAttribute("fill",face.skinColor);
		leftLegPath.setAttribute("stroke","#000000");
		leftLegPath.setAttribute("stroke-width","1");
		leftLegPath.setAttribute("stroke-linecap","round");

		// start at crotch (behind body)
		x = 100 ;
		y = neck + 60;
		path = 'm '+x+','+y;
		otherPath = 'm '+x+','+y;

		// to inside right knee
		x = -15;
		y = 17;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right heel
		x = 5;
		y = 18;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside of right tread
		x = -4;
		y = 3;
		c1x = 0;
		c1y = 0;
		c2x = x + 2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside right foot bottom
		x = -15;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top right foot
		x = 10;
		y = -8;
		c1x = 0;
		c1y = -10;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside right knee
		x = -5;
		y = -14;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y+2;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top of right leg
		x = 15;
		y = -20;
		c1x = 0;
		c1y = -4;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		rightLegPath.setAttributeNS(null,"d",path);
		bodyGroup.appendChild(rightLegPath);
	
		leftLegPath.setAttributeNS(null,"d",otherPath);
		bodyGroup.appendChild(leftLegPath);
		
		// Torso
		
		var torsoPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		torsoPath.id = 'torso';
		torsoPath.setAttribute("fill",'inherit');
		torsoPath.setAttribute("stroke","#000000");
		torsoPath.setAttribute("stroke-width","1");
		torsoPath.setAttribute("stroke-linecap","round");

		// start 
		x = 100;
		y = neck;
		path = 'm '+x+','+y;

		// to right shoulder
		x = 0 - face.shoulders;
		y = 10;
		c1x = -1 * face.shoulders;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right rib
		x = face.shoulders * 0.2;
		y = 20;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right belly
		x = face.shoulders * 0.8 - face.belly;
		y = 10;
		c1x = 0;
		c1y = 3;
		c2x = x;
		c2y = y-3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right hip
		x = face.belly - face.hips;
		y = 15;
		c1x = 0;
		c1y = face.belly / 3;
		c2x = x;
		c2y = y-1;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to butt
		x = face.hips;
		y = 10;
		c1x = 0;
		c1y = 3;
		c2x = x - face.hips;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left hip
		x = face.hips;
		y = -10;
		c1x = face.hips;
		c1y = 0;
		c2x = x;
		c2y = y+3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left belly
		x = face.belly - face.hips;
		y = -15;
		c1x = 0;
		c1y = -3;
		c2x = x;
		c2y = y+3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left rib
		x = face.shoulders * 0.8 - face.belly;
		y = -10;
		c1x = 0;
		c1y = -3;
		c2x = x;
		c2y = y+3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left shoulder
		x = face.shoulders - face.shoulders * 0.8;
		y = -20;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// back to start (behind head)
		x = 0 - face.shoulders;
		y = -10;
		c1x = 0;
		c1y = 0;
		c2x = x + face.shoulders;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += 'z';
		torsoPath.setAttributeNS(null,"d",path);
		bodyGroup.appendChild(torsoPath);
		
		// Bust
		var rightBreastPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightBreastPath.id = 'rightBreast';
		var leftBreastPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftBreastPath.id = 'leftBreast';
		if (face.bust > 10) {
			
			rightBreastPath.setAttribute("fill",'inherit');
			rightBreastPath.setAttribute("stroke","#000000");
			rightBreastPath.setAttribute("stroke-width","1");
			rightBreastPath.setAttribute("stroke-linecap","round");
		
			leftBreastPath.setAttribute("fill",'inherit');
			leftBreastPath.setAttribute("stroke","#000000");
			leftBreastPath.setAttribute("stroke-width","1");
			leftBreastPath.setAttribute("stroke-linecap","round");

			var startX = Math.max(face.bust * 0.5 , face.shoulders * 0.7);

			// start 
			x = 100 - startX;
			y = neck + 10;
			path = 'm '+x+','+y;
		
			x = 100 + startX;
			otherPath = 'm '+x+','+y;

			// to outside of bust (if necessary)
			if (startX-face.bust < 0) {
				x = startX - face.bust;
				y = face.bust * 0.4;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y - face.bust * 0.2;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				x *= -1;
				c1x *= -1;
				c2x *= -1;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			} else {
				x = 100 - (face.bust + face.shoulders * 0.7)/2;
				y = neck + face.shoulders * 0.55;
				path = 'm '+x+','+y;
				x = 100 + (face.bust + face.shoulders * 0.7)/2;
				otherPath = 'm '+x+','+y;
			};

			// to bottom of bust
			x = face.bust * 0.5;
			y = face.bust * 0.5;
			c1x = 0;
			c1y = face.bust * 0.3;
			c2x = x - face.bust * 0.33;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to inside of bust
			x = face.bust * 0.5;
			y = 0 - face.bust * 0.5;
			c1x = face.bust * 0.33;
			c1y = 0;
			c2x = x;
			c2y = y + face.bust * 0.3;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			rightBreastPath.setAttributeNS(null,"d",path);
			bodyGroup.appendChild(rightBreastPath);
		
			leftBreastPath.setAttributeNS(null,"d",otherPath);
			bodyGroup.appendChild(leftBreastPath);
		};
		
		var clothingGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		clothingGroup.id = 'clothingGroup';
		bodyGroup.appendChild(clothingGroup);
		
		// At End of Body Section, Add Shading Group
		var bodyShadingGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		bodyShadingGroup.id = 'bodyShadingGroup';
		bodyGroup.appendChild(bodyShadingGroup);
			
		// Ear Backs
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.earColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		var otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill",face.earColor);
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start 
		x = 80;
		y = 25 + eyeline;
		path = 'm '+x+','+y;
		
		x = 120;
		var otherPath = 'm '+x+','+y;

		// to tip of ear
		x = 0 - face.earSize;
		y = face.earDip;
		c1x = 0 - face.earSize;
		c1y = 0 - face.earSize;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside of ear
		x = face.earSize * face.earWidth / -100;
		y = 0 - face.earDip;
		c1x = 0;
		c1y = 0;
		c2x = x - face.earTilt;
		c2y = y-face.earSize/3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to lobe of ear
		x = (face.earSize - face.earSize * face.earWidth / -100) / 2;
		y = face.earLobe;
		c1x = face.earTilt;
		c1y = face.earSize/3;
		c2x = x-face.earLobe/3;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to base of ear
		x = (face.earSize - face.earSize * face.earWidth / -100) / 2;
		y = 0 - face.earLobe;
		c1x = face.earLobe/3;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += 'z';
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);
	
		otherPath += 'z';
		otherNewPath.setAttributeNS(null,"d",otherPath);
		svg.appendChild(otherNewPath);
	
		// Ear Tops
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.skinColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		var otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill",face.skinColor);
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start 
		x = 80;
		y = 25 + eyeline;
		path = 'm '+x+','+y;
		
		x = 120;
		var otherPath = 'm '+x+','+y;

		// to tip of ear
		x = 0 - face.earSize;
		y = face.earDip;
		c1x = 0 - face.earSize;
		c1y = 0 - face.earSize;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// back to skull
		x = face.earSize - 5;
		y = 0 - face.earDip + 5;
		c1x = 0;
		c1y = 0;
		c2x = x - face.earSize;
		c2y = y - face.earSize;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += 'z';
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);
	
		otherPath += 'z';
		otherNewPath.setAttributeNS(null,"d",otherPath);
		svg.appendChild(otherNewPath);
	
		// Head Shape
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.skinColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");

		x = 75;
		y = 25 + eyeline;

		var path = 'm '+x+','+y;

		// to right temple
		x = face.templeWidth * -1;
		y = face.templePosition * -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y+face.templeHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		//to crown
		x = 25+face.templeWidth;
		y = -1 * (33-face.templePosition);
		c1x = 0;
		c1y = -1 * face.templeHeight;
		c2x = x-20;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left temple
		x = 25+face.templeWidth;
		y = 33-face.templePosition;
		c1x = 20;
		c1y = 0;
		c2x = x;
		c2y = y-face.templeHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left eyesocket
		x = -1 * face.templeWidth;
		y = face.templePosition;
		c1x = 0;
		c1y = face.templeHeight;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left cheekbone
		x = face.cheekboneWidth;
		y = face.cheekbonePosition;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y-face.cheekboneHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to chin
		x = -1 * (25 + face.cheekboneWidth);
		y = face.chinHeight-face.cheekbonePosition;
		c1x = 0;
		c1y = face.cheekboneHeight;
		c2x = x+face.chinWidth;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right cheekbone
		x = -1 * (25 + face.cheekboneWidth);
		y = -1 * (face.chinHeight-face.cheekbonePosition);
		c1x = -1 * face.chinWidth;
		c1y = 0;
		c2x = x;
		c2y = y+face.cheekboneHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right eyesocket
		x = face.cheekboneWidth;
		y = -1 * face.cheekbonePosition;
		c1x = 0;
		c1y = -1 * face.cheekboneHeight;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += 'z';
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);
		
		// Top-of-Head Hair
		if (face.hairLength > 0) {
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke","none");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute('fill','none');
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start 
			var x = 100;
			var y = 21;
			var path = 'm '+x+','+y;
			
			var totalY = y;
			
			// to right temple
			var stepX = (25 + face.templeWidth) / face.hairCurl;
			var stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = templeClearance * ( 0.03 * Math.pow((stepX * (i+1)),2) - 0.03 * Math.pow((stepX * (i)),2) ) + (i % 3) - 1;
				c1x = 25 / face.hairCurl;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				totalY += y;
			}
			
			x = 100 + 25 + face.templeWidth;
			y = totalY;
			otherPath = 'm '+x+','+y;
						
			// to center bottom of bangs
			stepX = (-25 - face.templeWidth) / face.hairCurl;
			stepY = -1 * (totalY - 25) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			if (face.hairCurl % 3 === 1) {
				path += ' v2';
				otherPath += ' v2';
			} else if (face.hairCurl % 3 === 0) {
				path += ' v-1';
				otherPath += ' v-1';
			};
			
			// to left bottom of bangs
			stepX = (-25 - face.templeWidth) / face.hairCurl;
			stepY = (totalY - 25) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}

			stepX = (25 + face.templeWidth) / face.hairCurl;
			stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y =  -1 * templeClearance * ( 0.03 * Math.pow((stepX * (face.hairCurl - i)),2) - 0.03 * Math.pow((stepX * (face.hairCurl - i-1)),2) ) + ((i+1) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x - 25/face.hairCurl;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
		
			path += 'z';
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
		
			otherNewPath.setAttributeNS(null,"d",otherPath);
			svg.appendChild(otherNewPath);
		};
		
		// Top Hair
		if (face.topHairHeight > 0 && face.hairBangsLength < 1) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute('fill',face.hairColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
		
			// Start at Right Side
			x = 100 - face.topHairBase;
			y = 35;
			path = 'm '+x+','+y;
						
			// to top right
			stepX = (face.topHairBase - face.topHairWidth) / face.hairCurl;
			stepY = ( -10 - face.topHairHeight ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
						
			// to middle
			stepX = face.topHairWidth / face.hairCurl;
			stepY = ( 0 ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
						
			// to top left
			stepX = face.topHairWidth / face.hairCurl;
			stepY = ( 0 ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
						
			// to bottom left
			stepX = ( face.topHairBase - face.topHairWidth ) / face.hairCurl;
			stepY = ( 10 + face.topHairHeight ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
						
			// to bottom middle
			stepX = ( face.topHairBase * -1 ) / face.hairCurl;
			stepY = ( 0 ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			if (face.hairCurl % 3 === 1) {
				path += ' v2';
			} else if (face.hairCurl % 3 === 0) {
				path += ' v-1';
			};
						
			// back to bottom right
			stepX = ( face.topHairBase * -1 ) / face.hairCurl;
			stepY = ( 0 ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
		
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
		};
		
		
		// Horns
		if (face.horns > 0) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.skinColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",face.skinColor);
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start above top of horn
			x = 85;
			y = 37 - face.templePosition * 0.5;
			path = 'm '+x+','+y;
			
			x = 115;
			otherPath = 'm '+x+','+y;

			// out beyond horn base
			x = -8;
			y = 4 + 0.5 * face.horns;
			c1x = -8;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to below horn base
			x = 8;
			y = 4 + 0.5 * face.horns;
			c1x = 0;
			c1y = 0;
			c2x = x-8;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
		
			otherNewPath.setAttributeNS(null,"d",otherPath);
			svg.appendChild(otherNewPath);
			
			
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",'#eeeebb');
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",'#eeeebb');
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start at top
			x = 80;
			y = 40 - face.templePosition * 0.5;
			path = 'm '+x+','+y;
			
			x = 120;
			otherPath = 'm '+x+','+y;

			// to tip
			x = -5 * face.horns;
			y = -2 * face.horns;
			c1x = 0 - face.horns;
			c1y = 0;
			c2x = x + 0.25 * face.horns * face.horns;
			c2y = y - face.horns;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to base
			x = 5 * face.horns;
			y = 2.5 * face.horns + 5;
			c1x = 0.25 * face.horns * face.horns;
			c1y = 0;
			c2x = x - face.horns;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// back to top base
			x = 0;
			y = -0.5 * face.horns - 5;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			path += 'z';
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
		
			otherPath += 'z';
			otherNewPath.setAttributeNS(null,"d",otherPath);
			svg.appendChild(otherNewPath);
		};

		

		// Eyes
		for (i in [0,1]) {
			if (i == 1) {cx = 100-face.eyeDistance} else {cx = 100+face.eyeDistance};
			cy = 25 + eyeline;
			
			// Eyeball
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.id = 'eyeball'+i;
			newPath.setAttribute("fill","#FFFFFF");
			newPath.setAttribute("stroke",'none');
			newPath.setAttribute("stroke-width","2");
			newPath.setAttribute("cx",cx);
			newPath.setAttribute("cy",eyeline+25);
			newPath.setAttribute("r",face.eyeSize);
			svg.appendChild(newPath);
			
			// Iris
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.setAttribute("fill",face.eyeColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","0.25");
			newPath.setAttribute("cx",cx);
			newPath.setAttribute("cy",eyeline+25);
			newPath.setAttribute("r",3.5);
			svg.appendChild(newPath);
			
			// Pupil
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.setAttribute("fill","#000000");
			newPath.setAttribute("stroke","none");
			newPath.setAttribute("stroke-width","3");
			newPath.setAttribute("cx",cx);
			newPath.setAttribute("cy",eyeline+25);
			newPath.setAttribute("r",1.75);
			svg.appendChild(newPath);
			
			// Specular Highlight
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.setAttribute("fill","#FFFFFF");
			newPath.setAttribute("stroke","none");
			newPath.setAttribute("stroke-width","3");
			newPath.setAttribute("cx",cx+2.5);
			newPath.setAttribute("cy",eyeline+23);
			newPath.setAttribute("r",1.5);
			svg.appendChild(newPath);
			
			// Specular Highlight
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.setAttribute("fill","#FFFFFF");
			newPath.setAttribute("stroke","none");
			newPath.setAttribute("stroke-width","3");
			newPath.setAttribute("cx",cx+1);
			newPath.setAttribute("cy",eyeline+24);
			newPath.setAttribute("r",0.75);
			svg.appendChild(newPath);
			
			// Upper Eyelid
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.skinColor);
			newPath.setAttribute("stroke",'none');
			newPath.setAttribute("stroke-width","3");

			var otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",'none');
			otherNewPath.setAttribute("stroke",'#000000');
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");
			
			x = cx;
			y = cy - face.eyeSize - 1;
			path = 'm '+x+','+y;
			
			var strokePath = '';
			if (face.eyeDistance + face.eyeSize > 25 && i == 1) {
				strokePath = 'm '+x+','+y;
			}
			
			x = -1 * face.eyeSize;
			y = face.eyeSize;
			c1x = -0.8 * face.eyeSize;
			c1y = 0;
			c2x = -0.8 * face.eyeSize;
			c2y = 0;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			var sX = cx - face.eyeSize;
			var sY = cy - 1;
			if (face.eyeDistance + face.eyeSize > 25 && i == 1) {
				strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			} else {
				strokePath = 'm '+sX+','+sY
			}
			
			if (i == 0) {
				c1y = -1 * face.insideEyelidCurve * face.eyeSize/10;
				c2y = -1 * face.outsideEyelidCurve * face.eyeSize/10;
			} else {
				c1y = -1 * face.outsideEyelidCurve * face.eyeSize/10;
				c2y = -1 * face.insideEyelidCurve * face.eyeSize/10;
			};
			x = face.eyeSize * 2;
			y = 0;
			c1x = 0.5 * face.eyeSize;
			c2x = 1.5 * face.eyeSize;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			x = -1 * face.eyeSize;
			y = -1 * face.eyeSize;
			c1x = 0;
			c1y = -0.8 * face.eyeSize;
			c2x = 0;
			c2y = -0.8 * face.eyeSize;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			if (face.eyeDistance + face.eyeSize > 25 && i == 0) {
				strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
			
			otherNewPath.setAttributeNS(null,'d',strokePath);
			svg.appendChild(otherNewPath);
			
			// Lower Eyelid
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.skinColor);
			newPath.setAttribute("stroke",'none');
			newPath.setAttribute("stroke-width","3");

			var otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",'none');
			otherNewPath.setAttribute("stroke",'#000000');
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");
			
			x = cx;
			y = 25 + eyeline + face.eyeSize + 1;
			path = 'm '+x+','+y;
			
			var strokePath = '';
			if (face.eyeDistance + face.eyeSize > 25 && i == 1) {
				strokePath = 'm '+x+','+y;
			}
			
			x = -1 * face.eyeSize;
			y = -1 * face.eyeSize;
			c1x = -0.8 * face.eyeSize;
			c1y = 0;
			c2x = -0.8 * face.eyeSize;
			c2y = 0;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			var sX = cx - face.eyeSize;
			var sY = 25 + eyeline + 1;
			if (face.eyeDistance + face.eyeSize > 25 && i == 1) {
				strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			} else {
				strokePath = 'm '+sX+','+sY
			}
			
			if (i == 0) {
				c1y = face.lowerEyelidCurve * face.eyeSize/10;
				c2y = face.lowerEyelidCurve * face.eyeSize/10;
			} else {
				c1y = face.lowerEyelidCurve * face.eyeSize/10;
				c2y = face.lowerEyelidCurve * face.eyeSize/10;
			};
			x = face.eyeSize * 2;
			y = 0;
			c1x = 0.5 * face.eyeSize;
			c2x = 1.5 * face.eyeSize;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			x = -1 * face.eyeSize;
			y = face.eyeSize;
			c1x = 0;
			c1y = 0.8 * face.eyeSize;
			c2x = 0;
			c2y = 0.8 * face.eyeSize;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			if (face.eyeDistance + face.eyeSize > 25 && i == 0) {
				strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
			
			otherNewPath.setAttributeNS(null,'d',strokePath);
			svg.appendChild(otherNewPath);
			
			// Eyebrows
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke",'#000000');
			newPath.setAttribute("stroke-width","1");
			
			var tilt = face.leftBrowTilt;
			if (i == 1) {tilt = face.rightBrowTilt;};
			
			// Start
			x = cx + face.eyeSize;
			y = 25 + eyeline - face.eyeSize;
			if (i == 1) {x = cx - face.eyeSize};
			path = 'm '+x+','+y;

			// in
			x = -2 * face.eyeSize;
			y = face.eyeSize/4;
			c1x = 0;
			c1y = -4;
			c2x = x + face.eyeSize/4;
			c2y = y - tilt;
			if (i == 1) {x *= -1; c1x *= -1; c2x *= -1;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// up
			x = 0;
			y = -1 * face.browSize;
			c1x = -2;
			c1y = 0;
			c2x = x-2;
			c2y = y;
			if (i == 1) {x *= -1; c1x *= -1; c2x *= -1;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// back
			x = 2 * face.eyeSize;
			y = face.browSize - face.eyeSize/4;
			c1x = face.eyeSize/4;
			c1y = -1 * tilt;
			c2x = x;
			c2y = y-4;
			if (i == 1) {x *= -1; c1x *= -1; c2x *= -1;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
									
		};
		
		// Muzzle
		
		if (face.noseHeight > 60) {
		
			muzzle = true;
			
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.noseColor);
			newPath.setAttribute("stroke",'#000000');
			newPath.setAttribute("stroke-width","1");
			
			// Start under right nose
			var muzzleWidth = Math.max(face.noseWidth * 2,face.mouthWidth * 1.5);
			x = 100 - muzzleWidth;
			y = 22 + eyeline + face.noseHeight * face.chinHeight / 100;
			var muzzleLength = Math.max((25 + eyeline + face.chinHeight) - y,20);

			path = 'm '+x+','+y;

			// to muzzle chin
			x = muzzleWidth;
			y = muzzleLength;
			c1x = 0;
			c1y = muzzleLength;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// back under nose
			x = muzzleWidth;
			y = -1 * muzzleLength;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y+muzzleLength;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to top of muzzle
			x = -1 * muzzleWidth;
			y = -2 * face.nostrilHeight;
			c1x = 0;
			c1y = muzzleLength * -0.25;
			c2x = x + muzzleWidth * 0.5;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// back to under right nose
			x = -1 * muzzleWidth;
			y = 2 * face.nostrilHeight;
			c1x = muzzleWidth * -0.5;
			c1y = 0;
			c2x = x;
			c2y = y - muzzleLength * 0.25;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			path += 'z';
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);			
		};
		
		// Top Half of Mouth (renders before/under nose)
		
		// Teeth Backdrop
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		if (face.teeth > 0) {
			newPath.setAttribute('fill','#FFFFFF');
		} else {
			newPath.setAttribute('fill','#000000');
		};
		
		// Start at Right Side
		x = 100 - face.mouthWidth;
		y = 25 + eyeline - face.smile + (100 + face.noseHeight)/2 * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// to top of smile / bottom of top lip
		x = face.mouthWidth;
		y = face.smile;
		c1x = 0;
		c1y = 0;
		c2x = x-face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left
		x = face.mouthWidth;
		y = -1 * face.smile;
		c1x = face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to middle bottom
		x = -1 * face.mouthWidth;
		y = face.smile+face.mouthOpen;
		c1x = 0;
		c1y = 0;
		c2x = x+face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right side
		x = -1 * face.mouthWidth;
		y = -1 * (face.smile+face.mouthOpen);
		c1x = -1 * face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);
		
		// Top Lip
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute('fill',face.lipColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		// Start at Right Side
		x = 100 - face.mouthWidth;
		y = 25 + eyeline - face.smile + (100 + face.noseHeight)/2 * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// to right top of cupid's bow
		x = face.mouthWidth * 0.8;
		y = face.smile-face.lipSize;
		c1x = 0;
		c1y = 0;
		c2x = x-face.lipSize;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to bottom of cupid's bow
		x = face.mouthWidth * 0.2;
		y = 0.5 * face.lipSize;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left top of cupid's bow
		x = face.mouthWidth * 0.2;
		y = -0.5 * face.lipSize;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left
		x = face.mouthWidth * 0.8;
		y = -1 * (face.smile - face.lipSize);
		c1x = face.lipSize;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to middle bottom
		x = -1 * face.mouthWidth;
		y = face.smile;
		c1x = 0;
		c1y = 0;
		c2x = x+face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right side
		x = -1 * face.mouthWidth;
		y = -1 * face.smile;
		c1x = -1 * face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);
		
		// Nose
		
		// Nose Bump
		if (face.noseBump > 0) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.noseColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");

			// start at right side
			x = 100 - face.noseWidth;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100 + face.nostrilHeight * 0.5;
			y -= face.nostrilHeight * 2;
			path = 'm '+x+','+y;
			
			// to left side
			x = face.noseWidth * 2;
			y = 0;
			c1x = 0;
			c1y = -1 * face.noseBump * face.noseHeight / 25;
			c2x = x;
			c2y = y - face.noseBump * face.noseHeight / 25;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;			
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);		
			
		};
		
		// Nose Background
		if (!muzzle) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.noseColor);
			
			if (face.noseHeight*face.chinHeight/100 - face.nostrilHeight*2 - face.eyeSize > 0) {
				newPath.setAttribute("stroke","none");
			} else {
				newPath.setAttribute("stroke","#000000");
				newPath.setAttribute("stroke-width","1");
				noseStroke = true;
			};

			// start at right inside nostril
			x = 100 - face.noseWidth * 1.2;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			path = 'm '+x+','+y;

			// to right top nose crease
			x = -0.1 * face.noseWidth;
			y = -1.8 * face.nostrilHeight;
			c1x = -1 * face.noseWidth;
			c1y = 0;
			c2x = x - face.noseWidth * 0.2;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to left top nose crease
			x = 2.6 * face.noseWidth;
			y = 0;
			c1x = 0;
			c1y = -0.5 * face.nostrilHeight;
			c2x = x;
			c2y = -0.5 * face.nostrilHeight;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);	

			// to left bottom nose crease
			x = 0;
			y = 1.8 * face.nostrilHeight;
			c1x = face.noseWidth * 0.2;
			c1y = 0;
			c2x = x + face.noseWidth;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);	
		};	
		
		// Nostrils
		
		var nostrilShadow = 0.1 * ( face.nostrilHeight - 2 )
		
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill","rgba(0,0,0,"+nostrilShadow+")");
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill","rgba(0,0,0,"+nostrilShadow+")");
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start at right inside nostril
		x = 100 - face.noseWidth * 0.8;
		y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// start at left inside nostril
		x = 100 + face.noseWidth * 0.8;
		var otherPath = 'm '+x+','+y;

		// to right outside nostril
		x = -1 * face.noseWidth * 0.4;
		y = -1 * face.nostrilHeight/2;
		c1x = -1 * face.noseWidth * 0.2;
		c1y = -1 * face.nostrilHeight * 0.25;
		c2x = x;
		c2y = y + face.nostrilHeight * 0.25;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top of right nostril
		x = face.noseWidth * 0.6;
		y = -1 * face.nostrilHeight/2;
		c1x = 0;
		c1y = face.nostrilHeight * -0.25;
		c2x = x-face.noseWidth * 0.2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right septum
		x = face.noseWidth * 0.4;
		y = face.nostrilHeight;
		c1x = face.noseWidth * 0.2;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);		
		
		otherNewPath.setAttributeNS(null,"d",otherPath);
		svg.appendChild(otherNewPath);
		
		// Bottom of Septum
		if (face.noseSize > 1) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill","none");
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");

			// start at right side
			x = 100 - face.noseWidth * 0.2;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			path = 'm '+x+','+y;
			
			// to left side
			x = face.noseWidth * 0.4;
			y = 0;
			c1x = face.noseWidth * 0.2;
			c1y = face.nostrilHeight * 0.2;
			c2x = x - face.noseWidth * 0.2;
			c2y = face.nostrilHeight * 0.2;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;			
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);		
			
		};
		
		// Top of Nose Crease
		if (face.noseSize > 2 && !noseStroke) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill","none");
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill","none");
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start at midpoint of right nose crease
			x = 100 - face.noseWidth * 1.6;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			y -= face.nostrilHeight;
			path = 'm '+x+','+y;

			// start at midpoint of right nose crease
			x = 100 + face.noseWidth * 1.6;
			var otherPath = 'm '+x+','+y;

			// to top of nose crease
			x = face.noseWidth * 0.2;
			y = -1 * face.nostrilHeight/2;
			c1x = face.noseWidth * 0.1;
			c1y = face.nostrilHeight * -0.4;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);

			otherNewPath.setAttributeNS(null,"d",otherPath);
			svg.appendChild(otherNewPath);
			
		};
		
		// Bottom of Nose Crease
		if (face.noseSize > 3 && !noseStroke) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill","none");
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill","none");
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start at midpoint of right nose crease
			x = 100 - face.noseWidth * 1.6;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			y -= face.nostrilHeight;
			path = 'm '+x+','+y;

			// start at midpoint of left nose crease
			x = 100 + face.noseWidth * 1.6;
			var otherPath = 'm '+x+','+y;

			// to bottom of nose crease
			x = face.noseWidth * 0.4;
			y = face.nostrilHeight * 1.2;
			c1x = -0.4 * face.noseWidth;
			c1y = face.nostrilHeight;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);

			otherNewPath.setAttributeNS(null,"d",otherPath);
			svg.appendChild(otherNewPath);
			
		};
		
		// Top of Nose Point
		if (face.noseSize > 4) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill","none");
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");

			// start at right side
			x = 100 - face.noseWidth * 0.2;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			y -= face.nostrilHeight * 2;
			path = 'm '+x+','+y;
			
			// to left side
			x = face.noseWidth * 0.4;
			y = 0;
			c1x = face.noseWidth * 0.2;
			c1y = face.nostrilHeight * -0.2;
			c2x = x - face.noseWidth * 0.2;
			c2y = face.nostrilHeight * -0.2;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;			
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);		
			
		};
		
		// Tusks
		if ((face.teeth > 0 && face.leftTusk > 0) || (face.teeth > 0 && face.rightTusk > 0)) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute('fill','#f5f7bb');
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute('fill','#f5f7bb');
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");
			
			var tuskSize = face.teeth;
		
			// Start at Right Side
			x = 100 - face.mouthWidth * 0.8;
			y = 25.5 + eyeline - face.smile * 0.6 + (100 + face.noseHeight)/2 * face.chinHeight / 100;
			path = 'm '+x+','+y;
			
			x = 100 + face.mouthWidth * 0.8;
			otherPath = 'm '+x+','+y;

			// to top of tusk
			x = -1 * tuskSize;
			y = -5 * tuskSize;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y + tuskSize * 3;
			if (face.leftTusk === 2) {x *= 0.5;c1x *= 0.5;c2x *= 0.5;y *= 0.5;c1y *= 0.5;c2y *= 0.5;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			if (face.leftTusk === 2) {x *= 2;c1x *= 2;c2x *= 2;y *= 2;c1y *= 2;c2y *= 2;};
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			if (face.rightTusk === 2) {x *= 0.5;c1x *= 0.5;c2x *= 0.5;y *= 0.5;c1y *= 0.5;c2y *= 0.5;};
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// blunted end
			x = 2;
			y = -1;
			c1x = 0;
			c1y = -2;
			c2x = x;
			c2y = y;
			if (face.leftTusk === 2) {x = face.mouthWidth * 0.3;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x = -2;
			c1x *= -1;
			c2x *= -1;
			if (face.rightTusk === 2) {x = face.mouthWidth * -0.3;};
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to bottom of tusk
			x = tuskSize + face.mouthWidth * 0.4;
			y = 5 * tuskSize + (face.smile + face.mouthOpen) * 0.6;
			c1x = 0;
			c1y = tuskSize * 2;
			c2x = x;
			c2y = y;
			if (face.leftTusk === 2) {x *= 0.5;c1x *= 0.5;c2x *= 0.5;y *= 0.6;c1y *= 0.5;c2y *= 0.5;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			if (face.leftTusk === 2) {x *= 2;c1x *= 2;c2x *= 2;y /= 0.6;c1y *= 2;c2y *= 2;};
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			if (face.rightTusk === 2) {x *= 0.5;c1x *= 0.5;c2x *= 0.5;y *= 0.6;c1y *= 0.5;c2y *= 0.5;};
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			newPath.setAttributeNS(null,"d",path);
			otherNewPath.setAttributeNS(null,"d",otherPath);
			
			if (face.leftTusk > 0) {
				svg.appendChild(newPath);
			};
			if (face.rightTusk > 0) {
				svg.appendChild(otherNewPath);
			};
		};
		
		// Bottom Lip
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute('fill',face.lipColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		// Start at Right Side
		x = 100 - face.mouthWidth;
		y = 25 + eyeline - face.smile + (100 + face.noseHeight)/2 * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// to top of bottom lip
		x = face.mouthWidth;
		y = face.smile+face.mouthOpen;
		c1x = 0;
		c1y = 0;
		c2x = x-face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left
		x = face.mouthWidth;
		y = -1 * (face.smile+face.mouthOpen);
		c1x = face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to middle bottom
		x = -1 * face.mouthWidth;
		y = face.smile+face.mouthOpen+face.lipSize;
		c1x = 0;
		c1y = 0;
		c2x = x+face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right side
		x = -1 * face.mouthWidth;
		y = -1 * (face.smile+face.mouthOpen+face.lipSize);
		c1x = -1 * face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);
		
		
		
		// Bangs
		if (face.hairBangsLength > 0 && face.hairLength > 0) {
		
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke",'none');
			
			path = 'm '+100+','+20;
			
			x = -23 - face.templeWidth;
			y = totalY - 21;
			c1x = -2;
			c1y = 0;
			c2x = x;
			c2y = y-face.templeWidth;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			x = 23 + face.templeWidth + face.hairPart;
			y = 0 - face.templeHeight;
			path += 'l '+x+","+y
			
			x = 23 +  face.templeWidth - face.hairPart;
			y = face.templeHeight;
			path += 'l '+x+","+y
			
			x = -23 - face.templeWidth;
			y = 21 - totalY;
			c1x = 0;
			c1y = 0 - face.templeWidth;
			c2x = x+2;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
			
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",face.hairColor);
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start at top of part
			x = 100 + face.hairPart;
			y = totalY - 2 - face.templeHeight;
			path = 'm '+x+','+y;
			otherPath = 'm '+x+','+y;

			var rightBangs = Math.round(face.hairBangs * (face.hairPart+10)/20);
			var leftBangs = face.hairBangs - rightBangs;
			
			for (i=0;i<Math.max(rightBangs,leftBangs);i++) {

				// bang bang bang!
				x = (-23 - 1.5 * face.templeWidth - face.hairPart) / rightBangs;
				y = (face.hairBangsLength + face.templeHeight) / rightBangs;
				c1x = 0 - face.hairSweep;
				c1y = face.hairBangsLength;
				c2x = x - face.hairSweep;
				c2y = y+face.hairBangsLength;
				if (i < rightBangs) {path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;};
				x = (23 + 1.5 * face.templeWidth - face.hairPart) / leftBangs;
				y = (face.hairBangsLength + face.templeHeight) / leftBangs;
				c1x *= -1;
				c2x = x;
				c2y = y+face.hairBangsLength;
				if (i < leftBangs) {otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;};
			};
			
			if (rightBangs === 0) {
				// Asymmetrical Shave
				x = -24 - 1.5 * face.templeWidth - face.hairPart;
				y = face.hairBangsLength + face.templeHeight;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			};
			
			if (leftBangs === 0) {
				// Asymmetrical Shave
				x = 24 + 1.5 * face.templeWidth - face.hairPart;
				y = face.hairBangsLength + face.templeHeight;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			};
			
			// up above hairline
			x = 0;
			y = -1 * face.hairBangsLength - 1;
			c1x = 0;
			c1y = 0;
			c2x = x - face.templeWidth;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);

			otherNewPath.setAttributeNS(null,"d",otherPath);
			svg.appendChild(otherNewPath);
			
			
		};
		
		// Hands
		var rightHand = document.createElementNS('http://www.w3.org/2000/svg',"g");
		rightHand.id = 'rightHand';
		rightForearmGroup.appendChild(rightHand);
// 		rightHand.setAttributeNS(null,'transform','translate(0) rotate(0 '+rightWristPivot.cx.animVal.value+' '+rightWristPivot.cy.animVal.value+')');

		var leftHand = document.createElementNS('http://www.w3.org/2000/svg',"g");
		leftHand.id = 'leftHand';
		leftForearmGroup.appendChild(leftHand);
// 		leftHand.setAttributeNS(null,'transform','translate(0) rotate(0 '+leftWristPivot.cx.animVal.value+' '+leftWristPivot.cy.animVal.value+')');
		
		// Thumbs
				
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.skinColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill",face.skinColor);
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start at bottom of thumb
		x = 100 + armWidth * 0.5 - face.shoulders;
		y = neck + 5 + upperArmLength + 20;
		path = 'm '+x+','+y;

		x = 100 - armWidth * 0.5 + face.shoulders;
		otherPath = 'm '+x+','+y;

		// to top of thumb
		x = 10;
		y = -4;
		c1x = 0;
		c1y = 0;
		c2x = x-1;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to bottom of first knuckle
		x = 5;
		y = 3;
		c1x = 1;
		c1y = 0;
		c2x = x;
		c2y = y-1;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to tip of thumb
		x = 0;
		y = 10;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to pad of thumb
		x = -5;
		y = -2;
		c1x = -3;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
		newPath.setAttributeNS(null,"d",path);
		rightHand.appendChild(newPath);

		otherNewPath.setAttributeNS(null,"d",otherPath);
		leftHand.appendChild(otherNewPath);
		
		// Items Here?
		
		// Fist Fronts
				
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.skinColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill",face.skinColor);
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start at bottom of thumb
		x = 100 + armWidth * 0.5 - face.shoulders;
		y = neck + 5 + upperArmLength + 20;
		path = 'm '+x+','+y;

		x = 100 - armWidth * 0.5 + face.shoulders;
		otherPath = 'm '+x+','+y;

		// to top outside of fist
		x = -9;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// to bottom outside of fist
		for (i=0;i<4;i++) {
			// dip out for knuckle
			x = -1;
			y = 1;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			// down a finger
			x = 0;
			y = 5;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			// dip in for knuckle
			x = 1;
			y = 1;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		}

		// to bottom inside of fist
		x = 16;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// Pinky Finger
		// bottom corner
		x = 1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// up a finger
		x = 0;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// top corner
		x = -1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' h -8 h 9';
		otherPath += ' h 8 h -9';

		// Ring Finger
		// bottom corner
		x = 1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// up a finger
		x = 0;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// top corner
		x = -1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' h -9 h 10';
		otherPath += ' h 9 h -10';

		// Middle Finger
		// bottom corner
		x = 1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// up a finger
		x = 0;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// top corner
		x = -1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' h -10 h 9';
		otherPath += ' h 10 h -9';

		// Index Finger
		// bottom corner
		x = 1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// up a finger
		x = 0;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// top corner
		x = -1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top  of fist
		x = -9;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to
		x = 0;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
		newPath.setAttributeNS(null,"d",path);
		rightHand.appendChild(newPath);

		otherNewPath.setAttributeNS(null,"d",otherPath);
		leftHand.appendChild(otherNewPath);
		
		
		
		// Clothing & Equipment
		var armor = mob.equipment.armor
		
		var armorColoring = armor.simpleColoring;
		
		if (armorColoring !== undefined) {
			if (armorColoring.torso !== undefined) {
				if (armorColoring.torso.fill !== undefined) {
					torsoPath.setAttribute("fill",armorColoring.torso.fill);
					rightBreastPath.setAttribute("fill",armorColoring.torso.fill);
					leftBreastPath.setAttribute("fill",armorColoring.torso.fill);
		// 			belly.setAttribute("fill",armorColoring.torso.fill);
				};
				if (armorColoring.torso.stroke !== undefined) {
					torsoPath.setAttribute("stroke",armorColoring.torso.stroke);
					rightBreastPath.setAttribute("stroke",armorColoring.torso.stroke);
					leftBreastPath.setAttribute("stroke",armorColoring.torso.stroke);
		// 			belly.setAttribute("stroke",armorColoring.torso.stroke);
				};
			};
		
			if (armorColoring.upperArms !== undefined) {
				if (armorColoring.upperArms.fill !== undefined) {
					rightUpperArmPath.setAttribute("fill",armorColoring.upperArms.fill);
					leftUpperArmPath.setAttribute("fill",armorColoring.upperArms.fill);
				};
				if (armorColoring.upperArms.stroke !== undefined) {
					rightUpperArmPath.setAttribute("stroke",armorColoring.upperArms.stroke);
					leftUpperArmPath.setAttribute("stroke",armorColoring.upperArms.stroke);
				};
			};
		
			if (armorColoring.lowerArms !== undefined) {
				if (armorColoring.lowerArms.fill !== undefined) {
					rightLowerArmPath.setAttribute("fill",armorColoring.lowerArms.fill);
					leftLowerArmPath.setAttribute("fill",armorColoring.lowerArms.fill);
				};
				if (armorColoring.lowerArms.stroke !== undefined) {
					rightLowerArmPath.setAttribute("stroke",armorColoring.lowerArms.stroke);
					leftLowerArmPath.setAttribute("stroke",armorColoring.lowerArms.stroke);
				};
			};
		
			if (armorColoring.legs !== undefined) {
				if (armorColoring.legs.fill !== undefined) {
					rightLegPath.setAttribute("fill",armorColoring.legs.fill);
					leftLegPath.setAttribute("fill",armorColoring.legs.fill);
				};
				if (armorColoring.legs.stroke !== undefined) {
					rightLegPath.setAttribute("stroke",armorColoring.legs.stroke);
					leftLegPath.setAttribute("stroke",armorColoring.legs.stroke);
				};
			};
		};
		
		if (armor.svgNodes !== undefined) {
			var armorSVGNodes = armor.svgNodes(mob,{eyeline:eyeline,neck:neck});
			clothingGroup.appendChild(armorSVGNodes);
		};
		
		// Animation		
		// document.getElementById('rightArmGroup').setAttributeNS(null,'transform','rotate(60 '+document.getElementById('rightShoulderPivot').cx.animVal.value+' '+document.getElementById('rightShoulderPivot').cy.animVal.value+')');
		
		// End Draw Mob
	},
};