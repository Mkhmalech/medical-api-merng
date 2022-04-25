import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const PharmaManger = graphqlHTTP({
    schema : Schema.PharmaSchema,
    rootValue : Resolver.pharmaResolver,
    graphiql : true
});