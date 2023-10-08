import { IMAGE } from "../module/imagesModel";
export const read_image_by_origin_name= async (
    { name }: any,
    { user, permissions, message }: any
  )=>{
    const image = await IMAGE.findOne({ originName: name });

    return image
  }
export const write_image = async (
  { image }: any,
  { user, permissions, message }: any
) => {
  const isExist = await IMAGE.findOne({ originName: image.originName });
  if (!isExist) {
    const newImage = new IMAGE({
      ...image,
      status: "saved",
    });

    const res = await newImage.save();

    return res;
  } 
  else return Error("Error saving")
};
