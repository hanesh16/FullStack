// const {projects,clients} = require("../sampleData")

// Mongoose models

const Item = require("../models/Item")
const Client = require("../models/Client")


const { GraphQLObjectType,
        GraphQLID,
        GraphQLString,
        GraphQLSchema,
        GraphQLEnumType,
        GraphQLNonNull,
        GraphQLList}=require('graphql');


//Client Type

const ClientType = new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        uname:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
})




module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})
