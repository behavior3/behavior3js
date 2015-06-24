suite('Core: Decorator', function() {
    test('Prototype', function() {
        assert.equal(b3.Decorator.prototype.category, b3.DECORATOR);
    });

    test('Initialization', function() {
        var node = new b3.Decorator({child:'child1'});

        assert.isNotNullOrUndefined(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.equal(node.child, 'child1');
        assert.equal(node.category, 'decorator');
    });
});