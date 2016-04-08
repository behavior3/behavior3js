import {assert} from 'chai';
import TickStub from '../TickStub';
import Failer from '../../src/actions/Failer';
import {FAILURE} from '../../src/constants';

suite('Action: Failer', function() {
    test('Prototype', function() {
        assert.equal(Failer.prototype.name, 'Failer');
    });

    test('Tick', function() {
        var failer = new Failer();

        var status = failer._execute(TickStub());
        assert.equal(status, FAILURE);
    });
});
