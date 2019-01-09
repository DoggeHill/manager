
const path = require('path')
const remote = require('electron').remote;

function get_directory(){
    if(__dirname.toString().endsWith("js")) return  path.join(__dirname, '../..');
    else return  path.join(__dirname, '..');
  }
  
  

$(".circle").css('opacity', '0.5')
var sql = require('sql.js/js/sql-debug.js');
var fs = require('fs')
var error
var fs = require('fs-extra');

var starts = []
var ends = []

var name
var surname
var start
var end

var number

var notes
var status
var color
var textarea
var color
var length_of_turnus


var cnt = 0

console.log(unescape(decodeURIComponent(global.location.search)));
var utf8 = unescape(decodeURIComponent(global.location.search));

utf8 = utf8.substring(1)
utf8 = utf8.replace(/ .*/, '')

$(document).ready(function () {

    var o = new Option(utf8, utf8)
    $(o).html(utf8)
    $("#status_clients").append(o)
    names(utf8)

    numberBase = $('#number').val()
    numberBase = parseInt(numberBase)



})
$(".circle").hover(function () {
    $(".circle").css("opacity", "0.5")
    $(this).css("opacity", "1")
})

$(".circle").click(function () {
    color = $(this).attr('id')
    $(this).css("opacity", "1")
    $(".circle").css("pointer-events", "none")
    setTimeout(function () {
        $(".circle").css("pointer-events", "all")

    }, 2000);

})


$('#status_clients').on('change', function () {
    names(this.value)
})

