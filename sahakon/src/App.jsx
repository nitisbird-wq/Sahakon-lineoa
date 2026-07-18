import React, { useState, useEffect } from "react";
/* SAHAKON v4.3 — Real menu data, full image library, spirits section, 9 soda flavors */

const IMG = {
  // ── หมูจุ่ม ──
  "mj-s":"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop&q=80",
  "mj-m":"https://images.unsplash.com/photo-1547928578-bca3e9c5a0ab?w=200&h=200&fit=crop&q=80",
  "mj-l":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  // ── กาแฟ ──
  "cf1":"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop&q=80",
  "cf2":"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop&q=80",
  "cf3":"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop&q=80",
  "cf4":"https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=200&h=200&fit=crop&q=80",
  "cf5":"https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&h=200&fit=crop&q=80",
  "cf6":"https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=200&h=200&fit=crop&q=80",
  "cf7":"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop&q=80",
  "cf8":"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop&q=80",
  "cf9":"https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=200&h=200&fit=crop&q=80",
  "cf10":"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&q=80",
  // ── เครื่องดื่ม: ชา ──
  "t1":"https://images.unsplash.com/photo-1558857563-b371033873b8?w=200&h=200&fit=crop&q=80",
  "t2":"https://images.unsplash.com/photo-1556881286-fc6915169721?w=200&h=200&fit=crop&q=80",
  "t3":"https://images.unsplash.com/photo-1556881286-fc6915169721?w=200&h=200&fit=crop&q=80",
  "t4":"https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop&q=80",
  // ── นมสด ──
  "m1":"https://images.unsplash.com/photo-1558857563-b371033873b8?w=200&h=200&fit=crop&q=80",
  "m2":"https://images.unsplash.com/photo-1556881286-fc6915169721?w=200&h=200&fit=crop&q=80",
  "m3":"https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop&q=80",
  "m4":"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=200&h=200&fit=crop&q=80",
  "m5":"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&q=80",
  // ── อิตาเลียนโซดา ──
  "s1":"https://images.unsplash.com/photo-1558645836-e44122a743ee?w=200&h=200&fit=crop&q=80",
  "s2":"https://images.unsplash.com/photo-1578897367039-e9f3a4d8a5d9?w=200&h=200&fit=crop&q=80",
  "s3":"https://images.unsplash.com/photo-1497534446932-c925b458314e?w=200&h=200&fit=crop&q=80",
  "s4":"https://images.unsplash.com/photo-1506802913710-3d5b5f9e7f30?w=200&h=200&fit=crop&q=80",
  "s5":"https://images.unsplash.com/photo-1541014741259-de529411b96a?w=200&h=200&fit=crop&q=80",
  "s6":"https://images.unsplash.com/photo-1558857563-b371033873b8?w=200&h=200&fit=crop&q=80",
  "s7":"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=200&h=200&fit=crop&q=80",
  "s8":"https://images.unsplash.com/photo-1497534446932-c925b458314e?w=200&h=200&fit=crop&q=80",
  "s9":"https://images.unsplash.com/photo-1541014741259-de529411b96a?w=200&h=200&fit=crop&q=80",
  // ── น้ำอัดลม ──
  "sd1":"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop&q=80",
  "sd2":"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop&q=80",
  "sd3":"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200&h=200&fit=crop&q=80",
  "sd4":"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop&q=80",
  // ── ตามสั่ง ──
  "r1":"https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=200&h=200&fit=crop&q=80",
  "r2":"https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=200&h=200&fit=crop&q=80",
  "r3":"https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=200&h=200&fit=crop&q=80",
  "r4":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  "r5":"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop&q=80",
  "r6":"https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=200&h=200&fit=crop&q=80",
  "r7":"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop&q=80",
  "r8":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "r9":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  "r10":"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop&q=80",
  "r11":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  "r12":"https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=200&h=200&fit=crop&q=80",
  "r13":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  // ── ต้ม/สุกี้ ──
  "sp1":"https://images.unsplash.com/photo-1547928578-bca3e9c5a0ab?w=200&h=200&fit=crop&q=80",
  "sp2":"https://images.unsplash.com/photo-1547928578-bca3e9c5a0ab?w=200&h=200&fit=crop&q=80",
  "sp3":"https://images.unsplash.com/photo-1547928578-bca3e9c5a0ab?w=200&h=200&fit=crop&q=80",
  "sp4":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "sp5":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "sp6":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "sp7":"https://images.unsplash.com/photo-1547928578-bca3e9c5a0ab?w=200&h=200&fit=crop&q=80",
  // ── ของทานเล่น ──
  "a1":"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop&q=80",
  "a2":"https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop&q=80",
  "a3":"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&h=200&fit=crop&q=80",
  "a4":"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop&q=80",
  "a5":"https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=200&h=200&fit=crop&q=80",
  "a6":"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&h=200&fit=crop&q=80",
  "a7":"https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop&q=80",
  "a8":"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop&q=80",
  "a9":"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop&q=80",
  "a10":"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop&q=80",
  "a11":"https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop&q=80",
  "a12":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "a13":"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop&q=80",
  // ── อีสาน ──
  "i1":"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop&q=80",
  "i2":"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop&q=80",
  "i3":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "i4":"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop&q=80",
  "i5":"https://images.unsplash.com/photo-1547928578-bca3e9c5a0ab?w=200&h=200&fit=crop&q=80",
  // ── ตำ ──
  "tm1":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "tm2":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "tm3":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "tm4":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "tm5":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  // ── ย่าง/ทอด ──
  "gr1":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "gr2":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "gr3":"https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop&q=80",
  "gr4":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "gr5":"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop&q=80",
  "gr6":"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop&q=80",
  // ── ยำ ──
  "y1":"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop&q=80",
  "y2":"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop&q=80",
  "y3":"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop&q=80",
  // ── เบียร์ ──
  "b1":"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80",
  "b2":"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80",
  "b3":"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80",
  "b4":"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80",
  // ── เหล้า/spirits ──
  "sp_sg":"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop&q=80",
  "sp_ht":"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop&q=80",
  "sp_rg":"https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=200&h=200&fit=crop&q=80",
  "sp_sj":"https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=200&h=200&fit=crop&q=80",
  "sp_cf1":"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80",
  "sp_cf2":"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80",
  "sp_cf3":"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80",
  // ── เครื่องดื่มถัง ──
  "bk1":"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=200&h=200&fit=crop&q=80",
  "bk2":"https://images.unsplash.com/photo-1541014741259-de529411b96a?w=200&h=200&fit=crop&q=80",
  "bk3":"https://images.unsplash.com/photo-1558857563-b371033873b8?w=200&h=200&fit=crop&q=80",
  // ── Add-on หมูจุ่ม ──
  "ao1":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "ao2":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "ao3":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "ao4":"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop&q=80",
  "ao5":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "ao7":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  "ao8":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  // ── Hero & Zones ──
  hero_day:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=400&fit=crop&q=80",
  hero_night:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop&q=80",
  zone_work:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop&q=80",
  zone_glass:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=300&fit=crop&q=80",
  zone_garden:"https://images.unsplash.com/photo-1445964047600-cdbdb873673d?w=600&h=300&fit=crop&q=80",
  zone_group:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop&q=80",
  zone_chill:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=300&fit=crop&q=80",
};

function FoodImg({id,emoji,size=56}){
  const[err,setErr]=useState(false);
  const src=IMG[id];
  if(!src||err)return<div style={{width:size,height:size,borderRadius:14,background:"var(--surface2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.48,flexShrink:0}}>{emoji}</div>;
  return<img src={src} alt="" width={size} height={size} onError={()=>setErr(true)} style={{borderRadius:14,objectFit:"cover",flexShrink:0}} loading="lazy"/>;
}

function FakeQR({size=148,seed=7}){
  const n=17;const cells=[];let s=seed;
  const rand=()=>{s=(s*16807)%2147483647;return s/2147483647;};
  const grid=[];
  for(let r=0;r<n;r++){grid.push([]);for(let c=0;c<n;c++)grid[r].push(rand()>.52);}
  const finder=(r0,c0)=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){const e=r===0||r===6||c===0||c===6;const co=r>=2&&r<=4&&c>=2&&c<=4;grid[r0+r][c0+c]=e||co;}};
  finder(0,0);finder(0,n-7);finder(n-7,0);
  const cl=size/n;
  for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(grid[r][c])cells.push(<rect key={r+"-"+c} x={c*cl} y={r*cl} width={cl} height={cl}/>);
  return<svg width={size} height={size} style={{display:"block",background:"#FAF6EE",borderRadius:14}} viewBox={"0 0 "+size+" "+size}><g fill="#1A1714">{cells}</g></svg>;
}

/* generate time slots in 30-min increments */
function genTimeSlots(start="10:00",end="22:00"){
  const slots=[];
  let[h,m]=start.split(":").map(Number);
  const[eh,em]=end.split(":").map(Number);
  while(h<eh||(h===eh&&m<=em)){
    slots.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
    m+=30;if(m>=60){m=0;h++;}
  }
  return slots;
}

/* generate booking reference code */
function genBookingCode(){
  const now=new Date();
  const dateStr=String(now.getMonth()+1).padStart(2,"0")+String(now.getDate()).padStart(2,"0");
  const seq=String(Math.floor(Math.random()*900)+100);
  return`BK-${dateStr}-${seq}`;
}

