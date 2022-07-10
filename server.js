//used npm package called uniqid
var uniqid = require('uniqid'); 
//using file system to write files
const fs = require('fs');
//using require path to join the files
const path = require('path');
//
const {db} = require('./db/db.json');
//here we setup express
const express = require('express')
const app = express();

//we add middleware to make all files public and so all the file link to one another
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// here we have the GET API route for notes
app.get('/api/notes', (req, res) => {
  //here we read the file and send the results and if we have any error it will throw an error
    fs.readFile('./db/db.json', (err, result) => {
    if (err) {
        throw err;
    }
    
    res.send(result);
   })
    
  });
// here we have the POST API route for notes
app.post('/api/notes', (req, res) => {
    
    const note = req.body;
    note.id = uniqid();

    fs.readFile('./db/db.json', (err, result) => {
        if (err) {
            throw err;
            
        }
        console.log(result)
        var data = JSON.parse(result)
        data.push(note)
        console.log(data)
       
        fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
         if (err) {
            throw err;
         }
         res.json(note)
        })
    })
    
    }
  );

  
// we have an GET HTML API route to access notes html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
// here we have the GET HTML API route for index html and we used * also known as Wildcard which will be set as the default page when we run the program
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
//here where the port will listen for the route
app.listen(3002, () => {
    console.log(`API server now on port 3002!`);
  });