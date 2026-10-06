export type PaymentMethod = 'wallet' | 'sample-card';
export type Transaction = {
 id: string; title: string; amount: number; date: string;
 method?: PaymentMethod; createdAt?: string; payer?: string; shipmentId?: string; fee?: number; balanceAfter?: number;
};
export type PaymentRequest = { kind:'delivery'|'topup'; amount:number; method:PaymentMethod; payer:string; shipmentId?:string };
export function recordPreviewPayment(balance:number, request:PaymentRequest, reference:string, now:Date) {
 if(!['delivery','topup'].includes(request.kind) || !['wallet','sample-card'].includes(request.method) || !reference.trim() || !request.payer.trim() || !Number.isFinite(now.getTime())) throw new Error('Payment details are incomplete.');
 if(request.kind==='delivery' && request.amount<300) throw new Error('The delivery amount must include the handling fee.');
 if(Math.abs(request.amount*100-Math.round(request.amount*100))>0.000001) throw new Error('Use an amount with no more than two decimal places.');
 if(!Number.isFinite(balance) || balance<0 || !Number.isFinite(request.amount) || request.amount<=0 || !Number.isSafeInteger(Math.round(request.amount*100))) throw new Error('Enter a valid amount.');
 if(request.kind==='topup' && (request.amount<100 || request.amount>1000000 || request.method!=='sample-card')) throw new Error('Choose an amount between ₦100 and ₦1,000,000.');
 if(request.kind==='delivery' && (!request.shipmentId || (request.method==='wallet' && balance<request.amount))) throw new Error('Your wallet balance is too low. Add funds or choose the sample card.');
 const nextBalance = request.kind==='topup' ? balance+request.amount : request.method==='wallet' ? balance-request.amount : balance;
 if(!Number.isSafeInteger(Math.round(nextBalance*100))) throw new Error('The resulting balance is outside the supported range.');
 const roundedBalance=Math.round(nextBalance*100)/100;
 const transaction:Transaction = {
  id:reference, title:request.kind==='topup'?'Wallet top-up':`Delivery · ${request.shipmentId}`,
  amount:request.kind==='topup'?request.amount:-request.amount,
  date:now.toLocaleString('en-NG',{timeZone:'Africa/Lagos',dateStyle:'medium',timeStyle:'short'}),
  createdAt:now.toISOString(), method:request.method, payer:request.payer,
  ...(request.shipmentId?{shipmentId:request.shipmentId}:{}), fee:request.kind==='delivery'?300:0, balanceAfter:roundedBalance
 };
 return {balance:roundedBalance,transaction};
}
export const paymentMethodLabel = (method?:PaymentMethod) => method==='sample-card'?'Sample Visa · 4242':method==='wallet'?'Relay wallet':'Sample activity';
const escapeHtml = (value:string) => value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function receiptHtml(transaction:Transaction, fallbackPayer:string):string {
 const amount=Math.abs(transaction.amount);
 const money=(value:number)=>`₦${value.toLocaleString('en-NG')}`;
 const rows=[['Reference',transaction.id],['For',transaction.title],['Account',transaction.payer??fallbackPayer],['Date',transaction.date],['Method',paymentMethodLabel(transaction.method)],...(transaction.shipmentId?[['Shipment',transaction.shipmentId]]:[]),['Amount',money(amount-(transaction.fee??0))],['Fees',money(transaction.fee??0)],['Total',money(amount)]];
 return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Relay receipt · ${escapeHtml(transaction.id)}</title><style>body{font:16px Arial,sans-serif;color:#252822;background:#faf8f4;margin:0;padding:32px}main{max-width:480px;margin:auto;background:white;padding:32px;border:1px solid #e8e2d9;border-radius:24px}h1{font-size:30px}p{line-height:1.6;color:#665d52}dl div{display:flex;justify-content:space-between;gap:20px;padding:14px 0;border-bottom:1px solid #e8e2d9}dt{color:#665d52}dd{margin:0;text-align:right;overflow-wrap:anywhere}small{display:block;line-height:1.6;margin-top:24px}@media print{body{padding:0;background:white}main{border:0}}</style><main><strong>relay.</strong><p>PAYMENT CONFIRMATION</p><h1>${transaction.amount>0?'Funds added':'Payment recorded'}</h1><p>Preview receipt · No money moved.</p><dl>${rows.map(([label,value])=>`<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl><small>This receipt records a local preview action, not a bank or card payment. No financial provider is connected.</small></main></html>`;
}
