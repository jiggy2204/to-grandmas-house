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
    this.load.atlas(
      "player",
      "../_sprites/redridinghood/sprite_red_itch.png",
      "../_sprites/redridinghood/sprite_red_itch.json"
    );

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
    // if game is playable (not game over)
    gameState.active = true;

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
    const platforms = level1_map.createStaticLayer(
      "Platforms",
      level1_tileset,
      0,
      0
    );

    // Layer can collide with other objects
    platforms.setCollisionByExclusion(-1, true);

    //Layer can collide with sprite
    this.physics.add.collider(gameState.player, platforms);

    //ANIMATIONS FOR PLAYER
    var idle = this.textures.addSpriteSheetFromAtlas("idle", {
      atlas: "player",
      frame: "idle_sheet-Sheet",
      frameWidth: 75,
      frameHeight: 100,
      endFrame: 12,
    });

    var idleConfig = {
      key: "idle-anim",
      frames: this.anims.generateFrameNumbers("idle", {
        start: 0,
        end: 23,
        first: 23,
      }),
      frameRate: 15,
      repeat: -1,
    };

    this.anims.create(idleConfig);
    this.add.sprite(50, 350).play("idle-anim");

    //create cursor keys
    gameState.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    //Add player conditional statements for movement
  }
}
