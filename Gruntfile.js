module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        // If you can't get source maps to work, run the following command in your terminal:
        // $ sass scss/foundation.scss:css/foundation.css --sourcemap
        // (see this link for details: http://thesassway.com/intermediate/using-source-maps-with-sass )
        sourceMap: true
      },

      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/site-uber-style.min.css': 'scss/site-uber-style.scss'
        }
      }
    },

    copy: {
      scripts: {
        expand: true,
        cwd: 'bower_components/foundation/js/vendor/',
        src: '**',
        flatten: 'true',
        dest: 'js/vendor/'
      },

      iconfonts: {
        expand: true,
        cwd: 'bower_components/fontawesome/',
        src: ['**', '!**/less/**', '!**/css/**', '!bower.json'],
        dest: 'fonts/fontawesome/'
      },
        
      angular: {
        expand: true,
        cwd: 'bower_components/angular/',
        src: ['angular.min.js','angular.min.js.map'],
        dest: 'js/vendor/'
      },

      angularresource: {
        expand: true,
        cwd: 'bower_components/angular-resource/',
        src: ['angular-resource.min.js','angular-resource.min.js.map'],
        dest: 'js/vendor/'
      },

      momentjs: {
        expand: true,
        cwd: 'bower_components/moment/min/',
        src: ['moment.min.js'],
        dest: 'js/vendor/'
      },

    },


    'string-replace': {

        fontawesome: {
            files: {
                'fonts/fontawesome/scss/_variables.scss': 'fonts/fontawesome/scss/_variables.scss'
            },
            options: {
                replacements: [
                    {
                        pattern: '../fonts',
                        replacement: '../fonts/fontawesome/fonts'
                    }
                ]
            }
        },
    },

    concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: [

          // Foundation core
          'bower_components/foundation/js/foundation/foundation.js',
          
          // Pick the componenets you need in your project
          /*'bower_components/foundation/js/foundation/foundation.abide.js',
          'bower_components/foundation/js/foundation/foundation.accordion.js',
          'bower_components/foundation/js/foundation/foundation.alert.js',
          'bower_components/foundation/js/foundation/foundation.clearing.js',
          'bower_components/foundation/js/foundation/foundation.dropdown.js',
          'bower_components/foundation/js/foundation/foundation.equalizer.js',
          'bower_components/foundation/js/foundation/foundation.interchange.js',
          'bower_components/foundation/js/foundation/foundation.joyride.js',
          'bower_components/foundation/js/foundation/foundation.magellan.js',
          'bower_components/foundation/js/foundation/foundation.offcanvas.js',
          'bower_components/foundation/js/foundation/foundation.orbit.js',
          'bower_components/foundation/js/foundation/foundation.reveal.js',
          'bower_components/foundation/js/foundation/foundation.slider.js',
          'bower_components/foundation/js/foundation/foundation.tab.js',*/
          'bower_components/foundation/js/foundation/foundation.tooltip.js',
          //'bower_components/foundation/js/foundation/foundation.topbar.js',
          
          // Include your own custom scripts (located in the custom folder)
          'js/custom/*.js'
          
          ],
          // Finally, concatenate all the files above into one single file
          dest: 'js/site-core.js',
        },
      },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          // Shrink the file size by removing spaces
          'js/site-core.min.js': ['js/site-core.js']
        }
      }
    },

    watch: {
      grunt: { 
        files: ['Gruntfile.js'] 
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files:  ['js/custom/**/*.js'],
        //options: { livereload: true },
        tasks:  ['concat','uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('build', ['copy', 'string-replace:fontawesome', 'sass', 'concat', 'uglify']);
  grunt.registerTask('default', ['watch']);
};