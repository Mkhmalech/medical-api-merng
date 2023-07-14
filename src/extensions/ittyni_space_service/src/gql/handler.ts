import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const SpaceManger = graphqlHTTP({
    schema : Schema.SpaceSchema,
    rootValue : Resolver.AMResolver,
    graphiql : true
});