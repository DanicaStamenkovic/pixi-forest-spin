import * as PIXI from 'pixi.js';
import { ButtonWithIcon } from '../ButtonWithIcon';

export function SelectBet(options: number[], onSelect: (selectedOption: number) => void) {
    const container = new PIXI.Container();
    const optionsWrapper = new PIXI.Container()

    const optionsWrapperBg = new PIXI.Graphics()
    .beginFill(0x610e00)
    .drawRoundedRect(0, 0, 220, 200, 15)
    optionsWrapper.addChild(optionsWrapperBg);
    optionsWrapper.visible = false;

    const optionValues = options.map(option => {
        const optionContainer = new PIXI.Container();
        const optionText = new PIXI.Text(option, { fontSize: 16, lineHeight: 18, fill: 0xffffff });
        // border option
        const optionBorder = new PIXI.Graphics()
          .lineStyle(2, 0x6d511f)
          .drawRoundedRect(0, 0, 40, optionText.height + 10, 10);
        optionText.position.set((optionBorder.width / 2) - (optionText.width / 2), (optionBorder.height / 2) - (optionText.style.lineHeight / 2))

        optionContainer.addChild(optionBorder, optionText);
        optionContainer.eventMode = 'static';
        optionContainer.cursor = 'pointer';
        optionsWrapper.addChild(optionContainer);

        return {
          container: optionContainer, text: optionText};
    });
  
    const totalOptionsWidth = optionValues.reduce((total, option) => total + option.container.width, 0);
    const selectOption = (option:number) => {
        optionsWrapper.visible = false;
      
        if (typeof onSelect === 'function') {
            onSelect(option);
         }
    };

    // Position individual options
    let currentRow = 0;
    let offsetX = 0;
    optionValues.forEach((optionContainer) => {
        const currentOptionsWidth = Math.min(totalOptionsWidth - offsetX, optionsWrapperBg.width);
        
        // add columns 
        if (offsetX + optionContainer.container.width > currentOptionsWidth) {
            currentRow++;
            offsetX = 0;
        }

        const offsetY = currentRow * (optionContainer.container.height + 15); //spacing between columns
        optionContainer.container.position.set(offsetX + 15, offsetY + 20 );
        offsetX += optionContainer.container.width + 8; //spacing between options

        optionContainer.container.on('pointerdown', () => selectOption(Number(optionContainer.text.text)));
    });

    // SELECT BUTTON
    const toggleDropdown = () => {
        optionsWrapper.visible = !optionsWrapper.visible;
        rotateIcon();

        if (optionsWrapper.visible) {
          optionsWrapper.position.set(-60, -230);
        }
    };

    const { button, rotateIcon } = ButtonWithIcon("./../assets/images/open-dropdown.png", toggleDropdown);
    const buttonBg = new PIXI.Graphics()
      .beginFill('transparent')
      .drawRoundedRect(0, 0, 60, 30, 15);
      button.addChild(buttonBg);

    //import elements
    container.addChild(optionsWrapper);
    container.addChild(button);
    
    return container;
}

    