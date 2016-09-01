module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        'sass': {
          'dist': {
            'options': {
              'style': 'expanded'
            },
            'files': {
              'src/css/styles.css': 'src/css/sass/styles.scss'
            }
          }
        },
        'cssmin': {
            'target': {
                'files': [{
                    'expand': true,
                    'cwd': 'src/',
                    'src': 'css/styles.css',
                    'dest': 'dist/',
                    'ext': '.min.css'
                }]
            }
        },
        'htmlmin': {
            'dist': {
                'options': {
                    'removeComments': true,
                    'collapseWhitespace': true
                },
                'files': {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        'uglify': {
            'dist/js/app.min.js': [
                'src/js/app.js'
            ]
        },
        'processhtml': {
            'dist': {
                'files': {
                    'dist/index.html': ['src/index.html']
                }
            }
        },
        'watch': {
            'scripts': {
                'files': ['src/js/app.js'],
                'tasks': ['uglify', 'processhtml'],
                'options': {
                    'spawn': false,
                },
            },
            'styles': {
              'files': ['src/css/sass/styles.scss'],
              'tasks': ['sass', 'cssmin', 'processhtml']
            },
            'html': {
              'files': ['src/index.html'],
              'tasks': ['processhtml']
            },
            'index': {
              'files': ['dist/index.html'],
              'tasks': ['htmlmin']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'processhtml', 'htmlmin', 'watch']);

};