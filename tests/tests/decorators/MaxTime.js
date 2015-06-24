suite('Decorator: MaxTime', function() {
    test('Prototype', function() {
        assert.equal(b3.MaxTime.prototype.name, 'MaxTime');
    });

    test('Failure test', function() {
        var tick = TickStub();
        var startTime = (new Date()).getTime();

        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(startTime)
            .onCall(2).returns(true)
            .onCall(3).returns(startTime);

        var child = {'_execute': sinon.stub()};
        child._execute.returns(b3.RUNNING);
        
        var node = new b3.MaxTime({maxTime:15, child:child});

        var status = node._execute(tick);
        assert.equal(status, b3.RUNNING);

        while ((new Date()).getTime() - startTime < 25) { sleep(1); }
        var status = node._execute(tick);
        assert.equal(status, b3.FAILURE);

    });

    test('Success test', function() {
        var tick = TickStub();
        var startTime = (new Date()).getTime();

        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(startTime)
            .onCall(2).returns(true)
            .onCall(3).returns(startTime);

        var child = {'_execute': sinon.stub()};
        child._execute.returns(b3.RUNNING);
        
        var node = new b3.MaxTime({maxTime:15, child:child});

        var status = node._execute(tick);
        assert.equal(status, b3.RUNNING);

        while ((new Date()).getTime() - startTime < 5) { sleep(1); }
        child._execute.returns(b3.SUCCESS);
        var status = node._execute(tick);
        assert.equal(status, b3.SUCCESS);

    });
});