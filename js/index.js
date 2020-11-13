
var noteIndex = 0;
var correctNotes = 0;

if (navigator.requestMIDIAccess) {
    console.log('WebMIDI is supported in this browser.');
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

} else {
    console.log('WebMIDI is not supported in this browser.');
    document.querySelector('.note-info').textContent = 'Error: This browser does not support WebMIDI.';
}

function onMIDISuccess(midiAccess) {
    drawNote();

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;

    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    document.querySelector('.note-info').textContent = 'Error: Could not access MIDI devices. Connect a device and refresh to try again.';
}

function getMIDIMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = message.data[2];

    switch (command) {
        case 144: // noteOn
            noteOnListener(note);
            break;
    }
}

function drawNote() {
    /** reset sharps, special line notes **/
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
    noteNum = 60 +getRandomInt(18)
    document.querySelector(".accidental").style["display"] = "none"
    document.querySelector("#whole-note").classList.remove('whole-note-line');

    /* draw basic note */
    document.querySelector("#whole-note").classList.add('whole-note');
    document.querySelector("#notee").style["top"] = {60:218,61:218,62:201,63:201,64:184,65:162,66:162,67:141,68:141,69:119,70:119,71:97,72:76,73:76,74:55,75:55,76:33,77:11,78:11}[noteNum] + "px"

    if (isSharp(noteNum)) {
        document.querySelector(".accidental").style["display"] = "block"
    } 
    if ([60,61].includes(noteNum)) {
        document.querySelector("#whole-note").setAttribute("src", "./images/wholenoteline.svg");
        document.querySelector("#whole-note").classList.add("whole-note-line");
    } else {
        document.querySelector("#whole-note").setAttribute("src", "./images/wholenote.svg");
    }
}


function isSharp(noteNum) {
    var sharp = false;
    switch (noteNum) {
        case 61:
        case 63:
        case 66:
        case 68:
        case 70:
        case 73:
        case 75:
        case 78:
            sharp = true;
            break;
        default:
            break;
    }
    return sharp;
}


function noteOnListener(note) {
    console.log(note)
    if (note == noteNum) {
        next_note()
    }


}

function next_note(){
                drawNote();


}


