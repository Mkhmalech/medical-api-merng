import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const ParapharmacyManger = graphqlHTTP({
    schema : Schema.ParapharmacySchema,
    rootValue : Resolver.ParapharmacyResolver,
    graphiql : true
});