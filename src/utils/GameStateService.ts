import * as PIXI from 'pixi.js';

export const FINISHED = 'finished'
export const STARTED = 'started'
export const STOPING = 'stoping'
export const WIN = 'win'
type GameState = 'finished' | 'started' | 'stoping' | 'win'

let GAME_STATE: GameState = FINISHED;
export const eventEmitter: PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();

export function setSpinState(value: GameState): void {
    if(GAME_STATE !== value) {
        switch(value) {
            case FINISHED: {
                GAME_STATE = FINISHED
                eventEmitter.emit(FINISHED)
                break
            }
            case STARTED: {
                GAME_STATE = STARTED
                eventEmitter.emit(STARTED)
                break
            }
            case STOPING: {
                GAME_STATE = STOPING
                eventEmitter.emit(STOPING)
                break
            }
            case WIN: {
                GAME_STATE = WIN
                eventEmitter.emit(WIN)
                break
            }
        }
    }

}

export function isSpinRunning(): boolean {
    return GAME_STATE === STARTED;
}

export function isSpinStopping(): boolean {
    return GAME_STATE === STOPING;
}

export function isSpinFinished(): boolean {
    return GAME_STATE === FINISHED;
}

export function isWin(): boolean {
    return GAME_STATE === WIN;
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

export function onGameWin(callback: () => void): void {
    eventEmitter.on(WIN, callback);
}

