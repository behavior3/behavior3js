suite('Core: Composite', function() {
    test('Prototype', function() {
        assert.equal(b3.Composite.prototype.category, b3.COMPOSITE);
    });

    test('Initialization', function() {
        var node = new b3.Composite({children:['child1', 'child2']});

        assert.isNotNullOrUndefined(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.isNotNullOrUndefined(node.children);

        assert.equal(node.category, 'composite');
        assert.equal(node.children[0], 'child1');
        assert.equal(node.children[1], 'child2');
    });
});