require('dotenv').config();
const express = require('express')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const slug = require('mongoose-url-slugs');

const port = process.env.PORT || 3000;

// SSL stuff
const fs = require('fs');
const cert = fs.readFileSync(__dirname + '/ssl/www_nicc_io.crt');
const ca = fs.readFileSync('./ssl/www_nicc_io.ca-bundle');
const key = fs.readFileSync('./ssl/nicc_io.key');

// Importing controllers
const mainController = require('./controllers/main');
const projectController = require('./controllers/project');

const app = express()

// Mongoose Setup
mongoose.plugin(slug);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// setting up imported css and JS shortcuts!
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/fas', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));

// Static files in views/assets
app.use(express.static('views/assets'));

// Handlebars setup
app.engine('hbs', exphbs({
    defaultLayout: 'base',
    extname: '.hbs',
    layoutsDir: __dirname + '/views',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');

// Routes
app.get('/', mainController.index);
app.get('/about', mainController.about);
app.get('/:slug', projectController.showProject);
app.get('/add', projectController.add);


let options = {
   cert: cert,
   ca: ca,
   key: key
};
var server = https.createServer(options, app).listen(port, function(){
  console.log(`nicc.io test is live at http://localhost:${port}`);
});
// app.listen(port, () => console.log(`nicc.io test is live at http://localhost:${port}`));
