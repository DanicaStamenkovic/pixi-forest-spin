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

export class GameContainer extends BaseScreen {
    public reels: Reel[] = [];
    private button!: PIXI.Container<PIXI.DisplayObject>;
    private containerReels!:PIXI.Container<PIXI.DisplayObject>;
    private spinner:PIXI.Container<PIXI.DisplayObject>;

    constructor() {
        super('GameScreen', {
            maxWidth: '80%',
            maxHeight: '80%',
            position: 'center'
        });

        this.spinner = new Spinner().spinner;
        game.addBackground(); 
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
                    maxWidth: '100%',
                    position: 'center',
                    background: 0x1d3c10,
                    borderRadius: 35,
                },
            }
        });
    }

    private addAssets () {
        PIXI.Assets.load('assets/atlasData.json').then((data) => {
        const showReels = new Reels(data, this.reels);
        this.containerReels = showReels.getContainer();

            this.addContent({
            content: {
                reels: {
                    content: this.containerReels,
                    styles: {
                        position: 'center',
                        anchorY:  0.3,
                    }
                },
            },
            styles: {
                height: '600px',
                maxWidth: '100%',
                maxHeight: '100%',
                position: 'center',
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