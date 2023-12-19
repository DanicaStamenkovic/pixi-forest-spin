import * as PIXI from 'pixi.js';

export const FINISHED = 'finished'
export const STARTED = 'started'
export const STOPING = 'stoping'
type SpinState = 'finished' | 'started' | 'stoping'

let SPIN_STATE: SpinState = FINISHED;
export const eventEmitter: PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();

export function setSpinState(value: SpinState): void {
    if(SPIN_STATE !== value) {
        switch(value) {
            case FINISHED: {
                SPIN_STATE = FINISHED
                eventEmitter.emit(FINISHED)
                break
            }
            case STARTED: {
                SPIN_STATE = STARTED
                eventEmitter.emit(STARTED)
                break
            }
            case STOPING: {
                SPIN_STATE = STOPING
                eventEmitter.emit(STOPING)
                break
            }
        }
    }

}

export function isSpinRunning(): boolean {
    return SPIN_STATE === STARTED;
}

export function isSpinStopping(): boolean {
    return SPIN_STATE === STOPING;
}

export function isSpinFinished(): boolean {
    return SPIN_STATE === FINISHED;
}

export function onSpinFinished(callback: () => void): void {
    eventEmitter.on(FINISHED, callback);
}

export function onSpinStart(callback: () => void): void {
    eventEmitter.on(STARTED, callback);
}

export function onSpinStoping(callback: () => void): void {
    eventEmitter.on(STOPING, callback);
}
