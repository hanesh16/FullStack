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

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        items:{
            type: new GraphQLList(ItemType),
            resolve(parent,args){
                return Item.find();
            }
        },
        item:{
            type:ItemType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Item.findById(args.id)
            }
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find();
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Client.findById(args.id)
            }
        }
    }
})


// Mutations

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //Add Client
        addClient:{
            type:ClientType,
            args:{
                name:{
                    type:GraphQLNonNull(GraphQLString)
                },
                uname:{
                    type:GraphQLNonNull(GraphQLString)
                },
                email:{
                    type:GraphQLNonNull(GraphQLString)
                },
                phone:{
                    type:GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent,args){
                const client=new Client({
                    name:args.name,
                    uname:args.uname,
                    email:args.email,
                    phone:args.phone
                });
                return client.save();
            }
        },
        // Delete Client
        deleteClient:{
            type:ClientType,
            args:{
                id:{
                    type:GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent,args){

                Item.deleteMany({ clientId: args.id }).then(function(){
                    console.log("Data deleted"); // Success
                }).catch(function(error){
                    console.log(error); // Failure
                });
                return Client.findByIdAndRemove(args.id)
            }
        },
        // Add Item
        addItem:{
            type:ItemType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                description:{type:GraphQLNonNull(GraphQLString)},
                clientId:{type:GraphQLNonNull(GraphQLID)},
                status:{type:new GraphQLEnumType({
                    name:'ItemStatus',
                    values:{
                        'na':{value:'Not Available'},
                        'sold':{value:'Sold Out'},
                        'available':{value:'Available'}
                    }
                }),
                defaultValue:'Available'
            }
            },resolve(parent,args){
                const item = new Item({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    clientId:args.clientId
                });
                return item.save()
            },
        },
        // Delete a Item
        deleteItem:{
            type:ItemType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Item.findByIdAndRemove(args.id)
            }
        },
        // Update a Item
        updateItem:{
            type:ItemType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                name:{type:GraphQLString},
                description:{type:GraphQLString},
                status:{type:new GraphQLEnumType({
                    name:"ItemStatusUpdate",
                    values:{
                        'na':{value:'Not Available'},
                        'sold':{value:'Sold Out'},
                        'available':{value:'Available'}
                    }
                }),
            }
            },resolve(parent,args){
              return Item.findByIdAndUpdate(
                args.id,{
                    $set:{
                        name:args.name,
                        description:args.description,
                        status:args.status

                    }
                },{new:true}
              )
            },
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
