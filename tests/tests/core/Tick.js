// store open children
// call debug

suite('Core: Tick', function() {
    test('Initialization', function() {
        var tick = new b3.Tick();
        
        assert.isDefined(tick.tree);
        assert.isDefined(tick.debug);
        assert.isDefined(tick.target);
        assert.isDefined(tick.blackboard);
        assert.isDefined(tick._openNodes);
        assert.isDefined(tick._nodeCount);

        assert.equal(tick._nodeCount, 0);
        assert.equal(tick._openNodes.length, 0);
    });

    test('Updating tick info on enter', function() {
        var tick = new b3.Tick();
        var node = {'id': 'node1'}
        
        tick._enterNode(node);
        assert.equal(tick._nodeCount, 1);
        assert.equal(tick._openNodes.length, 1);
        assert.strictEqual(tick._openNodes[0], node);
    });

    test('Updating tick info on close', function() {
        var tick = new b3.Tick();
        var node = {'id': 'node1'}

        tick._nodeCount = 1;
        tick._openNodes = [node];
        
        tick._closeNode(node);
        assert.equal(tick._nodeCount, 1);
        assert.equal(tick._openNodes.length, 0);
    });

    // test('Callbacks calling debug', function() {
        
    // })
});