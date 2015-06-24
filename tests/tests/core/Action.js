suite('Core: Action', function() {
    test('Prototype', function() {
        assert.equal(b3.Action.prototype.category, b3.ACTION);
    });

    test('Initialization', function() {
        var node = new b3.Action();

        assert.isNotNullOrUndefined(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.equal(node.category, 'action');
    });
});