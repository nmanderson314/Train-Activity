var config = {
    apiKey: "AIzaSyCP3n4E7NTid9V9ok9LbRQ23AX70C_vf8M",
    authDomain: "first-firebase-fc195.firebaseapp.com",
    databaseURL: "https://first-firebase-fc195.firebaseio.com",
    projectId: "first-firebase-fc195",
    storageBucket: "first-firebase-fc195.appspot.com",
    messagingSenderId: "487913696932"
  };
  firebase.initializeApp(config);
  
  // Assign the reference to the database to a variable named 'database'
  var database = firebase.database();

// database.ref().push({})
// databasse.ref().childadded("child_added",
var name = "";
var role = "";
var pay;
var start;

$("#add-employee").on("click", function(event) {
    event.preventDefault();

    name = $("#employee-input").val().trim();
    role = $("#role-input").val().trim();
    pay = $("#pay-input").val().trim();
    start = $("#start-input").val().trim();

    database.ref().push({
        name : name,
        role : role,
        start : start,
        pay: pay
    });
});

database.ref().on("child_added", function(snapshot){

    name = snapshot.val().name;
    role = snapshot.val().role;
    start = snapshot.val().start;
    pay = snapshot.val().pay;

    var format = "YYYY-MM-DD";
    var date = start;
    var convertedDate = moment(date, format);

    months = Math.abs(moment(convertedDate).diff(moment(), "months"));
    console.log("months "+months);
    billed = months * pay;

    // role = $("#role-input").val().trim();
    // pay = $("#pay-input").val().trim();
    // start = $("#start-input").val().trim();
    console.log(name);
    console.log(role);
    console.log(start);
    console.log(pay);

    // var newRow = $("<tr>").append(
    //     $("<td>").text(name),
    //     $("<td>").text(role),
    //     $("<td>").text(start),
    //     $("<td>").text(months),
    //     $("<td>").text(pay),
    //     $("<td>").text(billed)
    // );

//IMPORTANT : TEMPLATE LITERAL    
//template literal
var newRow = `<tr><td>${name}</td><td>${role}</td><td>${start}</td><td>${months}</td><td>${pay}</td><td>${billed}</td>`;

    $("#table").append(newRow);



    // snapshot.val().role,snapshot.val().start, snapshot.val().pay
    // database.ref().push({
    //     name : name,
    //     role : role,
    //     start : start,
    //     pay: pay
    // });
});
