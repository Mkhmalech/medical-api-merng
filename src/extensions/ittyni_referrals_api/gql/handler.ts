import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const LabReferrals = graphqlHTTP({
    schema : Schema.labReferralSchema,
    rootValue : Resolver.Referral,
    graphiql : true
})