const About = require("../models/About");

const CreateAboutPage = async (req, res) => {
    try {
        const { title, about } = req.body;
        const images = req.file ? req.file.filename : null;

        const newAboutPage = new About({
            title,
            about,
            images
        })
        await newAboutPage.save();
        return res.status(201).json({
            status: 201,
            message: "successfully Add the About Page",
            data: newAboutPage
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "server side error Add the About Page"
        })
    }
}

const GetAboutPage = async (req, res) => {
    try {
        const AboutPage = await About.find();
        if (AboutPage.length > 0) {
            const AboutPageData = AboutPage.map((AboutPageResult) => ({
                _id: AboutPageResult._id,
                title: AboutPageResult.title,
                about: AboutPageResult.about,
                images: AboutPageResult.images
            }))
            return res.status(201).json({
                status: 201,
                message: "successully Fetch the AboutPage Data"
                , data: AboutPageData
            })
        }
        return res.status(404).json({
            status: 404,
            message: "data not Found Fetch the AboutPage Data"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "server side error Fetch the AboutPage Data"
        })

    }
}

const DeleteAboutPage = async (req, res) => {
    try {
        const { _id } = req.params;
        const AboutPageDelete = await About.findByIdAndDelete(_id);
        if (!AboutPageDelete) {
            return res.status(404).json({
                status: 404,
                message: "Data Not found delete the About Page"
            })
        } else {
            return res.status(200).json({
                status: 200,
                message: "successfully delete the About Page"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "server side error delete the About Page"
        })
    }

}

const GetAboutPageById = async (req, res) => {
    try {
        const { _id } = req.params;
        const AboutPage = await About.findById(_id);
        if (!AboutPage) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found the Get About Page By Id"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Successfully the Get About Page By Id"
            , data: AboutPage
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server side error the Get About Page By Id"
        })

    }
}

const EditAboutPage = async (req, res) => {
    try {
        const { _id } = req.params;
        const { title, about } = req.body;
        const images = req.file ? req.file.filename : null;
        const AboutPage = await About.findByIdAndUpdate(_id, { title, about, images }, { new: true })
        if (!AboutPage) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found Edit About Page"
            })
        }
        return res.status(201).json({
            status: 201,
            message: "Successfully Edit About Page",
            data: AboutPage
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server side error Edit About Page"
        })
    }
}

module.exports = { CreateAboutPage, GetAboutPage, DeleteAboutPage, GetAboutPageById, EditAboutPage }