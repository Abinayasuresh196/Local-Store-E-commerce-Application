import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    // Create transporter with optional TLS relax for non-production
    const transportConfig = {
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };

    if (process.env.NODE_ENV !== "production") {
      transportConfig.tls = { rejectUnauthorized: false };
    }

    const transporter = nodemailer.createTransport(transportConfig);

    // Email options
    const mailOptions = {
      from: `"Local Store" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);
  }
};

export default sendEmail;
