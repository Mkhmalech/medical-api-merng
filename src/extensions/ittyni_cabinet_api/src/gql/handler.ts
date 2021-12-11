import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'



export const Cabinet = graphqlHTTP({
    schema : Schema.CabinetSchema,
    rootValue : Resolver.cabinetResolver,
    graphiql : true
});