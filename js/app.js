
// Game class with all elements that can be re-used both for the player and the enemy
// The step is the length of one move of the character on the X axis
// The jump is the length of one move on the Y axis 
class GameCharacter{
	constructor(x, y, sprite){
		
		this.x = x; 
		this.y = y; 
		this.sprite = sprite; 
		this.step = 101; 
		this.jump = 83; 
	
	}
	
    // Method to draw the element on the board 
	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

// Class player. There should be only one player created.

class Player extends GameCharacter{
	constructor(x,y,sprite){
		
		super(x,y,sprite);
		
		this.victory = false; 
		this.startX = x; 
		this.startY = y; 
	
		
	}
	
	// Method to hanle the moving direction of the player making sure
    // that the player will not go outside the board of the game. 
	
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
	
    // Method to check of the player loses or win the game (lose is after collision)
	update(){
		
		this.checkCollisions();

		// this is the y axis of the winning block. It is the one of the top of the board game. 

		if(this.y === 63){
			console.log("You win!");
			//location.reload();
			this.victory = true; 
			
		}
	}
	
    // Set the player again in the start position
	resetGame(){
		this.x = this.startX; 
		this.y = this.startY;
		
	}
	
    // Check if the player collides with the enemy. If there is collision reset the game.
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

// Class Enemy 

class Enemy extends GameCharacter{
	constructor(x,y,sprite,speed){
		
		super(x,y,sprite);
		
		this.x = x; 
		this.y = y; 
		this.sprite = sprite; 
		this.speed = speed; 
		this.startX = x; 
		
	}
	
    // Method to move the enemy on the board with the picked speed. 
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
