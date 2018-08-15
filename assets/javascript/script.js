var config = {
    apiKey: "AIzaSyBr1fw3W2az2DPJxeWHDnefmqdEMhZ18bc",
    authDomain: "train-hw-358ee.firebaseapp.com",
    databaseURL: "https://train-hw-358ee.firebaseio.com",
    projectId: "train-hw-358ee",
    storageBucket: "train-hw-358ee.appspot.com",
    messagingSenderId: "412885644349"
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

$("#add-train").on("click", function(event) {
    event.preventDefault();

    train = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    first = $("#first-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        train : train,
        destination : destination,
        frequency : frequency,
        first: first
    });
});

database.ref().on("child_added", function(snapshot){

    train = snapshot.val().train;
    destination = snapshot.val().destination;
    frequency = snapshot.val().frequency;
    first = snapshot.val().first;

    var format = "YYYY-MM-DD";
    var date = frequency;
    var convertedDate = moment(date, format);

    months = Math.abs(moment(convertedDate).diff(moment(), "months"));
    console.log("months "+months);
    billed = months * first;

    // destination = $("#destination-input").val().trim();
    // first = $("#first-input").val().trim();
    // frequency = $("#frequency-input").val().trim();
    console.log(train);
    console.log(destination);
    console.log(frequency);
    console.log(first);

    // var newRow = $("<tr>").append(
    //     $("<td>").text(train),
    //     $("<td>").text(destination),
    //     $("<td>").text(frequency),
    //     $("<td>").text(months),
    //     $("<td>").text(first),
    //     $("<td>").text(billed)
    // );

//IMPORTANT : TEMPLATE LITERAL    
//template literal
var newRow = `<tr><td>${train}</td><td>${destination}</td><td>${frequency}</td><td>${months}</td><td>${first}</td><td>${billed}</td>`;

    $("#table").append(newRow);



    // snapshot.val().destination,snapshot.val().frequency, snapshot.val().first
    // database.ref().push({
    //     train : train,
    //     destination : destination,
    //     frequency : frequency,
    //     first: first
    // });
});
