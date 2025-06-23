// Subscription Renewal Reminder Email Template

export const subscriptionReminderEmail = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    accountSettingsLink,
    supportLink,
    daysLeft
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Subscription Renewal Reminder</title>
        <style>
            body {
                background: #f6f8fb;
                font-family: 'Segoe UI', Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                background: #fff;
                max-width: 520px;
                margin: 40px auto;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.07);
                padding: 32px 24px;
            }
            .header {
                text-align: center;
                padding-bottom: 16px;
                border-bottom: 1px solid #eaeaea;
            }
            .header h1 {
                color: #2d3748;
                margin: 0;
                font-size: 1.8em;
            }
            .content {
                padding: 24px 0;
                color: #444;
                font-size: 1.1em;
            }
            .details {
                background: #f1f5f9;
                border-radius: 6px;
                padding: 16px;
                margin: 16px 0;
                font-size: 1em;
            }
            .details strong {
                color: #2b6cb0;
            }
            .btn {
                display: inline-block;
                background: #3182ce;
                color: #fff;
                text-decoration: none;
                padding: 12px 28px;
                border-radius: 5px;
                font-weight: 600;
                margin-top: 18px;
                transition: background 0.2s;
            }
            .btn:hover {
                background: #225ea8;
            }
            .footer {
                text-align: center;
                color: #888;
                font-size: 0.95em;
                margin-top: 32px;
            }
            .support-link {
                color: #3182ce;
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Subscription Renewal Reminder</h1>
            </div>
            <div class="content">
                <p>Hi <strong>${userName}</strong>,</p>
                <p>
                    This is a reminder that your subscription <strong>${subscriptionName}</strong> 
                    (<span style="color:#2b6cb0;">${planName}</span> plan) will renew in <strong>${daysLeft} day${daysLeft === 1 ? '' : 's'}</strong>.
                </p>
                <div class="details">
                    <p><strong>Renewal Date:</strong> ${renewalDate}</p>
                    <p><strong>Plan:</strong> ${planName}</p>
                    <p><strong>Amount:</strong> ${price}</p>
                    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                </div>
                <p>
                    If you wish to manage or cancel your subscription, please use the button below:
                </p>
                <a href="${accountSettingsLink}" class="btn">Manage Subscription</a>
                <p style="margin-top:24px;">
                    Need help? <a href="${supportLink}" class="support-link">Contact Support</a>
                </p>
            </div>
            <div class="footer">
                <p>
                    If you have any questions, just reply to this email.<br>
                    Thank you for using our service!
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
}