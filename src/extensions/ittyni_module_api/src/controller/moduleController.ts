import { Db } from "../../../../gateway/db";
import { COMPONENTS } from "../module/component";

export const create = async ({ extension }: any, { user }: any) => {
  const component = new Db(COMPONENTS);

  const res: any = await component.checkExisting({ name: extension.name, space: extension.space });

  if (!res)
    return component.createNewDoc({
      ...extension,
      createdAt: new Date().toUTCString(),
      createdBy: user._id,
      status: "active",
    });

  if (res) return res;
};

export const remove = ({ _id }: any, { user }: any) => {
  const component = new Db(COMPONENTS);

  return component.removeDocById(_id);
};
export const update = (args: any, { user }: any) => {};
export const getOneById = (args: any, { user }: any) => {};
export const getAll = (args: any, { user }: any) => {
  const component = new Db(COMPONENTS);

  return component.getAllDocs();
};
export const readActiveExtensionsBySpace = async (
  args: any,
  { user, permission, message }: any
) => {
  return COMPONENTS.find({
    $and: [{ status: "active" }, { space: args.space }],
  });
};
export const readActiveComponents = (
  args: any,
  { user, permissions, message }: any
) => {
  // if (message) return Error(message);

  return COMPONENTS.find({ status: "active" });
};
