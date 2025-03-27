const nodemailer = require("nodemailer");


exports.SendEmail=async(options)=>{

        const transporter = nodemailer.createTransport({
            host:process.env.SMTP_host,
            port:process.env.SMTP_port,
            service:process.env.SMTP_service, // true for port 465, false for other ports
        auth: {
            user: process.env.SMTP_email,
            pass: process.env.SMTP_password,
        },
        });

        try {
            // Send mail with the defined transport object
            const info = await transporter.sendMail({
              from: process.env.SMTP_email,   // Sender address
              to: options.email,              // List of receivers
              subject: options.subject,       // Subject line
              text: options.message,          // Plain text body
              // html: "<b>Hello world?</b>",  // Uncomment to send HTML email
            });
        
            console.log("Message sent: %s", info.messageId);
            return { success: true, message: `Message sent: ${info.messageId}` };  // Return success
          } catch (error) {
            console.error("Error sending email:", error);
            return { success: false, message: error.message };  // Return error message
          }
}