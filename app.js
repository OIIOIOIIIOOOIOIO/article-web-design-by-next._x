const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const fs = require('fs');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

let data = [];
let files = fs.readdirSync('./views');
    files.forEach(file => {
        if (file.includes('.pug')) {
            let name = file.replace('.pug', '');
            data.push(name);
        }
});

fs.readdirSync('./views').forEach(file => {
    if (file.includes('.pug')) {
        const route = file.replace('.pug', '');
        let urlEncode = encodeURI(route);
        app.get('/' + urlEncode, (req, res) => {
            res.render(route, {
                title: route
            });
        });
    }
});

app.get('/', (req, res) => {    
    res.render('index', {
        data: data
    });
});

app.listen(port, () => {
    console.log('\x1b[33m%s\x1b[0m', 'Server is running on http://localhost:' + port);
});