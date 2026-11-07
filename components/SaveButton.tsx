'use client';
import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { readSaved, STORAGE_KEY } from '@/lib/event-utils';
export default function SaveButton({ eventId, compact = false }: { eventId: string; compact?: boolean }) {
 const [saved, setSaved] = useState(false);
 const [ready, setReady] = useState(false);
 useEffect(() => { setSaved(readSaved().includes(eventId)); setReady(true); }, [eventId]);
 function toggle() {
  try {
   const ids = readSaved();
   const next = ids.includes(eventId) ? ids.filter(id => id !== eventId) : [...ids, eventId];
   localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
   setSaved(next.includes(eventId));
   window.dispatchEvent(new Event('tartan-saved-updated'));
  } catch { alert('Unable to save events in this browser.'); }
 }
 return <button type="button" disabled={!ready} onClick={toggle} aria-pressed={saved} aria-label={saved ? 'Remove saved event' : 'Save event'} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />{compact ? (saved ? 'Saved' : 'Save') : (saved ? 'Saved event' : 'Save event')}</button>;
}
