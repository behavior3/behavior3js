suite('Action: Runner', function() {
    test('Prototype', function() {
        assert.equal(b3.Runner.prototype.name, 'Runner');
    });
    
    test('Tick', function() {
        var failer = new b3.Runner();

        var status = failer._execute(TickStub());
        assert.equal(status, b3.RUNNING);
    });
});