const nodemailer = require('nodemailer');
const queue = require('./queue')

const mail = (function() {
    'use strict';

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        }
      });

    const mailOptions = {
        from: 'do_not_reply@northpole.com',
        to: 'santa@northpole.com',
        subject: 'Message to santa',
      };
      
    function send() {
        const messages = queue.getQueue()

        messages.forEach((message) => {
            mailOptions.html = message
            transporter.sendMail(mailOptions)
        })
    }


    return {
        send: send,
    };
  })();
  
  module.exports = mail;
