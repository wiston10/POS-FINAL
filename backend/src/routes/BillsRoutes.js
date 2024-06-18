const {createbills,addProductBills,getbillsactives,getbillid,getbillhistory,paybill,destroybills} =require('../controller/billsControllers/index')
const midalware = require("../midelwares/auth");

const BillsController = require("express").Router();
        BillsController.get('/history',getbillhistory)
        BillsController.get('/actives',getbillsactives)
        BillsController.post('/addProduct',addProductBills)
        BillsController.get('/pay/:id',paybill)
        BillsController.get('/billId/:id',getbillid)
        BillsController.delete('/destroy/:id',destroybills)
        BillsController.post("/create", midalware, createbills);

module.exports=BillsController
