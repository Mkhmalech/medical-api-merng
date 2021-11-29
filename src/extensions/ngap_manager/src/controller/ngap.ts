import { NGAP } from "../module/ngap"
import { Ngap } from './ngapFormated'
const fs = require('fs');

export const modifyActe = ({ code }: any) => { }
export const addMultiActes = async () => {
    // for (let i = 0; i < Ngap.length; i++) {
    //     const ngap = Ngap[i];

    //     let newNgap = new NGAP({
    //         acteLabel: ngap.acteLabel,
    //         acteCode: ngap.acteCode,
    //         acteCoefficient: ngap.acteCoefficient,
    //         chapterLetter: ngap.chapterLetter,
    //         chapterCode: ngap.chapterCode,
    //         chapterLabel: ngap.chapterLabel
    //     })

    //     if(ngap.groupCode)  newNgap.groupCode = ngap.groupCode
    //     if(ngap.groupLabel) newNgap.groupLabel = ngap.groupLabel

    //     const res = await newNgap.save();

    //     if(res) console.log(`${i+1} finished from ${Ngap.length} `)
    // }

    return "finished"
}
export const fetchChapters = async () => {
    return ([
        { chapterLabel: "Actes de radiodiagnostic", chapterLetter: "T" },
        { chapterLabel: "Actes de radiothérapie", chapterLetter: "U" },
        { chapterLabel: "Actes de rééducation et de réadaptation fonctionnelles", chapterLetter: "Q" },
        { chapterLabel: "Actes divers", chapterLetter: "R" },
        { chapterLabel: "Actes portant sur l'abdomen", chapterLetter: "J" },
        { chapterLabel: "Actes portant sur l'appareil génital féminin", chapterLetter: "M" },
        { chapterLabel: "Actes portant sur l'appareil génital masculin", chapterLetter: "L" },
        { chapterLabel: "Actes portant sur la tête", chapterLetter: "D" },
        { chapterLabel: "Actes portant sur le cou", chapterLetter: "E" },
        { chapterLabel: "Actes portant sur le membre inférieur", chapterLetter: "N" },
        { chapterLabel: "Actes portant sur le membre supérieur", chapterLetter: "G" },
        { chapterLabel: "Actes portant sur le rachis ou la moelle épinière", chapterLetter: "F" },
        { chapterLabel: "Actes portant sur le thorax", chapterLetter: "H" },
        { chapterLabel: "Actes portant sur les tissus en général", chapterLetter: "C" },
        { chapterLabel: "Actes sur l'appareil urinaire et génital", chapterLetter: "K" },
        { chapterLabel: "Actes utilisant des radio_éléments en sources non scellées", chapterLetter: "V" },
        { chapterLabel: "Cardio_radiologie invasive diagnostique et interventionnelle", chapterLetter: "Y" },
        { chapterLabel: "Diagnostic et traitement de troubles mentaux", chapterLetter: "P" },
        { chapterLabel: "Dispositions générales", chapterLetter: "W" },
        { chapterLabel: "NOMENCLATURE DES ACTES D'ANATOMIE ET DE CYTOLOGIE PATHOLOGIQUES", chapterLetter: "Z" },
        { chapterLabel: "Radiologie interventionnelle", chapterLetter: "X" },
        { chapterLabel: "Soins infirmiers", chapterLetter: "S" },
        { chapterLabel: "actes de traitement des traumatismes", chapterLetter: "A" }
    ])
}

export const fetchGroups = async ({ letter }: any) => {
    const res = await NGAP.find({ chapterLetter: letter.toUpperCase() }).distinct("groupLabel");
    return (res)
}

export const fetchActes = async ({ group }: any) => {
    const res = await NGAP.find({ groupLabel: group });
    return (res)
}

export const fetchActeDetails = async ({ code }: any) => {
    const res = await NGAP.findOneAndUpdate({ acteCode: code }, {$inc : {"views" : 1}});
    return (res)
}

export const searchNgapActe = async ({ q }: any) => {
    const res = await NGAP.find({ acteLabel: new RegExp(q, 'ig') });
    return (res)
}

export const createNgapSiteMap = async () => {
    // let sitmap: string = '';

    // const res = await NGAP.find().then((n: any) => {
    //     if (n) {
    //         n.map((m: any) => {
    //             sitmap += `<url><loc>https://ittyni.com/actes-tarifs/nomenclature-generale-des-actes-professionnels/${m.acteCode}</loc><lastmod>${new Date().toISOString()}</lastmod><priority>0.80</priority></url>`;
    //         })
    //     }
    // })

    // // console.log(sitmap)

    // fs.writeFileSync(`./cabinetSitemap.xml`, sitmap, (err:any, doc:any) => {
    //     if (err) throw err
    //     console.log(doc)
    // });
}