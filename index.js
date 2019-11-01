const convert = require("./convert");
const maxAPI = require("max-api");
const model = require("./model");
const samples = require("./samples");

maxAPI.post("Node.js Process Running", maxAPI.POST_LEVELS.INFO);

maxAPI.addHandlers({
    generateSequence: (songTitle, stepCount=10) => {
        if (!(songTitle in samples)) {
            maxAPI.post("Song not found.", maxAPI.POST_LEVELS.ERROR);
        }
        if (stepCount <= 0) {
            maxAPI.post("Invalid step count - must be greater than 0.", maxAPI.POST_LEVELS.ERROR);
        }
        const sequence = samples[songTitle];
        model.continue(sequence, stepCount, continuedSequence => {
            maxAPI.post(convert.toNotes(sequence));
            maxAPI.post(convert.toNotes(continuedSequence));
        });
        /* model.continue(convert.toSequence(notes), steps, continuedSequence => {
            maxAPI.post(convert.toNotes(continuedSequence));
        }); */
    },
});

/* const songTitle = "TWINKLE_TWINKLE";
model.continue(samples[songTitle], DEFAULT_STEPS, continuedSequence => {
    console.log(continuedSequence.notes);
}); */
