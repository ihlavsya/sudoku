import { Color } from "../enums/ColorEnum";

interface IColorIsReadonly {
    color: Color;
    isReadonly: boolean;
}

export class ColorIsReadonly implements IColorIsReadonly {
    color: Color;
    isReadonly: boolean = false;

    constructor(color: Color, isReadonly: boolean) {
        this.color = color;
        this.isReadonly = isReadonly;
    }
}