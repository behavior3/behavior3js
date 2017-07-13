import {stub} from 'sinon';
import {assert} from 'chai';
import TickStub from '../TickStub';
import MaxTime from '../../src/decorators/MaxTime';
import {RUNNING, FAILURE, SUCCESS} from '../../src/constants';

suite('Decorator: MaxTime', function() {
    test('Prototype', function() {
        assert.equal(MaxTime.prototype.name, 'MaxTime');
    });

    test('Failure test', function(done) {
        var tick = TickStub();
        var startTime = (new Date()).getTime();

        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(startTime)
            .onCall(2).returns(true)
            .onCall(3).returns(startTime);

        var child = {'_execute': stub()};
        child._execute.returns(RUNNING);

        var node = new MaxTime({maxTime:15, child:child});

        var status = node._execute(tick);
        assert.equal(status, RUNNING);

        setTimeout(function() {
            var status = node._execute(tick);
            assert.equal(status, FAILURE);
            done();
        }, 25);
    });

    test('Success test', function() {
        var tick = TickStub();
        var startTime = (new Date()).getTime();

        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(startTime)
            .onCall(2).returns(true)
            .onCall(3).returns(startTime);

        var child = {'_execute': stub()};
        child._execute.returns(RUNNING);

        var node = new MaxTime({maxTime: 50, child:child});

        var status = node._execute(tick);
        assert.equal(status, RUNNING);

        setTimeout(function() {
            child._execute.returns(SUCCESS);
            var status = node._execute(tick);
            assert.equal(status, SUCCESS);
        }, 200);
    });
});
