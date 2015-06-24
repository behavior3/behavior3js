suite('Action: Succeeder', function() {
    test('Prototype', function() {
        assert.equal(b3.Succeeder.prototype.name, 'Succeeder');
    });
    
    test('Tick', function() {
        var failer = new b3.Succeeder();

        var status = failer._execute(TickStub());
        assert.equal(status, b3.SUCCESS);
    });
});