import { LABO } from "../module/labo";
import { Db } from "../../../gateway/db";

import labdata from './laboData.json'

import jwt from "jsonwebtoken";

export class Labo {
  protected Labo = new Db(LABO);

  // private LaboName ? : LabLaboAccountName;

  constructor() {
    // this.Labo.getAllFields();
    // this.insertManyLabosIntoDb(Laboss);
  }
  // update labo address 
  fetchLaboById = async ({ id }: any) => {
    const res: any = await LABO.findByIdAndUpdate(id, { $inc: { 'views': 1 } }).select('account contact views');
    if (!res) return "no_result_founded";
    else return res;
  }
  // update labo address 
  LaboUpdateAddress = ({ city }: any) => {
    LABO.find((e, r) => {
      if (r) {
        for (let index = 0; index < r.length; index++) {
          r[index].contact.address.city = city;
          r[index].save();
        }
      }
    })
  }
  // delete repeated account
  LaboDeleteRepeatedAccount = () => {
    LABO.find({ "contact.address.city": "meknes" }).remove().exec(e => console.log(e));
  }
  // update labo address 
  LaboAddNewLabos = () => {
    labdata.map((lab: any) => {
      let newLab = new LABO({
        'account.name': lab.etablissement,
        'contact.address.street': lab.street,
        'contact.address.city': lab.city.toLowerCase()
      });
      newLab.contact.tele.fix.push(lab.tele)
      newLab.save();
    })

    return "updated_succeffully"
  }
  // Labo Info
  LaboListAll = () => {
    const labos: any = this.Labo.getAllDocs();
    return labos;
  };
  // Labo Info
  LaboListTwentyByCity = async ({ city }: any) => {
    const labos: any = await LABO.find({ 'contact.address.city': city })
      .select('account contact views')
      .then((labs: any) => {
        let newLabs = [...labs]
        newLabs = newLabs.slice(0, 20).map(() =>
          newLabs.splice(Math.floor(Math.random() * newLabs.length), 1)[0]
        )
        return newLabs;
      });
    return (labos);
  };
  // Labo Info
  LaboListByCity = async ({ city }: any) => {
    const labos: any = await LABO.find({ 'contact.address.city': city }).select('account contact views');
    return (labos);
  };

