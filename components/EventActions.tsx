'use client';
import { CalendarPlus, Download, MessageCircle, ExternalLink } from 'lucide-react';
import type { CampusEvent } from '@/data/events';
import { calendarUrl, buildIcs } from '@/lib/event-utils';
import SaveButton from './SaveButton';
export default function EventActions({event}:{event:CampusEvent}) {
 const cancelled = event.status === 'cancelled';
 const full = event.status === 'full';
 const registration = full ? event.waitlistUrl : event.registrationUrl;
 function downloadAppleCalendar() {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.id.replace(/[^a-zA-Z0-9_-]/g, '-')}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
 }
 function share() {
  const message = `Check out this CMU-Africa event!\n\n${event.title}\n\n${window.location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
 }
 return <aside className="h-fit min-w-0 space-y-3 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm lg:sticky lg:top-6"><h2 className="text-lg font-bold">Plan your visit</h2>
 {cancelled ? <p className="rounded-xl bg-red-50 p-3 font-semibold text-red-800">This event has been cancelled.</p> : registration ? <a href={registration} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-800 px-4 text-center text-sm font-bold text-white hover:bg-red-900">{full ? 'Join waitlist' : 'Register for event'}<ExternalLink size={17}/></a> : <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{full ? 'This event is full.' : 'No registration link provided.'}</p>}
 <SaveButton eventId={event.id}/>
 {!cancelled && <a href={calendarUrl(event)} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--line)] px-4 text-sm font-bold hover:bg-slate-50"><CalendarPlus size={18}/> Add to Google Calendar</a>}
 {!cancelled && <button type="button" onClick={downloadAppleCalendar} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[var(--line)] px-4 text-sm font-bold hover:bg-slate-50"><Download size={18}/> Add to Apple Calendar (.ics)</button>}
 <button type="button" onClick={share} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-green-700 bg-green-50 px-4 text-sm font-bold text-green-800 hover:bg-green-100"><MessageCircle size={18}/> Share on WhatsApp</button>
 <p className="text-xs leading-5 text-slate-500">Registration opens the organizer&apos;s form. Saving an event here does not reserve a seat.</p></aside>;
}
