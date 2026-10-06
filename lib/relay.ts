import type { Transaction } from './payments';
export type Shipment = { id: string; item: string; from: string; to: string; recipient: string; phone: string; weight: number; price: number; status: 'In transit' | 'Delivered' | 'Booked'; service: string; progress: number; eta: string; date: string; instructions?: string };
export type BookingDraft = { from: string; to: string; recipient: string; phone: string; item: string; weight: number; service: string; when: string; date: string; instructions: string };
export const initialShipments: Shipment[] = [
 { id:'RLY-20841',item:'Studio essentials',from:'12 Admiralty Way, Lekki Phase 1, Lagos',to:'24 Akin Adesola Street, Victoria Island, Lagos',recipient:'Ada Okafor',phone:'08012345678',weight:2,price:3500,status:'In transit',service:'express',progress:2,eta:'18',date:'05/10/2026',instructions:'Call on arrival'},
 { id:'RLY-20840',item:'Studio documents',from:'Ikeja, Lagos',to:'Yaba, Lagos',recipient:'Tunde Bello',phone:'08123456789',weight:1,price:2500,status:'In transit',service:'standard',progress:1,eta:'45',date:'05/10/2026'},
 { id:'RLY-20839',item:'Clothing parcel',from:'Surulere, Lagos',to:'Lekki, Lagos',recipient:'Chioma Eze',phone:'09012345678',weight:1,price:2000,status:'Delivered',service:'eco',progress:3,eta:'Delivered',date:'04/10/2026'},
 { id:'RLY-20838',item:'Birthday gift',from:'Victoria Island, Lagos',to:'Ikoyi, Lagos',recipient:'Femi Ade',phone:'08023456789',weight:1,price:2500,status:'Delivered',service:'standard',progress:3,eta:'Delivered',date:'03/10/2026'}
];
export const money = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;
export const servicePrice = (service: string, weight: number) => ({ standard:2500, express:3500, eco:2000 }[service] ?? 2500) + Math.max(0, Math.ceil(weight - 2)) * 350;
export function draftFromText(text: string): BookingDraft | null {
 const match=text.match(/from\s+(.+?)\s+to\s+(.+?)(?:\s+(?:today|tomorrow|on\s+\w+)|[.!?]|$)/i);
 if(!match || !/send|deliver|book|ship|parcel|package/i.test(text))return null;
 const tomorrow=/tomorrow/i.test(text); const date=new Date();date.setDate(date.getDate()+1);
 return {from:match[1].trim(),to:match[2].trim(),recipient:'',phone:'',item:/documents?/i.test(text)?'Documents':/clothes|clothing/i.test(text)?'Clothing parcel':'Parcel',weight:Number(text.match(/(\d+(?:\.\d+)?)\s*kg/i)?.[1]??1),service:/express|urgent/i.test(text)?'express':/eco/i.test(text)?'eco':'standard',when:tomorrow?'Schedule':'Today',date:tomorrow?date.toLocaleDateString('en-CA'):'',instructions:''};
}
export function assistantReply(text:string, shipments:Shipment[], draft:BookingDraft|null, balance?:number): string {
 if(/^(hi|hello|hey|good morning|good evening)[!. ]*$/i.test(text.trim()))return 'Hello! I’m your preview delivery copilot. I can track a sample parcel, compare delivery services, summarize your shipments or prepare a booking draft. What would you like to try?';
 if(/summar|overview|how many|my deliveries/i.test(text)){const active=shipments.filter(s=>s.status!=='Delivered');const delivered=shipments.filter(s=>s.status==='Delivered');return `You have ${shipments.length} saved preview shipments: ${active.length} active and ${delivered.length} delivered.${active[0]?` Next to follow: ${active[0].id}, ${active[0].item}, ${active[0].status.toLowerCase()}.`:''} These are sample records in this browser.`;}
 if(/wallet|balance|fund/i.test(text))return balance===undefined?'Open Wallet to see your preview balance and add sample funds. No real payment is made.':`Your preview wallet has ${money(balance)} available. You can add preview funds from Wallet, then use them to try booking a shipment. No real payment is made.`;
 if(draft)return `I’ve prepared a draft for ${draft.item.toLowerCase()}, from ${draft.from} to ${draft.to}${draft.when==='Schedule'?' tomorrow':''}. Open it to add full street addresses and the recipient’s details. The ${draft.service} preview estimate is ${money(servicePrice(draft.service,draft.weight))}. You’ll review everything before confirming.`;
 const id=text.match(/RLY-\d+/i)?.[0];
 if(id || /where|track|update|status|late|delay/i.test(text)){const s=id?shipments.find(s=>s.id.toLowerCase()===id.toLowerCase()):shipments.find(s=>s.status!=='Delivered');if(!s)return id?'I couldn’t find that ID in your saved preview shipments. Check the ID in Shipments and try again.':'You have no active preview shipments. Tell me where you’d like to send a package.';return `${s.id}: ${s.status}. ${s.status==='In transit'?`The saved sample estimate is ${s.eta} minutes.`:s.status==='Booked'?'Your preview booking is waiting for pickup.':'The sample delivery was received by '+s.recipient+'.'} Destination: ${s.to}. These are saved preview updates, not live GPS data.`;}
 const quotedWeight=Number(text.match(/(\d+(?:\.\d+)?)\s*kg/i)?.[1]);
 if(quotedWeight && /compare|option|price|cost|cheap|service|quote/i.test(text))return `For your ${quotedWeight} kg preview parcel: Eco ${money(servicePrice('eco',quotedWeight))}, Standard ${money(servicePrice('standard',quotedWeight))}, Express ${money(servicePrice('express',quotedWeight))}. Eco uses a next-day shared route; Standard is same-day; Express is priority. These are preview estimates, not live carrier quotes.`;
 if(/compare|option|price|cost|cheap|service|quote/i.test(text))return 'For a local parcel up to 2 kg: Eco is ₦2,000 with next-day shared-route delivery; Standard is ₦2,500 for same-day delivery; Express is ₦3,500 for priority delivery in 1–2 hours. These are preview prices. Heavier parcels add ₦350 per extra kg.';
 if(/fragile|pack|glass/i.test(text))return 'Wrap fragile items individually with cushioning, place them in a rigid box, and fill any gaps so nothing moves. Seal the box securely and add “Handle with care” to your delivery instructions. Keep liquids in sealed containers. Tell me the pickup and destination when you’re ready.';
 if(/book|how|help/i.test(text))return 'Tap Send package, add full pickup and delivery addresses, then enter the recipient’s name and Nigerian phone number. Choose a package weight, service, and pickup time. Review the total and confirm with preview wallet funds. Or say “Send documents from Lekki to Ikeja” and I’ll prepare a draft.';
 return 'I can prepare a booking draft, explain a saved shipment update, compare services, or help you pack. Try “Send a 2 kg parcel from Lekki to Ikeja tomorrow.” This preview uses guided responses; a live AI model is not connected.';
}


