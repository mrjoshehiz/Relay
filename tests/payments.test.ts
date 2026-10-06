import test from 'node:test';
import assert from 'node:assert/strict';
import { recordPreviewPayment, receiptHtml } from '../lib/payments.ts';
const now=new Date('2026-10-06T15:40:00Z');
test('wallet payment deducts exactly once per recorded action and carries receipt details',()=>{
 const result=recordPreviewPayment(10000,{kind:'delivery',amount:3500,method:'wallet',payer:'Tosin',shipmentId:'RLY-20842'},'PAY-test',now);
 assert.equal(result.balance,6500);assert.equal(result.transaction.amount,-3500);
 assert.equal(result.transaction.fee,300);assert.equal(result.transaction.balanceAfter,6500);
 assert.equal(result.transaction.shipmentId,'RLY-20842');assert.equal(result.transaction.createdAt,now.toISOString());
 assert.equal(result.transaction.payer,'Tosin');assert.equal(result.transaction.method,'wallet');
});
test('sample card delivery records the action without debiting wallet funds',()=>{
 const result=recordPreviewPayment(100,{kind:'delivery',amount:3500,method:'sample-card',payer:'Tosin',shipmentId:'RLY-20842'},'PAY-card',now);
 assert.equal(result.balance,100);assert.equal(result.transaction.amount,-3500);
 assert.equal(result.transaction.method,'sample-card');
});
test('top-up credits the wallet with a zero-fee receipt',()=>{
 const result=recordPreviewPayment(500,{kind:'topup',amount:10000,method:'sample-card',payer:'Tosin'},'PAY-topup',now);
 assert.equal(result.balance,10500);assert.equal(result.transaction.amount,10000);assert.equal(result.transaction.fee,0);
 assert.equal(result.transaction.shipmentId,undefined);
});
test('invalid payments and insufficient wallet balance do not create a result',()=>{
 assert.throws(()=>recordPreviewPayment(100,{kind:'delivery',amount:3500,method:'wallet',payer:'Tosin',shipmentId:'RLY-1'},'PAY-failed',now),/too low/);
 for(const amount of [NaN,Infinity,-1,0,99,1000001])assert.throws(()=>recordPreviewPayment(100,{kind:'topup',amount,method:'sample-card',payer:'Tosin'},'PAY-bad',now));
 assert.throws(()=>recordPreviewPayment(100,{kind:'topup',amount:100,method:'wallet',payer:'Tosin'},'PAY-bad',now));
});
test('downloadable receipt escapes user text and clearly identifies a preview record',()=>{
 const {transaction}=recordPreviewPayment(10000,{kind:'delivery',amount:3500,method:'wallet',payer:'<img src=x onerror=alert(1)>',shipmentId:'RLY-20842'},'PAY-test',now);
 const html=receiptHtml(transaction,'Fallback');
 assert.match(html,/&lt;img src=x onerror=alert\(1\)&gt;/);assert.doesNotMatch(html,/<img/);
 assert.match(html,/Preview receipt · No money moved/);assert.match(html,/PAY-test/);assert.match(html,/₦3,200/);assert.match(html,/₦300/);assert.match(html,/₦3,500/);
});

test('currency stays accurate and unsupported precision is rejected',()=>{
 const request={kind:'topup' as const,amount:100.1,method:'sample-card' as const,payer:'Tosin'};
 const result=recordPreviewPayment(.2,request,'PAY-decimal',now);
 assert.equal(result.balance,100.3);assert.equal(result.transaction.balanceAfter,100.3);
 assert.throws(()=>recordPreviewPayment(500,{...request,amount:100.001},'PAY-bad',now),/two decimal/);
 assert.throws(()=>recordPreviewPayment(500,{kind:'delivery',amount:100,method:'wallet',payer:'Tosin',shipmentId:'RLY-1'},'PAY-bad',now),/handling fee/);
});
test('incomplete reference, date or payer cannot become a receipt',()=>{
 const request={kind:'topup' as const,amount:100,method:'sample-card' as const,payer:'Tosin'};
 assert.throws(()=>recordPreviewPayment(100,request,'',now),/incomplete/);
 assert.throws(()=>recordPreviewPayment(100,request,'PAY-x',new Date('invalid')),/incomplete/);
 assert.throws(()=>recordPreviewPayment(100,{...request,payer:' '},'PAY-x',now),/incomplete/);
});
