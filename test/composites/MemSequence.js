import {stub} from 'sinon';
import {assert} from 'chai';
import TickStub from '../TickStub';
import MemSequence from '../../src/composites/MemSequence';
import {RUNNING, SUCCESS, FAILURE} from '../../src/constants';

suite('Composite: MemSequence', function() {
    var getNode = function() {
        var _execute = stub();

        for (var i=0; i<arguments.length; i++) {
            _execute.onCall(i).returns(arguments[i]);
        }

        return {'_execute': _execute};
    }

    test('Prototype', function() {
        assert.equal(MemSequence.prototype.name, 'MemSequence');
    });

    test('Open', function() {
        var msequence = new MemSequence();
        var tick = TickStub();
        msequence.id = 'node1';
        msequence.open(tick);

        var method = tick.blackboard.set.withArgs('runningChild', 0, 'tree1', 'node1')
        assert.isTrue(method.calledOnce);
    })

    test('Success', function() {
        var node1 = getNode(SUCCESS);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(SUCCESS);

        var sequence = new MemSequence({children:[node1, node2, node3]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = sequence.tick(tick);

        assert.equal(status, SUCCESS);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
    });

    test('Failure', function() {
        var node1 = getNode(SUCCESS);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(FAILURE);
        var node4 = getNode(SUCCESS);

        var sequence = new MemSequence({children:[node1, node2, node3, node4]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = sequence.tick(tick);

        assert.equal(status, FAILURE);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isFalse(node4._execute.called);
    });

    test('Running', function() {
        var node1 = getNode(SUCCESS);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(RUNNING);
        var node4 = getNode(SUCCESS);

        var sequence = new MemSequence({children:[node1, node2, node3, node4]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = sequence.tick(tick);

        assert.equal(status, RUNNING);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isFalse(node4._execute.called);
    });

    test('Memory Tick', function() {
        var node1 = getNode(SUCCESS);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(RUNNING, SUCCESS);
        var node4 = getNode(FAILURE);
        var node5 = getNode(SUCCESS);

        var msequence = new MemSequence({children:[node1, node2, node3, node4, node5]});
        var tick = TickStub();
        msequence.id = 'node1';

        // Execute two times, the first returning running, the second failure
        tick.blackboard.get.withArgs('runningChild', 'tree1', 'node1')
                           .returns(0)
        var status = msequence._execute(tick);
        assert.equal(status, RUNNING);

        assert.isTrue(
            tick.blackboard.set
                .withArgs('runningChild', 0, 'tree1', 'node1')
                .calledOnce
        );
        assert.isTrue(
            tick.blackboard.set
                .withArgs('runningChild', 2, 'tree1', 'node1')
                .calledOnce
        );

        // second _execute
        tick.blackboard.get.withArgs('runningChild', 'tree1', 'node1')
                           .returns(2)
        
        status = msequence._execute(tick);
        assert.equal(status, FAILURE);

        // Verifies the node activations
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledTwice);
        assert.isTrue(node4._execute.calledOnce);
        assert.isFalse(node5._execute.called);
    })
});
