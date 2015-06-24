suite('Decorator: Limiter', function() {
    test('Prototype', function() {
        assert.equal(b3.Limiter.prototype.name, 'Limiter');
    });

    test('Initialization', function() {
        var node = new b3.Limiter({maxLoop:3});
        assert.equal(node.name, 'Limiter');
    });

    test('Open', function() {
        var child = {'_execute': sinon.stub()};
        var tick = TickStub();
        var node = new b3.Limiter({maxLoop:3, child:child});
        node.id = 'node1';

        node._execute(tick);
        assert.isTrue(tick.blackboard.set.calledWith('i', 0, 'tree1', 'node1'));
    });

    test('Test Maximum Repetition', function() {
        var child = {'_execute': sinon.stub()};
        var tick = TickStub();
        var node = new b3.Limiter({maxLoop:10,child: child});

        child._execute.returns(b3.SUCCESS);
        node.id = 'node1';

        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(0)
            .onCall(2).returns(true)
            .onCall(3).returns(10);

        node._execute(tick);
        assert.equal(child._execute.callCount, 1);

        node._execute(tick);
        assert.equal(child._execute.callCount, 1);
    });

    test('RUNNING doesnt count', function() {
        var child = {'_execute': sinon.stub()};
        var tick = TickStub();
        var node = new b3.Limiter({maxLoop:10,child: child});

        child._execute.returns(b3.RUNNING);
        node.id = 'node1';

        node._execute(tick);
        assert.isTrue(tick.blackboard.set.calledWith('i', 0, 'tree1', 'node1'));
        assert.isFalse(tick.blackboard.set.calledWith('i', 1, 'tree1', 'node1'));
    });
});