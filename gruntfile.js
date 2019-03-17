const scssSrcDirectory = './src/Output/diagram.scss';

module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dev: {
        files: {
          './out/Output/diagram.css': scssSrcDirectory
        }
      }
    },
    watch: {
      sass: {
        files: [scssSrcDirectory],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
