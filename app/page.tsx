import EventBoard from '@/components/EventBoard';
import { events } from '@/data/events';
export default function Home() { return <EventBoard events={events}/>; }