/* ==================== MENU DATA (Real menu v2 — SAHAKON) ==================== */
const MENU = [
  // ── กาแฟ ──
  {id:"cf1",cat:"coffee",name:"Americano",desc:"ร้อน / เย็น",price:50,emoji:"☕",tag:"ขายดี"},
  {id:"cf2",cat:"coffee",name:"Americano น้ำผึ้งมะนาว",desc:"เปรี้ยวหวานสดชื่น",price:65,emoji:"☕"},
  {id:"cf3",cat:"coffee",name:"Americano น้ำผึ้ง",desc:"หวานนุ่มจากน้ำผึ้งแท้",price:60,emoji:"☕"},
  {id:"cf4",cat:"coffee",name:"Americano ส้ม",desc:"ผสมน้ำส้มสด",price:60,emoji:"☕"},
  {id:"cf5",cat:"coffee",name:"Espresso",desc:"เข้มถึงใจ short shot",price:50,emoji:"☕"},
  {id:"cf6",cat:"coffee",name:"Espresso ส้ม",desc:"เปรี้ยวหอม",price:60,emoji:"☕"},
  {id:"cf7",cat:"coffee",name:"Espresso มะพร้าว",desc:"หอมมะพร้าว",price:60,emoji:"☕"},
  {id:"cf8",cat:"coffee",name:"Latte",desc:"นมสดเข้มข้น ร้อน/เย็น",price:50,emoji:"☕"},
  {id:"cf9",cat:"coffee",name:"Mocha",desc:"ช็อกโกแลตแท้",price:50,emoji:"☕"},
  {id:"cf10",cat:"coffee",name:"Cappuccino",desc:"ฟองนมเนียน",price:50,emoji:"☕"},

  // ── เครื่องดื่ม: ชา ──
  {id:"t1",cat:"drink",name:"ชาไทย",desc:"เข้มข้นสูตรร้าน",price:50,emoji:"🧋",tag:"ขายดี"},
  {id:"t2",cat:"drink",name:"ชาเขียว",desc:"หอมอ่อนๆ",price:50,emoji:"🍵"},
  {id:"t3",cat:"drink",name:"ชามะนาว",desc:"เปรี้ยวสดชื่น",price:50,emoji:"🍋"},
  {id:"t4",cat:"drink",name:"โกโก้",desc:"โกโก้แท้ 100%",price:50,emoji:"🍫"},
  // นมสด
  {id:"m1",cat:"drink",name:"ชาไทยนมสด",desc:"ชาไทย + นมสด",price:50,emoji:"🧋"},
  {id:"m2",cat:"drink",name:"ชาเขียวนมสด",desc:"มัทฉะ + นมสด",price:60,emoji:"🍵"},
  {id:"m3",cat:"drink",name:"โกโก้นมสด",desc:"เข้มข้น หวานมัน",price:50,emoji:"🍫"},
  {id:"m4",cat:"drink",name:"สตรอว์เบอร์รี่นมสด",desc:"สดชื่น หอมหวาน",price:50,emoji:"🍓"},
  {id:"m5",cat:"drink",name:"นมสด",desc:"นมโคสดแท้",price:50,emoji:"🥛"},
  // อิตาเลียนโซดา
  {id:"s1",cat:"drink",name:"อิตาเลียนโซดาแดงมะนาว",desc:"Founder Member ดื่มฟรีทั้งปี วันละ 1 แก้ว",price:50,emoji:"🥤",tag:"Member"},
  {id:"s2",cat:"drink",name:"อิตาเลียนโซดาลิ้นจี่",desc:"Founder Member ดื่มฟรีทั้งปี วันละ 1 แก้ว",price:50,emoji:"🥤"},
  {id:"s3",cat:"drink",name:"อิตาเลียนโซดาส้ม",desc:"Founder Member ดื่มฟรีทั้งปี วันละ 1 แก้ว",price:50,emoji:"🥤"},
  {id:"s4",cat:"drink",name:"อิตาเลียนโซดากีวี",desc:"หวานอมเปรี้ยว",price:50,emoji:"🥤"},
  {id:"s5",cat:"drink",name:"อิตาเลียนโซดาองุ่น",desc:"หอมหวาน",price:50,emoji:"🥤"},
  {id:"s6",cat:"drink",name:"อิตาเลียนโซดาบลูฮาวาย",desc:"สีฟ้าสวย",price:50,emoji:"🥤"},
  {id:"s7",cat:"drink",name:"อิตาเลียนโซดาพันช์",desc:"หลายรสรวมกัน",price:50,emoji:"🥤"},
  {id:"s8",cat:"drink",name:"อิตาเลียนโซดาสับปะรด",desc:"หอมเปรี้ยว",price:50,emoji:"🥤"},
  {id:"s9",cat:"drink",name:"อิตาเลียนโซดาแอปเปิ้ล",desc:"สดชื่นหวาน",price:50,emoji:"🥤"},
  // น้ำอัดลม / มิกเซอร์
  {id:"sd1",cat:"drink",name:"โค้กกระป๋อง",desc:"เย็นจัด",price:20,emoji:"🥤"},
  {id:"sd2",cat:"drink",name:"เป๊ปซี่กระป๋อง",desc:"เย็นจัด",price:20,emoji:"🥤"},
  {id:"sd3",cat:"drink",name:"แฟนต้า",desc:"น้ำแดง / น้ำเขียว",price:20,emoji:"🥤"},
  {id:"sd4",cat:"drink",name:"น้ำสิงห์",desc:"น้ำดื่มบรรจุขวด",price:20,emoji:"💧"},

  // ── ตามสั่ง (ราดข้าว) ──
  {id:"r1",cat:"rice",name:"ผัดกะเพราหมูสับ",desc:"ใบโหระพา ราดข้าว",price:69,emoji:"🍛",tag:"ขายดี",cust:true,custOpts:{spicy:true,egg:true,extra:false}},
  {id:"r2",cat:"rice",name:"ผัดกะเพราหมูชิ้น",desc:"ชิ้นใหญ่จุใจ",price:69,emoji:"🍛",cust:true,custOpts:{spicy:true,egg:true,extra:false}},
  {id:"r3",cat:"rice",name:"ผัดกะเพราหมูกรอบ",desc:"หมูกรอบทอดใหม่",price:79,emoji:"🍛",cust:true,custOpts:{spicy:true,egg:true,extra:false}},
  {id:"r4",cat:"rice",name:"ผัดกะเพราทะเล",desc:"กุ้ง / หมึก / ทะเลรวม",price:79,emoji:"🍛",cust:true,custOpts:{spicy:true,egg:true,extra:false}},
  {id:"r5",cat:"rice",name:"ทอดกระเทียมหมู",desc:"หอมกระเทียมเจียว",price:69,emoji:"🍛",cust:true,custOpts:{spicy:false,egg:true,extra:false}},
  {id:"r6",cat:"rice",name:"ทอดกระเทียมหมูกรอบ",desc:"กรอบ หอม",price:79,emoji:"🍛",cust:true,custOpts:{spicy:false,egg:true,extra:false}},
  {id:"r7",cat:"rice",name:"ผัดคะน้าหมูกรอบ",desc:"หมูกรอบทอดใหม่",price:79,emoji:"🥬",cust:true,custOpts:{spicy:false,egg:true,extra:false}},
  {id:"r8",cat:"rice",name:"ผัดพริกแกงหมูชิ้น",desc:"เผ็ดหอม ราดข้าว",price:69,emoji:"🍛",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"r9",cat:"rice",name:"ผัดพริกแกงทะเล",desc:"เผ็ดจัด ทะเลรวม",price:79,emoji:"🍛",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"r10",cat:"rice",name:"ข้าวผัดหมู",desc:"ผัดร้อนๆ จากกระทะ",price:69,emoji:"🍚",cust:true,custOpts:{spicy:true,egg:true,extra:false}},
  {id:"r11",cat:"rice",name:"ข้าวผัดทะเล",desc:"กุ้ง / หมึก / ทะเลรวม",price:79,emoji:"🍚",cust:true,custOpts:{spicy:true,egg:true,extra:false}},
  {id:"r12",cat:"rice",name:"ผัดผงกะหรี่หมู",desc:"หอมกะหรี่ ราดข้าว",price:69,emoji:"🍛",cust:true,custOpts:{spicy:false,egg:false,extra:false}},
  {id:"r13",cat:"rice",name:"ผัดไข่เค็มทะเล",desc:"หมึก / กุ้ง / ทะเลรวม",price:79,emoji:"🍳"},

  // ── ต้ม / สุกี้ ──
  {id:"sp1",cat:"soup",name:"สุกี้น้ำหมูชิ้น",desc:"น้ำซุปใส หอม",price:69,emoji:"🍜"},
  {id:"sp2",cat:"soup",name:"สุกี้น้ำทะเล",desc:"กุ้ง / หมึก / ทะเลรวม",price:79,emoji:"🍜",tag:"ขายดี"},
  {id:"sp3",cat:"soup",name:"สุกี้แห้งหมู",desc:"ผัดแห้ง หอมพริก",price:69,emoji:"🍜"},
  {id:"sp4",cat:"soup",name:"ต้มยำน้ำข้นกระดูกหมู",desc:"เข้มข้น เผ็ดหอม",price:89,emoji:"🍲"},
  {id:"sp5",cat:"soup",name:"ต้มยำน้ำข้นทะเล",desc:"ทะเลรวม น้ำซุปเข้มข้น",price:99,emoji:"🍲"},
  {id:"sp6",cat:"soup",name:"ต้มแซ่บกระดูกหมู",desc:"เผ็ดเปรี้ยวจัด",price:89,emoji:"🍲"},
  {id:"sp7",cat:"soup",name:"ต้มจืดหมู",desc:"อ่อนโยน เบาเนื้อ",price:79,emoji:"🍲"},

  // ── ของทานเล่น ──
  {id:"a1",cat:"snack",name:"เฟรนช์ฟรายส์",desc:"กรอบนอกนุ่มใน ซอส 2 อย่าง",price:69,emoji:"🍟",tag:"ขายดี"},
  {id:"a2",cat:"snack",name:"นักเก็ตไก่",desc:"10 ชิ้น ทอดสด",price:69,emoji:"🍗"},
  {id:"a3",cat:"snack",name:"ไก่สติ๊กทอด",desc:"กรอบนอกนุ่มใน",price:69,emoji:"🍗"},
  {id:"a4",cat:"snack",name:"รวมเล่น 3 อย่าง",desc:"เฟรนช์ฟรายส์ + นักเก็ต + ไก่สติ๊ก",price:99,emoji:"🍱",tag:"คุ้ม"},
  {id:"a5",cat:"snack",name:"บอลชีส",desc:"ชีสยืด กัดแล้วอร่อย",price:69,emoji:"🧀"},
  {id:"a6",cat:"snack",name:"ฮอตดอกแดงทอด",desc:"กรอบนอก หอม",price:69,emoji:"🌭"},
  {id:"a7",cat:"snack",name:"ปูอัดทอด",desc:"กรอบอร่อย",price:69,emoji:"🦀"},
  {id:"a8",cat:"snack",name:"ลูกชิ้นหน้าโรงเรียน",desc:"จิ้มซอสพริก",price:79,emoji:"🍢"},
  {id:"a9",cat:"snack",name:"เปาะเปี๊ยะทอด",desc:"กรอบ หอม ไส้อร่อย",price:89,emoji:"🥟"},
  {id:"a10",cat:"snack",name:"เอ็นไก่ทอด",desc:"คู่เบียร์เย็นๆ",price:89,emoji:"🍢"},
  {id:"a11",cat:"snack",name:"ปีกไก่ทอด",desc:"กรอบทุกซอก",price:89,emoji:"🍗"},
  {id:"a12",cat:"snack",name:"สามชั้นทอดน้ำปลา",desc:"มันกรอบ หอม",price:89,emoji:"🥓"},
  {id:"a13",cat:"snack",name:"กระดูกอ่อนทอด",desc:"หนึบกรอบ",price:89,emoji:"🍖"},

  // ── หมูจุ่ม (ชุด) ──
  {id:"mj-s",cat:"moojum",name:"หมูจุ่ม Size S",desc:"1-2 คน • หมูหมัก + สามชั้น + ผักรวม",price:99,emoji:"🍲",tag:"ขายดี"},
  {id:"mj-m",cat:"moojum",name:"หมูจุ่ม Size M",desc:"3-4 คน • เพิ่มสันนอก + ผักรวม M",price:199,emoji:"🍲",tag:"พระเอก"},
  {id:"mj-l",cat:"moojum",name:"หมูจุ่ม Size L",desc:"5-6 คน • จัดเต็มทั้งโต๊ะ",price:299,emoji:"🍲"},

  // ── Add-on หมูจุ่ม ──
  {id:"ao1",cat:"addon_mj",name:"หมูสามชั้นสไลด์",desc:"สไลด์บางมีมัน",price:50,emoji:"🥓"},
  {id:"ao2",cat:"addon_mj",name:"สันนอกไม่ติดมัน",desc:"นุ่ม ไร้มัน",price:50,emoji:"🥩"},
  {id:"ao3",cat:"addon_mj",name:"สันนอกติดมัน",desc:"ไขมันแทรก หอม",price:50,emoji:"🥩"},
  {id:"ao4",cat:"addon_mj",name:"หมูหมัก",desc:"หมักซอสสูตรร้าน",price:50,emoji:"🥩",tag:"แนะนำ"},
  {id:"ao5",cat:"addon_mj",name:"เนื้อออสเตรเลีย",desc:"พรีเมียม นุ่มมาก",price:50,emoji:"🥩"},
  {id:"ao6",cat:"addon_mj",name:"ตับหมูสไลด์",desc:"ลวกสุกจิ้มน้ำจิ้ม",price:30,emoji:"🫀"},
  {id:"ao7",cat:"addon_mj",name:"กุ้งขาว",desc:"สดทุกวัน",price:40,emoji:"🦐"},
  {id:"ao8",cat:"addon_mj",name:"ปลาดอรี่",desc:"เนื้อนุ่ม",price:30,emoji:"🐟"},
  {id:"ao9",cat:"addon_mj",name:"หมึกกรอบ",desc:"กรอบหนึบ",price:40,emoji:"🦑"},
  {id:"ao10",cat:"addon_mj",name:"ผักบุ้ง",desc:"สดๆ จากตลาด",price:20,emoji:"🥬"},
  {id:"ao11",cat:"addon_mj",name:"ผักกาดขาว",desc:"กรอบหวาน",price:20,emoji:"🥬"},
  {id:"ao12",cat:"addon_mj",name:"ข้าวโพด",desc:"หวานนุ่ม",price:20,emoji:"🌽"},
  {id:"ao13",cat:"addon_mj",name:"เห็ดออรินจิ",desc:"เนื้อเด้ง หอม",price:20,emoji:"🍄"},
  {id:"ao14",cat:"addon_mj",name:"เห็ดเข็มทอง",desc:"เส้นเล็กกรอบ",price:20,emoji:"🍄"},
  {id:"ao15",cat:"addon_mj",name:"วุ้นเส้น",desc:"เส้นใส",price:20,emoji:"🍜"},
  {id:"ao16",cat:"addon_mj",name:"มาม่า",desc:"ยี่ห้อดัง",price:20,emoji:"🍜"},
  {id:"ao17",cat:"addon_mj",name:"ไข่ไก่",desc:"ต้มหรือทอด",price:10,emoji:"🥚"},
  {id:"ao18",cat:"addon_mj",name:"เต้าหู้ไข่สด",desc:"นุ่มหอม",price:30,emoji:"🟡"},
  {id:"ao19",cat:"addon_mj",name:"ปูอัด",desc:"หวานกรอบ",price:30,emoji:"🦀"},
  {id:"ao20",cat:"addon_mj",name:"ไส้กรอกหนังกรอบ",desc:"หนังกรอบ",price:30,emoji:"🌭"},

  // ── อีสาน ──
  {id:"i1",cat:"isan",name:"ลาบหมู",desc:"เผ็ดสั่งได้ หอมข้าวคั่ว",price:79,emoji:"🌶️",tag:"ขายดี",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"i2",cat:"isan",name:"ลาบเป็ด",desc:"เป็ดหั่นชิ้น",price:89,emoji:"🦆",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"i3",cat:"isan",name:"หมูน้ำตก",desc:"ย่างเตาถ่าน เผ็ดอร่อย",price:89,emoji:"🥩",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"i4",cat:"isan",name:"ตับหวาน",desc:"เลือกระดับความสุก",price:79,emoji:"🥩"},
  {id:"i5",cat:"isan",name:"แกงอ่อมหมู",desc:"สมุนไพรเข้มข้น",price:89,emoji:"🍲"},

  // ── ตำ ──
  {id:"tm1",cat:"tam",name:"ตำลาว",desc:"ปลาร้านัว เผ็ดจัด",price:50,emoji:"🥗",tag:"ขายดี",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"tm2",cat:"tam",name:"ตำไทย",desc:"หวานนำ ถั่วลิสง",price:50,emoji:"🥗",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"tm3",cat:"tam",name:"ตำซั่ว",desc:"เผ็ดจัด ปลาร้า",price:60,emoji:"🥗",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"tm4",cat:"tam",name:"ตำป่า",desc:"เผ็ดมาก สมุนไพร",price:79,emoji:"🥗",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"tm5",cat:"tam",name:"ตำข้าวโพดไข่เค็ม",desc:"หวาน มัน เค็ม",price:89,emoji:"🥗"},

  // ── ย่าง/ทอด ──
  {id:"gr1",cat:"grill",name:"คอหมูย่าง",desc:"ย่างเตาถ่าน หอมหวาน",price:89,emoji:"🔥",tag:"ขายดี"},
  {id:"gr2",cat:"grill",name:"ไส้อ่อนย่าง",desc:"นุ่ม หอม ย่างสด",price:89,emoji:"🔥"},
  {id:"gr3",cat:"grill",name:"ปีกไก่ทอด",desc:"กรอบทุกซอก",price:89,emoji:"🍗"},
  {id:"gr4",cat:"grill",name:"สามชั้นทอดน้ำปลา",desc:"มันกรอบ หอม",price:89,emoji:"🥓"},
  {id:"gr5",cat:"grill",name:"เอ็นไก่ทอด",desc:"หนึบ คู่เบียร์",price:89,emoji:"🍢"},
  {id:"gr6",cat:"grill",name:"กระดูกอ่อนทอด",desc:"กรอบหนึบ",price:89,emoji:"🍖"},

  // ── ยำ ──
  {id:"y1",cat:"yum",name:"ยำ 2 อย่าง",desc:"เลือกได้เลย เผ็ดสั่งได้",price:79,emoji:"🥗",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"y2",cat:"yum",name:"ยำ 3 อย่าง",desc:"เลือกวัตถุดิบได้เอง",price:89,emoji:"🥗",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"y3",cat:"yum",name:"ยำ 4 อย่าง",desc:"เพิ่มอย่างละ 10 บาท",price:99,emoji:"🥗",cust:true,custOpts:{spicy:true,egg:false,extra:false}},

  // ── เบียร์ ──
  {id:"b1",cat:"beer",name:"ช้างเขียว",desc:"ขวดใหญ่ เย็นจัด",price:80,emoji:"🍺",tag:"ขายดี"},
  {id:"b2",cat:"beer",name:"ลีโอ",desc:"ขวดใหญ่ เย็นจัด",price:80,emoji:"🍺"},
  {id:"b3",cat:"beer",name:"สิงห์",desc:"ขวดใหญ่ เย็นจัด",price:85,emoji:"🍺"},
  {id:"b4",cat:"beer",name:"บัดไวเซอร์",desc:"พรีเมียม เย็นจัด",price:90,emoji:"🍺"},
  {id:"b5",cat:"beer",name:"เบียร์คราฟต์ Hougang",desc:"คราฟต์พรีเมียม",price:150,emoji:"🍺",tag:"Craft"},
  {id:"b6",cat:"beer",name:"เบียร์คราฟต์ Asali",desc:"คราฟต์รสนุ่ม",price:150,emoji:"🍺",tag:"Craft"},
  {id:"b7",cat:"beer",name:"เบียร์คราฟต์ Snowy",desc:"คราฟต์สดชื่น",price:150,emoji:"🍺",tag:"Craft"},

  // ── เหล้า/สุรา ──
  {id:"lq1",cat:"spirits",name:"แสงโสม",desc:"วิสกี้ไทย ขวดปกติ",price:450,emoji:"🥃",tag:"ขายดี"},
  {id:"lq2",cat:"spirits",name:"หงส์ทอง",desc:"วิสกี้ไทย ขวดปกติ",price:400,emoji:"🥃"},
  {id:"lq3",cat:"spirits",name:"รีเจนซี่",desc:"บรั่นดี พรีเมียม",price:550,emoji:"🥃"},
  {id:"lq4",cat:"spirits",name:"โซจู",desc:"เกาหลีแท้ เย็นจัด",price:150,emoji:"🍶"},
  {id:"lq5",cat:"spirits",name:"โซดา (มิกเซอร์)",desc:"คู่เหล้า",price:20,emoji:"🥤"},
  {id:"lq6",cat:"spirits",name:"น้ำแข็ง",desc:"ถัง",price:30,emoji:"🧊"},

  // ── เครื่องดื่มถัง ──
  {id:"bk1",cat:"bucket",name:"เครื่องดื่มถัง S",desc:"บลูฮาวาย / ไหมไทย / ลิ้นจี่ / สตรอว์เบอร์รี่ / องุ่น / แอปเปิ้ล",price:79,emoji:"🪣"},
  {id:"bk2",cat:"bucket",name:"เครื่องดื่มถัง M",desc:"เลือกรสได้เลย",price:99,emoji:"🪣",tag:"แนะนำ"},
  {id:"bk3",cat:"bucket",name:"เครื่องดื่มถัง L",desc:"คุ้มมาก สำหรับกลุ่ม",price:129,emoji:"🪣",tag:"คุ้ม"},
];

