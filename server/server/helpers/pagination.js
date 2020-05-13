module.exports=  (req, data, PerPage) => {
    let fullUrl = req.protocol + '://' + req.get('host') +'/api'+ req.path ;
    let limit = PerPage;
    let offset = 0 ;
    let page;
    //check if this page query exist
    //if exist return it else  page  = 1
    if (req.query.page){
        page = req.query.page; //page number
    }else{
        page = 1;
    }

    let pages = Math.ceil(data.count / limit);
    offset = limit *(page-1);

    let current_page = fullUrl+  '?page=' + page;

    // if the number of pages bigger or equal to the current page  + 1
    //send link for the next page else don't
    let next = (++page);
    if (pages >= next) {
        var nextPage = fullUrl +'?page=' +next;
    }


    let last = (page-2);
    if (last <= pages && last > 0){
        var last_page = fullUrl + '?page=' +last;
    }

    return {
        offset,
        limit,
        pages,
        nextPage,
        last_page,
        fullUrl,
        current_page}

};