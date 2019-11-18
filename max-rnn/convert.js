function toDurations(sequence) {
    return sequence.map(note => (note.endTime - note.startTime));
}

function toNotes(sequence) {
    return sequence.map(note => note.pitch);
}

module.exports = {
    toDurations: toDurations,
    toNotes: toNotes
}