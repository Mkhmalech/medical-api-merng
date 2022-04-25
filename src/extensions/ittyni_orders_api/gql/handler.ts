import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const LabOrders = graphqlHTTP({
    schema : Schema.labOrdersSchema,
    rootValue : Resolver.OrdersResolver,
    graphiql : true
})