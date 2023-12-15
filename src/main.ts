import * as PIXI from 'pixi.js';
import { SpinButton } from "./components/SpinButton"
import { GameContainer } from './components/GameContainer';
import { spin, startSpin } from './functions';

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

const REEL_WIDTH = 180;
const SYMBOL_SIZE = 120;
const COLUMN_NUM =  4
const BORDER_WIDTH = 10;

const assets = {
    background: 'assets/images/background.png',
    symbols: 'assets/symbols.json'
}

const app = new PIXI.Application({
    width: 1500,
    height: 830,
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

//Game Container
const { container, containerWidth, containerHeight, frame } = GameContainer(app, BORDER_WIDTH)
app.stage.addChild(container);

//Play Button
const { buttonSprite, buttonText } = SpinButton(containerWidth, containerHeight);

PIXI.Assets.load(assets.symbols).then((data) => onAssetsLoaded(data));
const onAssetsLoaded = (asset: MyLoadedAsset) => {
    const slotTextures: PIXI.Texture[] = [];
    const frames = Object.keys(asset.data.frames);

    for (const frame of frames) {
        slotTextures.push(PIXI.Texture.from(frame));
    }

    const reels: reelTypes[] = [];
    const reelContainer = new PIXI.Container();

    const reelContainerWidth = REEL_WIDTH * 4;
    const reelContainerHeight = SYMBOL_SIZE * 4;

    reelContainer.position.set(
        (containerWidth - reelContainerWidth) / 2 + 30,
        (containerHeight - reelContainerHeight) / 2 + SYMBOL_SIZE
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
            const reelSymbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            reelSymbol.y = j * SYMBOL_SIZE;
            reelSymbol.scale.x = reelSymbol.scale.y = Math.min(SYMBOL_SIZE / reelSymbol.width, SYMBOL_SIZE / reelSymbol.height);
            reelSymbol.x = Math.round((SYMBOL_SIZE - reelSymbol.width) / 2);
            reel.symbols.push(reelSymbol);
            reelColumn.addChild(reelSymbol);
        }

        reels.push(reel);
    }

    //overflow hidden for reels
    let mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(
        -(containerWidth - BORDER_WIDTH) / 2,
        -(containerHeight - BORDER_WIDTH) / 2,
        SYMBOL_SIZE * ( COLUMN_NUM *  2 ),
        SYMBOL_SIZE * COLUMN_NUM + 80
    );

    reelContainer.mask = mask;

    //import elements
    reelContainer.addChild(mask);
    container.addChild(reelContainer);
    container.addChild(frame);
    container.addChild(buttonSprite, buttonText);

    buttonSprite.addListener('pointerdown', () => {
        startSpin(reels)
    });

    app.ticker.add((delta) => {
        reels.forEach(element => {
            element.blur.blurY = (element.position - element.previousPosition) * 8;
            element.previousPosition = element.position;
    
            element.symbols.forEach((symbol, j) => {
                const previousSymbolPosition = symbol.y;
    
                symbol.y = ((element.position + j) % element.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
    
                if (symbol.y < 0 && previousSymbolPosition > SYMBOL_SIZE) {
                    symbol.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.texture.width, SYMBOL_SIZE / symbol.texture.height);
                    symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
                }
            });
        });
    });

    app.ticker.add((delta) => {
        spin()
    });
}
