suite('Composite: MemPriority', function() {
    var getNode = function() {
        var _execute = sinon.stub();

        for (var i=0; i<arguments.length; i++) {
            _execute.onCall(i).returns(arguments[i]);
        }

        return {'_execute': _execute};
    }

    test('Prototype', function() {
        assert.equal(b3.MemPriority.prototype.name, 'MemPriority');
    });

    test('Open', function() {
        var mpriority = new b3.MemPriority();
        var tick = TickStub();
        mpriority.id = 'node1';
        mpriority.open(tick);

        var method = tick.blackboard.set.withArgs('runningChild', 0, 'tree1', 'node1')
        assert.isTrue(method.calledOnce);
    })

    test('Success', function() {
        var node1 = getNode(b3.FAILURE);
        var node2 = getNode(b3.SUCCESS);
        var node3 = getNode(b3.SUCCESS);

        var mpriority = new b3.MemPriority({children:[node1, node2, node3]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);

        assert.equal(status, b3.SUCCESS);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isFalse(node3._execute.called);
    });

    test('Failure', function() {
        var node1 = getNode(b3.FAILURE);
        var node2 = getNode(b3.FAILURE);
        var node3 = getNode(b3.FAILURE);

        var mpriority = new b3.MemPriority({children:[node1, node2, node3]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);

        assert.equal(status, b3.FAILURE);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
    });

    test('Running', function() {
        var node1 = getNode(b3.FAILURE);
        var node2 = getNode(b3.FAILURE);
        var node3 = getNode(b3.RUNNING);
        var node4 = getNode(b3.SUCCESS);

        var mpriority = new b3.MemPriority({children:[node1, node2, node3, node4]});
        var tick = TickStub();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);

        assert.equal(status, b3.RUNNING);
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledOnce);
        assert.isFalse(node4._execute.called);
    });

    test('Memory Tick', function() {
        var node1 = getNode(b3.FAILURE);
        var node2 = getNode(b3.FAILURE);
        var node3 = getNode(b3.RUNNING, b3.FAILURE);
        var node4 = getNode(b3.SUCCESS);
        var node5 = getNode(b3.FAILURE);

        var mpriority = new b3.MemPriority({children:[node1, node2, node3, node4, node5]});
        var tick = TickStub();
        mpriority.id = 'node1';

        // Execute two times, the first returning running, the second failure
        tick.blackboard.get.withArgs('runningChild', 'tree1', 'node1')
                           .returns(0)
        var status = mpriority._execute(tick);
        assert.equal(status, b3.RUNNING);

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
        assert.equal(status, b3.SUCCESS);

        // Verifies the node activations
        assert.isTrue(node1._execute.calledOnce);
        assert.isTrue(node2._execute.calledOnce);
        assert.isTrue(node3._execute.calledTwice);
        assert.isTrue(node4._execute.calledOnce);
        assert.isFalse(node5._execute.called);
    })
});