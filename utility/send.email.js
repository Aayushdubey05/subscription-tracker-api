import dayjs from "dayjs";
import { getUserSubscriptions } from "../controllers/subscription.controller.js";
import  transporter ,{ accountEmail } from "../config/nodemailer.js";
import { subscriptionReminderEmail } from "./email-template.js";
import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";

export const sendReminder = async ({ to,type, subscription }) => {
    if(!to || !type) throw new Error('Missing required parameter ');
    
    const template = subscriptionReminderEmail.find((t) => t.label === type);

    if(!template) throw new Error('Invalid email type');

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);


    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.log(error, 'error sending email');

        console.log('email sent: '+ info.response);
    })
}