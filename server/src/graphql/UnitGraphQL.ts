import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';
import { Unit } from '../db/models/Unit';

export const UnitCompleteType = new GraphQLObjectType({
  name: 'UnitType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
  }
});



export const Query = {
  allUnits: {
    type: new GraphQLList(UnitCompleteType),
    resolve: function () {
      return Unit.find();
    }
  },
  unit: {
    type: UnitCompleteType,
    args: {
      id: { type: GraphQLID }
    },
    resolve: async function(root, { id }) {
      return Unit.findOne({ '_id': id });
    }
  },
};


export const Mutation = {

};