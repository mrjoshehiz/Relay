'use client';
import { Check, Download, Printer, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { money } from '@/lib/relay';
import { paymentMethodLabel, receiptHtml, type Transaction } from '@/lib/payments';
export function PaymentReceipt({transaction,payer}: {transaction:Transaction;payer:string}) {
 const total=Math.abs(transaction.amount);
 const download=()=>{
  const url=URL.createObjectURL(new Blob([receiptHtml(transaction,payer)],{type:'text/html;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=`relay-receipt-${transaction.id.replace(/[^a-zA-Z0-9-]/g,'')}.html`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
 return <div className="payment-receipt"><article className="receipt-paper"><div className="receipt-brand">relay<span>.</span><small>PAYMENT CONFIRMATION</small></div><span className="receipt-check"><Check aria-hidden="true" size={28}/></span><h2>{transaction.amount>0?'Funds added':'Payment recorded'}</h2><p className="receipt-subtitle">Preview receipt · No money moved</p><strong className="receipt-total">{money(total)}</strong><div className="receipt-perforation"/><dl className="receipt-rows"><div><dt>Reference</dt><dd>{transaction.id}</dd></div><div><dt>For</dt><dd>{transaction.title}</dd></div><div><dt>Account</dt><dd>{transaction.payer??payer}</dd></div><div><dt>Date</dt><dd>{transaction.date}</dd></div><div><dt>Payment method</dt><dd>{paymentMethodLabel(transaction.method)}</dd></div>{transaction.shipmentId&&<div><dt>Shipment</dt><dd>{transaction.shipmentId}</dd></div>}<div><dt>Amount</dt><dd>{money(total-(transaction.fee??0))}</dd></div><div><dt>Fees</dt><dd>{money(transaction.fee??0)}</dd></div><div className="receipt-final"><dt>Total</dt><dd>{money(total)}</dd></div></dl><p className="receipt-note"><ShieldCheck aria-hidden="true" size={17}/>Saved on this device. No financial provider is connected.</p></article><div className="receipt-actions"><Button onClick={download}><Download aria-hidden="true" size={17}/>Download receipt</Button><Button variant="outline" onClick={()=>window.print()}><Printer aria-hidden="true" size={17}/>Print / save PDF</Button></div></div>;
}
