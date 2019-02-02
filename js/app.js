class GameCharacter{
	constructor(x, y, sprite){
		
		this.x = x; 
		this.y = y; 
		this.sprite = sprite; 
		this.step = 101; 
		this.jump = 83; 
	
	}
	
	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Player extends GameCharacter{
	constructor(x,y,sprite){
		
		super(x,y,sprite);
		
		this.victory = false; 
		this.startX = x; 
		this.startY = y; 
	
		
	}
	
	// Methods of the player class
	
	handleInput(input){
		switch(input){

				case 'left': 
				 if(this.x - this.step > 0){
					 this.x -= this.step; 
					break; 
				 }else {
					 return; 
				 }
					
				case 'up': 
				if(this.y - this.jump > 0){
					this.y -= this.jump; 
					console.log(this.y);
					break; 
				}else {
					return; 
				}
				    
				case 'right': 
				if(this.x + this.step < 498){
					this.x += this.step; 
					break; 
				}else {
					return; 
				}
				   
				case 'down': 
				 if(this.y + this.jump < 450){
					this.y += this.jump; 
					break; 
				 }else{
					 return;
				 }
				    
					
		}
		
	}
	
	update(){
		
		this.checkCollisions();
		
		if(this.y === 63){
			console.log("You win!");
			//location.reload();
			this.victory = true; 
			
		}
	}
	
	resetGame(){
		this.x = this.startX; 
		this.y = this.startY;
		
	}
	
	checkCollisions(){
		
		for(let i = 0; i<allEnemies.length;i++){
			let currentEnemy = allEnemies[i];
			
		if (this.x< (currentEnemy.x + currentEnemy.step -25)
        && (this.x + this.step - 25)>currentEnemy.x
        && this.y<(currentEnemy.y + currentEnemy.jump)
        && (this.y + this.jump)>currentEnemy.y){
			console.log("Collision");
			
			this.resetGame();
			
		}
		
		}
	}
	
	
}

class Enemy extends GameCharacter{
	constructor(x,y,sprite,speed){
		
		super(x,y,sprite);
		
		this.x = x; 
		this.y = y; 
		this.sprite = sprite; 
		this.speed = speed; 
		this.startX = x; 
		
	}
	
	update(dt){
		
		if(this.speed >= 0){
			
			this.x = this.x + (this.speed*dt);
			
			if(this.x > 505 || this.x < -101){
				this.x = this.startX;
				
			}
		
	}
	
}

}



const player = new Player(205,395,'images/char-boy.png');
const enemy1 = new Enemy(0,229,'images/enemy-bug.png',200);
const enemy2 = new Enemy(-100,63,'images/enemy-bug.png',100);
const enemy3 = new Enemy(0,146,'images/enemy-bug.png',50);

const allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);


/*

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
