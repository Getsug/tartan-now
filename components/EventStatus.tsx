import type { EventStatus } from '@/data/events';
const styles:Record<EventStatus,string>={normal:'bg-stone-100 text-stone-700',new:'bg-green-100 text-green-800',changed:'bg-amber-100 text-amber-900',cancelled:'bg-red-100 text-red-800',full:'bg-slate-200 text-slate-800'};
const names:Record<EventStatus,string>={normal:'Scheduled',new:'New',changed:'Updated',cancelled:'Cancelled',full:'Full'};
export default function EventStatusBadge({status}:{status:EventStatus}){if(status==='normal')return null;return <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ${styles[status]}`}>{names[status]}</span>;}
