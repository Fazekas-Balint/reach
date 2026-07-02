import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { StoreProvider } from '@/lib/store';
import { Sidebar } from '@/components/shell/Sidebar';
import { Topbar } from '@/components/shell/Topbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reach — CRM for teams that close things',
  description: 'A modern CRM for small B2B teams. Contacts, deals, activity, and reporting in one clean surface.'
};

export const viewport: Viewport = {
  themeColor: '#f8f9fb'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Topbar />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
