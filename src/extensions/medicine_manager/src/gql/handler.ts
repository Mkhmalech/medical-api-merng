import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const Medicine = graphqlHTTP({
    schema : Schema.MedicineSchema,
    rootValue : Resolver.MedicineResolver,
    graphiql : true
});