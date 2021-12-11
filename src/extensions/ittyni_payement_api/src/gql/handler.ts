import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const AccountManger = graphqlHTTP({
    schema : Schema.NameSchema,
    rootValue : Resolver.nameResolver,
    graphiql : true
});