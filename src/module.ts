import { container, DependencyContainer } from 'tsyringe';
import { constructor } from 'tsyringe/dist/typings/types';
import { Annotation } from './annotation';

export abstract class Module {
    private readonly container: DependencyContainer;

    constructor() {
        this.container = container;
    }

    abstract configure(): void;

    resolve<T>(annotation: Annotation): T {
        return this.container.resolve<T>(annotation.name);
    }

    protected registerValue<T>(annotation: Annotation, value: T) {
        container.register(annotation.name, {
            useValue: value,
        });
    }

    protected registerClass<T>(
        annotation: Annotation,
        constructor: constructor<T>
    ) {
        container.register(annotation.name, {
            useClass: constructor,
        });
    }

    protected registerModule(module: Module): void {
        module.configure();
    }
}
