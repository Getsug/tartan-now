import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: { default: 'Tartan Now | CMU-Africa Events', template: '%s | Tartan Now' },
 description: 'Find, save and share campus events at CMU-Africa.',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body>{children}</body></html>;
}
