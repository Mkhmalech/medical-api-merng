import { NGAP } from "../module/ngap"
import {Ngap}  from './ngapFormated'

export const fetchActe = () => { }
export const modifyActe = ({ code }: any) => { }
export const addMultiActes = async() => {
    for (let i = 0; i < Ngap.length; i++) {
        const ngap = Ngap[i];
        
        let newNgap = new NGAP({
            acteLabel: ngap.acteLabel,
            acteCode: ngap.acteCode,
            acteCoefficient: ngap.acteCoefficient,
            chapterLetter: ngap.chapterLetter,
            chapterCode: ngap.chapterCode,
            chapterLabel: ngap.chapterLabel
        })

        if(ngap.groupCode)  newNgap.groupCode = ngap.groupCode
        if(ngap.groupLabel) newNgap.groupLabel = ngap.groupLabel

        const res = await newNgap.save();

        if(res) console.log(`${i+1} finished from ${Ngap.length} `)
    }
    
    return "finished"
}