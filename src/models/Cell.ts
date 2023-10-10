interface ICell {
    value: number | undefined,
    isReadonly: boolean
}

export class Cell implements ICell {
    value: number | undefined;
    isReadonly: boolean;

    constructor(isReadonly: boolean, value: number | undefined) {
        this.isReadonly = isReadonly;
        this.value = value;
    }
}