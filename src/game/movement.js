export const movePlayer = (cursors, player, canvasW) => {
  let playerMoved = false

  if (cursors.left.isDown) {
    player.setVelocityX(-0.3*canvasW);
    player.flipX = false;
    playerMoved = true;
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(0.3*canvasW);
    player.flipX = true;
    playerMoved = true;
  }
  else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-0.6*canvasW);
    playerMoved = true;
  }

  return playerMoved
};