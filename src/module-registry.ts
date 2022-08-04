import { Module } from '.';

export class ModuleRegistry {
    private registry: Set<typeof Module>;

    constructor() {
        this.registry = new Set();
    }

    addRegisteredModule(moduleConstructor: typeof Module): boolean {
        if (this.isModuleRegistered(moduleConstructor)) {
            return false;
        }
        this.registry.add(moduleConstructor);
        return true;
    }

    isModuleRegistered(moduleConstructor: typeof Module): boolean {
        return this.registry.has(moduleConstructor);
    }

    reset() {
        this.registry = new Set();
    }
}
