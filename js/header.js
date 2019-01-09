function get_directory(){
    if(__dirname.toString().endsWith("js")) return  path.join(__dirname, '../..');
    else return  path.join(__dirname, '..');
  }
  
  

$("header").on("headerLoaded", function () {

    $(".normal").on('click', function () {
        var execFile = require('child_process').execFile;

        execFile(get_directory()+'\\backup\\sqlite.exe', console.log);

    })
    $(".archive").on('click', function () {
        var execFile = require('child_process').execFile;

        execFile(get_directory()+'\\archive\\sqliteArchive.exe', console.log);
        
    })
})


/*
 $(".normal").on('click', function () {
        console.log("hi")
        // The path to your python script
        var myPythonScript = 'C:/Users/Patrik/Desktop/sqlite.py';
        // Provide the path of the python executable, if python is available as environment variable then you can use only "python"
        var pythonExecutable = "python";

        // Function to convert an Uint8Array to a string
        var uint8arrayToString = function (data) {
            return String.fromCharCode.apply(null, data);
        };
        const spawn = require('child_process').spawn;
        const scriptExecution = spawn(pythonExecutable, [myPythonScript]);
    })
    */