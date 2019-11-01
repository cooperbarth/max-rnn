const model = require("@magenta/music/node/music_rnn");

const RNN_PATH = "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn";
const musicRNN = new model.MusicRNN(RNN_PATH);
musicRnn.initialize();

const RNN_STEPS = 10;
const RNN_TEMPERATURE = 1.5;

function continueSequence(noteSequence, callback) {
    const quantizedSequence = model.sequences.quantizeNoteSequence(noteSequence, 4);
    musicRNN.continueSequence(quantizedSequence, RNN_STEPS, RNN_TEMPERATURE, sample => {
        callback(sample);
    });
}

module.exports = {
    continue: continueSequence
};