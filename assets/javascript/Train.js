
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyCyqqyI8S0lvYsKWpPBnR_XAcEbKqMQxiE",
  authDomain: "timestrain-c431a.firebaseapp.com",
  databaseURL: "https://timestrain-c431a.firebaseio.com",
  projectId: "timestrain-c431a",
  storageBucket: "timestrain-c431a.appspot.com",
  messagingSenderId: "581972723856"
};
firebase.initializeApp(config);


// Get a reference to the database service
var database = firebase.database();


// Functions
// =================================================================//

//  add Button on click function for adding trains
$("#add-train-btn").on("click", function(event) {

  // Prevent the default form submit behavior
  event.preventDefault();

  // Capture User Inputs and store them into variables
  // create var trainName input
  var trainName = $("#train-name-input")
    .val()
    .trim();
     // create var destiantion input
  var destination = $("#destination-input")
    .val()
    .trim();
     // create var first train input
  var firstTrain = $("#first-train-input")
    .val()
    .trim();
     // create var frequency input
  var frequency = $("#frequency-input")
    .val()
    .trim();

  // Creates TrainTime object for holding train data
    var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes from input
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var timeTrainName = childSnapshot.val().name;
  var timeTrainDestination = childSnapshot.val().destination;
  var timeFrequency = childSnapshot.val().frequency;
  var timeFirstTrain = childSnapshot.val().firstTrain;


  // Prettify the Train Arrive time
  var timeArr = timeFirstTrain.split(":");
  var trainTime = moment()
    .hours(timeArr[0])
    .minutes(timeArr[1]);
    
    // To calculate the TrainTimes worked
  var maxMoment = moment.max(moment(), trainTime);
  var timeMinutes;
  var timeTrainArrival;

  // If the first train is later than the current time, sent arrival to the first train time
  if (maxMoment === trainTime) {
    // format time
    timeTrainArrival = trainTime.format("hh:mm A");
    // format mintues
    timeMinutes = trainTime.diff(moment(), "minutes");

    // do calculate for input Train time
  } else {
    
   // Calculate the minutes until arrival using Math
    var differenceTimes = moment().diff(trainTime, "minutes");

    // Math for  modulus between the differenceTimes and the frequency.
    var timeRemainder = differenceTimes % timeFrequency;
     
     // To calculate the minutes till arrival,
    timeMinutes = timeFrequency - timeRemainder;

    // To calculate the arrival time, add the timeMinutes to the current timewith add & format
    timeTrainArrival = moment()
      .add(timeMinutes, "m")
      .format("hh:mm A");
  }
  // Console Log the value of timeMinutes & timeTrainArrive
  console.log("Time Minutes Arrival:", timeMinutes);
  console.log("Time Train Arrival:", timeTrainArrival);


  // Add New Row for Table
  // Add each train's data into the table
   var newRow = $("<tr>").append(
    $("<td>").text(timeTrainName),
    $("<td>").text(timeTrainDestination),
    $("<td>").text(timeFrequency),
    $("<td>").text(timeTrainArrival),
    $("<td>").text(timeMinutes),
 
    );

// Append the new row to the table
$("#train-table > tbody").append(newRow);

});


//End 
// --------------------------------------------------//
//---------------------------------------------------//


    // Input Music - Audio
    // Function for Audio - Music
    var init = function () {
        var musics = document.getElementById('musics');
        // start with music - pause
        musics.pause();

        // var for button
        var playBtn = document.getElementById('playBtn');
        var pauseBtn = document.getElementById('pauseBtn');
        var ppBtn = document.getElementById('ppBtn');

        // function music play
        var musicPlay = function (e) {
            musics.play();
            console.log('1');

            musics.addEventListener("ended", function () {
                ppBtn.textContent = "play Again";
            });
        }
        // function music pause 
        var musicPause = function (e) {
            musics.pause();
            console.log("2")
        }

        var musicPP = function (e) {
            // pause song
            if (musics.paused) {
                musics.play();
                ppBtn.textContent = "pause Song";

            }
            // play song
            else {
                musics.pause();
                ppBtn.textContent = "play Song";
            }

            // music click Btn
        }
        playBtn.addEventListener("click", musicPlay, false);
        pauseBtn.addEventListener("click", musicPause, false);
        ppBtn.addEventListener("click", musicPP, false);

          // play again music
        musics.addEventListener("ended", function () {
            ppBtn.textContent = "Play Again";
        });
        musics.pause();
    }
    // window load music
    window.onload = init;