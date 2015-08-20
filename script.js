// do stuff without editing the html/css file
window.onload = start;

var pixels = [];
var divRows = [];
var palette  = [];
var contrast = [];
var rows = 36;
var cols = Math.round(rows * 16/9);
var paletteRows = 2;
var contrastRows = 1;
var w = (100/cols) + "%";
var h = (95/(rows+paletteRows)) + "vh";
var dragging = false;
// scales the pixel art maker

function start() {
	initialize();
	createRows();
	createPixels();
	createPalette();
	createContrast();
	fillPalette();
	listenForPixels();
	listenForPalettes();
	listenForWheel();
	addClass(palette[0][0],"color");
}

function createRows() {
	for (var i = 0; i < rows; i++) {
		var row = createEle();
		addClass(row,"row");
		row.style.margin = "-4px";
		row.style.borderCollapse = "collapse";
		append(container,row);
		divRows.push(row);
	}
}

function createPixels() {
	for (var i = 0; i < rows; i++) {
		var row = [];
		for (var j = 0; j < cols; j++) {
			var pixel = createEle();
			addClass(pixel,"pixel");
			stylePixel(pixel);
			append(divRows[i],pixel);
			row.push(pixel);
		}
		pixels.push(row);
	}
}

function createPalette() {
	for (var i = 0; i < paletteRows; i++) {
		var row = [];
		for (var j = 0; j < cols; j++) {
			var pal = createEle();
			addClass(pal,"palette");
			addClass(pal,"colpalette");
			stylePalette(pal);
			append(pContainer,pal);
			row.push(pal);
		}
		palette.push(row);
	}
}

function createContrast() {
	for (var i = 0; i < contrastRows; i++) {
		var row = [];
		for (var j = 0; j < cols; j++) {
			var con = createEle();
			addClass(con,"palette");
			addClass(con,"conpalette");
			stylePalette(con);
			append(pContainer,con);
			row.push(con);
		}
		contrast.push(row);
	}
}

function stylePixel(pix) {
	pix.style.height = h;
	pix.style.width = w;
	pix.style.display = "inline-block";
	pix.style.border = "1px solid grey";
	pix.style.boxSizing = "border-box";
	pix.style.borderRadius = "10%";
	pix.style.borderCollapse = "collapse";
}

function stylePalette(pal) {
	pal.style.height = h;
	pal.style.width = w;
	pal.style.float = "left";
}

function styleLabelInput(label, input, id, type) {
	label.for = id;
	label.style.display = "inline-block";
	label.style.marginRight = "5px";
	input.id = id;
	input.type = type;
	input.style.display = "inline-block";
	input.style.marginRight = "20px";
}


function fillPalette() {
	var pals = queryAll(".colpalette");
	var total = pals.length;
	var step = 2*Math.PI/total;
	var phase = Math.PI/3*2;
	var r, g, b;
	for (var i = 0; i < total; i++) {
		r = Math.floor(Math.sin(step*i + phase*0) * 127 + 128);
		g = Math.floor(Math.sin(step*i + phase*1) * 127 + 128);
		b = Math.floor(Math.sin(step*i + phase*2) * 127 + 128);
		pals[i].style.backgroundColor = `rgb(${r},${g},${b})`;
		pals[i].value = pals[i].style.backgroundColor;
	}

	var cons = queryAll(".conpalette");
	total = cons.length;
	phase = Math.PI/2*3;
	for (var i = 0; i < total; i++) {
		r = Math.floor(Math.sin(step*i + phase) * 127 + 128);
		g = Math.floor(Math.sin(step*i + phase) * 127 + 128);
		b = Math.floor(Math.sin(step*i + phase) * 127 + 128);
		cons[i].style.backgroundColor = `rgb(${r},${g},${b})`;
		cons[i].value = cons[i].style.backgroundColor;
	}
}

function listenForPixels() {
	var pix = queryAll(".pixel");
	for (var i = 0; i < pix.length; i++) {
			pix[i].addEventListener("click", colorPixel);
			pix[i].addEventListener("mousedown", dragPixel);
			pix[i].addEventListener("mouseup", stopDrag);
	}
}

function listenForPalettes() {
	var pals = queryAll(".palette");
	var len = pals.length;
	for (var i = 0; i < len; i++) {
			pals[i].addEventListener("click", setColor);
	}
}

function listenForWheel() {
	var wheel = query("#wheel");
	wheel.addEventListener("click", function() {
		getColor().classList.remove("color");
	});
}

function resetPixels() {
	var coloredPixels = queryAll(".colored");
	var len = coloredPixels.length;
	for (var i = 0; i < len; i++) {
		stylePixel(coloredPixels[i]);
		coloredPixels[i].style.backgroundColor = "white";
		coloredPixels[i].classList.remove("colored");
	}
}

function colorPixel() {
	addClass(this, "colored");
	if (getColor()) {
		this.style.backgroundColor = getColor().value;
	}
	else {
		this.style.backgroundColor = query("#wheel").value;
	}
	this.style.border = "";
	this.style.borderRadius = "";
}

function dragPixel(event) {
	event.preventDefault();
	var pix = queryAll(".pixel");
	for (var i = 0; i < pix.length; i++) {
		pix[i].addEventListener("mouseenter", colorPixel);
	}}

function stopDrag() {
	var pix = queryAll(".pixel");
	for (var i = 0; i < pix.length; i++) {
		pix[i].removeEventListener("mouseenter", colorPixel);
	}
}

function setColor() {
	if (getColor()) getColor().classList.remove("color");
	addClass(this,"color");
	console.log(this);
}

function getColor() {
	return query(".color");
}

function createEle(tag) {
	tag = tag || "div";
	return document.createElement(tag);
}

function addClass(ele, cls) {
	ele.classList.add(cls);
}

function append(parent, child) {
	parent.appendChild(child);
}

function query(target) {
	return document.querySelector(target);
}

function queryAll(target) {
	return document.querySelectorAll(target);
}

function initialize() {
	var container = createEle();
	var pContainer = createEle();
	var wheelLabel = createEle("label");
	var colorWheel = createEle("input");
	var resetLabel = createEle("label");
	var reset = createEle("input");
	append(document.body,container);
	container.id = "container";
	container.style.width = "100%";
	container.style.position = "relative";

	append(document.body,pContainer);
	pContainer.id = "pContainer";
	pContainer.style.width = "100%";
	container.style.position = "relative";

	append(document.body,wheelLabel);
	append(document.body,colorWheel);
	styleLabelInput(wheelLabel, colorWheel, "wheel", "color");
	wheelLabel.textContent = "Color Wheel";

	append(document.body,resetLabel);
	append(document.body,reset);
	styleLabelInput(resetLabel, reset, "reset", "button");
	reset.value = "Reset Pixels";
	reset.addEventListener("click", resetPixels);
}