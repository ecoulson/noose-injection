import { container } from 'tsyringe';
import { GlobalRegistry } from '.';
import { Annotation } from './annotation';
import { Module } from './module';

describe('Module Test Suite', () => {
    const annotation = new Annotation('Test');

    beforeEach(() => {
        container.reset();
        GlobalRegistry.reset();
    });

    test('Should resolve value', () => {
        class FakeModule extends Module {
            configure(): void {
                this.registerValue(annotation, 100);
            }
        }
        const module = new FakeModule();
        module.configure();

        const value = module.resolve(annotation);

        expect(value).toEqual(100);
    });

    test('Should resolve class', () => {
        class A {}
        class FakeModule extends Module {
            configure(): void {
                this.registerClass(annotation, A);
            }
        }
        const module = new FakeModule();
        module.configure();

        const value = module.resolve(annotation);

        expect(value).toBeInstanceOf(A);
    });

    test('Should resolve value from submodule', () => {
        class SubModule extends Module {
            configure(): void {
                this.registerValue(annotation, 'foo');
            }
        }
        class FakeModule extends Module {
            configure(): void {
                this.registerModule(new SubModule());
            }
        }
        const module = new FakeModule();
        module.configure();

        const value = module.resolve(annotation);

        expect(value).toEqual('foo');
        expect(module.isRegistered(SubModule));
    });

    test('Should only register the module once', () => {
        class SubModule extends Module {
            configure(): void {
                this.registerValue(annotation, 'foo');
            }
        }
        class FakeModule extends Module {
            configure(): void {
                console.log('here');
                this.registerModule(new SubModule());
                console.log('here');
                this.registerModule(new SubModule());
            }
        }
        const module = new FakeModule();

        expect(() => module.configure()).toThrowError(
            new Error(
                `Can not register a module twice. Attempting to register module ${SubModule.name} twice.`
            )
        );
    });
});
