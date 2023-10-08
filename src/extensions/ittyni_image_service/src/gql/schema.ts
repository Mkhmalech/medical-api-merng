import { buildSchema } from "graphql";
const image = `Image {
    _id: ID
    filename: String
    originName: String
    extension: String
    status: String
    isExist : Boolean
}`
export const ImageSchema = buildSchema(`
    type ${image}
    input _${image}
    type ImageQuery {
        read_image(_id: ID) : String
        read_image_by_origin_name(name: String) : Image
    }
    type ImageMutation {
        write_image(image: _Image) : Image
        write_multi_images(images: [_Image]) : String
        delete_image(_id: ID!) : String
        delete_multi_images(_id: ID!) : String
    }
    schema {
        query : ImageQuery
        mutation : ImageMutation
    }
`)