suite('Composite: Sequence', function() {
    var getNode = function(status) {
        var _execute = sinon.stub();
        _execute.returns(status);

        return {'_execute': _execute};
    }

    var getTick = function() {
        return tick = {
            'tickNode': sinon.spy()
        }
    }

    test('Prototype', function() {
        assert.equal(b3.Sequence.prototype.name, 'Sequence');
    });

    test('Success', function() {
        var node1 = getNode(b3.SUCCESS);
        var node2 = getNode(b3.SUCCESS);
        var node3 = getNode(b3.SUCCESS);

        var sequence = new b3.Sequence({children:[node1, node2, node3]});
        var status = sequence.tick(getTick());

        assert.equal(status, b3.SUCCESS);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
    });

    test('Failure', function() {
        var node1 = getNode(b3.SUCCESS);
        var node2 = getNode(b3.SUCCESS);
        var node3 = getNode(b3.FAILURE);
        var node4 = getNode(b3.SUCCESS);

        var sequence = new b3.Sequence({children:[node1, node2, node3, node4]});
        var status = sequence.tick(getTick());

        assert.equal(status, b3.FAILURE);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isFalse(node4._execute.called);
    });

    test('Running', function() {
        var node1 = getNode(b3.SUCCESS);
        var node2 = getNode(b3.SUCCESS);
        var node3 = getNode(b3.RUNNING);
        var node4 = getNode(b3.SUCCESS);

        var sequence = new b3.Sequence({children:[node1, node2, node3, node4]});
        var status = sequence.tick(getTick());

        assert.equal(status, b3.RUNNING);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isFalse(node4._execute.called);
    });
});