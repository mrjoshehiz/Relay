'use client';
import { Toaster } from 'sonner';
export function RelayNotifications() {
 return <Toaster position="top-center" richColors closeButton toastOptions={{ duration: Infinity }} />;
}
