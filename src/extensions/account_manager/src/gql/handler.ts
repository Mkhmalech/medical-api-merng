import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const AccountManger = graphqlHTTP({
    schema : Schema.AMSchema,
    rootValue : Resolver.AMResolver,
    graphiql : true
});