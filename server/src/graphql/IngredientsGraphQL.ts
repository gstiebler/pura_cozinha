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
      title: { type: new GraphQLNonNull(GraphQLString) },
      amount: { type: GraphQLFloat },
      unit: { type: UnitInputType }
    }
  });
  
  export const Query = {
    allIngredients: {
      type: new GraphQLList(IngredientsCompleteType),
      resolve: function() {
        return Ingredient.find();
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
          unit: {id: new ObjectId(fmiData.unit.id) },
        };
        const ingredient = new Ingredient(ingredientObj);
        ingredient.save();
        return { msg: 'OK' };
      }
    },
  };