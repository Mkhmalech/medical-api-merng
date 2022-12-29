import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const AreaManger = graphqlHTTP({
    schema : Schema.AreaSchema,
    rootValue : Resolver.areaResolver,
    graphiql : true
});