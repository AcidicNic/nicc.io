const Project = require('../models/Project');

exports.index = (req, res) => {
    Project.find({}).lean()
    .then(projects => {
        res.render('home.hbs', {projects: projects});
    })
    .catch(err => {
        res.render('home.hbs');
    });
};
exports.about = (req, res) => {
    res.render('about.hbs', {title: "About Me", about: true});
};
