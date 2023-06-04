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
    GraphQLList } = require('graphql');


//Client Type

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        uname: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        },

    })
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Add Client
        addClient: {
            type: ClientType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                uname: {
                    type: GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: GraphQLNonNull(GraphQLString)
                },
                phone: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    uname: args.uname,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        // Delete Client
        deleteClient: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {

                Item.deleteMany({ clientId: args.id }).then(function () {
                    console.log("Data deleted"); // Success
                }).catch(function (error) {
                    console.log(error); // Failure
                });
                return Client.findByIdAndRemove(args.id)
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
