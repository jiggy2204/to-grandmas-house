class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    this.add.text(300, 250, "Help Red find her grandma!", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    this.add.text(270, 300, "PRESS MOUSE BUTTON TO START", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });

    this.input.on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("Level1");
    });
  }
}
