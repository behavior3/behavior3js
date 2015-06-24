suite('Action: Failer', function() {
    test('Prototype', function() {
        assert.equal(b3.Failer.prototype.name, 'Failer');
    });
    
    test('Tick', function() {
        var failer = new b3.Failer();

        var status = failer._execute(TickStub());
        assert.equal(status, b3.FAILURE);
    });
});