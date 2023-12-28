import * as PIXI from 'pixi.js';
import { GameContainer } from './components/GameContainer';
import { backgroundSound, playSound } from './utils/Sounds';
import { game } from './screens/Game';

export const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '0x90BE6D',
    view: document.getElementById('game-canvas') as HTMLCanvasElement,
});

//debug pixi app layers
(globalThis as any).__PIXI_APP__ = app;

const gameContainer = new GameContainer();

function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight); 
    game.resize(window.innerWidth, window.innerHeight); // Resize the game and their contents 
    gameContainer.resize(window.innerWidth, window.innerHeight); 
}

async function init() {
    // Whenever the window resizes, call the 'resize' function
    window.addEventListener('resize', resize);
    app.stage.addChild(gameContainer);

    resize();
    playSound(backgroundSound); //import background sound
}

window.onload = init; // Init everything when the window loads