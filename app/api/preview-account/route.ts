import { initialShipments } from '@/lib/relay';

// Public sample data for the explicitly labelled preview; this is not authentication.
export async function GET() {
  return Response.json({ mode: 'preview', name: 'Tosin Omowumi', balance: 24500, shipments: initialShipments }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
