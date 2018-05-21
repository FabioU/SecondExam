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
    
    var vec =[]; 
    vec = dataf.users;
    
    for (let i = 0; i < vec.length; i++) {
        if(vec[i].avatar_url===""){
            vec[i].avatar_url = "https://help.github.com/assets/images/help/profile/identicon.png";
        }        
    }
    var block = "enable";
    if(config.enablePageTwoLink===false){
        block = "disabled";
    }

    grunt.registerTask('generateIndex', function(){
        grunt.file.copy('index.html', config.buildFolder+'/index.html', {
            process: function(files){
                return grunt.template.process(files,{
                    data: {
                        pageTitle: config.appName,
                        pageOneName : config.pageOneName,
                        pageTwoName : config.pageTwoName,
                        block : block
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
                        users : vec
                        
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
                        title: config.freeContent.title,
                        body: config.freeContent.body,
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