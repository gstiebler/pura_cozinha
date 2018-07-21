import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
  } from 'graphql';
  import * as logger from 'winston';
  
  import { GeneralConfig } from '../db/models/GeneralConfig';
  import * as Auth from '../lib/Auth';
  
  const GeneralConfigCompleteType = new GraphQLObjectType({
    name: 'GeneralConfigCompleteType',
    fields: {
      key: { type: GraphQLString },
      value: { type: GraphQLString },
    }
  });
  
  export const Query = {
    getByKey: {
      type: GraphQLFloat,
      args: {
        key: { type: GraphQLString }
      },
      resolve: async function(root, { key }, source, fieldASTs) {
        const generalConfig = await GeneralConfig.findOne({'key' : key});
        const value = parseFloat(generalConfig.value);
        return value;
      }
    }
  };
  
  