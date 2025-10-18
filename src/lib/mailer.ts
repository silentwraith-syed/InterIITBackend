import nodemailer from 'nodemailer'

// Create transporter with proper configuration
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465, // true for 465, false for other ports
  auth: { 
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS 
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000
})

// Verify connection on startup (with error handling)
transporter.verify((error, success) => {
  if (error) {
    console.error('⚠️  SMTP Connection Error:', error.message)
    console.error('Please check your SMTP credentials in environment variables')
  } else {
    console.log('✅ SMTP Server is ready to send emails')
  }
})