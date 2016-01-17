var test = require('tape'),
    exec = require('child_process').exec

var expressions = [  "smile", "innerBrowRaise", "browRaise", "browFurrow", "noseWrinkle",
                     "upperLipRaise", "lipCornerDepressor", "chinRaise", "lipPucker", "lipPress",
                     "lipSuck", "mouthOpen", "smirk", "eyeClosure", "attention" ]

var emotions    = [  "joy", "fear", "disgust", "sadness", "anger", "surprise", "contempt",
                     "valence", "engagement" ]

// testing the affectiva executable
//
// we expect the executable to return json that looks like this:
//
//    {
//      "expressions": { "smile": 1, ... }
//      "emotions": { "joy": 1, ... }
//    }
//
test('1. test affectiva executable', t => {
    // TODO - make this the actual command to run the executable
    // TODO - add a test image to use 
    exec('./affectiva-exec photo test-image.png', (err, stdout, stderror) => {
        // should call the executable correctly
        t.notOk(err, 'should be no error in calling')
        t.notOk(stderror, 'should be no error from process\'s stdout')
        t.ok(stdout, 'result should exist')
        // executable's stdout should be parseable as json
        var j = JSON.parse(stdout)
        t.ok(j, 'result should be valid json')
        // check all fields in j.expressions
        expressions.forEach(e => {
            t.ok(j.expressions[e], 'should see an expression at result.expressions.'+e)
            t.deepEqual(typeof j.expressions[e], 'Number', 'type of each expression should be a number')
        })
        // check all fields in j.emotions
        emotions.forEach(e => {
            t.ok(j.emotions[e], 'should see an expression at result.emotions.'+e)
            t.deepEqual(typeof j.emotions[e], 'Number', 'type of each emotion should be a number')
        })
        // we're done
        t.end()
    })
})