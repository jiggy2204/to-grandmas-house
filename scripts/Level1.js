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
    this.load.multiatlas(
      "player",
      "../_sprites/redridinghood/redridinghood.json",
      "../_sprites/redridinghood"
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

    //Flower- create sprite group for all flowers
    //Make sure they don't move by gravity or player collision
    gameState.flower = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    //Get Flower OBJECTS - these are NOT sprites
    const flowerObjects = level1_map.getObjectLayer("Flowers")["objects"];

    //create sprites in our group for each object in our map
    flowerObjects.forEach((flowerObject) => {
      const flower = gameState.flower
        .create(flowerObject.x, flowerObject.y - flowerObject.height, "flower")
        .setOrigin(0, -0.35);

        return flower;
    });

    //add platform layer
    const platforms = level1_map.createStaticLayer(
      "Platforms",
      level1_tileset,
      0,
      -10
    );

    //Player
    gameState.player = this.physics.add.sprite(
      50,
      450,
      "player",
      "idle/idle_sheet-Sheet-0.png"
    );

    
 
    // Layer can collide with other objects
    platforms.setCollisionByExclusion(-1, true);

    //Layer can collide with sprite
    this.physics.add.collider(gameState.player, platforms);

    //ANIMATIONS FOR PLAYER

    //IDLE ANIMATION
    var idleFrame = this.anims.generateFrameNames("player", {
      start: 0,
      end: 17,
      zeroPad: 1,
      prefix: "idle/idle_sheet-Sheet-",
      suffix: ".png",
    });

    this.anims.create({
      key: "idle",
      frames: idleFrame,
      frameRate: 15,
      repeat: -1,
    });

    //RUNNING ANIMATION
    var runFrame = this.anims.generateFrameNames("player", {
      start: 0,
      end: 23,
      zeroPad: 1,
      prefix: "run/itch_run_sheet-Sheet-",
      suffix: ".png",
    });

  this.anims.create({
      key: "run",
      frames: runFrame,
      frameRate: 17,
      repeat: -1,
    });

    //JUMPING ANIMATION
    var jumpFrame = this.anims.generateFrameNames("player", {
      start: 0,
      end: 18,
      zeroPad: 1,
      prefix: "jump/itch_jump_sheet-Sheet-",
      suffix: ".png",
    })

    this.anims.create({
      key: "jump",
      frames: jumpFrame,
      frameRate: 17,
      repeat: 1,
    })

    //WALLSLIDE ANIMATION

    var wallSlideFrame = this.anims.generateFrameNames("player", {
      start: 0,
      end: 3,
      zeroPad: 1,
      prefix: "wall_slide/wall_slide_sheet-",
      suffix: ".png",
    })

    this.anims.create({
      key: "wallslide",
      frames: wallSlideFrame,
      frameRate: 17,
      repeat: 0,   
    })
    
    //Add player conditional statements for movement
    gameState.player.anims.play("idle");
    //create cursor keys
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.player.setCollideWorldBounds(true);

    
  }

  update() {
    gameState.player.setVelocity(0);

    if (gameState.active) {
      if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(250);
        gameState.player.anims.play('run', true);
				gameState.player.flipX = false;
        
      } else if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-250);
        gameState.player.anims.play('run', true);
				gameState.player.flipX = true;
        
      } else {
        gameState.player.setVelocityX(0);
        gameState.player.anims.play('idle', true);
      }

      if ((gameState.cursors.space.isDown || gameState.cursors.up.isDown)&& gameState.player.body.touching.down) {
        gameState.player.anims.play('jump', true);
        gameState.player.setVelocityY(-400);
      }
    }
  }
}
