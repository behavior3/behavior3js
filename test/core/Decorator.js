import {assert} from 'chai';
import Decorator from '../../src/core/Decorator';
import {DECORATOR} from '../../src/constants';

suite('Core: Decorator', function() {
    test('Prototype', function() {
        assert.equal(Decorator.prototype.category, DECORATOR);
    });

    test('Initialization', function() {
        var node = new Decorator({child:'child1'});

        assert.isOk(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.equal(node.child, 'child1');
        assert.equal(node.category, 'decorator');
    });
});
