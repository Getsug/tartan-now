import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock3, MapPin, Users } from 'lucide-react';
import { events, getEvent } from '@/data/events';
import { formatDate } from '@/lib/event-utils';
import EventActions from '@/components/EventActions';
import EventStatusBadge from '@/components/EventStatus';
type Props = {params:Promise<{id:string}>};
export function generateStaticParams(){return events.map(e=>({id:e.id}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {id}=await params;const e=getEvent(id);if(!e)return {title:'Event not found'};return {title:`${e.title} | Tartan Now`,description:e.description,openGraph:{title:e.title,description:e.description,type:'article',...(e.image?{images:[e.image]}:{})}};}
export default async function EventPage({params}:Props){
 const {id}=await params;const event=getEvent(id);if(!event)notFound();
 return <><header className="border-b border-red-900 bg-[var(--tartan-red)] text-white"><div className="mx-auto max-w-6xl px-4 py-4 sm:px-6"><Link href="/" className="text-2xl font-extrabold">Tartan Now<span className="text-red-200">.</span></Link><p className="text-xs font-medium text-red-100">Carnegie Mellon University Africa</p></div></header>
 <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6"><Link href="/" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[var(--tartan-red)]"><ArrowLeft size={18}/> Back to events</Link>
 <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]"><section className="min-w-0">
 {event.image && <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl bg-stone-200"><Image src={event.image} alt={event.imageAlt || `Photo for ${event.title}`} fill sizes="(max-width: 1023px) 100vw, 700px" className="object-cover" priority/></div>}
 <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[var(--tartan-red)]">{event.category}</span><EventStatusBadge status={event.status}/></div>
 <h1 className={`mt-4 break-words text-3xl font-extrabold tracking-tight text-stone-950 sm:text-4xl ${event.status==='cancelled'?'line-through':''}`}>{event.title}</h1>
 {event.status==='changed' && event.changeNote && <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900"><strong>Event updated:</strong> {event.changeNote}</p>}
 <div className="mt-7 space-y-4 rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-700"><p className="flex items-start gap-3"><CalendarDays size={20} className="shrink-0"/>{formatDate(event.startTime,{dateStyle:'full'})}</p><p className="flex items-start gap-3"><Clock3 size={20} className="shrink-0"/><span><strong>Start:</strong> {formatDate(event.startTime,{timeStyle:'short'})}<span className="mx-2 text-stone-400">·</span><strong>End:</strong> {formatDate(event.endTime,{timeStyle:'short'})} (Kigali time)</span></p><p className="flex items-start gap-3"><MapPin size={20} className="shrink-0"/><span className="break-words">{event.location}</span></p><p className="flex items-start gap-3"><Users size={20} className="shrink-0"/>{event.organizer}</p></div>
 <h2 className="mt-8 text-xl font-bold">About this event</h2><p className="mt-3 whitespace-pre-line break-words leading-7 text-stone-600">{event.description}</p><p className="mt-7 text-xs text-stone-500">Last updated: {formatDate(event.updatedAt,{dateStyle:'medium',timeStyle:'short'})} (Kigali time)</p>
 </section><EventActions event={event}/></div></main></>;
}
