'use client';
import { useEffect, useMemo, useState } from 'react';
import { Bookmark, CalendarDays, Search, X } from 'lucide-react';
import type { CampusEvent } from '@/data/events';
import { inRange, readSaved, formatDate } from '@/lib/event-utils';
import { groupByDate, labelForDate } from '@/lib/groupEvents';
import EventCard from './EventCard';
import Image from "next/image";
import Link from "next/link";

const ranges=['Today','This week','Next week','This month'];
const categories=['All interests','Tech','Career','Social','Wellness','Arts','Clubs'];
export default function EventBoard({events}:{events:CampusEvent[]}) {
 const [range,setRange]=useState('Today');
 const [category,setCategory]=useState('All interests');
 const [query,setQuery]=useState('');
 const [savedOnly,setSavedOnly]=useState(false);
 const [saved,setSaved]=useState<string[]>([]);
 const [now,setNow]=useState<Date|null>(null);
 useEffect(()=>{const refresh=()=>setSaved(readSaved());setNow(new Date());refresh();window.addEventListener('storage',refresh);window.addEventListener('tartan-saved-updated',refresh);return()=>{window.removeEventListener('storage',refresh);window.removeEventListener('tartan-saved-updated',refresh);};},[]);
 const visible=useMemo(()=>events.filter(e=>{
  const statusLabels={normal:'scheduled',new:'new',changed:'updated changed schedule changes',cancelled:'cancelled canceled',full:'full'};
  const matchesSearch=[e.title,e.location,e.category,...(e.tags||[]),statusLabels[e.status]].join(' ').toLowerCase().includes(query.trim().toLowerCase());
  const matchesCategory=category==='All interests'||e.category===category;
  return matchesSearch && matchesCategory && (savedOnly?saved.includes(e.id):now!==null&&inRange(e,range,now));
 }).sort((a,b)=>Date.parse(a.startTime)-Date.parse(b.startTime)),[events,savedOnly,saved,category,query,now,range]);
 const groups=groupByDate(visible);
 const clearFilters=()=>{setRange('Today');setCategory('All interests');setQuery('');setSavedOnly(false);};
 const timestamps=events.map(e=>Date.parse(e.updatedAt)).filter(Number.isFinite);
 const latest=timestamps.length?Math.max(...timestamps):null;
 return <>
  <header className="sticky top-0 z-20 bg-[var(--tartan-red)] text-white shadow-sm"><div className="mx-auto max-w-5xl px-4 pb-3 pt-3 sm:px-6"><div className="flex items-center justify-between gap-3"><Link href="/" className="flex min-w-0 items-center gap-3">
  <Image
    src="/logo/scotty.png"
    alt="Tartan Now logo"
    width={40}
    height={40}
    className="h-10 w-10 shrink-0 object-contain"
    priority
  />
  <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
    Tartan Now
  </span>
</Link><button type="button" onClick={()=>setSavedOnly(x=>!x)} aria-pressed={savedOnly} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-white/40 px-3 text-xs font-bold sm:text-sm ${savedOnly?'bg-white text-[var(--tartan-red)]':'bg-white/10 text-white'}`}><Bookmark size={16}/> Saved ({saved.length})</button></div><label htmlFor="event-search" className="sr-only">Search events</label><div className="relative mt-3"><Search size={19} className="absolute left-3 top-3.5 text-[#777]"/><input id="event-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title, location, category, tags..." className="min-h-11 w-full min-w-0 rounded-xl bg-white pl-10 pr-4 text-sm text-[var(--ink)] outline-none placeholder:text-[#777]"/></div></div></header>
  <main className="mx-auto max-w-5xl px-4 pb-16 pt-5 sm:px-6"><p className="mb-4 text-xs text-[var(--muted)]">{latest!==null?`Last updated ${formatDate(new Date(latest).toISOString(),{dateStyle:'medium',timeStyle:'short'})} · Kigali time`:'No event updates yet'}</p>
   <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Date range">{ranges.map(r=><button key={r} type="button" aria-pressed={!savedOnly&&range===r} onClick={()=>{setRange(r);setSavedOnly(false);}} className="filter-chip">{r}</button>)}</div>
   <div className="mt-1 flex gap-2 overflow-x-auto pb-2" aria-label="Interest category">{categories.map(c=><button key={c} type="button" aria-pressed={category===c} onClick={()=>setCategory(c)} className="filter-chip">{c}</button>)}</div>
   <div className="mt-3 flex justify-end"><button type="button" onClick={clearFilters} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--line)] bg-white px-4 text-sm font-bold text-[var(--ink)] hover:bg-[var(--chip)]"><X size={15}/> Clear filters</button></div>
   <div className="mb-5 mt-3 flex flex-wrap items-center justify-between gap-2"><h1 className="text-lg font-extrabold">{savedOnly?'Saved events':'Campus events'}</h1><span className="text-xs text-[var(--muted)]">{visible.length} {visible.length===1?'event':'events'}</span></div>
   {groups.length?groups.map(group=><section key={group.dateKey} className="daygroup"><h2 className="daygroup-heading"><span>{labelForDate(group.dateKey,now||new Date())}</span><span className="daygroup-count">{group.events.length}</span></h2><div>{group.events.map(e=><EventCard key={e.id} event={e}/>)}</div></section>):<div className="rounded-2xl border border-dashed border-[var(--line)] bg-white px-5 py-14 text-center"><CalendarDays size={34} className="mx-auto text-[var(--muted)]"/><h2 className="mt-3 text-lg font-bold">No events match your filters</h2><p className="mt-2 text-sm text-[var(--muted)]">Try another date or interest.</p><button type="button" onClick={clearFilters} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--tartan-red)] px-5 text-sm font-bold text-white"><X size={16}/> Clear filters</button></div>}
   <p className="mt-9 text-center text-xs text-[var(--muted)]">All event times are shown in Kigali time (CAT, UTC+2).</p>
  </main>

  <footer className="border-t border-[var(--line)] bg-[#faf8f6] px-4 py-6">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center">
      <p className="text-sm text-[var(--muted)]">
        Built for Tartans, by a Tartan.
      </p>

      <p className="text-sm font-semibold text-[var(--ink)]">
        Created by Herbert Okuthe
      </p>

      <p className="text-xs text-[var(--muted)]">
        © 2026 Tartan Now · A student-led initiative
      </p>
    </div>
  </footer>
 </>;
}
