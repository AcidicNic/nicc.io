const Project = require('../models/Project');

exports.admin = (req, res) => {
    Project.find({}).lean()
    .then(projects => {
        res.render('admin.hbs');
    })
    .catch(err => {
        res.render('admin_check.hbs', {projects: projects});
    });
};
