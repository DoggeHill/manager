

var sql = require('sql.js/js/sql-debug.js');
var fs = require('fs')
var error
var fs = require('fs-extra');

var today

var cnt = 0

function get_directory(){
   if(__dirname.toString().endsWith("js")) return  path.join(__dirname, '../..');
   else return  path.join(__dirname, '..');
   
   //return 'C:/Users/Patrik/Desktop/program-debug'
 }
 
 


async function names() {
   delete_names()
   $(".nav").find("#delete").remove()
   
   console.log(get_directory() + '\\db.sqlite')
   try {
      var filebuffer = fs.readFileSync(get_directory() + '\\db.sqlite');
      
   } catch (e) {
      error = e
      console.log(e);
   }
   if (filebuffer != null) {
      var db = new SQL.Database(filebuffer);
   } else {
      var db = new SQL.Database();
   }

   db.each('SELECT name FROM sqlite_master WHERE type = "table" ', function (row) {

      var name, surname, start_dates, end_dates, number, rest
      var ends = []
      var starts = []
      var start_date_datum
      var end_date_datum
      // console.log(row.name + " záznam");

      db.each('SELECT name FROM ' + row.name + ' LIMIT 1', function (rows) {
         // console.log(rows.name)
         name = rows.name
      })
      db.each('SELECT surname FROM ' + row.name + ' LIMIT 1', function (rows) {
         //   console.log(rows.surname)
         surname = rows.surname
      })
      db.each('SELECT starts FROM ' + row.name + ' LIMIT 1', function (rows) {
         //    console.log(rows.starts)
         start_dates = rows.starts
         start_date_datum = new Date(start_dates)
       //  console.log(start_date_datum + " yyyyyyyyyyyyyyyy")
      })

      db.each('SELECT end_simple FROM ' + row.name + ' LIMIT 1', function (rows) {
         //    console.log(rows.starts)

         end_date_datum = new Date(rows.end_simple)
      //   console.log(start_date_datum + " yyyyyyyyyyyyyyyy")
      })

      db.each('SELECT date_end FROM ' + row.name, function (rows) {
         ends.push(rows.date_end)
         //    console.log(rows.date_end)
      })
      db.each('SELECT date_start FROM ' + row.name, function (rows) {
         starts.push(rows.date_start)
      })


      for (var i = 0; i < ends.length; i++) {
       //  console.log(starts[i] + "   toto je tu " + ends[i] + "  toto je dnes " + today + "  " + cnt)




         if (ends[i] <= today) {

            cnt++
         }

         else if (starts[i] <= today & ends[i] >= today) {
            console.log(" toto meno je momentálne obsadené a je v turnuse číslo " + cnt)

            cnt++
         }


      }
      number = cnt
      rest = ends.length - number
      cnt = 0





      db.each('SELECT end_simple FROM ' + row.name + ' LIMIT 1', function (rows) {
         //  console.log(rows.end_simple)
         end_dates = rows.end_simple

      })

      //  console.log("parsing"+ name+ " name "+ surname + " "+ start_dates + " "+ end_dates + " "+ number)
      html_parserAll(name, surname, start_dates, end_dates, number, rest, start_date_datum.getTime(), end_date_datum.getTime())

      number = 0

   })

   try {
      //  fs.unlinkSync('C:/Users/Patrik/Desktop/program_zakazka/timetable/js/db.sqlite');
   } catch (e) {
      console.log("Unable to delete file; Exception: " + e);
   }
   fs.writeFileSync("filename.sqlite", new Buffer(db.export()));

   db.close()
}



function delete_table(name) {
   fs.copySync(get_directory() + '\\db.sqlite', get_directory() + '\\db\\db.sqlite');
   console.log(get_directory() +'\\db\\db.sqlite' )

   try {
      var filebuffer = fs.readFileSync(get_directory() + '\\db\\db.sqlite');
   } catch (e) {
      error = e
      console.log(e);
   }
   if (filebuffer != null) {
      var db = new SQL.Database(filebuffer);
   } else {
      var db = new SQL.Database();
   }
   db.run('DROP TABLE ' + name)

   try {
      fs.unlinkSync(get_directory() + '\\db\\db.sqlite', 'db.sqlite');
   } catch (e) {
      console.log("Unable to delete file; Exception: " + e);
   }
   fs.writeFileSync(get_directory() + '\\db.sqlite', new Buffer(db.export()));


   //  return_events()
   db.close()
   delete_names()
   get_names()

}
function delete_names() {
   $(".database").find("li").remove()
}

var html_string = ""

