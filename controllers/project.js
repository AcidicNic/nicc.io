const Project = require('../models/Project');

exports.showProject = (req, res) => {
    Project.findOne({slug: req.params.slug}).lean()
        .then(project => {
            console.log(project);
            res.render('view_project.hbs', {project: project});
        })
        .catch(err => {
            console.log(project);
            res.redirect('/');
        });

};

exports.add = (req, res) => {
    var project = new Project({title: "Something Rad", desc: "Test desc! idk maybe this should be longer. So I can see what it looks like with lots of text", img: "https://insider.si.edu/wp-content/uploads/2018/01/dsc_0191_hyperolius_adspersus-630x416.jpg"});
    project.save().then(user => {
        project.save();
        res.redirect('/');
    })
};
