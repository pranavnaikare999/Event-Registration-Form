import React from 'react';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start pt-8 sm:pt-16 pb-16 px-4">
      {children}
    </main>
  );
}
