suite('Core: Condition', function() {
    test('Prototype', function() {
        assert.equal(b3.Condition.prototype.category, b3.CONDITION);
    });

    test('Initialization', function() {
        var node = new b3.Condition();

        assert.isNotNullOrUndefined(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.equal(node.category, 'condition');
    });

});