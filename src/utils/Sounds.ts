const {Howl} = require('howler');

const context = new window.AudioContext();

export const winSound = new Howl({ 
    src: ['./assets/sounds/win.wav'],
    loop: true,
    volume: 0.3,
    context: context,
});

export const spinSound = new Howl({ 
    src: ['./assets/sounds/spin.wav'],
    loop: true,
    volume: 0.3,
    context: context,
});

export const backgroundSound = new Howl({
    src: ['./assets/sounds/background.mp3'],
    volume: 0.3,
    context: context,
})