  // labo details
  getLaboByName = ({ name }: any) => {
    const labo = this.Labo.getOneByQuery({ "account.name": new RegExp(name, 'ig') });
    return labo;
  };
  // search labo by name
  searchLaboByName = async ({ query }: any) => {
    let q = query;
    q = new RegExp(q, "ig");

    const res = await LABO.find({ "account.name": q });

    return res;
  };
  // Labo Catalog
  catalogTests = ({ catalogUpdate }: any) => {
    // 2 - very token of current user
    const userUpdateCatalog = jwt.verify(
      catalogUpdate.token,
      "mysuperTokenlogin"
    );
    // update or save all catalog test

    /* schema of entries **
          catalog : {
            list : [
              {
                "5dc3f2e86e6e3e21d027bed1" : [
                  { date , userID , price}
                ]
              }
            ]
          }
        */
    // });
    for (let i = 0; i < catalogUpdate.catalogList.length; i++) {
      this.selectLabo(catalogUpdate.laboName, async (labo: any) => {
        // console.log(labo.catalog.list[0])

        // if (userUpdateCatalog) {
        const { userId }: any = userUpdateCatalog;

        //   // 1- check if test is exist ? update : create new one

        const testIndex = labo.catalog.list.findIndex(
          (e: any) => e.testID === catalogUpdate.catalogList[i].testId
        );
        // console.log(catalogUpdate.catalogList[i].testId)
        if (testIndex <= 0) {
          // 4 - save and handle Errors
          // console.log(testIndex)
          labo.catalog.list.push({
            testID: catalogUpdate.catalogList[i].testId,
            update: [
              {
                userID: userId,
                testReported: catalogUpdate.catalogList[i].testReported,
                testPrice: catalogUpdate.catalogList[i].testPrice,
                testReferred:
                  catalogUpdate.catalogList[i].testReferred === "oui"
                    ? true
                    : false,
                date: new Date(),
              },
            ],
          });

          labo.save((e: any) => {
            if (e) throw new Error(e);
          });
        } else {
          // let testId : any = catalogUpdate.catalogList[0].testId;
          // console.log(testIndex)
          // console.log(labo.catalog.list[testIndex])

          // labo.catalog.list.update({"_id" : id}, (e:any, r:any)=>{
          //   console.log(r)
          // })

          // console.log(testId);
          // console.log(labo.catalog.list[testIndex]['58bb5b7e69b23c2bab47bb00']);

          labo.catalog.list[testIndex].update.push({
            userID: userId,
            testReported: catalogUpdate.catalogList[i].testReported,
            testPrice: catalogUpdate.catalogList[i].testPrice,
            testReferred:
              catalogUpdate.catalogList[i].testReferred === "oui"
                ? true
                : false,
            date: new Date(),
          });

          // delete labo.catalog.list[testIndex].key;
          // console.log(labo.catalog.list[testIndex])

          // labo.save((e : any, doc : any) =>{
          //   if(e) throw new Error(e);
          //   console.log(doc.catalog.list[0])
          // });

          labo.save((e: any) => {
            if (e) throw new Error(e);
          });
        }
        // } else {
        //   throw new Error("user not exist");
        // }

        // // catalogUpdate.catalogList.map((test : any)=> newCatalog.list.push(test))

        // console.log(labo.catalog.list.find((e:any) => e.key = catalogUpdate.catalogList[0].testId))
      });
    }
  };
  // add labo account
  addNewAccountLab = async (args: any, { user }: any) => {
    const r = await LABO.findOne({ 'account.name': args.name }, (e: any, res: any) => {
      if (e) throw new Error(e);
      if (res) return "account_already_exist"
      else {
        let newLab: any = new LABO();
        newLab.account.name = args.name.toUpperCase();

        newLab.account.code = 1;

        newLab.contact.tele.fix.push(args.Fix);

        if (args.fax) {
          newLab.contact.tele.fax.push(args.fax);
        }

        newLab.contact.address.street = args.street;

        newLab.contact.address.city = args.city;

        if (newLab.save()) return "account_saved_succeffully"
        else return "account_not_saved"
      }
    })

    return r;
  }
  // select lab catalog
  selectLaboCatalog = (cb: (lab: any) => void) => this.selectLabo;

  // Laboratory
  selectLabo = (laboName: string, cb: (lab: any) => any) =>
    this.Labo.getOneField("account.name", laboName, cb);

  catalogListTest = async ({ listTest }: any) => {
    const lastCatalog = await this.selectLabo(
      listTest.laboName,
      (labo: any) => {
        const testIndex = labo.catalog.list.findIndex(
          (e: any) => e.testID === listTest.testId
        );

        if (!testIndex) console.log(`we are not found ${listTest.testId}`);

        const testUpdates = labo.catalog.list[testIndex].update;

        const lasIndex = testUpdates[testUpdates.length - 1];

        return {
          testReported: lasIndex.testReported,
          testPrice: lasIndex.testPrice,
          testReferred: lasIndex.testReferred,
        };
      }
    );

    // console.log(lastCatalog);

    return lastCatalog;
  };

  catalogListTests = async ({ listTests }: any) => {
    const lastCatalog: any = [];
    // console.log(listTests)
    await this.selectLabo(listTests.laboName, (labo: any) => {
      listTests.updates.map((listTest: any) => {
        const testIndex = labo.catalog.list.findIndex(
          (e: any) => e.testID === listTest.testId
        );

        if (testIndex < 0) {
          lastCatalog.push({
            testId: listTest.testId,
            testName: listTest.testName,
            Bcode: listTest.Bcode,
          });
        } else {
          const testUpdates = labo.catalog.list[testIndex].update;

          const lasIndex = testUpdates[testUpdates.length - 1];

          lastCatalog.push({
            testReported: lasIndex.testReported,
            testPrice: lasIndex.testPrice,
            testReferred: lasIndex.testReferred,
            testId: listTest.testId,
            Bcode: listTest.Bcode,
            testName: listTest.testName,
          });
        }
      });
    });

    return lastCatalog;
  };

