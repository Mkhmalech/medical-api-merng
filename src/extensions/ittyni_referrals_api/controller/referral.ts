import { CABINET } from "../../ittyni_cabinet_api/src/module/cabinets";
import { CATALOG } from "../../ittyni_catalog/src/module/catalog";
import { LABO } from "../../ittyni_labm_api/module/labo";
import { TESTS } from "../../ittyni_nabm_api/module/labtests";
import mongoose from "mongoose";

export const searchTests = async ({ query }: any, { user }: any) => {
  let q = query;
  q = new RegExp(q, "ig");
  const res = await TESTS.find({
    $or: [{ "name.fr": q }, { "reference.Mnemonic": q }],
  }).select("_id name.fr finance reference");
  if (res) {
    const resCat = await LABO.find({ "catalogs.addressedTo": "SubContractors" })
      .select("id catalogs account.name contact")
      .then((cat: any) => {
        return cat.map((ct: any) => {
          let price: any;
          return res.map((t: any) => {
            const i = ct.catalogs[0].list.findIndex(
              (c: any) => c.testId == t._id.toString()
            );
            if (i >= 0) {
              price = ct.catalogs[0].list[i].testPrice;
            } else {
              const bcode: any = t.finance[0] && t.finance[0].Bcode;
              price = Math.floor(ct.catalogs[0].bFactor * bcode);
            }
            return {
              CatalogId: ct.catalogs[0]._id,
              LaboName: ct.account.name,
              LaboId: ct._id,
              price: price,
              TestName: t.name.fr,
              TestId: t._id,
              bcode: t.finance[0].Bcode,
              Labcontact: ct.contact,
            };
          });
        });
      });
    return [].concat(...resCat);
  } else {
    return new Error("no_test_founded");
  }
};
export const searchContributorTests = async ({ query }: any, { user }: any) => {
  let q = query;
  q = new RegExp(q, "ig");
  // find test info
  const res = await TESTS.find({
    $or: [{ "name.fr": q }, { "reference.Mnemonic": q }],
  }).select("id name.fr finance reference");
  if (res) {
    // find labo contributor
    const resCat = await LABO.findOne({ "account.name": "FES" })
      .select("catalogs account.name contact")
      .then((doc: any) => {
        const catalog = doc.catalogs.find(
          (ct: any) => ct.addressedCabinetId == user.accountId.toString()
        );
        // check if test exist in list
        let price: any;
        return res.map((t: any) => {
          const i = catalog.list.findIndex(
            (c: any) => c.testId == t._id.toString()
          );
          if (i >= 0) {
            price = catalog.list[i].testPrice;
          } else {
            const bcode: any = t.finance[0] && t.finance[0].Bcode;
            price = Math.floor(catalog.bFactor * bcode);
          }
          return {
            CatalogId: catalog._id,
            LaboName: "FES",
            LaboId: doc._id,
            price: price,
            TestName: t.name.fr,
            TestId: t._id,
            bcode: t.finance[0].Bcode,
            Labcontact: doc.contact,
          };
        });
      });
    return resCat;
  } else {
    return new Error("no_test_founded");
  }
};

export const read_referral_test = async (
  { query }: any,
  { user, account }: any
) => {
  // find query list
  let q = new RegExp(query, "ig");
  const res = await TESTS.find({
    $or: [{ "name.fr": q }, { "reference.Mnemonic": q }],
  }).select("_id name.fr finance reference");
  if (res) {
    let foundedTests = res.map((t: any) => t._id);

    const resCat = await CATALOG.aggregate([
      {
        $match: {
          $and: [
            { "tests.default": { $in: foundedTests } },
            { space: { $ne: mongoose.Types.ObjectId(account._id) } },
          ],
        },
      },
    ])
      .unwind("tests")
      .match({ "tests.default": { $in: foundedTests } })
      .lookup({
        from: "tests",
        localField: "tests.default",
        foreignField: "_id",
        as: "tests.default",
      })
      .lookup({
        from: "spaces",
        localField: "space",
        foreignField: "_id",
        as: "space",
      })
      .addFields({ "tests.default": { $arrayElemAt: ["$tests.default", 0] } })
      .addFields({ space: { $arrayElemAt: ["$space", 0] } })
      .project({
        "test._id": "$tests.default._id",
        "test.name": "$tests.default.name.fr",
        mnemonic: "$tests.default.reference.Mnemonic",
        ppv: { $arrayElemAt: ["$tests.default.finance", 0] },
        refPrice: "$tests.finance.price",
        "space._id": "$space._id",
        "space.name": "$space.account.name",
        "catalog.title": "$title",
        "catalog._id": "$_id",
      });

    return resCat;
  } else {
    return Error("NO_TEST_FOUNDED");
  }

  // search in catalog for tests founded
};
