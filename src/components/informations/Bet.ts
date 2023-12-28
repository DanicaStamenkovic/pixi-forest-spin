import * as PIXI from 'pixi.js';
import { Tab } from './Tab';
import player from '../../utils/Player';
import { betTextStyle } from '../../utils/Styles';
import { SelectBet } from './SelectBet';
import { BetOptions } from '../../constants/Bets';

export function Bet() {
    const betContainer = new PIXI.Container();
    const { tab, value } = Tab('Bet',  `${player.getBet().toString()} €`, betTextStyle);

    const onSelectBet = (selectedOption:number) => {
        value.text = `${selectedOption.toString()} €`
        player.setBet(selectedOption);
    }

    const selectBet = SelectBet(BetOptions, onSelectBet);

    selectBet.position.set((betContainer.width / 2) + 25, betContainer.height /  2 + 25);

    betContainer.addChild(tab, selectBet);

    return betContainer;
}