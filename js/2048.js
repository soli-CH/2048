
var numbers;


function init() {
  numbers = [['','','',''],['','','',''],['','','',''],['','','','']];
  addNumber();
  addNumber();
  paint();
  registerEvents();
}

function paint() {
  var table = "<table>";
  for(var i = 0; i < numbers.length; i++) {
    var row = numbers[i];
    table += "<tr>";
    for(var j = 0; j < row.length; j++) {
      var col = row[j];
      table += "<td>" + col + "</td>";
    }
    table += "</tr>";
  }
  table += "</table>";
  $('#field').html(table);
}

function addNumber() {
  var tries = 200;
  while (tries > 0) {
    var row = Math.floor((Math.random() * 4)); // 0-3
    var col = Math.floor((Math.random() * 4)); // 0-3
    if(numbers[row][col] !== "") {
      tries--;
      continue;
    } else {
      numbers[row][col] = 2;
      break;
    }
  }
  if(tries == 0) {
    alert("done");
  }
}

function registerEvents() {
  $(document).on('keyup', function(event) {
    switch(event.which) {
      case 37 :
        $(document).trigger('shiftLeft');
        break;
      case 38 :
        $(document).trigger('shiftUp');
        break;
      case 39 :
        $(document).trigger('shiftRight');
        break;
      case 40 :
        $(document).trigger('shiftDown');
        break;
      default : break;
    }
  });
}

$(document).on('shiftLeft', function(event) {
  if(shifter()) {
    addNumber();
  }
  paint();
});

$(document).on('shiftRight', function(event) {
  reverseNumbers();
  var valid = shifter();
  reverseNumbers();
  if(valid) addNumber();
  paint();
});

$(document).on('shiftUp', function(event) {
  rotateNumbers();
  var valid = shifter();
  rotateNumbers();
  if(valid) addNumber();
  paint();
});

$(document).on('shiftDown', function(event) {
  rotateNumbers();
  reverseNumbers();
  var valid = shifter();
  reverseNumbers();
  rotateNumbers();
  if (valid) addNumber();
  paint();
});

function shifter() {
  var shiftedAtLeastOneRow = false;
  for(var i = 0; i < numbers.length; i++) {
    var row = numbers[i];
    var shifts = 6;
    var shiftingPossibleInRow = isShiftingPossible(row);
    shiftedAtLeastOneRow = shiftedAtLeastOneRow || shiftingPossibleInRow;
    if(shiftingPossibleInRow) {
      for(var j = 0; j < row.length - 1 && shifts > 0; j++) {
        if(row[j] == "") {
          shifts--;
          row.splice(j,1);
          row.push('');
          j--;
        } else if (j < 3 && row[j] == row[j+1]) {
          row[j] = row[j]*2;
          row[j+1] = "";
          j--;
        } else if (j < 2 && row[j] == row[j+2]) {
          row[j] = row[j]*2;
          row[j+2] = "";
          j--;
        } else if (j < 1 && row[j] == row[j+3]) {
          row[j] = row[j]*2;
          row[j+3] = "";
          j--;
        }
      }
    }
  }
  return shiftedAtLeastOneRow;
}

function rotateNumbers() {
  var newArray = [];
  for(var i = 0; i < numbers.length; i++){
    newArray.push([]);
  }
  for(var i = 0; i < numbers.length; i++){
    for(var j = 0; j < numbers.length; j++){
      newArray[j].push(numbers[i][j]);
    }
  }
  numbers = newArray;
}

function reverseNumbers() {
  for(var i = 0; i < numbers.length; i++){
    numbers[i].reverse();
  }
}

function isShiftingPossible(row) {
  var possible = false;
  for(var i = row.indexOf(''); i<row.length; i++) {
    if(Number.isInteger(row[i]))
      possible = true;
  }
  for(var i = 1; i < row.length; i++) {
    if(Number.isInteger(row[i]) && row[i] == row[i-1])
      possible = true
  }
  return possible;
}