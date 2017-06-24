var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var componentList = [];

var camerax = 0;
var cameray = 0;

function ball(radius, color, x, y, xvel, yvel, mass) {
	this.type = "ball";
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.xvel = xvel;
	this.yvel = yvel;
	this.color = color;
	this.mass = mass;
	
	this.checkCollision = function(otherComponent) {
		if((this.x - otherComponent.x)*(this.x - otherComponent.x) + (this.y - otherComponent.y)*(this.y - otherComponent.y) < (this.radius + otherComponent.radius) * (this.radius + otherComponent.radius)) {
			var myVelocity = Math.sqrt(otherComponent.xvel * otherComponent.xvel + otherComponent.yvel * otherComponent.yvel);
			var otherVelocity = Math.sqrt(this.xvel * this.xvel + this.yvel * this.yvel);
			var theta = Math.atan2((this.y - otherComponent.y), (this.x - otherComponent.x));
			//alert(theta);

			this.xvel = myVelocity * Math.cos(theta);
			this.yvel = myVelocity * Math.sin(theta);
			
			otherComponent.xvel = otherVelocity * -Math.cos(theta);
			otherComponent.yvel = otherVelocity * -Math.sin(theta);
		}
	}
	
	componentList.push(this);
}

function drawBall(ball, x, y) {
	context.beginPath();
	context.arc(ball.x - x + (canvas.width / 2), ball.y - y + (canvas.height / 2), ball.radius, 0, 2 * Math.PI, false);
	context.fillStyle = ball.color;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = '#000000';
	context.stroke();
}

function tick() {
	for(var i = 0; i < componentList.length; i++) {
		var component = componentList[i];
		component.x += component.xvel;
		component.xvel -= component.xvel * .02;// .1 represents the coefficient of friction between the object and the surface. Due to the lack of surfaces, it is being substituted as .1 until more are added
		component.y += component.yvel;
		component.yvel -= component.yvel * .02;// same as xvel, both still need mass incorperated in
		for(var j = 0; j < componentList.length; j++) {
			if(i != j) {
				var component2 = componentList[j];
				component.checkCollision(component2);
			}
		}
	}
}

function drawFrame() {
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	camerax = golfball.x;
	cameray = golfball.y;
	
	for(var i = 0; i < componentList.length; i++) {
		var component = componentList[i];
		switch(component.type) {
			case "ball":
				drawBall(component, camerax, cameray);
				break;
			default:
				break;
		}
	}
	document.getElementById("shotcharge").style.height = "" + shotCharge + "vh";
}


function gameLoop() {
	tick();
	drawFrame();
}

var chargeInterval;
var shotCharge = 0;
function mouseDown(e) {
	shotCharge++;
	
	window.clearInterval(chargeInterval);
	chargeInterval = window.setInterval(function() {
		shotCharge++; 
		if(shotCharge > 100) {
			shotCharge = 100;
		}
	}, 20);
}
function mouseUp(e) {
	shot(e);
	shotCharge = 0;
	window.clearInterval(chargeInterval);
}
function shot(e) {
	var angle = Math.atan2((e.clientY - canvas.height / 2),(e.clientX - canvas.width / 2));
	golfball.xvel = 0.3 * shotCharge * Math.cos(angle);
	golfball.yvel = 0.3 * shotCharge * Math.sin(angle);
}

function keyPress(e) {
	if(e.which === 32) {
		golfball.xvel = 0;
		golfball.yvel = 0;
	}
}





var golfball = new ball(10, "#DDDDDD", 0, 0, 0, 0, 10);
var testball = new ball(20, "#00FF00", 25, 25, 0, 0, 10)
var testball2 = new ball(20, "#FF0000", -25, -25, 0, 0, 10)
var testball3 = new ball(30, "#0000FF", 25, 250, 0, 0, 10)
var testball4 = new ball(20, "#FF00FF", 125, 25, 0, 0, 10)

var interval = setInterval(gameLoop, 20);