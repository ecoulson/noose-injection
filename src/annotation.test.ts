import { container } from 'tsyringe';
import { Annotation } from './annotation';

describe('Annotation Test Suite', () => {
    beforeEach(() => {
        container.reset();
    });

    it('Should create an annotation', () => {
        const annotation = new Annotation('Test');

        expect(annotation.name).toEqual('Test');
    });
});
