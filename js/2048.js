
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
        shiftLeft();
        addNumber();
        paint();
        break;
      case 38 :
        shiftUp();
        addNumber();
        paint();
        break;
      case 39 :
        shiftRight();
        addNumber();
        paint();
        break;
      case 40 :
        shiftDown();
        addNumber();
        paint();
        break;
      default : break;
    }
  });
}

function shiftLeft() {
  for(var i = 0; i < numbers.length; i++) {
    var row = numbers[i];
    var shifts = 6;
    for(var j = 0; j < row.length - 1 && shifts > 0; j++) {
      var col = row[j];
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

function shiftRight() {
  for(var i = 0; i < numbers.length; i++) {
    var row = numbers[i];
    var shifts = 6;
    for(var j = row.length - 1; j > 0; j--) {
      var col = row[j];
      if(row[j] == "") {
        shifts--;
        row.splice(j,1);
        row.unshift('');
        j--;
      } else if (j > 0 && row[j] == row[j-1]) {
        row[j] = row[j]*2;
        row[j-1] = "";
        j--;
      } else if (j > 1 && row[j] == row[j-2]) {
        row[j] = row[j]*2;
        row[j-2] = "";
        j--;
      } else if (j > 2 && row[j] == row[j-3]) {
        row[j] = row[j]*2;
        row[j-3] = "";
        j--;
      }
    }
  }
}

function shiftUp() {
  rotateNumbers();
  shiftLeft();
  rotateNumbers();
}

function shiftDown() {
  rotateNumbers();
  shiftRight();
  rotateNumbers();
}

function rotateNumbers() {
  var newArray = [];
  for(var i = 0; i < numbers.length; i++){
    newArray.push([]);
  };
  for(var i = 0; i < numbers.length; i++){
    for(var j = 0; j < numbers.length; j++){
      newArray[j].push(numbers[i][j]);
    };
  };
  numbers = newArray;
}