/* hepl-mmi/ Pong
*
* /game.js - Pong aKey class
*
* coded by Képhren SIMONIS!
* started at 02/06/2017
*/

class Key {
    constructor() {
        this.pressedKeys = [];
 
        this.keydown = function( e ) {
            this.pressedKeys[ e.keyCode ] = true;
        };
     
        this.keyup = function( e ) {
            this.pressedKeys[ e.keyCode ] = false;
        };
     
        document.addEventListener( "keydown", this.keydown.bind( this ) );
        document.addEventListener( "keyup", this.keyup.bind( this ) );
    }

    isPressed( key ) {
        return this.pressedKeys[key] ? true : false;
    }

    addKeyPressListener( keyCode, callback ) {
        document.addEventListener( "keypress", function( e ) {
        if ( e.keyCode == keyCode )
            callback(e);
        } );
    }
}
