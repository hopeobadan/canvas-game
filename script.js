

var checkKey = function(e){		
		
		e = e || window.event;		
		
		if (e.keyCode == '37') {			
			left();
			startCheck = true;		  
		}
		
		else if (e.keyCode == '39') {			
			right();
			startCheck = true;		   
		}		
	}


var racketPad;
var ball;
var lWall, rWall, tWall;
var block;
var ball;
var padMax = 855;
var padMin = 15;
var pi = 2*Math.PI;
var startCheck = false;
var yPos = true;
var xPos = true;
var randX;
var randY;
var brick = [];
var rowLimit = 84;	

//660

//away from radius + or - 8

function startGame(){
	gameSpace.start();
	//name = new componentA(height , width, color, x, y);
	racketPad = new componentA(130, 12, "blue", 435, 630);
	lWall = new componentA(5, 645, "black", 5, 10);
	rWall = new componentA(5, 645, "black", 990, 10);
	tWall = new componentA(990, 5, "black", 5, 5);
	//name = new componentB(x, y, r, color, angleA, angleB)
	ball = new componentB(500, 622, 7,"orange", 0, pi);
	var hone = document.getElementById("hone");
	
	randX = Math.floor((Math.random() * 5) + 3);
	randY = Math.floor((Math.random() * 5) + 4);
		
	//brick = new componentA(25, 25, "red", 50, 50);
	
	var count = 50;
	var countX = 0;
	var countY = 0;
	for(var i = 0; i < rowLimit; i++){		
		
			brick[i] = new componentA(35, 20, "red", 34 + countX, 50 +  countY, true);
			
			countX += 45;
		
			if(brick[i].x >= 920){
				countX = 0;
				countY += 70;				
				
			}
						
	}	
}

//canvas
var gameSpace = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 650;
		this.canvas.style.border = "1px solid green";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[3]);
		this.interval = setInterval(updateGameArea, 20);
    },
	clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function(){
	  clearInterval(this.interval);
  }
}



//componentA
function componentA(width, height, color, x, y, brickBool){
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = x;
	this.y = y;
	this.brickBool = brickBool;
	this.update = function(){
		ctx = gameSpace.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}	
}

//componentB
function componentB(x, y, r, color, angleA, angleB){
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
	this.angleA = angleA;
	this.angleB = angleB;
	this.update = function(){
		ctx = gameSpace.context;		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, this.angleA, this.angleB);
		ctx.stroke();
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.fill();
		
		
		if(startCheck == true){			
			
			ballMoveY();
			
			ballMoveX();
			
			for(var i = 0; i < rowLimit; i++){
				if(brick[i].brickBool == true){
					//up
					if(ball.x + 5 >= brick[i].x && ball.x + 5 <= brick[i].x + 35 &&
						ball.y + 5  <= brick[i].y && ball.y + 5  >= brick[i].y + 5 ){
						yPos = true;					
						brick[i].brickBool = false;					
						}
						
					//bottom
					if(ball.x + 5 >= brick[i].x && ball.x + 5 <= brick[i].x + 35 && 
						ball.y + 5  <= brick[i].y + 36 && ball.y + 5  >= brick[i].y + 32){
						yPos = false;						
						brick[i].brickBool = false;					
						}
						
					
					//left
					if(ball.y + 5  >= brick[i].y && ball.y <= brick[i].y + 35 && 
					ball.x + 5 <= brick[i].x + 35 && ball.x + 5 >= brick[i].x + 34){
						xPos = true;									
						brick[i].brickBool = false;
						}
						
					
					//right
					if(ball.y + 5 >= brick[i].y && ball.y + 5  <= brick[i].y + 35 && 
						ball.x + 5 >=  brick[i].x && ball.x + 5 <= brick[i].x + 34 ){
						xPos = false;					
						brick[i].brickBool = false;
						}
					
				}							
			}		
		}	
	}
}




function ballMoveY(){
	
		
		if(yPos == true){
			
			ball.y -= randY;
			
			if(ball.y <= tWall.y + 10){
				randX = Math.floor((Math.random() * 5) + 3);
				yPos = false;				
			}
		}
		
		if (yPos == false){
			ball.y += randY;
			
			if(ball.x >= racketPad.x && ball.x <= racketPad.x + 139 && 
			ball.y <= racketPad.y && ball.y >= 621 ){
				randX = Math.floor((Math.random() * 5) + 3);
				yPos = true;
			}
			else if(ball.y > racketPad.y){
				lost();
			}				
		}
	}

function ballMoveX(){
		
	if(xPos == true){
		
		ball.x += randX;
		if(ball.x >= rWall.x - 5){			
			xPos = false;
		}		
	}
	
	if(xPos == false){		
		ball.x -= randX;
		if(ball.x <= lWall.x + 10){			
			xPos = true;
		}
	}	
}



function updateGameArea() {
  gameSpace.clear();
  
  racketPad.update();
  lWall.update();
  rWall.update();
  tWall.update();
  ball.update();
  
  for(var i = 0; i < rowLimit; i++){
	  if(brick[i].brickBool == true){
		  brick[i].update();
	  }
			  
  }
  
  lost();  
}


function right(x){
	if(racketPad.x < padMax){
		racketPad.x += 25;
		//hone.innerHTML = racketPad.x;
	}	
}

function left(x){	
	if(racketPad.x > padMin){
		racketPad.x -= 25;		
		//hone.innerHTML = racketPad.x;
	}	
}

function lost(){
	if(ball.y > racketPad.y + 60){
		gameSpace.stop();
	}
}




document.onkeydown = checkKey;


