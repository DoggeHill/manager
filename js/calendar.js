var path = require("path");
function get_directory() {
  if (__dirname.toString().endsWith("js")) return path.join(__dirname, "../..");
  else return path.join(__dirname, "..");
}

function return_events() {
  var events = [];

  var fs = require("fs");
  var sql = require("sql.js/js/sql-debug.js");

  var cnt = 0;
  var number = 0;

  try {
    var filebuffer = fs.readFileSync(path.join(get_directory(), "\\db.sqlite"));
  } catch (e) {
    error = e;
    console.log(e);
  }
  if (filebuffer != null) {
    var db = new SQL.Database(filebuffer);
  } else {
    var db = new SQL.Database();
  }
  db.each('SELECT name FROM sqlite_master WHERE type = "table" ', function(
    row
  ) {
    var color;
    var starts = [];
    var ends = [];
    var ends_dates = [];
    var name, surname, start_dates, end_dates, rest;
    //  console.log(row.name + " is an integer!");
    db.each("SELECT name FROM " + row.name + " LIMIT 1", function(rows) {
      //    console.log(rows.name)
      name = rows.name;
    });
    db.each("SELECT surname FROM " + row.name + " LIMIT 1", function(rows) {
      //    console.log(rows.surname)
      surname = rows.surname;
    });
    db.each("SELECT date_start FROM " + row.name, function(rows) {
      starts.push(rows.date_start);
    });
    db.each("SELECT date_end FROM " + row.name, function(rows) {
      var mydate = new Date(rows.date_end);
      mydate = mydate.getTime() + 86400000;
      ends.push(mydate);
      //    ends_dates.push(rows.date_end)
    });
    db.each("SELECT color FROM " + row.name + " LIMIT 1", function(rows) {
      color = rows.color;
    });
    /*
        for (var i = 0; i < ends.length; i++) {
        console.log(starts[i] + "   toto je tu " + ends_dates[i] + "  toto je dnes " + today + "  " + cnt+" xxxxxxxxxxxxxxxxx")

            if (ends_dates[i] <= today) {
                cnt++
            }
            else if (starts[i] <= today & ends_dates[i] >= today) {
                console.log(" toto meno je momentálne obsadené a je v turnuse číslo " + cnt)
                cnt++
            }
        }
        */
    //used to get all the turnuses and remainding turnuses
    //  number = cnt
    // rest = ends.length - number
    //  cnt = 0

    console.log(number + " number");
    for (var i = 0; i < starts.length; i++) {
      var current = i + 1;
      console.log(surname);
      events.push({
        title: surname + " " + name + " " + current,
        start: starts[i],
        end: ends[i],
        color: color,
        id: number
      });
    }
  });

  db.close();
  return events;
}
var today;
$(document).ready(function() {
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  $("#calendar").fullCalendar({
    eventClick: function(eventObj) {
      const electron = require("electron");
      const path = require("path");
      const BrowserWindow = electron.remote.BrowserWindow;
      process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

      const modalPath = path.join(
        "file://",
        __dirname + "/..",
        "edit.html?" + eventObj.title
      );
      let win = new BrowserWindow({
        width: 800,
        height: 600
      });
      win.on("close", function() {
        win = null;
      });
      win.loadURL(modalPath);
      //  win.webContents.openDevTools()
      win.show();
    },
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,basicWeek,basicDay, listWeek,  listMonth"
    },
    locale: "sk",
    firstDay: 1,
    defaultDate: today,
    displayEventTime: false,
    eventStartEditable: false,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events

    events: return_events()
  });
});

$("header").on("headerLoaded", function() {
  $(".reload").click(function() {
    // return_events()
    $("#calendar").fullCalendar("removeEvents");
    events = [];
    //   return_events()
    //  $('#calendar').fullCalendar('refetchEvents')
    $("#calendar").fullCalendar("addEventSource", return_events());
    console.log("reloaded");
    namesA();
    get_names();
  });
});

