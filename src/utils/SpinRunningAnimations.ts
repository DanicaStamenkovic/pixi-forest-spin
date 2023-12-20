import * as PIXI from 'pixi.js';
import { CONTAINER_HEIGHT, CONTAINER_WIDTH, app, reelTypes } from '../main';

export const SPINNER_WRAPPER = new PIXI.Container();

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

export const animateSymbols: PIXI.Sprite[] = []

export function WinnerComboAnimation(winningCombos: number[][][], reels:reelTypes[]) {
    winningCombos.forEach((combo, comboIndex) => {
        setTimeout(() => {
            animateSymbols.forEach((symbol) => {
                symbol.scale.set(1);
                symbol.pivot.set(0.5)
            }
            )
            animateSymbols.length = 0
            reels.forEach((reel, index) => {
                const symbolCopy = [...reel.symbols];
                symbolCopy.sort((a, b) => a.y - b.y);
                for (let i = 0; i < 4; i++) {
                    if (combo[i][index] === 1) {
                        animateSymbols.push(symbolCopy[i])
                    }
                }
            });
        }, comboIndex * 2000)
    })

    setTimeout(() => {
        animateSymbols.forEach((symbol) => symbol.scale.set(1))
        animateSymbols.length = 0
    }, winningCombos.length * 2000)
}

const bounceFrequency = 0.1; 
const bounceAmplitude = 0.3;

export function animateSymbolsTickerCallback() {
    const scaleValue = 1 + bounceAmplitude * Math.sin(bounceFrequency * app.ticker.lastTime * 0.1);

    animateSymbols.forEach(symbol => {
        symbol.scale.set(scaleValue);
    })
}