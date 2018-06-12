import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat
} from "graphql";
import { IngredientType } from "../db/models/IngredientType";
import { KitchenStock } from "../db/models/KitchenStock";
import { ObjectId } from "bson";

const KitchenStockRequestInputType = new GraphQLInputObjectType({
  name: "KitchenStockRequestInputType",
  fields: {
    kitchen: { type: new GraphQLNonNull(GraphQLID) },
    ingredientType: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
  }
});

export const Query = {};

export const Mutation = {
  updateKitchenStock: {
    type: GraphQLString,
    args: { fmiData: { type: KitchenStockRequestInputType } },
    resolve: async (value, { fmiData }) => {
      await IngredientType.update({ _id: fmiData.id }, { $set: fmiData });
      return "OK";
    }
  }
};
