export const animateMovement = (cursors, player) => {
    if (player.body.velocity.y < 0 && player.body.touching.down){
        player.anims.play('jump');
    } else if (player.body.velocity.y >= 0 && !player.body.touching.down) {
        player.anims.play('fall');
    } else if (player.body.velocity.x !== 0 && player.body.touching.down) {
        player.anims.play('run', true);
    } 
    else if (player.body.touching.down) {
        player.anims.play('idle', true);
    }
};