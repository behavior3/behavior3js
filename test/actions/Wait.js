import {assert} from 'chai';
import TickStub from '../TickStub';
import Wait from '../../src/actions/Wait';
import {RUNNING, SUCCESS} from '../../src/constants';

suite('Action: Wait', function() {
    test('Prototype', function() {
        assert.equal(Wait.prototype.name, 'Wait');
    });

    test('Tick', function(done) {
        var now = Date.now();
        var wait = new Wait({milliseconds: 100});
        wait.id = 'node1';
        var tick = TickStub();
        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(true);
        tick.blackboard.get
            .withArgs('startTime', 'tree1', 'node1')
            .returns(now);

        var startTime = now;

        const status = wait._execute(tick);
        assert.equal(status, RUNNING);

        setTimeout(function() {
            const status = wait._execute(tick);
            assert.equal(status, SUCCESS);
            done();
        }, 200);
    });
});
