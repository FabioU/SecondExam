module.exports = function(grunt) {
    
    var config;
    try {
        config = grunt.file.readJSON(grunt.option('CONFIG'));
    } catch (error) {
        config = grunt.file.readJSON('config.json');
    }
    var dataf;
    try {
        dataf = grunt.file.readJSON(grunt.option('DB'));
    } catch (error) {
        dataf = grunt.file.readJSON('data.json');
    }
	grunt.loadNpmTasks('grunt-contrib-jasmine');
    
    grunt.registerTask('generateIndex', function(){
        grunt.file.copy('index.html', config.buildFolder+'/index.html', {
            process: function(files){
                return grunt.template.process(files,{
                    data: {
                        pageTitle: config.appName,
                        pageOneName : config.pageOneName,
                        pageTwoName : config.pageTwoName
                        
                    }
                });
            }
        });
    });

    grunt.registerTask('generatepage1', function(){
        grunt.file.copy('page1.html', config.buildFolder+'/'+config.pageOneName+'.html', {
            process: function(files){
                return grunt.template.process(files,{
                    data: {
                        pageTitle: config.appName,
                        avatar: dataf.avatar,
                        username: dataf.username,
                        nickname: dataf.nickname,
                        link: dataf.link
                        
                    }
                });
            }
        });
    });

    grunt.registerTask('generatepage2', function(){
        grunt.file.copy('page2.html', config.buildFolder+'/'+config.pageTwoName+'.html', {
            process: function(files){
                return grunt.template.process(files,{
                    data: {
                        pageTitle: config.appName,
                        
                    }
                });
            }
        });
    });
     grunt.initConfig({
        jasmine: {
            JS: {
              options: {
                specs: 'spec/*.spec.js'
              }
            }
          }

     });

    grunt.registerTask('build', ['generateIndex','generatepage1','generatepage2','jasmine']);
};