var combo = [];
var user = [];
var count = 0;
var tries = 1;
var seconds = 0;
var right_place = 0;
var wrong_place = 0;
var thesame = false;
var x;

// generates the winning combination and stores it as an array in var combo
function randomCombo() {
  do {
    var first_number = Math.floor(Math.random() * 10);
    var second_number = Math.floor(Math.random() * 10);
    var third_number = Math.floor(Math.random() * 10);
  } while (
    first_number == second_number ||
    first_number == third_number ||
    second_number == third_number
  );
  combo.push(first_number, second_number, third_number);
}
//executed
randomCombo();

//three boxes are disabled if the user hasn't click start game
for (var i = 0; i < 3; i++) {
  $("#num" + i).prop("disabled", true);
}
$("#submit").prop("disabled", true);
//this limits the input to 0-9 otherwise it returns false
$("input").keydown(function () {
  if (this.value.length == 1 && event.keyCode > 47 && event.keyCode < 58)
    return false;
});

//button for submitting combinations, if same inputs are detected
//it doesn't count as a trial and it empties the boxes
$("#submit").on("click", function () {
  userCombo();
  if (!thesame) {
    checkPosition(user, combo);
    tries++;
    $("#tries").html("Trial: " + tries);
    reset();
  }
});
//if button is clicked, boxes are now functional and a timer runs
$("#starttime").on("click", function () {
  enable();
  seconds = 0;
  x = setInterval(function () {
    seconds += 1;
    $("#timer").html("Time: " + seconds + "s");
  }, 1000);
  $(this).prop("disabled", true);
});

$("#highscore").on("click", function () {
  $("#highscores").modal("show");
});

function enable() {
  for (var i = 0; i < 3; i++) {
    $("#num" + i).prop("disabled", false);
  }
  $("#submit").prop("disabled", false);
  $("#highscore").prop("disabled", true);
}
//determines the count, right position, and wrong position of user inputs
//in the given combination
function countMatch(count, right_place, wrong_place) {
  if (count === 3 && right_place === 3) {
    winner();
    $("#what").html("You got the right combination!");
  } else if (count === 1 && right_place === 1) {
    $("#what").html("1 right number in its place");
  } else if (count === 1 && wrong_place === 1) {
    $("#what").html("1 right number not in its place");
  } else if (count >= 2 && right_place >= 1 && wrong_place >= 1) {
    $("#what").html(
      count +
        " right numbers " +
        right_place +
        " in its place and " +
        wrong_place +
        " not in place"
    );
  } else if (count >= 2 && right_place >= 1 && wrong_place == 0) {
    $("#what").html(count + " right numbers " + right_place + " in its place");
  } else if (count >= 2 && right_place == 0 && wrong_place >= 1) {
    $("#what").html(
      count + " right numbers " + wrong_place + " not in its place"
    );
  } else {
    $("#what").html("All numbers are wrong");
  }
}

//boxes are unclickable & modal is shown to store name,score, & time of user
function winner() {
  for (var i = 0; i < 3; i++) {
    $("#num" + i).prop("disabled", true);
  }
  $("#mod").modal("show");
  $("#trycount").val(tries);
  $("#timecount").val(seconds);
  clearInterval(x);
}

//this checks the user input one by one whether it belongs in the winning combination
//if it belongs, it then checks whether it's in the right or wrong position
function checkPosition(user, combo) {
  for (var i = 0; i < 3; i++) {
    if (combo.includes(user[i])) {
      count++;
      if (
        combo.indexOf(combo[findIndex(combo, user, i)]) == user.indexOf(user[i])
      ) {
        right_place++;
      } else {
        wrong_place++;
      }
    }
  }
  return countMatch(count, right_place, wrong_place);
}
//returns the index of the combination variable where it is equal with the user input
function findIndex(combo, user, index) {
  for (var y = 0; y < 3; y++) {
    if (combo[y] === user[index]) {
      return y;
    }
  }
}

//creates an array for user input only if all inputs provided by the user are unique,
function userCombo() {
  var v1 = parseInt($("#num0").val());
  var v2 = parseInt($("#num1").val());
  var v3 = parseInt($("#num2").val());
  if (
    Number.isNaN(v1) == true ||
    Number.isNaN(v2) == true ||
    Number.isNaN(v3) == true
  ) {
    $("#what").html("Please fill all boxes");
    clearBoxes();
    thesame = true;
  } else if (v1 != v2 && v1 != v3 && v2 != v3) {
    user.push(v1);
    user.push(v2);
    user.push(v3);
    thesame = false;
  } else {
    $("#what").html("Same inputs are not allowed!");
    clearBoxes();
    thesame = true;
  }
}

function clearBoxes() {
  $("#num0").val("");
  $("#num1").val("");
  $("#num2").val("");
}

function reset() {
  user = [];
  count = 0;
  right_place = 0;
  wrong_place = 0;
}
