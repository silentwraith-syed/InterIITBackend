import nodemailer from 'nodemailer'

// Create transporter with proper configuration
// For production on Render, use SendGrid instead of Gmail
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // Use TLS
  auth: { 
    user: process.env.SMTP_USER || 'apikey', // SendGrid uses 'apikey' as username
    pass: process.env.SMTP_PASS 
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000
})

// Verify connection on startup (with error handling)
if (process.env.SMTP_PASS) {
  transporter.verify((error, success) => {
    if (error) {
      console.error('⚠️  SMTP Connection Error:', error.message)
      console.error('Please check your SMTP credentials in environment variables')
      console.error('For Render deployment, use SendGrid instead of Gmail')
    } else {
      console.log('✅ SMTP Server is ready to send emails')
    }
  })
} else {
  console.warn('⚠️  SMTP credentials not configured. Email sending will be disabled.')
}