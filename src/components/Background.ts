import * as PIXI from 'pixi.js';
import { Layout } from '@pixi/layout';

export class Background extends Layout {
    constructor() {
        super({
            id: 'gameBackground', 
            content: {
                bg: {
                    content: PIXI.Sprite.from('../assets/images/background.png'),
                    styles: {
                       position:'center',
                       maxHeight: '100%',
                       minWidth: '100%',
                    }
                },
            },
            styles: {
                width: '100%',
                height: '100%',
            }
        });
    }
}