const convert = require("./convert");
const maxAPI = require("max-api");
const model = require("./model");
const samples = require("./samples");

maxAPI.post("Node.js Process Running", maxAPI.POST_LEVELS.INFO);

const DEFAULT_STEPS = 10;

maxAPI.addHandlers({
    beginSequence: songTitle => {
        if (!(songTitle in samples)) {
            maxAPI.post("Song not found.", maxAPI.POST_LEVELS.ERROR);
        }
        maxAPI.post(convert.toNotes(samples[songTitle]));
    },
    continueSequence: notes => {
        model.continue(convert.toSequence(notes), DEFAULT_STEPS, continuedSequence => {
            maxAPI.post(convert.toNotes(continuedSequence));
        });
    }
});

/* const songTitle = "TWINKLE_TWINKLE";
model.continue(samples[songTitle], DEFAULT_STEPS, continuedSequence => {
    console.log(continuedSequence.notes);
}); */
