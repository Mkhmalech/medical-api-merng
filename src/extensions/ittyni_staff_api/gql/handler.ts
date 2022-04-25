import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const Staff = graphqlHTTP({
    schema : Schema.staffSchema,
    rootValue : Resolver.staffResolver,
    graphiql : true
})