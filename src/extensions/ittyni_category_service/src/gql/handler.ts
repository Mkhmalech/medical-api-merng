import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const CategoryManger = graphqlHTTP({
    schema : Schema.CategorySchema,
    rootValue : Resolver.categoryResolver,
    graphiql : true
});