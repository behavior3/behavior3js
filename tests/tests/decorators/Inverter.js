suite('Decorator: Inverter', function() {
    test('Prototype', function() {
        assert.equal(b3.Inverter.prototype.name, 'Inverter');
    });

    test('Initialization', function() {
        var node = new b3.Inverter();
        assert.equal(node.name, 'Inverter');
    });

    test('Inverting Values', function() {
        var tick = TickStub();
        var child = {'_execute': sinon.stub()};
        var node = new b3.Inverter({child:child});
        var status = 0;
        
        child._execute.returns(b3.SUCCESS);
        status = node._execute(tick);
        assert.equal(status, b3.FAILURE);

        child._execute.returns(b3.FAILURE);
        status = node._execute(tick);
        assert.equal(status, b3.SUCCESS);
    });

    test('Running and Error', function() {
        var tick = TickStub();
        var child = {'_execute': sinon.stub()};
        var node = new b3.Inverter({child:child});
        var status = 0;
        
        child._execute.returns(b3.RUNNING);
        status = node._execute(tick);
        assert.equal(status, b3.RUNNING);

        child._execute.returns(b3.ERROR);
        status = node._execute(tick);
        assert.equal(status, b3.ERROR);
    });

});