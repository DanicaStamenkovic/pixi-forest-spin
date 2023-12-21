import * as PIXI from 'pixi.js';
import { BORDER_WIDTH, CONTAINER_HEIGHT, CONTAINER_WIDTH } from "../main";
import { onSpinFinished, onSpinStart, onSpinStoping } from "../utils/GameStateService";
import { SPINNER_WRAPPER, SpinnerAnimation } from "../utils/Animations";
import { spinSound } from '../utils/Sounds';

export function Spinner(app: PIXI.Application<PIXI.ICanvas>, container: PIXI.Container<PIXI.DisplayObject>) {
    const updateSpinner = SpinnerAnimation(
        new PIXI.Point(
            -(CONTAINER_WIDTH - BORDER_WIDTH) / 2,
            -(CONTAINER_HEIGHT - BORDER_WIDTH) / 2
        )
    );

    SPINNER_WRAPPER.visible =  false
    container.addChild(SPINNER_WRAPPER);

    onSpinStart(() => {
        SPINNER_WRAPPER.visible =  true
        app.ticker.add(updateSpinner);
        spinSound.play()
    })

    onSpinStoping(() => {
        SPINNER_WRAPPER.visible =  false;
        app.ticker.remove(updateSpinner);
    })

    onSpinFinished(() => {
        SPINNER_WRAPPER.visible =  false;
        app.ticker.remove(updateSpinner);
    })
}