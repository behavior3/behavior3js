import {stub} from 'sinon';
import {assert} from 'chai';
import TickStub from '../TickStub';
import MemPriority from '../../src/composites/MemPriority';
import {FAILURE, RUNNING, SUCCESS} from '../../src/constants';

suite('Composite: MemPriority', function() {
    var getNode = function() {
        var _execute = stub();

        for (var i=0; i<arguments.length; i++) {
            _execute.onCall(i).returns(arguments[i]);
        }

        return {'_execute': _execute};
    }

    test('Name', function() {
        assert.equal(new MemPriority().name, 'MemPriority');
    });

    test('Open', function() {
        var mpriority = new MemPriority();
        var tick = TickStub();
        mpriority.id = 'node1';
        mpriority.open(tick);

        var method = tick.blackboard.set.withArgs('runningChild', 0, 'tree1', 'node1')
        assert.isTrue(method.calledOnce);
    })

    test('Success', function() {
        var node1 = getNode(FAILURE);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(SUCCESS);

        var mpriority = new MemPriority({children:[node1, node2, node3]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);

        assert.equal(status, SUCCESS);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isFalse(node3._execute.called);
    });

    test('Failure', function() {
        var node1 = getNode(FAILURE);
        var node2 = getNode(FAILURE);
        var node3 = getNode(FAILURE);

        var mpriority = new MemPriority({children:[node1, node2, node3]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);

        assert.equal(status, FAILURE);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
    });

    test('Running', function() {
        var node1 = getNode(FAILURE);
        var node2 = getNode(FAILURE);
        var node3 = getNode(RUNNING);
        var node4 = getNode(SUCCESS);

        var mpriority = new MemPriority({children:[node1, node2, node3, node4]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);

        assert.equal(status, RUNNING);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isFalse(node4._execute.called);
    });

    test('Memory Tick', function() {
        var node1 = getNode(FAILURE);
        var node2 = getNode(FAILURE);
        var node3 = getNode(RUNNING, FAILURE);
        var node4 = getNode(SUCCESS);
        var node5 = getNode(FAILURE);

        var mpriority = new MemPriority({children:[node1, node2, node3, node4, node5]});
        var tick = TickStub();
        mpriority.id = 'node1';

        // Execute two times, the first returning running, the second failure
        tick.blackboard.get.withArgs('runningChild', 'tree1', 'node1')
                           .returns(0)
        var status = mpriority._execute(tick);
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

        // second execute
        tick.blackboard.get.withArgs('runningChild', 'tree1', 'node1')
                           .returns(2)

        status = mpriority._execute(tick);
        assert.equal(status, SUCCESS);

        // Verifies the node activations
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledTwice);
        assert.isTrue(node4._execute.calledOnce);
        assert.isFalse(node5._execute.called);
    })
});
