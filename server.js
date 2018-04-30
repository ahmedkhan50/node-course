const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperIt', (text) => {
    return text.toUpperCase();
});

app.use((request, response, next) => {
    let now = new Date().toString();
    var log = `${now} method is ${request.method} and path is ${request.path}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to file..!!');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'home page!!',
        welcomeMessage: 'Welcome to my homepage!!'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'about page!!'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.listen(port, () => {
    console.log(`server is up now on ${port} port...`)
});