  findCatalogTest = async ({ labTest }: any) => {
    let catalogTest: any;
    await this.selectLabo(labTest.laboName, (labo: any) => {
      const testIndex = labo.catalog.list.findIndex(
        (e: any) => e.testID === labTest.testId
      );

      if (testIndex < 0) {
        catalogTest = {
          testId: labTest.testId,
          testName: labTest.testName,
          Bcode: labTest.Bcode,
        };
      } else {
        const testUpdates = labo.catalog.list[testIndex].update;

        const lasIndex = testUpdates[testUpdates.length - 1];

        catalogTest = {
          testReported: lasIndex.testReported,
          testPrice: lasIndex.testPrice,
          testReferred: lasIndex.testReferred,
          testId: labTest.testId,
          Bcode: labTest.Bcode,
          testName: labTest.testName,
        };
      }
    });

    return { ...catalogTest };
  };

  findCatalogTests = async ({ laboName }: any) => {
    let CatalogTests: any[] = [];

    await this.selectLabo(laboName, (labo: any) => {
      labo.catalog.list.map((test: any) => {
        let lastIndex = test.update.length - 1;
        CatalogTests.push({
          testReported: test.update[lastIndex].testReported,
          testPrice: test.update[lastIndex].testPrice,
          testReferred:
            test.update[lastIndex].testReferred === "true" ? "oui" : "non",
          testId: test.testID,
        });
      });
    });

    return CatalogTests;
  };

  catalogTestUpdateOne = ({ addUpdate }: any) => {
    let isSaved: boolean = false;

    const { laboName, catalogList, token } = addUpdate;

    // Check user ID
    const userUpdateCatalog = jwt.verify(token, "mysuperTokenlogin");

    this.selectLabo(laboName, async (labo: any) => {
      // get user ID
      const { userId }: any = userUpdateCatalog;

      // 1- check if test is exist ? update : create new one
      const testIndex = labo.catalog.list.findIndex(
        (e: any) => e.testID === catalogList.testId
      );

      // 2- test not exist add to catalog list
      if (testIndex <= 0) {
        labo.catalog.list.push({
          testID: catalogList.testId,
          update: [
            {
              userID: userId,
              testReported: catalogList.testReported,
              testPrice: catalogList.testPrice,
              testReferred: catalogList.testReferred === "oui" ? true : false,
              date: new Date(),
            },
          ],
        });

        labo.save((e: any, r: any) => {
          if (e) throw new Error(e);
          isSaved = true;
        });
      } else {
        // 3- test exist update it

        labo.catalog.list[testIndex].update.push({
          userID: userId,
          testReported: catalogList.testReported,
          testPrice: catalogList.testPrice,
          testReferred: catalogList.testReferred === "oui" ? true : false,
          date: new Date(),
        });

        labo.save((e: any, r: any) => {
          if (e) throw new Error(e);
          isSaved = true;
        });
      }
    });

    return isSaved;
  };

