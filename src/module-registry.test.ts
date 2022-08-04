import { Module, ModuleRegistry } from '.';

class DummyModule extends Module {
    configure(): void {}
}

describe('Module Registry Test Suite', () => {
    const registry = new ModuleRegistry();

    test('Should add module to registry', () => {
        registry.addRegisteredModule(DummyModule);

        expect(registry.isModuleRegistered(DummyModule)).toBeTruthy();
    });

    test('Should reset the registry', () => {
        registry.addRegisteredModule(DummyModule);

        registry.reset();

        expect(registry.isModuleRegistered(DummyModule)).toBeFalsy();
    });
});
