'use client';
import { MessageCircle } from 'lucide-react';
export default function ShareEventButton({id,title}:{id:string;title:string}){
 function share(){const url=`${window.location.origin}/events/${encodeURIComponent(id)}`;const text=`Check out this CMU-Africa event!\n\n${title}\n\n${url}`;window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');}
 return <button type="button" onClick={share} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--line)] px-3 text-xs font-bold hover:bg-[var(--chip)]"><MessageCircle size={15}/> Share</button>;
}
