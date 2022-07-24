import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'

export const DepartmentManger = graphqlHTTP({
    schema : Schema.DepartmentSchema,
    rootValue : Resolver.DepartmentResolver,
    graphiql : true
});