module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      compile: {
        options: {
          amd: true,
          namespace: 'Templates.Modal',
          processName: function(filename) {
            return filename.split('/').pop().replace('.hbs','');
          }
        },
        files: {
          'templates.js': [ 'templates/*.hbs' ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');

  // Default task(s).
  grunt.registerTask('default', ['handlebars']);

};
