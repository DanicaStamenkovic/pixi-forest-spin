import * as PIXI from 'pixi.js';
import { AtlasFrames, Reel } from '../../types';

const SYMBOL_SIZE = 100;
const REEL_WIDTH = 140;
const COLUMN_NUM =  4

export class Reels {
    private reels!: Reel[];
    private slotTextures: PIXI.Texture[] = [];
    private symbols: AtlasFrames;
    private reelContainer: PIXI.Container = new PIXI.Container();

    constructor(symbols: AtlasFrames, reels: Reel[]) {
        this.symbols = symbols;
        const frames = Object.keys(symbols.data.frames);
        for (const frame of frames) {
            this.slotTextures.push(PIXI.Texture.from(frame));
        }
   
        this.reelContainer.position.set(0, 0)
        this.initializeReels(reels);
    }

    private initializeReels(reels: Reel[]): void {
        this.reels = reels

        for (let i = 0; i < COLUMN_NUM; i++) {
            const reelColumn = new PIXI.Container();
            reelColumn.x = i * REEL_WIDTH;

            const reel: Reel = {
                container: reelColumn,
                symbols: [],
                position: 0,
                previousPosition: 0,
                blur: new PIXI.BlurFilter(),
            };

            reel.blur.blurX = reel.blur.blurY = 0;
            reelColumn.filters = [reel.blur];

            for (let j = 0; j < COLUMN_NUM; j++) {
                const symbolID = Math.floor(Math.random() * this.slotTextures.length);
                const reelSymbol = new PIXI.Sprite(this.slotTextures[symbolID]);
                reelSymbol.y = j * SYMBOL_SIZE + (SYMBOL_SIZE / 2);
                reelSymbol.scale.x = reelSymbol.scale.y = Math.min(SYMBOL_SIZE / reelSymbol.width, SYMBOL_SIZE / reelSymbol.height);
                reelSymbol.anchor.set(0.5);
                reelSymbol.x = SYMBOL_SIZE / 2;
                reelSymbol.renderId = symbolID + 1;
                reel.symbols.push(reelSymbol);

                reelColumn.addChild(reelSymbol);
            }

            reels.push(reel);
        }
    }

    public getContainer(): PIXI.Container<PIXI.DisplayObject> {
        for (const reel of this.reels) {
            this.reelContainer.addChild(reel.container);
        }

        return this.reelContainer
    }

    public update(delta: number): void {
        this.reels.forEach(element => {
            element.blur.blurY = (element.position - element.previousPosition) * 8;
            element.previousPosition = element.position;

            element.symbols.forEach((symbol, j) => {
                const previousSymbolPosition = symbol.y;
                symbol.y = ((element.position + j) % element.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE + (SYMBOL_SIZE / 2);

                if (symbol.y < 0 && previousSymbolPosition > SYMBOL_SIZE) {
                    const symbolID = Math.floor(Math.random() * this.slotTextures.length);
                    symbol.texture = this.slotTextures[symbolID];
                    symbol.anchor.set(0.5);
                    symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.texture.width, SYMBOL_SIZE / symbol.texture.height);
                    symbol.x = SYMBOL_SIZE / 2;
                    symbol.renderId = symbolID + 1;
                }
            });
        });
    }
}