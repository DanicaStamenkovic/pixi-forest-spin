import * as PIXI from 'pixi.js';

export function Tab(labelText: string, valueText: string, style: PIXI.TextStyle) {
    const tab = new PIXI.Graphics()
    tab.beginFill('transparent')
    .lineStyle(1, 0x6d511f, 1)
    .drawRoundedRect(0, 0, 150, 45, 15)

    const label = new PIXI.Text(labelText, {...style, fontSize: 11});
    const value = new PIXI.Text(valueText, {...style, fontSize: 18});
    label.position.set((tab.width - label.width) / 2, 0);
    value.position.set((tab.width - value.width) / 2, style.lineHeight);

    tab.addChild(label, value);

    return { tab, value };
}