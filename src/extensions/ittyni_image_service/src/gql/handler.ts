import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const Image = graphqlHTTP({
    schema : Schema.ImageSchema,
    rootValue : Resolver.imageResolver,
    graphiql : true
});