suite('Decorator: RepeatUntilFailure', function() {
    test('Prototype', function() {
        assert.equal(b3.RepeatUntilFailure.prototype.name, 'RepeatUntilFailure');
    });

    test('Initialization', function() {
        var node = new b3.RepeatUntilFailure();
        assert.equal(node.maxLoop, -1);
        assert.equal(node.name, 'RepeatUntilFailure');

        var node = new b3.RepeatUntilFailure({maxLoop:5});
        assert.equal(node.maxLoop, 5);
    });

    test('Test Maximum Repetition', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': sinon.stub()};
        child._execute.returns(b3.SUCCESS);

        var node = new b3.RepeatUntilFailure({maxLoop:7, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 7);
        assert.equal(status, b3.SUCCESS);
    });

    test('Test Repeat interruption (by FAILURE)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': sinon.stub()};
        child._execute.returns(b3.SUCCESS);
        child._execute.onCall(3).returns(b3.FAILURE);

        var node = new b3.RepeatUntilFailure({maxLoop:50, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 4);
        assert.equal(status, b3.FAILURE);
    });

    test('Test Repeat interruption (by RUNNING)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': sinon.stub()};
        child._execute.returns(b3.SUCCESS);
        child._execute.onCall(5).returns(b3.RUNNING);

        var node = new b3.RepeatUntilFailure({maxLoop:50, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 6);
        assert.equal(status, b3.RUNNING);
    });

    test('Test Repeat interruption (by ERROR)', function() {
        var tick = TickStub();
        tick.blackboard.get.returns(0);

        var child = {'_execute': sinon.stub()};
        child._execute.returns(b3.SUCCESS);
        child._execute.onCall(3).returns(b3.ERROR);

        var node = new b3.RepeatUntilFailure({maxLoop:50, child:child});

        var status = node._execute(tick);
        assert.equal(child._execute.callCount, 4);
        assert.equal(status, b3.ERROR);
    });

});