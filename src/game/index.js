import Phaser from 'phaser';
import { animateMovement } from './animation'
import { socket } from '../socket/index'

let spriteToControl
let spritesInGame = []
let playerObject
let players = {}

let bombs = []
let platforms;
let palmTrees = []
let cursors;

let pressedKeys = []

const canvasW = window.innerWidth
const canvasH = window.innerWidth / 3


let gameData
let username

let reflect = []
let cloud
let cloud2
let otherObjects = []

class GameScene extends Phaser.Scene {

    preload() {
        //environment assets
        this.load.image('sky', '/assets/bgImg.png');
        this.load.spritesheet('terrain', '/assets/terrain.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('front-palm-stem', '/assets/frontPalmStem.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('front-palm', '/assets/frontPalm.png', { frameWidth: 39, frameHeight: 32 })
        this.load.spritesheet('water-reflectL', '/assets/waterReflectL.png', { frameWidth: 170, frameHeight: 10 })
        this.load.spritesheet('water-reflectM', '/assets/waterReflectM.png', { frameWidth: 53, frameHeight: 3 })

        this.load.spritesheet('ship-helm', '/assets/shipHelm.png', { frameWidth: 31, frameHeight: 32 })
        this.load.spritesheet('flag', '/assets/flag.png', { frameWidth: 34, frameHeight: 93 })
        this.load.spritesheet('chest', '/assets/chest.png', { frameWidth: 64, frameHeight: 35 })
        
        this.load.image('big-clouds', '/assets/bigClouds.png');

        //bombs
        this.load.image('bomb', '/assets/bomb.png');
        this.load.spritesheet('bomb-explode', 'assets/bombExplode.png', { frameWidth: 54, frameHeight: 60 });

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

        gameData = JSON.parse(localStorage.getItem('gameData'))
        username = sessionStorage.getItem('username')

        if (socket.id === localStorage.getItem('previousSocket')) {
            for (let i = 0; i < gameData.players.length + 1; i++) {
                if (i < gameData.players.length) {
                    spritesInGame.push(gameData.players[i].character)
                    if (gameData.players[i].user === username) {
                        spriteToControl = gameData.players[i].character
                    }
                } else {
                    spritesInGame.push(gameData.host.character)
                    if (gameData.host.user === username) {
                        spriteToControl = gameData.host.character
                    }
                }
            }
        } else {
            window.location.href = '/home'
        }
    }

    create() {
        let bg = this.add.image(canvasW / 2, canvasH / 2, 'sky');
        bg.displayWidth = canvasW - (canvasW / 18) * 2
        bg.displayHeight = canvasH - (canvasW / 18) * 2

        
        reflect.push(this.add.sprite(canvasW * 0.4, canvasH - (canvasW / 18) * 1.9, 'water-reflectM').setScale(canvasW / 500))
        reflect.push(this.add.sprite(canvasW * 0.15, canvasH - (canvasW / 18) * 1.9, 'water-reflectL').setScale(canvasW / 500))
        reflect.push(this.add.sprite(canvasW * 0.82, canvasH - (canvasW / 18) * 2, 'water-reflectL').setScale(canvasW / 500))


        cloud = this.physics.add.sprite(canvasW / 2, (canvasH / 2) - ((canvasW - (canvasW / 18) * 2) / 4.43) / 3.25, 'big-clouds');
        cloud.displayWidth = canvasW - (canvasW / 18) * 2
        cloud.displayHeight = cloud.displayWidth / 4.43
        cloud.body.setAllowGravity(false);
        cloud.body.velocity.x = (-0.01 * canvasW)

        cloud2 = this.physics.add.sprite((canvasW * 3 / 2) - (canvasW / 18) * 2, (canvasH / 2) - ((canvasW - (canvasW / 18) * 2) / 4.43) / 3.25, 'big-clouds');
        cloud2.displayWidth = canvasW - (canvasW / 18) * 2
        cloud2.displayHeight = cloud2.displayWidth / 4.43
        cloud2.body.setAllowGravity(false);
        cloud2.body.velocity.x = (-0.01 * canvasW)

        otherObjects.push(this.add.sprite((canvasW / 18) * 5.5, (canvasW / 18) * 2.5, 'ship-helm').setDisplaySize(canvasW / 18, canvasW / 18))
        otherObjects.push(this.add.sprite((canvasW / 18) * 11.5, (canvasW / 18) * 2.8, 'flag').setDisplaySize((canvasW / 18), (canvasW / 18)*2.73))
           

        this.add.image((canvasW / 18) * 3, (canvasW / 18) * 5, 'front-palm-stem', 3)
            .setDisplaySize(canvasW / 18, canvasW / 18)
            .setDepth(1)

        this.add.image((canvasW / 18) * 17, (canvasW / 18) * 4, 'front-palm-stem', 2)
            .setDisplaySize(canvasW / 18, canvasW / 18)
            .setDepth(1)
        this.add.image((canvasW / 18) * 16, (canvasW / 18) * 4, 'front-palm-stem', 1)
            .setDisplaySize(canvasW / 18, canvasW / 18)
            .setDepth(1)

        palmTrees.push(this.physics.add.staticSprite((canvasW / 18) * 3, (canvasW / 18) * 4, 'front-palm')
            .setDisplaySize(canvasW / 18, canvasW / 18)
            .setDepth(1))
        palmTrees.push(this.physics.add.staticSprite((canvasW / 18) * 16, (canvasW / 18) * 3, 'front-palm')
            .setDisplaySize(canvasW / 18, canvasW / 18)
            .setDepth(1))

        palmTrees[0].body
            .setSize(palmTrees[0].displayWidth, palmTrees[0].displayHeight * 0.2)
            .setOffset(-palmTrees[0].displayWidth * 0.3, -palmTrees[0].displayHeight * 0.5)
        palmTrees[1].body
            .setSize(palmTrees[1].displayWidth, palmTrees[1].displayHeight * 0.2)
            .setOffset(-palmTrees[1].displayWidth * 0.3, -palmTrees[1].displayHeight * 0.5)

        platforms = this.physics.add.staticGroup();

        // ground terrain 
        for (let i = 0; i < 18; i++) {
            if (i === 0) {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 23).setOrigin(0)
            } else if (i > 8 && i < 12) {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 18).setOrigin(0)
            } else if (i === 5) {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 18).setOrigin(0)
            } else if (i === 8) {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 24).setOrigin(0)
            } else if (i === 12) {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 23).setOrigin(0)
            } else if (i === 17) {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 24).setOrigin(0)
            } else {
                platforms.create(canvasW / 18 * i, canvasH - canvasW / 18, 'terrain', 1).setOrigin(0)
            }
            platforms.children.entries[i].setDisplaySize(canvasW / 18, canvasW / 18)
            platforms.children.entries[i].body
                .setSize(platforms.children.entries[i].displayWidth, platforms.children.entries[i].displayHeight)
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
        for (let n = 0; n < 10; n++) {
            if (n === 0) {
                platforms.create(canvasW / 18 * 5, canvasH - canvasW / 18 * 2, 'terrain', 21).setOrigin(0)
            } else if (n === 1) {
                platforms.create(canvasW / 18 * (7 + n), canvasH - canvasW / 18 * 2, 'terrain', 0).setOrigin(0)
            } else if (n === 2) {
                platforms.create(canvasW / 18 * (7 + n), canvasH - canvasW / 18 * 2, 'terrain', 1).setOrigin(0)
            } else if (n < 5) {
                platforms.create(canvasW / 18 * (7 + n), canvasH - canvasW / 18 * 2, 'terrain', 27 - n).setOrigin(0)
            } else if (n === 5) {
                platforms.create(canvasW / 18 * (7 + n), canvasH - canvasW / 18 * 2, 'terrain', 2).setOrigin(0)
            } else if (n === 6) {
                platforms.create(canvasW / 18 * 5, canvasH - canvasW / 18 * 3, 'terrain', 4).setOrigin(0)
            } else if (n === 7) {
                platforms.create(canvasW / 18 * 10, canvasH - canvasW / 18 * 3, 'terrain', 0).setOrigin(0)
            } else if (n === 8) {
                platforms.create(canvasW / 18 * 11, canvasH - canvasW / 18 * 3, 'terrain', 2).setOrigin(0)
            } else if (n === 9) {
                platforms.create(canvasW / 18 * 5, canvasH - canvasW / 18, 'terrain', 38).setOrigin(0)
            }
            platforms.children.entries[44 + n].setDisplaySize(canvasW / 18, canvasW / 18)
            platforms.children.entries[44 + n].body.setSize(platforms.children.entries[n].displayWidth, platforms.children.entries[n].displayHeight)
        }

        //sprite
        if (spritesInGame.includes("captain")) {
            players.captain = this.physics.add.sprite(canvasW / 2, canvasH - platforms.children.entries[1].displayHeight * 3, 'captain-idle').setScale(canvasW / 500).setDepth(0.5)
            if (players.captain.displayWidth < 300) {
                players.captain.body.setSize(players.captain.displayWidth * 0.1, players.captain.displayHeight * 0.1)
            } else {
                players.captain.body.setSize(players.captain.displayWidth * 0.05, players.captain.displayHeight * 0.07)
            }

            players.captain.setCollideWorldBounds(true);
            this.physics.add.collider(players.captain, platforms);
            this.physics.add.collider(players.captain, palmTrees[0]);
            this.physics.add.collider(players.captain, palmTrees[1]);
            if (spriteToControl === 'captain') {
                playerObject = players.captain
            }
        }

        if (spritesInGame.includes("crabby")) {
            players.crabby = this.physics.add.sprite(canvasW / 2, canvasH - platforms.children.entries[1].displayHeight * 3, 'crabby-idle').setScale(canvasW / 500).setDepth(0.5)
            if (players.crabby.displayWidth < 300) {
                players.crabby.body.setSize(players.crabby.displayWidth * 0.1, players.crabby.displayHeight * 0.2)
            } else {
                players.crabby.body.setSize(players.crabby.displayWidth * 0.05, players.crabby.displayHeight * 0.1)
            }

            players.crabby.setCollideWorldBounds(true);
            this.physics.add.collider(players.crabby, platforms);
            this.physics.add.collider(players.crabby, palmTrees[0]);
            this.physics.add.collider(players.crabby, palmTrees[1]);
            if (spriteToControl === 'crabby') {
                playerObject = players.crabby
            }
        }

        if (spritesInGame.includes("pinkie")) {
            players.pinkie = this.physics.add.sprite(canvasW / 2, canvasH - platforms.children.entries[1].displayHeight * 3, 'pinkie-idle').setScale(canvasW / 500).setDepth(0.5)
            if (players.pinkie.displayHeight < 150) {
                players.pinkie.body.setSize(players.pinkie.displayWidth * 0.1, players.pinkie.displayHeight * 0.15)
            } else {
                players.pinkie.body.setSize(players.pinkie.displayWidth * 0.1, players.pinkie.displayHeight * 0.1)
            }

            players.pinkie.setCollideWorldBounds(true);
            this.physics.add.collider(players.pinkie, platforms);
            this.physics.add.collider(players.pinkie, palmTrees[0]);
            this.physics.add.collider(players.pinkie, palmTrees[1]);
            if (spriteToControl === 'pinkie') {
                playerObject = players.pinkie
            }
        }

        if (spritesInGame.includes("toothy")) {
            players.toothy = this.physics.add.sprite(canvasW / 2, canvasH - platforms.children.entries[1].displayHeight * 3, 'toothy-idle').setScale(canvasW / 500).setDepth(0.5)
            if (players.toothy.displayHeight < 150) {
                players.toothy.body.setSize(players.toothy.displayWidth * 0.1, players.toothy.displayHeight * 0.15)
            } else {
                players.toothy.body.setSize(players.toothy.displayWidth * 0.1, players.toothy.displayHeight * 0.1)
            }

            players.toothy.setCollideWorldBounds(true);
            this.physics.add.collider(players.toothy, platforms);
            this.physics.add.collider(players.toothy, palmTrees[0]);
            this.physics.add.collider(players.toothy, palmTrees[1]);
            if (spriteToControl === 'toothy') {
                playerObject = players.toothy
            }
        }

        //chest
        if (!!playerObject) {
            otherObjects.push(this.physics.add.sprite((canvasW / 18) * 15, (canvasW / 18) * 4.5, 'chest').setDisplaySize((canvasW / 18)*1.83, (canvasW / 18)))
            otherObjects[2].body.setAllowGravity(false);
            this.physics.add.overlap(playerObject, otherObjects[2], chestHover);
        }

        // bombs
        if (!!playerObject && !!gameData.bombSpeeds) {
            for (let i = 0; i < gameData.bombSpeeds.length; i++) {
                bombs.push(this.physics.add.sprite(canvasW - (canvasW / 18) * 2, canvasH - (canvasW / 18) * 2, 'bomb').setScale(canvasW / 500))

                bombs[i].body.setAllowGravity(false);
                bombs[i].setCollideWorldBounds(true);
                this.physics.add.collider(bombs[i], platforms);
                bombs[i].setVelocityX(-(gameData.bombSpeeds[i].x) * canvasW)
                bombs[i].setVelocityY((gameData.bombSpeeds[i].y) * canvasW)
                bombs[i].setBounce(1);

                this.physics.add.overlap(playerObject, bombs[i], hitBomb);
            }
        }

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
                key: 'reflectM',
                frames: this.anims.generateFrameNumbers('water-reflectM', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'reflectL',
                frames: this.anims.generateFrameNumbers('water-reflectL', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'bomb-explode',
                frames: this.anims.generateFrameNumbers('bomb-explode', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: 0
            },
            {
                key: 'front-palm',
                frames: this.anims.generateFrameNumbers('front-palm', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'ship-helm',
                frames: this.anims.generateFrameNumbers('ship-helm', { start: 0, end: 19 }),
                frameRate: 6,
                repeat: -1
            },
            {
                key: 'flag',
                frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 8 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'chest',
                frames: this.anims.generateFrameNumbers('chest', { start: 0, end: 9 }),
                frameRate: 6,
                repeat: 0
            },
        ]

        for (let animIndex = 0; animIndex < animations.length; animIndex++) {
            this.anims.create(animations[animIndex])
        }

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        this.game.events.emit("READY", true)

        socket.on('move', (data) => {
            const velocityX = data.velocityX * canvasW

            let otherPlayer = getPlayer(data.character)

            function getPlayer(character) {
                if (character === 'captain') {
                    return players.captain
                } else if (character === 'crabby') {
                    return players.crabby
                } else if (character === 'pinkie') {
                    return players.pinkie
                } else if (character === 'toothy') {
                    return players.toothy
                }
            }

            if (velocityX > 0) {
                otherPlayer.flipX = true;
            } else if (velocityX < 0) {
                otherPlayer.flipX = false;
            }

            otherPlayer.setVelocityX(velocityX)
        });

        socket.on('moveEnd', (data) => {
            const newX = data.x * canvasW
            const newY = data.y * canvasH
            let otherPlayer = getPlayer(data.character)

            function getPlayer(character) {
                if (character === 'captain') {
                    return players.captain
                } else if (character === 'crabby') {
                    return players.crabby
                } else if (character === 'pinkie') {
                    return players.pinkie
                } else if (character === 'toothy') {
                    return players.toothy
                }
            }

            otherPlayer.setVelocityX(0)
            otherPlayer.x = newX
            otherPlayer.y = newY
        });

        socket.on('jump', (data) => {
            let otherPlayer = getPlayer(data.character)

            function getPlayer(character) {
                if (character === 'captain') {
                    return players.captain
                } else if (character === 'crabby') {
                    return players.crabby
                } else if (character === 'pinkie') {
                    return players.pinkie
                } else if (character === 'toothy') {
                    return players.toothy
                }
            }

            otherPlayer.setVelocityY(-0.6 * canvasW)
        });

        socket.on('bomb explode', (data) => {
            let otherPlayer = getPlayer(data.character)

            function getPlayer(character) {
                if (character === 'captain') {
                    return players.captain
                } else if (character === 'crabby') {
                    return players.crabby
                } else if (character === 'pinkie') {
                    return players.pinkie
                } else if (character === 'toothy') {
                    return players.toothy
                }
            }

            bombs[data.bombHit].anims.play('bomb-explode');
            otherPlayer.visible = false;
            setTimeout(() => bombs[data.bombHit].destroy(), 1000)
        });
    }

    update() {
        if (cloud.x <= (-(canvasW / 2) + (canvasW / 18) * 2)) {
            cloud.x = (canvasW * 3 / 2) - (canvasW / 18) * 2
        }

        if (cloud2.x <= (-(canvasW / 2) + (canvasW / 18) * 2)) {
            cloud2.x = (canvasW * 3 / 2) - (canvasW / 18) * 2
        }

        if (!!playerObject) {

            if (cursors.left.isDown && !pressedKeys.includes(cursors.left.keyCode)) {
                playerObject.setVelocityX(-0.3 * canvasW);
                playerObject.flipX = false;

                socket.emit("move", { velocityX: playerObject.body.velocity.x / canvasW, character: spriteToControl, roomID: gameData.roomID })
                pressedKeys.push(cursors.left.keyCode)
            } else if (cursors.left.isUp && pressedKeys.includes(cursors.left.keyCode)) {
                playerObject.setVelocityX(0);

                socket.emit('moveEnd', { x: playerObject.x / canvasW, y: playerObject.y / canvasH, character: spriteToControl, roomID: gameData.roomID });
                pressedKeys = pressedKeys.filter(key => key !== cursors.left.keyCode);
            }

            if (cursors.right.isDown && !pressedKeys.includes(cursors.right.keyCode)) {
                playerObject.setVelocityX(0.3 * canvasW);
                playerObject.flipX = true;

                socket.emit("move", { velocityX: playerObject.body.velocity.x / canvasW, character: spriteToControl, roomID: gameData.roomID })
                pressedKeys.push(cursors.right.keyCode)
            } else if (cursors.right.isUp && pressedKeys.includes(cursors.right.keyCode)) {
                playerObject.setVelocityX(0);

                socket.emit('moveEnd', { x: playerObject.x / canvasW, y: playerObject.y / canvasH, character: spriteToControl, roomID: gameData.roomID });
                pressedKeys = pressedKeys.filter(key => key !== cursors.right.keyCode);
            }

            if (cursors.up.isDown && playerObject.body.touching.down) {
                playerObject.setVelocityY(-0.6 * canvasW);
                socket.emit("jump", { character: spriteToControl, roomID: gameData.roomID })
            }

            if (spritesInGame.includes("captain")) {
                animateMovement({ player: players.captain }, "captain");
            }
            if (spritesInGame.includes("crabby")) {
                animateMovement({ player: players.crabby }, "crabby");
            }
            if (spritesInGame.includes("pinkie")) {
                animateMovement({ player: players.pinkie }, "pinkie");
            }
            if (spritesInGame.includes("toothy")) {
                animateMovement({ player: players.toothy }, "toothy");
            }

            reflect[0].anims.play('reflectM', true);
            reflect[1].anims.play('reflectL', true);
            reflect[2].anims.play('reflectL', true);
            palmTrees[0].anims.play('front-palm', true);
            palmTrees[1].anims.play('front-palm', true);
            otherObjects[0].anims.play('ship-helm', true);
            otherObjects[1].anims.play('flag', true);
            
        }
    }

}

function hitBomb(player, bomb) {
    if (player === playerObject) {
        let bombIndex = bombs.indexOf(bomb)
        player.body.debugBodyColor = 0x0099ff
        bomb.body.debugBodyColor = 0x0099ff
        socket.emit('bomb explode', { bombHit: bombIndex, character: spriteToControl, roomID: gameData.roomID });
        window.location.href = '/home'
        alert('You died')
    }
}

function chestHover() {
    otherObjects[2].anims.play('chest', true);
}

export { GameScene }
