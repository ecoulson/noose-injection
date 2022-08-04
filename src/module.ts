import { container, DependencyContainer } from 'tsyringe';
import { constructor } from 'tsyringe/dist/typings/types';
import { GlobalRegistry } from '.';
import { Annotation } from './annotation';
import { ModuleRegistry } from './module-registry';

export abstract class Module {
    private readonly container: DependencyContainer;
    private readonly registry: ModuleRegistry;

    constructor() {
        this.container = container;
        this.registry = GlobalRegistry;
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
        const moduleConstructor = Object.getPrototypeOf(module).constructor;
        if (!this.isRegistered(moduleConstructor)) {
            this.registry.addRegisteredModule(moduleConstructor);
            module.configure();
        } else {
            throw new Error(
                `Can not register a module twice. Attempting to register module ${moduleConstructor.name} twice.`
            );
        }
    }

    isRegistered(moduleConstructor: typeof Module): boolean {
        return this.registry.isModuleRegistered(moduleConstructor);
    }
}
