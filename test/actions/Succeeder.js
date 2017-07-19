import {assert} from 'chai';
import TickStub from '../TickStub';
import Succeeder from '../../src/actions/Succeeder';
import {SUCCESS} from '../../src/constants';

suite('Action: Succeeder', function() {
    test('Name', function() {
        assert.equal(new Succeeder().name, 'Succeeder');
    });

    test('Tick', function() {
        var failer = new Succeeder();

        var status = failer._execute(TickStub());
        assert.equal(status, SUCCESS);
    });
});
