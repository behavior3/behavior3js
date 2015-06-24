suite('Core: BaseNode', function() {
    test('Initialization', function() {
        var node = new b3.BaseNode();

        assert.isNotNullOrUndefined(node.id);
        assert.isDefined(node.name);
        assert.isDefined(node.category);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.isNotNullOrUndefined(node.parameters);
        assert.isNotNullOrUndefined(node.properties);
        assert.isUndefined(node.children);
        assert.isUndefined(node.child);
    });

    test('Open Node', function() {
        var node = new b3.BaseNode();
        var tick = TickStub();
        node.id = 'node1';
        node._execute(tick);

        var method = tick.blackboard.set.withArgs('isOpen', true, 'tree1', 'node1');
        assert.isTrue(method.calledOnce);
    });

    test('Close Node', function() {
        var node = new b3.BaseNode();
        var tick = TickStub();
        node.id = 'node1';
        node._execute(tick);

        var method = tick.blackboard.set.withArgs('isOpen', false, 'tree1', 'node1');
        assert.isTrue(method.calledOnce);
    });

    test('Execute is calling functions?', function() {
        var node = new b3.BaseNode();
        var tick = TickStub();

        tick.blackboard.get
            .withArgs('isOpen', 'tree1', 'node1')
            .returns(false);

        node.id    = 'node1';
        node.enter = sinon.spy();
        node.open  = sinon.spy();
        node.tick  = sinon.stub();
        node.tick.returns(b3.SUCCESS);
        node.close = sinon.spy();
        node.exit  = sinon.spy();
        node._execute(tick);

        assert.isTrue(node.enter.withArgs(tick).calledOnce);
        assert.isTrue(node.open.withArgs(tick).calledOnce);
        assert.isTrue(node.tick.withArgs(tick).calledOnce);
        assert.isTrue(node.close.withArgs(tick).calledOnce);
        assert.isTrue(node.exit.withArgs(tick).calledOnce);
    });

    test('Execute does not opening a node already open', function() {
        var node = new b3.BaseNode();
        var tick = TickStub();

        tick.blackboard.get
            .withArgs('isOpen', 'tree1', 'node1')
            .returns(true);

        node.id = 'node1';
        node.open  = sinon.spy();
        node._execute(tick);

        assert.isTrue(node.open.neverCalledWith(tick));
    });

    test('Execute closing the node that does not returns RUNNING', function() {
        var node = new b3.BaseNode();
        var tick = TickStub();

        tick.blackboard.get.returns(false);

        node.id = 'node1';
        node.close  = sinon.spy();
        node.tick  = sinon.stub();
        node.tick.returns(b3.RUNNING);
        node._execute(tick);

        assert.isTrue(node.close.neverCalledWith(tick));
    });

    test('Execute calling tick callbacks', function() {
        var node = new b3.BaseNode();
        var tick = TickStub();

        tick.blackboard.get.returns(false);
        node._execute(tick);

        assert.isTrue(tick._enterNode.withArgs(node).calledOnce);
        assert.isTrue(tick._openNode.withArgs(node).calledOnce);
        assert.isTrue(tick._tickNode.withArgs(node).calledOnce);
        assert.isTrue(tick._closeNode.withArgs(node).calledOnce);
        assert.isTrue(tick._exitNode.withArgs(node).calledOnce);
    });

});