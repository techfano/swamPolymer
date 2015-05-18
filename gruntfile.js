// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // Configure Grunt 
  grunt.initConfig({
 

    components : Object.keys(grunt.file.readJSON('./bower.json').dependencies).map(
        function(prodComponent) {
            return "source/polymer/"+prodComponent+"/"+prodComponent+".html";
        }
    ),

    htmlbuild: {
        source: {
            src: 'template/source/index.html',
            dest: 'source/index.html',
            options: {
                beautify: true,
                relative: true,
                scripts: {
                    bundle: ['source/polymer/webcomponentsjs/webcomponents.js'],
                },
                styles: {
                    bundle: ['source/assets/**.css']
                },
                components: {
                    bundle: ['<%= components %>',
                             'source/polymer/font-roboto/roboto.html']
                },
                sections: {
                    layout: {
                        header: 'template/source/header.html',
                        footer: 'template/source/footer.html'
                    }
                },
            }
        }
    },

    copy: {
      polymer: {
        files: [
          {expand: true, cwd: 'bower_components/', src:['core-**/**'], dest: 'source/polymer/'},
          {expand: true, cwd: 'bower_components/', src:['paper-**/**'], dest: 'source/polymer/'},
          {expand: true, cwd: 'bower_components/', src:['polymer/**'], dest: 'source/polymer/'},
          {expand: true, cwd: 'bower_components/', src:['font-roboto/**'], dest: 'source/polymer/'},
          {expand: true, cwd: 'bower_components/', src:['webcomponentsjs/**'], dest: 'source/polymer/'}
        ],
      },
      javascript:{
        files:[
          {expand: true, cwd: 'bower_components/', src:['angular/angular.js'], dest: 'source/js/libs/'},
          {expand: true, cwd: 'bower_components/', src:['angularAMD/angularAMD.js'], dest: 'source/js/libs/'},
          {expand: true, cwd: 'bower_components/', src:['angular-**/angular-**.js'], dest: 'source/js/libs/'},
          {expand: true, cwd: 'bower_components/', src:['requirejs/require.js'], dest: 'source/js/libs/'}
        ]

      }
    },

    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['source'], // Replace with the directory you want the files served from
                              // Make sure you don't use `.` or `..` in the path as Express
                              // is likely to return 403 Forbidden responses if you do
                              // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
 
    // grunt-watch will monitor the projects files
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry 
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ['index.html','js/scripts/**/*.js'],
        options: {
          livereload: true
        }
      }
    },
 
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }
  });
 
  // Creates the `server` task
  grunt.registerTask('swam', [
    'copy:polymer',
    'copy:javascript',
    'htmlbuild:source',
    'express',
    'open',
    'watch',
  ]);
};