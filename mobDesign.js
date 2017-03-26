
var faceData = {

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
	pupilSize: 0,
	browSize: 0,
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
	earColor: '#000',
	earPoint: 0,
	earPosition: 0,
	earSize: 0,
	hairColor: 0,
	hairLength: 0,
	hairHeight: 0,
	bangsLength: 0,
	bangsCurve: 0,
	bangsWidth: 0,
	hairCurl: 0,
	forelocks: 0,
	
};

var handlers = {

	updateFace: function(face) {
	
		face = faceData;
	
		var value;
		for (i in face) {
			value = document.getElementById(i + "Input").value;
			if (i.indexOf('olor') == -1) {
				value = parseInt(value);
			};
			face[i] = value;
		};
	
		view.drawFace(face);
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
// 		skinRed *= 0.2 * brownEumelanin / 100;
// 		skinGreen *= 0.2 * brownEumelanin / 100;
		skinBlue *= brownEumelanin / 100;

		// Pink Pheomelanin
		var pinkPheomelanin = 100 - document.getElementById('pinkPheomelaninInput').value;
		skinGreen *= pinkPheomelanin / 100;
		skinBlue *= pinkPheomelanin / 100;
		
		console.log('pigments',100-blackEumelanin,100-brownEumelanin,100-pinkPheomelanin);
		console.log('RGB',Math.round(skinRed),Math.round(skinGreen),Math.round(skinBlue));
		
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
			console.log('ear',earRed,earGreen,earBlue);
		};
		var earPinkness = parseInt(document.getElementById('earPinknessInput').value);
		if (earPinkness > 0) {
			earGreen *= (100 - earPinkness)/100;
			earBlue *= (100 - earPinkness)/100;
		};
		var earColor= "#" + ("0" + Math.round(earRed).toString(16)).substr(-2) + ("0" + Math.round(earGreen).toString(16)).substr(-2) + ("0" + Math.round(earBlue).toString(16)).substr(-2);
		document.getElementById('earColorInput').value = earColor;
		
		
		handlers.updateFace();
	},
	
	randomizeFace: function() {
		for (i in faceData) {
			var slider = document.getElementById(i+"Input");
			if (i.indexOf('olor') == -1) {
				console.log(i);
				slider.value = ( Math.random() * (parseInt(slider.max) - parseInt(slider.min)) << 0 ) + parseInt(slider.min);
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
		handlers.updateFace();
	},
	
	matchToSkinColor: function(input) {
		document.getElementById(input).value = document.getElementById('skinColorInput').value;
		handlers.updateFace();
	},
};

var view = {

	drawFace: function(face) {

		var eyeline = 33;
		var muzzle = false;
		var noseStroke = false;

		var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		svg.setAttribute('viewBox','0 0 200 200');
	
		var faceDiv = document.getElementById('faceDiv')
		faceDiv.innerHTML = '';
		faceDiv.appendChild(svg);
		
		// Hair in Back
		if (face.hairLength > 0) {
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");

			// start 
			var x = 100;
			var y = 20;
			var path = 'm '+x+','+y;
						
			var stepX = (25 + 2 * face.templeWidth) / face.hairCurl;
			var stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = (10 - face.hairHeight)/10 * ( 0.03 * Math.pow((stepX * (i+1)),2) - 0.03 * Math.pow((stepX * (i)),2) ) + (i % 3) - 1;
				c1x = 25 / face.hairCurl;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
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
			
			stepX = (-25 - 2 * face.templeWidth - 0.2 * face.hairLength) / face.hairCurl;
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
			
			stepX = (-25 - 2 * face.templeWidth - 0.2 * face.hairLength) / face.hairCurl;
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

			stepX = (25 + 2 * face.templeWidth) / face.hairCurl;
			stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = (10 - face.hairHeight)/10 * -1 * ( 0.03 * Math.pow((stepX * (face.hairCurl - i)),2) - 0.03 * Math.pow((stepX * (face.hairCurl - i-1)),2) ) + ((i+1) % 3) - 1;
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
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",'#666666');
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");

		// start 
		x = 40;
		y = 300;
		path = 'm '+x+','+y;

		// to right shoulder
		x = 0;
		y = -160;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left shoulder
		x = 120;
		y = 0;
		c1x = 0;
		c1y = -60;
		c2x = x;
		c2y = y-60;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to bottom shoulder
		x = 0;
		y = 160;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += 'z';
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);
		
	
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
		x = 75;
		y = 25 + eyeline - face.earSize - face.earPosition;
		path = 'm '+x+','+y;
		
		x = 125;
		var otherPath = 'm '+x+','+y;

		// to top of ear
		x = -2 * face.earSize - face.earPoint;
		y = -3 * face.earSize;
		c1x = 0;
		c1y = 0;
		c2x = x+(20-face.earPoint);
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to bottom of ear
		x = face.earPoint/10 * face.earSize + face.earPoint;
		y = 7 * face.earSize;
		c1x = face.earPoint/2-10;
		c1y = 0;
		c2x = x-10+face.earPoint/2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to skull
		x = 2 * face.earSize - face.earPoint/10 * face.earSize;
		y = -3 * face.earSize;
		c1x = face.earSize;
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
		x = 75;
		y = 25 + eyeline - face.earSize - face.earPosition;
		path = 'm '+x+','+y;
		
		x = 125;
		otherPath = 'm '+x+','+y;

		// to top of ear
		x = -2 * face.earSize - face.earPoint;
		y = -3 * face.earSize;
		c1x = 0;
		c1y = 0;
		c2x = x + (20-face.earPoint);
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// back to skull
		x = 2 * face.earSize + face.earPoint;
		y = face.earSize * 5;
		c1x = 20 - face.earPoint;
		c1y = face.earSize;
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
		

		// Eyes
		for (i in [0,1]) {
			if (i == 1) {cx = 100-face.eyeDistance} else {cx = 100+face.eyeDistance};
			cy = 25 + eyeline;
			
			// Eyeball
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
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
				c1y = face.insideEyelidCurve * -1;
				c2y = face.outsideEyelidCurve * -1;
			} else {
				c1y = face.outsideEyelidCurve * -1;
				c2y = face.insideEyelidCurve * -1;
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
				c1y = face.lowerEyelidCurve;
				c2y = face.lowerEyelidCurve;
			} else {
				c1y = face.lowerEyelidCurve;
				c2y = face.lowerEyelidCurve;
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
			x = 100 - face.noseWidth * 0.6;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			y -= face.nostrilHeight * 2;
			path = 'm '+x+','+y;
			
			// to left side
			x = face.noseWidth * 1.2;
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
		if (face.teeth > 1) {
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
			
			var tuskSize = Math.floor((face.teeth - 1) / 3);
		
			// Start at Right Side
			x = 100 - face.mouthWidth * 0.8;
			y = 25 + eyeline - face.smile + (100 + face.noseHeight)/2 * face.chinHeight / 100;
			if (face.smile > 0) {y += face.smile * 0.8};
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
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// blunted end
			x = 2;
			y = 0;
			c1x = 0;
			c1y = -2;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to bottom of tusk
			x = tuskSize + face.mouthWidth * 0.4;
			y = 5 * tuskSize + (face.smile + face.mouthOpen) * 0.4;
			c1x = 0;
			c1y = tuskSize * 2;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			newPath.setAttributeNS(null,"d",path);
			otherNewPath.setAttributeNS(null,"d",otherPath);
			
			if (face.teeth % 3 == 0 || face.teeth % 3 == 1) {
				svg.appendChild(newPath);
			};
			if (face.teeth % 3 == 0 || face.teeth % 3 == 2) {
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
		if (face.bangsLength > 0) {
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");

			// start 
			var x = 100;
			var y = 20;
			var path = 'm '+x+','+y;
			
			// to right temple
			var stepX = face.bangsWidth/100 * (25 + 2 * face.templeWidth) / face.hairCurl;
			var stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = (10 - face.hairHeight)/10 * ( 0.03 * Math.pow((stepX * (i+1)),2) - 0.03 * Math.pow((stepX * (i)),2) ) + (i % 3) - 1;
				c1x =  face.bangsWidth/100 * 25 / face.hairCurl;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to right bottom of bangs
			stepX = 0 / face.hairCurl;
			stepY = (eyeline * face.bangsLength / 100) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX + (i % 3) - 1;
				y = stepY;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to center bottom of bangs
			stepX = face.bangsWidth/100 * (-25 - 2 * face.templeWidth) / face.hairCurl;
			stepY = face.bangsCurve / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to left bottom of bangs
			stepX = face.bangsWidth/100 * (-25 - 2 * face.templeWidth) / face.hairCurl;
			stepY = -1 * face.bangsCurve / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to left temple
			stepX = 0 / face.hairCurl;
			stepY = (eyeline * face.bangsLength / 100) / face.hairCurl * -1;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX + ((i+2) % 3) - 1;
				y = stepY;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// back to top
			stepX = face.bangsWidth/100 * (25 + 2 * face.templeWidth) / face.hairCurl;
			stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = (10 - face.hairHeight)/10 * -1 * ( 0.03 * Math.pow((stepX * (face.hairCurl - i)),2) - 0.03 * Math.pow((stepX * (face.hairCurl - i-1)),2) ) + ((i+1) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x -  face.bangsWidth/100 * 25/face.hairCurl;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
		
			path += 'z';
			newPath.setAttributeNS(null,"d",path);
			svg.appendChild(newPath);
		};



	},
};