var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var path = require('path');

var app = new express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({
    origin: true,
    credentials: true
}));

app.get('/getGamerForum', function(require, response) {
    var card = [
        {
            url: 'https://i.pinimg.com/236x/a7/01/92/a70192185abd67796b0b3eb2ae7c36d3--the-she-she-is.jpg',
            username: '',
            bio: '',
        }
    ]
}

)


app.post('/sendEmail', function (request, response) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'emmi.cortez2@gmail.com', // generated ethereal user
                pass: '@Collegebound1' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'emmi.cortez2@gmail.com', // sender address
            to: 'emmi.cortez2@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            template: 'index',
            context: {
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                email: request.body.email,
                comments: request.body.comments,
            }
        };

        let handlebarsOptions = {
            viewEngine: 'handlebars',
            viewPath: path.resolve('./template'),
            extName: '.html'
        }

        transporter.use('compile', hbs(handlebarsOptions));

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

    response.status(200).send('ok');
});


app.listen(8080, function () {
    console.log('my server is listening on localhost:8080');
})