const Blog = require("../models/Blog");

const CreateBlog = async (req, res) => {
    try {
        const { title, short_description, description } = req.body;
        const images = req.file ? req.file.filename : null;

        const newCreateBlog = new Blog({
            title,
            short_description,
            description,
            images
        })
        await newCreateBlog.save();
        return res.status(201).json({
            status: 201,
            message: "Successfully add the Blog Section"
            , data: newCreateBlog
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server side error add the Blog Section"
        })

    }
}
const GetBlog = async (req, res) => {
    try {
        const BlogList = await Blog.find();
        if (BlogList.length > 0) {
            const Blogdata = BlogList.map((BlogListResult) => ({
                _id: BlogListResult._id,
                title: BlogListResult.title,
                images: BlogListResult.images,
                short_description: BlogListResult.short_description,
                description: BlogListResult.description
            }))
            return res.status(200).json({
                status: 200,
                message: "Successfully Fetch the Blog ",
                data: Blogdata
            })
        }
        return res.status(404).json({
            status: 404,
            message: "data not found Fetch the Blog"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "server side error Fetch the Blog"
        })

    }
}
const DeleteBlog = async (req, res) => {
    try {
        const { _id } = req.params;
        const BlogList = await Blog.findByIdAndDelete(_id);
        if (!BlogList) {
            return res.status(404).json({
                status: 404,
                message: 'data Not Found Delete the Blog'
            })
        }
        return res.json({
            message: 'Successfully Delete the Blog'
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server side error Delete the Blog'
        })

    }
}
const GetBlogById = async (req, res) => {
    try {
        const { _id } = req.params;
        const BlogList = await Blog.findById(_id);
        if (!BlogList) {
            return res.status(404).json({
                status: 404,
                message: "data not found fetch the data By Id"
            })
        }
        const BlogData = {
            _id: BlogList._id,
            title: BlogList.title,
            short_description: BlogList.short_description,
            description: BlogList.description,
            images: BlogList.images
        }
        return res.status(200).json({
            status: 200,
            message: "successfully fetch the data By Id",
            data: BlogData
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "server side error fetch the data By Id"
        })

    }
}

const EditBlog = async (req, res) => {
    try {
        const { _id } = req.params;
        const { title,
            short_description,
            description
        } = req.body;
        const images = req.file ? req.file.filename : null;
        const BlogList = await Blog.findByIdAndUpdate(_id, {
            title,
            short_description,
            description,
            images
        }, { new: true })
        if (!BlogList) {
            return res.status(404).json({
                status: 404,
                message: "data Not Found Edit The Blog"
            })
        }
        return res.status(201).json({
            status: 201,
            message: "Successfully Edit the Blog",
            data: BlogList
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server side error Edit the Blog"
        })

    }
}
module.exports = { CreateBlog, GetBlog, DeleteBlog, GetBlogById ,EditBlog}