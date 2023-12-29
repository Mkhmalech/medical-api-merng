import { TESTS } from "../module/labtests";
import { Db } from "../../../gateway/db";
import { SPACE } from "../../ittyni_space_service/src/module/space";
import account from "../../ittyni_user_api/src/controllers/account";
const fs = require("fs");
export class LabTests {
  // fetching data of test
  LabTestFrenchById = async ({ id }: any) => {
    const test = await TESTS.findOne({ _id: id }).populate("departements");
    if (!test) throw new Error("no test found");

    return {
      _id: test._id,
      name: {
        en: test.name.en,
        fr: test.name.fr,
      },
      reference: { ...test.reference },
      finance: test.finance,
      specimen: { ...test.specimen },
      description: test.description,
      departements: test.departements,
      parameter: test.parameter,
      group: test.group,
      updates: test.updates,
    };
  };
  read_tests_multiple_ids = async ({ _ids }: any) => {
    const tests: any = await TESTS.find({ _id: { $in: _ids } });
    if (!tests) throw new Error("no test found");
    return tests ? tests : Error("NO_TESTS_FOUNDED");
  };
  read_test_by_id = async ({_id}: any, {user, message, permissions}: any)=>{
    const test: any = await TESTS.findById(_id)
    return test? test: Error("NO_TEST_FOUNDED");
  }
  read_test_by_query = async ({query}: any, {user}: any)=>{
    const q = new RegExp(query, 'ig');
    const tests: any = await TESTS.find({$or: [{"name.fr": q}, {"reference.Mnemonic": q}]});

    return tests
  }
  nameEnFilter = async ({ en }: any) => {
    let q = en;
    q = new RegExp(q, "ig");

    const res = await TESTS.find({
      $or: [{ "name.en": q }, { "reference.Mnemonic": q }],
    });

    let result: any[] = [];

    res.map((test) => result.push(test));

    return [...result];
  };
  fetchTestsByFirstLetter = async ({ letter }: any) => {
    let q = letter;
    q = new RegExp("^" + q, "ig");

    const res = await TESTS.find({ "name.en": { $regex: q } });

    let result: any[] = [];

    res.map((test) => result.push(test));

    return [...result];
  };
  createTestsSiteMap = async () => {
    let sitmap: string = "";

    const res = await TESTS.find({ "name.fr": { $exists: true } }).then(
      (n: any) => {
        if (n) {
          n.map((m: any) => {
            sitmap += `<url><loc>https://ittyni.com/actes-tarifs/nomenclature-actes-biologie-médicale/${
              m.reference.Mnemonic
            }</loc><lastmod>${new Date().toISOString()}</lastmod><priority>0.80</priority></url>`;
          });
        }
      }
    );

    // console.log(sitmap)

    fs.writeFileSync(`./testSitemap.xml`, sitmap, (err: any, doc: any) => {
      if (err) throw err;
      console.log(doc);
    });
  };
  listAllTests = () =>
    TESTS.find().then((tests: any[]) => {
      return tests.map((test: any) => {
        return {
          ...test._doc,
          _id: test._doc._id.toString(),
        };
      });
    });
  listAllTestsFr = () =>
    TESTS.find({ "name.fr": { $exists: true } }).then((tests: any[]) => {
      return tests.map((test: any) => {
        return {
          ...test._doc,
          id: test._doc._id.toString(),
        };
      });
    });
  /**
   * fetch twenty labtests
   */
  fetchTwentyLabTests_fr = () =>
    TESTS.find({ "name.fr": { $exists: true } }).then((tests: any[]) => {
      let newTests = [...tests];
      newTests = newTests
        .slice(0, 20)
        .map(
          () =>
            newTests.splice(Math.floor(Math.random() * newTests.length), 1)[0]
        );
      return newTests.map((test: any) => {
        return {
          ...test._doc,
          id: test._doc._id.toString(),
        };
      });
    });
  LabTestsFrFilterByNameAndMnemonic = async ({ query }: any) => {
    let q = query;
    q = new RegExp(q, "ig");

    const res = await TESTS.find({
      $or: [{ "name.fr": q }, { "reference.Mnemonic": q }],
    });

    let result: any[] = [];

    res.map((test) => result.push(test));

    return [...result];
  };
  LabTestsEnFilterByName = (name: String) => {
    return {};
  };
  LabTestView = async ({ name }: any) => {
    const test: any = await TESTS.findOne({ "name.en": name.en });
    if (!test) throw new Error("no test found");

    return {
      id: test._id.toString(),
      name: {
        en: test.name.en,
        fr: test.name.fr,
      },
      reference: { ...test.reference },
      finance: [
        {
          Bcode: test.finance[0] ? test.finance[0].Bcode : null,
          country: test.finance[0] ? test.finance[0].country : null,
        },
      ],
      specimen: { ...test.specimen },
    };
  };
  LabTestFrView = async ({ name }: any) => {
    const test: any = await TESTS.findOne({ "name.fr": name });
    if (!test) throw new Error("no test found");

    return {
      id: test._id.toString(),
      name: {
        en: test.name.en,
        fr: test.name.fr,
      },
      reference: { ...test.reference },
      finance: [
        {
          Bcode: test.finance[0] ? test.finance[0].Bcode : null,
          country: test.finance[0] ? test.finance[0].country : null,
        },
      ],
      specimen: { ...test.specimen },
    };
  };
  /**
   * fetch test by abbr
   * @param param0
   */
  LabTestFrViewByAbbr = async ({ abbr }: any) => {
    const test = await TESTS.findOneAndUpdate(
      { "reference.Mnemonic": abbr },
      { $inc: { views: 1 } }
    );
    if (!test) throw new Error("no test found");
    return {
      id: test._id.toString(),
      name: {
        en: test.name.en,
        fr: test.name.fr,
      },
      reference: { ...test.reference },
      finance: test.finance,
      specimen: { ...test.specimen },
    };
  };
  // =====>>>>>> end of fetching test data
  // add new test
  addNewTest = async ({ en, fr, Mnemonic, CPT }: any, { user }: any) => {
    return new Db(TESTS).createNewDoc({
      name: { fr: fr, en: en },
      reference: { Mnemonic: Mnemonic, CPT: CPT },
    });
  };
  // update test data
  namesUpdate = async ({ names, testId }: any, { user }: any) => {
    let updatingMsg: any = await TESTS.findById(testId)
      .then(async (test) => {
        if (!test) return new Error("test_not_founded");

        if (user.role === "supadmin") {
          if (names.fr) test.name.fr = names.fr;
          if (names.en) test.name.en = names.en;

          test.save((err: any) => {
            if (err) throw new Error(err);
            else return "Names_updates_successfully_by_admin";
          });
        } else {
          let update = {
            updatedBy: user.id,
            name: {
              en: names.en,
              fr: names.fr,
            },
            updatedAt: new Date(),
          };

          test.updates.push(update);

          test.save((err: any) => {
            if (err) throw new Error(err);
            else return "names_fr_updated_successfully";
          });
        }
      })
      .catch((e) => {
        throw new Error(e);
      });

    if (!updatingMsg) return true;
  };
  classificationUpdate = async (args: any, { user }: any) => {
    // let classification: any = this.filterData(args,'_id');
    const r = await new Db(TESTS).setSubDocWithoutFilter(
      { _id: args._id },
      {
        departements:
          this.filterData(args, "_id").departements && args.departements,
        components: this.filterData(args, "_id").components && args.components,
        [args.type]: true,
      }
    );
    return r
      ? "CLASSIFICATION_UPDATED_SUCCESSFULLY"
      : Error("CLASSIFICATION_NOT_UPDATED");
  };
  referenceUpdate = async ({ _id, reference }: any, { user }: any) => {
    const test = await TESTS.findById(_id);
    if (!test) return new Error("test_not_founded");
    let newRef = this.filterData(reference);
    if (user.role.name === "supadmin") {
      test.reference.CPT = newRef.CPT;
      test.reference.Mnemonic = newRef.Mnemonic;

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "reference_updates_successfully_by_admin";
      });
    } else {
      let update = {
        updatedBy: user,
        reference: {
          code: newRef.code,
          CPT: newRef.CPT,
          Mnemonic: newRef.Mnemonic,
        },
        updatedAt: new Date(),
        user: user._id,
      };

      test.updates.push(update);

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "reference_fr_updated_successfully";
      });
    }
  };
  updateDescription = async (args: any, { user }: any) => {
    const test = new Db(TESTS);
    if (user.role.name === "supadmin") {
      test.setSubDocWithoutFilter(
        { _id: args._id },
        Object.keys(test.filterData(args)).reduce(
          (d, v) => ({ ...d, ["description." + v]: args[v] }),
          {}
        )
      );
    } else {
      test.setSubDocWithoutFilter(
        { _id: args._id },
        {
          updates: {
            description: test.filterData(args),
            updatedAt: new Date().toUTCString(),
            updatedBy: user._id,
          },
        }
      );
    }
    return "account_updated_successfully";
  };
  addNewfinance = async (args: any, { user }: any) => {
    const res = await TESTS.find(
      { _id: args._id, "finance.country": new RegExp(args.country, "i") },
      { "finance.$": 1, _id: 0 }
    );
    if (res.length > 0) {
      return Error("TARIF_ALREADY_EXIST");
    } else {
      if (user.role.name === "supadmin") {
        const r = await new Db(TESTS).setSubDocsPushWithoutFilter(
          { _id: args._id },
          {
            finance: this.filterData(args, "_id"),
          }
        );
        if (r) return "SAVED_SUCCESSFULLY";
        else return Error("TARIF_NOT_SAVED");
      } else {
        const r = await new Db(TESTS).setSubDocsPushWithoutFilter(
          { _id: args._id },
          {
            updates: {
              finance: this.filterData(args, "_id"),
            },
          }
        );
        if (r) return "SAVED_SUCCESSFULLY";
        else return Error("TARIF_NOT_SAVED");
      }
    }
  };
  financeUpdate = async (args: any, { user }: any) => {
    if (user.role.name === "supadmin") {
      const res = await new Db(TESTS).setSubDocs(
        { "finance._id": args._id },
        {
          arrayFilters: [{ "i._id": args._id }],
        },
        Object.keys(this.filterData(args, "_id")).reduce(
          (d, v) => ({ ...d, ["finance.$[i]." + v]: args[v] }),
          {}
        )
      );
      if (res) return "SAVED_SUCCESSFULLY";
      else return Error("TARIF_NOT_SAVED");
    } else {
      const r = await new Db(TESTS).setSubDocsPushWithoutFilter(
        { "finance._id": args._id },
        {
          updates: {
            finance: this.filterData(args, "_id"),
          },
        }
      );
      if (r) return "SAVED_SUCCESSFULLY";
      else return Error("TARIF_NOT_SAVED");
    }
  };
  specimenUpdate = async ({ id, volume }: any, { user }: any) => {
    const test = await TESTS.findById(id);
    if (!test) return false;

    if (user.role === "m.khmalech@gmail.com") {
    } else {
    }
  };
  /**
   *
   * @param param0
   * @param param1
   * @returns
   */
  updateSpecimen = async (args: any, { user }: any) => {
    if (user && user.role && user.role.name === "supadmin") {
      const r = await new Db(TESTS).setSubDocWithoutFilter(
        { _id: args._id },
        {
          specimen: this.filterData(args, "_id"),
        }
      );
      if (r) return "SAVED_SUCCESSFULLY";
      else return Error("TARIF_NOT_SAVED");
    } else {
      const r = await new Db(TESTS).setSubDocsPushWithoutFilter(
        { _id: args._id },
        {
          updates: {
            finance: this.filterData(args, "_id"),
          },
        }
      );
      if (r) return "SAVED_SUCCESSFULLY";
      else return Error("TARIF_NOT_SAVED");
    }
  };
  updateAll = async (
    { names, reference, finance, preAnalytics }: any,
    { user }: any
  ) => {
    let specimen = {
      nature: preAnalytics.sampleType,
      tubecolor: preAnalytics.sampleCollectorColor,
      numberoftube: preAnalytics.SampleCollectorQuantity,
      volumemin: preAnalytics.sampleVolumeMin,
    };
    let Reference = {
      CPT: reference.CPT,
      Mnemonic: reference.Mnemonic,
    };
    let Names = {
      en: names.en,
      fr: names.fr,
    };
    Reference = this.filterData(Reference);
    specimen = this.filterData(specimen);
    Names = this.filterData(Names);

    const test: any = await TESTS.findOne({ "name.en": names.en });
    if (!test) return false;

    if (user && user.role && user.role.name === "supadmin") {
      const isExist = test.finance.findIndex(
        (o: any) => o.country === finance.country
      );
      if (test.finance[isExist]) {
        test.finance[isExist].Bcode = finance.Bcode;
      } else {
        test.finance.push(finance);
      }
      test.name.fr = Names.fr && Names.fr;
      test.reference = Reference;
      test.specimen = specimen;
    }

    // if (role === "m.khmalech@gmail.com") {
    //   test.reference.CPT = reference.CPT;
    //   test.reference.Mnemonic = reference.Mnemonic;

    //   const isExist = test.finance.findIndex(o => o.country === "Morocco");

    //   if (test.finance[isExist]) {
    //     test.finance[isExist].Bcode = finance.Bcode;
    //   } else {
    //     test.finance.push(finance);
    //   }

    //   test.name.fr = names.fr;

    //   test.specimen = {
    //       nature : preAnalytics.sampleType,
    //       tubecolor : preAnalytics.sampleCollectorColor,
    //       numberoftube : preAnalytics.SampleCollectorQuantity,
    //       volumemin : preAnalytics.sampleVolumeMin
    //   }
    //   console.log(test);
    //   test.save(err => {
    //     if (err) throw new Error(err);
    //     else return "Name fr updates Successfully by Admin";
    //   });
    else {
      let update = {
        updatedBy: user._id,
        name: {
          en: names.en,
          fr: names.fr,
        },
        reference: {
          code: reference.code,
          CPT: reference.CPT,
          Mnemonic: reference.Mnemonic,
        },
        finance: [
          {
            country: finance.country,
            Bcode: finance.Bcode,
          },
        ],
        specimen: {
          nature: preAnalytics.sampleType,
          tubecolor: preAnalytics.sampleCollectorColor,
          numberoftube: preAnalytics.SampleCollectorQuantity,
          volumemin: preAnalytics.sampleVolumeMin,
        },
        updatedAt: new Date(),
      };

      test.updates.push(update);
    }
    // save data
    const saved: any = await test.save((err: any) => {
      if (err) throw new Error(err);
      else return "test updated Successfully";
    });
    if (saved) return new Error("not_saved");
    else return saved;
  };
  // ===========> en of update test

  // fetching update data
  fetchUpdates = async (args: any, { user }: any) => {
    const res =
      user.role === "supadmin"
        ? await TESTS.find({ "updates.0": { $exists: true } }).populate(
            "updates.updatedBy"
          )
        : await TESTS.find({ "updates.updatedBy": user._id });
    if (res) return res;
    else return Error("no_update_founded");
  };
  filterData = (data: any, keyTodelete?: string) => {
    let newData = data;
    for (const property in newData) {
      if (
        newData[property] == "" ||
        newData[property] == "null" ||
        newData[property] == null ||
        newData[property] == "undefined" ||
        typeof newData[property] == "undefined"
      ) {
        delete newData[property];
      }
    }
    keyTodelete && delete newData[keyTodelete];
    return newData;
  };
  fetchUpdateById = async ({ id }: any) => {
    const res: any = await TESTS.findOne({ "updates._id": id }).select(
      "updates name _id"
    );

    if (res) {
      const i = res.updates.findIndex((u: any) => u._id == id);

      let update = res.updates[i];

      update.testId = res._id;

      return update;
    } else Error("no_update_founded");
  };
  // ========>>>>> end of fitching an update data

  // modify an update
  modifyUpdate = async ({
    id,
    names,
    reference,
    finance,
    preAnalytics,
  }: any) => {
    let update = {
      "updates.$[i].specimen.nature": preAnalytics.sampleType,
      "updates.$[i].specimen.tubecolor": preAnalytics.sampleCollectorColor,
      "updates.$[i].specimen.numberoftube":
        preAnalytics.SampleCollectorQuantity,
      "updates.$[i].specimen.volumemin": preAnalytics.sampleVolumeMin,
      "updates.$[i].reference.CPT": reference.CPT,
      "updates.$[i].reference.Mnemonic": reference.Mnemonic,
    };
    let newUpdate = this.filterData(update);

    let options = {
      arrayFilters: [
        {
          "i._id": id,
        },
      ],
    };

    const res: any = await TESTS.findOneAndUpdate(
      { _id: "58bb5b7e69b23c2bab47bb17" },
      { $set: newUpdate },
      options
    );

    // this.modifyUpdateFinance("6102cca391d4ef4d28a6fdde", 200);

    if (res) return "updated_successfully";
    else Error("update_not_saved");
  };
  modifyUpdateNames = async ({ testId, updateId, name }: any) => {
    let update = { "updates.$[i].name.fr": name.fr };

    update = this.filterData(update);

    let options = {
      arrayFilters: [
        {
          "i._id": updateId,
        },
      ],
    };

    const res = await TESTS.findOneAndUpdate({ _id: testId }, update, options);

    if (res) return "updated_successfully";
    else return Error("not_updated");
  };
  modifyUpdateReference = async ({ testId, updateId, reference }: any) => {
    let update = {
      "updates.$[i].reference.CPT": reference.CPT,
      "updates.$[i].reference.Mnemonic": reference.Mnemonic,
    };

    update = this.filterData(update);

    let options = {
      arrayFilters: [
        {
          "i._id": updateId,
        },
      ],
    };

    const res = await TESTS.findOneAndUpdate({ _id: testId }, update, options);

    if (res) return "updated_successfully";
    else return Error("not_updated");
  };
  modifyUpdateSpecimen = async ({ testId, updateId, specimen }: any) => {
    let update = {
      "updates.$[i].specimen.nature": specimen.sampleType,
      "updates.$[i].specimen.tubecolor": specimen.sampleCollectorColor,
      "updates.$[i].specimen.anticoagulant": specimen.SampleAnticoagulant,
      "updates.$[i].specimen.numberoftube": specimen.SampleCollectorQuantity,
      "updates.$[i].specimen.volumemin": specimen.sampleVolumeMin,
    };

    update = this.filterData(update);

    let options = {
      arrayFilters: [
        {
          "i._id": updateId,
        },
      ],
    };

    const res = await TESTS.findOneAndUpdate({ _id: testId }, update, options);

    if (res) return "updated_successfully";
    else return Error("not_updated");
  };
  modifyUpdateFinance = async ({ testId, updateId, finance }: any) => {
    const res = await TESTS.findOneAndUpdate(
      { _id: testId },
      {
        $set: { "updates.$[i].finance.$[j].Bcode": finance.Bcode },
      },
      {
        arrayFilters: [
          {
            "i._id": updateId,
          },
          {
            "j._id": finance._id,
          },
        ],
      }
    );
    return res ? "updated_successfully" : Error("not_updated");
  };

  read_testsOnScroll = async (
    { limit, skip }: any,
    { permissions, message, user }: any
  ) => {
    const result = await TESTS.find({ space: { $exists: false } })
      .populate("departements updates.updatedBy")
      .sort({ name: 1 })
      .limit(limit + skip)
      .skip(skip);
    const totalDocs = await TESTS.countDocuments({});
    return {
      procedures: result,
      total: totalDocs,
      rest: totalDocs - limit,
      showed: limit + skip,
    };
  };
  read_labmTestsOnScroll = async (
    { limit, skip }: any,
    { permissions, message, user, account }: any
  ) => {
    const result = await TESTS.find({ space: account._id })
      .populate("departements updates.updatedBy")
      .sort({ name: 1 })
      .limit(limit + skip)
      .skip(skip);
    const totalDocs = await TESTS.countDocuments({});
    return {
      procedures: result,
      total: totalDocs,
      rest: totalDocs - limit,
      showed: limit + skip,
    };
  };

  write_labm_test = async (
    args: any,
    { permissions, message, user, account }: any
  ) => {
    const res = await TESTS.findOne({ "name.fr": args.name.fr });
    if (res) return Error("ALREADY_EXISTS");
    else {
      let newTest = new TESTS({
        name: args.name,
        reference: args.reference,
        delivery: args.delivery,
        transport: args.transport,
        specimen: args.specimen,
        space: account._id,
        isDefault: false
      });

      const testSaved = await newTest.save();

      return testSaved ? "SAVED_SUCCESSFULLY" : Error("LABM_NOT_SAVED");
    }
  };

  write_new_test = async (
    args: any,
    { permission, message, user, account }: any
  ) => {
    const res = await TESTS.findOne({
      $or: [
        { "name.fr": args.name.fr },
        { "reference.Mnemonic": args.reference.Mnemonic },
      ],
    });
    if (res) return Error("ALREADY_EXISTS");
    else {
      let newTest = new TESTS({
        name: args.name,
        reference: args.reference,
        delivery: args.delivery,
        transport: args.transport,
        specimen: args.specimen,
        finance: args.finance,
        user: user._id,
        isDefault : true
      });

      const testSaved = await newTest.save();

      return testSaved ? "SAVED_SUCCESSFULLY" : Error("NEW_TEST_NOT_SAVED");
    }
  };
  read_labm_tests = async (
    args: any,
    { permissions, message, user, account }: any
  ) => {
    return TESTS.find({ space: account._id });
  };
  // ====>>>>>> end of modify update
}
