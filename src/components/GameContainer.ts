import * as PIXI from 'pixi.js';

export function GameContainer( app: PIXI.Application<PIXI.ICanvas>, border_width: number, container_width: number, container_height: number) {
    const blurFilter = new PIXI.BlurFilter();
    blurFilter.blur = 2;

    const container = new PIXI.Container();
    container.position.set(
        app.screen.width / 2 - container_width / 2,
        app.screen.height / 2 - container_height / 2
    )

    const borderTexture = PIXI.Texture.from('assets/images/border.png');
    const frame = new PIXI.Sprite(borderTexture);
    frame.anchor.set(0.5);
    frame.position.set(container_width / 2, container_height / 2 )
    frame.scale.set(0.46);

    // background
    const spinBackgroundGraphics = new PIXI.Graphics();
    spinBackgroundGraphics.beginFill(0x1d3c10);
    spinBackgroundGraphics.lineStyle({ color: 0x582900, width: border_width, alignment: 1.5 });
    spinBackgroundGraphics.drawRoundedRect(
        -(container_width - border_width * 2) / 2,
        -(container_height - border_width * 2) / 2,
        container_width * 2 -  border_width,
        container_height * 2 -  border_width,
        15
    );
    spinBackgroundGraphics.filters = [blurFilter];

    container.addChild(spinBackgroundGraphics);

    return {container, frame};
}