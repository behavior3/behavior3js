import {assert} from 'chai';
import TickStub from '../TickStub';
import Failer from '../../src/actions/Failer';
import {FAILURE} from '../../src/constants';

suite('Action: Failer', function() {
    test('Name', function() {
        assert.equal(new Failer().name, 'Failer');
    });

    test('Tick', function() {
        var failer = new Failer();

        var status = failer._execute(TickStub());
        assert.equal(status, FAILURE);
    });
});
