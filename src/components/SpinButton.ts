import * as PIXI from 'pixi.js';

export function SpinButton(spinContainerWidth: number, spinContainerHeight: number) {
    const buttonTexture: PIXI.Texture<PIXI.Resource> = PIXI.Texture.from('./assets/images/wood-button.png');
    const buttonSprite: PIXI.Sprite = new PIXI.Sprite(buttonTexture);
    buttonSprite.width = 200;
    buttonSprite.height= 100;
    buttonSprite.position.set(
        spinContainerWidth / 2 - buttonSprite.width / 2,
        spinContainerHeight + buttonSprite.height
    );

    const buttonStyle:PIXI.TextStyle = new PIXI.TextStyle({
        fontFamily: 'Ariel',
        fontSize: 30,
        fontWeight: '900',
        fontStyle: 'italic',
        letterSpacing: 5,
        stroke: 0x663300,
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: 0x663300,
        dropShadowBlur: 5,
        dropShadowAngle: 6,
        dropShadowDistance: 0,
        fill: ['#F5C21B', 'orange'],
        align: 'center',
    });

    const buttonText:PIXI.Text = new PIXI.Text('SPIN', buttonStyle);
    buttonText.anchor.set(0.5);
    buttonText.x = buttonSprite.x + buttonSprite.width / 2;
    buttonText.y = buttonSprite.y + buttonSprite.height / 2;
    buttonSprite.eventMode = 'static';
    buttonSprite.cursor = 'pointer';

    return {buttonSprite, buttonText};    
}