const DAY_CATS=[
  {id:"rice",name:"ตามสั่ง",emoji:"🍛"},
  {id:"soup",name:"ต้ม/สุกี้",emoji:"🍜"},
  {id:"snack",name:"ทานเล่น",emoji:"🍟"},
  {id:"coffee",name:"กาแฟ",emoji:"☕"},
  {id:"drink",name:"เครื่องดื่ม",emoji:"🥤"},
];
const NIGHT_CATS=[
  {id:"moojum",name:"หมูจุ่ม",emoji:"🍲"},
  {id:"addon_mj",name:"Add-on",emoji:"➕"},
  {id:"isan",name:"อีสาน",emoji:"🌶️"},
  {id:"tam",name:"ตำ",emoji:"🥗"},
  {id:"grill",name:"ย่าง/ทอด",emoji:"🔥"},
  {id:"yum",name:"ยำ",emoji:"🥗"},
  {id:"snack",name:"ทานเล่น",emoji:"🍟"},
  {id:"coffee",name:"กาแฟ",emoji:"☕"},
  {id:"drink",name:"เครื่องดื่ม",emoji:"🥤"},
  {id:"beer",name:"เบียร์",emoji:"🍺"},
  {id:"spirits",name:"เหล้า",emoji:"🥃"},
  {id:"bucket",name:"ถัง",emoji:"🪣"},
];
const CAT_MODE={
  rice:"day",soup:"day",
  moojum:"night",isan:"night",tam:"night",grill:"night",yum:"night",beer:"night",addon_mj:"night",bucket:"night",spirits:"night",
  coffee:"all",drink:"all",snack:"all",
};
const MILESTONES=[{at:5,reward:"ท็อปปิ้ง/คุกกี้ฟรี"},{at:15,reward:"เครื่องดื่มฟรี"},{at:30,reward:"จานเดียวฟรี"},{at:60,reward:"หมูจุ่ม S ฟรี"},{at:100,reward:"หมูจุ่ม M + ต่อปี 2 ฟรี"}];
const ZONES=[
  {id:"โซนทำงาน ชั้น 2",name:"Work Zone",sub:"ปลั๊กทุกโต๊ะ • WiFi แรง",cap:"1-4 คน",img:IMG.zone_work,day:true,night:false},
  {id:"ห้องกระจก",name:"Glass Room",sub:"เงียบ ส่วนตัว",cap:"2-8 คน",img:IMG.zone_glass,day:true,night:true},
  {id:"โซนสวน",name:"Garden Zone",sub:"ใต้ต้นไม้ ลมดี",cap:"2-6 คน",img:IMG.zone_garden,day:true,night:true},
  {id:"โต๊ะยาว (กลุ่ม)",name:"Group Table",sub:"ติวกลุ่ม ประชุม",cap:"5-10 คน",img:IMG.zone_group,day:true,night:true},
  {id:"โซนในร้าน",name:"Chill Zone",sub:"โซฟานุ่ม เหมาะอ่านหนังสือ",cap:"1-4 คน",img:IMG.zone_chill,day:true,night:true},
];

const TIME_SLOTS=genTimeSlots("10:00","22:00");
const DURATION_OPTS=["1 ชั่วโมง","2 ชั่วโมง","3 ชั่วโมง","4 ชั่วโมง"];

/* helper: get date options (today + N days) */
function getDateOptions(days=7){
  const opts=[];
  const now=new Date();
  for(let i=0;i<days;i++){
    const d=new Date(now);d.setDate(d.getDate()+i);
    const label=i===0?"วันนี้":i===1?"พรุ่งนี้":d.toLocaleDateString("th-TH",{weekday:"short",month:"short",day:"numeric"});
    const value=d.toISOString().split("T")[0];
    opts.push({label,value});
  }
  return opts;
}

/* ── Web Audio beep (S2 fix) ── */
function playBeep(freq=880,dur=0.4,vol=0.25){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    osc.type="sine";osc.frequency.value=freq;
    gain.gain.setValueAtTime(vol,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    osc.start(ctx.currentTime);osc.stop(ctx.currentTime+dur);
  }catch(e){}
}

