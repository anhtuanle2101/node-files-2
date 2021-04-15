const fs = require('fs');
const axios  = require('axios');


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

function webCat(url){
    axios.get(url)
    .then(res=> console.log(res.data))
    .catch(err=> {
        console.log("Error fetching ", url);
        console.log(err);
    });
}

if (process.argv.length == 3){
    const arg = process.argv[2];
    if (arg.startsWith("http:") || arg.startsWith("https:")){
        webCat(arg);
    }else{
        cat(arg);
    }
}else{
    //should have only 3 parameters
    console.log('Should have exact 3 parameters')
}

