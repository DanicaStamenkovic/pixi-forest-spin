import { Howl } from 'howler';

export let shouldPlaySounds = true;

export const winSound = new Howl({ 
    src: ['./assets/sounds/win.wav'],
    loop: true,
    volume: 0.3,
});

export const spinSound = new Howl({ 
    src: ['./assets/sounds/spin.wav'],
    loop: true,
    volume: 0.3,
});

export const backgroundSound = new Howl({
    src: ['./assets/sounds/background.mp3'],
    volume: 0.3,
})

export const toggleSoundPlayback = () => {
    if(shouldPlaySounds) {
        winSound.volume(0);
        backgroundSound.pause();
        spinSound.volume(0);
    } else {
        winSound.volume(0.3);
        backgroundSound.play();
        spinSound.volume(0.3);
    }

    shouldPlaySounds = !shouldPlaySounds;
};

export const playSound = (sound:any) => {
    if (shouldPlaySounds) {
        sound.play();
    } 
};
