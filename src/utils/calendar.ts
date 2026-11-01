export function generateICS(title: string, date: string, startTime: string, endTime: string, location: string, description: string): string {
  const startDate = date.replace(/-/g, '');
  const start = `${startDate}T${startTime.replace(':', '')}00`;
  const end = `${startDate}T${endTime.replace(':', '')}00`;
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ora Studio//Class Booking//EN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadICS(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getNextDateForDay(dayName: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const targetDay = days.indexOf(dayName);
  const currentDay = today.getDay();
  let daysUntil = targetDay - currentDay;
  if (daysUntil <= 0) daysUntil += 7;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysUntil);
  return targetDate.toISOString().split('T')[0];
}

export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const totalMinutes = h * 60 + m + minutes;
  const newH = Math.floor(totalMinutes / 60) % 24;
  const newM = totalMinutes % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}
