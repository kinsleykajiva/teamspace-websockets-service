const thinky = require('thinky')({
    host: "13.246.49.140",
    port:  28015,
    db: "teamspace"
});
const r = thinky.r;
const type = thinky.type;



// Create the model
/*const uModel = thinky.createModel("users111", {
    id: type.string(),
    email: type.string(),
    createdAt: type.date().default(r.now())
});
uModel.ensureIndex("createdAt");*/
// Create the model
const companyModel = thinky.createModel("company", {
    id_: type.string(),
    title: type.string(),
    adminEmail: type.string(),
    isActive: type.boolean(),
    createdAt: type.date().default(r.now())
},{
    pk:'id_'
});


// Create the model
const userModel = thinky.createModel("users", {
    id_: type.string(),
    email: type.string(),
    password: type.string(),
    fullName: type.string(),
    profilePictureUrl: type.string(),
    isActive: type.boolean(),
    isIsVerified: type.boolean(),
    companyClientId: type.string(),
    createdAt: type.date().default(r.now())
},{
    pk:'id_'
});



// Create the model
const chatMessageModel = thinky.createModel("chatMessages", {
    id_: type.string(),
    fromUserId: type.string(),
    toUserId: type.string(),
    sentByUserId: type.string(),
    message: type.string(),
    messageType: type.string(),
    companyClientId: type.string(),
    isActive: type.boolean(),
    createdAt: type.date().default(r.now())
},{
    pk:'id_'
});
// Create the model
const callModel = thinky.createModel("calls", {
    id_: type.string(),
    fromUserId: type.string(),
    toUserId: type.string(),
    callType: type.string(),
    companyClientId: type.string(),
    createdAt: type.date().default(r.now())
},{
    pk:'id_'
});
// Create the model
const teamModel = thinky.createModel("teams", {
    id_: type.string(),
    title: type.string(),
    companyClientId: type.string(),
    isActive: type.boolean(),
    createdAt: type.date().default(r.now())
},{
    pk:'id_'
});

// Create the model
const groupModel = thinky.createModel("groups", {
    id_: type.string(),
    title: type.string(),
    companyClientId: type.string(),
    isActive: type.boolean(),
    createdAt: type.date().default(r.now())
},{
    pk:'id_'
});
// Create the model
const groupDetailModel = thinky.createModel("groupDetails", {
    id_: type.string(),
    groupId: type.string(),
    usersId: type.string(),
    companyClientId: type.string(),
    isActive: type.boolean(),
    createdAt: type.date().default(r.now())
},{
    pk:'id_'
});

/*companyModel.ensureIndex("createdAt");
userModel.ensureIndex("createdAt");
chatMessageModel.ensureIndex("createdAt");
callModel.ensureIndex("createdAt");
teamModel.ensureIndex("createdAt");
groupModel.ensureIndex("createdAt");
groupDetailModel.ensureIndex("createdAt");*/

module.exports = { userModel ,chatMessageModel,companyModel , callModel , teamModel ,groupModel  , groupDetailModel };
// module.exports = { thinky};


