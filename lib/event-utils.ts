import type { CampusEvent } from '@/data/events';
export const TIME_ZONE = 'Africa/Kigali';
export function formatDate(value: string, options: Intl.DateTimeFormatOptions = {}) {
 return new Intl.DateTimeFormat('en', { timeZone: TIME_ZONE, ...options }).format(new Date(value));
}
export function kigaliDayKey(date: Date) {
 return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}
export function dateParts(date: Date) {
 const parts = new Intl.DateTimeFormat('en', { timeZone: TIME_ZONE, year:'numeric', month:'numeric', day:'numeric' }).formatToParts(date);
 const val = (name: string) => Number(parts.find(p => p.type === name)?.value);
 return { year: val('year'), month: val('month'), day: val('day') };
}
export function dayIndex(date: Date) {
 const p = dateParts(date);
 return Math.floor(Date.UTC(p.year, p.month-1, p.day) / 86400000);
}
export function inRange(event: CampusEvent, range: string, now = new Date()) {
 const start = dayIndex(new Date(event.startTime));
 const end = dayIndex(new Date(event.endTime));
 const today = dayIndex(now);
 if (end < today) return false;
 if (range === 'Today') return start <= today && end >= today;
 if (range === 'This week') return start <= today + 6 && end >= today;
 if (range === 'Next week') return start <= today + 13 && end >= today + 7;
 const p = dateParts(now);
 const monthStart = Math.floor(Date.UTC(p.year, p.month-1, 1)/86400000);
 const monthEnd = Math.floor(Date.UTC(p.year, p.month, 0)/86400000);
 return start <= monthEnd && end >= Math.max(today, monthStart);
}
export function calendarUrl(event: CampusEvent) {
 const utc = (date: string) => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
 const params = new URLSearchParams({ action: 'TEMPLATE', text: event.title, dates: `${utc(event.startTime)}/${utc(event.endTime)}`, details: event.description, location: event.location, ctz: TIME_ZONE });
 return `https://calendar.google.com/calendar/render?${params}`;
}
export const STORAGE_KEY = 'tartan-now-saved';
export function readSaved(): string[] {
 try { const v = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; }
 catch { return []; }
}

// Standards-based iCalendar file supported by Apple Calendar, Outlook, and others.
export function buildIcs(event: CampusEvent): string {
 const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
 const stamp = (value: string) => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
 const lines = [
  'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Tartan Now//Campus Events//EN',
  'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
  `UID:${event.id.replace(/[^a-zA-Z0-9_-]/g, '-')}@tartan-now`,
  `DTSTAMP:${stamp(new Date().toISOString())}`,
  `DTSTART:${stamp(event.startTime)}`, `DTEND:${stamp(event.endTime)}`,
  `SUMMARY:${escape(event.title)}`, `DESCRIPTION:${escape(event.description)}`,
  `LOCATION:${escape(event.location)}`, 'END:VEVENT', 'END:VCALENDAR'
 ];
 return lines.join('\r\n') + '\r\n';
}