function html_parserAll(name, surname, start_date, end_date, number, rest, start_date_datum, end_date_datum) {

   html_string = `
   <li class="nav-item" data-name="`+ name + `" data-date="` + start_date_datum + ` "data-end="` + end_date_datum + `"   data-number=` + number + ` data-rest=` + rest + `  " ">

   <a class="nav-link active" href="#">
      <div class= "click_div">
     <img src="img/male-solid.svg">
     <span class="name">`+ name + `</span>
     <span class="sr-only">`+ surname + `</span>
     <span class="turnusy_number">`+ rest + `</span>
     <span class="date_start">`+ start_date + `</span>
     <span class="date_end">`+ end_date + `</span>
     <span class="turnusy_number_total">`+ number + `</span>
     </div>
     <label class="checkbox-button">
     <input type="checkbox" class="checkbox-button__input" id="choice1-1" name="`+ surname + `">
     <span class="checkbox-button__control"></span>
   </label>

   </a>
 </li>
   `
   $(".database").append(html_string)
}


$("aside").on("asideLoaded", function () {
   if ($(".turnusy_number").text() <= 3) {
      $(".turnusy_number").css("color", "red");
   }
   else if (($(".turnusy_number").text() <= 6) && ($(".turnusy_number").text() > '3')) {
      $(".turnusy_number").css("color", "#cdf215");
   }
   else {
   }
   console.log("here aside load")



   today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth() + 1; //January is 0!
   var yyyy = today.getFullYear();
   if (dd < 10) {
      dd = '0' + dd
   }
   if (mm < 10) {
      mm = '0' + mm
   }
   today = yyyy + '-' + mm + '-' + dd;

})

const removeBtn = document.getElementById('remove')

removeBtn.addEventListener('click', function (event) {

   var selected = [];
   $('.nav input:checked').each(function () {
      selected.push($(this).attr('name'));
   });
   // console.log(selected)
   for (var i = 0; i < selected.length; i++) {
      delete_table(selected[i].toString())

   }

})




async function get_names() {
   //Ditto, path module
   console.log("called")



   await names()

}
$(document).ready(function () {




   get_names()

})

//open edit tab on click of any record tab   
$("#aside").on('click', ".click_div", (function () {



   //$(".click_div").bind('click', function (e) {

   var text = $(this).find(".sr-only").text()
   //    console.log(text)
   var arr = [text]
   //   console.log($(this).find(".sr-only").text())x

   const electron = require('electron')
   //const path = require('path')
   const BrowserWindow = electron.remote.BrowserWindow
   process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';



   const modalPath = path.join('file://', __dirname + '/..', 'edit.html?' + arr);
   let win = new BrowserWindow({

      width: 800, height:
         600
   })


   win.on('close', function () { win = null; })
   // win.loadFile(modalPath)
   win.loadURL(modalPath)
   //win.webContents.openDevTools()
   win.show()

   //   console.log('edit');
}))



$(".b-select").on('change', function () {

   if ($(".b-select").val() == "Meno") {
      $(".database li").sort(sort_li).appendTo('.database');
      function sort_li(a, b) {
         return ($(b).data('name')) < ($(a).data('name')) ? 1 : -1;
      }
   }
   if ($(".b-select").val() == "Meno d") {
      $(".database li").sort(sort_li).appendTo('.database');
      function sort_li(a, b) {
         return ($(b).data('name')) > ($(a).data('name')) ? 1 : -1;
      }
   }
   else if ($(".b-select").val() == "Dátum začiatok") {
      $(".database li").sort(sort_li).appendTo('.database');
      function sort_li(a, b) {
         return ($(b).data('date')) < ($(a).data('date')) ? 1 : -1;
      }
   }
   else if ($(".b-select").val() == "Dátum začiatok d") {
      $(".database li").sort(sort_li).appendTo('.database');
      function sort_li(a, b) {
         return ($(b).data('date')) > ($(a).data('date')) ? 1 : -1;
      }
   }
   else if ($(".b-select").val() == "Dátum koniec") {
      $(".database li").sort(sort_li).appendTo('.database');
      console.log("here")
      function sort_li(a, b) {
         return ($(b).data('end')) < ($(a).data('end')) ? 1 : -1;
      }
   }
   else if ($(".b-select").val() == "Dátum koniec d") {
      $(".database li").sort(sort_li).appendTo('.database');
   
      function sort_li(a, b) {
         return ($(b).data('end')) > ($(a).data('end')) ? 1 : -1;
      }
   }
   else if ($(".b-select").val() == "Aktuálny turnus") {
      $(".database li").sort(sort_li).appendTo('.database');

      function sort_li(a, b) {
         return ($(b).data('number')) > ($(a).data('number')) ? 1 : -1;
      }
   }
   else if ($(".b-select").val() == "Zvyšný počet turnusov") {
      $(".database li").sort(sort_li).appendTo('.database');
   
      function sort_li(a, b) {
         return ($(b).data('rest')) > ($(a).data('rest')) ? 1 : -1;
      }
   }


})

