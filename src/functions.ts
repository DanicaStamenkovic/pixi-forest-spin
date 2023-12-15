import { BlurFilter, Container, DisplayObject, Sprite } from "pixi.js";
import { reelTypes } from "./main";

type TweenType = {
    object: reelTypes,
    property: 'container' | 'symbols' | "position" | "previousPosition" | "blur",
    target: number,
    time: number,
    easing: (t: number) => number,
    onchange: (() => void) | null,
    oncomplete: any
}
type TweenTypeDate = TweenType & {
    propertyBeginValue: number | BlurFilter | Container<DisplayObject> | Sprite[],
    start: number
}
const tweening: TweenTypeDate[] = [];
let running = false;

export function startSpin(reels: reelTypes[]) {
    if (running) return;
    running = true;

    for (let i = 0; i < reels.length; i++) { 
        const extra = Math.floor(Math.random() * 3);
        const target = reels[i].position + 10 + i * 5 + extra;
        const time = 2500 + i * 600 + extra * 600;

        tweenTo(reels[i], 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete(reels) : null);
    }
}

function reelsComplete(reels: reelTypes[]) {
    running = false;

    if (checkForWin(reels)) {
        console.log("You Win!");
    }
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
                element.oncomplete(element);
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


function checkForWin(reels: reelTypes[]): boolean {
    const targetRow = 2;
    
    for (const reel of reels) {
        if (reel.symbols.length <= targetRow || reel.position !== targetRow) {
            return false;
        }
    }
    
    return true;
}
