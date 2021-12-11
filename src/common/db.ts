import mongoose, { Mongoose, ObjectId, Schema } from "mongoose";

export class Db {

    /**
     * class variables 
     * @param db 
     */
    private db: any;
    /**
     * Existing Doc error message
     */
    private NotFoundedMessage: string = "DOCUMENT_NOT_FOUNDED"
    private ExistingDocMessage: string = "document_already_exist"
    private NotSavedMessage: string = "document_not_saved";
    private doneMessage: string = "document_saved_successfully";
    private NotRemovedMessage: string = "document_not_removed";
    private doneRemovedMessage: string = "document_removed_successfully";

    /**
     * manage returned data
     */
    private manageReturnedResult = (results: any) => {
        if (!results) throw new Error(this.NotFoundedMessage)
        return results
    }
    /**
     * filter data from 
     * undefined and null values
     * @param db 
     */
    filterData = (data: any) => {
        let newData = data;
        for (const property in newData) {
            if (
                newData[property] == '' || newData[property] == 'null' || newData[property] == null ||
                newData[property] == 'undefined' || typeof (newData[property]) == 'undefined'
            ) {
                delete newData[property];
            }
        }
        return newData;
    }

    /* 
        public Field : String | Number | undefined | null ;
        private Object_Field_Id : Field ; 
    */
    constructor(db: any) {
        this.db = db;
    }

    // methods 

    /*
     search and view one or more fields 
     depends on Query 
    */
    getSubDoc = async (id: any, subdoc: string, poped?: any) => {
        const results = await this.db.findById(id).select(subdoc).populate(poped);
        if (!results) return Error(this.NotFoundedMessage)
        return results[subdoc]
    }
    /*
     search and view one or more fields 
     depends on Query 
    */
    getSubDocAndSortNested = async (id: ObjectId, subdoc: string, poped?: any) => {
        const results = await this.db.aggregate([
            {
                $match: {
                    "_id": id
                }
            },
            {
                $project: {
                    "labelers": 1,
                    "worker": {
                        $reduce: {
                            input: {
                                "$map": {

                                }
                            },
                            initialValue: "",
                            in: { $eq: ["$$labelers.status", "paused"] }
                        }
                    }
                }
            }
        ])

        return (results)
    }
    /**
     * find subdoc and return array of an property
     * @param id 
     * @param subdoc 
     * @returns Array of Property
     */
    subDocPropertyInArray = async (id: ObjectId, subdoc: string) => {
        const results = await this.db.findById(id).select(subdoc).then((r: any) => r[subdoc].map((d: any) => {
            if (d.status != "deleted") {
                return d.number
            }
        }));

        return this.manageReturnedResult(results)
    }
    /*
     search and view one or more fields 
     depends on Query 
    */
    getSubDocWithPop = async (id: ObjectId, subdoc: string, populated: string) => {
        const results = await this.db.findById(id).select(subdoc).populate(populated);
        if (!results) return Error(this.NotFoundedMessage)
        return results[subdoc]
    }

