function toDurations(sequence) {
    return sequence.map(note => (note.endTime - note.startTime));
}

function toNotes(sequence) {
    return sequence.map(note => note.pitch);
}

function toSequence(notes, timings) {
    const N = Math.min(notes.length, timings.length);
    if (notes.length > N) {
        notes = notes.slice(0, N);
    } else if (timings.length > N) {
        timings = timings.slice(0, N);
    }

    const sequenceNotes = [];
    let currentTime = 0.0;
    for (let i = 0; i < N; i++) {
        sequenceNotes.push({
            pitch: notes[i],
            startTime = currentTime,
            endTime = currentTime + timings[i]
        });
        currentTime += timings[i];
    }

    return {
        notes: sequenceNotes
    };
}

module.exports = {
    toDurations: toDurations,
    toNotes: toNotes,
    toSequence: toSequence
}