  async insertManyLabosIntoDb(labos: any[]) {
    try {
      for (var i = 0; i < labos.length; i++) {
        let newLab = new LABO();

        newLab.account.name = labos[i].name;

        newLab.contact.tele.fix.push(labos[i].Fix);

        var fax: string | undefined;

        if (fax) {
          newLab.contact.tele.fax.push(fax);
        }

        newLab.contact.address.street = labos[i].address;

        newLab.contact.address.city = labos[i].city;

        await newLab.save();

        //   console.log(newLab);
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**************************
   ****** Labo Settings *****
   **************************/
  departementsListing = async (args: any, req: any) => {
    // get account name from args
    const { accountName } = req
    const setting: any = await this.findSetting(accountName, req);

    if (typeof setting === "string") {
      return [{ name: setting }]
    } else {
      return setting.departements
    }
  };
  holidaysListing = async (args: any, req: any) => {
    // get account name from args
    const { accountName } = req
    const setting: any = await this.findSetting(accountName, req);
    if (typeof setting === "string") {
      return [{ name: setting }]
    } else {
      return setting.holidays
    }
  };
  leavesListing = async (args: any, req: any) => {
    // get account name from args
    const { accountName } = req
    const setting: any = await this.findSetting(accountName, req);
    if (typeof setting === "string") {
      return [{ name: setting }]
    } else {
      return setting.leaves
    }
  };
  automatesListing = async (args: any, req: any) => {
    // get account name from args
    const { accountName } = req
    const setting: any = await this.findSetting(accountName, req);
    if (typeof setting === "string") {
      return [{ name: setting }]
    } else {
      return setting.automates
    }
  };

  // update settings
  addDepartement = async (args: any, req: any) => {
    const { departement } = args;
    try {
      const res = await this.addSetting(
        req.accountName,
        req,
        (r) => {
          r.setting.departements.push({ name: departement.name, date: new Date().toString() })
          r.save();
        }
      );
      if (typeof res === "string") {
        return res
      } else {
        return "success"
      }
    } catch (e) {
      console.log(e);
    }
  };
  addHoliday = async (args: any, req: any) => {
    const { holiday: { holiday, duration, accountName } } = args;
    try {
      const res = await this.addSetting(
        req.accountName,
        req,
        (r) => {
          r.setting.holidays.push({ holiday: holiday, duration: duration, createdAt: new Date().toString() })
          r.save();
        }
      );
      if (typeof res === "string") {
        return res
      } else {
        return "success"
      }
    } catch (e) {
      console.log(e);
    }
  };
  addLeave = async (args: any, req: any) => {
    const { leave: { leave, duration, accountName } } = args;
    try {
      const res = await this.addSetting(
        req.accountName,
        req,
        (r) => {
          r.setting.leaves.push({ leave: leave, duration: duration, createdAt: new Date().toString() })
          r.save();
        }
      );
      if (typeof res === "string") {
        return res
      } else {
        return "success"
      }
    } catch (e) {
      console.log(e);
    }
  };
  addAutomate = async (args: any, req: any) => {
    const { automate: { brand, analyzer, entryDate, accountName } } = args;
    try {
      const res = await this.addSetting(
        req.accountName,
        req,
        (r) => {
          r.setting.automates.push({ brand: brand, analyzer: analyzer, entryDate: entryDate, createdAt: new Date().toString() })
          r.save();
        }
      );
      if (typeof res === "string") {
        return res
      } else {
        return "success"
      }
    } catch (e) {
      console.log(e);
    }
  };
  // handle add setting
  addSetting = (
    accountName: string,
    { user, message, hasAuthorization }: any,
    cb: (r: any) => any
  ) => {
    if (message !== "user_success") {
      return message;
    } else {
      if (hasAuthorization(user, accountName)) {
        LABO.findOne({ "account.name": accountName }, (e: any, r: any) => {
          if (e) throw new Error(e)
          if (!r) throw new Error("account_not_founded")
          cb(r)
        })
      } else {
        return "not_allowed";
      }
    }
  };
  // show labo setting by director
  findSetting = async (accountName: string, { user, message, hasAuthorization }: any) => {

    if (message !== "user_success") {
      return message;
    } else {
      // if (hasAuthorization(user, accountName)) {
      const res = await LABO.findOne({ "account.name": accountName });

      if (res) {
        return res.setting
      } else {
        return "not_founded"
      }
      // } else {
      //   return "not_allowed";
      // }
    }
  };
  /**************************
   ****** Labo Settings *****
   **************************/
  addNewRole = (args: any, req: any) => {
    const { user, message, hasAuthorization } = req

    if (hasAuthorization(user)) {

      try {
        LABO.findOne({ "account.name": req.accountName }, (e: any, r: any) => {

          let newRole: any = {};

          newRole.addedby = user._id
          newRole.role = args.status
          newRole.permissions = [
            { componentName: "catalogue", create: false, read: false, update: false, delete: false },
            { componentName: "Personelles", create: false, read: false, update: false, delete: false },
            { componentName: "Parametres", create: false, read: false, update: false, delete: false },
          ]

          if (r) {
            r.setting.team.push(newRole);
            r.save((e: any) => {
              if (e) throw new Error(e);
              else console.log("saved")
            })
          }

          else {
            console.log("no_account_founded")
            return "no_account_founded"
          }

        });

        return "role_added_successfully"

      } catch (e) {
        console.log(e);
      }

    }

    else return "user_has_no_permission"
  };
  updateRole = (args: any, req: any) => {

  };
  // delete role from team
  deleteRole = (args: any, req: any) => {
    const { user, message, hasAuthorization } = req

    if (hasAuthorization(user)) {

      try {
        LABO.findOne({ "account.name": req.accountName }, (e: any, r: any) => {
          if (r) {
            const index = r.setting.team.findIndex((t: any) => t.role = args.role);

            if (index > -1) {
              r.setting.team.splice(index, 1);
            }

            r.save((e: any) => {
              if (e) throw new Error(e);
              else console.log("saved")
            })
          }

          else {
            console.log("no_account_founded")
            return "no_account_founded"
          }
        });

        return "role_deleted_successfully"

      } catch (e) {
        console.log(e);
      }

    }
    else return "user_has_no_permission"
  };
  addPermissionToRole = () => { };
  // update permissions
  updatePermissionOfRole = (args: any, req: any) => {
    const { user, message, hasAuthorization } = req
    const { role, permissions } = args;
    if (hasAuthorization(user)) {
      try {
        LABO.findOne({ "account.name": req.accountName }, (e: any, r: any) => {

          if (r) {
            // find role
            r.setting.team.map((r: any) => {
              if (r.role === role) {
                r.permissions.map((p: any) => {
                  permissions.map((u: any) => {
                    if (p.componentName === u.componentName) {
                      p.create = u.create
                      p.read = u.read
                      p.update = u.update
                      p.delete = u.delete
                    }
                  })
                })
              }
            })
            // update permissions
            // save and return success massage
            r.save((e: any) => {
              if (e) throw new Error(e);
              else console.log("saved")
            })
          }

          else {
            console.log("no_account_founded")
            return "no_account_founded"
          }

        });

        return "role_added_successfully"

      } catch (e) {
        console.log(e);
      }

    }

    else return "user_has_no_permission"
  };
  // delete permissions module from Role
  deletePermissionOfRole = () => { };
  // team queries
  fetchAccountRoles = async (args: any, req: any) => {
    const res = await LABO.findOne({ "account.name": req.accountName });

    if (res) {
      return res.setting.team;
    }
    return "no_account_roles_founded"
  }

  /**
   * Catalog functions
  */
  fetchCatalogs = async (args: any, { user }: any) => {
    const res = await LABO.findById(user.accountId, (e: string, r: any) => {
      if (e) throw new Error(e);
      if (r) {
        return r;
      }
    })
    return (res && res.catalogs);
  }
  fetchCatalog = async ({ id }: any, { user }: any) => {
    const res = await LABO.findById(user.accountId).select("catalogs")
      .then(r => r && r.catalogs)
      .then((cat: any) => {
        if (cat) {
          return cat.find((c: any) => c._id == id)
        }
      })
    return res;
  }

  //  add new catalog
  addNewCatalog = (args: any, { user }: any) => {
    LABO.findById(user.accountId, (e: string, r: any) => {
      if (e) throw new Error(e);
      if (r) {
        let Catalog = {
          ...args,
          createdBy: user._id,
        }
        if (Catalog.addressedTo == "SubContractor") delete Catalog.addressedToId
        if (Catalog.addressedTo == "Contributor") {
          Catalog.addressedCabinetId = Catalog.addressedToId
          delete Catalog.addressedToId;
        }
        r.catalogs.push(Catalog);
        r.save()
      }
    })

  }

  // update catalog
  updateCatalog = ({ catalog }: any, { user }: any) => {
    try {
      LABO.findById(user.accountId, (e: string, r: any) => {
        if (e) throw new Error(e);
        if (r) {

          if (catalog.title) r.catalogs.id(catalog._id).title = catalog.title
          if (catalog.description) r.catalogs.id(catalog._id).description = catalog.description
          if (catalog.bFactor) r.catalogs.id(catalog._id).bFactor = catalog.bFactor

          r.save()
        }
      })

      return "success"

    } catch (e) {
      console.log(e);
      return "failed";
    }
  }

  /**
   * catalog list operations
   * 
   */

  // modify price
  catalogModiyTestPrice = ({ catalogId, testId, price }: any, { user }: any) => {
    try {

      LABO.findById(user.accountId, (e: any, r: any) => {
        if (e) throw new Error(e);
        if (r) {
          const catalogIndex = r.catalogs.findIndex((c: any) => c._id == `${catalogId}`);
          if (catalogIndex >= 0) {

            const listIndex = r.catalogs[catalogIndex].list.findIndex((l: any) => l.testId == testId.toString())

            if (listIndex >= 0)
              r.catalogs[catalogIndex].list[listIndex].testPrice = price

            else
              r.catalogs[catalogIndex].list.push({ testId: testId, testPrice: price })
          }

          else return "lab_catalog_not_founded"

          r.save()
        }
      })

      return "modify_catalog_list_price_success"

    } catch (e) {

      console.log(e);

      return "modify_catalog_list_price_failed"
    }
  };

  // modify is test referred
  catalogModiyTestReferred = ({ catalogId, testId, referred }: any, { user }: any) => {

    LABO.findById(user.accountId, (e: any, r: any) => {
      if (e) throw new Error(e);
      if (r) {
        const catalogIndex = r.catalogs.findIndex((c: any) => c._id == `${catalogId}`);
        if (catalogIndex >= 0) {

          const listIndex = r.catalogs[catalogIndex].list.findIndex((l: any) => l.testId == testId.toString())

          if (listIndex >= 0)
            r.catalogs[catalogIndex].list[listIndex].testReferred = referred

          else
            r.catalogs[catalogIndex].list.push({ testId: testId, testReferred: referred })
        }

        else return "lab_catalog_not_founded"

        r.save()
      }
    })

    return "modify_catalog_list_price_success"
  };

  // modify report time
  catalogModiyTestReported = ({ catalogId, testId, reported }: any, { user }: any) => {
    try {

      LABO.findById(user.accountId, (e: any, r: any) => {
        if (e) throw new Error(e);
        if (r) {
          const catalogIndex = r.catalogs.findIndex((c: any) => c._id == `${catalogId}`);
          if (catalogIndex >= 0) {

            const listIndex = r.catalogs[catalogIndex].list.findIndex((l: any) => l.testId == testId.toString())

            if (listIndex >= 0)
              r.catalogs[catalogIndex].list[listIndex].testReported = reported

            else
              r.catalogs[catalogIndex].list.push({ testId: testId, testReported: reported })
          }

          else return "lab_catalog_not_founded"

          r.save()
        }
      })

      return "modify_catalog_list_price_success"

    } catch (e) {

      console.log(e);

      return "modify_catalog_list_price_failed"
    }
  };

  // fetch tests in catalog
  catalogFetchModiedTest = async ({ catalogId }: any, { user }: any) => {
    const res = await LABO.findById(user.accountId)
    if (res) {
      const catalog: any[] = [...res.catalogs];
      const i = catalog.findIndex((c: any) => c._id == catalogId.toString());
      if (i >= 0) return catalog[i].list
      else return "catalog_not_founded"
    } else return "lab_account_not_founded"
  }
  // activate modules
  activateModules = ({ componentId, accountId, accountType }: any, { user }: any) => {
    user.supadmin(user, (_id: any) => {
      const labo = new Db(LABO);

      labo.getDocByIdAndPushSubDoc(accountId, {
        extensions: {
          component: componentId,
          activatedBy: _id
        }
      })

      return "account_updated_successfully"
    })

  }

  LaboFetchComponents = async ({ accountId }: any, { user }: any) => user.supadmin(
    user, async (_id: any) => {
      const labo = new Db(LABO);
      const modules = await labo.getSubDocWithPop(accountId, 'extensions', 'extensions.component');
      return modules.map((m: any) => m.component);
    })
}