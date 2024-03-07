// const nodemailer = require('nodemailer');

// async function sendNotificationToUser(user, message) {
//   try {
//     // Create a nodemailer transporter with your email service configuration
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'your-email@gmail.com',
//         pass: 'your-email-password',
//       },
//     });

//     // Define the email options
//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       to: user,
//       subject: 'Notification',
//       text: message,
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Notification sent to ${user}: ${message}`);
//   } catch (error) {
//     console.error('Error sending notification:', error);
//   }
// }
// module.exports =  sendNotificationToUser