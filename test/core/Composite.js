import {assert} from 'chai';
import Composite from '../../src/core/Composite';
import {COMPOSITE} from '../../src/constants';

suite('Core: Composite', function() {
    test('Prototype', function() {
        assert.equal(Composite.prototype.category, COMPOSITE);
    });

    test('Initialization', function() {
        var node = new Composite({children:['child1', 'child2']});

        assert.isOk(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.isOk(node.children);

        assert.equal(node.category, 'composite');
        assert.equal(node.children[0], 'child1');
        assert.equal(node.children[1], 'child2');
    });
});
