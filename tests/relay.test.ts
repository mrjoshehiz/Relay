import test from 'node:test';
import assert from 'node:assert/strict';
import { servicePrice, draftFromText, assistantReply, initialShipments, restorePreview, nextShipmentId, isShipment } from '../lib/relay.ts';

test('service pricing includes base protection and rounds additional kg consistently',()=>{
 assert.equal(servicePrice('standard',2),2500);
 assert.equal(servicePrice('express',2.1),3850);
 assert.equal(servicePrice('eco',3),2350);
 assert.equal(servicePrice('unknown',1),2500);
});
test('assistant extracts an editable request and leaves recipient details unfilled',()=>{
 const draft=draftFromText('Send documents from Lekki to Ikeja tomorrow');
 assert.ok(draft);
 assert.equal(draft.from,'Lekki');assert.equal(draft.to,'Ikeja');assert.equal(draft.item,'Documents');assert.equal(draft.when,'Schedule');
 assert.match(draft.date,/^\d{4}-\d{2}-\d{2}$/);assert.equal(draft.phone,'');assert.equal(draft.recipient,'');
 assert.equal(draftFromText('What is the cost?'),null);
 const weighted=draftFromText('Send a 3 kg parcel from Yaba to Ikoyi today');assert.equal(weighted?.weight,3);
});
test('status answers use the selected saved shipment and do not invent an unknown delivery',()=>{
 assert.match(assistantReply('Where is RLY-20839?',initialShipments,null),/Delivered/);
 assert.match(assistantReply('Where is RLY-99999?',initialShipments,null),/couldn’t find/);
 assert.match(assistantReply('Where is my package?',[],null),/no active/);
});
test('preview response boundaries remain clear',()=>{
 assert.match(assistantReply('Compare delivery options',initialShipments,null),/preview prices/);
 assert.match(assistantReply('Tell me a joke',initialShipments,null),/live AI model is not connected/);
});

test('preview assistant summary and wallet answers use current saved values',()=>{
 assert.match(assistantReply('Summarize my deliveries',initialShipments,null),/4 saved preview shipments: 2 active and 2 delivered/);
 assert.match(assistantReply('What is my wallet balance?',initialShipments,null,12000),/₦12,000/);
 assert.match(assistantReply('What is my wallet balance?',initialShipments,null,12000),/No real payment/);
});
test('preview weight quotes calculate all services instead of fixed base rates',()=>{
 const response=assistantReply('Compare prices for a 3 kg parcel',initialShipments,null);
 assert.match(response,/Eco ₦2,350/);assert.match(response,/Standard ₦2,850/);assert.match(response,/Express ₦3,850/);
});

const defaults = {shipments:initialShipments,balance:24500,name:'Tosin',transactions:[{id:'t1',title:'Top-up',amount:100,date:'Today'}],addresses:[{label:'Home',address:'Lekki, Lagos'}],notify:true,largerText:false};
test('corrupt browser values cannot crash shipment, account, address or wallet views',()=>{
 for(const value of [null,[],false,'broken',{shipments:{},name:42,balance:'500',addresses:[null],transactions:[{}]}]) {
  const restored=restorePreview(value,defaults);
  assert.equal(restored.name,'Tosin');assert.equal(restored.balance,24500);
  assert.deepEqual(restored.shipments,initialShipments);assert.deepEqual(restored.addresses,defaults.addresses);
 }
 assert.equal(isShipment({...initialShipments[0],progress:NaN}),false);
 assert.equal(isShipment({...initialShipments[0],from:null}),false);
 assert.equal(isShipment({...initialShipments[0],price:Infinity}),false);
});
test('valid empty histories and user preferences survive recovery',()=>{
 const restored=restorePreview({...defaults,shipments:[],transactions:[],addresses:[],balance:0,notify:false,largerText:true},defaults);
 assert.deepEqual(restored.shipments,[]);assert.equal(restored.balance,0);
 assert.deepEqual(restored.addresses,[]);assert.equal(restored.notify,false);assert.equal(restored.largerText,true);
 assert.equal(nextShipmentId(restored.shipments),'RLY-20842');
});
test('new tracking IDs remain valid for imported or duplicate records',()=>{
 assert.equal(nextShipmentId([{id:'bad'},{id:'RLY-99999'}]),'RLY-100000');
 assert.equal(nextShipmentId([{id:'RLY-NaN'}]),'RLY-20842');
 assert.equal(restorePreview({...defaults,shipments:[initialShipments[0],initialShipments[0]]},defaults).shipments.length,1);
});

test('receipt details survive saved-data restoration; unsafe metadata is rejected',()=>{
 const transaction={id:'PAY-test',title:'Wallet top-up',amount:100,date:'Today',method:'sample-card',payer:'Tosin',fee:0,balanceAfter:100};
 const restored=restorePreview({...defaults,transactions:[transaction]},defaults);
 assert.deepEqual(restored.transactions,[transaction]);
 assert.deepEqual(restorePreview({...defaults,transactions:[{...transaction,fee:Infinity}]},defaults).transactions,defaults.transactions);
 assert.deepEqual(restorePreview({...defaults,transactions:[{...transaction,fee:200}]},defaults).transactions,defaults.transactions);
});

test('older saved transaction labels are updated without losing amounts or receipts',()=>{
 const restored=restorePreview({...defaults,transactions:[{id:'old',title:'Demo wallet top-up',amount:5000,date:'Yesterday'}]},defaults);
 assert.equal(restored.transactions[0].title,'wallet top-up');assert.equal(restored.transactions[0].amount,5000);
});
