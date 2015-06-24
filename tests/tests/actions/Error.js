suite('Action: Error', function() {
    test('Prototype', function() {
        assert.equal(b3.Error.prototype.name, 'Error');
    });
    
    test('Tick', function() {
        var failer = new b3.Error();

        var status = failer._execute(TickStub());
        assert.equal(status, b3.ERROR);
    });
});