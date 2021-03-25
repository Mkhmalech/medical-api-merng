import { buildSchema } from "graphql";

const acteLabel = `acteLabel: String`
const acteCode = `acteCode: String`
const acteCoefficient = `acteCoefficient: String`
const chapterLetter = `chapterLetter: String`
const chapterCode = `chapterCode: String`
const chapterLabel = `chapterLabel: String`
const groupCode = `groupCode: String`
const groupLabel = `groupLabel: String`

export const NgapSchema = buildSchema(`
    type Chapter {
        ${chapterLetter}
        ${chapterLabel}
    }
    type Ngap {
        _id : ID
        ${acteLabel}
        ${acteCode}
        ${acteCoefficient}
        ${chapterLetter}
        ${chapterCode}
        ${chapterLabel}
        ${groupCode}
        ${groupLabel}
    }

    type NGAPQuery {
        fetchChapters : [Chapter]
        fetchGroups(letter : String) : [String]
        fetchActes(group : String) : [Ngap]
        fetchActeDetails(code : String) : Ngap
        searchNgapActe(q: String) : [Ngap]
    }
    type NGAPMutation {
        modifyActe(code: String) : String
        addMultiActes : String
        createNgapSiteMap : String
    }
    schema {
        query : NGAPQuery
        mutation : NGAPMutation
    }
`)