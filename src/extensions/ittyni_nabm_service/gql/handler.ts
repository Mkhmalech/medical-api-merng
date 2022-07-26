import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const NABM = graphqlHTTP({
    schema : Schema.NabmSchema,
    rootValue : Resolver.NabmResolver,
    graphiql : true
})