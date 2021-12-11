import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const Labo = graphqlHTTP({
    schema : Schema.LaboSchema,
    rootValue : Resolver.LaboResolver,
    graphiql : true
})