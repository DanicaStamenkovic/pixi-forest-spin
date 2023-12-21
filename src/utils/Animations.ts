import * as PIXI from 'pixi.js';
import { CONTAINER_HEIGHT, CONTAINER_WIDTH, app } from '../main';
import { FINISHED, setSpinState } from './GameStateService';
import { winSound } from './Sounds';

export const SPINNER_WRAPPER = new PIXI.Container();
const animateSymbols: PIXI.Sprite[] = []

export function SpinnerAnimation(position: PIXI.Point) {
    SPINNER_WRAPPER.position.set(position.x, position.y);

    const circle = new PIXI.Graphics();
    circle.beginFill(0xff0000);
    circle.lineStyle(2, 0xffffff);
    circle.arc(0, 0, CONTAINER_WIDTH * 2, 0, Math.PI);
    circle.position.set(CONTAINER_WIDTH, CONTAINER_HEIGHT)

    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(3, 0x6AD319, 1);
    rectangle.drawRoundedRect(0, 0, CONTAINER_WIDTH * 2, CONTAINER_HEIGHT * 2, 50);
    rectangle.mask = circle;

    SPINNER_WRAPPER.addChild(rectangle, circle);

    let phase = 0;

    return (delta: any) => {
        phase += delta / 6;
        phase %= (Math.PI * 2);

        circle.rotation = phase;
    };
}

let winInterval: NodeJS.Timeout | null = null
function resetSymbols() {
    animateSymbols.forEach(symbol => {
        const winningLight = (symbol as any)._winningLight;
        if (winningLight instanceof PIXI.Graphics) {
            symbol.removeChild(winningLight);
        }
    
        symbol.scale.set(1);
    });
    animateSymbols.length = 0;
}

export function clearWinInterval() {
    winInterval && clearInterval(winInterval)
    resetSymbols()
}

export function WinnerComboAnimation(winningCombos: PIXI.Sprite[][]) {
    let comboIndex = 0;
    const startNextSymbolAnimation = () => {
        if (comboIndex == winningCombos.length) {
            setSpinState(FINISHED)
            winSound.stop()
        }
        resetSymbols()
        const nextIndex = (comboIndex + 1) % winningCombos.length
        animateSymbols.push(...winningCombos[nextIndex]);
        comboIndex++
        animateSymbols.forEach((symbol) => symbolAnimation(symbol))
    }

    winSound.play()
    // do first animation
    startNextSymbolAnimation()
    winInterval = setInterval(() => {
        //pass throught winning combos and do animation
        startNextSymbolAnimation()
    }, 2000)
}

function symbolAnimation(symbol: PIXI.Sprite) {
    const winningLight = new PIXI.Graphics();
    const backgroundLight = PIXI.Sprite.from('https://pixijs.com/assets/light_rotate_1.png');
    const borderLight = PIXI.Sprite.from('https://pixijs.com/assets/light_rotate_2.png');

    backgroundLight.anchor.set(0.5);
    backgroundLight.scale.set(0.5, 0.5)
    borderLight.scale.set(0.3, 0.3)
    winningLight.alpha = 0.5;
    winningLight.position.set(0, 0);
    winningLight.addChild(backgroundLight, borderLight);
   
    symbol.addChild(winningLight);
    symbol.zIndex = 0;
    winningLight.zIndex = -1;

    (symbol as any)._lights = { backgroundLight, borderLight };
    (symbol as any)._winningLight = winningLight;
}

export function animateSymbolsTickerCallback() {
    const bounceFrequency = 0.1; 
    const bounceAmplitude = 0.2;
    const scaleValue = 1 + bounceAmplitude * Math.sin(bounceFrequency * app.ticker.lastTime * 0.1);

    animateSymbols.forEach(symbol => {
        symbol.scale.set(scaleValue);
        const lights = (symbol as any)._lights;
        if (lights) {
            lights.backgroundLight.rotation += 0.1;
            lights.borderLight.rotation -= 0.1;
        }
    })
}