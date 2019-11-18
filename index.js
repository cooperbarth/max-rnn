const maxAPI = require("max-api");
maxAPI.post("Node.js Process Running", maxAPI.POST_LEVELS.INFO);

const convert = require("./convert");
const model = require("./model");

let notes = [];
let timings = [];

maxAPI.addHandlers({
    addNote: note => {
        notes.push(note);
    },
    addTiming: timing => {
        timing = parseInt(timing, 10);
        if (isNaN(timing)) {
            return;
        }
        if (timing > 3) {
            timing = 4;
        } else if (timing > 2) {
            timing = 3;
        } else if (timing > 1.5) {
            timing = 2;
        } else if (timing > 1) {
            timing = 1.5;
        } else if (timing > 0.5) {
            timing = 1;
        } else {
            timing = 0.5;
        }
        timings.push(timing);
    },
    generateSequence: () => {
        const sequence = convert.toSequence(notes, timings);
        const stepCount = Math.min(75, sequence.notes.length * 6);
        notes = [];
        timings = [];
        model.continue(sequence, stepCount, continuedSequence => {
            durations = convert.toDurations(continuedSequence.notes);
            notes = convert.toNotes(continuedSequence.notes);
            maxAPI.outlet(durations.concat(notes));
        });
    }
});
