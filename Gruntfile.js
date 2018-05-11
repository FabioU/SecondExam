module.exports = function(grunt) {
    
    var config = grunt.file.readJSON(grunt.option('CONFIG') || 'config.json');
    
    grunt.registerTask('generateIndex', function(){
        grunt.file.copy('index.html', config.buildFolder+'/index.html', {
            process: function(files){
                return grunt.template.process(files,{
                    data: {
                        pageTitle: config.appName,
                        
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

    grunt.registerTask('build', ['generateIndex','generatepage1','generatepage2']);
};