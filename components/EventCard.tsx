import Link from 'next/link';
import { Clock3, MapPin, ArrowRight } from 'lucide-react';
import ShareEventButton from './ShareEventButton';
import type { CampusEvent } from '@/data/events';
import { formatDate } from '@/lib/event-utils';
import SaveButton from './SaveButton';
import EventStatusBadge from './EventStatus';
export default function EventCard({event}:{event:CampusEvent}) {
 const cancelled=event.status==='cancelled';
 const month=formatDate(event.startTime,{month:'short'});
 const day=formatDate(event.startTime,{day:'numeric'});
 const timeStart=formatDate(event.startTime,{hour:'numeric',minute:'2-digit'});
 const timeEnd=formatDate(event.endTime,{hour:'numeric',minute:'2-digit'});
 return <article className={`event-card ${cancelled?'opacity-70':''}`}>
  <div className="ev-top">
   <div className="ev-cal" aria-hidden="true"><div className="ev-cal-month">{month}</div><div className="ev-cal-day">{day}</div></div>
   <div className="ev-main">
    <Link href={`/events/${encodeURIComponent(event.id)}`} className="hover:text-[var(--tartan-red)]"><h3 className={`event-title ${cancelled?'line-through':''}`}>{event.title}</h3></Link>
    <div className="event-meta"><span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true"/>{timeStart} – {timeEnd}</span><span className="inline-flex min-w-0 items-center gap-1.5"><MapPin size={15} className="shrink-0" aria-hidden="true"/><span className="break-words">{event.location}</span></span></div>
    <div className="mt-2.5 flex flex-wrap items-center gap-2"><span className="rounded-md bg-[#fdeef0] px-2.5 py-1 text-xs font-bold text-[#a60e2a]">{event.category}</span><EventStatusBadge status={event.status}/></div>
    {event.status==='changed' && event.changeNote && <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900"><strong>Updated:</strong> {event.changeNote}</p>}
    <div className="mt-3 flex flex-wrap gap-2"><SaveButton eventId={event.id} compact/><Link href={`/events/${encodeURIComponent(event.id)}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--line)] px-3 text-xs font-bold hover:bg-[var(--chip)]">Details <ArrowRight size={14}/></Link><ShareEventButton id={event.id} title={event.title}/></div>
   </div>
  </div>
 </article>;
}
