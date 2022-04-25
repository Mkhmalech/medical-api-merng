import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const LabAppointement = graphqlHTTP({
    schema : Schema.labAppointementSchema,
    rootValue : Resolver.Appointement,
    graphiql : true
})