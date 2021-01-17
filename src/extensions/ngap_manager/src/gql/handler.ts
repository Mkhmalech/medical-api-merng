import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const NGAPManger = graphqlHTTP({
    schema : Schema.NgapSchema,
    rootValue : Resolver.ngapResolver,
    graphiql : true
});