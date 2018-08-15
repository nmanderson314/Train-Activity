// var config = {
//     apiKey: "AIzaSyBr1fw3W2az2DPJxeWHDnefmqdEMhZ18bc",
//     authDomain: "train-hw-358ee.firebaseapp.com",
//     databaseURL: "https://train-hw-358ee.firebaseio.com",
//     projectId: "train-hw-358ee",
//     storageBucket: "train-hw-358ee.appspot.com",
//     messagingSenderId: "412885644349"
//   };
//   firebase.initializeApp(config);
var config = {
    apiKey: "AIzaSyCP3n4E7NTid9V9ok9LbRQ23AX70C_vf8M",
    authDomain: "first-firebase-fc195.firebaseapp.com",
    databaseURL: "https://first-firebase-fc195.firebaseio.com",
    projectId: "first-firebase-fc195",
    storageBucket: "first-firebase-fc195.appspot.com",
    messagingSenderId: "487913696932"
  };
  firebase.initializeApp(config);
  
  // Assign the reference to the database to a variable traind 'database'
  var database = firebase.database();

// database.ref().push({})
// databasse.ref().childadded("child_added",
var train = "";
var destination = "";
var first;
var frequency;
var tMinutesTillTrain;
var nextTrain = "";

function calculate(){
    // Assumptions
    var tFrequency = frequency;
    var firstTime = first;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain =  moment(nextTrain).format("hh:mm");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

}



$("#add-train").on("click", function(event) {
    event.preventDefault();

    train = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    first = $("#first-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    calculate();

    database.ref().push({
        train : train,
        destination : destination,
        frequency : frequency,
        firstTrain: first,

    });
});

database.ref().on("child_added", function(snapshot){

    train = snapshot.val().train;
    destination = snapshot.val().destination;
    frequency = snapshot.val().frequency;
    first = snapshot.val().firstTrain;
    // tMinutesTillTrain = snapshot.val().tMinutesTillTrain;
    // nextTrain = snapshot.val().nextTrain;
    

    calculate();

    // destination = $("#destination-input").val().trim();
    // first = $("#first-input").val().trim();
    // frequency = $("#frequency-input").val().trim();
    console.log(train);
    console.log(destination);
    console.log(frequency);
    console.log(first);
    console.log(tMinutesTillTrain);
    console.log(nextTrain);


//IMPORTANT : TEMPLATE LITERAL    
//template literal
var newRow = `<tr><td>${train}</td><td>${destination}</td><td>${frequency}</td><td>${nextTrain}</td><td>${tMinutesTillTrain}</td>`;

    $("#table").append(newRow);



    // snapshot.val().destination,snapshot.val().frequency, snapshot.val().first
    // database.ref().push({
    //     train : train,
    //     destination : destination,
    //     frequency : frequency,
    //     first: first
    // });
});
