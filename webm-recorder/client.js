var getUserMedia = require('get-user-media')
  , RecordRTC = require('recordrtc')
  , request = require('request')

// utility fn for posting vid data
function postVideo (blob) {
  request.post({
    //preambleCRLF: true,
    //postambleCRLF: true,
    url: 'http://localhost:3000/',
    json: JSON.stringify(blob)
   },
   function (err, res, body) {
     if (err) console.log('err!', err)
     else console.log('uploaded!')
  })
}

// options

// num of ms each clip will be (ms)
var clipDuration = 1000
// options for recording stuff
var recOptions = {
  type: 'video',
  mimeType: 'video/webm',
  video: {
    width: 320,
    height: 240,
  },
  frameInterval: 10,
  disableLogs: true,
}

// logic

function recordASec (err, stream) {
  if (err) throw err
  var recordRTC = RecordRTC(stream, recOptions)
  // start it recording
  recordRTC
    .startRecording()
    .setRecordingDuration(clipDuration)
    // when it stops,
    .onRecordingStopped(videoURL => {
      // post the video data
      recordRTC.getDataURL(postVideo)
      // start recording again
      recordASec(err, stream)
  })
}

// setup

// start recording
getUserMedia({ 
  video: true,
  audio: false,
  }, recordASec)

