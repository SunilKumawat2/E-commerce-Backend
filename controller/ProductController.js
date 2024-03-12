const Product = require("../models/Product");

const CreateProduct = async (req, res) => {
    try {
        const { title } = req.body;
        const newProduct = new Product({
            title
        })
        await newProduct.save();
        return res.status(201).json({ status: 201, message: "Successfully Add the Product", data: newProduct })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server side error Add the Product" })
    }
}

const GetProduct = async (req, res) => {
    try {
        const ProductList = await Product.find();
        if (ProductList.length > 0) {
            const ProductListData = ProductList.map((ProductListResult) => ({
                _id: ProductListResult._id,
                title: ProductListResult.title
            }))
            return res.status(200).json({
                status: 200,
                message: "Successfully Fetch the ProductList"
                , data: ProductListData
            })
        }
        return res.status(400).json({
            status: 400,
            message: "data Not Found Fetch the ProductList"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "server side error Fetch the ProductList"
        })

    }
}

const DeleteProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        const ProductList = await Product.findByIdAndDelete(_id);
        if (!ProductList) {
            return res.status(404).json({ status: 404, message: "Data not Found Delete the Product" })
        }
        return res.status(200).json({ status: 200, message: "Delete the Product" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "server side error Delete the Product" })

    }
}

const GetProductById = async (req, res) => {
    try {
        const { _id } = req.params;
        const ProductList = await Product.findById(_id);
        if (!ProductList) {
            return res.status(404).json({ status: 404, message: "Data not Found Get By Id the Product" })
        }
        const ProductListData = {
            _id: ProductList._id,
            title: ProductList.title
        }
        return res.status(200).json({
            status: 200,
            message: "Sucessfully get By Id the Product", data: ProductListData
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server side error get  By Id the Product"
        })
    }
}

const EditProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        const { title } = req.body
        const ProductList = await Product.findByIdAndUpdate(_id, { title }, { new: true })
        if (!ProductList) {
            return res.status(404).json({
                status: 404,
                message: "Data not Found Get By Id the Product"
            })
        }
        return res.status(201).json({
            status: 201,
            message: "Successfully Edit the Product List",
            data: ProductList
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server side error Edit the Product List"
        })

    }
}

module.exports = { CreateProduct, GetProduct, DeleteProduct, GetProductById, EditProduct }