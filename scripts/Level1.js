class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level1" });
  }

  preload() {
    //Load BG For level
    this.load.image(
      "levelbg",
      "../_backgrounds/skies/skies_1920x1080_FullHD/09_PixelSky_1920x1080.png"
    );

    //Player
    this.load.image("player", "../_sprites/redridinghood/wall_slide_sheet.png");

    //Load Flower Image
    this.load.image("flower", "../_collectables/flowers/094.png");

    //Load image with json
    this.load.image("level1tiles", "../_levels/tilesets/BasicGreen.png");
    this.load.tilemapTiledJSON(
      "level1map",
      "../_levels/tilemaps/level_01.json"
    );
  }

  create() {
    //create background
    const level1_bg = this.add.image(0, 0, "levelbg").setOrigin(0, 0);
    level1_bg.setScale(0.5, 0.5);

    //Make tilemap key must match 'tilemapTiledJSON' name
    const level1_map = this.make.tilemap({ key: "level1map" });
    const level1_tileset = level1_map.addTilesetImage(
      "level_01_platformer",
      "level1tiles"
    );

    //add platform layer
    const platforms = map.createStaticLayer(
      "Platforms",
      level1_tileset,
      0,
      200
    );

    // Layer can collide with other objects
    platforms.setCollisionByExclusion(-1, true);

    //add collision to player
    gameState.player = this.physics.add
      .sprite(100, 550, "player")
      .setScale(0.5);

    //Add Collision to player
    gameState.player.setCollideWorldBounds(true);

    //create cursor keys
    gameState.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    //Add player conditional statements for movement
  }
}
