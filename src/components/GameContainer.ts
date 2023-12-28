import * as PIXI from 'pixi.js';
import { app } from '../main';
import { Spinner } from './Spinner';
import { BaseScreen } from './BaseScreen';
import { ActionButtonProps, Reel } from '../../types';
import player from '../utils/Player';
import { spin, startSpin, stopSpin } from '../utils';
import { ActionButton } from './ActionButton';
import { Reels } from './Reels';
import { animateSymbolsTickerCallback } from '../utils/Animations';
import { game } from '../screens/Game';
import { Informations } from './informations';

export class GameContainer extends BaseScreen {
    public reels: Reel[] = [];
    private button!: PIXI.Container<PIXI.DisplayObject>;
    private containerReels!:PIXI.Container<PIXI.DisplayObject>;
    private spinner:PIXI.Container<PIXI.DisplayObject>;
    private infoContainer!: Informations;

    constructor() {
        super('GameScreen', {
            maxWidth: '100%',
            maxHeight: '100%',
            position: 'center'
        });

        game.addBackground(); 
        this.spinner = new Spinner().spinner;
        this.infoContainer = new Informations();
        this.addAssets()
        this.createContainer();
    }

    private createContainer() {
        const actionButtonProps: ActionButtonProps = {
            onStartSpin: () => {
                // update credit 
                player.updateCredit();
                startSpin(this.reels)
            },
            onStopSpin: () => stopSpin(this.reels),
        };

        this.button = ActionButton(actionButtonProps);

        const border = PIXI.Sprite.from('assets/images/border.png');
        border.width = 800;
        border.height = 600;

        this.addContent({
            container: {
                content: {
                    spinner:{
                        content: this.spinner,
                        styles: {
                            position: 'center',
                            width: '100%',
                            height: '100%'
                        }
                    },
                    background: {
                        content: new PIXI.Container(),
                        styles: {
                            overflow: 'hidden',
                        }
                    },
                    frame: {
                        content: border,
                        styles: {
                            anchor: 0.5,
                            position: 'center',
                            
                        },
                    },
                    button: {
                        content: this.button,
                        styles: {
                            position: 'bottomCenter',
                            
                        }
                    },
                },
                styles: {
                    width: '800px',
                    height: '600px',
                    maxWidth: '80%',
                    maxHeight: '80%',
                    position: 'topCenter',
                    marginTop: 30,
                    marginBottom: 20,
                    background: 0x1d3c10,
                    borderRadius: 35,
                },
            },
            footer: {
                content: this.infoContainer,
                styles: {
                    width: '100%',
                    height: '20%',
                    maxWidth: '100%',
                    position: 'bottom',
                },
            },
        });
    }

    private addAssets () {
        PIXI.Assets.load('assets/atlasData.json').then((data) => {

        const showReels = new Reels(data, this.reels);
        this.containerReels = showReels.getContainer();
        this.containerReels.width = 620;
        this.containerReels.height = 460;

            this.addContent({
            content: {
                reels: {
                    content: this.containerReels,
                    styles: {
                        maxWidth: '100%',
                        maxHeight: '100%',
                        position: 'center',
                        anchorY: 0.4,
                    }
                },
            },
            styles: {
                width: '800px',
                height: '630px',
                maxWidth: '70%',
                maxHeight: '70%',
                position: 'center',
                overflow: 'hidden'
            }
            });
            app.ticker.add((delta) => {
                showReels.update(delta)
                spin();
                animateSymbolsTickerCallback();
            });
        })
    }
}