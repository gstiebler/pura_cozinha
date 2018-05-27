import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLFloat,
  } from 'graphql';
  import { IngredientType } from '../db/models/IngredientType';
  import { IIngredientRequest } from '../../../common/Interfaces';
  import { ObjectId } from 'bson';
  
  
  export const IngredientTypeCompleteType = new GraphQLObjectType({
    name: 'IngredientsCompleteType',
    fields: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      unit: { type: GraphQLString }
    }
  });
  
  const IngredientTypeRequestInputType = new GraphQLInputObjectType({
    name: 'IngredientRequestInputType',
    fields: {
      id: { type: GraphQLID },
      title: { type: new GraphQLNonNull(GraphQLString) },
      unit: { type: new GraphQLNonNull(GraphQLString) },
    }
  });
  
  export const Query = {
    allIngredients: {
      type: new GraphQLList(IngredientTypeCompleteType),
      resolve: async function() {
        return await IngredientType.find();
      }
    },
    ingredient: {
      type: IngredientTypeCompleteType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async function(root, { id }) {
        return await IngredientType.findOne({ '_id': id });
      }
    }
  };
  
  export const Mutation = {
    saveIngredient: {
      type: GraphQLString,
      args: { fmiData: { type: IngredientTypeRequestInputType } },
      async resolve(value, { fmiData }) {
        const ingredient = new IngredientType(fmiData);
        await ingredient.save();
        return { msg: 'OK' };
      }
    },
    updateIngredient: {
      type: GraphQLString,
      args: { fmiData: { type: IngredientTypeRequestInputType } },
      resolve: async (value, { fmiData }) => { 
        await IngredientType.update({ _id: fmiData.id }, { $set: fmiData }); 
        return 'OK'; 
      } 
    },
    deleteIngredient: {
      type: GraphQLString,
      args: { id: { type: GraphQLID } },
      resolve: async (value, { id }) => {
        await IngredientType.remove({ _id: id });
        return 'OK';
      }
    },
  };