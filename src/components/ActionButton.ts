import * as PIXI from 'pixi.js';
import { isSpinFinished, isSpinRunning, onGameWin, onSpinFinished, onSpinStart, onSpinStoping } from '../utils/GameStateService';

export type ActionButtonProps = {
    containerWidth: number;
    containerHeight: number;
    onStartSpin: () => void;
    onStopSpin: () => void;
}  

export function ActionButton(props: ActionButtonProps) {
  const buttonTexture: PIXI.Texture<PIXI.Resource> = PIXI.Texture.from('./assets/images/wood-button.png');
  const buttonSprite: PIXI.Sprite = new PIXI.Sprite(buttonTexture);
  buttonSprite.width = 200;
  buttonSprite.height= 100;
  buttonSprite.position.set(
        props.containerWidth / 2 - buttonSprite.width / 2,
        props.containerHeight + buttonSprite.height
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
        fill: ['#eedb9b', 'orange'],
        align: 'center',
    });

    const buttonText:PIXI.Text = new PIXI.Text('Start', buttonStyle );
    buttonText.anchor.set(0.5);
    buttonText.position.set(
        buttonSprite.x + buttonSprite.width / 2,
        buttonSprite.y + buttonSprite.height / 2
    );
    buttonSprite.eventMode = 'static';
    buttonSprite.cursor = 'pointer';
  
    onSpinFinished(() => {
      buttonText.text = 'Start';
      buttonSprite.cursor  = 'pointer';
    });

    onSpinStart(() => {
      buttonText.text = 'Stop';
    })

    onGameWin(() => {
      buttonText.text = 'WIN!';
      buttonSprite.cursor  = 'progress';
    })

    onSpinStoping(() => {
      buttonSprite.cursor  = 'progress';
    })

    buttonSprite.addListener('pointerdown', () => {
      if(isSpinRunning()) {
        props.onStopSpin();
      } else if(isSpinFinished()) {
        props.onStartSpin();
      }
    });
    
    return { buttonSprite, buttonText };    
}

