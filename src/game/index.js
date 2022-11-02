import Phaser from 'phaser';
import { movePlayer } from "./movement"
import { animateMovement } from './animation'
import { socket } from '../socket/index'

var platforms;
var cursors;
var gameOver = false;

const spriteToControl = 'pinkie'
const canvasW = window.innerWidth
const canvasH = window.innerWidth / 3
let player = {}
let reflect
let playerObject

class GameScene extends Phaser.Scene {

    preload() {
        //environment assets
        this.load.image('sky', '/assets/bgImg.png');
        this.load.spritesheet('terrain', '/assets/terrain.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('water-reflectL', '/assets/waterReflectL.png', { frameWidth: 170, frameHeight: 10 })

        //captain sprites
        this.load.spritesheet('captain-idle', 'assets/characters/captain/idle.png', { frameWidth: 64, frameHeight: 40 });
        this.load.spritesheet('captain-run', 'assets/characters/captain/run.png', { frameWidth: 64, frameHeight: 40 });
        this.load.spritesheet('captain-jump', 'assets/characters/captain/jump.png', { frameWidth: 64, frameHeight: 40 });

        //crabby sprites
        this.load.spritesheet('crabby-idle', 'assets/characters/crabby/idle.png', { frameWidth: 72, frameHeight: 29 });
        this.load.spritesheet('crabby-run', 'assets/characters/crabby/run.png', { frameWidth: 72, frameHeight: 29 });
        this.load.spritesheet('crabby-jump', 'assets/characters/crabby/jump.png', { frameWidth: 72, frameHeight: 29 });

        //pinkie sprites
        this.load.spritesheet('pinkie-idle', 'assets/characters/pinkie/idle.png', { frameWidth: 34, frameHeight: 30 });
        this.load.spritesheet('pinkie-run', 'assets/characters/pinkie/run.png', { frameWidth: 34, frameHeight: 30 });
        this.load.spritesheet('pinkie-jump', 'assets/characters/pinkie/jump.png', { frameWidth: 34, frameHeight: 30 });

        //toothy sprites
        this.load.spritesheet('toothy-idle', 'assets/characters/toothy/idle.png', { frameWidth: 34, frameHeight: 30 });
        this.load.spritesheet('toothy-run', 'assets/characters/toothy/run.png', { frameWidth: 34, frameHeight: 30 });
        this.load.spritesheet('toothy-jump', 'assets/characters/toothy/jump.png', { frameWidth: 34, frameHeight: 30 });
    }

    create() {
        let bg = this.add.image(canvasW / 2, canvasH / 2 - 40, 'sky');
        bg.displayWidth = canvasW
        bg.displayHeight = canvasH

        reflect = this.physics.add.staticGroup();
        reflect.reflectL = this.add.sprite(canvasW / 2, canvasH / 1.5, 'water-reflectL').setScale(canvasW / 500)

        platforms = this.physics.add.staticGroup();

        // ground terrain 
        for (let i = 0; i < 18; i++) {
            if (i === 0) {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 23).setOrigin(0)
            } else if (i === 17) {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 24).setOrigin(0)
            } else {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 1).setOrigin(0)
            }
            platforms.children.entries[i].setDisplaySize(canvasW / 18, canvasW / 18)
            platforms.children.entries[i].body.setSize(platforms.children.entries[i].displayWidth, platforms.children.entries[i].displayHeight)
        }

        // left terrain 
        for (let j = 0; j < 4; j++) {
            platforms.create(0, (canvasH - canvasW / 18 * 2) - canvasW / 18 * j, 'terrain', 19).setOrigin(0)
            platforms.children.entries[18 + j].setDisplaySize(canvasW / 18, canvasW / 18)
            platforms.children.entries[18 + j].body.setSize(platforms.children.entries[j].displayWidth, platforms.children.entries[j].displayHeight)
        }

        // right terrain 
        for (let k = 0; k < 4; k++) {
            platforms.create(canvasW - canvasW / 18, (canvasH - canvasW / 18 * 2) - canvasW / 18 * k, 'terrain', 17).setOrigin(0)
            platforms.children.entries[22 + k].setDisplaySize(canvasW / 18, canvasW / 18)
            platforms.children.entries[22 + k].body.setSize(platforms.children.entries[k].displayWidth, platforms.children.entries[k].displayHeight)
        }

        // top terrain 
        for (let m = 0; m < 18; m++) {
            if (m === 0) {
                platforms.create(canvasW / 18 * m, 0, 'terrain', 6).setOrigin(0)
            } else if (m === 17) {
                platforms.create(canvasW / 18 * m, 0, 'terrain', 7).setOrigin(0)
            } else {
                platforms.create(canvasW / 18 * m, 0, 'terrain', 35).setOrigin(0)
            }
            platforms.children.entries[26 + m].setDisplaySize(canvasW / 18, canvasW / 18)
            platforms.children.entries[26 + m].body.setSize(platforms.children.entries[m].displayWidth, platforms.children.entries[m].displayHeight)
        }

        //inner terrain 
        for (let n = 0; n < 5; n++) {
            if (n < 3) {
                platforms.create(canvasW / 18 * (7 + n), canvasH - canvasW / 18 * 2, 'terrain', n).setOrigin(0)
            } else {
                platforms.create(canvasW / 18 * 13, canvasH - canvasW / 18 * (6 - n), 'terrain', 4 + 17 * (n - 3)).setOrigin(0)
            }
            platforms.children.entries[44 + n].setDisplaySize(canvasW / 18, canvasW / 18)
            platforms.children.entries[44 + n].body.setSize(platforms.children.entries[n].displayWidth, platforms.children.entries[n].displayHeight)
        }

        //sprite
        player.captain = this.physics.add.sprite(canvasW / 2, canvasH - platforms.children.entries[1].displayHeight * 3, 'captain-idle').setScale(canvasW / 500)
        console.log(player.captain.displayWidth)
        if (player.captain.displayWidth < 300) {
            player.captain.body.setSize(player.captain.displayWidth * 0.1, player.captain.displayHeight * 0.1)
        } else {
            player.captain.body.setSize(player.captain.displayWidth * 0.05, player.captain.displayHeight * 0.07)
        }

        player.crabby = this.physics.add.sprite(canvasW / 2, canvasH - platforms.children.entries[1].displayHeight * 3, 'crabby-idle').setScale(canvasW / 500)
        if (player.crabby.displayWidth < 300) {
            player.crabby.body.setSize(player.crabby.displayWidth * 0.1, player.crabby.displayHeight * 0.2)
        } else {
            player.crabby.body.setSize(player.crabby.displayWidth * 0.05, player.crabby.displayHeight * 0.1)
        }

        player.pinkie = this.physics.add.sprite(canvasW / 2, canvasH - platforms.children.entries[1].displayHeight * 3, 'pinkie-idle').setScale(canvasW / 500)
        if (player.pinkie.displayHeight < 150) {
            player.pinkie.body.setSize(player.pinkie.displayWidth * 0.1, player.pinkie.displayHeight * 0.15)
        } else {
            player.pinkie.body.setSize(player.pinkie.displayWidth * 0.1, player.pinkie.displayHeight * 0.1)
        }

        player.toothy = this.physics.add.sprite(canvasW / 2, canvasH - platforms.children.entries[1].displayHeight * 3, 'toothy-idle').setScale(canvasW / 500)
        if (player.toothy.displayHeight < 150) {
            player.toothy.body.setSize(player.toothy.displayWidth * 0.1, player.toothy.displayHeight * 0.15)
        } else {
            player.toothy.body.setSize(player.toothy.displayWidth * 0.1, player.toothy.displayHeight * 0.1)
        }

        //  Sprite collisions
        player.captain.setCollideWorldBounds(true);
        player.crabby.setCollideWorldBounds(true);
        player.pinkie.setCollideWorldBounds(true);
        player.toothy.setCollideWorldBounds(true);
        
        this.physics.add.collider(player.captain, platforms);
        this.physics.add.collider(player.crabby, platforms);
        this.physics.add.collider(player.pinkie, platforms);
        this.physics.add.collider(player.toothy, platforms);
        

        // defining animations
        const animations = [
            {
                key: 'captain-run',
                frames: this.anims.generateFrameNumbers('captain-run', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'captain-idle',
                frames: this.anims.generateFrameNumbers('captain-idle', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'captain-jump',
                frames: this.anims.generateFrameNumbers('captain-jump', { start: 0, end: 2 }),
                frameRate: 25,
                repeat: 0
            },
            {
                key: 'captain-fall',
                frames: [{ key: 'captain-jump', frame: 3 }],
                frameRate: 20
            },
            {
                key: 'crabby-run',
                frames: this.anims.generateFrameNumbers('crabby-run', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'crabby-idle',
                frames: this.anims.generateFrameNumbers('crabby-idle', { start: 0, end: 8 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'crabby-jump',
                frames: this.anims.generateFrameNumbers('crabby-jump', { start: 0, end: 2 }),
                frameRate: 25,
                repeat: 0
            },
            {
                key: 'crabby-fall',
                frames: [{ key: 'crabby-jump', frame: 3 }],
                frameRate: 20
            },
            {
                key: 'pinkie-run',
                frames: this.anims.generateFrameNumbers('pinkie-run', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'pinkie-idle',
                frames: this.anims.generateFrameNumbers('pinkie-idle', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'pinkie-jump',
                frames: this.anims.generateFrameNumbers('pinkie-jump', { start: 0, end: 2 }),
                frameRate: 25,
                repeat: 0
            },
            {
                key: 'pinkie-fall',
                frames: [{ key: 'pinkie-jump', frame: 3 }],
                frameRate: 20
            },
            {
                key: 'toothy-run',
                frames: this.anims.generateFrameNumbers('toothy-run', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'toothy-idle',
                frames: this.anims.generateFrameNumbers('toothy-idle', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'toothy-jump',
                frames: this.anims.generateFrameNumbers('toothy-jump', { start: 0, end: 2 }),
                frameRate: 25,
                repeat: 0
            },
            {
                key: 'toothy-fall',
                frames: [{ key: 'toothy-jump', frame: 3 }],
                frameRate: 20
            },
            {
                key: 'reflectL',
                frames: this.anims.generateFrameNumbers('water-reflectL', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            }
        ]

        for (let animIndex = 0; animIndex < animations.length; animIndex++) {
            this.anims.create(animations[animIndex])
        }

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        this.game.events.emit("READY", true)
    }

    update() {
        if (gameOver) {
            return;
        }

        if (spriteToControl === 'captain') {
            playerObject = player.captain
        } else if (spriteToControl === 'crabby') {
            playerObject = player.crabby
        } else if (spriteToControl === 'pinkie'){
            playerObject = player.pinkie
        } else if (spriteToControl === 'toothy'){
            playerObject = player.toothy
        }
        const playerMoved = movePlayer(cursors, playerObject, canvasW);
        animateMovement({ player: playerObject, reflect: reflect }, spriteToControl);

        // if (playerMoved) {
        //     socket.emit("move", { x: player.crabby.x, y: player.crabby.y })
        //     player.movedLastFrame = true
        //     console.log(player.crabby.x, player.crabby.y)
        // }

        // else {
        //     if(player.movedLastFrame) {
        //         socket.emit("moveEnd")
        //     }
        //     player.movedLastFrame = false
        // }

        
    }

}

export { GameScene }
