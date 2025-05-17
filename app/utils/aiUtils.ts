// File: app/utils/aiUtils.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAe-vQCwsNDCyQeVW2gFXFLgdbmNSu-MKI");

export async function getAISuggestions(
  name: string,
  date: string,
  time: string
) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // const prompt = `
  //   Acting as an AI meeting assistant for SniperCoders team, provide 3 brief,
  //   professional suggestions for preparing for a meeting with a client named ${name}
  //   scheduled on ${date} at ${time}. Format these as bullet points.
  // `;



  const prompt = `
You are an AI meeting assistant for the SniperCoders team. 

A meeting is scheduled with a client named ${name} on ${date} at ${time}. 

Your tasks:

1. Provide 3 brief, professional suggestions to help prepare for the meeting.
2. Suggest 3 alternative meeting times within a 3-hour window around the original time (1 hour before and 2 hours after), formatted as bullet points in 12-hour format with AM/PM. Include the current time zone in parentheses.

Be clear, concise, and professional. Use bullet points for both sections.
`;



  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI content:", error);
    return `
      - Review the agenda and prepare any relevant materials.
      - Ensure a stable internet connection for the meeting.
      - Arrive a few minutes early to the meeting.
    `;
  }
}
