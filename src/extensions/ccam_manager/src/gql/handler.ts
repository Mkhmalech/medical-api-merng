import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const CCAMManger = graphqlHTTP({
    schema : Schema.CCAMSchema,
    rootValue : Resolver.ccamResolver,
    graphiql : true
});