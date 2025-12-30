import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

const run = async () => {
  try {
    await transporter.verify();
    console.log("Transporter verified: ready to send emails");
  } catch (err) {
    console.error("Transporter verify error:", err && err.message ? err.message : err);
  }
};

run();
