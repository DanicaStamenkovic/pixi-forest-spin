import * as PIXI from 'pixi.js';

export function GameContainer(app: PIXI.Application<PIXI.ICanvas>, BORDER_WIDTH: number) {
    const blurFilter = new PIXI.BlurFilter();
    blurFilter.blur = 2;

    const container = new PIXI.Container();
    const containerWidth = 400;
    const containerHeight = 300;
    container.position.set(
        app.screen.width / 2 - containerWidth / 2,
        app.screen.height / 2 - containerHeight / 2
    )

    const borderTexture = PIXI.Texture.from('assets/images/border.png');
    const frame = new PIXI.Sprite(borderTexture);
    frame.anchor.set(0.5);
    frame.position.set(containerWidth / 2, containerHeight / 2 )
    frame.scale.set(0.46);

    // background
    const spinBackgroundGraphics = new PIXI.Graphics();
    spinBackgroundGraphics.beginFill(0x1d3c10);
    spinBackgroundGraphics.lineStyle({ color: 0x582900, width: BORDER_WIDTH, alignment: 1.5 });
    spinBackgroundGraphics.drawRoundedRect(
        -(containerWidth - BORDER_WIDTH * 2) / 2,
        -(containerHeight - BORDER_WIDTH * 2) / 2,
        containerWidth * 2 -  BORDER_WIDTH,
        containerHeight * 2 -  BORDER_WIDTH,
        15
    );
    spinBackgroundGraphics.filters = [blurFilter];

    container.addChild(spinBackgroundGraphics);

    return {container, containerWidth, containerHeight, frame};
}