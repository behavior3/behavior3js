// test for nodejs runtime http://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js
if (typeof module !== 'undefined' && this.module !== module) {
    var b3 = {};

    module.exports = {
        b3: b3
    };
}

