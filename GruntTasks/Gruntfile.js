module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: ['../GeoTour.MobileClient/www/css/source/**/*.scss'],
                tasks: ['compass']
            }
        },

        compass: {
            sass: {
                options: {
                    sassDir: '../GeoTour.MobileClient/www/css/source/',
                    cssDir: '../GeoTour.MobileClient/www/css/',
                    //environment: 'production',
                    //outputStyle: 'compressed'
                }
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default task(s).
    grunt.registerTask('default', ['watch']);



    grunt.registerTask('CopySassUpADir', 'test', function () {
        console.log('file changed');
    });


};