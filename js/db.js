//this js file is used to store data into database and create a new contact
var color = "#000000";
var html_string = "";

function get_directory() {
  if (__dirname.toString().endsWith("js")) return path.join(__dirname, "../..");
  else return path.join(__dirname, "..");
}

//array used to store changes in the turnus process
var dates = [];
var dates_end = [];
//start day of the turnus
var start_date = "";
//date of the firat end
var end_date;
//date variable-- calendar
var end;
var date;
var date_temp_turnus;
var date_temp_home;
//turnuses
var ends = [];
var starts = [];

var name = "";
var surname = "";
var start = "";
var end = "";
var number = "";
var textarea = "";
var status = "";

//node js libraries for sqlite interactions
var path = require("path");
var fs = require("fs");
var sql = require("../node_modules/sql.js/js/sql-debug.js");

$(document).ready(function() {
  //fool proof case
  $("#length_turnus").val(10);
  $("#length_home").val(10);
  //inicialize start date and date and temp date
  $("input[name=start-iny]").on("input", function() {
    start_date = $("#start-iny").val();

    date = new Date(start_date);
    date_temp_turnus = new Date(date);
    date_temp_home = new Date(date);

    $("input[name=number]").trigger("input");

    //  Alfa()
  });

  //call method alfa when something is edited
  $("#length_turnus").on("input", function() {
    $("input[name=number]").trigger("input");
  });
  $("#length_home").on("input", function() {
    $("input[name=number]").trigger("input");
  });

  $("input[name=number]").on("input", function Alfa() {
    //length of the turnus + int parse
    var length_of_turnus = $("#length_turnus").val();
    end_date = new Date(
      date.getTime() + length_of_turnus * 24 * 60 * 60 * 1000
    );
    length_of_turnus = parseInt(length_of_turnus);
    //length of home staying
    var length_home = $("#length_home").val();
    length_home = parseInt(length_home);
    //number of turnuses
    var number = $("#number").val();
    //contains all div inputs
    var inputs_in_div = $(".first :input");
    //contains number of all inputs dynamically created
    //inside addition div
    var offSet = inputs_in_div.length;
    //remove all generated forms because there is
    //substraction- not very clever solution
    if (number < offSet) {
      $(".first :input").remove();
      $(".first")
        .find("label")
        .remove();
      $(".first")
        .find("div")
        .remove();
      $(".second")
        .find("label")
        .remove();
      $(".second")
        .find("div")
        .remove();
      $(".second :input").remove();
      offSet = 0;
    }
    for (i = 0; i < number - offSet; i++) {
      //generate html files
      html_parser(i);
    }
    var rename = 0;
    //function to set id of the elements increasingly
    $(".first :input").each(function() {
      this.id = rename;
      rename++;
    });
    rename = 0;
    $(".second :input").each(function() {
      this.className = rename;
      rename++;
    });

    $("#0").val(date.toISOString().substr(0, 10));
    $(".0").val(end_date.toISOString().substr(0, 10));

    dates[0] = date.toISOString().substr(0, 10);
    dates_end[0] = end_date.toISOString().substr(0, 10);

    for (var i = 1; i < $(".first > div").length; i++) {
      //my beautiful debug function
      //console.log($('.first > div').length + "length of firt div " + i + " i value " + date[i] + " date at the position i " + date_temp_turnus + " date temp")

      date_temp_turnus = new Date(
        date_temp_turnus.getTime() +
          (length_of_turnus + length_home) * 24 * 60 * 60 * 1000
      );
      dates[i] = date_temp_turnus.toISOString().substr(0, 10);
      $("#" + i).val(date_temp_turnus.toISOString().substr(0, 10));

      date_temp_home = new Date(
        date_temp_turnus.getTime() + length_of_turnus * 24 * 60 * 60 * 1000
      );
      dates_end[i] = date_temp_home.toISOString().substr(0, 10);
      $("." + i).val(date_temp_home.toISOString().substr(0, 10));
    }

    //console.log(end)
    date_temp_turnus = date;
    date_temp_home = date;

    end = $("." + ($(".first > div").length - 1).toString()).val();
    $("#end").val(end);
  });
});

