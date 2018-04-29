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
  
  
  export const Query = {
    allIngredients: {
      type: new GraphQLList(IngredientsCompleteType),
      resolve: function() {
        return Ingredient.find();
      }
    }
  };
  
  
  export const KitchenMutation = {
    
  };