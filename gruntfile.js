const scssSrcDirectory = './src/Output/diagram.scss';
const htmlSrcDirectory = './src/Output/diagram.html';

module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dev: {
        files: {
          './out/Output/diagram.css': scssSrcDirectory
        }
      }
    },
    copy: {
      main: {
        files: [{ nonull: true, src: htmlSrcDirectory, dest: './out/Output/diagram.html' }]
      }
    },
    watch: {
      sass: {
        files: [scssSrcDirectory],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      copy: {
        files: ['./src/Output/*'],
        tasks: ['copy'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
