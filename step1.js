const fs = require('fs');


function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            //handle errors
            console.log("Error reading:",path);
            console.log(err);
            process.exit(1);
        }
        //success
        //print data
        console.log(data);
    })
}

if (process.argv.length == 3){
    const path = process.argv[2];
    cat(path);
}else{
    //should have only 3 parameters
    console.log('Should have exact 3 parameters')
}