$(".btn").click(function() {
  $('input[name="start"]').each(function() {
    starts.push($(this).val());
  });
  $('input[name="end"]').each(function() {
    ends.push($(this).val());
  });

  //Jquery entries

  name = $("#fname").val();
  surname = $("#lname").val();
  start = $("#start-iny").val();
  number = $("#number").val();
  textarea = $("#textarea").val();
  status = $("#status option:selected").text();

  //fool proof
  if (
    (name == "") |
    (surname == "") |
    (start == "") |
    (textarea == "") |
    ($("#start-iny").val() == "") |
    ($("#number").val() == "")
  ) {
    console.log("missing");
  } else {
    try {
      var filebuffer = fs.readFileSync(get_directory() + "\\db.sqlite");
      var filebufferArchive = fs.readFileSync(
        get_directory() + "\\archive.sqlite"
      );
      console.log(get_directory() + "  dirname " + filebuffer);
    } catch (e) {
      console.log(e);
    }
    if (filebuffer != null) {
      var db = new SQL.Database(filebuffer);
      var dbA = new SQL.Database(filebufferArchive);
    } else {
      var db = new SQL.Database();
      var dbA = new SQL.Database();
    }

    try {
      dbA.run(
        "CREATE TABLE `" +
          surname +
          "` (`name`	TEXT NOT NULL,   `surname`	TEXT NOT NULL,   `starts`	TEXT NOT NULL,   `date_start`	TEXT NOT NULL,   `date_end`	TEXT NOT NULL,   `end_simple`	TEXT NOT NULL,  `notes`	TEXT NOT NULL,  `EU`	TEXT NOT NULL,  `color`	TEXT NOT NULL );"
      );
    } catch (e) {
      console.log(e);
    }

    try {
      db.run(
        "CREATE TABLE `" +
          surname +
          "` (`name`	TEXT NOT NULL,   `surname`	TEXT NOT NULL,   `starts`	TEXT NOT NULL,   `date_start`	TEXT NOT NULL,   `date_end`	TEXT NOT NULL,   `end_simple`	TEXT NOT NULL,  `notes`	TEXT NOT NULL,  `EU`	TEXT NOT NULL,  `color`	TEXT NOT NULL );"
      );
    } catch (e) {
      alert("Pre toto meno " + surname + " je už databáza vytvorená.");
      console.log(e);
    }
    try {
      for (var i = 0; i < starts.length; i++) {
        console.log(starts[i] + "   iii  " + i);
        console.log(
          name +
            " " +
            surname +
            " " +
            start +
            " " +
            starts[i] +
            " " +
            ends[i] +
            " " +
            end +
            " " +
            textarea +
            " " +
            status +
            " " +
            color
        );
        db.run("INSERT INTO " + surname + " VALUES (?,?,?,?,?,?,?,?,?)", [
          name,
          surname,
          start,
          starts[i],
          ends[i],
          end,
          textarea,
          status,
          color
        ]);
        dbA.run("INSERT INTO " + surname + " VALUES (?,?,?,?,?,?,?,?,?)", [
          name,
          surname,
          start,
          starts[i],
          ends[i],
          end,
          textarea,
          status,
          color
        ]);
      }
    } catch (err) {
      console.log(err);
    }
    fs.writeFileSync(get_directory() + "\\db.sqlite", new Buffer(db.export()));

    fs.writeFileSync(
      get_directory() + "\\archive.sqlite",
      new Buffer(dbA.export())
    );

    console.log("sucessful");
    db.close();
    dbA.close();
  }
});

$(".circle").hover(function() {
  $(".circle").css("opacity", "0.5");
  $(this).css("opacity", "1");
});

$(".circle").click(function() {
  color = $(this).attr("id");
  $(this).css("opacity", "1");
  $(".circle").css("pointer-events", "none");
  setTimeout(function() {
    $(".circle").css("pointer-events", "all");
  }, 2000);
});

//fn used to convert text to html and place it
function html_parser() {
  html_string = `<div class="" id="start_of_turnus">
          <label for="phone">Začiatok turnusu</label>
          <input type="date" id="x" name="start" required="required">
        </div>`;
  $(".first").append(html_string);
  html_string = `<div class="" id="end_of_turnus">
          <label for="pword" id="change_end">Koniec turnusu</label>
          <input type="date" id="y" name="end" required="required">
        </div>`;
  $(".second").append(html_string);
  // console.log("completed")
}
//convert RGB to hex
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(rgb) {
  rgb = rgb.replace("(", "");
  rgb = rgb.replace(")", "");
  rgb = rgb.replace("rgb", "");
  rgb = rgb.split(",");

  console.log(rgb[0] + "vve" + rgb[0] + "evwew" + rgb[0] + "dvwse");
  return (
    "#" +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2])
  );
}
