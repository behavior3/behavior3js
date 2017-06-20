import {assert} from 'chai';
import TickStub from '../TickStub';
import {sleep} from '../utils';
import Wait from '../../src/actions/Wait';
import {RUNNING, SUCCESS} from '../../src/constants';

suite('Action: Wait', function() {
    test('Prototype', function() {
        assert.equal(Wait.prototype.name, 'Wait');
    });

    test('Tick', function() {
        var wait = new Wait({milliseconds:15});
        wait.id = 'node1';
        var tick = TickStub();
        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(true);
        tick.blackboard.get
            .withArgs('startTime', 'tree1', 'node1')
            .returns((new Date()).getTime());

        var startTime = (new Date()).getTime();

        var status = wait._execute(tick);
        assert.equal(status, RUNNING);

        while ((new Date()).getTime() - startTime < 25) { sleep(1); }
        var status = wait._execute(tick);
        assert.equal(status, SUCCESS);
    });
});
