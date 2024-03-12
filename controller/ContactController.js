const Contact = require("../models/Contact");
const nodemailer = require('nodemailer');
// const CreateContact = async (req, res) => {
//     try {
//         const { name, email, mobile, subject, message } = req.body;

//         const newContact = new Contact({
//             name,
//             email,
//             mobile,
//             subject,
//             message
//         })
//         await newContact.save();
//         return res.status(201).json({
//             status: 201,
//             message: "Successfully add the Contact page",
//             data: newContact
//         })
//     } catch (error) {
//         return res.status(500).json({
//             status: 500,
//             message: "Server side error add the Contact page"
//         })
//     }
// }
const CreateContact = async (req, res) => {
    try {
        const { name, email, mobile, subject, message } = req.body;
        const newHelpingForm = new Contact({
            name, email, mobile, subject, message
        })
        await newHelpingForm.save();
        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sunilmi7891@gmail.com', // Replace with your Gmail email
                pass: 'xbiu chpv laru tvlp', // Replace with your Gmail password or an app-specific password
            },
        });

        const mailOptions = {
            from: req.body.email, // Use the email from the form data
            to: 'sunilmi7891@gmail.com',
            subject: "Contact Form",
            text: `
          Name: ${req.body.name}
          Email: ${req.body.email}
          Mobile: ${req.body.mobile}
          Message: ${req.body.message}
          Subject: ${req.body.subject}
        `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ status: 500, message: 'Server error' });
            }

            console.log('Email sent:', info.response);

            return res.status(201).json({
                status: 201,
                message: 'Successfully added the message and sent email',
                data: newmandatoryform,
            });
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ status: 500, message: 'Server error' });
    }

}

module.exports = { CreateContact }