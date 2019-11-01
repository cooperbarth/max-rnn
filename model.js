const core = require("@magenta/music/node/core");
const model = require("@magenta/music/node/music_rnn");

const RNN_PATH = "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn";
const musicRNN = new model.MusicRNN(RNN_PATH);

const globalAny = global;
globalAny.performance = Date;
globalAny.fetch = require('node-fetch');

const RNN_TEMPERATURE = 1.5;

function continueSequence(noteSequence, rnnSteps, callback) {
    const quantizedSequence = core.sequences.quantizeNoteSequence(noteSequence, 4);
    musicRNN.initialize();
    musicRNN
        .continueSequence(quantizedSequence, rnnSteps, RNN_TEMPERATURE)
        .then(sample => {
            const notes = core.sequences.unquantizeSequence(sample);
            callback(notes);
        });
}

module.exports = {
    continue: continueSequence
};