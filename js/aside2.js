

$("header").on("headerLoaded", function getNames() {




})

const paths = require('path')

function get_directory(){
   if(__dirname.toString().endsWith("js")) return  paths.join(__dirname, '../..');
   else return  paths.join(__dirname, '..');
 }
 
 


async function namesA() {



   $('#calendar').fullCalendar('changeView', 'basicDay')
   console.log("here")
   var namesArray = $(".fc-title")
      .map(function () {
         return this.textContent;
      })

   //zero logs scenario
   delete_namesA()
   
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

   var allNames = new Set();
   var name, surname, start_dates, end_dates, number
   var cnt = 0

   var start_date_datum

   for (var i = 0; i < namesArray.length; i++) {
      var current = namesArray[i].replace(/ .*/, '');
      allNames.add(current)
   }

   db.each('SELECT name FROM sqlite_master WHERE type = "table" ', function (row) {


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

      
      var end_date_datum



      var ends = []
      var starts = []
      var rest
      if (!allNames.has(row.name)) {
         console.log("false hre")


         console.log(row.name + " tento zápis je v databáze")

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
         })
         db.each('SELECT date_start FROM ' + row.name, function (rows) {
            starts.push(rows.date_start)
         })
         db.each('SELECT date_end FROM ' + row.name, function (rows) {
            ends.push(rows.date_end)
         })
         db.each('SELECT end_simple FROM ' + row.name + ' LIMIT 1', function (rows) {
            //  console.log(rows.end_simple)
            end_dates = rows.end_simple
            end_date_datum = new Date(rows.end_simple)
         })


         for (var i = 0; i < ends.length; i++) {
            console.log(starts[i] + "   toto je tu " + ends[i] + "  toto je dnes " + today + "  " + cnt)




            if (ends[i] <= today) {

               cnt++
            }

            else if (starts[i] <= today & ends[i] >= today) {
               console.log(" toto meno je momentálne obsadené a je v turnuse číslo " + cnt)

               cnt++
            }


         }
         number = cnt
         rest = starts.length - number
         cnt = 0








        // html_parser(name, surname, start_dates, end_dates, number, rest)
      html_parserA(name, surname, start_dates, end_dates, number, rest, start_date_datum.getTime(), end_date_datum.getTime())

      }
      else {
         console.log(" name is not in the database " + row.name)
      }


   })



   number = 1




   try {
      //  fs.unlinkSync(get_directory() + '\\db.sqlite');
   } catch (e) {
      console.log("Unable to delete file; Exception: " + e);
   }
   fs.writeFileSync("filename.sqlite", new Buffer(db.export()));

   db.close()
}
function delete_namesA() {
   $(".databaseFree").find("li").remove()
}


var html_string = ""

function html_parserA(name, surname, start_date, end_date, number, rest, start_date_datum, end_date_datum) {
   

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
   $(".databaseFree").append(html_string)
}

$(document).ready(function getNamesA() {

   namesA()

})


$('#aside2').on('click', ".click_div", (function () {

   // $(".click_div").bind('click', function (e) {

   var text = $(this).find(".sr-only").text()
   //    console.log(text)
   var arr = [text]
   //   console.log($(this).find(".sr-only").text())x

   const electron = require('electron')
   const BrowserWindow = electron.remote.BrowserWindow
   process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';



   const modalPath = path.join('file://', __dirname + '/..', 'edit.html?' + arr);
   console.log(modalPath + " paaath")
   let win = new BrowserWindow({

      width: 800, height:
         600
   })


   win.on('close', function () { win = null; })
   // win.loadFile(modalPath)
   win.loadURL(modalPath)
 //  win.webContents.openDevTools()
   win.show()

   //   console.log('edit');
}))



$("#b-select").on('change', function () {
console.log("vwe")
   if ($("#b-select").val() == "Meno") {
      $(".databaseFree li").sort(sort_li).appendTo('.databaseFree');
      function sort_li(a, b) {
         return ($(b).data('name')) < ($(a).data('name')) ? 1 : -1;
      }
   }
   if ($("#b-select").val() == "Meno d") {
      $(".databaseFree li").sort(sort_li).appendTo('.databaseFree');
      function sort_li(a, b) {
         return ($(b).data('name')) > ($(a).data('name')) ? 1 : -1;
      }
   }
   else if ($("#b-select").val() == "Dátum začiatok") {
      $(".databaseFree li").sort(sort_li).appendTo('.databaseFree');
      function sort_li(a, b) {
         return ($(b).data('date')) < ($(a).data('date')) ? 1 : -1;
      }
   }
   else if ($("#b-select").val() == "Dátum začiatok d") {
      $(".databaseFree li").sort(sort_li).appendTo('.databaseFree');
      function sort_li(a, b) {
         return ($(b).data('date')) > ($(a).data('date')) ? 1 : -1;
      }
   }
   else if ($("#b-select").val() == "Dátum koniec") {
      $(".databaseFree li").sort(sort_li).appendTo('.databaseFree');
      console.log("here")
      function sort_li(a, b) {
         return ($(b).data('end')) < ($(a).data('end')) ? 1 : -1;
      }
   }
   else if ($("#b-select").val() == "Dátum koniec d") {
      $(".databaseFree li").sort(sort_li).appendTo('.databaseFree');
   
      function sort_li(a, b) {
         return ($(b).data('end')) > ($(a).data('end')) ? 1 : -1;
      }
   }
   else if ($("#b-select").val() == "Aktuálny turnus") {
      $(".databaseFree li").sort(sort_li).appendTo('.databaseFree');

      function sort_li(a, b) {
         return ($(b).data('number')) > ($(a).data('number')) ? 1 : -1;
      }
   }
   else if ($("#b-select").val() == "Zvyšný počet turnusov") {
      $(".databaseFree li").sort(sort_li).appendTo('.databaseFree');
   
      function sort_li(a, b) {
         return ($(b).data('rest')) > ($(a).data('rest')) ? 1 : -1;
      }
   }


})





