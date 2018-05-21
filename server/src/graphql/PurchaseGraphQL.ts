import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLFloat,
  } from 'graphql';
  import { Purchase } from '../db/models/Purchase';
  import { IIngredientRequest } from '../../../common/Interfaces';
  import { ObjectId } from 'bson';
  
  export const IngredientTypeType = new GraphQLObjectType({
    name: 'IngredientTypeType',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    }
  });
  
  export const PurchaseCompleteType = new GraphQLObjectType({
    name: 'PurchaseCompleteType',
    fields: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      quantity: { type: GraphQLFloat },
      value: { type: GraphQLFloat },
      buyDate: { type: GraphQLFloat },
      createdAt: { type: GraphQLFloat },
      ingredientType: { type: IngredientTypeType },
    }
  });
  
  // const PurchaseRequestInputType = new GraphQLInputObjectType({
  //   name: 'PurchaseRequestInputType',
  //   fields: {
  //     id: { type: GraphQLID },
  //     title: { type: new GraphQLNonNull(GraphQLString) },
  //     unit: { type: new GraphQLNonNull(GraphQLString) },
  //   }
  // });
  
  export const Query = {
    allPurchases: {
      type: new GraphQLList(PurchaseCompleteType),
      resolve: async function() {
        return await Purchase.find();
      }
    },
    purchase: {
      type: PurchaseCompleteType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async function(root, { id }) {
        return await Purchase.findOne({ '_id': id });
      }
    },
  };
  
  export const Mutation = {
    
  };