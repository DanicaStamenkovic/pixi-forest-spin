import * as PIXI from 'pixi.js';
import { ActionButton, ActionButtonProps } from "./components/ActionButton"
import { GameContainer } from './components/GameContainer';
import { spin, startSpin, stopSpin } from './utils';
import { animateSymbolsTickerCallback } from './utils/Animations';
import { backgroundSound, playSound } from './utils/Sounds';
import { Informations } from './components/informations';
import player from './utils/Player';

export type reelTypes = {
    container: PIXI.Container<PIXI.DisplayObject>,
    symbols: PIXI.Sprite[],
    position: number,
    previousPosition: number,
    blur: PIXI.BlurFilter
}

type MyLoadedAsset = {
    data: {
      frames: Record<string, any>;
    };
  }

export const CONTAINER_WIDTH = 470;
export const CONTAINER_HEIGHT = 350;
export const BORDER_WIDTH = 10;
const SYMBOL_SIZE = 130;
const REEL_WIDTH = 180;
const COLUMN_NUM =  4

const assets = {
    background: 'assets/images/background.png',
    symbols: 'assets/atlasData.json'
}

export const app = new PIXI.Application({
    width: 1500,
    height: 895,
    backgroundColor: 0x90BE6D,
    view: document.getElementById('game-canvas') as HTMLCanvasElement,
});

//Background of canvas
const backgroundTexture = PIXI.Texture.from(assets.background);
const backgroundSprite = new PIXI.TilingSprite(
    backgroundTexture,
    app.screen.width,
    app.screen.height
);

backgroundSprite.tileScale.set(0.25, 0.24)
app.stage.addChild(backgroundSprite);

const { infoContainer } = Informations();

//Game Container
const { container, frame } = GameContainer(app);
const reels: reelTypes[] = [];

const actionButtonProps: ActionButtonProps = {
    containerWidth: CONTAINER_WIDTH,
    containerHeight: CONTAINER_HEIGHT,
    onStartSpin: () => {
        // update credit 
        player.updateCredit();
        startSpin(reels)
    },
    onStopSpin: () => stopSpin(reels),
  };
  
const { buttonSprite, buttonText } = ActionButton(actionButtonProps);

const onAssetsLoaded = (asset: MyLoadedAsset) => {
    const slotTextures: PIXI.Texture[] = [];
    const frames = Object.keys(asset.data.frames);

    for (const frame of frames) {
        slotTextures.push(PIXI.Texture.from(frame));
    }

    const reelContainer = new PIXI.Container();
    const reelContainerWidth = REEL_WIDTH * 4;
    const reelContainerHeight = SYMBOL_SIZE * 4;

    reelContainer.position.set(
        (CONTAINER_WIDTH - reelContainerWidth) / 2 + 30,
        (CONTAINER_HEIGHT - reelContainerHeight) / 2 + SYMBOL_SIZE
    )

    for (let i = 0; i < COLUMN_NUM; i++) {
        const reelColumn = new PIXI.Container();
        reelColumn.x = i * REEL_WIDTH;

        reelContainer.addChild(reelColumn);

        const reel: reelTypes = {
            container: reelColumn,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.BlurFilter(),
        };

        reel.blur.blurX = reel.blur.blurY = 0;
        reelColumn.filters = [reel.blur];

        for (let j = 0; j < COLUMN_NUM; j++) {
            //TEST: Change symbolID to Math.floor(Math.random() * 2) for faster testing combinations
            const symbolID = Math.floor(Math.random() * slotTextures.length);
            const reelSymbol = new PIXI.Sprite(slotTextures[symbolID]);
            reelSymbol.y = j * SYMBOL_SIZE + (SYMBOL_SIZE / 2);
            reelSymbol.scale.x = reelSymbol.scale.y = Math.min(SYMBOL_SIZE / reelSymbol.width, SYMBOL_SIZE / reelSymbol.height);
            reelSymbol.anchor.set(0.5)
            reelSymbol.x = SYMBOL_SIZE / 2;
            reelSymbol.renderId = symbolID + 1;
            reel.symbols.push(reelSymbol);

            reelColumn.addChild(reelSymbol);
        }

        reels.push(reel);
    }

    //overflow hidden for reels
    let mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(
        -(CONTAINER_WIDTH - BORDER_WIDTH) / 2,
        -(CONTAINER_HEIGHT - BORDER_WIDTH) / 2,
        SYMBOL_SIZE * ( COLUMN_NUM *  2 ),
        SYMBOL_SIZE * COLUMN_NUM + 80
    );

    reelContainer.mask = mask;

    //import elements
    reelContainer.addChild(mask);
    container.addChild(reelContainer);
    container.addChild(frame);
    container.addChild(buttonSprite, buttonText);

    app.ticker.add((delta) => {
        reels.forEach(element => {
            element.blur.blurY = (element.position - element.previousPosition) * 8;
            element.previousPosition = element.position;
    
            element.symbols.forEach((symbol, j) => {
                const previousSymbolPosition = symbol.y;
                symbol.y = ((element.position + j) % element.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE + (SYMBOL_SIZE / 2);
                
                if (symbol.y < 0 && previousSymbolPosition > SYMBOL_SIZE) {
                //TEST: Change symbolID to Math.floor(Math.random() * 2) for faster testing combinations
                    const symbolID = Math.floor(Math.random() * slotTextures.length);
                    symbol.texture = slotTextures[symbolID];
                    symbol.anchor.set(0.5)
                    symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.texture.width, SYMBOL_SIZE / symbol.texture.height);
                    symbol.x = SYMBOL_SIZE / 2
                    symbol.renderId = symbolID + 1
                }
            });
        });
    });

    app.ticker.add((delta) => {
        spin()
    });

    // animation callback when combos are winning
    app.ticker.add((delta) => {
        animateSymbolsTickerCallback()
    })
}

app.stage.addChild(container);

PIXI.Assets.load(assets.symbols).then((data) => onAssetsLoaded(data));

playSound(backgroundSound); //import background sound
app.stage.addChild(infoContainer) // add informations footer tab