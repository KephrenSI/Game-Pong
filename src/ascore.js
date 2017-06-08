/* hepl-mmi/ Pong
*
* /game.js - Pong Display class
*
* coded by Képhren SIMONIS!
* started at 02/06/2017
*/

class Display {
    constructor( x, y ) {
        this.x = x;
        this.y = y;
        this.value = 0;
    }

    draw(game) {
    	let{ x, y, value } = this;
		game.font = "20px Helvetica";
		game.textBaseline = "top";
    	game.fillText( value, x, y );
    }
}
