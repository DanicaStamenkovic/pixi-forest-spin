import * as PIXI from 'pixi.js';
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from '../main';

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