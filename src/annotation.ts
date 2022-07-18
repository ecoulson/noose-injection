import { inject } from 'tsyringe';

export class Annotation {
    constructor(public readonly name: string) {}

    inject() {
        return (target: any, propertyName: string, parameterIndex: number) =>
            inject(this.name)(target, propertyName, parameterIndex);
    }
}
