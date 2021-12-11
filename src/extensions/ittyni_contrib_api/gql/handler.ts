import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const LabContributions = graphqlHTTP({
    schema : Schema.labReferralSchema,
    rootValue : Resolver.Contribution,
    graphiql : true
})