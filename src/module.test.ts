import { container } from 'tsyringe';
import { Annotation } from './annotation';
import { Module } from './module';

describe('Module Test Suite', () => {
    const annotation = new Annotation('Test');

    beforeEach(() => {
        container.reset();
    });

    it('Should resolve value', () => {
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

    it('Should resolve class', () => {
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

    it('Should resolve value from submodule', () => {
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
    });
});
