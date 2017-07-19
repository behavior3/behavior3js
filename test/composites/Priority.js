import {stub, spy} from 'sinon';
import {assert} from 'chai';
import Priority from '../../src/composites/Priority';
import {FAILURE, SUCCESS, RUNNING} from '../../src/constants';

suite('Composite: Priority', function() {
    var getNode = function(status) {
        var _execute = stub();
        _execute.returns(status);

        return {'_execute': _execute};
    }

    var getTick = function() {
        return {
            'tickNode': spy()
        };
    }

    test('Name', function() {
        assert.equal(new Priority().name, 'Priority');
    });

    test('Success', function() {
        var node1 = getNode(FAILURE);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(SUCCESS);

        var sequence = new Priority({children:[node1, node2, node3]});
        var status = sequence.tick(getTick());

        assert.equal(status, SUCCESS);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isFalse(node3._execute.called);
    });

    test('Failure', function() {
        var node1 = getNode(FAILURE);
        var node2 = getNode(FAILURE);
        var node3 = getNode(FAILURE);

        var sequence = new Priority({children:[node1, node2, node3]});
        var status = sequence.tick(getTick());

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

        var sequence = new Priority({children:[node1, node2, node3, node4]});
        var status = sequence.tick(getTick());

        assert.equal(status, RUNNING);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isFalse(node4._execute.called);
    });
});
