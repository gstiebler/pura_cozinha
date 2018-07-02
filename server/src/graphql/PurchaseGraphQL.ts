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
  import { ObjectId, ObjectID } from 'bson';
  
  
  export const PurchaseCompleteType = new GraphQLObjectType({
    name: 'PurchaseCompleteType',
    fields: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      quantity: { type: GraphQLFloat },
      value: { type: GraphQLFloat },
      buyDate: { type: GraphQLFloat },
      createdAt: { type: GraphQLFloat },
      ingredientType: { type: GraphQLString },
    }
  });

  export const IngredientTypesTotal = new GraphQLObjectType({
    name: 'IngredientTypesTotal',
    fields: {
      _id: { type: GraphQLID },
      total: { type: GraphQLFloat },
    }
  });
  
  const PurchaseRequestInputType = new GraphQLInputObjectType({
    name: 'PurchaseRequestInputType',
    fields: {
      quantity: { type: new GraphQLNonNull(GraphQLFloat) },
      value: { type: new GraphQLNonNull(GraphQLFloat) },
      buyDate: { type: new GraphQLNonNull(GraphQLFloat) },
      ingredientType: { type: new GraphQLNonNull(GraphQLString) },
    }
  });
  
  export const Query = {
    allPurchases: {
      type: new GraphQLList(PurchaseCompleteType),
      resolve: async function() {
        return await Purchase.find();
      }
    },
    fetchPurchasesPerPage: {
      type: new GraphQLList(PurchaseCompleteType),
      args: {
        page: { type: GraphQLString }
      },
      resolve: async function(root, { page }) {
        return await Purchase.find()
                            .limit(8)
                            .skip(8 * page);
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
    ingredientTypeSums: {
      type: new GraphQLList(IngredientTypesTotal),
      resolve: async function() {
        return await Purchase.aggregate([
                              { $group: { _id: "$ingredientType", total: { $sum: "$quantity" } } },
                              { $sort: { total: -1 } }
                            ]);
      }
    },
  };
  
  export const Mutation = {
    savePurchase: {
      type: GraphQLString,
      args: { fmiData: { type: PurchaseRequestInputType } },
      async resolve(value, { fmiData }) {
        fmiData.ingredientType = new ObjectID(fmiData.ingredientType);
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