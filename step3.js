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
        console.log("Path: ",path);
        console.log(data);
        if (out){
            output(out, data);
        }
    })
}

function webCat(url, out){
    axios.get(url)
    .then(res=> {
        console.log("URL: ", url);
        console.log(res.data);
        if (out){
            output(out, res.data);
        }
    })
    .catch(err=> {
        console.log("Error fetching ", url);
        console.log(err);
    });
}

function proceed(arg){
    if (arg.startsWith("http:") || arg.startsWith("https:")){
        //url
        webCat(arg);
    }else{
        //path
        cat(arg);
    }
}

if (process.argv.length == 3){
    const arg = process.argv[2];
    proceed(arg);
}else if (process.argv[2]=='--out'){
    const out = process.argv[3];
    const arg = process.argv[4];
    if (arg.startsWith("http:") || arg.startsWith("https:")){
        webCat(arg, out);
    }else{
        cat(arg, out);
    }
}else if (process.argv[2] == '--seq'){
    const seq = process.argv.slice(3,process.argv.length);
    for (let arg of seq){
        proceed(arg);
    }
}else{
    console.log("invalid command");
}

