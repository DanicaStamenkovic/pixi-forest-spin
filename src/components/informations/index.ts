import * as PIXI from 'pixi.js';
import { BORDER_WIDTH, CONTAINER_WIDTH, app } from '../../main';
import { ToggleSound } from '../ToggleSound';
import { Bet } from './Bet';
import { Credit } from './Credit';



export function Informations() {
    const infoContainer = new PIXI.Container();
    infoContainer.position.set(0, app.screen.height - 70);

    const infoContainerBg = new PIXI.Graphics()
    .beginFill(0x331e01)
    .drawRect(0, 0, app.screen.width, 70);

    const container = new PIXI.Graphics()
    .beginFill(0x610e00)
    .drawRoundedRect(0, (infoContainerBg.height / 2) - 50 / 2, CONTAINER_WIDTH * 2, 50, 15);
    container.position.set( (infoContainerBg.width - container.width) / 2 + BORDER_WIDTH, 0 );

    const credit = new Credit(container.width, container.height);
    const bet = Bet( container.width, container.height );

    const { soundContainer } = ToggleSound()
    soundContainer.position.set((container.width- soundContainer.width) / 2, (container.height- soundContainer.height) / 2 + 10)

    container.addChild( credit.creditTab, bet, soundContainer );
    infoContainer.addChild(infoContainerBg, container);

    return { infoContainer }
}