    /* 
     search and view one or more fields 
     depends on Query 
    */
    getAllDocs = async () => {
        const results = await this.db.find();
        if (!results) throw new Error("no result found")
        return results
    }
    /**
     * find sub doc and push array
     * @param _id 
     * @returns 
     */
    updateSubDocs = async (query: any, filter: any, data: any) => {
        const results = await this.db.findOneAndUpdate(query, { $push: data }, filter);
        return results ? results : Error(this.NotSavedMessage);
    }
    /**
     * find sub doc and set array
     * @param _id 
     * @returns 
     */
    setSubDocs = async (query: any, filter: any, data: any) => {
        const results = await this.db.findOneAndUpdate(query, { $set: data }, filter);
        return results ? results : Error(this.NotSavedMessage);
    }
    /**
     * find sub doc and set array
     * @param _id 
     * @returns 
     */
    setSubDocsPushWithoutFilter = async (query: any, data: any) => {
        const results = await this.db.findOneAndUpdate(query, { $push: data }, { new: true });
        return results ? results : Error(this.NotSavedMessage);
    }
    /**
     * search by query in one field
     */
    getDocById = async (_id: ObjectId) => {
        const results = await this.db.findById(_id);
        if (!results) throw new Error("NO_RESULT_FOUNDED")
        return results
    }
    /**
     * search by query in one field
     */
    getOneByQuery = async (q: any) => {
        const results = await this.db.findOne(q);
        if (!results) throw new Error("no result found")
        return results
    }
    /**
     * search by query in one field
     */
    getDocByIdAndPushSubDoc = async (_id: ObjectId, data: any) => {
        const doc = await this.db.updateOne({ '_id': _id }, {
            $push: data
        });

        return doc;
        // if (!results) throw new Error("no result found")
        // return results
    }
    /**
     * search by query in one field
     */
    getDocByIdAndUpdate = async (_id: ObjectId, data: any) => {
        const doc = await this.db.findByIdAndUpdate({ '_id': _id }, { $push: data }, { new: true });

        return doc;
        // if (!results) throw new Error("no result found")
        // return results
    }
    /**
     * search by query in one field
     */
    getSubDocById = async (field: any, filter: any, returnedArray: any) => {
        const doc = await this.db.findOne(field, filter).then((r: any) => r[returnedArray][0]);
        return this.manageReturnedResult(doc);
    }
    /**
     * 
     */
    nestedOfsubdocByQuery = async (_id: string) => {
        const doc = await this.db.aggregate([
            { $unwind: "$workFlow" },
            {
                $match: {
                    $and: [
                        { _id: mongoose.Types.ObjectId(_id) },
                        {
                            $expr: {
                                '$eq': [
                                    { "$dateToString": { format: "%Y-%m-%d", date: { $dateFromString: { format: "%Y-%m-%d", dateString: "$workFlow.startAt" } } } },
                                    { "$dateToString": { format: "%Y-%m-%d", date: new Date() } },
                                ]
                            }
                        }
                    ]
                }
            }
        ])

        console.log(doc)
    }
    /**
     * 
     */
    getAllFieldsFromObject = () => { }
    /**
     * 
     * @param field 
     * @param query 
     * @param cb 
     * @returns 
     */
    getOneField = async (field: string, query: string, cb: (r: any) => any) => {

        const result = await this.db.findOne({ [field]: query });

        if (!result) return "there is no user match this query"

        return cb(result)
    }
    /**
     * 
     */
    getOneFieldsFromArray = () => { }
    /**
     * 
     */
    getOneFieldsFromObject = () => { }

    /* 
     Search and modify one or more fields 
     depends on Query
    */
    setAllFields = () => { }
    /**
     * 
     */
    setAllFieldsFromArray = () => { }
    /**
     *     
     */
    setAllFieldsFromObject = () => { }
    /**
     * 
     */
    setOneField = () => { }
    /**
     * 
     */
    setOneFieldsFromArray = () => { }
    /**
     * 
     */
    setOneFieldsFromObject = () => { }

    /**
     * Update fields
     */

    /**
     * Compare fields
     */
    /**
     * create new doc
     */
    createNewDoc = async (data: any) => {
        let filteredData = this.filterData(data);

        let newDoc = new this.db({
            ...filteredData
        })

        const r = await newDoc.save();

        if (r.length <= 0) return Error(this.NotSavedMessage);

        return this.doneMessage
    }
    /**
     * 
     * @param data 
     * @returns 
     */
    createNewDocAndGetId = async (data: any) => {
        let filteredData = this.filterData(data);

        let newDoc = new this.db({
            ...filteredData
        })

        const r = await newDoc.save();

        if (r.length <= 0) return Error(this.NotSavedMessage);

        return r["_id"]
    }
    // check existing
    checkExisting = async (d: any) => {
        const r = await this.db.find(d);
        if (r.length > 0) return Error(this.ExistingDocMessage)
        return false;
    }
    /**
     * remove docs
     */
    removeDocById = async (id: ObjectId) => {
        const r = await this.db.findByIdAndRemove(id);

        if (!r) return Error(this.NotRemovedMessage)

        return this.doneRemovedMessage;
    }
}