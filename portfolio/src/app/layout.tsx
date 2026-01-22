import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Jerry Portfolio | Graphic Designer & Visual Artist',
  description: 'Creative portfolio showcasing stunning brand identity, UI/UX design, and visual arts. Let\'s create something amazing together.',
  keywords: ['graphic design', 'portfolio', 'brand identity', 'UI/UX', 'visual artist', 'creative design'],
  authors: [{ name: 'Jerry' }],
  openGraph: {
    title: 'Jerry Portfolio | Graphic Designer & Visual Artist',
    description: 'Creative portfolio showcasing stunning brand identity, UI/UX design, and visual arts.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
