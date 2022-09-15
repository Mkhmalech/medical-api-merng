import graphqlHTTP from "express-graphql";
import * as Schema from './schema'
import * as Resolver from './resolver'
import { ASTVisitor, FieldNode, getNamedType, GraphQLError, ValidationContext } from "graphql";

const CheckValidation = (context: ValidationContext) : ASTVisitor =>  {
    
    return {
        Field(node: FieldNode){
            const doc=context.getDocument().definitions;
            const schema=context.getSchema();
            const astOp = context.getArgument()

            console.log(doc)
            console.log(schema) 
            console.log(schema&&schema.getDirectives()) 
            console.log(astOp) 
        }
    }
} 

export const NABM = graphqlHTTP({
    schema : Schema.NabmSchema,
    rootValue : Resolver.NabmResolver,
    graphiql : true,
    validationRules: [CheckValidation]
})