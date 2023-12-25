import * as PIXI from 'pixi.js';

export const creditTextStyle:PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontWeight: '700',
    align: 'center',
    lineHeight: 19,
    wordWrap: true,
    fill: 0xFFFFFF,
});

export const betTextStyle:PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontWeight: '700',
    align: 'center',
    lineHeight: 19,
    wordWrap: true,
    fill: 0xFFFFFF,
    fontSize: 16,
});

export const actionButtonStyle:PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: 'Ariel',
    fontSize: 30,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 5,
    stroke: 0x663300,
    strokeThickness: 3,
    dropShadow: true,
    dropShadowColor: 0x663300,
    dropShadowBlur: 5,
    dropShadowAngle: 6,
    dropShadowDistance: 0,
    fill: ['#eedb9b', 'orange'],
    align: 'center',
});