/* ==================== STAFF SCREEN (S1 + S3 fix) ==================== */
function StaffScreen({orders,onAdvance,redeemQueue,onApproveRedeem,bookings,onClose}){
  const[pin,setPin]=useState("");
  const[authed,setAuthed]=useState(false);
  const[tab,setTab]=useState("orders");
  const STAFF_PIN="1234";

  if(!authed)return(
    <div style={{position:"fixed",inset:0,background:"#080706",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:100,fontFamily:"Prompt"}}>
      <div style={{fontSize:11,letterSpacing:".4em",color:"#C9A96E",textTransform:"uppercase",marginBottom:24}}>Staff Access</div>
      <div style={{fontSize:32,letterSpacing:".25em",color:"#EDE5D8",marginBottom:28,minHeight:40}}>{pin.replace(/./g,"●")}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,width:220}}>
        {[1,2,3,4,5,6,7,8,9,"⌫",0,"✓"].map(k=>(
          <button key={k} onClick={()=>{
            if(k==="⌫"){setPin(p=>p.slice(0,-1));return;}
            if(k==="✓"){if(pin===STAFF_PIN)setAuthed(true);else{setPin("");return;}return;}
            if(pin.length<4)setPin(p=>p+k);
          }} style={{height:56,borderRadius:10,border:"1px solid #2A2520",background:k==="✓"?"#C9A96E":"#151210",color:k==="✓"?"#080706":"#EDE5D8",fontSize:18,fontFamily:"Prompt",fontWeight:600,cursor:"pointer"}}>
            {k}
          </button>
        ))}
      </div>
      <button onClick={onClose} style={{marginTop:28,border:0,background:"transparent",color:"#7A6E5E",fontSize:12,cursor:"pointer",fontFamily:"Prompt"}}>ยกเลิก</button>
      <div style={{marginTop:12,fontSize:10,color:"#7A6E5E",letterSpacing:".1em"}}>(เดโม PIN: 1234)</div>
    </div>
  );

  const pendingOrders=(orders||[]).flatMap(o=>o.rounds.map(r=>({...r,orderNo:o.no,table:o.table||"-"}))).filter(r=>!["served","completed"].includes(r.status));
  const statusLabel={waiting:"รอรับ",waiting_pos:"รอรับ",waiting_payment:"รอจ่าย",paid:"รอครัว",preparing:"กำลังทำ",ready:"พร้อมเสิร์ฟ"};
  const nextStatus={waiting:"preparing",waiting_pos:"waiting_payment",waiting_payment:"paid",paid:"preparing",preparing:"ready",ready:"served"};
  const nextLabel={waiting:"รับออเดอร์",waiting_pos:"รับออเดอร์",waiting_payment:"ยืนยันจ่ายแล้ว",paid:"ส่งเข้าครัว",preparing:"พร้อมเสิร์ฟ",ready:"เสิร์ฟแล้ว ✓"};

  const tabs=[{id:"orders",label:"ออเดอร์",badge:pendingOrders.length},{id:"redeem",label:"Redeem",badge:(redeemQueue||[]).length},{id:"bookings",label:"จอง",badge:0}];

  return(
    <div style={{position:"fixed",inset:0,background:"#080706",zIndex:100,display:"flex",flexDirection:"column",fontFamily:"Prompt",maxWidth:430,margin:"0 auto"}}>
      {/* header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderBottom:"1px solid #242018",background:"rgba(8,7,6,.95)"}}>
        <div style={{fontSize:13,fontWeight:700,letterSpacing:".08em",color:"#C9A96E"}}>STAFF SCREEN</div>
        <button onClick={onClose} style={{border:"1px solid #242018",background:"#151210",color:"#EDE5D8",borderRadius:8,padding:"6px 12px",fontSize:11,cursor:"pointer",fontFamily:"Prompt"}}>ออก</button>
      </div>
      {/* tabs */}
      <div style={{display:"flex",borderBottom:"1px solid #242018",background:"#111009"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"11px 4px",border:0,background:"transparent",color:tab===t.id?"#C9A96E":"#7A6E5E",fontFamily:"Prompt",fontSize:12,fontWeight:tab===t.id?700:500,borderBottom:tab===t.id?"2px solid #C9A96E":"2px solid transparent",cursor:"pointer",position:"relative"}}>
            {t.label}{t.badge>0&&<span style={{position:"absolute",top:8,right:"calc(50% - 20px)",background:"#E85D30",color:"#fff",borderRadius:"99px",fontSize:9,fontWeight:700,padding:"1px 5px",minWidth:14,textAlign:"center"}}>{t.badge}</span>}
          </button>
        ))}
      </div>
      {/* content */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>

        {tab==="orders"&&(<>
          {pendingOrders.length===0
            ?<div style={{textAlign:"center",marginTop:40,color:"#7A6E5E",fontSize:13}}>ไม่มีออเดอร์ที่รอดำเนินการ ✓</div>
            :pendingOrders.map((r,i)=>(
              <div key={i} style={{background:"#151210",border:"1px solid #242018",borderRadius:12,padding:"14px",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div>
                    <span style={{fontSize:14,fontWeight:700,color:"#EDE5D8"}}>ออเดอร์ {r.orderNo}</span>
                    <span style={{fontSize:11,color:"#7A6E5E",marginLeft:8}}>โต๊ะ {r.table} • รอบ {r.rNo}</span>
                  </div>
                  <span style={{background:"#1f1b14",color:"#C9A96E",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:5,border:"1px solid #2A2520",textTransform:"uppercase",letterSpacing:".05em"}}>{statusLabel[r.status]||r.status}</span>
                </div>
                <div style={{marginBottom:10}}>
                  {r.items.map((it,ii)=>(
                    <div key={ii} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#EDE5D8",padding:"3px 0",borderBottom:"1px solid #1f1b14"}}>
                      <span>{it.emoji} {it.name} × {it.qty}</span>
                      <span style={{color:"#C9A96E",fontWeight:600}}>฿{it.free?0:it.totalPrice*it.qty}</span>
                    </div>
                  ))}
                </div>
                {nextStatus[r.status]&&(
                  <button onClick={()=>onAdvance(r.orderNo,r.rNo,nextStatus[r.status])} style={{width:"100%",background:"#C9A96E",color:"#080706",border:0,borderRadius:8,padding:"11px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Prompt"}}>
                    {nextLabel[r.status]} →
                  </button>
                )}
              </div>
            ))
          }
        </>)}

        {tab==="redeem"&&(<>
          <div style={{fontSize:11,color:"#7A6E5E",letterSpacing:".15em",textTransform:"uppercase",marginBottom:14}}>คิว Redeem ที่รอยืนยัน</div>
          {(redeemQueue||[]).length===0
            ?<div style={{textAlign:"center",marginTop:40,color:"#7A6E5E",fontSize:13}}>ไม่มีคิว Redeem</div>
            :(redeemQueue||[]).map((req,i)=>(
              <div key={i} style={{background:"#151210",border:"1px solid #242018",borderRadius:12,padding:"14px",marginBottom:10}}>
                <div style={{fontSize:13,fontWeight:700,color:"#EDE5D8",marginBottom:4}}>{req.memberName} — {req.memberNo}</div>
                <div style={{fontSize:11,color:"#7A6E5E",marginBottom:10}}>ต้องการรับ: อิตาเลียนโซดา • {req.requestedAt}</div>
                <button onClick={()=>onApproveRedeem(req.id)} style={{width:"100%",background:"#C9A96E",color:"#080706",border:0,borderRadius:8,padding:"11px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Prompt"}}>
                  ✓ อนุมัติ — สแกนแล้ว
                </button>
              </div>
            ))
          }
          <div style={{background:"#1f1b14",borderRadius:10,padding:"12px 14px",marginTop:16,border:"1px solid #242018"}}>
            <div style={{fontSize:11,color:"#C9A96E",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>วิธีใช้</div>
            <div style={{fontSize:11,color:"#7A6E5E",lineHeight:1.7}}>
              1. ลูกค้าแสดง QR ใน tab "สิทธิ์ของฉัน"<br/>
              2. Staff กด "อนุมัติ" ที่หน้าจอนี้<br/>
              3. ระบบจะส่งไปให้ลูกค้าเลือกรส
            </div>
          </div>
        </>)}

        {tab==="bookings"&&(<>
          <div style={{fontSize:11,color:"#7A6E5E",letterSpacing:".15em",textTransform:"uppercase",marginBottom:14}}>การจองวันนี้</div>
          {(bookings||[]).length===0
            ?<div style={{textAlign:"center",marginTop:40,color:"#7A6E5E",fontSize:13}}>ยังไม่มีการจองวันนี้</div>
            :(bookings||[]).map((b,i)=>(
              <div key={i} style={{background:"#151210",border:"1px solid #242018",borderRadius:12,padding:"14px",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"#EDE5D8"}}>{b.name}</div>
                    <div style={{fontSize:11,color:"#7A6E5E",marginTop:2}}>{b.zone} • {b.ppl} คน • {b.time} น.</div>
                    <div style={{fontSize:10,color:"#7A6E5E",marginTop:2}}>โทร {b.phone}</div>
                  </div>
                  <div style={{background:"#1f1b14",color:"#C9A96E",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:5,border:"1px solid #2A2520",letterSpacing:".05em"}}>{b.code}</div>
                </div>
              </div>
            ))
          }
        </>)}

      </div>
    </div>
  );
}

/* ==================== APP ==================== */
export default function App(){
  const[mode,setMode]=useState("night");
  const[page,setPage]=useState("home");
  const[cat,setCat]=useState("moojum");
  const[cart,setCart]=useState([]);
  const[cartOpen,setCartOpen]=useState(false);
  const[order,setOrder]=useState(null);
  const[sodaRedeemed,setSodaRedeemed]=useState(false);
  const[redeemStep,setRedeemStep]=useState("idle");
  const[sodaFlavor,setSodaFlavor]=useState(null);
  const[resv,setResv]=useState(null);
  const[toast,setToast]=useState(null);
  const[showGuide,setShowGuide]=useState(true);
  const[memberStatus,setMemberStatus]=useState("guest");
  const[memberInfo,setMemberInfo]=useState({nickname:"",phone:"",birthday:"",memberNo:null,visits:0});
  const[table,setTable]=useState(null);
  const[addingMore,setAddingMore]=useState(false);
  const[customizing,setCustomizing]=useState(null);
  /* S1/S3: Staff screen */
  const[staffOpen,setStaffOpen]=useState(false);
  const[bookingList,setBookingList]=useState([]);
  const[redeemQueue,setRedeemQueue]=useState([]);
  /* P4: QR timer */
  const[qrTimer,setQrTimer]=useState(90);
  const[qrExpired,setQrExpired]=useState(false);

  const isActive=memberStatus==="active";
  const isPending=memberStatus==="pending_payment";
  const night=mode==="night";
  const cats=night?NIGHT_CATS:DAY_CATS;

  useEffect(()=>{setCat(night?"moojum":"rice");setCart([]);},[night]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),2400);return()=>clearTimeout(t);},[toast]);

  const lastRound=order?order.rounds[order.rounds.length-1]:null;
  const lastStatus=lastRound?.status;

  /* S2: Beep when new order arrives */
  const prevRoundCount=React.useRef(0);
  useEffect(()=>{
    if(!order)return;
    if(order.rounds.length>prevRoundCount.current){playBeep(880,0.35,0.3);prevRoundCount.current=order.rounds.length;}
  },[order]);

  /* Auto-advance demo order statuses */
  useEffect(()=>{
    if(!order||!lastRound)return;
    const adv=(next,ms)=>{const t=setTimeout(()=>setOrder(o=>{if(!o)return o;const rounds=o.rounds.map((r,i)=>i===o.rounds.length-1?{...r,status:next}:r);return{...o,rounds};}),ms);return()=>clearTimeout(t);};
    if(night){
      if(lastStatus==="waiting")return adv("preparing",4000);
      if(lastStatus==="preparing")return adv("ready",6000);
      if(lastStatus==="ready")return adv("served",5000);
    }else{
      if(lastStatus==="waiting_pos")return adv("waiting_payment",3000);
      if(lastStatus==="paid")return adv("preparing",2000);
      if(lastStatus==="preparing")return adv("ready",5000);
      if(lastStatus==="ready")return adv("completed",4000);
    }
  },[order,lastStatus,night]);

  /* P4: QR countdown timer */
  useEffect(()=>{
    if(redeemStep!=="qr"){setQrTimer(90);setQrExpired(false);return;}
    setQrTimer(90);setQrExpired(false);
    const iv=setInterval(()=>setQrTimer(t=>{if(t<=1){setQrExpired(true);clearInterval(iv);return 0;}return t-1;}),1000);
    return()=>clearInterval(iv);
  },[redeemStep]);

  const newUid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const getMenuQty=(menuId)=>cart.filter(i=>i.menuId===menuId&&!i.free).reduce((s,i)=>s+i.qty,0);
  const cartCount=cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal=cart.reduce((s,i)=>s+i.totalPrice*i.qty,0);
  const paidCount=cart.reduce((s,i)=>s+(i.free?0:i.qty),0);
  const hasFreeSodaInCart=cart.some(i=>i.free);

  const quickAdd=(m)=>{
    setCart(c=>{
      const ex=c.find(i=>i.menuId===m.id&&!i.free&&Object.keys(i.options||{}).length===0&&!i.note);
      if(ex)return c.map(i=>i.uid===ex.uid?{...i,qty:i.qty+1}:i);
      return[...c,{uid:newUid(),menuId:m.id,name:m.name,basePrice:m.price,emoji:m.emoji,options:{},note:"",totalPrice:m.price,qty:1,free:false}];
    });
  };
  const quickSub=(menuId)=>{
    setCart(c=>{
      const idx=c.findIndex(i=>i.menuId===menuId&&!i.free&&Object.keys(i.options||{}).length===0&&!i.note);
      if(idx===-1)return c;
      if(c[idx].qty<=1)return c.filter((_,i)=>i!==idx);
      return c.map((item,i)=>i===idx?{...item,qty:item.qty-1}:item);
    });
  };
  const addCustomized=(m,opts,note)=>{
    const addonTotal=(opts.addons||[]).reduce((s,a)=>s+a.price,0);
    setCart(c=>[...c,{uid:newUid(),menuId:m.id,name:m.name,basePrice:m.price,emoji:m.emoji,options:opts,note,totalPrice:m.price+addonTotal,qty:1,free:false}]);
  };
  // FIX 5.5: cart item name uses "อิตาเลียนโซดา"
  const addFreeSoda=(flavor)=>{
    setCart(c=>[...c.filter(i=>!i.free),{uid:"free-soda",menuId:"free-soda",name:"อิตาเลียนโซดา "+flavor,basePrice:0,emoji:"🥤",options:{},note:"",totalPrice:0,qty:1,free:true}]);
  };
  const updateCartQty=(uid,delta)=>{
    setCart(c=>c.map(i=>{if(i.uid!==uid)return i;const nq=i.qty+delta;return nq<=0?null:{...i,qty:nq};}).filter(Boolean));
  };

  const submitOrder=()=>{
    if(paidCount===0)return;
    const items=cart.map(i=>({...i}));
    const initStatus=night?"waiting":"waiting_pos";
    setOrder(o=>{
      const round={rNo:o?o.rounds.length+1:1,items,status:initStatus};
      const newOrder=o?{...o,rounds:[...o.rounds,round]}:{no:"A-"+(140+Math.floor(Math.random()*50)),table,rounds:[round]};
      return newOrder;
    });
    setCart([]);setCartOpen(false);setAddingMore(false);setPage("order");
  };

  /* Staff: advance a specific order round to next status */
  const staffAdvance=(orderNo,rNo,newStatus)=>{
    setOrder(o=>{
      if(!o||o.no!==orderNo)return o;
      const rounds=o.rounds.map(r=>r.rNo===rNo?{...r,status:newStatus}:r);
      return{...o,rounds};
    });
    playBeep(660,0.2,0.2);
  };

  /* Staff: approve redeem request */
  const staffApproveRedeem=(reqId)=>{
    setRedeemQueue(q=>q.filter(r=>r.id!==reqId));
    setRedeemStep("flavor");
    playBeep(1100,0.25,0.2);
    setToast("อนุมัติ Redeem แล้ว — ลูกค้าเลือกรสได้เลย");
  };
  const grandTotal=order?order.rounds.reduce((s,r)=>s+r.items.reduce((a,it)=>a+it.totalPrice*it.qty,0),0):0;
  const nextMs=MILESTONES.find(m=>m.at>memberInfo.visits)||MILESTONES[MILESTONES.length-1];
  const prevAt=MILESTONES.filter(m=>m.at<=memberInfo.visits).map(m=>m.at).pop()||0;
  const msProgress=Math.max(4,Math.min(100,Math.round(((memberInfo.visits-prevAt)/(nextMs.at-prevAt))*100)));

  const optionSummary=(item)=>{
    const parts=[];
    if(item.options?.spicy)parts.push("🌶️"+item.options.spicy);
    if(item.options?.addons?.length)parts.push(item.options.addons.map(a=>"+"+a.name).join(" "));
    if(item.note)parts.push("📝"+item.note);
    return parts.join(" • ");
  };

  /* ==================== CSS ==================== */
  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
    .app{--bg:#0B0908;--surface:#151210;--surface2:#1C1814;--surface3:#231F1A;--ink:#EDE5D8;--muted:#8A7E6D;--line:#2A2520;--gold:#C9A96E;--gold2:#A88B4A;--danger:#E85D30;--success:#7FB069;font-family:'IBM Plex Sans Thai',sans-serif;background:var(--bg);color:var(--ink);max-width:430px;margin:0 auto;min-height:100vh;position:relative;}
    .display{font-family:'Prompt',sans-serif;}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 10px;position:sticky;top:0;z-index:50;background:rgba(11,9,8,.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line);}
    .logo{font-family:'Prompt';font-weight:700;font-size:18px;letter-spacing:.12em;color:var(--gold);}
    .logo small{display:block;font-size:9px;font-weight:400;letter-spacing:.35em;color:var(--muted);margin-top:1px;}
    .modepill{display:flex;background:var(--surface2);border-radius:99px;padding:3px;gap:2px;border:1px solid var(--line);}
    .modepill button{border:0;background:transparent;color:var(--muted);font-family:'Prompt';font-size:11px;font-weight:500;padding:6px 12px;border-radius:99px;cursor:pointer;transition:.3s;}
    .modepill button.on{background:var(--gold);color:#0B0908;font-weight:600;}
    .scroll{padding:0 18px 110px;}
    .hero{position:relative;border-radius:18px;overflow:hidden;margin:12px 0;height:160px;}.hero img{width:100%;height:100%;object-fit:cover;}
    .hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(11,9,8,.92) 0%,rgba(11,9,8,.3) 60%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:18px;}
    .hero-overlay h2{font-family:'Prompt';font-size:22px;font-weight:600;line-height:1.2;}.hero-overlay p{font-size:12px;color:var(--muted);margin-top:3px;}
    /* FIX 1.8: promotion strip */
    .promo-strip{background:linear-gradient(135deg,#1E1A14,#0F0D0A);border:1px solid rgba(201,169,110,.35);border-radius:16px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:12px;}
    .promo-strip .ps-icon{font-size:28px;flex-shrink:0;}
    .promo-strip .ps-text b{font-family:'Prompt';font-size:13.5px;font-weight:700;display:block;line-height:1.3;}
    .promo-strip .ps-text small{color:var(--muted);font-size:11px;display:block;margin-top:2px;}
    .promo-strip .ps-cta{margin-left:auto;background:var(--gold);color:#0B0908;border:0;border-radius:10px;font-family:'Prompt';font-size:11.5px;font-weight:700;padding:9px 13px;cursor:pointer;white-space:nowrap;flex-shrink:0;}
    .mcard{background:linear-gradient(135deg,#1E1A14,#0F0D0A);border:1px solid var(--line);border-radius:20px;padding:20px;position:relative;overflow:hidden;}
    .mcard::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;border:1px solid rgba(201,169,110,.1);}
    .mcard .tier{font-family:'Prompt';font-size:10px;letter-spacing:.25em;color:var(--gold);text-transform:uppercase;}
    .mcard .nm{font-family:'Prompt';font-size:18px;font-weight:600;margin:5px 0 2px;}
    .mcard .mid{font-size:12px;color:var(--muted);line-height:1.6;}
    .mcard .joinbtn{margin-top:14px;display:inline-block;background:var(--gold);color:#0B0908;font-family:'Prompt';font-size:12.5px;font-weight:700;border:0;border-radius:10px;padding:10px 16px;cursor:pointer;}
    .bar{height:5px;background:var(--surface2);border-radius:99px;margin:12px 0 6px;overflow:hidden;}
    .bar i{display:block;height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold));border-radius:99px;transition:width .6s;}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px;}
    .svc{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px 10px;text-align:center;cursor:pointer;transition:transform .15s;position:relative;}
    .svc:active{transform:scale(.96);}.svc .e{font-size:24px;}.svc .l{font-family:'Prompt';font-size:12px;font-weight:600;margin-top:7px;}
    .svc .s{font-size:10px;color:var(--muted);margin-top:2px;}.svc .lock{position:absolute;top:8px;right:9px;font-size:11px;}
    .h2{font-family:'Prompt';font-size:14px;font-weight:600;margin:24px 0 12px;display:flex;justify-content:space-between;align-items:baseline;}
    .h2 span{font-size:11px;color:var(--muted);font-weight:400;}
    .promo{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px;display:flex;gap:12px;align-items:center;margin-bottom:10px;}
    .promo b{font-family:'Prompt';font-size:13.5px;font-weight:600;display:block;line-height:1.4;}
    .promo small{color:var(--muted);font-size:11.5px;display:block;margin-top:1px;line-height:1.5;}
    .badge{margin-left:auto;background:var(--surface3);color:var(--gold);font-size:10px;font-weight:600;padding:4px 10px;border-radius:99px;white-space:nowrap;flex-shrink:0;border:1px solid var(--line);}
    .nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(11,9,8,.92);backdrop-filter:blur(14px);border-top:1px solid var(--line);display:flex;padding:8px 6px calc(10px + env(safe-area-inset-bottom));z-index:40;}
    .nav button{flex:1;border:0;background:transparent;color:var(--muted);font-family:'Prompt';font-size:10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;}
    .nav button .ne{font-size:20px;opacity:.5;}.nav button.on{color:var(--gold);}.nav button.on .ne{opacity:1;}
    .tableTag{display:inline-flex;align-items:center;gap:7px;background:var(--surface);color:var(--gold);border-radius:99px;font-family:'Prompt';font-size:12px;font-weight:500;padding:8px 14px;margin:10px 0 12px;border:1px solid var(--line);}
    .orderwrap{display:flex;}.rail{width:72px;flex-shrink:0;display:flex;flex-direction:column;gap:6px;position:sticky;top:56px;align-self:flex-start;max-height:72vh;overflow-y:auto;}
    .rail button{border:0;background:var(--surface);border:1px solid var(--line);color:var(--muted);border-radius:14px;padding:10px 4px;cursor:pointer;font-family:'Prompt';font-size:10px;font-weight:500;display:flex;flex-direction:column;gap:3px;align-items:center;}
    .rail button .e{font-size:18px;}.rail button.on{background:var(--gold);color:#0B0908;border-color:var(--gold);font-weight:600;}
    .items{flex:1;padding-left:10px;display:flex;flex-direction:column;gap:10px;}
    .item{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:11px;display:flex;gap:11px;align-items:center;}
    .item b{font-family:'Prompt';font-size:13px;font-weight:600;display:block;line-height:1.3;}
    .item small{color:var(--muted);font-size:10.5px;display:block;margin-top:1px;}
    .item .pr{font-family:'Prompt';font-weight:700;font-size:14px;margin-top:3px;color:var(--gold);}
    /* FIX 4.1: "เลือกเพิ่มได้" tag uses gold not danger */
    .tag{display:inline-block;background:var(--surface3);color:var(--gold);font-size:9px;font-weight:700;border-radius:6px;padding:2px 7px;margin-left:6px;vertical-align:1px;border:1px solid rgba(201,169,110,.2);}
    .tag-cust{display:inline-block;background:var(--surface3);color:var(--gold);font-size:9px;font-weight:700;border-radius:6px;padding:2px 7px;margin-left:6px;vertical-align:1px;border:1px solid rgba(201,169,110,.35);}
    .qty{margin-left:auto;display:flex;align-items:center;gap:8px;flex-shrink:0;}
    .qty button{width:30px;height:30px;border-radius:10px;border:1px solid var(--line);background:var(--surface2);color:var(--ink);font-size:16px;font-weight:600;cursor:pointer;line-height:1;}
    .qty button.add{background:var(--gold);color:#0B0908;border-color:var(--gold);}
    .qty b{font-family:'Prompt';min-width:14px;text-align:center;}
    .cartbar{position:fixed;bottom:70px;left:50%;transform:translateX(-50%);width:calc(100% - 36px);max-width:394px;background:var(--gold);color:#0B0908;border-radius:14px;padding:13px 18px;display:flex;justify-content:space-between;align-items:center;font-family:'Prompt';font-weight:600;font-size:13.5px;cursor:pointer;box-shadow:0 8px 28px rgba(201,169,110,.3);z-index:45;}
    .ovl{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:60;display:flex;align-items:flex-end;justify-content:center;}
    .sheet{background:var(--surface);width:100%;max-width:430px;border-radius:22px 22px 0 0;padding:20px 18px calc(20px + env(safe-area-inset-bottom));max-height:85vh;overflow-y:auto;border-top:1px solid var(--line);}
    .sheet h3{font-family:'Prompt';font-size:16px;font-weight:600;margin-bottom:14px;}
    .crow{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);}
    .crow b{font-family:'Prompt';font-size:13px;font-weight:600;}.crow small{color:var(--muted);}
    .cta{width:100%;border:0;background:var(--gold);color:#0B0908;font-family:'Prompt';font-size:14px;font-weight:700;border-radius:12px;padding:14px;margin-top:16px;cursor:pointer;}
    .ghost{width:100%;border:1px solid var(--line);background:transparent;color:var(--muted);font-family:'Prompt';font-size:12.5px;font-weight:500;border-radius:12px;padding:12px;margin-top:8px;cursor:pointer;}
    .statusCard{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:18px;margin-bottom:14px;}
    .step{display:flex;gap:12px;}.dotcol{display:flex;flex-direction:column;align-items:center;}
    .dot{width:26px;height:26px;border-radius:50%;background:var(--surface2);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
    .dot.done{background:var(--gold);border-color:var(--gold);color:#0B0908;}.dot.now{border-color:var(--gold);color:var(--gold);animation:pulse 1.4s infinite;}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.3);}50%{box-shadow:0 0 0 7px rgba(201,169,110,0);}}
    .vline{width:2px;flex:1;background:var(--line);min-height:22px;}.vline.done{background:var(--gold);}
    .step .tx b{font-family:'Prompt';font-size:13px;font-weight:600;display:block;}.step .tx small{color:var(--muted);font-size:11px;}
    .qrcard{background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:24px 18px;text-align:center;}
    .privE{font-size:40px;}.qrcard h3{font-family:'Prompt';font-size:17px;font-weight:600;margin:10px 0 4px;}.qrcard p{color:var(--muted);font-size:12px;line-height:1.7;}
    .msrow{display:flex;gap:11px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin-bottom:8px;}
    .msrow .n{font-family:'Prompt';font-weight:700;width:48px;font-size:12px;color:var(--gold);flex-shrink:0;}.msrow.locked{opacity:.45;}.msrow .chk{margin-left:auto;font-size:15px;}
    .frow{margin-bottom:14px;}.frow label{font-family:'Prompt';font-size:12px;font-weight:500;display:block;margin-bottom:6px;color:var(--muted);}
    .frow input,.frow select,.frow textarea{width:100%;border:1px solid var(--line);background:var(--surface2);color:var(--ink);border-radius:12px;padding:13px;font-family:'IBM Plex Sans Thai';font-size:15px;}
    .frow input:focus,.frow select:focus,.frow textarea:focus{outline:none;border-color:var(--gold);}.frow .hint{font-size:10.5px;color:var(--muted);margin-top:4px;}
    .zonebtns{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    .zonebtns button{border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:12px;padding:12px 8px;font-family:'Prompt';font-size:12px;font-weight:500;cursor:pointer;}
    .zonebtns button.on{background:var(--gold);color:#0B0908;border-color:var(--gold);font-weight:600;}
    .stat3{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:14px 0;}
    .stat{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:13px 8px;text-align:center;}
    .stat b{font-family:'Prompt';font-size:19px;font-weight:700;display:block;color:var(--gold);}.stat small{font-size:10px;color:var(--muted);}
    .toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:var(--gold);color:#0B0908;font-family:'Prompt';font-size:12.5px;font-weight:600;padding:11px 18px;border-radius:99px;z-index:90;box-shadow:0 8px 24px rgba(201,169,110,.4);animation:drop .3s;max-width:88%;text-align:center;}
    @keyframes drop{from{transform:translate(-50%,-16px);opacity:0;}to{transform:translate(-50%,0);opacity:1;}}
    .back{border:0;background:transparent;color:var(--muted);font-family:'Prompt';font-size:12.5px;font-weight:500;cursor:pointer;padding:6px 0;margin-bottom:4px;}
    .demoNote{background:var(--surface2);border-radius:12px;padding:10px 13px;font-size:11px;color:var(--muted);margin-top:14px;line-height:1.7;border:1px solid var(--line);}
    /* FIX 4.2: Customize sheet header */
    .cust-header{display:flex;gap:14px;align-items:center;margin-bottom:16px;}
    .cust-header .info b{font-family:'Prompt';font-size:16px;font-weight:600;display:block;}
    .cust-header .info small{color:var(--muted);font-size:12px;}
    .cust-header .info .pr{font-family:'Prompt';font-weight:700;font-size:16px;color:var(--gold);margin-top:4px;}
    .opt-group{margin-bottom:14px;}
    .opt-group label.gl{font-family:'Prompt';font-size:12.5px;font-weight:600;display:block;margin-bottom:8px;color:var(--gold);}
    .opt-row{display:flex;align-items:center;gap:10px;padding:9px 0;cursor:pointer;}
    .opt-row .radio{width:20px;height:20px;border-radius:50%;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .opt-row .radio.on{border-color:var(--gold);}.opt-row .radio.on::after{content:'';width:10px;height:10px;border-radius:50%;background:var(--gold);}
    .opt-row .chkbox{width:20px;height:20px;border-radius:6px;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;color:var(--gold);}
    .opt-row .chkbox.on{border-color:var(--gold);background:var(--gold);color:#0B0908;}
    .opt-row span{font-size:13px;flex:1;}.opt-row .extra{font-size:12px;color:var(--gold);font-family:'Prompt';font-weight:600;}
    .zonepick{display:flex;flex-direction:column;gap:10px;margin-bottom:14px;}
    .zonecard{position:relative;border-radius:16px;overflow:hidden;cursor:pointer;border:2px solid var(--line);transition:border-color .3s;}
    .zonecard:active{transform:scale(.98);}.zonecard.on{border-color:var(--gold);}
    .zonecard img{width:100%;height:110px;object-fit:cover;display:block;}
    .zonecard-info{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(11,9,8,.92),rgba(11,9,8,.1));padding:12px 14px 10px;}
    .zonecard-info b{font-family:'Prompt';font-size:14px;font-weight:600;display:block;}.zonecard-info small{color:var(--muted);font-size:11px;}
    .zonecard .zchk{position:absolute;top:10px;right:12px;width:24px;height:24px;border-radius:50%;background:rgba(11,9,8,.6);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--gold);}
    .zonecard.on .zchk{background:var(--gold);color:#0B0908;border-color:var(--gold);}
    .optline{font-size:11px;color:var(--muted);line-height:1.5;margin-top:2px;}
    .flowbox{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px;margin-top:16px;}
    .flowbox h4{font-family:'Prompt';font-size:13px;font-weight:600;margin-bottom:10px;display:flex;justify-content:space-between;color:var(--gold);}
    .flowbox h4 button{border:0;background:transparent;color:var(--muted);font-size:11px;cursor:pointer;font-family:'Prompt';}
    .fstep{display:flex;gap:9px;font-size:12px;color:var(--muted);margin-bottom:8px;align-items:flex-start;}
    .fstep b{font-family:'Prompt';color:var(--ink);font-weight:500;}
    .fstep .no{background:var(--surface3);color:var(--gold);font-family:'Prompt';font-weight:700;font-size:10px;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;border:1px solid var(--line);}
    /* Booking: no-show notice box */
    .notice-box{background:var(--surface2);border:1px solid var(--line);border-radius:12px;padding:11px 13px;font-size:11.5px;color:var(--muted);line-height:1.7;margin-bottom:14px;}
    .notice-box b{color:var(--ink);}
    /* Reservation confirmed code block */
    .resv-code{font-family:'Prompt';font-size:22px;font-weight:700;color:var(--gold);letter-spacing:.08em;margin:8px 0;}
    @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;}}
  `;

  /* ==================== CUSTOMIZE SHEET ==================== */
  // FIX 4.2: Added "เลือกตามชอบ" sheet title
  const CustomizeSheet=()=>{
    const m=customizing;if(!m)return null;
    const[spicy,setSpicy]=useState("ไม่เผ็ด");
    const[addons,setAddons]=useState([]);
    const[note,setNote]=useState("");
    const toggleAddon=(a)=>setAddons(p=>p.find(x=>x.name===a.name)?p.filter(x=>x.name!==a.name):[...p,a]);
    const hasAddon=(name)=>addons.some(a=>a.name===name);
    const addonTotal=addons.reduce((s,a)=>s+a.price,0);
    const total=m.price+addonTotal;
    const opts=m.custOpts||{};
    return(
      <div className="ovl" onClick={()=>setCustomizing(null)}>
        <div className="sheet" onClick={e=>e.stopPropagation()}>
          {/* FIX 4.2 */}
          <h3>เลือกตามชอบ</h3>
          <div className="cust-header">
            <FoodImg id={m.id} emoji={m.emoji} size={64}/>
            <div className="info"><b>{m.name}</b><small>{m.desc}</small><div className="pr">฿{total}</div></div>
          </div>
          {opts.spicy&&(
            <div className="opt-group">
              <label className="gl">🌶️ ระดับเผ็ด</label>
              {["ไม่เผ็ด","เผ็ดน้อย","เผ็ดกลาง","เผ็ดมาก"].map(lv=>(
                <div className="opt-row" key={lv} onClick={()=>setSpicy(lv)}>
                  <div className={"radio"+(spicy===lv?" on":"")}/>
                  <span>{lv}</span>
                </div>
              ))}
            </div>
          )}
          {opts.egg&&(
            <div className="opt-group">
              <label className="gl">🥚 เพิ่มเติม</label>
              {[{name:"ไข่ดาว",price:10},{name:"ไข่เจียว",price:15}].map(a=>(
                <div className="opt-row" key={a.name} onClick={()=>toggleAddon(a)}>
                  <div className={"chkbox"+(hasAddon(a.name)?" on":"")}>{hasAddon(a.name)?"✓":""}</div>
                  <span>{a.name}</span><span className="extra">+฿{a.price}</span>
                </div>
              ))}
            </div>
          )}
          {opts.extra&&(
            <div className="opt-group">
              {[{name:"พิเศษ (เพิ่มเนื้อ)",price:20}].map(a=>(
                <div className="opt-row" key={a.name} onClick={()=>toggleAddon(a)}>
                  <div className={"chkbox"+(hasAddon(a.name)?" on":"")}>{hasAddon(a.name)?"✓":""}</div>
                  <span>{a.name}</span><span className="extra">+฿{a.price}</span>
                </div>
              ))}
            </div>
          )}
          <div className="frow" style={{marginTop:4}}>
            <label>📝 หมายเหตุถึงครัว</label>
            <textarea rows={2} value={note} onChange={e=>setNote(e.target.value)} placeholder="เช่น ไม่ใส่ผัก / แพ้ถั่ว" style={{resize:"none",fontSize:13}}/>
          </div>
          <button className="cta" onClick={()=>{
            const o={};
            if(opts.spicy)o.spicy=spicy;
            if(addons.length)o.addons=addons;
            addCustomized(m,o,note.trim());
            setCustomizing(null);
            setToast(m.name+" เข้าตะกร้าแล้ว"+(addons.length?" (+"+addons.map(a=>a.name).join(",")+")":""));
          }}>เพิ่มลงตะกร้า — ฿{total}</button>
          <button className="ghost" onClick={()=>setCustomizing(null)}>ยกเลิก</button>
        </div>
      </div>
    );
  };

  /* ==================== PAGES ==================== */
  // FIX 1.3, 1.4, 1.5: Service grid updated sub-text for redeem and member
  const services=[
    {id:"order",emoji:night?"🍲":"☕",label:"สั่งอาหาร",sub:"สั่งจากโต๊ะ",go:"order"},
    // FIX 1.3 + 1.4
    {id:"redeem",emoji:"🥤",label:"อิตาเลียนโซดาฟรี",sub:isActive?"ใช้ได้วันนี้":"สมัครสมาชิก 299.-",go:"redeem",locked:!isActive},
    {id:"reserve",emoji:"🪑",label:"จองโต๊ะ",sub:night?"กลุ่ม/ห้องกระจก":"โซนทำงาน",go:"reserve"},
    // FIX 1.5
    {id:"member",emoji:"💳",label:isActive?"สมาชิก ✓":"สมัครสมาชิก",sub:isActive?"ใช้งานอยู่":isPending?"รอชำระ":"299.-/ปี",go:isActive?"profile":isPending?"pending":"register"},
    {id:"profile",emoji:"👤",label:"โปรไฟล์",sub:isActive?"ประวัติ":"เฉพาะสมาชิก",go:"profile",locked:!isActive},
    {id:"call",emoji:"🛎️",label:"เรียกพนักงาน",sub:"ขอน้ำซุป / เช็กบิล",action:"call"},
    {id:"line",emoji:"💬",label:"LINE ร้าน",sub:"@sahakon",action:"line"},
  ];
  const Nav=()=><nav className="nav">{[{id:"home",e:"🏠",l:"หน้าแรก"},{id:"order",e:"🍽️",l:"สั่งอาหาร"},{id:"redeem",e:"🎁",l:"สิทธิ์ของฉัน"},{id:"profile",e:"👤",l:"โปรไฟล์"}].map(n=><button key={n.id} className={page===n.id?"on":""} onClick={()=>setPage(n.id)}><span className="ne">{n.e}</span>{n.l}</button>)}</nav>;

  // FIX 1.2: MemberCard uses "อิตาเลียนโซดาฟรี"
  const MemberCard=()=>{
    if(isActive)return(<div className="mcard"><div className="tier">SAHAKON • Founder Member</div><div className="nm">คุณ{memberInfo.nickname}</div><div className="mid">{memberInfo.memberNo} • สมาชิกถึง มิ.ย. 2570</div><div className="bar"><i style={{width:msProgress+"%"}}/></div><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted)"}}><span>มาแล้ว {memberInfo.visits} ครั้ง</span><span>อีก {nextMs.at-memberInfo.visits} → <span style={{color:"var(--gold)"}}>{nextMs.reward}</span></span></div></div>);
    if(isPending)return(<div className="mcard" onClick={()=>setPage("pending")} style={{cursor:"pointer"}}><div className="tier">รอยืนยันการชำระ</div><div className="nm">คุณ{memberInfo.nickname} ⏳</div><div className="mid">ชำระ 299 ที่เคาน์เตอร์ แล้วแจ้งพนักงาน</div><button className="joinbtn">ดูขั้นตอนชำระ ›</button></div>);
    // FIX 1.2
    return(<div className="mcard" onClick={()=>setPage("register")} style={{cursor:"pointer"}}><div className="tier">SAHAKON • Founder Member</div><div className="nm">สมัครสมาชิก 299.-/ปี</div><div className="mid">ดื่มฟรีทั้งปี • อิตาเลียนโซดาฟรีวันละ 1 แก้ว นาน 365 วัน</div><button className="joinbtn">สมัครเลย</button></div>);
  };

  const Home=()=>(<div className="scroll">
    {/* FIX 1.1: Hero for guest adds soda value proposition */}
    <div className="hero"><img src={night?IMG.hero_night:IMG.hero_day} alt=""/><div className="hero-overlay">
      <h2 className="display">{isActive?"สวัสดี คุณ"+memberInfo.nickname:"SAHAKON"}</h2>
      {/* FIX 1.1 */}
      <p>{isActive?(night?"เปิด 10:30 – 24:00 • Cafe • Work • Chill":"เปิด 10:30 – 24:00 • Cafe • Work • Chill"):("🥤 ดื่มฟรีทั้งปี — อิตาเลียนโซดาฟรีวันละ 1 แก้ว สมัคร Founder Member 299.-")}</p>
    </div></div>
    {/* FIX 1.8: Promotion strip between hero and MemberCard (guest only) */}
    {!isActive&&(
      <div className="promo-strip">
        <span className="ps-icon">🥤</span>
        <div className="ps-text">
          <b>Founder Member 299.-/ปี</b>
          <small>ดื่มฟรีทั้งปี • วันละ 1 แก้ว นาน 365 วัน + บันไดรางวัล</small>
        </div>
        <button className="ps-cta" onClick={()=>setPage(isPending?"pending":"register")}>{isPending?"ดูขั้นตอน":"สมัครเลย"}</button>
      </div>
    )}
    <MemberCard/>
    <div className="grid">{services.map(s=><div key={s.id} className="svc" onClick={()=>{if(s.action==="call"){setToast("เรียกพนักงานแล้ว 🙏");return;}
              if(s.action==="line"){window.open("https://line.me/R/ti/p/@sahakon","_blank");return;}setPage(s.go);}}>{s.locked&&<span className="lock">🔒</span>}<div className="e">{s.emoji}</div><div className="l">{s.label}</div><div className="s">{s.sub}</div></div>)}</div>
    {showGuide&&<div className="flowbox"><h4 className="display">วิธีใช้งาน<button onClick={()=>setShowGuide(false)}>ซ่อน ✕</button></h4>
      {/* FIX 1.6: Updated step 3 text */}
      {[["นั่งโต๊ะ","สแกน QR บนโต๊ะ สั่งอาหาร"],["สั่งจากมือถือ","ออเดอร์เข้าหน้าจอพนักงาน"],["อยากอิตาเลียนโซดาฟรีทุกวัน?","สมัคร Founder Member 299.-"],["ใช้สิทธิ์","โชว์ QR ตอนจ่ายเงิน"]].map(([t,d],i)=><div className="fstep" key={i}><span className="no">{i+1}</span><span><b>{t}</b> {d}</span></div>)}
    </div>}
    <div className="h2">{night?"คืนนี้ที่ SAHAKON":"ข่าวสาร"}</div>
    {/* FIX 1.7: Promo card updated text */}
    {(night
      ?[
        {emoji:"🍲",title:"หมูจุ่ม M มา 4 จ่าย 3",sub:"ทุกอังคาร เวลา 17:00 เป็นต้นไป",badge:"คืนนี้"},
        {emoji:"🥤",title:"ดื่มฟรีทั้งปี",sub:"Founder Member รับอิตาเลียนโซดาฟรีวันละ 1 แก้ว",badge:"สมาชิก"},
      ]
      :[
        {emoji:"💳",title:"Founder Member 299.-/ปี",sub:"ดื่มฟรีทั้งปี • 1 สิทธิ์/วัน • ใช้ได้ 1 ปี",badge:"REDEEM NOW"},
        {emoji:"☕",title:"กาแฟ + เครื่องดื่ม",sub:"เปิด 10:30 – 24:00 ทุกวัน",badge:"เปิดทุกวัน"},
      ]
    ).map((p,i)=><div className="promo" key={i}><div style={{fontSize:26}}>{p.emoji}</div><div><b>{p.title}</b><small>{p.sub}</small></div><div className="badge">{p.badge}</div></div>)}
  </div>);

  // FIX 5.6: Register page uses "อิตาเลียนโซดาฟรีวันละ 1 แก้ว"
  const Register=()=>{
    const[nick,setNick]=useState("");const[phone,setPhone]=useState("");const[bday,setBday]=useState("");
    const valid=nick.trim().length>=1&&/^0\d{9}$/.test(phone);
    return(<div className="scroll"><button className="back" onClick={()=>setPage("home")}>‹ กลับ</button><div style={{textAlign:"center"}}><span style={{fontSize:40}}>💳</span></div>
      <h3 className="display" style={{textAlign:"center",fontSize:18,fontWeight:600,marginTop:6}}>สมัคร Founder Member</h3>
      {/* FIX 5.6 */}
      <p style={{textAlign:"center",color:"var(--muted)",fontSize:12,marginBottom:18}}>299 บาท/ปี • ดื่มฟรีทั้งปี • 1 สิทธิ์/วัน • ใช้ได้ 365 วัน</p>
      <div className="frow"><label>ชื่อเล่น</label><input value={nick} onChange={e=>setNick(e.target.value)} placeholder="เช่น เตชินท์" maxLength={20}/></div>
      <div className="frow"><label>เบอร์โทร</label><input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="08xxxxxxxx" inputMode="numeric"/></div>
      <div className="frow"><label>วันเกิด (วัน/เดือน)</label><input value={bday} onChange={e=>setBday(e.target.value)} placeholder="14/02" maxLength={5}/></div>
      <button className="cta" style={{opacity:valid?1:.45}} disabled={!valid} onClick={()=>{setMemberStatus("pending_payment");setMemberInfo(m=>({...m,nickname:nick.trim(),phone,birthday:bday,memberNo:"SHK-000"+(40+Math.floor(Math.random()*50))}));setPage("pending");}}>สมัคร — ไปชำระ 299</button>
    </div>);
  };

  const Pending=()=>(<div className="scroll"><button className="back" onClick={()=>setPage("home")}>‹ กลับ</button><div className="qrcard"><div className="privE">⏳</div><h3>รอชำระ 299 บาท</h3><p>รหัส: <b style={{color:"var(--gold)"}}>{memberInfo.memberNo}</b></p><div style={{display:"flex",justifyContent:"center",margin:"14px 0"}}><FakeQR seed={13}/></div><p><b style={{color:"var(--gold)"}}>QR PromptPay 299</b><br/>จ่ายแล้วแจ้งพนักงาน</p><button className="cta" onClick={()=>{setMemberStatus("active");setMemberInfo(m=>({...m,visits:1}));setToast("ยินดีต้อนรับ Founder Member! 🎉");setPage("home");}}>(เดโม) พนักงานยืนยันแล้ว</button><button className="ghost" onClick={()=>{setMemberStatus("guest");setMemberInfo({nickname:"",phone:"",birthday:"",memberNo:null,visits:0});setPage("home");}}>ยกเลิก</button></div><div className="demoNote">ของจริง: ปุ่มยืนยันอยู่ Staff Screen ลูกค้ากดเองไม่ได้</div></div>);

  /* ==================== ORDER ==================== */
  const Order=()=>{
    if(order&&!addingMore)return<OrderStatus/>;
    if(!table)return(<div className="scroll"><div style={{textAlign:"center",marginTop:16}}><span style={{fontSize:36}}>📍</span></div><h3 className="display" style={{textAlign:"center",fontSize:18,fontWeight:600,marginTop:8}}>{night?"นั่งโต๊ะก่อน เปิดบิลโต๊ะ":"เลือกโต๊ะที่คุณนั่ง"}</h3><p style={{textAlign:"center",color:"var(--muted)",fontSize:12,marginBottom:18}}>{night?"สั่งได้ตลอด รวมบิลเดียว":"ของจริงคือสแกน QR ที่ติดบนโต๊ะ"}</p><div className="h2">โซนในร้าน</div><div className="zonebtns" style={{gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>{["T01","T02","T03","T04","T05","T06","T07","T08"].map(t=><button key={t} onClick={()=>{setTable(t);setToast("เปิดโต๊ะ "+t);}}>{t}</button>)}</div><div className="h2">โซนสวน / กระจก</div><div className="zonebtns">{["สวน G1","สวน G2","กระจก K1","กระจก K2"].map(t=><button key={t} onClick={()=>{setTable(t);setToast("เปิดโต๊ะ "+t);}}>{t}</button>)}</div></div>);
    const list=MENU.filter(m=>m.cat===cat&&(CAT_MODE[m.cat]==="all"||(night?CAT_MODE[m.cat]==="night":CAT_MODE[m.cat]==="day")));
    return(<div className="scroll" style={{paddingLeft:14,paddingRight:14}}>
      <div className="tableTag">📍 {table} {order?"• สั่งเพิ่มรอบ "+(order.rounds.length+1):""}</div>
      {order&&<button className="back" onClick={()=>setAddingMore(false)}>‹ กลับดูบิลรวม</button>}
      <div className="orderwrap">
        <div className="rail">{cats.map(c=><button key={c.id} className={cat===c.id?"on":""} onClick={()=>setCat(c.id)}><span className="e">{c.emoji}</span>{c.name}</button>)}</div>
        <div className="items">{list.map(m=>(
          <div className="item" key={m.id}>
            <FoodImg id={m.id} emoji={m.emoji}/>
            <div style={{minWidth:0,flex:1}}>
              {/* FIX 4.1: "เลือกเพิ่มได้" in gold, not danger */}
              <b>{m.name}{m.tag&&<span className="tag">{m.tag}</span>}{m.cust&&<span className="tag-cust">⚙️ เลือกเพิ่มได้</span>}</b>
              <small>{m.desc}</small>
              <div className="pr">฿{m.price}</div>
            </div>
            <div className="qty">
              {!m.cust&&getMenuQty(m.id)>0&&(<><button onClick={()=>quickSub(m.id)}>−</button><b>{getMenuQty(m.id)}</b></>)}
              {m.cust&&getMenuQty(m.id)>0&&<b style={{fontSize:10,color:"var(--muted)"}}>{getMenuQty(m.id)}🧺</b>}
              <button className="add" onClick={()=>m.cust?setCustomizing(m):quickAdd(m)}>+</button>
            </div>
          </div>
        ))}</div>
      </div>
      {cartCount>0&&<div className="cartbar" onClick={()=>setCartOpen(true)}><span>🧺 {cartCount} รายการ</span><span>฿{cartTotal} ›</span></div>}
    </div>);
  };

  /* ==================== ORDER STATUS ==================== */
  const OrderStatus=()=>{
    const daySteps=[
      {id:"waiting_pos",t:"รอพนักงานรับออเดอร์",s:"เข้าหน้าจอพนักงาน"},
      {id:"waiting_payment",t:"รอชำระเงิน",s:"สแกน QR หรือจ่ายเคาน์เตอร์"},
      {id:"paid",t:"ชำระแล้ว → ส่งเข้าครัว",s:"พนักงานคีย์เข้า Ocha POS"},
      {id:"preparing",t:"ครัวกำลังทำ",s:"กำลังเตรียมอาหารของคุณ"},
      {id:"ready",t:"พร้อมเสิร์ฟ",s:"กำลังนำไปที่โต๊ะ "+table},
      {id:"completed",t:"เสิร์ฟแล้ว",s:"ทานให้อร่อยนะคะ"},
    ];
    const nightSteps=[
      {id:"waiting",t:"ร้านรับออเดอร์แล้ว",s:"เข้าหน้าจอพนักงาน"},
      {id:"preparing",t:"คีย์ Ocha POS • ครัวทำ",s:"กำลังจัดอาหาร"},
      {id:"ready",t:"พร้อมเสิร์ฟ",s:"กำลังนำไปที่โต๊ะ "+table},
      {id:"served",t:"เสิร์ฟแล้ว",s:"ทานให้อร่อยนะคะ"},
    ];
    const steps=night?nightSteps:daySteps;
    const lr=order.rounds[order.rounds.length-1];
    const idx=steps.findIndex(s=>s.id===lr.status);
    const rLabel=r=>r.status==="served"||r.status==="completed"?"✓ เสร็จ":r.status==="ready"?"กำลังเสิร์ฟ":r.status==="preparing"?"ครัวทำ":r.status==="paid"?"ส่งเข้าครัว":r.status==="waiting_payment"?"รอจ่าย":"รอร้านรับ";
    return(<div className="scroll">
      <button className="back" onClick={()=>setAddingMore(true)}>‹ สั่งเพิ่ม (รวมบิลเดียว)</button>
      <div className="statusCard">
        <div style={{display:"flex",justifyContent:"space-between"}}><b className="display" style={{fontSize:16,fontWeight:600}}>ออเดอร์ {order.no}</b><span style={{fontSize:11,color:"var(--muted)"}}>{table} • {order.rounds.length} รอบ</span></div>
        <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>สถานะรอบล่าสุด</div>
        <div style={{marginTop:12}}>{steps.map((s,i)=>(
          <div className="step" key={s.id}><div className="dotcol">
            <div className={"dot "+(i<idx?"done":i===idx?(["served","completed"].includes(lr.status)?"done":"now"):"")}>{i<idx||(i===idx&&["served","completed"].includes(lr.status))?"✓":i===idx?"●":""}</div>
            {i<steps.length-1&&<div className={"vline "+(i<idx?"done":"")}/>}
          </div><div className="tx" style={{paddingBottom:14}}><b style={{opacity:i<=idx?1:.4}}>{s.t}</b><small style={{opacity:i<=idx?1:.4}}>{s.s}</small></div></div>
        ))}</div>
        {!night&&lr.status==="waiting_payment"&&(<button className="cta" style={{padding:12,marginTop:4}} onClick={()=>setOrder(o=>{if(!o)return o;const rounds=o.rounds.map((r,i)=>i===o.rounds.length-1?{...r,status:"paid"}:r);return{...o,rounds};})}>
          (เดโม) ลูกค้าจ่ายเงินแล้ว
        </button>)}
      </div>
      <div className="statusCard">
        <b className="display" style={{fontSize:14,fontWeight:600}}>รายการทั้งหมด</b>
        {order.rounds.map(r=>(<div key={r.rNo} style={{marginTop:10}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span className="display" style={{fontSize:11,fontWeight:600,color:"var(--muted)"}}>รอบ {r.rNo}</span><span className="badge" style={{marginLeft:0}}>{rLabel(r)}</span></div>
          {r.items.map((it,ii)=>(<div className="crow" key={r.rNo+"-"+ii}>
            <FoodImg id={it.menuId} emoji={it.emoji} size={36}/>
            <div style={{flex:1}}>
              <b>{it.name}</b><small> × {it.qty}</small>
              {/* FIX 4.4 */}
              {it.free&&<small style={{display:"block",color:"var(--gold)"}}>สิทธิ์ Founder Member — ฟรี</small>}
              {optionSummary(it)&&<div className="optline">{optionSummary(it)}</div>}
            </div>
            <b>{it.free?"฿0":"฿"+(it.totalPrice*it.qty)}</b>
            <span style={{marginLeft:6,fontSize:13}}>{["served","completed"].includes(r.status)?"✅":"⏳"}</span>
          </div>))}
        </div>))}
        <div style={{display:"flex",justifyContent:"space-between",paddingTop:12,fontFamily:"Prompt",fontWeight:700,fontSize:15}}><span>ยอดรวม ({order.rounds.length} รอบ)</span><span style={{color:"var(--gold)"}}>฿{grandTotal}</span></div>
        {night?(<div style={{background:"var(--surface2)",borderRadius:12,padding:"12px 14px",marginTop:12,border:"1px solid var(--line)"}}><b className="display" style={{fontSize:12,fontWeight:600,color:"var(--gold)"}}>🍲 เปิดบิลโต๊ะ {table}</b><p style={{fontSize:11,color:"var(--muted)",marginTop:3,lineHeight:1.6}}>ทานก่อน จ่ายทีหลัง</p><button className="cta" style={{padding:12,marginTop:8}} onClick={()=>setToast("เช็กบิลโต๊ะ "+table+" — ฿"+grandTotal+" 🧾")}>เช็กบิลรวม — ฿{grandTotal}</button></div>)
        :(<div style={{textAlign:"center",marginTop:12}}><div style={{display:"flex",justifyContent:"center"}}><FakeQR size={108} seed={21}/></div><p style={{fontSize:11,color:"var(--muted)",marginTop:8}}>QR PromptPay จ่าย ฿{grandTotal}</p></div>)}
      </div>
      <button className="ghost" onClick={()=>{setOrder(null);setTable(null);setAddingMore(false);setPage("home");}}>ปิดบิล (เดโม)</button>
    </div>);
  };

  /* ==================== REDEEM ==================== */
  const Redeem=()=>{
    // FIX 5.1 / 5.2 / 5.3 / 5.4: All soda text updated to "อิตาเลียนโซดา"
    if(!isActive)return(<div className="scroll"><div style={{textAlign:"center",marginTop:24}}><span style={{fontSize:40}}>🔒</span></div><h3 className="display" style={{textAlign:"center",fontSize:18,fontWeight:600,marginTop:8}}>{isPending?"รอยืนยัน":"เฉพาะสมาชิก"}</h3><button className="cta" onClick={()=>setPage(isPending?"pending":"register")}>{isPending?"ดูขั้นตอนชำระ":"สมัคร 299.-"}</button><div className="h2" style={{marginTop:24}}>สิทธิ์ที่จะได้รับ</div>{MILESTONES.map(m=><div className="msrow locked" key={m.at}><div className="n">ครั้งที่ {m.at}</div><div style={{fontSize:12.5}}>{m.reward}</div><div className="chk">🔒</div></div>)}</div>);
    return(<div className="scroll">
      <div className="h2" style={{margin:"10px 0 12px"}}>สิทธิ์ของฉัน<span>Founder Member</span></div>
      <div className="qrcard">
        {/* FIX 5.2: Title updated */}
        {redeemStep==="idle"&&(<><div className="privE">🥤</div><h3>อิตาเลียนโซดาฟรี 1 แก้ว</h3><p>เงื่อนไข: ซื้อเมนูราคาเต็ม 1 รายการ</p>{sodaRedeemed?<button className="ghost" disabled style={{opacity:.5}}>ใช้แล้ว ✓ ({sodaFlavor})</button>:<button className="cta" onClick={()=>setRedeemStep("qr")}>รับสิทธิ์ — แสดง QR</button>}</>)}
        {redeemStep==="qr"&&(<>
          <h3>ยื่น QR ให้พนักงาน</h3>
          <div style={{display:"flex",justifyContent:"center",margin:"14px 0",position:"relative"}}>
            <div style={{position:"relative"}}>
              <FakeQR/>
              {qrExpired&&<div style={{position:"absolute",inset:0,background:"rgba(8,7,6,.88)",borderRadius:12,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
                <span style={{fontSize:28}}>⏱️</span>
                <span style={{fontFamily:"Prompt",fontSize:13,fontWeight:700,color:"var(--gold)"}}>QR หมดอายุแล้ว</span>
              </div>}
            </div>
          </div>
          {!qrExpired
            ?<div style={{textAlign:"center",fontSize:12,color:"var(--muted)",marginBottom:8}}>หมดอายุใน <b style={{color:qrTimer<=15?"var(--danger)":"var(--gold)",fontFamily:"Prompt"}}>{qrTimer}s</b></div>
            :<button className="cta" style={{marginBottom:8}} onClick={()=>setRedeemStep("qr")}>สร้าง QR ใหม่</button>
          }
          {/* S3: Push to staff queue — ของจริง staff กด approve จาก staff screen */}
          <button className="cta" disabled={qrExpired} style={{opacity:qrExpired?.4:1}} onClick={()=>{
            const reqId=newUid();
            setRedeemQueue(q=>[...q,{id:reqId,memberName:memberInfo.nickname||"สมาชิก",memberNo:memberInfo.memberNo||"SHK-???",requestedAt:new Date().toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"})}]);
            setToast("ส่งคำขอไปที่ Staff Screen แล้ว รอพนักงานอนุมัติ");
          }}>ส่งให้พนักงานอนุมัติ</button>
          <button className="ghost" style={{marginTop:6}} onClick={()=>{
            // Demo shortcut: simulate staff approval immediately
            setRedeemStep("flavor");
          }}>(เดโม) พนักงานสแกนแล้ว — ข้ามสู่เลือกรส</button>
          <button className="ghost" onClick={()=>setRedeemStep("idle")}>ยกเลิก</button>
        </>)}
        {/* FIX 5.3: Flavor heading updated */}
        {redeemStep==="flavor"&&(<><div className="privE">🥤</div><h3>เลือกรสอิตาเลียนโซดา</h3><div className="zonebtns" style={{gridTemplateColumns:"1fr 1fr 1fr",marginTop:10}}>{["แดงมะนาว","ลิ้นจี่","ส้ม","กีวี","องุ่น","บลูฮาวาย","พันช์","สับปะรด","แอปเปิ้ล"].map(f=><button key={f} className={sodaFlavor===f?"on":""} onClick={()=>setSodaFlavor(f)}>{f}</button>)}</div><button className="cta" style={{opacity:sodaFlavor?1:.45}} disabled={!sodaFlavor} onClick={()=>{setSodaRedeemed(true);setMemberInfo(m=>({...m,visits:m.visits+1}));addFreeSoda(sodaFlavor);
          // FIX 5.4: Toast text updated
          setToast("อิตาเลียนโซดา"+sodaFlavor+" เข้าตะกร้าแล้ว (สิทธิ์ Founder Member)");setRedeemStep("upsell");}}>ยืนยันรส</button></>)}
        {redeemStep==="upsell"&&(<><div className="privE">😋</div><h3>เมนูแนะนำคู่อิตาเลียนโซดา</h3><p>{night?"โซดาตัดเลี่ยนน้ำจิ้มหมูจุ่ม รสชาติลงตัว":"เมนูที่ลูกค้าสั่งคู่อิตาเลียนโซดาบ่อยสุด"}</p></>)}
      </div>
      {redeemStep==="upsell"&&(<>{(night?[{id:"mj-s",copy:"เซ็ตเริ่มต้นยอดนิยม"},{id:"mj-m",copy:"3-4 คน อัป M คุ้มกว่า"},{id:"a4",copy:"ทานเล่นรอน้ำซุป"}]:[{id:"r1",copy:"กะเพราหมูสับ คู่ขวัญอิตาเลียนโซดา"},{id:"cf1",copy:"อเมริกาโน่ + อิตาเลียนโซดาฟรี"},{id:"a4",copy:"รวมเล่น 3 อย่าง คุ้มมาก"}]).map(u=>{const m=MENU.find(x=>x.id===u.id);if(!m)return null;return(<div className="promo" key={u.id}><FoodImg id={m.id} emoji={m.emoji} size={48}/><div style={{flex:1}}><b>{m.name} — ฿{m.price}</b><small>{u.copy}</small></div><button className="qty add" style={{width:32,height:32}} onClick={()=>{quickAdd(m);setToast(m.name+" +1");}}>+</button></div>);})}<button className="cta" style={{opacity:paidCount>0?1:.45}} disabled={paidCount===0} onClick={()=>{setRedeemStep("idle");setPage("order");setCartOpen(true);}}>{paidCount>0?"ไปตะกร้า ("+cartCount+" รายการ ฿"+cartTotal+")":"เลือกเมนูอีก 1 รายการก่อน"}</button><button className="ghost" onClick={()=>{setRedeemStep("idle");setPage("order");}}>ดูเมนูหลักทั้งหมด</button></>)}
      <div className="h2">บันไดรางวัลสะสม<span>มาแล้ว {memberInfo.visits} ครั้ง</span></div>
      {MILESTONES.map(m=><div className={"msrow "+(memberInfo.visits>=m.at?"":"locked")} key={m.at}><div className="n">ครั้งที่ {m.at}</div><div style={{fontSize:12.5}}>{m.reward}</div><div className="chk">{memberInfo.visits>=m.at?"✅":"🔒"}</div></div>)}
    </div>);
  };

  /* ==================== RESERVE ==================== */
  // FIX 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5
  const Reserve=()=>{
    const dateOpts=getDateOptions(isActive?60:7);
    const[zone,setZone]=useState(night?"โซนสวน":"โซนทำงาน ชั้น 2");
    const[ppl,setPpl]=useState("2");
    // FIX 2.1: Date picker state
    const[date,setDate]=useState(dateOpts[0].value);
    // FIX 2.4: label changed, time slots 30-min
    const[time,setTime]=useState(night?"19:00":"13:00");
    // FIX 2.2: Duration
    const[duration,setDuration]=useState("2 ชั่วโมง");
    // FIX 3.1: Contact fields; member auto-fills
    const[guestName,setGuestName]=useState(isActive?memberInfo.nickname:"");
    const[guestPhone,setGuestPhone]=useState(isActive?memberInfo.phone:"");
    const[forOther,setForOther]=useState(false);
    const filtered=ZONES.filter(z=>night?z.night:z.day);
    const selZ=ZONES.find(z=>z.id===zone);
    const valid=guestName.trim().length>=1&&/^0\d{9}$/.test(guestPhone);

    if(resv)return(<div className="scroll"><button className="back" onClick={()=>setPage("home")}>‹ กลับ</button>
      <div className="qrcard">
        <div className="privE">✅</div>
        <h3>ส่งคำขอจองแล้ว</h3>
        {/* FIX 3.4: Reservation code */}
        <div className="resv-code">{resv.code}</div>
        {/* FIX 3.5: More info on confirmed page */}
        <p style={{marginBottom:4}}>ชื่อ: <b style={{color:"var(--ink)"}}>{resv.name}</b></p>
        <p>{resv.zone} • {resv.ppl} คน</p>
        <p>{resv.dateLabel} เวลา {resv.time} น. • {resv.duration}</p>
        <p style={{marginTop:8,color:"var(--gold)",fontSize:11}}>ร้านยืนยันผ่าน LINE ใน 10 นาที</p>
        {/* FIX 3.5: No-show reminder on confirmed */}
        <div className="notice-box" style={{textAlign:"left",marginTop:12}}>⚠️ <b>เก็บที่นั่งให้ 30 นาที</b> หลังเวลานัด หากไม่มาอาจถูกยกเลิกอัตโนมัติ</div>
        <button className="ghost" onClick={()=>setResv(null)}>จองใหม่</button>
      </div>
    </div>);

    return(<div className="scroll"><button className="back" onClick={()=>setPage("home")}>‹ กลับ</button>
      <h3 className="display" style={{fontSize:18,fontWeight:600,marginTop:8}}>จองโต๊ะ</h3>
      <p style={{color:"var(--muted)",fontSize:12,marginBottom:16}}>เลือกโซน — ไม่มีค่าใช้จ่าย</p>
      {/* FIX 3.2: Standard booking notice */}
      <div className="notice-box">📌 <b>จองฟรี ไม่การันตีที่นั่ง</b> — ร้านจะยืนยันผ่าน LINE ภายใน 10 นาที</div>
      <div className="zonepick">{filtered.map(z=>(<div key={z.id} className={"zonecard"+(zone===z.id?" on":"")} onClick={()=>setZone(z.id)}><img src={z.img} alt={z.name}/><div className="zonecard-info"><b>{z.name}</b><small>{z.sub} • {z.cap}</small></div><div className="zchk">{zone===z.id?"✓":""}</div></div>))}</div>
      <div className="frow"><label>จำนวนคน {selZ?"("+selZ.cap+")":""}</label><select value={ppl} onChange={e=>setPpl(e.target.value)}>{["1","2","3","4","5-6","7-10"].map(n=><option key={n}>{n}</option>)}</select></div>
      {/* FIX 2.1: Date picker */}
      <div className="frow">
        <label>วันที่ {isActive?"(จองล่วงหน้าได้ 60 วัน)":"(จองล่วงหน้าได้ 7 วัน)"}</label>
        <select value={date} onChange={e=>setDate(e.target.value)}>
          {dateOpts.map(d=><option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
      </div>
      {/* FIX 2.4: Label updated, FIX 2.3: 30-min slots */}
      <div className="frow">
        <label>เวลาเริ่มใช้งาน</label>
        <select value={time} onChange={e=>setTime(e.target.value)}>
          {TIME_SLOTS.map(t=><option key={t}>{t}</option>)}
        </select>
      </div>
      {/* FIX 2.2: Duration */}
      <div className="frow">
        <label>ระยะเวลาใช้งาน</label>
        <select value={duration} onChange={e=>setDuration(e.target.value)}>
          {DURATION_OPTS.map(d=><option key={d}>{d}</option>)}
        </select>
      </div>
      {/* FIX 3.1: Contact info */}
      <div className="frow">
        <label>ชื่อผู้จอง</label>
        <input value={guestName} onChange={e=>setGuestName(e.target.value)} placeholder="ชื่อ-นามสกุล" maxLength={40}/>
      </div>
      <div className="frow">
        <label>เบอร์ติดต่อ</label>
        <input value={guestPhone} onChange={e=>setGuestPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="08xxxxxxxx" inputMode="numeric"/>
      </div>
      {isActive&&(
        <div className="frow">
          <div className="opt-row" onClick={()=>{setForOther(p=>!p);if(!forOther){setGuestName("");setGuestPhone("");}else{setGuestName(memberInfo.nickname);setGuestPhone(memberInfo.phone);}}}>
            <div className={"chkbox"+(forOther?" on":"")} style={{width:20,height:20,borderRadius:6,border:"2px solid var(--line)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"var(--gold)"}}>{forOther?"✓":""}</div>
            <span style={{fontSize:13}}>จองในนามบุคคลอื่น</span>
          </div>
        </div>
      )}
      {/* FIX 3.3: No-show policy before confirm */}
      <div className="notice-box">⏰ <b>นโยบาย No-show:</b> เก็บที่นั่งให้ 30 นาที หลังจากนั้นอาจถูกยกเลิกอัตโนมัติ</div>
      <button className="cta" style={{opacity:valid?1:.45}} disabled={!valid} onClick={()=>{
        const dateLabel=dateOpts.find(d=>d.value===date)?.label||date;
        const code=genBookingCode();
        setResv({zone,ppl,time,date,dateLabel,duration,name:guestName.trim(),code});
        // Add to staff booking list
        setBookingList(bl=>[...bl,{zone,ppl,time,date,dateLabel,duration,name:guestName.trim(),phone:guestPhone,code}]);
      }}>ยืนยันการจอง</button>
    </div>);
  };

  /* ==================== PROFILE ==================== */
  const Profile=()=>{
    if(!isActive)return(<div className="scroll"><div style={{textAlign:"center",marginTop:24}}><span style={{fontSize:40}}>🔒</span></div><h3 className="display" style={{textAlign:"center",fontSize:18,fontWeight:600,marginTop:8}}>{isPending?"รอยืนยัน":"เฉพาะสมาชิก"}</h3><button className="cta" onClick={()=>setPage(isPending?"pending":"register")}>{isPending?"ดูขั้นตอนชำระ":"สมัคร 299.-"}</button></div>);
    return(<div className="scroll">
      <div className="mcard" style={{marginTop:10}}><div className="tier">MEMBER PROFILE</div><div className="nm">คุณ{memberInfo.nickname}</div><div className="mid">โทร {memberInfo.phone.replace(/(\d{3})(\d{3})(\d{4})/,"$1-xxx-$3")} • วันเกิด {memberInfo.birthday||"-"}</div></div>
      <div className="stat3"><div className="stat"><b>{memberInfo.visits}</b><small>ครั้งที่มา</small></div><div className="stat"><b>{sodaRedeemed?1:0}</b><small>อิตาเลียนโซดา</small></div><div className="stat"><b>365</b><small>วันคงเหลือ</small></div></div>
      <div className="h2">ประวัติ</div>
      {memberInfo.visits===0?<div className="promo"><div style={{fontSize:26}}>🌱</div><div><b>ยังไม่มีประวัติ</b><small>ใช้สิทธิ์อิตาเลียนโซดาครั้งแรกเพื่อเริ่มนับ</small></div></div>
      :<div className="promo"><div style={{fontSize:26}}>🥤</div><div><b>วันนี้ • ใช้สิทธิ์อิตาเลียนโซดา</b><small>ครั้งที่ {memberInfo.visits}</small></div><div className="badge">ล่าสุด</div></div>}
      <button className="ghost" onClick={()=>setToast("ต่ออายุปีที่ 2 ที่เคาน์เตอร์ 🎉")}>ต่ออายุปีที่ 2 — 299.-</button>
    </div>);
  };

  /* Logo tap counter for staff screen */
  const logoTaps=React.useRef(0);
  const logoTimer=React.useRef(null);
  const handleLogoTap=()=>{
    logoTaps.current+=1;
    clearTimeout(logoTimer.current);
    logoTimer.current=setTimeout(()=>{logoTaps.current=0;},1200);
    if(logoTaps.current>=3){logoTaps.current=0;setStaffOpen(true);}
  };

  /* ==================== RENDER ==================== */
  return(<div className="app"><style>{css}</style>
    {staffOpen&&<StaffScreen
      orders={order?[order]:[]}
      onAdvance={staffAdvance}
      redeemQueue={redeemQueue}
      onApproveRedeem={staffApproveRedeem}
      bookings={bookingList}
      onClose={()=>setStaffOpen(false)}
    />}
    <header className="topbar">
      <div className="logo" onClick={handleLogoTap} style={{cursor:"default",userSelect:"none"}}>SAHAKON<small>CAFE • WORK • CHILL • 10:30–24:00</small></div>
      <div className="modepill"><button className={!night?"on":""} onClick={()=>setMode("day")}>☀️ กลางวัน</button><button className={night?"on":""} onClick={()=>setMode("night")}>🌙 กลางคืน</button></div>
    </header>
    {page==="home"&&<Home/>}{page==="order"&&<Order/>}{page==="redeem"&&<Redeem/>}
    {page==="reserve"&&<Reserve/>}{page==="profile"&&<Profile/>}
    {page==="register"&&<Register/>}{page==="pending"&&<Pending/>}
    {customizing&&<CustomizeSheet/>}
    {cartOpen&&(<div className="ovl" onClick={()=>setCartOpen(false)}><div className="sheet" onClick={e=>e.stopPropagation()}>
      <h3>{table||"ยังไม่เลือกโต๊ะ"}{order?" • รอบ "+(order.rounds.length+1):""}</h3>
      {cart.map(ci=>(<div className="crow" key={ci.uid}>
        <FoodImg id={ci.menuId} emoji={ci.emoji} size={40}/>
        <div style={{flex:1}}><b>{ci.name}</b>
          {ci.free?<small style={{color:"var(--gold)",fontWeight:600,display:"block"}}>สิทธิ์ Founder Member — ฟรี</small>:<small style={{display:"block"}}>฿{ci.totalPrice}</small>}
          {optionSummary(ci)&&<div className="optline">{optionSummary(ci)}</div>}
        </div>
        {ci.free
          ?<button onClick={()=>setCart(c=>c.filter(i=>i.uid!==ci.uid))} style={{border:0,background:"transparent",color:"var(--danger)",fontSize:18,cursor:"pointer",padding:"4px 6px",flexShrink:0}}>✕</button>
          :<div className="qty">
            <button onClick={()=>updateCartQty(ci.uid,-1)}>−</button>
            <b>{ci.qty}</b>
            <button className="add" onClick={()=>updateCartQty(ci.uid,1)}>+</button>
            <button onClick={()=>setCart(c=>c.filter(i=>i.uid!==ci.uid))} style={{border:0,background:"transparent",color:"var(--danger)",fontSize:16,cursor:"pointer",padding:"4px 4px",marginLeft:2,flexShrink:0}}>✕</button>
          </div>
        }
      </div>))}
      <div style={{display:"flex",justifyContent:"space-between",paddingTop:14,fontFamily:"Prompt",fontWeight:700,fontSize:15}}><span>รวม</span><span style={{color:"var(--gold)"}}>฿{cartTotal}</span></div>
      {hasFreeSodaInCart&&paidCount===0&&<p style={{fontSize:11,color:"var(--danger)",marginTop:8}}>⚠️ เลือกเมนูราคาเต็มอีก 1 รายการก่อนยืนยัน</p>}
      <button className="cta" style={{opacity:paidCount>0?1:.45}} disabled={paidCount===0} onClick={submitOrder}>ยืนยันเมนู — สั่งรายการนี้</button>
      <button className="ghost" onClick={()=>setCartOpen(false)}>เลือกเมนูต่อ</button>
    </div></div>)}
    {toast&&<div className="toast">{toast}</div>}
    <Nav/>
  </div>);
}
