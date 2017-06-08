/* hepl-mmi/ Pong
*
* /game.js - Pong main class
*
* coded by Képhren SIMONIS!
* started at 02/06/2017
*/
const SPRITESHEET_PATH = "./resources/sprite.png";

class Pong{
    constructor( { canvas, context, width, height } ) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.context = context;
        this.animationRequestId = null;

        this.context.fillStyle = "#BB9D6D";

        this.key = new Key();
    
        this.p1 = new Paddle( 5, 0 );
        this.p1.y = this.height / 2 - this.p1.height / 2;
        this.display1 = new Display( this.width / 4, 25 );

        this.p2 = new Paddle( this.width - 5 - 10, 0 );
        this.p2.y = this.height / 2 - this.p2.height / 2;
        this.display2 = new Display( this.width * 3 / 4, 25 );
        
        this.ball = new Ball();
        this.ball.x = this.width / 2;
        this.ball.y = this.height / 2;
        this.ball.vy = Math.floor( Math.random() * 12 - 6 );
        this.ball.vx = 7 - Math.abs( this.ball.vy );

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener( "load", () => {
            this.setup();
        } );
        this.sprites.src = SPRITESHEET_PATH;
    }

    setup() {
        this.reset();

        // this.canvas.addEventListener( "click", this.handleAction.bind( this ) );
        // document.addEventListener( "keyup", this.handleAction.bind( this ) );

        this.animate();
    }

    reset() {
        // this.starting = new Starting();
        this.apaddle = new Paddle();
        this.ball = new Ball();
        this.display = new Display();
        this.key = new Key();

        // this.started = false;
        // this.display.value = 0;
    }

    draw() {
        this.context.clearRect( 0, 0, this.width, this.height );
        this.context.fillRect( this.width / 2, 0, 5, this.height );
        
        // if ( this.started ) {
        //     this.ball.draw( this.context );
        // } else {
        //     this.starting.draw( this );
        // }
        this.ball.draw( this.context );
        this.p1.draw( this.context );
        this.p2.draw( this.context );
        this.display1.draw( this.context );
        this.display2.draw( this.context );
    }

    update(){

        this.display1.value = this.p1.score;
        this.display2.value = this.p2.score;
     
        // Déplacement du joueur de droite grâce aux touches S & W
        if ( this.key.isPressed( 87 ) ) { // W pour aller vers le bas
            this.p1.y = Math.min( this.height - this.p1.height, this.p1.y + 4 );
        } else if ( this.key.isPressed( 83 ) ) { // S pour aller vers le haut
            this.p1.y = Math.max( 0, this.p1.y - 4 );
        }
        // Déplacement du joueur de gauche grâce aux flèches aute et basse
        if ( this.key.isPressed( 40 ) ) { // Flèche du bas
            this.p2.y = Math.min( this.height - this.p2.height, this.p2.y + 4 );
        } else if ( this.key.isPressed( 38 ) ) { // Flèche du haut
            this.p2.y = Math.max( 0, this.p2.y - 4 );
        }

        // if ( this.started ) {
            this.ball.update();
        // }
        if ( this.ball.x > this.width || this.ball.x + this.ball.width < 0 ) {
            this.ball.vx = -this.ball.vx;
        } else if ( this.ball.y > this.height || this.ball.y + this.ball.height < 0 ) {
            this.ball.vy = -this.ball.vy;
        }
     
        if ( this.ball.vx > 0 ) {
            if ( this.p2.x <= this.ball.x + this.ball.width &&
                    this.p2.x > this.ball.x - this.ball.vx + this.ball.width ) {
                var collisionDiff = this.ball.x + this.ball.width - this.p2.x;
                var k = collisionDiff / this.ball.vx;
                var y = this.ball.vy * k + ( this.ball.y - this.ball.vy );
                if ( y >= this.p2.y && y + this.ball.height <= this.p2.y + this.p2.height ) {
                    // Collisions avec le bâton dujoeur de droite
                    this.ball.x = this.p2.x - this.ball.width;
                    this.ball.y = Math.floor( this.ball.y - this.ball.vy + this.ball.vy * k );
                    this.ball.vx = -this.ball.vx;
                }
            }
        } else {
            if ( this.p1.x + this.p1.width >= this.ball.x ) {
                var collisionDiff = this.p1.x + this.p1.width - this.ball.x;
                var k = collisionDiff / -this.ball.vx;
                var y = this.ball.vy * k + ( this.ball.y - this.ball.vy );
                if ( y >= this.p1.y && y + this.ball.height <= this.p1.y + this.p1.height ) {
                    // Collisions avec le bâton du joueur de gauche
                    this.ball.x = this.p1.x + this.p1.width;
                    this.ball.y = Math.floor( this.ball.y - this.ball.vy + this.ball.vy * k);
                    this.ball.vx = -this.ball.vx;
                }
            }
        }
     
        // Collisions avec le haut et le bas du canvas
        if ( ( this.ball.vy < 0 && this.ball.y < 0 ) || ( this.ball.vy > 0 && this.ball.y + this.ball.height > this.height ) ) {
            this.ball.vy = -this.ball.vy;
        }
        
        if ( this.ball.x >= this.width )
            this.score( this.p1 );
        else if ( this.ball.x + this.ball.width <= 0 )
            this.score( this.p2 );
    }

    score(p){
        // Score
        p.score++;
        var player = p == this.p1 ? 0 : 1;
     
        // Position de la balle
        this.ball.x = this.width / 2;
        this.ball.y = this.height / 2;
     
        // Vitesse de la balle
        this.ball.vy = Math.floor( Math.random() * 12 - 8 );
        this.ball.vx = 10 - Math.abs( this.ball.vy );
        if ( player == 1 )
            this.ball.vx *= -1;
    }

    animate() {
        //loop
        this.animationRequestId = window.requestAnimationFrame( this.animate.bind( this ) );
        // update
        this.update();
        // draw
        this.draw();
    }

    // handleAction( oEvent ) {
    //     if ( oEvent.type === "keyup" && oEvent.keyCode !== 32 ) {
    //         return;
    //     }

    //     if ( this.started ) {
    //         this.ball.handleAction();
    //     } else {
    //         this.started = true;
    //     }
    // }
    // drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } ) {
        // this.context.drawImage( this.sprites, sx, sy, sw, sh, dx, dy, dw, dh );
    // }
}
