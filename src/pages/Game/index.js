import Phaser from "phaser"
import React, { useEffect, useState } from "react"
import { GameScene } from '../../game/index'


const GamePage = () => {
    document.body.style = 'background: rgb(51, 50, 61);';

    const [isReady, setReady] = useState(false)

    useEffect(() => {
        const config = {
            //   callbacks: {
            //     preBoot: game => {
            //       // A good way to get data state into the game.
            //       game.registry.merge(someState)
            //       // This is a good way to catch when that data changes.
            //       game.registry.events.on("changedata", (par, key, val, prevVal) => {
            //         // Simply call whatever functions you want outside.
            //         dataService({ [key]: val })
            //       })
            //     },
            //   },
            type: Phaser.AUTO,
            parent: "phaser-game",
            width: window.innerWidth,
            height: window.innerWidth / 3,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1.6 * window.innerWidth },
                    debug: false
                }
            },
            pixelArt: true,
            scene: [GameScene],
        }

        let game = new Phaser.Game(config)
        // Triggered when game is fully READY.
        game.events.on("READY", setReady)
        // If you don't do this, you get duplicates of the canvas piling up.
        return () => {
            setReady(false)
            game.destroy(true)
        }
    }, [])

    return (
        <>
            <div id="phaser-game" className={isReady ? "visible" : "invisible"} />
        </>
    );
};

export default GamePage