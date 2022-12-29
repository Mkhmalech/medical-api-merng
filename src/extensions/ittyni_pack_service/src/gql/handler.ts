import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const PackManger = graphqlHTTP({
    schema : Schema.PackSchema,
    rootValue : Resolver.packResolver,
    graphiql : true
});