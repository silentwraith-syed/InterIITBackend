import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465, // true for 465, false for other ports
  auth: { 
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS 
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates in development
  }
})