class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level1" });
  }

  preload() {
    this.load.image(
      "levelbg",
      "../_backgrounds/skies/skies_1920x1080_FullHD/09_PixelSky_1920x1080.png"
    );
    this.load.image("player", "../_sprites/redridinghood/wall_slide_sheet.png");
    this.load.image("level1tiles", "../_backgrounds/tilesets/BasicGreen.png");
    this.load.tilemapTiledJSON("level1map", "../_levels/level_01.json");
  }

  create() {
    //create background
    const level1_bg = this.add.image(0, 0, "levelbg").setOrigin(0, 0);
    level1_bg.setScale(0.5, 0.5);

    const level1_map = this.make.tilemap({ key: "level1map" });
    const level1_tileset = level1_map.addTilesetImage(
      "BasicGreen",
      "level1tiles"
    );

    //add platform layer
    const platforms = map.createStaticLayer(
      "Platforms",
      level1_tileset,
      0,
      200
    );

    //add collision to player
    gameState.player = this.physics.add.sprite(100, 550, "player").setScale(.5);

    //Add Collision to player
    gameState.player.setCollideWorldBounds(true);

    //create cursor keys
    gameState.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    //Add player conditional statements for movement
  }
}
