import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const ProductManger = graphqlHTTP({
    schema : Schema.ProductSchema,
    rootValue : Resolver.productResolver,
    graphiql : true
});