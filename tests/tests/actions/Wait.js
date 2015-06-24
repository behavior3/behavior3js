suite('Action: Wait', function() {
    test('Prototype', function() {
        assert.equal(b3.Wait.prototype.name, 'Wait');
    });

    test('Tick', function() {
        var wait = new b3.Wait({milliseconds:15});
        wait.id = 'node1';
        var tick = TickStub();
        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(true);
        tick.blackboard.get
            .withArgs('startTime', 'tree1', 'node1')
            .returns((new Date()).getTime());

        var startTime = (new Date()).getTime();

        var status = wait._execute(tick);
        assert.equal(status, b3.RUNNING);

        while ((new Date()).getTime() - startTime < 25) { sleep(1); }
        var status = wait._execute(tick);
        assert.equal(status, b3.SUCCESS);
    });
});