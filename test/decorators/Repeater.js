import {stub} from 'sinon';
import {assert} from 'chai';
import TickStub from '../TickStub';
import Repeater from '../../src/decorators/Repeater';
import {SUCCESS, RUNNING, ERROR} from '../../src/constants';

suite('Decorator: Repeater', function() {
    test('Prototype', function() {
        assert.equal(Repeater.prototype.name, 'Repeater');
    });

    test('Initialization', function() {
        var node = new Repeater();
        assert.equal(node.maxLoop, -1);
        assert.equal(node.name, 'Repeater');

        var node = new Repeater({maxLoop:5});
        assert.equal(node.maxLoop, 5);
    });

    test('Test Maximum Repetition', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(SUCCESS);

        var node = new Repeater({maxLoop:7, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 7);
        assert.equal(status, SUCCESS);
    });

    test('Test Repeat interruption (by RUNNING)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(SUCCESS);
        child._execute.onCall(5).returns(RUNNING);

        var node = new Repeater({maxLoop:50,child: child});

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

        var node = new Repeater({maxLoop:50,child: child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 4);
        assert.equal(status, ERROR);
    });

    test('Remembering ', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': stub()};
        child._execute.returns(SUCCESS);
        child._execute.onCall(3).returns(RUNNING);

        var node = new Repeater({maxLoop:10,child: child});
        node.id = 'node1'

        node._execute(tick);
        assert.equal(child._execute.callCount, 4);
        assert.isTrue(tick.blackboard.set.calledWith('i', 3, 'tree1', 'node1'));

        tick.blackboard.get.returns(3);
        node._execute(tick);
        assert.equal(child._execute.callCount, 11);
    });
});
