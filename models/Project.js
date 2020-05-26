const mongoose = require('mongoose');
const slug = require('mongoose-url-slugs');

const projectSchema = new mongoose.Schema({
    title: String,
    desc: String,
    img: String,
});

projectSchema.plugin(slug('title', {field: 'slug'}));

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
