import convert from "./convert";
import { post, addHandlers } from "max-api";
import model from "./model";

post("Node.js Process Running");

addHandlers({
    continueSequence: notes => {
        model.continue(convert.toSequence(notes), continuedSequence => {
            return convert.toNotes(continuedSequence);
        });
    }
});
