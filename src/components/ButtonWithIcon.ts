import * as PIXI from 'pixi.js';

export function ButtonWithIcon(iconPath: string, onClick: () => void) {
    const button = new PIXI.Container();
    button.eventMode = 'static';
    button.cursor = 'pointer';

    const buttonTexture: PIXI.Texture<PIXI.Resource> = PIXI.Texture.from(iconPath);
    const icon: PIXI.Sprite = new PIXI.Sprite(buttonTexture);
    icon.width = 15;
    icon.height= 15;
    icon.anchor.set(0.5)
    button.addChild(icon)
    
    const rotateIcon = () => {
        icon.rotation += Math.PI;
    }

    button.on('pointerdown', onClick);

    return { button, rotateIcon }
}