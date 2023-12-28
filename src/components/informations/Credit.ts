import * as PIXI from 'pixi.js';
import player from "../../utils/Player";
import { creditTextStyle } from "../../utils/Styles";
import { Tab } from "./Tab";
import { onGameWin, onSpinStart } from '../../utils/GameStateService';

export class Credit {
    private creditValue: PIXI.Text;
    public creditTab: PIXI.Container;

    constructor() {
        const creditWrapper = new PIXI.Container()

        const { tab, value } =  Tab('Credit', `${player.getCredit().toString()} €`, creditTextStyle);
        creditWrapper.addChild(tab)
    
        this.creditValue = value;
        this.creditTab = creditWrapper;

        onGameWin(() => {
            this.updateCreditValue()
        })

        onSpinStart(() => {
            this.updateCreditValue()
        })
    }

    private updateCreditValue() {
        this.creditValue.text = `${player.getCredit().toString()} €`;
    }
}