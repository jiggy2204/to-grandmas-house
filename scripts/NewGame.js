const gameState = {}

function preload(){
    
}

function create(){}

function update(){}

const config = {
    width: 800,
    height: 600,
    backgroundColor: 0xE0BD35,
    scene: {
        preload,
        create,
        update
    }
}

const game = new Phaser.Game(config);