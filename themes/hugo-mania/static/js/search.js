(function() {
    function convertSpace2Minus(str) {
        return str.replace(/\s/gi, '-');
    }
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');
        if (results.length) { // Are there any results?
            var appendString = `<li class="card green appear-100ms"><h3>${results.length} results are founded</h3></li>`;

            for (let i = 0; i < results.length; i++) {  // Iterate over the results
                let item = store.find(doc => results[i].ref===doc.uri);
                if(item){
                    const addressList = item.uri.split('/');
                    const endAddress = addressList[addressList.length-1];
                    if(endAddress === '_index'){ //section
                        let sectionAddress = '';
                        for(let i=0;i<addressList.length-1;i++)
                            sectionAddress += (addressList[i]+'/');
                        const uri = convertSpace2Minus(sectionAddress.toLowerCase());
                        appendString += `<li class="card appear-500ms"><a href="${uri}"><h3><i class="fas fa-folder icon"></i>${item.title}</h3></a>`;
                        appendString += `<p>${item.content.substring(0, 150)}...</p></li>`;
                    }
                    else { // post
                        const uri = convertSpace2Minus(item.uri.toLowerCase());
                        appendString += `<li class="card appear-500ms"><a href="${uri}"><h3><i class="fas fa-file icon"></i>${item.title}</h3></a>`;
                        appendString += `<p>${item.content.substring(0, 150)}...</p></li>`;
                    }
                    
                    
                }
            }

            searchResults.innerHTML = appendString;
        } 
        else {
            searchResults.innerHTML = '<li class="card red appear-100ms"><h3>No results found</h3></li>';
        }
    }

    function getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split('&');

        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }
    axios.get('/lunr.json')
    .then((result)=>{
        const docs = result.data;
        let searchTerm = getQueryVariable('query');
        if (searchTerm) {
            document.getElementById('search-box').setAttribute("value", searchTerm);
    
            // Initalize lunr with the fields it will be searching on. I've given title
            // a boost of 10 to indicate matches on this field are more important.
            const idx = lunr(function () {
                this.ref('uri');
                this.field('title', { boost: 10 });
                this.field('tags');
                this.field('category');
                this.field('content');
                
                docs.forEach(function(doc) {
                    this.add(doc);
                },this)
            });
            /*  uri
                title
                content
                tags */
            
            let results = idx.search(searchTerm); // Get lunr to perform a search
            displaySearchResults(results, docs); // We'll write this in the next section
        }
    })
})();