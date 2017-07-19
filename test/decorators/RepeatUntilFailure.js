import {stub} from 'sinon';
import {assert} from 'chai';
import TickStub from '../TickStub';
import RepeatUntilFailure from '../../src/decorators/RepeatUntilFailure';
import {SUCCESS, ERROR, RUNNING, FAILURE} from '../../src/constants';

suite('Decorator: RepeatUntilFailure', function() {
    test('Name', function() {
        assert.equal(new RepeatUntilFailure().name, 'RepeatUntilFailure');
    });

    test('Initialization', function() {
        var node = new RepeatUntilFailure();
        assert.equal(node.maxLoop, -1);
        assert.equal(node.name, 'RepeatUntilFailure');

        var node = new RepeatUntilFailure({maxLoop:5});
        assert.equal(node.maxLoop, 5);
    });

    test('Test Maximum Repetition', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(SUCCESS);

        var node = new RepeatUntilFailure({maxLoop: 7, child: child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 7);
        assert.equal(status, SUCCESS);
    });

    test('Test Repeat interruption (by FAILURE)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(SUCCESS);
        child._execute.onCall(3).returns(FAILURE);

        var node = new RepeatUntilFailure({maxLoop: 50, child: child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 4);
        assert.equal(status, FAILURE);
    });

    test('Test Repeat interruption (by RUNNING)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(SUCCESS);
        child._execute.onCall(5).returns(RUNNING);

        var node = new RepeatUntilFailure({maxLoop: 50, child: child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 6);
        assert.equal(status, RUNNING);
    });

    test('Test Repeat interruption (by ERROR)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(SUCCESS);
        child._execute.onCall(3).returns(ERROR);

        var node = new RepeatUntilFailure({maxLoop: 50, child: child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 4);
        assert.equal(status, ERROR);
    });

});
