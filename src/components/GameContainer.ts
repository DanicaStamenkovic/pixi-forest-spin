import * as PIXI from 'pixi.js';
import { BORDER_WIDTH, CONTAINER_HEIGHT, CONTAINER_WIDTH } from '../main';
import { Spinner } from './Spinner';

export function GameContainer( app: PIXI.Application<PIXI.ICanvas>) {
    const blurFilter = new PIXI.BlurFilter();
    blurFilter.blur = 2;

    const container = new PIXI.Container();
    container.position.set(
        app.screen.width / 2 - CONTAINER_WIDTH / 2,
        app.screen.height / 2 - CONTAINER_HEIGHT / 2
    )

    const borderTexture = PIXI.Texture.from('assets/images/border.png');
    const frame = new PIXI.Sprite(borderTexture);
    frame.anchor.set(0.5);
    frame.position.set(CONTAINER_WIDTH / 2, CONTAINER_HEIGHT / 2 )
    frame.scale.set(0.54);

    // background
    const spinBackgroundGraphics = new PIXI.Graphics();
    spinBackgroundGraphics.beginFill(0x1d3c10);
    spinBackgroundGraphics.lineStyle({ color: 0x582900, width: BORDER_WIDTH, alignment: 1.5 });
    spinBackgroundGraphics.drawRoundedRect(
        -(CONTAINER_WIDTH - BORDER_WIDTH * 2) / 2,
        -(CONTAINER_HEIGHT - BORDER_WIDTH * 2) / 2,
        CONTAINER_WIDTH * 2 -  BORDER_WIDTH,
        CONTAINER_HEIGHT * 2 -  BORDER_WIDTH,
        15
    );
    spinBackgroundGraphics.filters = [blurFilter];

    container.addChild(spinBackgroundGraphics);

    //start and stop animation
    Spinner(app, container);

    return { container, frame };
}