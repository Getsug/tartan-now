import type { CampusEvent } from '@/data/events';
import { kigaliDayKey, dayIndex } from './event-utils';
export type DayGroup = { dateKey: string; events: CampusEvent[] };
export function groupByDate(events: CampusEvent[]): DayGroup[] {
 const buckets = new Map<string, CampusEvent[]>();
 for (const event of events) {
  const key = kigaliDayKey(new Date(event.startTime));
  if (!buckets.has(key)) buckets.set(key, []);
  buckets.get(key)!.push(event);
 }
 return [...buckets.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([dateKey,items])=>({dateKey,events:items.sort((a,b)=>Date.parse(a.startTime)-Date.parse(b.startTime))}));
}
export function labelForDate(dateKey: string, now: Date): string {
 const date = new Date(`${dateKey}T12:00:00+02:00`);
 const text = new Intl.DateTimeFormat('en',{weekday:'short',month:'short',day:'numeric',timeZone:'Africa/Kigali'}).format(date);
 const delta = dayIndex(date)-dayIndex(now);
 if (delta===0) return `Today · ${text}`;
 if (delta===1) return `Tomorrow · ${text}`;
 return text;
}
