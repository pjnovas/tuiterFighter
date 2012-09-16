module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      fighter: {
        src: [
           '<banner:meta.banner>'
          ,'public/js/libs/reqAnim-polyfill.js'
          ,'public/js/fighter/states.js'
          ,'public/js/fighter/config/bird/sizes.js'
          ,'public/js/fighter/config/bird/tiles.js'
          ,'public/js/fighter/config/bird/frames.js'
          ,'public/js/fighter/config/bird/animations.js'
          ,'public/js/fighter/config/text/sizes.js'
          ,'public/js/fighter/config/text/tiles.js'
          ,'public/js/fighter/config/clock/sizes.js'
          ,'public/js/fighter/config/clock/tiles.js'
          ,'public/js/fighter/repository.js'
          ,'public/js/fighter/hitManager.js'
          ,'public/js/fighter/animation.js'
          ,'public/js/fighter/bird.js'
          ,'public/js/fighter/clock.js'
          ,'public/js/fighter/stage.js'
          ,'public/js/fighter/splash.js'
          ,'public/js/fighter/match.js'
          ,'public/js/fighter/manager.js'
        ],
        dest: 'public/js/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    min: {
      fighter: {
        src: ['<banner:meta.banner>', '<config:concat.fighter.dest>'],
        dest: 'public/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('build', 'concat min');
};
