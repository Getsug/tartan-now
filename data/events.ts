import rawEvents from './events.json';
export type EventStatus = 'normal' | 'new' | 'changed' | 'cancelled' | 'full';
export type CampusEvent = {
 id: string; tags?: string[]; image?: string | null; imageAlt?: string | null; title: string; description: string; category: string; location: string;
 organizer: string; startTime: string; endTime: string; registrationUrl: string | null;
 waitlistUrl: string | null; status: EventStatus; changeNote: string | null; updatedAt: string;
};
export const events = rawEvents as CampusEvent[];
export const getEvent = (id: string) => events.find(e => e.id === id);
