import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const ComponentManger = graphqlHTTP({
    schema : Schema.ComponentSchema,
    rootValue : Resolver.componentResolver,
    graphiql : true
});