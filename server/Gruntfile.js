module.exports = function(grunt) {

  //Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['uglify', 'sass']);

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '../client/app.min.js': ['../client/app.js']
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          '../client/partials/home.css': '../client/partials/home.scss',       // 'destination': 'source'
        }
      }
    }
  });
};
