export const animateMovement = (gameObjects, sprite) => {
    if (gameObjects.player.body.velocity.y < 0 && gameObjects.player.body.touching.down){
        gameObjects.player.anims.play(sprite+'-jump');
    } else if (gameObjects.player.body.velocity.y >= 0 && !gameObjects.player.body.touching.down) {
        gameObjects.player.anims.play(sprite+'-fall');
    } else if (gameObjects.player.body.velocity.x !== 0 && gameObjects.player.body.touching.down) {
        gameObjects.player.anims.play(sprite+'-run', true);
    } 
    else if (gameObjects.player.body.touching.down) {
        gameObjects.player.anims.play(sprite+'-idle', true);
    }

    gameObjects.reflect.reflectL.anims.play('reflectL', true);
};
