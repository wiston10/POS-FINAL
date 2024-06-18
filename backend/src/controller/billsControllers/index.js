
const createbills =require('./createBills')
const addProductBills=require('./addProductatbills')
const getbillsactives=require('./getbills_actives')
const getbillid= require('./getbillid')
const getbillhistory =require('./get_all_bills')
const paybill =require('./paybill')
const destroybills=require('./destroybills')
module.exports={
    createbills,
    addProductBills,
    getbillsactives,
    getbillid,
    getbillhistory,
    paybill,
    destroybills
}