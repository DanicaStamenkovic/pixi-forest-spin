import * as PIXI from 'pixi.js';
import { Tab } from './Tab';
import player from '../../utils/Player';
import { betTextStyle } from '../../utils/Styles';
import { SelectBet } from './SelectBet';
import { BetOptions } from '../../constants/Bets';

export function Bet(width: number, height: number) {
    const betContainer = new PIXI.Container();
    const { tab, value } = Tab('Bet',  `${player.getBet().toString()} €`, betTextStyle, width, height);

    const onSelectBet = (selectedOption:number) => {
        value.text = `${selectedOption.toString()} €`
        player.setBet(selectedOption);
    }

    const selectBet = SelectBet(BetOptions, onSelectBet);

    selectBet.position.set((betContainer.width / 2) + 25, betContainer.height /  2 + 25);
    betContainer.position.set(width - tab.width, (height - tab.height) / 2 + 10);

    betContainer.addChild(tab, selectBet);

    return betContainer;
}