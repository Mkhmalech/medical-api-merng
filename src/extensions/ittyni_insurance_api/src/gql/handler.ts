import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const ParamedicalManger = graphqlHTTP({
    schema : Schema.paramedicalSchema,
    rootValue : Resolver.paramedicalResolver,
    graphiql : true
});