/** Browser storage is untrusted: retain only records safe for every app view. */
export function isShipment(value: unknown): value is Shipment {
 if (!value || typeof value !== 'object') return false;
 const s = value as Record<string, unknown>;
 return ['id','item','from','to','recipient','phone','service','eta','date'].every(k => typeof s[k] === 'string' && (s[k] as string).trim().length > 0)
  && /^RLY-\d+$/.test(s.id as string)
  && ['Booked','In transit','Delivered'].includes(s.status as string)
  && typeof s.weight === 'number' && Number.isFinite(s.weight) && s.weight > 0
  && typeof s.price === 'number' && Number.isFinite(s.price) && s.price >= 0
  && typeof s.progress === 'number' && Number.isInteger(s.progress) && s.progress >= 0 && s.progress <= 3
  && (s.instructions === undefined || typeof s.instructions === 'string');
}
export type SavedPreview = {
 shipments: Shipment[]; balance: number; name: string;
 transactions: Transaction[];
 addresses: {label:string; address:string}[]; notify:boolean; largerText:boolean;
};
export function restorePreview(value: unknown, defaults: SavedPreview): SavedPreview {
 if (!value || typeof value !== 'object' || Array.isArray(value)) return defaults;
 const d = value as Record<string, unknown>;
 const validRecords = <T>(value: unknown, fallback: T[], valid: (v: unknown) => boolean): T[] =>
  Array.isArray(value) && value.every(valid) ? value as T[] : fallback;
 const strings = (v: unknown, keys:string[]) => !!v && typeof v === 'object' && keys.every(k => typeof (v as Record<string,unknown>)[k] === 'string' && ((v as Record<string,unknown>)[k] as string).trim().length > 0);
 const restored = validRecords(d.shipments, defaults.shipments, isShipment);
 return {
  shipments: restored.filter((s,i) => restored.findIndex(other => other.id === s.id) === i),
  balance: typeof d.balance === 'number' && Number.isFinite(d.balance) && d.balance >= 0 ? d.balance : defaults.balance,
  name: typeof d.name === 'string' && d.name.trim() ? d.name.trim() : defaults.name,
  transactions: validRecords<Transaction>(d.transactions, defaults.transactions, v => strings(v,['id','title','date']) && typeof (v as Record<string,unknown>).amount === 'number' && Number.isFinite((v as Record<string,unknown>).amount) && validPaymentMetadata(v as Record<string,unknown>)).map(t=>({...t,title:t.title.replace(/\bdemo\b/gi,'').replace(/\s{2,}/g,' ').trim()})),
  addresses: validRecords(d.addresses, defaults.addresses, v => strings(v,['label','address'])),
  notify: typeof d.notify === 'boolean' ? d.notify : defaults.notify,
  largerText: typeof d.largerText === 'boolean' ? d.largerText : defaults.largerText
 };
}
export function nextShipmentId(shipments: Pick<Shipment,'id'>[]): string {
 return `RLY-${shipments.reduce((max,s) => {
  const number = /^RLY-\d+$/.test(s.id) ? Number(s.id.slice(4)) : 0;
  return Number.isSafeInteger(number) ? Math.max(max,number) : max;
 },20841) + 1}`;
}

function validPaymentMetadata(v: Record<string,unknown>): boolean {
 return (v.method === undefined || v.method === 'wallet' || v.method === 'sample-card')
  && ['createdAt','payer','shipmentId'].every(key=>v[key]===undefined || typeof v[key]==='string')
  && ['fee','balanceAfter'].every(key=>v[key]===undefined || (typeof v[key]==='number' && Number.isFinite(v[key]) && v[key]>=0))
  && (v.fee===undefined || (v.fee as number)<=Math.abs(v.amount as number));
}
