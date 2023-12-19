import { BlurFilter, Container, DisplayObject, Sprite } from "pixi.js";
import { reelTypes } from "./main";
import { FINISHED, STARTED, STOPING, setSpinState } from "./utils/SpinStateService";

type TweenType = {
    object: reelTypes,
    property: 'container' | 'symbols' | "position" | "previousPosition" | "blur",
    target: number,
    time: number,
    easing: (t: number) => number,
    onchange: (() => void) | null,
    oncomplete: (() => void) | null
}

type TweenTypeDate = TweenType & {
    propertyBeginValue: number | BlurFilter | Container<DisplayObject> | Sprite[],
    start: number
}

const tweening: TweenTypeDate[] = [];

export function startSpin(reels: reelTypes[]) {
    setSpinState(STARTED)
    for (let i = 0; i < reels.length; i++) {
        const target = reels[i].position + 10 + i * 5 + 300;
        const time = 1000 + i * 600;

        tweenTo(
            reels[i],
            'position',
            target,
            time,
            backout(0.2),
            null,
            i === reels.length - 1 ? reelsSpinComplete : null
        );
    }
}

export function stopSpin(reels: reelTypes[]) {
    setSpinState(STOPING);

    // get previous tweening 
    const prevTweening = [...tweening]

    // clear tweening 
    tweening.length = 0;

    // number of removed reels
    const removedReelsNumber = reels.length - prevTweening.length;

    for (let i = removedReelsNumber; i < reels.length; i++) {
        const target = Math.trunc(prevTweening[i - (removedReelsNumber)].target);

        tweenTo(
            reels[i],
            'position',
            target,
            i * 200,
            backout(0),
            null,
            i === reels.length - 1 ? reelsSpinComplete : null
        );
    }
}

function reelsSpinComplete() {
    // there should be check for win
    setSpinState(FINISHED)
}

function tweenTo(object: TweenType['object'], property: TweenType['property'], target: TweenType['target'], time: TweenType['time'], easing: TweenType['easing'], onchange: TweenType['onchange'], oncomplete: TweenType['oncomplete']): TweenTypeDate {

    const tween: TweenTypeDate = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        onchange: onchange,
        oncomplete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);

    return tween;
}

export function spin() {
    const now = Date.now();
    const remove: TweenTypeDate[] = [];

    tweening.forEach(element => {
        const phase = Math.min(1, (now - element.start) / element.time);

        if (element.property === 'position' && typeof element.propertyBeginValue === 'number') {
            element.object[element.property] = lerp(element.propertyBeginValue, element.target, element.easing(phase));
        }

        if (element.onchange) {
            element.onchange();
        }

        if (phase === 1) {
            if (element.property === 'position' || element.property === 'previousPosition') {
                element.object[element.property] = element.target;
            }

            if (element.oncomplete) {
                element.oncomplete();
            }

            remove.push(element);
        }
    });

    remove.forEach(element => {
        tweening.splice(tweening.indexOf(element), 1);
    });
}

function lerp(a1: number, a2: number, t: number) {
    return a1 * (1 - t) + a2 * t;
}

function backout(amount: number) {
    return (t: number) => (--t * t * ((amount + 1) * t + amount) + 1);
}
