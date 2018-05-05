import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLFloat,
  } from 'graphql';
  import { Ingredient } from '../db/models/Ingredient';
  import { IIngredientRequest } from '../../../common/Interfaces';
  import { ObjectId } from 'bson';
  
  export const UnitType = new GraphQLObjectType({
    name: 'UnitType',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    }
  });
  
  export const IngredientsCompleteType = new GraphQLObjectType({
    name: 'IngredientsCompleteType',
    fields: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      amount: { type: GraphQLFloat },
      unit: { type: UnitType }
    }
  });
  
  export const UnitInputType = new GraphQLInputObjectType({
    name: 'UnitInputType',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    }
  });

  const IngredientRequestInputType = new GraphQLInputObjectType({
    name: 'IngredientRequestInputType',
    fields: {
      id: { type: GraphQLID },
      title: { type: new GraphQLNonNull(GraphQLString) },
      amount: { type: GraphQLFloat },
      unit: { type: UnitInputType }
    }
  });
  
  export const Query = {
    allIngredients: {
      type: new GraphQLList(IngredientsCompleteType),
      resolve: async function() {
        return await Ingredient.find();
      }
    },
    ingredient: {
      type: IngredientsCompleteType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async function(root, { id }) {
        return await Ingredient.findOne({ '_id': id });
      }
    }
  };
  
  export const Mutation = {
    saveIngredient: {
      type: GraphQLString,
      args: { fmiData: { type: IngredientRequestInputType } },
      async resolve(value, { fmiData }) {
        const ingredientObj: Ingredient = {
          title: fmiData.title,
          amount: fmiData.amount,
          unit: {id: fmiData.unit.id },
        };
        const ingredient = new Ingredient(ingredientObj);
        await ingredient.save();
        return { msg: 'OK' };
      }
    },
    updateIngredient: {
      type: GraphQLString,
      args: { fmiData: { type: IngredientRequestInputType } },
      resolve: async (value, { fmiData }) => { 
        const ingredientObj: Ingredient = {
          title: fmiData.title,
          amount: fmiData.amount,
          unit: {id: fmiData.unit.id },
        };
        await Ingredient.update({ _id: fmiData.id }, { $set: ingredientObj }); 
        return 'OK'; 
      } 
    },
  };