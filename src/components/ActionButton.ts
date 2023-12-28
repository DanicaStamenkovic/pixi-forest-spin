import * as PIXI from 'pixi.js';
import { isSpinFinished, isSpinRunning, onGameWin, onSpinFinished, onSpinStart, onSpinStoping } from '../utils/GameStateService';
import { actionButtonStyle } from '../utils/Styles';
import { ActionButtonProps } from '../../types';

export function ActionButton(props: ActionButtonProps) {
  const button = new PIXI.Container();
  const buttonSprite: PIXI.Sprite = PIXI.Sprite.from('./assets/images/wood-button.png')
  buttonSprite.width = 200;
  buttonSprite.height= 100;

  const buttonText:PIXI.Text = new PIXI.Text('Start', actionButtonStyle );
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

    button.addChild(buttonSprite, buttonText)
    return button;    
}

