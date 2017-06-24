var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var componentList = [];

function ball(radius, color, x, y, xvel, yvel) {
	this.type = "ball";
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.xvel = xvel;
	this.yvel = yvel;
	this.color = color;
	componentList.push(this);
}

function drawBall(ball) {
	context.beginPath();
	context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
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
		component.y += component.yvel;
	}
}

function drawFrame() {
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < componentList.length; i++) {
		var component = componentList[i];
		switch(component.type) {
			case "ball":
				drawBall(component);
				break;
			default:
				break;
		}
	}
}


function gameLoop() {
	tick();
	drawFrame();
}


function shot(e) {
	golfball.xvel = 0.01 * (e.clientX - golfball.x);
	golfball.yvel = 0.01 * (e.clientY - golfball.y);
}


var golfball = new ball(20, "#DDDDDD", 50, 50, 0, 0);

var interval = setInterval(gameLoop, 20);