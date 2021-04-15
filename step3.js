const fs = require('fs');
const axios  = require('axios');

function output(out, data){
    fs.writeFile(out, data, 'utf8', function(err, dt){
        if (err){
            //handle errors
            console.log("Error Writing:",out);
            console.log(err);
            process.exit(1);
        }
        //success
        console.log("Wrote to ", out);
    })
}

function cat(path, out){
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
        output(out, data);
    })
}

function webCat(url, out){
    axios.get(url)
    .then(res=> {
        console.log(res.data);
        output(out, res.data);
    })
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
}if (process.argv.length==5){
    if (process.argv[2]=='--out'){
        const out = process.argv[3];
        const arg = process.argv[4];
        if (arg.startsWith("http:") || arg.startsWith("https:")){
            webCat(arg, out);
        }else{
            cat(arg, out);
        }
    }else{
        //invalid parameters
        console.log("invalid command");
    }
}
else{
    //should have only 3 parameters
    console.log('Should have exact 3 or 5 parameters')
}