function names(text) {
    //remove all generated forms
    $(".first :input").remove()
    $(".first").find("label").remove()
    $(".first").find("div").remove()
    $(".second").find("label").remove()
    $(".second").find("div").remove()
    $(".second :input").remove()
    starts = []
    ends = []


    try {
        console.log(get_directory()+ "directory")
        var filebuffer = fs.readFileSync(get_directory() + '\\db.sqlite');
        var filebufferArchive = fs.readFileSync(__dirname + '\\db.sqlite');
    } catch (e) {
        error = e
        console.log(e);
    }
    if (filebuffer != null) {
        var db = new SQL.Database(filebuffer);
        var dbA = new SQL.Database(filebufferArchive);
    } else {
        var db = new SQL.Database();
        var dbA = new SQL.Database();

    }

    if (cnt == 0) {

        db.each('SELECT name FROM sqlite_master WHERE type = "table" ', function (row) {
            var defaultName = utf8

            if (row.name == defaultName) {
            }
            else {
                var o = new Option(row.name, row.name)
                $(o).html(row.name)
                $("#status_clients").append(o)
                $("#stats_clients").value = utf8
                console.log(row.name)

            }
        })
        cnt++
    }

    db.each('SELECT name FROM ' + text + ' LIMIT 1', function (rows) {
        console.log(rows.name)
        name = rows.name
        $('#fname').val(name)

    })
    db.each('SELECT surname FROM ' + text + ' LIMIT 1', function (rows) {
        console.log(rows.surname)
        surname = rows.surname
        $('#lname').val(surname)
    })
    db.each('SELECT starts FROM ' + text + ' LIMIT 1', function (rows) {
        console.log(rows.starts)
        start = rows.starts
        $('#start').val(start)
    })
    db.each('SELECT date_start FROM ' + text, function (rows) {
        console.log(rows.date_start)
        starts.push(rows.date_start)
    })
    db.each('SELECT date_end FROM ' + text, function (rows) {
        console.log(rows.date_end)
        ends.push(rows.date_end)
    })
    db.each('SELECT end_simple FROM ' + text + ' LIMIT 1', function (rows) {
        console.log(rows.end_simple)
        end_dates = rows.end_simple
        $('#end').val(end_dates)

    })
    db.each('SELECT end_simple FROM ' + text + ' LIMIT 1', function (rows) {
        console.log(rows.end_simple)
        end = rows.end_simple
        $('#end').val(end)
    })
    db.each('SELECT notes FROM ' + text + ' LIMIT 1', function (rows) {
        console.log(rows.notes)
        notes = rows.notes
        $('#textarea').val(notes)
    })
    db.each('SELECT EU FROM ' + text + ' LIMIT 1', function (rows) {
        console.log(rows.EU)
        status = rows.EU
        $('#status').val(status)
    })
    db.each('SELECT color FROM ' + text + ' LIMIT 1', function (rows) {
        console.log(rows.color + " xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        var color_current = rows.color
        $("#\\" + color_current).click()
        $("#\\" + rows.color).css('opacity', '1')
        color = rows.color

    })


    if (starts.length <= 1) {
       
       
        var date1 = new Date(starts[0])
        var date2 = new Date(ends[0])

        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        $('#length_turnus').val(diffDays)
        $('#length_home').val(10)
    } else {

        console.log("vervwwwwwwwwwwwwww")

        var date1 = new Date(starts[0])
        var date2 = new Date(ends[0])

        console.log(date2 + "   xxx  " + date1)
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        $('#length_turnus').val(diffDays)

        var date1 = new Date(starts[1])
        var date2 = new Date(ends[0])

        var timeDiff = Math.abs(date1.getTime() - date2.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        $('#length_home').val(diffDays)

    }

    $('#number').val(starts.length)


    for (i = 0; i < starts.length; i++) {
        //generate html files
        console.log("here")
        console.log(starts.length + " this is the lenggth of the end condition variable")
        var current = i + 1
        html_parser(current)
        $('#' + current).val(starts[i])
        console.log(i + 1 + "  " + starts[i])
        $('.' + current).val(ends[i])

    }

    try {
        //  fs.unlinkSync(get_directory() + '\\db.sqlite');
    } catch (e) {
        console.log("Unable to delete file; Exception: " + e);
    }
    fs.writeFileSync("filename.sqlite", new Buffer(db.export()));
//TODO: toto som tu pridal 
    db.close()
}


$(".btn").click(function () {

    var name = $('#fname').val()
    var surname = $('#lname').val()
    var start = $('#start').val()
    var number = $('#number').val()

    var notes = $('#textarea').val()
    var status = $('#status option:selected').text()

    var ends = []
    var starts = []

    if (name == '' | surname == '' | start == '' | textarea == '' | $("#start-iny").val() == '' | $("#number").val() == '') {

    }
    else {

        $('input[name="start"]').each(function () {
            starts.push($(this).val())
        })
        $('input[name="end"]').each(function () {
            ends.push($(this).val())
        })


        try {
            var filebuffer = fs.readFileSync(get_directory() + '\\db.sqlite');
        } catch (e) {
            error = e
            console.log(e);
        }
        if (filebuffer != null) {
            var db = new SQL.Database(filebuffer);
            var dbA = new SQL.Database(filebuffer);
        } else {
            var db = new SQL.Database();
            var dbA = new SQL.Database();
        }
        try {
            db.run('DROP TABLE ' + surname)
        } catch (e) {
            console.log(e)
        }




        try {
            dbA.run("CREATE TABLE `" + surname + "` (`name`	TEXT NOT NULL,   `surname`	TEXT NOT NULL,   `starts`	TEXT NOT NULL,   `date_start`	TEXT NOT NULL,   `date_end`	TEXT NOT NULL,   `end_simple`	TEXT NOT NULL,  `notes`	TEXT NOT NULL,  `EU`	TEXT NOT NULL,  `color`	TEXT NOT NULL );")
        } catch (e) {
           /* var today = new Date();
            var surnameA = surname
            surnameA = surnameA + today.getTime()
            console.log(surnameA)
          //  dbA.run("CREATE TABLE `" + surnameA + "` (`name`	TEXT NOT NULL,   `surname`	TEXT NOT NULL,   `starts`	TEXT NOT NULL,   `date_start`	TEXT NOT NULL,   `date_end`	TEXT NOT NULL,   `end_simple`	TEXT NOT NULL,  `notes`	TEXT NOT NULL,  `EU`	TEXT NOT NULL,  `color`	TEXT NOT NULL );")*/
            for (var i = 0; i < starts.length; i++) {
                console.log(i + "        iiiiiiiiiiiiiiiii ")
                dbA.run("INSERT INTO " + surname + " VALUES (?,?,?,?,?,?,?,?,?)",
                    [name, surname, start, starts[i].toString(), ends[i].toString(), end, notes, status, color]);
            }
            console.log(e)
        }

        for (var i = 0; i < starts.length; i++) {
            try {
                db.run("CREATE TABLE `" + surname + "` (`name`	TEXT NOT NULL,   `surname`	TEXT NOT NULL,   `starts`	TEXT NOT NULL,   `date_start`	TEXT NOT NULL,   `date_end`	TEXT NOT NULL,   `end_simple`	TEXT NOT NULL,  `notes`	TEXT NOT NULL,  `EU`	TEXT NOT NULL,  `color`	TEXT NOT NULL );")
                try {
                    for (var i = 0; i < starts.length; i++) {
                        console.log("inserting into database")
                        db.run("INSERT INTO " + surname + " VALUES (?,?,?,?,?,?,?,?,?)",
                            [name, surname, start, starts[i].toString(), ends[i].toString(), end, notes, status, color]);
                    }
                }
                catch (err) {
                    console.log(end)
                    console.log(err)
                }
            } catch (e) {
                console.log(e)
            }
            console.log("insertin into " + surname)
            fs.writeFileSync((get_directory() + '\\db.sqlite'), new Buffer(db.export()));
            fs.writeFileSync((get_directory() + '\\archive.sqlite'), new Buffer(dbA.export()));

           
        }
    }
    var window = remote.getCurrentWindow();
    window.close();

    
    //TODO: toto som presunul 
    db.close()
    dbA.close()
})



var numberBase = $('#number').val()
numberBase = parseInt(numberBase)

$('input[name=number]').on('input', function Alfa() {
  
    var date = new Date(start)

    //length of the turnus + int parse
     length_of_turnus = $('#length_turnus').val()
    length_of_turnus = parseInt(length_of_turnus)


    //length of home staying
    var length_home = $('#length_home').val()
    length_home = parseInt(length_home)

    var date_temp_turnus = new Date(date)
    var date_temp_home = new Date(date)

    var end_date = new Date(date.getTime() + (length_of_turnus * 24 * 60 * 60 * 1000))


    //number of turnuses
    var number = $('#number').val()
    number = parseInt(number)
    console.log(number)

    //contains all div inputs 
    var inputs_in_div = $(".first :input")
    //contains number of all inputs dynamically created
    //inside addition div 
    var rename = 0
    //var to set id of the elements increasingly
    console.log(number + "  "+ numberBase+ " sdvkjbkewjb")

    if (number > numberBase & number > 1) {

        console.log("here")

        //generate html files
        html_parser(number)

        //get info of field upthere
        number = number - 1

        date_last_start = new Date($('#' + number).val())
        console.log(date_last_start.getTime())  //nah 
        console.log(length_home + length_of_turnus)
        console.log($('#' + number).val())  //undefine
        date_temp_turnus = new Date(date_last_start.getTime() + ((length_of_turnus + length_home) * 24 * 60 * 60 * 1000))

        //set info to the field downthere
        number = number + 1
        $('#' + number).val(date_temp_turnus.toISOString().substr(0, 10))

        date_temp_home = new Date(date_temp_turnus.getTime() + ((length_of_turnus) * 24 * 60 * 60 * 1000))
        $('.' + number).val(date_temp_home.toISOString().substr(0, 10))


        //  $("." + number).value()
        //   $("#" + number).value()

    } else if(number > numberBase & number <=1){
        var length_of_turnus = $('#length_turnus').val()
        length_of_turnus = parseInt(length_of_turnus)
        html_parser(number)

        var date_temp = new Date($('#start').val())
        console.log(date_temp)
        date_temp = new Date(date_temp.getTime() + ((length_of_turnus) * 24 * 60 * 60 * 1000))

        console.log(length_of_turnus)
    
       
        console.log(date_temp)
        $('#' + number).val( $('#start').val())
        $('.' + number).val( date_temp.toISOString().substr(0, 10))
      

    }
    else if(number == 0){
        number = number + 1
        $("." + number).parent().remove()
        $('#' + number).parent().remove()
    }
    else {
        number = number + 1
        $("." + number).parent().remove()
        $('#' + number).parent().remove()
    }
    numberBase = $('#number').val()
    numberBase = parseInt(numberBase)
    console.log(numberBase)
})


//fn used to convert text to html and place it
function html_parser(i) {


    html_string = `<div class="" id="start_of_turnus">
          <label for="phone">Začiatok turnusu</label>
          <input type="date" id="`+ i + `" name="start" required="required">
        </div>`
    $(".first").append(html_string)
    html_string = `<div class="" id="end_of_turnus">
          <label for="pword" id="change_end">Koniec turnusu</label>
          <input type="date" class="`+ i + `" id="" name="end" required="required">
        </div>`
    $(".second").append(html_string)
    // console.log("completed")
}
