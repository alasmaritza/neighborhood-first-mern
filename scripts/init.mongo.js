db = new Mongo().getDB('fred');
db.resources.remove({});

db.resources.insert([
    { 
        category:'Homeless', 
        name:'Homeless Shelters LA', 
        address:{address1:'123 Fourth Street', address2:null, city:'Los Angeles', state:'CA', zip:'90007'}, 
        phone:'(213) 555-5555', 
        website:null, 
        comments:'No comments.', 
        isActive: true,
        created:new Date(),
    },
    { 
        category:'Aging', 
        name:'Home for Aged', 
        address:{address1:'456 Seventh Street', address2:'Suite 207', city:'Los Angeles', state:'CA', zip:'90007'}, 
        phone:'(213) 444-5555', 
        website:'http://aging-house.com', 
        comments:'This location is closed on Tuesdays.', 
        isActive: false,
        created:new Date(),
    },
]);

db.resources.createIndex({category: 1});
db.resources.createIndex({name: 1});
db.resources.createIndex({created: 1});

