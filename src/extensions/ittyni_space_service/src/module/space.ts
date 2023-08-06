import { Schema, model, Document } from "mongoose"

interface ISpaceModel extends Document {
    account: {
        name: string,
        code?: number,
        type?: string,
        start?: string,
    }
    photos: string[]
    contact: {
        tele: any[],
        address: any,
        website: string
    }
    
    classification?: any,

    extensions?: any[],

    patients?: any[],

    payement?: any[]

    waitingRoom?: any[]

    geometry?: {
        location: any
    }

    views: number
    
    rating?: number

    user_ratings_total?: number
}

const SpaceSchema: Schema = new Schema({
    account: {
        name: { type: String },
        code: { type: Number },
        type: { type: String },
        start: { type: String },
    },
    photos : [String],
    contact: {
        tele: [{
            country_code: String,
            country_name: String,
            country_dial_code: String,
            dial_numero: Number
        }],
        website: { type: String },
        address: {
            region: {
                type: String,
            },

            province: {
                type: String,
            },

            commune: {
                type: String,
            },

            street: {
                type: String,
            },

            city: {
                type: String,
            },
        },
    },
    geometry: {
        location: {
            latitude: { type: Number},
            longitude: { type: Number}
        }
    },
    /**
   * activated modules
   */
    // extensions: [extensionSchema],
    /**
     * patients not yet 
     * confirmed by ID
     */
    // patients: [patient],
    /**
     * cabinet incomes
     * payement
     */
    // payements: [payement],
    /**
     * waitng room
     */
    // waitingRoom: [waitingPatient],
    /**
     * number of views
     */
    views: Number,
    /**
     * rating
     */
    rating: Number,
    user_ratings_total: Number
});

export const SPACE = model<ISpaceModel>("SPACE", SpaceSchema);

