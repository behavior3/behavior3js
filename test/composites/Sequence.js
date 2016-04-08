import {stub, spy} from 'sinon';
import {assert} from 'chai';
import Sequence from '../../src/composites/Sequence';
import {FAILURE, SUCCESS, RUNNING} from '../../src/constants';

suite('Composite: Sequence', function() {
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

    test('Prototype', function() {
        assert.equal(Sequence.prototype.name, 'Sequence');
    });

    test('Success', function() {
        var node1 = getNode(SUCCESS);
        var node2 = getNode(SUCCESS);
        var node3 = getNode(SUCCESS);

        var sequence = new Sequence({children:[node1, node2, node3]});
        var status = sequence.tick(getTick());

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

        var sequence = new Sequence({children:[node1, node2, node3, node4]});
        var status = sequence.tick(getTick());

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

        var sequence = new Sequence({children:[node1, node2, node3, node4]});
        var status = sequence.tick(getTick());

        assert.equal(status, RUNNING);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isFalse(node4._execute.called);
    });
});
