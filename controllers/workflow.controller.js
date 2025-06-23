import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { workflowClient } from '../config/upstash.js';
// import { serve } from '@upstash/workflow/express';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
// import date from 'Date'
import { subscriptionReminderEmail } from '../utility/email-template.js';
import { sendReminder } from '../utility/send.email.js'; 

const REMINDERS = [14, 7, 5, 3, 1];
export const sendReminder = async (context) => {
    const { subscriptionID } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionID);

    if(!subscription || subscription.status != 'active'){
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscription}. stopping workflow`);
        return;
    }

    for (const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }


        if(dayjs().isSame(reminderDate, 'day')){
            await triggerReminder(context , `${daysBefore} days before`.reminderDate);
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before `, subscription);  
    }
}


const fetchSubscription =  async (context, subscriptionID) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionID).populate('user', 'name email');
    })
}


const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}


const triggerReminder = async (context, label, subscription ) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        //send email, sms, push notification
        await sendReminder({
            to: subscription.user.email,
            type: label,
            subscription,
        }) 
    })
}