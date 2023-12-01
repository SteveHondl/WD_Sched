// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

// Display the current date and time in the header.
function displayCurrentDateTime() {
    //Dayjs to format current date and time
    var currentDateTime = dayjs().format("dddd, MMMM D YYYY h:mm:ss A");
    //ID currentDay will no be the current date and time
    $("#currentDay").text(currentDateTime);
  }
  
  
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function() {
    //Locate the ID of the time-block associated with the save button
    var clickedTimeBlockId = $(this).parent(".time-block").attr('id');
    //Get the user input from the description box within the clicked time-block
    var userInput = $(this).siblings('.description').val();
    //Input is saved to local storage for the entered time-block
    localStorage.setItem(clickedTimeBlockId, userInput);
    //A display to show the user the data has been saved
    showAlert("Appointment Saved")
    
    console.log("Save", clickedTimeBlockId, userInput);
    }
  );

//Function to display alert message in the header
//Alert will be visible for 2 seconds and disappear
function showAlert(message) {
        // Display the alert in the header
        $("#currentDay").append('<div class="alert alert-success" role="alert">' + message + '</div>');
        //Timeout the alert
        setTimeout(function() {
        $(".alert").remove();
        //Remove after 1 second
        }, 2000);

        }
  
// Function to load user input from local storage.
function userInputInLocalStorage() {
        //Loop each element in the time-block
        $(".time-block").each(function() {
        //Get ID attribute of the current element in the time-block
        var timeBlockId = $(this).attr('id');
        //Retrieve user input for hour of the day (timeBlockId)
        var userInput = localStorage.getItem(timeBlockId);
        //If user input is NOT empty then...
    if (userInput !== null) {
        //Insert the saved input (value) into the description box within the current time block
        $(this).find('.description').val(userInput);
        }
       }
     );
}
//Function to update past, present, and future events on the schedule
function updateCurrentTime(){
    //Retrieve current hour from dayjs
    var currentTime = dayjs().hour();

    console.log("current hour", currentTime);
    //Current hour is now variable for comparison
    var currentHour = currentTime

    // Get all elements with the class 'time-block'
    var timeBlocks = $(".time-block");

   // Loop through each time block
  for (var i = 0; i < timeBlocks.length; i++) {
    // Extract the hour from the time block's id
    var timeBlockHour = parseInt($(timeBlocks[i]).attr('id').split('-')[1]);

   
    console.log("Time Block Hour:", timeBlockHour);
   //Compare current hour to timeBlockHour to determine if it has already happened
  if (timeBlockHour < currentHour){

      $(timeBlocks[i]).addClass("past").removeClass("present future");
  }
    //If both variables match in type, it is the current hour
  else if (timeBlockHour == currentHour){
      $(timeBlocks[i]).addClass("present").removeClass("past future")
  }
    //If currentHour is less than timeBlockHour, event has not happened yet
 else if (timeBlockHour > currentHour) {
     $(timeBlocks[i]).addClass("future").removeClass("past present")
    }
  }

}

//Display current time and date 
displayCurrentDateTime();
//Load user input from local storage
userInputInLocalStorage();
//Update the past, present, and future time blocks relative to current time (visual) 
updateCurrentTime()
  
});
    
  


  

  
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
