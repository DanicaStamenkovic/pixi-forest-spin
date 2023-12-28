import { BaseScreen } from '../components/BaseScreen';
import { Layout } from '@pixi/layout';
import { Background } from '../components/Background';
import { app } from '../main';

class Game {
    private currentScreen?: BaseScreen;
    private width!: number;
    private height!: number;
    public bg!: Layout;

    //game background
    addBackground () {
        this.bg = new Background();
        this.bg.resize(this.width, this.height);
        app.stage.addChild(this.bg);
    }

    public resize(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.currentScreen?.resize?.(w, h); // Resize current screen, if available
        this.bg?.resize(w, h); // Resize background, if available
    }
}

export const game = new Game(); // Export a new instance of the game