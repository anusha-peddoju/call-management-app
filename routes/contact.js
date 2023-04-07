const express=require("express");
const router=express.Router();
const{
    getContact,createContact,getContact_ind,updateContact,deleteContact,
}=require("../controllers/contactcontroller");
const validateToken = require("../middleware/validatetokenhandler");
router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContact_ind).put(updateContact).delete(deleteContact);

module.exports=router;