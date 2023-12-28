import * as PIXI from 'pixi.js';
import { ToggleSound } from '../ToggleSound';
import { Bet } from './Bet';
import { Credit } from './Credit';
import { Layout } from '@pixi/layout';

export class Informations extends Layout {
    private bet: PIXI.Container<PIXI.DisplayObject>;
    private credit: PIXI.Container<PIXI.DisplayObject>;
    private soundContainer: PIXI.Container<PIXI.DisplayObject>

    constructor() {
        super({
        id: "InformationsTab",
        styles: {
            maxWidth: '100%',
            maxHeight: '20%',
            position: 'bottom',
        }});

        this.bet = Bet();
        this.credit = new Credit().creditTab;
        this.soundContainer = ToggleSound();
        this.createContainer();
    }

    private createContainer() {
        this.addContent({
            container:{
                content: {
                    background: {
                        content: new PIXI.Container(),
                    },
                    infoContainer: {
                        content: {
                            background:{
                                content: new PIXI.Container(),
                            },
                            credit: {
                                content: this.credit,
                                styles: {
                                    position: 'left',
                                    borderRadius: 20,
                                }
                            },
                            soundContainer: {
                                content: this.soundContainer,
                                styles: {
                                    position: 'center',
                                }
                            },
                            bet: {
                                content: this.bet,
                                styles: {
                                    position: 'right',
                                    borderRadius: 20,
                                }
                            },
                            
                        },
                        styles: {
                            width: '650px',
                            maxWidth: '80%',
                            height: '65%',
                            background: 0x610e00,
                            position: 'center',
                            borderRadius: 15,
                        }
                    }
                } ,
                styles: {
                    width: '100%',
                    height: '70px',
                    background: 0x331e01,
                }
            }
        });
    }
}