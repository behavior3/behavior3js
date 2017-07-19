import {assert} from 'chai';
import TickStub from '../TickStub';
import Wait from '../../src/actions/Wait';
import {RUNNING, SUCCESS} from '../../src/constants';

suite('Action: Wait', function() {
    test('Name', function() {
        assert.equal(new Wait().name, 'Wait');
    });

    test('Wait.open', function() {
        var now = Date.now();
        var wait = new Wait({milliseconds: 100});
        wait.id = 'node1';
        var tick = TickStub();

        wait.open(tick);
        assert.equal(tick.blackboard.set.callCount, 1);
        assert.equal(tick.blackboard.set.firstCall.args[0], 'startTime');
        assert.equal(tick.blackboard.set.firstCall.args[2], 'tree1');
        assert.equal(tick.blackboard.set.firstCall.args[3], 'node1');
    });

    test('Wait.tick', function () {
        var wait = new Wait({milliseconds: 100});
        var now = Date.now();
        wait.id = 'node1';
        var tick = TickStub();

        tick.blackboard.get.returns(now - 99);
        assert.equal(wait.tick(tick), RUNNING);

        tick.blackboard.get.returns(now - 101);
        assert.equal(wait.tick(tick), SUCCESS);
    });
});
