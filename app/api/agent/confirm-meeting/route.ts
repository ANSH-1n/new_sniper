

// File: app/api/agent/confirm-meeting/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getAISuggestions } from '../../../../app/utils/aiUtils';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anshjamwal10102003@gmail.com',
    pass: 'ulsd cmlp qkii ephj',
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, date, selectedTime, medium } = await request.json();

    if (!name || !email || !date || !selectedTime || !medium) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const aiSuggestions = await getAISuggestions(name, date, selectedTime);

    await transporter.sendMail({
      from: `SniperCoders Team <anshjamwal10102003@gmail.com>`,
      to: email,
      subject: 'Your Meeting Confirmation with SniperCoders',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #0f0c29, #302b63, #24243e); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Meeting Confirmed!</h1>
          </div>
          <div style="border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
            <p>Hello ${name},</p>
            <p>Your ${medium} meeting with SniperCoders has been successfully scheduled. Please be prepared to join us:</p>
            <p style="font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              Date: ${new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}<br>
              Time: ${selectedTime}<br>
              Medium: ${medium.charAt(0).toUpperCase() + medium.slice(1)}
            </p>
            <p>We’re excited to connect with you! Our AI assistant has prepared some tips to help you get ready:</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #302b63; margin: 15px 0;">
              ${aiSuggestions}
            </div>
            <p>If you need to reschedule or have any questions, please reply to this email or contact us at snipercoders@25gmail.com</p>
            <p>Best regards,<br>The SniperCoders Team</p>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `Meeting System <anshjamwal10102003@gmail.com>`,
      to: 'anshjamwal10102003@gmail.com',
      subject: `New ${medium} Meeting Scheduled with ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Meeting Alert</h2>
          <p>A new ${medium} meeting has been scheduled through the SniperCoders AI booking system.</p>
          <ul>
            <li><strong>Client Name:</strong> ${name}</li>
            <li><strong>Client Email:</strong> ${email}</li>
            <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${selectedTime}</li>
            <li><strong>Medium:</strong> ${medium.charAt(0).toUpperCase() + medium.slice(1)}</li>
          </ul>
          <p>Please prepare for this meeting and add it to your calendar.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Meeting confirmed and emails sent',
    });
  } catch (error) {
    console.error('Error confirming meeting:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
