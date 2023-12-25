import * as PIXI from 'pixi.js';
import { betTextStyle, creditTextStyle } from './../../utils/Styles';
import { BORDER_WIDTH, CONTAINER_WIDTH, app } from '../../main';
import { Tab } from './Tab';
import { BetOptions } from '../../constants/Bets';
import { SelectBet } from './SelectBet';

export function Informations() {
    const infoContainer = new PIXI.Container();
    const betContainer = new PIXI.Container();
    const infoContainerBg = new PIXI.Graphics();
    const container = new PIXI.Graphics();

    infoContainerBg.beginFill(0x331e01)
    .drawRect(0, 0, app.screen.width, 70);
    infoContainer.position.set(0, app.screen.height - 70);

    container.beginFill(0x610e00)
    .drawRoundedRect(0, (infoContainerBg.height / 2) - 50 / 2, CONTAINER_WIDTH * 2, 50, 15);
    container.position.set(
        (infoContainerBg.width / 2) - (container.width / 2) + BORDER_WIDTH,
        0
    );

    infoContainer.addChild(infoContainerBg, container);

    const creditTab = Tab('Credit', '5 000', creditTextStyle, container.width, container.height)
    creditTab.tab.position.set(0 , (container.height / 2) - (creditTab.tab.height / 2) + 10);

    const betTab = Tab('Bet', '0.5', betTextStyle, container.width, container.height)
    const onSelectBet = (selectedOption:number) => {
        betTab.value.text = selectedOption.toString();
    }
    const selectBet = SelectBet(BetOptions, onSelectBet);
    selectBet.position.set((betContainer.width / 2) + 25, betContainer.height /  2 + 25)

    betContainer.addChild(betTab.tab, selectBet);
    betContainer.position.set(container.width - creditTab.tab.width, (container.height / 2) - (betTab.tab.height / 2) + 10)

    container.addChild( creditTab.tab, betContainer );

    return { infoContainer }
}