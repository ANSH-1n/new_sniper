
// File: app/api/agent/get-time-options/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateTimeOptions } from '../../../../app/utils/timeUtils';

export async function POST(req: NextRequest) {
  try {
    const { date, time, } = await req.json();

    if (!date || !time) {
      return NextResponse.json({ error: 'Date and time are required' }, { status: 400 });
    }

    const timeOptions = generateTimeOptions(date, time);

    return NextResponse.json({
      success: true,
      timeOptions,
    });
  } catch (error) {
    console.error('Error generating time options:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
