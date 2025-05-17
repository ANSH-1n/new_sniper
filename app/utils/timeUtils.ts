
// File: app/utils/timeUtils.ts

/**
 * Generates time options across different timezones based on a reference date and time
 * @param date Date string in format YYYY-MM-DD
 * @param time Time string in format HH:MM
 * @returns Array of time options with timezone information
 */
export function generateTimeOptions(date: string, time: string) {
  const mainDateTime = new Date(`${date}T${time}`);

  // Handle invalid date
  if (isNaN(mainDateTime.getTime())) {
    return [];
  }

  // const timezones = [
  //   { name: 'Pacific Time (PT)', offset: -7 },
  //   { name: 'Eastern Time (ET)', offset: -4 },
  //   { name: 'Central European Time (CET)', offset: 2 },
  //   { name: 'India Standard Time (IST)', offset: 5.5 },
  //   { name: 'Japan Standard Time (JST)', offset: 9 },
  // ];






const timezones = [
  // USA & Canada
  { name: 'Pacific Time (PT)', offset: -7 },
  { name: 'Mountain Time (MT)', offset: -6 },
  { name: 'Central Time (CT)', offset: -5 },
  { name: 'Eastern Time (ET)', offset: -4 },
  { name: 'Atlantic Time (AT)', offset: -3 },

  // United Kingdom
  { name: 'British Summer Time (BST)', offset: 1 }, // During DST
  { name: 'Greenwich Mean Time (GMT)', offset: 0 }, // Non-DST

  // Europe
  { name: 'Central European Time (CET)', offset: 2 },
  { name: 'Eastern European Time (EET)', offset: 3 },
  { name: 'Moscow Standard Time (MSK)', offset: 3 }, // Russia

  // Middle East & Arab Countries
  { name: 'Arabian Standard Time (AST)', offset: 3 },
  { name: 'Gulf Standard Time (GST)', offset: 4 },

  // Asia
  { name: 'India Standard Time (IST)', offset: 5.5 },
  { name: 'Pakistan Standard Time (PKT)', offset: 5 },
  { name: 'Bangladesh Standard Time (BST)', offset: 6 },
  { name: 'Japan Standard Time (JST)', offset: 9 },
  { name: 'China Standard Time (CST)', offset: 8 },

  // Australia
  { name: 'Australian Western Standard Time (AWST)', offset: 8 },
  { name: 'Australian Central Standard Time (ACST)', offset: 9.5 },
  { name: 'Australian Eastern Standard Time (AEST)', offset: 10 },

  // New Zealand (if needed)
  { name: 'New Zealand Standard Time (NZST)', offset: 12 },
];





  return timezones.map((tz) => {
    const localTime = new Date(mainDateTime);
    localTime.setHours(localTime.getHours() + tz.offset);

    const timeString = localTime.toISOString().substr(11, 5);
    const formattedTime = localTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return {
      time: timeString,
      timezone: tz.name,
      label: `${formattedTime} (${tz.name})`,
    };
  });
}
