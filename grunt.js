module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>*/'
    },
    concat: {
      fighter: {
        src: [
           '<banner:meta.banner>'
          ,'public/js/libs/reqAnim-polyfill.js'
          ,'cli-src/fighter/states.js'
          ,'cli-src/fighter/config/bird/sizes.js'
          ,'cli-src/fighter/config/bird/tiles.js'
          ,'cli-src/fighter/config/bird/frames.js'
          ,'cli-src/fighter/config/bird/animations.js'
          ,'cli-src/fighter/config/text/sizes.js'
          ,'cli-src/fighter/config/text/tiles.js'
          ,'cli-src/fighter/config/clock/sizes.js'
          ,'cli-src/fighter/config/clock/tiles.js'
          ,'cli-src/fighter/repository.js'
          ,'cli-src/fighter/hitManager.js'
          ,'cli-src/fighter/animation.js'
          ,'cli-src/fighter/bird.js'
          ,'cli-src/fighter/clock.js'
          ,'cli-src/fighter/stage.js'
          ,'cli-src/fighter/splash.js'
          ,'cli-src/fighter/match.js'
          ,'cli-src/fighter/manager.js'
        ],
        dest: 'cli-src/<%= pkg.name %>-<%= pkg.version %>.js'
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
