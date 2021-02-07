var hugolunr = require('hugo-lunr');
var h = new hugolunr();
h.setInput('content/**');
h.setOutput('content/lunr.json');
h.index();
// new hugolunr().index();