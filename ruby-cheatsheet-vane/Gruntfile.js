module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    },
                    pretty: true
                },
                files: {
                    'index.html': ['_dev/pug/index.pug'],


                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded' //'compressed'
                },
                files: {
                    // Nuestro Sass es compilado a nuestro archivo CSS
                    'css/style.css': '_dev/scss/style.scss',
                }
            }
        },

        postcss: {
            options: {
                map: true, // inline sourcemaps

                // or
                // map: {
                //     inline: false, // save all sourcemaps as separate files...
                //     annotation: 'css' // ...to the specified directory
                // },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },
        watch: {
            site: {
                // Vigilamos cualquier cambio en nuestros archivos
                files: ['js/**/*.js', '*.html', '_dev/scss/**/*.scss', '_dev/pug/**/*.pug'],
                tasks: ['default']
            },
            options: {
                // Instalamos la extensión de Livereload en Chrome para ver cambios
                // automáticos en el navegador sin hacer refresh
                spawn: false,
                livereload: true
            }
        }
    });
    // Cargamos los plugins

    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Registrar tareas
    grunt.registerTask('default', ['pug', 'sass', 'postcss', 'watch']);
}
