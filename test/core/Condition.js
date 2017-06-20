import {assert} from 'chai';
import Condition from '../../src/core/Condition';
import {CONDITION} from '../../src/constants';

suite('Core: Condition', function() {
    test('Prototype', function() {
        assert.equal(Condition.prototype.category, CONDITION);
    });

    test('Initialization', function() {
        var node = new Condition();

        assert.isOk(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.equal(node.category, 'condition');
    });

});
