import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const QueuingManger = graphqlHTTP({
    schema : Schema.QueuingSchema,
    rootValue : Resolver.QueuingResolver,
    graphiql : true
});