export const animateMovement = (cursors, gameObjects) => {
    if (gameObjects.player.body.velocity.y < 0 && gameObjects.player.body.touching.down){
        gameObjects.player.anims.play('jump');
    } else if (gameObjects.player.body.velocity.y >= 0 && !gameObjects.player.body.touching.down) {
        gameObjects.player.anims.play('fall');
    } else if (gameObjects.player.body.velocity.x !== 0 && gameObjects.player.body.touching.down) {
        gameObjects.player.anims.play('run', true);
    } 
    else if (gameObjects.player.body.touching.down) {
        gameObjects.player.anims.play('idle', true);
    }

    gameObjects.reflect.reflectL.anims.play('reflectL', true);
};