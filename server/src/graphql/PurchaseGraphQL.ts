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

  export const IngredientTypeInputType = new GraphQLInputObjectType({
    name: 'IngredientTypeInputType',
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
  
  const PurchaseRequestInputType = new GraphQLInputObjectType({
    name: 'PurchaseRequestInputType',
    fields: {
      quantity: { type: new GraphQLNonNull(GraphQLFloat) },
      value: { type: new GraphQLNonNull(GraphQLFloat) },
      buyDate: { type: new GraphQLNonNull(GraphQLFloat) },
      ingredientType: { type: new GraphQLNonNull(IngredientTypeInputType) },
    }
  });
  
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
    savePurchase: {
      type: GraphQLString,
      args: { fmiData: { type: PurchaseRequestInputType } },
      async resolve(value, { fmiData }) {
        const purchase = new Purchase(fmiData);
        await purchase.save();
        return { msg: 'OK' };
      }
    },
    deletePurchase: {
      type: GraphQLString,
      args: { id: { type: GraphQLID } },
      resolve: async (value, { id }) => {
        await Purchase.remove({ _id: id });
        return 'OK';
      }
    },
  };