import { Layout, Styles } from "@pixi/layout";

export class BaseScreen extends Layout {
    constructor(id: string, styles?: Styles) {
        super({
            id,
            styles: {
                width: '100%',
                height: '100%',
                ...styles,
            }
        })

        this.id = id
    }

    public resize(parentWidth?: number | undefined, parentHeight?: number | undefined): void {
        super.resize(parentWidth, parentHeight);
    }

    public showScreen() {
        this.alpha = 0;
    }

    public hideScreen() {
        this.alpha = 1;
    }
}
