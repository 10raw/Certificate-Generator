const express = require('express')
const upload = require('express-fileupload')
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

// router.post('/',(req,res)=>{
//     var file = req.files.file
//     var csv= req.files.csv
//     console.log(file.name)
//     console.log(csv.name);
//     res.send({message:"File Uploaded"})
//     file.mv("./uploads/"+file.name);
//     file.mv("./uploads/"+csv.name);
// })


router.post('/api',async(req,res)=>{

    const data = req.body;
    // console.log(req.body.csvData)
    // console.log(req.body.key)
    console.log('string',data);

    // console.log(typeof data)
    console.log(typeof data.csvData)
    console.log(data.csvData)
    var csvobj=data.csvData
    // data.splice(-1)

    var arrayLength = csvobj.length;
    var address=""
for (var i = 0; i < arrayLength; i=i+1) {
    console.log((csvobj[i]).split(",")[2])
    address=(csvobj[i]).split(",")[2]+","+address
    str = address.replace(/,\s*$/, "");
    //Do something
}

console.log(address)
console.log(str)


 
 

    // console.log(data.key);
    // console.log(typeof(data))
    // res.json({message:req})

    
    // req.files.file.mv("./uploads"+filen2,function(err){
    //     if(err){
    //         console.log("error")
    //     } else{
    //         console.log("file uploaded")
    //     }
    // })
    // const email = req.body;
    //  console.log(email.email)
        // create reusable transporter object using the default SMTP transport
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: 'dummyacc012345689@gmail.com', // generated ethereal user
        pass: 'dummy@321', // generated ethereal password
        },
    });
    const msg = {
        from: '" from dsc 👻" <dummy0123456789@gmail.com>',
        to: address, 
        subject: "Hello ✔", // Subject line
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent turpis neque, placerat sed vestibulum sit amet, lacinia eget ante. Vivamus pulvinar eu eros quis rhoncus. Pellentesque interdum risus quis urna posuere auctor et sit amet eros. Suspendisse facilisis lacinia eros sed accumsan. Ut rhoncus orci sit amet tempus pulvinar. ", // plain text body
        html: "<h1>Congratulations you have earned Certificate</h3>  ", // html body
        attachments: [{
            filename: 'image.png',
            path: data.img
        }]
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        console.log("email sent")
})


module.exports = router;