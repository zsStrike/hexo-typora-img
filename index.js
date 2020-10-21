'use strict';

// match markdown image and covert to hexo valid image path
hexo.extend.filter.register('before_post_render', function(data){

    data.content = data.content.replace(/!{1}\[([^\[\]]*)\]\((\S*)\s?(?:".*")?\)/g,
        function(match_str, label, path){

            // if only one /
            if( (path.split("/")).length == 2){
                console.debug("Markdown Image Path: " + match_str);
                console.debug(`Changed path: ![${label}](${path.split("/")[1]})`);
                return `![${label}](${path.split("/")[1]})`;
            }else{
                console.debug("Markdown Image Path does not exists!");
                return match_str;
            }

        });

    return data;
});