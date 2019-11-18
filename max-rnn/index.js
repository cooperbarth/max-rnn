const convert = require("./convert");
const maxAPI = require("max-api");
const model = require("./model");
const samples = require("./samples");

maxAPI.post("Node.js Process Running", maxAPI.POST_LEVELS.INFO);

maxAPI.addHandlers({
    getSongNames: () => {
        maxAPI.outlet(Object.values(samples).map(song => song.name));
    },
    generateSequence: (songTitle, stepCount=10) => {
        if (!(songTitle in samples)) {
            maxAPI.post(`Song ${songTitle !== "song" ? songTitle : "UNDEFINED"} not found.`, maxAPI.POST_LEVELS.ERROR);
        }
        if (stepCount <= 0) {
            maxAPI.post("Invalid step count - must be greater than 0.", maxAPI.POST_LEVELS.ERROR);
        }
        const sequence = samples[songTitle];
        model.continue(sequence, stepCount, continuedSequence => {
            const fullSequence = sequence.notes.concat(continuedSequence.notes);
            durations = convert.toDurations(fullSequence);
            notes = convert.toNotes(fullSequence);
            maxAPI.outlet(durations.concat(notes));
        });
    }
});
