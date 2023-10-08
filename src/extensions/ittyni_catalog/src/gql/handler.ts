import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const CatalogManger = graphqlHTTP({
    schema : Schema.CatalogSchema,
    rootValue : Resolver.catalogResolver,
    graphiql : true
});