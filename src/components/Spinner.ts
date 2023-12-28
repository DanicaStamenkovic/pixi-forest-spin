import * as PIXI from 'pixi.js';
import { onSpinFinished, onSpinStart, onSpinStoping } from "../utils/GameStateService";
import { SPINNER_WRAPPER, SpinnerAnimation } from "../utils/Animations";
import { playSound, spinSound } from '../utils/Sounds';
import { app } from '../main';

export class Spinner {
    private updateSpinner;
    public spinner: PIXI.Container<PIXI.DisplayObject>

    constructor() {
        this.spinner = SPINNER_WRAPPER;

        this.updateSpinner = SpinnerAnimation();

        this.spinner.visible = false;

        onSpinStart(() => {
            this.spinner.visible = true;
            app.ticker.add(this.updateSpinner);
            playSound(spinSound);
        });

        onSpinStoping(() => {
            this.spinner.visible = false;
            app.ticker.remove(this.updateSpinner);
        });

        onSpinFinished(() => {
            this.spinner.visible = false;
            app.ticker.remove(this.updateSpinner);
        });
    }
}