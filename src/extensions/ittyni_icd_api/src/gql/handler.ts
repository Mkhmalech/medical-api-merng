import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const ICDManger = graphqlHTTP({
    schema : Schema.ICDSchema,
    rootValue : Resolver.ICDResolver,
    graphiql : true
});