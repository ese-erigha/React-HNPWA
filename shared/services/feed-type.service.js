let urlKeyToFeedKey = {

    new:'newstories',
    top: 'topstories',
    best: 'beststories',
    ask: 'askstories',
    show: 'showstories',
    job: 'jobstories'
};

let feedTypeService = {

    getFeedKey: (urlKey)=>{

        return urlKeyToFeedKey[urlKey];
    }
};

export default feedTypeService;