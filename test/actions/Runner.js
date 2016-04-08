import {assert} from 'chai';
import TickStub from '../TickStub';
import Runner from '../../src/actions/Runner';
import {RUNNING} from '../../src/constants';

suite('Action: Runner', function() {
    test('Prototype', function() {
        assert.equal(Runner.prototype.name, 'Runner');
    });

    test('Tick', function() {
        var failer = new Runner();

        var status = failer._execute(TickStub());
        assert.equal(status, RUNNING);
    });
});
