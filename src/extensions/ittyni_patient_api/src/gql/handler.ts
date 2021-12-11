import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const Patient = graphqlHTTP({
    schema : Schema.PatientSchema,
    rootValue : Resolver.PatientResolver,
    graphiql : true
});