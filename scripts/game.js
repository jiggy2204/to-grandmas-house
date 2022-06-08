const gameState = {
  score: 0,
  flowers: 0,
};

var config = {
  type: Phaser.AUTO,
  width: 768,
  height: 500,
  backgroundColor: "0xb9eaff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    },
  },
  scene: [Level1, GameOver, WinGame],
};

var game = new Phaser.Game(config);
