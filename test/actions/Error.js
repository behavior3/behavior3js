import {assert} from 'chai';
import TickStub from '../TickStub';
import Error from '../../src/actions/Error';
import {ERROR} from '../../src/constants';

suite('Action: Error', function() {
    test('Prototype', function() {
        assert.equal(Error.prototype.name, 'Error');
    });

    test('Tick', function() {
        var failer = new Error();

        var status = failer._execute(TickStub());
        assert.equal(status, ERROR);
    });
});
