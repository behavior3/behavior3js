module.exports = function(grunt) {

  var files = grunt.file.readJSON('files.json');
  var projectFiles = [];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: [],
        dest: '../libs/<%= project %>-<%= pkg.version %>.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        src: '../libs/<%= project %>-<%= pkg.version %>.js',
        dest: '../libs/<%= project %>-<%= pkg.version %>.min.js'
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        version: '<%= pkg.version %>',
        description: '<%= pkg.description %>',
        url: '<%= pkg.url %>',
        logo: '<%= pkg.logo %>',
        options: {
          paths: ['../src'],
          outdir: '../docs/behavior3js/',
          linkNatives: true,
          attributesEmit: true,
          selleck: true,
          helpers: ["../build/path.js"],
          themedir: "createjsTheme/"
        }
      }
    },
    compress: {
      build: {
        options: {
          mode:'zip',
          archive:'../docs/<%= project %>-<%= pkg.version %>.zip'
        },
        files: [
          {expand:true, src:'**', cwd:'../docs/behavior3js'}
        ]
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // DOCS
  grunt.registerTask('_docs', function() {
    grunt.config.set('project', 'behavior3js');
  });

  // CORE
  grunt.registerTask('_core', function() {
    grunt.config.set('project', 'behavior3');
    grunt.config.set('concat.dist.src', files['core_source']);
  });

  // Default task(s).
  grunt.registerTask('docs', ['_docs', 'yuidoc', 'compress']);
  grunt.registerTask('build', ['_core', 'concat', 'uglify']);

};