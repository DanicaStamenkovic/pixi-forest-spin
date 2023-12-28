import * as PIXI from 'pixi.js';
import { toggleSoundPlayback, shouldPlaySounds } from '../utils/Sounds';

export function ToggleSound() {
    const soundContainer = new PIXI.Container();

    const toggleSound = () => {
      updateButtonTexture()
      toggleSoundPlayback()
    };

    const soundOnTexture: PIXI.Texture<PIXI.Resource> = PIXI.Texture.from('./assets/images/sound-on.png');
    const soundOffTexture: PIXI.Texture<PIXI.Resource> = PIXI.Texture.from('./assets/images/sound-off.png');

    const toggleButton: PIXI.Sprite = new PIXI.Sprite(soundOnTexture);
    toggleButton.width = 24;
    toggleButton.height = 24
    toggleButton.eventMode = 'static';
    toggleButton.cursor = 'pointer';
    toggleButton.on('pointerdown', toggleSound);
    soundContainer.addChild(toggleButton);

    const updateButtonTexture = () => {
      toggleButton.texture = !shouldPlaySounds ? soundOnTexture : soundOffTexture;
    };

    return soundContainer;
}