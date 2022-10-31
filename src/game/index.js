import Phaser from 'phaser';
import { movePlayer } from "./movement"
import { animateMovement } from './animation'

var platforms;
var cursors;
var gameOver = false;

const canvasW = window.innerWidth
const canvasH = window.innerWidth/3
let player = {}
let reflect

class GameScene extends Phaser.Scene {

    preload() {
        //environment assets
        this.load.image('sky', '/assets/bgImg.png');
        this.load.spritesheet('terrain', '/assets/terrain.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('water-reflectL', '/assets/waterReflectL.png', { frameWidth: 170, frameHeight: 10 })

        //character sprites
        this.load.spritesheet('crabby-idle', 'assets/characters/crabby/idle.png', { frameWidth: 72, frameHeight: 29 });
        this.load.spritesheet('crabby-run', 'assets/characters/crabby/run.png', { frameWidth: 72, frameHeight: 29 });
        this.load.spritesheet('crabby-jump', 'assets/characters/crabby/jump.png', { frameWidth: 72, frameHeight: 29 });

    }

    create() {
        let bg = this.add.image(canvasW/2, canvasH/2-40, 'sky');
        bg.displayWidth = canvasW
        bg.displayHeight = canvasH

        reflect = this.physics.add.staticGroup();
        reflect.reflectL = this.add.sprite(canvasW/2, canvasH/1.5, 'water-reflectL').setScale(canvasW/500)

        platforms = this.physics.add.staticGroup();

        //ground
        for (var i = 0; i < 18; i++)
        {
            if (i === 0) {
                platforms.create(canvasW/18 * i, canvasH - canvasW/18, 'terrain', 23).setOrigin(0)
            } else if (i === 17) {
                platforms.create(canvasW/18 * i, canvasH - canvasW/18, 'terrain', 24).setOrigin(0)
            } else {
                platforms.create(canvasW/18 * i, canvasH - canvasW/18, 'terrain', 1).setOrigin(0)
            }
            platforms.children.entries[i].setDisplaySize(canvasW/18,canvasW/18)
            platforms.children.entries[i].body.setSize(platforms.children.entries[i].displayWidth,platforms.children.entries[i].displayHeight)
        }

        //left
        for (var j = 0; j < 4; j++)
        {
            platforms.create(0, (canvasH - canvasW/18*2)-canvasW/18*j, 'terrain', 19).setOrigin(0)
            platforms.children.entries[18+j].setDisplaySize(canvasW/18,canvasW/18)
            platforms.children.entries[18+j].body.setSize(platforms.children.entries[j].displayWidth,platforms.children.entries[j].displayHeight)
        }

        //right
        for (var k = 0; k < 4; k++)
        {
            platforms.create(canvasW-canvasW/18, (canvasH - canvasW/18*2)-canvasW/18*k, 'terrain', 17).setOrigin(0)
            platforms.children.entries[22+k].setDisplaySize(canvasW/18,canvasW/18)
            platforms.children.entries[22+k].body.setSize(platforms.children.entries[k].displayWidth,platforms.children.entries[k].displayHeight)
        }

        //top
        for (var m = 0; m < 18; m++)
        {
            if (m === 0) {
                platforms.create(canvasW/18 * m, 0, 'terrain', 6).setOrigin(0)
            } else if (m === 17) {
                platforms.create(canvasW/18 * m, 0, 'terrain', 7).setOrigin(0)
            } else {
                platforms.create(canvasW/18 * m, 0, 'terrain', 35).setOrigin(0)
            }
            platforms.children.entries[26+m].setDisplaySize(canvasW/18,canvasW/18)
            platforms.children.entries[26+m].body.setSize(platforms.children.entries[m].displayWidth,platforms.children.entries[m].displayHeight)
        }

        //inner terrain 
        for (var n = 0; n < 5; n++) {
            if (n < 3) {
                platforms.create(canvasW/18 * (7+n), canvasH - canvasW/18*2, 'terrain', n).setOrigin(0)
            } else {
                platforms.create(canvasW/18 * 13, canvasH - canvasW/18*(6-n), 'terrain', 4+17*(n-3)).setOrigin(0)
            }
            platforms.children.entries[44+n].setDisplaySize(canvasW/18,canvasW/18)
            platforms.children.entries[44+n].body.setSize(platforms.children.entries[n].displayWidth,platforms.children.entries[n].displayHeight)
        }

        //sprite
        player.sprite = this.physics.add.sprite(canvasW/2, canvasH - platforms.children.entries[1].displayHeight*2, 'crabby-idle')
        player.sprite.setScale(canvasW/500)
        if (player.sprite.displayWidth < 300){
            player.sprite.body.setSize( player.sprite.displayWidth * 0.1, player.sprite.displayHeight * 0.2 )
        }else {
            player.sprite.body.setSize( player.sprite.displayWidth * 0.05, player.sprite.displayHeight * 0.1 )
        }

        // player.sprite.setBounce(0.2);
        player.sprite.setCollideWorldBounds(true);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('crabby-run', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('crabby-idle', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('crabby-jump', { start: 0, end: 2 }),
            frameRate: 25,
            repeat: 0
        });

        this.anims.create({
            key: 'fall',
            frames: [ { key: 'crabby-jump', frame: 3 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'reflectL',
            frames: this.anims.generateFrameNumbers('water-reflectL', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Collide the player with the platforms
        this.physics.add.collider(player.sprite, platforms);

        this.game.events.emit("READY", true)
    }

    update() {
        if (gameOver) {
            return;
        }

        movePlayer(cursors, player.sprite, canvasW);
        animateMovement(cursors, { player: player.sprite, reflect: reflect });
    }

}

export { GameScene }
