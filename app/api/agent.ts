

// File: pages/api/agent/confirm-meeting.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyAe-vQCwsNDCyQeVW2gFXFLgdbmNSu-MKI');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anshjamwal10102003@gmail.com',
    pass: 'ulsd cmlp qkii ephj'
  }
});

// Helper function to get AI suggestions for meeting preparation
async function getAISuggestions(name: string, date: string, time: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
    Acting as an AI meeting assistant for SniperCoders team, provide 3 brief, 
    professional suggestions for preparing for a meeting with a client named ${name} 
    scheduled on ${date} at ${time}. Format these as bullet points.
  `;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI content:', error);
    return 'Unable to generate AI suggestions at this time.';
  }
}

// Helper function to create a professional email template for the client
function createClientEmailTemplate(name: string, date: string, selectedTime: string, medium: string, aiSuggestions: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(to right, #0f0c29, #302b63, #24243e); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">Meeting Confirmed!</h1>
      </div>
      <div style="border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
        <p>Hello ${name},</p>
        <p>Thank you for scheduling a meeting with SniperCoders! We're excited to connect with you.</p>
        <p>Your ${medium} meeting has been confirmed for:</p>
        <p style="font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          Date: ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
          Time: ${selectedTime}
        </p>
        <p>To help you prepare for our discussion, our AI assistant has provided some helpful tips:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #302b63; margin: 15px 0;">
          ${aiSuggestions}
        </div>
        <p>If you need to reschedule or have any questions before our meeting, please don't hesitate to reach out to us.</p>
        <p>We look forward to speaking with you!</p>
        <p>Best regards,<br>The SniperCoders Team</p>
        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; font-size: 12px; color: #777;">
          <p>SniperCoders - Professional Web Development & Software Solutions</p>
        </div>
      </div>
    </div>
  `;
}

// Helper function to create a team notification email template
function createTeamEmailTemplate(name: string, email: string, date: string, selectedTime: string, medium: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(to right, #0f0c29, #302b63, #24243e); color: white; padding: 15px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0;">📅 New Meeting Alert</h2>
      </div>
      <div style="border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
        <p>A new meeting has been scheduled through your AI booking system.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Client Details:</strong></p>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
            <li><strong>Time:</strong> ${selectedTime}</li>
            <li><strong>Meeting Type:</strong> ${medium}</li>
          </ul>
        </div>
        <p>Please prepare for this meeting and add it to your calendar. Consider reaching out to the client beforehand to confirm any specific topics they would like to discuss.</p>
        <p>This meeting was booked through the automated scheduling system on your website.</p>
      </div>
    </div>
  `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { name, email, date, selectedTime, medium } = req.body;
    
    if (!name || !email || !date || !selectedTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Get AI suggestions for the meeting
    const aiSuggestions = await getAISuggestions(name, date, selectedTime);
    
    // Send confirmation email to the client
    await transporter.sendMail({
      from: 'SniperCoders Team <anshjamwal10102003@gmail.com>',
      to: email,
      subject: `Your Meeting Confirmation with SniperCoders Team`,
      html: createClientEmailTemplate(name, date, selectedTime, medium || 'scheduled', aiSuggestions)
    });
    
    // Send notification email to the SniperCoders team
    await transporter.sendMail({
      from: 'Meeting System <anshjamwal10102003@gmail.com>',
      to: 'anshjamwal10102003@gmail.com', // Team email
      subject: `New Meeting: ${name} - ${new Date(date).toLocaleDateString()}`,
      html: createTeamEmailTemplate(name, email, date, selectedTime, medium || 'scheduled')
    });
    
    return res.status(200).json({ 
      success: true,
      message: 'Meeting confirmed and emails sent',
      email: email // Return the email for confirmation in the UI
    });
  } catch (error) {
    console.error('Error confirming meeting:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}