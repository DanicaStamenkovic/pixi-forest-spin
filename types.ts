import * as PIXI from 'pixi.js';

export type Reel = {
    container: PIXI.Container<PIXI.DisplayObject>,
    symbols: PIXI.Sprite[],
    position: number,
    previousPosition: number,
    blur: PIXI.BlurFilter
}

export type AtlasFrames = {
    data: {
      frames: Record<string, any>;
    };
}

export type ActionButtonProps = {
  onStartSpin: () => void;
  onStopSpin: () => void;
}  