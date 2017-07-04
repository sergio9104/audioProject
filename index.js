var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1({
  username: 'dcfd1ddd-ee93-4601-8765-2a3c4a2437e8',
  password: 'iRAHT2BYAkuT'
});


const params = {
  language: 'es',
  model: 'es-ES_NarrowbandModel',
  content_type: 'audio/wav'
};

// create the stream
const recognizeStream = speech_to_text.createRecognizeStream(params);

// pipe in some audio
fs.createReadStream(__dirname + '/prueba.wav').pipe(recognizeStream);

// and pipe out the transcription
recognizeStream.pipe(fs.createWriteStream('./transcription.txt'));

// listen for 'data' events for just the final text
// listen for 'results' events to get the raw JSON with interim results, timings, etc.

recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

['data', 'results', 'speaker_labels', 'error', 'close'].forEach(function(eventName) {
  recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
});