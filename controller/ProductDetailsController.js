const ProductDetails = require("../models/ProductDetails");

const CreateProductDetails = async (req, res) => {
    try {
        const { Product, title, by_Created, Description, Before_Price, After_Price, Discount_Percentage, Select_Size } = req.body;
        const images = req.file ? req.file.filename : null;
        const sub_images1 = req.file ? req.file.filename : null;
        const sub_images2 = req.file ? req.file.filename : null;
        const sub_images3 = req.file ? req.file.filename : null;

        let formattedSelectSizeArray;
        let formattedSelectSizeObject;

        // Ensure Select_Size is saved as an array of strings
        if (Array.isArray(Select_Size)) {
            formattedSelectSizeArray = Select_Size;
            formattedSelectSizeObject = { 0: Select_Size.join(',') };
        } else {
            formattedSelectSizeArray = Select_Size.split(',');
            formattedSelectSizeObject = { 0: Select_Size };
        }

        const newCreateProductDetails = new ProductDetails({
            Product,
            title,
            by_Created,
            Before_Price,
            After_Price,
            Discount_Percentage,
            Description,
            images,
            sub_images1,
            sub_images2,
            sub_images3,
            Select_Size: formattedSelectSizeArray,
            Select_Size_Object: formattedSelectSizeObject
        });

        // Save the new product details to the database
        await newCreateProductDetails.save();

        return res.status(201).json({
            status: 201,
            message: "Successfully Add The ProductDetails",
            data: newCreateProductDetails,
        });
    } catch (error) {
        console.error("Error adding product details:", error);
        return res.status(500).json({
            status: 500,
            message: "Server side error Add The ProductDetails",
            error: error.message,
        });
    }
};





const GetProductDetails = async (req, res) => {
    try {
        const ProductDetailsList = await ProductDetails.find().populate("Product");

        if (ProductDetailsList.length > 0) {
            const ProductDetailsListData = ProductDetailsList.map((ProductDetailsListResult) => ({
                _id: ProductDetailsListResult._id,
                images: ProductDetailsListResult.images,
                title: ProductDetailsListResult.title,
                After_Price: ProductDetailsListResult.After_Price,
                Before_Price: ProductDetailsListResult.Before_Price,
                Discount_Percentage: ProductDetailsListResult.Discount_Percentage,
                sub_images1: ProductDetailsListResult.sub_images1,
                sub_images2: ProductDetailsListResult.sub_images2,
                sub_images3: ProductDetailsListResult.sub_images3,
                by_Created: ProductDetailsListResult.by_Created,
                Description: ProductDetailsListResult.Description,
                Product: {
                    _id: ProductDetailsListResult.Product ? ProductDetailsListResult.Product._id : null,
                },
                Select_Size: ProductDetailsListResult.Select_Size
            }));

            return res.status(200).json({
                status: 200,
                message: "Successfully fetch the ProductDetails",
                data: ProductDetailsListData,
            });
        }

        return res.status(400).json({
            status: 400,
            message: "Data not found for fetch the ProductDetails",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server Side Error fetch the ProductDetails",
            error: error.message,
        });
    }
};

const GetProductDetailsListById = async (req, res) => {
    try {
        const { _id } = req.params;
             console.log("GetProductDetailsListById",_id)
        if (!_id) {
            // If no ID is provided, fetch the details for the first product ID
            const firstProductDetails = await ProductDetails.findById().sort({ _id: 1 });

            if (!firstProductDetails) {
                return res.status(404).json({
                    status: 404,
                    message: "Data Not Found ProductDetails Get By Id 1",
                });
            }

            return res.status(200).json({
                status: 200,
                message: "Successfully fetch the ProductDetails By Id 1",
                data: [firstProductDetails], // Wrap the result in an array to maintain consistency
            });
        }

        // If an ID is provided, fetch the details for that specific product ID
        const ProductDetailsList = await ProductDetails.find({ Product: _id });
          console.log("ProductDetailsList",ProductDetailsList)
        if (!ProductDetailsList || ProductDetailsList.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found ProductDetails Get By Id 2",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Successfully fetch the ProductDetails By Id 2",
            data: {ProductDetailsList},
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Server Side Error fetching ProductDetails By Id",
        });
    }
};
const GetProductDetailsListById1 = async (req,res)=>{
    try{
        const {_id}  = req.params;
        const GetProductDetailsList = await ProductDetails.findById(_id);
        if(!GetProductDetailsList){
            return res.status(400).json({status:400,message:"Data Not Found GetProductDetailsListById1"})
        }else{
            const GetProductDetailsData = {
                _id:GetProductDetailsList._id,
                title:GetProductDetailsList.title,
                images:GetProductDetailsList.images,
                After_Price: GetProductDetailsList.After_Price,
                Before_Price: GetProductDetailsList.Before_Price,
                Discount_Percentage: GetProductDetailsList.Discount_Percentage,
                sub_images1: GetProductDetailsList.sub_images1,
                sub_images2: GetProductDetailsList.sub_images2,
                sub_images3: GetProductDetailsList.sub_images3,
                by_Created: GetProductDetailsList.by_Created,
                Description: GetProductDetailsList.Description,
                Description: GetProductDetailsList.Description,
                Select_Size: GetProductDetailsList.Select_Size
            }

            return res.status(200).json({status:200,
                message:"SucessFully Fetch the  GetProductDetailsList By Id 1",
            data:GetProductDetailsData})
        }
    }catch(error){
        return res.status(500).json({status:500,
            message:"Server side error Fetch the  GetProductDetailsList By Id 1"})

    }
}
const DeleteProductDetails = async (req, res) => {
    try {
        const { _id } = req.params
        const ProductDetailsList = await ProductDetails.findByIdAndDelete({ _id });
        if (!ProductDetailsList) {
            return res.status(400).json({ status: 400, message: "Data Not Found Delete Product Details" })
        }
        return res.status(401).json({ status: 401, message: "Successfully Delete Product Details" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server side error Delete Product Details" })
    }
}

const EditProductDetails = async (req, res) => {
    try {
        const { _id } = req.params;
        const { title } = req.body;
        const images = req.file ? req.file.filename : null;
        const ProductDetailsList = await ProductDetails.findByIdAndUpdate({ _id },
            { title, images }, { new: true })
        if (!ProductDetailsList) {
            return res.status(400).json({
                status: 400,
                message: "Data Not Found Edit The ProductDetails"
            })
        }
        return res.status(201).json({
            status: 201,
            message: "Successfully  Edit The ProductDetails",
            data: ProductDetailsList
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server Side error Edit The ProductDetails"
        })

    }
}

module.exports = {
    CreateProductDetails,
    GetProductDetails,
    GetProductDetailsListById,
    DeleteProductDetails,
    EditProductDetails,
    GetProductDetailsListById1
};
