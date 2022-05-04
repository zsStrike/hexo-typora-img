'use strict';

// match markdown image and covert to hexo valid image path
hexo.extend.filter.register('before_post_render', function (data) {
    // typora markdown path: ![label](folder/filename.png) -> ![label](filename.png)
    data.content = data.content.replace(/!{1}\[([^\[\]]*)\]\((\S*)\s?(?:".*")?\)/g,
        function (match_str, label, path) {
            if ((path.split("/")).length == 2) {
                return `![${label}](${path.split("/")[1]})`;
            } else {
                console.error(`unresolved markdown img tag: ${path}`);
                return match_str;
            }

        });
    // typora img path: <img src="folder/filename.png" zoom="33%"/>
    data.content = data.content.replace(/src="(.*?)"/g,
        function (match_str, path) {
            if (path.split("/").length == 2) {
                return `src="${path.split('/')[1]}"`;
            } else {
                console.error(`unresolved img path: ${path}`);
                return match_str;
            }
        });
    return data;
});