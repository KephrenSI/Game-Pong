/* hepl-mmi/ Pong
*
* /game.js - Pong Ball class
*
* coded by Képhren SIMONIS!
* started at 02/06/2017
*/

class Ball {
    constructor( x, y ) {
    	this.x = -10; // Bug: je n'arrive pas à faire bouger la balle sans l'initialise avec une valeur négative donc le joueur 1 commence avec un point de retard sur le joueur 2 !
	    this.y = 0;
	    this.vx = 0;
	    this.vy = 0;
	    this.width = 10;
	    this.height = 10; 
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(game) {
        let{ x, y, width, height } = this;
        
        game.fillRect( x, y, width, height );
    }

    // handleAction() {
    //     this.x = -10; // Bug: je n'arrive pas à faire bouger la balle sans l'initialise avec une valeur négative donc le joueur 1 commence avec un point de retard sur le joueur 2 !
    // }

}
