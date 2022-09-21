const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
    sort(tests) {
        const copyTests = Array.from(tests);
        
        const authTest = copyTests.find((suite) => suite.path.indexOf("auth") !== -1);
        return [authTest, ...copyTests];
    }
}

module.exports = CustomSequencer;