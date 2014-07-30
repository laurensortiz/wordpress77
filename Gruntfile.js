// Generated on 2014-05-13 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);



  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    digital77: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      /*dist: 'dist'*/
      dist:'demo'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['js/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      compass: {
        files: ['sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      php : {
        files : ['**/*.php'],
        options : {
          livereload : true
        }
      },
//      images : {
//        files : ['images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
//        options : {
//          livereload : true
//        }
//      },
//      styles : {
//        files : ['css/{,*/}*.css'],
//        options : {
//          livereload : true
//        }
//      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{,*/}*.php',
          'css/{,*/}*.css',
          'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            './'
          ]
        }
      }
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= digital77.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: '{,*/}*.css',
          dest: 'css/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    bower: {
      all : {
        rjsConfig : 'js/global.js'
      }
    },


  // Compiles Sass to CSS and generates necessary files if requested
  compass: {
  options: {
    sassDir: 'sass',
      cssDir: 'css',
      generatedImagesDir: 'images/',
      imagesDir: 'images',
      javascriptsDir: 'js',
      fontsDir: 'css/fonts',
      //importPath: '<%= digital77.app %>/bower_components',
      httpImagesPath: 'images',
      httpGeneratedImagesPath: '../images',
      httpFontsDir: 'css/fonts',
      relativeAssets: false,
      assetCacheBuster: false,
      raw: 'Sass::Script::Number.precision = 10\n'
  },
  dist: {
    options: {
      generatedImagesDir: 'images/generated'
    }
  },
  server: {
    options: {
      debugInfo: false
    }
  }
},


  imagemin: {
    dist: {
      files: [{
        expand: true,
        cwd: 'images',
        src: '{,*/}*.{png,jpg,jpeg,gif}',
        dest: 'images'
      }]
    }
  },

  svgmin: {
    dist: {
      files: [{
        expand: true,
        cwd: 'images',
        src: '{,*/}*.svg',
        dest: 'images'
      }]
    }
  },

// Copies remaining files to places other tasks can use
// copy: {
//   dist: {
//     files: [{
//       expand: true,
//       dot: true,
//       cwd: '<%= digital77.app %>',
//       dest: '<%= digital77.dist %>',
//       src: [
//         '*.{ico,png,txt}',
//         '.htaccess',
//         '*.html',
//         'images/{,*/}*.{webp}',
//         'styles/**',

//       ]
//     }, {
//       expand: true,
//       cwd: '.tmp/images',
//       dest: '<%= digital77.dist %>/images',
//       src: ['generated/*']
//     }]
//   },
//   styles: {
//     expand: true,
//     cwd: '<%= digital77.app %>/styles',
//     dest: '<%= digital77.app %>/styles/',
//     src: '{,*/}*.css'
//   }
// },

  // Run some tasks in parallel to speed up the build process
  concurrent: {
    server: [
      'compass:server'
    ],
      test: [
      'compass'
    ],
      dist: [
      'compass:dist',
      'imagemin',
      'svgmin'
    ]
  },


  cssmin: {
     dist: {
       files: {
         'css/main.css': [
           'css/main.css'
         ]
       }
     }
  },
  uglify: {
     dist: {
       files: {
         'js/scripts/scripts.js': [
           'js/scripts.js'
         ]
       }
     }
  },
  concat: {
     dist: {}
  }

});


  grunt.registerTask('serve', function (target) {
  //  if (target === 'dist') {
  //    return grunt.task.run(['build', 'connect:dist:keepalive']);
  //  }

    grunt.task.run([
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('build', [
    'concurrent:dist',
    'autoprefixer',
    //'concat',
    //'uglify',
    'cssmin'
  ]);

  grunt.registerTask('setup', function(){
    grunt.log.subhead('Installing bower dependencies ');

    var done = this.async();
    var bower = require('bower').commands;
      bower.install().on('end', function(data) {
        done();
      }).on('data', function(data) {
        console.log(data);
      }).on('error', function(err) {
        console.error(err);
        done();
      });
  });

  grunt.registerTask('default', [
    'setup',
    'autoprefixer',
    'watch'
  ]);

  grunt.loadNpmTasks('grunt-contrib-requirejs');

};

