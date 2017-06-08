/* hepl-mmi/ Pong
*
* /game.js - Pong Paddle class
*
* coded by Képhren SIMONIS!
* started at 02/06/2017
*/

class Paddle {
    constructor( x, y ) {
        this.x = x;
	    this.y = y;
	    this.width = 10;
	    this.height = 100;
	    this.score = 0;
    }

    draw(game) {
        let{ x, y, width, height } = this;

        game.fillRect( x, y, width, height );
    }
}
