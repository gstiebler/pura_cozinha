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
  
  import { User, IUserModel } from '../db/models/User';
  import { getProjection } from '../lib/Util';
  
  const UserCompleteType = new GraphQLObjectType({
    name: 'UserCompleteType',
    fields: {
      _id: { type: GraphQLID },
      login: { type: GraphQLString },
      name: { type: GraphQLString },
      password: { type: GraphQLString },
      role: { type: GraphQLString },
      token: { type: GraphQLString },
    }
  });
  
  export const Query = {
    getUser: {
      type: UserCompleteType,
      args: {
        login: { type: GraphQLString },
        password: { type: GraphQLString },
        token: { type: GraphQLString }
      },
      resolve: async function(root, { login, password, token }, source, fieldASTs) {
        const user = await User.findOne({'login' : login});
        if(user != null) 
          if(user.passwordMatch(password))
          {
            if(user.token ==  undefined || user.token == null){
              user.token = token;
              await user.save();
            }
            return user;
          }
        return null;
      }
    }
  };
  
  