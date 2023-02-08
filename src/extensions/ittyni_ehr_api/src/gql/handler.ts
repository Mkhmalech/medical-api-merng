import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const EHRHandler = graphqlHTTP({
    schema : Schema.EHRSchema,
    rootValue : Resolver.EHRResolver,
    graphiql : true
});