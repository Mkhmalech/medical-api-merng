import { buildSchema } from "graphql";
export const ImageSchema = buildSchema(`
    type ImageQuery {
        read_image : String
    }
    type ImageMutation {
        write_image : String
    }
    schema {
        query : ImageQuery
        mutation : ImageMutation
    }
`)