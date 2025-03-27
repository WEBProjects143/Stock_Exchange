const express=require("express");
const router=express.Router();

const {Authorize}=require("../midllware/Authenticate");
const {
    getAllProduct,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    createReview,
    getAllReview,
    deleteReview

}=require("../Controller/Productcontroller");

router.route("/new").post(createProduct)
router.route("/getall").get(getAllProduct)
router.route("/getbyId/:id").get(getProductById)
router.route("/delProduct/:id").post(deleteProduct)
router.route("/updateProduct/:id").put(updateProduct)
router.route("/createReview").put(Authorize,createReview)
router.route("/getAllreviews/:id").get(Authorize,getAllReview)
router.route("/deleteRev").delete(Authorize,deleteReview)

module.exports=router