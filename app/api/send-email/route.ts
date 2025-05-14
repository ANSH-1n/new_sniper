// File path: app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, message } = body;
    
    // Validate that all required fields are present
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { message: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter with Gmail credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anshjamwal10102003@gmail.com',
        pass: 'ulsd cmlp qkii ephj', // App password for Gmail
      },
      secure: true,
    });

    // Format the date in a more readable format
    const formattedDate = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Create HTML email content with a professional template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
          }
          .header {
            background-color: #4a69bd;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #4a69bd;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <p>A new message has been submitted via the SniperCoders contact form on ${formattedDate}.</p>
            
            <div class="field">
              <p class="label">Name:</p>
              <p>${fullName}</p>
            </div>
            
            <div class="field">
              <p class="label">Email:</p>
              <p><a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div class="field">
              <p class="label">Phone:</p>
              <p>${phone || 'Not provided'}</p>
            </div>
            
            <div class="field">
              <p class="label">Message:</p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated message from your SniperCoders website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email sending options
    const mailOptions = {
      from: {
        name: 'SniperCoders Website',
        address: 'anshjamwal10102003@gmail.com'
      },
      to: 'anshjamwal10102003@gmail.com',
      subject: `New Contact Form Message from ${fullName}`,
      html: htmlContent,
      // Include reply-to header so you can directly reply to the person
      replyTo: email,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}