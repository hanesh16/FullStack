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

const ItemType = new GraphQLObjectType({
    name:'Item',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return Client.findById(parent.clientId)
            }
        },

    })
})


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})
