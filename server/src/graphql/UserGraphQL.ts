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
  import * as Auth from '../lib/Auth';
  
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
        password: { type: GraphQLString }
      },
      resolve: async function(root, { login, password }, source, fieldASTs) {
        const user = await User.findOne({'login' : login});
        if(user != null) 
          if(user.passwordMatch(password))
          {
            if(!!user.token){
              const token = Auth.generateRememberToken();
              user.token = token;
              await user.save();
            }
            return user;
          }
        return null;
      }
    },
    getUserByToken: {
      type: UserCompleteType,
      args: {
        token: { type: GraphQLString }
      },
      resolve: async function(root, { token }, source, fieldASTs) {
        const user = await User.findOne({'token' : token});
        if(user != null) 
            return user;
        return null;
      }
    }
  };
  
  