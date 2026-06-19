import React, { useState, useEffect } from "react";
/* SAHAKON v4.2 — Typography-first design, no image dependency */

const IMG = {
  "mj-s":"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop&q=80",
  "mj-m":"https://images.unsplash.com/photo-1547928578-bca3e9c5a0ab?w=200&h=200&fit=crop&q=80",
  "mj-l":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  "d1":"https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=200&h=200&fit=crop&q=80",
  "d2":"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop&q=80",
  "d3":"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop&q=80",
  "d4":"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop&q=80",
  "d5":"https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=200&h=200&fit=crop&q=80",
  "i1":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
  "i2":"https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&q=80",
  "i3":"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop&q=80",
  "i4":"https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=200&h=200&fit=crop&q=80",
  "i5":"https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=200&h=200&fit=crop&q=80",
  "a1":"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop&q=80",
  "a2":"https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop&q=80",
  "a3":"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&h=200&fit=crop&q=80",
  "a4":"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop&q=80",
  "c1":"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop&q=80",
  "c2":"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop&q=80",
  "c3":"https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&h=200&fit=crop&q=80",
  "c4":"https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=200&h=200&fit=crop&q=80",
  "c5":"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&q=80",
  "t1":"https://images.unsplash.com/photo-1558857563-b371033873b8?w=200&h=200&fit=crop&q=80",
  "t2":"https://images.unsplash.com/photo-1556881286-fc6915169721?w=200&h=200&fit=crop&q=80",
  "t3":"https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop&q=80",
  "bk1":"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop&q=80",
  "bk2":"https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=200&h=200&fit=crop&q=80",
  "bk3":"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop&q=80",
  "s1":"https://images.unsplash.com/photo-1558645836-e44122a743ee?w=200&h=200&fit=crop&q=80",
  "b1":"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop&q=80",
};

/* Emoji fallback with gradient bg — shown when no real photo is available */
function FoodImg({id,emoji,size=56}){
  const[err,setErr]=useState(false);
  const src=IMG[id];
  if(!src||err)return(
    <div style={{width:size,height:size,borderRadius:10,background:"linear-gradient(135deg,#1C1814,#231F1A)",border:"1px solid #2A2520",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.54,flexShrink:0}}>{emoji}</div>
  );
  return<img src={src} alt="" width={size} height={size} onError={()=>setErr(true)} style={{borderRadius:10,objectFit:"cover",flexShrink:0}} loading="lazy"/>;
}

function FakeQR({size=148,seed=7}){
  const n=17;let s=seed;
  const rand=()=>{s=(s*16807)%2147483647;return s/2147483647;};
  const grid=[];
  for(let r=0;r<n;r++){grid.push([]);for(let c=0;c<n;c++)grid[r].push(rand()>.52);}
  const finder=(r0,c0)=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){const e=r===0||r===6||c===0||c===6;const co=r>=2&&r<=4&&c>=2&&c<=4;grid[r0+r][c0+c]=e||co;}};
  finder(0,0);finder(0,n-7);finder(n-7,0);
  const cl=size/n;
  const cells=[];
  for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(grid[r][c])cells.push(<rect key={r+"-"+c} x={c*cl} y={r*cl} width={cl} height={cl}/>);
  return<svg width={size} height={size} style={{display:"block",background:"#FAF6EE",borderRadius:12}} viewBox={"0 0 "+size+" "+size}><g fill="#1A1714">{cells}</g></svg>;
}

function genTimeSlots(start="10:00",end="22:00"){
  const slots=[];let[h,m]=start.split(":").map(Number);const[eh,em]=end.split(":").map(Number);
  while(h<eh||(h===eh&&m<=em)){slots.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);m+=30;if(m>=60){m=0;h++;}}
  return slots;
}
function genBookingCode(){
  const now=new Date();
  return`BK-${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}-${String(Math.floor(Math.random()*900)+100)}`;
}

/* ==================== MENU DATA ==================== */
const MENU=[
  {id:"d1",cat:"rice",name:"ข้าวกะเพราหมูสับ",desc:"ผัดกะเพราใบโหระพา",price:79,emoji:"🍛",tag:"ขายดี",cust:true,custOpts:{spicy:true,egg:true,extra:true}},
  {id:"d2",cat:"rice",name:"ข้าวหมูทอดกระเทียม",desc:"หอมกระเทียมเจียว",price:79,emoji:"🍛",cust:true,custOpts:{spicy:false,egg:true,extra:true}},
  {id:"d3",cat:"rice",name:"ข้าวผัดหมู",desc:"ผัดร้อนๆ จากกระทะ",price:79,emoji:"🍚",cust:true,custOpts:{spicy:true,egg:true,extra:true}},
  {id:"d4",cat:"rice",name:"ผัดพริกแกงหมู",desc:"เผ็ดกลาง ราดข้าว",price:79,emoji:"🍛",cust:true,custOpts:{spicy:true,egg:true,extra:false}},
  {id:"d5",cat:"rice",name:"คะน้าหมูกรอบ",desc:"หมูกรอบทอดใหม่",price:89,emoji:"🥬",cust:true,custOpts:{spicy:false,egg:true,extra:true}},
  {id:"c1",cat:"drink",name:"อเมริกาโน่",desc:"ร้อน / เย็น",price:50,emoji:"☕",tag:"ขายดี"},
  {id:"c2",cat:"drink",name:"ลาเต้",desc:"ร้อน / เย็น",price:55,emoji:"☕"},
  {id:"c3",cat:"drink",name:"เอสเพรสโซ่",desc:"เข้มถึงใจ",price:45,emoji:"☕"},
  {id:"c4",cat:"drink",name:"มอคค่า",desc:"ช็อกโกแลตแท้",price:60,emoji:"☕"},
  {id:"c5",cat:"drink",name:"คาปูชิโน่",desc:"ฟองนมเนียน",price:55,emoji:"☕"},
  {id:"t1",cat:"drink",name:"ชาไทย",desc:"เข้มข้นสูตรร้าน",price:50,emoji:"🧋"},
  {id:"t2",cat:"drink",name:"ชาเขียว",desc:"หอมมัทฉะ",price:55,emoji:"🍵"},
  {id:"t3",cat:"drink",name:"โกโก้",desc:"โกโก้แท้ 100%",price:55,emoji:"🍫"},
  {id:"s1",cat:"drink",name:"อิตาเลียนโซดาแดงมะนาว",desc:"สิทธิ์ Founder Member ฟรีวันละ 1 แก้ว",price:45,emoji:"🥤",tag:"Member"},
  {id:"s2",cat:"drink",name:"อิตาเลียนโซดาลิ้นจี่",desc:"สิทธิ์ Founder Member ฟรีวันละ 1 แก้ว",price:45,emoji:"🥤"},
  {id:"s3",cat:"drink",name:"อิตาเลียนโซดาส้ม",desc:"สิทธิ์ Founder Member ฟรีวันละ 1 แก้ว",price:45,emoji:"🥤"},
  {id:"bk1",cat:"bakery",name:"แซนด์วิชแฮมชีส",desc:"อบร้อน ชีสยืด",price:65,emoji:"🥪"},
  {id:"bk2",cat:"bakery",name:"ครัวซองต์เนยสด",desc:"อบใหม่ทุกเช้า",price:55,emoji:"🥐"},
  {id:"bk3",cat:"bakery",name:"บราวนี่ช็อกโกแลต",desc:"หนึบ เข้มโกโก้",price:45,emoji:"🍰"},
  {id:"a1",cat:"snack",name:"เฟรนช์ฟราย",desc:"ซอส 2 อย่าง",price:69,emoji:"🍟"},
  {id:"a2",cat:"snack",name:"นักเก็ตไก่",desc:"10 ชิ้น",price:69,emoji:"🍗"},
  {id:"a3",cat:"snack",name:"ไก่สติ๊ก",desc:"กรอบนอกนุ่มใน",price:75,emoji:"🍗"},
  {id:"a4",cat:"snack",name:"เอ็นไก่ทอด",desc:"คู่เบียร์เย็นๆ",price:79,emoji:"🍢"},
  {id:"set1",cat:"set",name:"เซ็ตจานเดียว+น้ำ",desc:"อาหารตามสั่ง 1 + น้ำ 1",price:89,emoji:"🍱",tag:"คุ้ม"},
  {id:"set2",cat:"set",name:"เซ็ตกาแฟ+เบเกอรี่",desc:"กาแฟ 1 + เบเกอรี่ 1",price:79,emoji:"☕",tag:"คุ้ม"},
  {id:"mj-s",cat:"moojum",name:"หมูจุ่ม Size S",desc:"1-2 คน • น้ำซุปสมุนไพร",price:99,emoji:"🍲",tag:"ขายดี"},
  {id:"mj-m",cat:"moojum",name:"หมูจุ่ม Size M",desc:"3-4 คน • จัดเต็มกว่า",price:199,emoji:"🍲",tag:"พระเอก"},
  {id:"mj-l",cat:"moojum",name:"หมูจุ่ม Size L",desc:"5-6 คน • จัดเต็มทั้งโต๊ะ",price:299,emoji:"🍲"},
  {id:"i1",cat:"isan",name:"ลาบหมู",desc:"เผ็ดสั่งได้",price:79,emoji:"🌶️",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"i2",cat:"isan",name:"น้ำตกหมู",desc:"ย่างเตาถ่าน",price:79,emoji:"🥩",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"i3",cat:"isan",name:"ตับหวาน",desc:"ลวกกำลังดี",price:79,emoji:"🥩"},
  {id:"i4",cat:"isan",name:"ตำลาว",desc:"ปลาร้านัว",price:65,emoji:"🥗",tag:"ขายดี",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"i5",cat:"isan",name:"ตำไทย",desc:"หวานนำ ถั่วลิสง",price:65,emoji:"🥗",cust:true,custOpts:{spicy:true,egg:false,extra:false}},
  {id:"b1",cat:"beer",name:"ช้าง",desc:"ขวดใหญ่ เย็นจัด",price:80,emoji:"🍺"},
  {id:"b2",cat:"beer",name:"ลีโอ",desc:"ขวดใหญ่ เย็นจัด",price:80,emoji:"🍺"},
  {id:"b3",cat:"beer",name:"สิงห์",desc:"ขวดใหญ่ เย็นจัด",price:85,emoji:"🍺"},
  {id:"ao1",cat:"addon_mj",name:"หมูสไลด์",desc:"เนื้อหมูสไลด์บาง",price:39,emoji:"🥩"},
  {id:"ao2",cat:"addon_mj",name:"หมูหมักงา",desc:"หมักซอสงา หอม",price:49,emoji:"🥩"},
  {id:"ao3",cat:"addon_mj",name:"สามชั้น",desc:"สไลด์มีมัน",price:49,emoji:"🥓"},
  {id:"ao4",cat:"addon_mj",name:"ตับ",desc:"ลวกจิ้มน้ำจิ้ม",price:39,emoji:"🫀"},
  {id:"ao5",cat:"addon_mj",name:"เบคอน",desc:"พรีเมียม",price:59,emoji:"🥓",tag:"แนะนำ"},
  {id:"ao6",cat:"addon_mj",name:"ผักรวม",desc:"ผักบุ้ง+ผักกาด+เห็ด",price:39,emoji:"🥬"},
  {id:"ao7",cat:"addon_mj",name:"เห็ดรวม",desc:"3 ชนิด",price:39,emoji:"🍄"},
  {id:"ao8",cat:"addon_mj",name:"วุ้นเส้น",desc:"เส้นใส",price:15,emoji:"🍜"},
  {id:"ao9",cat:"addon_mj",name:"มาม่า",desc:"ยี่ห้อดัง",price:15,emoji:"🍜"},
  {id:"ao10",cat:"addon_mj",name:"บะหมี่",desc:"เส้นเหลือง",price:20,emoji:"🍝"},
];

const DAY_CATS=[
  {id:"rice",name:"ตามสั่ง",emoji:"🍛"},{id:"drink",name:"เครื่องดื่ม",emoji:"☕"},
  {id:"bakery",name:"เบเกอรี่",emoji:"🥐"},{id:"snack",name:"ทานเล่น",emoji:"🍟"},
  {id:"set",name:"ชุดคุ้ม",emoji:"🍱"},
];
const NIGHT_CATS=[
  {id:"moojum",name:"หมูจุ่ม",emoji:"🍲"},{id:"isan",name:"อีสาน",emoji:"🌶️"},
  {id:"snack",name:"ทานเล่น",emoji:"🍟"},{id:"drink",name:"เครื่องดื่ม",emoji:"🥤"},
  {id:"beer",name:"เบียร์",emoji:"🍺"},{id:"addon_mj",name:"Add-on",emoji:"➕"},
];
const CAT_MODE={rice:"day",bakery:"day",set:"day",moojum:"night",isan:"night",beer:"night",addon_mj:"night",drink:"all",snack:"all"};
const MILESTONES=[{at:5,reward:"ท็อปปิ้ง/คุกกี้ฟรี"},{at:15,reward:"เครื่องดื่มฟรี"},{at:30,reward:"จานเดียวฟรี"},{at:60,reward:"หมูจุ่ม S ฟรี"},{at:100,reward:"หมูจุ่ม M + ต่อปี 2 ฟรี"}];

/* Zone data — gradient + icon instead of image */
const ZONES=[
  {id:"โซนทำงาน ชั้น 2",name:"Work Zone",sub:"ปลั๊กทุกโต๊ะ • WiFi แรง",cap:"1-4 คน",icon:"⌨️",grad:"linear-gradient(135deg,#0d1523,#162040)",day:true,night:false},
  {id:"ห้องกระจก",name:"Glass Room",sub:"เงียบ ส่วนตัว",cap:"2-8 คน",icon:"🪟",grad:"linear-gradient(135deg,#0a1c18,#0f3028)",day:true,night:true},
  {id:"โซนสวน",name:"Garden Zone",sub:"ใต้ต้นไม้ ลมดี",cap:"2-6 คน",icon:"🌿",grad:"linear-gradient(135deg,#0d1a08,#163012)",day:true,night:true},
  {id:"โต๊ะยาว (กลุ่ม)",name:"Group Table",sub:"ติวกลุ่ม ประชุม",cap:"5-10 คน",icon:"👥",grad:"linear-gradient(135deg,#1a1205,#2e2000)",day:true,night:true},
  {id:"โซนในร้าน",name:"Chill Zone",sub:"โซฟานุ่ม เหมาะอ่านหนังสือ",cap:"1-4 คน",icon:"🛋️",grad:"linear-gradient(135deg,#1a090f,#30101c)",day:true,night:true},
];

const TIME_SLOTS=genTimeSlots("10:00","22:00");
const DURATION_OPTS=["1 ชั่วโมง","2 ชั่วโมง","3 ชั่วโมง","4 ชั่วโมง"];

function getDateOptions(days=7){
  const opts=[];const now=new Date();
  for(let i=0;i<days;i++){
    const d=new Date(now);d.setDate(d.getDate()+i);
    const label=i===0?"วันนี้":i===1?"พรุ่งนี้":d.toLocaleDateString("th-TH",{weekday:"short",month:"short",day:"numeric"});
    opts.push({label,value:d.toISOString().split("T")[0]});
  }
  return opts;
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
  const isActive=memberStatus==="active";
  const isPending=memberStatus==="pending_payment";
  const night=mode==="night";
  const cats=night?NIGHT_CATS:DAY_CATS;

  useEffect(()=>{setCat(night?"moojum":"rice");},[night]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),2400);return()=>clearTimeout(t);},[toast]);

  const lastRound=order?order.rounds[order.rounds.length-1]:null;
  const lastStatus=lastRound?.status;
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
      return o?{...o,rounds:[...o.rounds,round]}:{no:"A-"+(140+Math.floor(Math.random()*50)),rounds:[round]};
    });
    setCart([]);setCartOpen(false);setAddingMore(false);setPage("order");
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
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Thai:wght@300;400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
    .app{
      --bg:#080706;--surface:#111009;--surface2:#18150f;--surface3:#1f1b14;
      --ink:#EDE5D8;--muted:#7A6E5E;--line:#242018;
      --gold:#C9A96E;--gold2:#A88B4A;--gdim:rgba(201,169,110,.14);
      --danger:#E85D30;--success:#7FB069;
      font-family:'IBM Plex Sans Thai',sans-serif;background:var(--bg);color:var(--ink);
      max-width:430px;margin:0 auto;min-height:100vh;position:relative;
    }
    .display{font-family:'Prompt',sans-serif;}

    /* TOPBAR */
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 18px 11px;position:sticky;top:0;z-index:50;background:rgba(8,7,6,.93);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--line);}
    .logo{font-family:'Prompt';font-weight:900;font-size:17px;letter-spacing:.2em;color:var(--gold);}
    .logo small{display:block;font-size:7.5px;font-weight:500;letter-spacing:.55em;color:var(--muted);margin-top:2px;text-transform:uppercase;}
    .modepill{display:flex;background:var(--surface2);border-radius:7px;padding:3px;gap:2px;border:1px solid var(--line);}
    .modepill button{border:0;background:transparent;color:var(--muted);font-family:'Prompt';font-size:10px;font-weight:600;padding:5px 10px;border-radius:5px;cursor:pointer;letter-spacing:.05em;transition:.18s;}
    .modepill button.on{background:var(--gold);color:#080706;font-weight:700;}

    .scroll{padding:0 18px 110px;}

    /* HERO — pure typography, no image required */
    .hero{position:relative;border-radius:14px;overflow:hidden;margin:12px 0;height:180px;display:flex;flex-direction:column;justify-content:flex-end;}
    .hero-day{background:linear-gradient(145deg,#0e0b04 0%,#1c1708 50%,#0a0803 100%);}
    .hero-night{background:linear-gradient(145deg,#070509 0%,#11081a 50%,#060408 100%);}
    .hero-geo{position:absolute;top:-35px;right:-35px;width:230px;height:230px;border-radius:50%;border:1px solid var(--gdim);pointer-events:none;}
    .hero-geo::after{content:'';position:absolute;inset:30px;border-radius:50%;border:1px solid var(--gdim);opacity:.5;}
    .hero-inner{padding:20px 22px 22px;position:relative;z-index:1;}
    .hero-eyebrow{font-family:'Prompt';font-size:8px;font-weight:700;letter-spacing:.55em;color:var(--gold);text-transform:uppercase;opacity:.75;margin-bottom:9px;}
    .hero-title{font-family:'Prompt';font-size:40px;font-weight:900;line-height:.9;letter-spacing:-.025em;color:var(--ink);}
    .hero-title .dot{color:var(--gold);margin:0 2px;font-weight:300;font-size:32px;}
    .hero-title .hi{color:var(--gold);}
    .hero-sub{font-size:10.5px;color:var(--muted);margin-top:10px;line-height:1.55;}
    .hero-rule{position:absolute;bottom:0;left:22px;width:42px;height:2px;background:var(--gold);opacity:.65;}

    /* PROMO STRIP */
    .promo-strip{background:linear-gradient(135deg,#181308,#0c0a06);border:1px solid rgba(201,169,110,.28);border-radius:11px;padding:13px 15px;display:flex;align-items:center;gap:12px;margin-bottom:12px;}
    .promo-strip .ps-icon{font-size:26px;flex-shrink:0;}
    .promo-strip .ps-text b{font-family:'Prompt';font-size:13px;font-weight:700;display:block;line-height:1.3;}
    .promo-strip .ps-text small{color:var(--muted);font-size:10.5px;display:block;margin-top:2px;}
    .promo-strip .ps-cta{margin-left:auto;background:var(--gold);color:#080706;border:0;border-radius:7px;font-family:'Prompt';font-size:11px;font-weight:700;padding:8px 12px;cursor:pointer;white-space:nowrap;flex-shrink:0;letter-spacing:.04em;}

    /* MEMBER CARD */
    .mcard{background:linear-gradient(135deg,#181308,#0c0a05);border:1px solid var(--line);border-radius:13px;padding:20px;position:relative;overflow:hidden;}
    .mcard::before{content:'';position:absolute;top:-50px;right:-50px;width:200px;height:200px;border-radius:50%;border:1px solid var(--gdim);}
    .mcard .tier{font-family:'Prompt';font-size:8px;letter-spacing:.45em;color:var(--gold);text-transform:uppercase;font-weight:700;}
    .mcard .nm{font-family:'Prompt';font-size:21px;font-weight:800;margin:6px 0 2px;letter-spacing:-.02em;}
    .mcard .mid{font-size:11.5px;color:var(--muted);line-height:1.6;}
    .mcard .joinbtn{margin-top:14px;display:inline-block;background:var(--gold);color:#080706;font-family:'Prompt';font-size:11.5px;font-weight:700;border:0;border-radius:7px;padding:9px 15px;cursor:pointer;letter-spacing:.04em;}
    .bar{height:3px;background:var(--surface2);border-radius:99px;margin:12px 0 6px;overflow:hidden;}
    .bar i{display:block;height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold));border-radius:99px;transition:width .6s;}

    /* SERVICE GRID */
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:16px;}
    .svc{background:var(--surface);border:1px solid var(--line);border-radius:11px;padding:14px 8px;text-align:center;cursor:pointer;transition:transform .12s,border-color .18s;position:relative;}
    .svc:active{transform:scale(.95);}.svc:hover{border-color:rgba(201,169,110,.28);}
    .svc .e{font-size:21px;}.svc .l{font-family:'Prompt';font-size:11px;font-weight:700;margin-top:7px;letter-spacing:.01em;}
    .svc .s{font-size:9px;color:var(--muted);margin-top:2px;}.svc .lock{position:absolute;top:7px;right:8px;font-size:10px;}

    /* SECTION HEADER */
    .h2{font-family:'Prompt';font-size:8.5px;font-weight:700;letter-spacing:.38em;text-transform:uppercase;color:var(--muted);margin:28px 0 14px;display:flex;justify-content:space-between;align-items:center;padding-left:10px;border-left:2px solid var(--gold);}
    .h2 span{font-size:9px;color:var(--muted);font-weight:400;letter-spacing:.05em;text-transform:none;font-family:'IBM Plex Sans Thai';}

    /* PROMO CARD */
    .promo{background:var(--surface);border:1px solid var(--line);border-radius:11px;padding:13px;display:flex;gap:12px;align-items:center;margin-bottom:9px;}
    .promo b{font-family:'Prompt';font-size:13px;font-weight:700;display:block;line-height:1.35;}
    .promo small{color:var(--muted);font-size:10.5px;display:block;margin-top:1px;line-height:1.5;}
    .badge{margin-left:auto;background:var(--surface3);color:var(--gold);font-size:8.5px;font-weight:700;padding:4px 8px;border-radius:5px;white-space:nowrap;flex-shrink:0;border:1px solid var(--line);letter-spacing:.06em;text-transform:uppercase;}

    /* NAV */
    .nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(8,7,6,.94);backdrop-filter:blur(18px);border-top:1px solid var(--line);display:flex;padding:8px 6px calc(10px + env(safe-area-inset-bottom));z-index:40;}
    .nav button{flex:1;border:0;background:transparent;color:var(--muted);font-family:'Prompt';font-size:9.5px;font-weight:500;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;letter-spacing:.02em;}
    .nav button .ne{font-size:19px;opacity:.4;transition:opacity .18s;}.nav button.on{color:var(--gold);}.nav button.on .ne{opacity:1;}

    .tableTag{display:inline-flex;align-items:center;gap:7px;background:var(--surface);color:var(--gold);border-radius:7px;font-family:'Prompt';font-size:11.5px;font-weight:700;padding:7px 13px;margin:10px 0 12px;border:1px solid var(--line);letter-spacing:.04em;}
    .orderwrap{display:flex;}
    .rail{width:67px;flex-shrink:0;display:flex;flex-direction:column;gap:6px;position:sticky;top:56px;align-self:flex-start;max-height:72vh;overflow-y:auto;}
    .rail button{border:1px solid var(--line);background:var(--surface);color:var(--muted);border-radius:10px;padding:10px 4px;cursor:pointer;font-family:'Prompt';font-size:9px;font-weight:600;display:flex;flex-direction:column;gap:3px;align-items:center;letter-spacing:.01em;}
    .rail button .e{font-size:17px;}.rail button.on{background:var(--gold);color:#080706;border-color:var(--gold);}

    /* MENU ITEMS */
    .items{flex:1;padding-left:9px;display:flex;flex-direction:column;gap:9px;}
    .item{background:var(--surface);border:1px solid var(--line);border-radius:11px;padding:11px;display:flex;gap:11px;align-items:center;}
    .item b{font-family:'Prompt';font-size:13px;font-weight:700;display:block;line-height:1.2;letter-spacing:-.01em;}
    .item small{color:var(--muted);font-size:10px;display:block;margin-top:2px;}
    .item .pr{font-family:'Prompt';font-weight:800;font-size:14px;margin-top:4px;color:var(--gold);}
    .tag{display:inline-block;background:var(--surface3);color:var(--gold);font-size:8px;font-weight:700;border-radius:4px;padding:2px 6px;margin-left:5px;vertical-align:2px;border:1px solid rgba(201,169,110,.18);letter-spacing:.05em;text-transform:uppercase;}
    .tag-cust{display:inline-block;background:var(--surface3);color:var(--gold);font-size:8px;font-weight:700;border-radius:4px;padding:2px 6px;margin-left:5px;vertical-align:2px;border:1px solid rgba(201,169,110,.35);letter-spacing:.02em;}
    .qty{margin-left:auto;display:flex;align-items:center;gap:7px;flex-shrink:0;}
    .qty button{width:28px;height:28px;border-radius:7px;border:1px solid var(--line);background:var(--surface2);color:var(--ink);font-size:15px;font-weight:700;cursor:pointer;line-height:1;}
    .qty button.add{background:var(--gold);color:#080706;border-color:var(--gold);}
    .qty b{font-family:'Prompt';min-width:14px;text-align:center;font-size:13px;}

    /* CART BAR */
    .cartbar{position:fixed;bottom:70px;left:50%;transform:translateX(-50%);width:calc(100% - 36px);max-width:394px;background:var(--gold);color:#080706;border-radius:10px;padding:13px 18px;display:flex;justify-content:space-between;align-items:center;font-family:'Prompt';font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 8px 32px rgba(201,169,110,.38);z-index:45;letter-spacing:.03em;}

    /* BOTTOM SHEET */
    .ovl{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:60;display:flex;align-items:flex-end;justify-content:center;}
    .sheet{background:var(--surface);width:100%;max-width:430px;border-radius:18px 18px 0 0;padding:20px 18px calc(20px + env(safe-area-inset-bottom));max-height:85vh;overflow-y:auto;border-top:1px solid var(--line);}
    .sheet h3{font-family:'Prompt';font-size:15px;font-weight:700;margin-bottom:14px;letter-spacing:.02em;}
    .crow{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);}
    .crow b{font-family:'Prompt';font-size:13px;font-weight:700;}.crow small{color:var(--muted);}
    .cta{width:100%;border:0;background:var(--gold);color:#080706;font-family:'Prompt';font-size:14px;font-weight:700;border-radius:10px;padding:14px;margin-top:16px;cursor:pointer;letter-spacing:.04em;}
    .ghost{width:100%;border:1px solid var(--line);background:transparent;color:var(--muted);font-family:'Prompt';font-size:12px;font-weight:500;border-radius:10px;padding:12px;margin-top:8px;cursor:pointer;}

    /* STATUS */
    .statusCard{background:var(--surface);border:1px solid var(--line);border-radius:13px;padding:18px;margin-bottom:13px;}
    .step{display:flex;gap:12px;}.dotcol{display:flex;flex-direction:column;align-items:center;}
    .dot{width:26px;height:26px;border-radius:50%;background:var(--surface2);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
    .dot.done{background:var(--gold);border-color:var(--gold);color:#080706;}.dot.now{border-color:var(--gold);color:var(--gold);animation:pulse 1.4s infinite;}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.3);}50%{box-shadow:0 0 0 7px rgba(201,169,110,0);}}
    .vline{width:2px;flex:1;background:var(--line);min-height:22px;}.vline.done{background:var(--gold);}
    .step .tx b{font-family:'Prompt';font-size:13px;font-weight:600;display:block;}.step .tx small{color:var(--muted);font-size:11px;}

    /* QR CARD */
    .qrcard{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:24px 18px;text-align:center;}
    .privE{font-size:40px;}.qrcard h3{font-family:'Prompt';font-size:17px;font-weight:700;margin:10px 0 4px;}.qrcard p{color:var(--muted);font-size:12px;line-height:1.7;}

    /* MILESTONE */
    .msrow{display:flex;gap:11px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:12px 14px;margin-bottom:7px;}
    .msrow .n{font-family:'Prompt';font-weight:800;width:48px;font-size:11px;color:var(--gold);flex-shrink:0;letter-spacing:.03em;}.msrow.locked{opacity:.38;}.msrow .chk{margin-left:auto;font-size:14px;}

    /* FORM */
    .frow{margin-bottom:14px;}.frow label{font-family:'Prompt';font-size:10.5px;font-weight:700;display:block;margin-bottom:6px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}
    .frow input,.frow select,.frow textarea{width:100%;border:1px solid var(--line);background:var(--surface2);color:var(--ink);border-radius:10px;padding:13px;font-family:'IBM Plex Sans Thai';font-size:15px;}
    .frow input:focus,.frow select:focus,.frow textarea:focus{outline:none;border-color:var(--gold);}
    .zonebtns{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    .zonebtns button{border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:10px;padding:12px 8px;font-family:'Prompt';font-size:12px;font-weight:600;cursor:pointer;}
    .zonebtns button.on{background:var(--gold);color:#080706;border-color:var(--gold);}

    /* STATS */
    .stat3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0;}
    .stat{background:var(--surface);border:1px solid var(--line);border-radius:11px;padding:14px 8px;text-align:center;}
    .stat b{font-family:'Prompt';font-size:22px;font-weight:800;display:block;color:var(--gold);}.stat small{font-size:9px;color:var(--muted);letter-spacing:.07em;text-transform:uppercase;}

    /* TOAST */
    .toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:var(--gold);color:#080706;font-family:'Prompt';font-size:12px;font-weight:700;padding:10px 18px;border-radius:7px;z-index:90;box-shadow:0 8px 28px rgba(201,169,110,.48);animation:drop .22s;max-width:88%;text-align:center;letter-spacing:.03em;}
    @keyframes drop{from{transform:translate(-50%,-12px);opacity:0;}to{transform:translate(-50%,0);opacity:1;}}

    /* MISC */
    .back{border:0;background:transparent;color:var(--muted);font-family:'Prompt';font-size:11px;font-weight:700;cursor:pointer;padding:6px 0;margin-bottom:4px;letter-spacing:.08em;text-transform:uppercase;}
    .demoNote{background:var(--surface2);border-radius:9px;padding:10px 13px;font-size:11px;color:var(--muted);margin-top:14px;line-height:1.7;border:1px solid var(--line);}
    .optline{font-size:10.5px;color:var(--muted);line-height:1.5;margin-top:2px;}

    /* CUSTOMIZE SHEET */
    .cust-header{display:flex;gap:14px;align-items:center;margin-bottom:16px;}
    .cust-header .info b{font-family:'Prompt';font-size:16px;font-weight:700;display:block;}
    .cust-header .info small{color:var(--muted);font-size:12px;}
    .cust-header .info .pr{font-family:'Prompt';font-weight:800;font-size:17px;color:var(--gold);margin-top:4px;}
    .opt-group{margin-bottom:14px;}
    .opt-group label.gl{font-family:'Prompt';font-size:10px;font-weight:700;display:block;margin-bottom:8px;color:var(--gold);letter-spacing:.14em;text-transform:uppercase;}
    .opt-row{display:flex;align-items:center;gap:10px;padding:9px 0;cursor:pointer;}
    .opt-row .radio{width:20px;height:20px;border-radius:50%;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .opt-row .radio.on{border-color:var(--gold);}.opt-row .radio.on::after{content:'';width:10px;height:10px;border-radius:50%;background:var(--gold);}
    .opt-row .chkbox{width:20px;height:20px;border-radius:5px;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;color:var(--gold);}
    .opt-row .chkbox.on{border-color:var(--gold);background:var(--gold);color:#080706;}
    .opt-row span{font-size:13px;flex:1;}.opt-row .extra{font-size:12px;color:var(--gold);font-family:'Prompt';font-weight:700;}

    /* ZONE CARDS — gradient bg, no image */
    .zonepick{display:flex;flex-direction:column;gap:9px;margin-bottom:14px;}
    .zonecard{position:relative;border-radius:11px;overflow:hidden;cursor:pointer;border:2px solid var(--line);transition:border-color .22s;height:96px;display:flex;align-items:flex-end;padding:14px 16px;}
    .zonecard:active{transform:scale(.98);}.zonecard.on{border-color:var(--gold);}
    .zonecard-deco{position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:54px;opacity:.13;line-height:1;pointer-events:none;filter:saturate(0) brightness(2);}
    .zonecard.on .zonecard-deco{opacity:.22;filter:none;}
    .zonecard-info{position:relative;z-index:1;}
    .zonecard-info b{font-family:'Prompt';font-size:15px;font-weight:800;display:block;line-height:1.05;letter-spacing:-.01em;}
    .zonecard-info small{color:var(--muted);font-size:10px;margin-top:3px;display:block;}
    .zonecard .zchk{position:absolute;top:10px;right:12px;width:22px;height:22px;border-radius:50%;background:rgba(8,7,6,.55);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--gold);}
    .zonecard.on .zchk{background:var(--gold);color:#080706;border-color:var(--gold);}

    /* HOW-TO */
    .flowbox{background:var(--surface);border:1px solid var(--line);border-radius:11px;padding:16px;margin-top:16px;}
    .flowbox h4{font-family:'Prompt';font-size:8.5px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;margin-bottom:12px;display:flex;justify-content:space-between;color:var(--gold);}
    .flowbox h4 button{border:0;background:transparent;color:var(--muted);font-size:10.5px;cursor:pointer;font-family:'Prompt';letter-spacing:0;text-transform:none;}
    .fstep{display:flex;gap:10px;font-size:12px;color:var(--muted);margin-bottom:9px;align-items:flex-start;}
    .fstep b{font-family:'Prompt';color:var(--ink);font-weight:600;}
    .fstep .no{background:var(--gold);color:#080706;font-family:'Prompt';font-weight:800;font-size:9px;width:19px;height:19px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}

    /* BOOKING NOTICES */
    .notice-box{background:var(--surface2);border:1px solid var(--line);border-radius:9px;padding:11px 13px;font-size:11.5px;color:var(--muted);line-height:1.7;margin-bottom:14px;}
    .notice-box b{color:var(--ink);}
    .resv-code{font-family:'Prompt';font-size:24px;font-weight:800;color:var(--gold);letter-spacing:.1em;margin:8px 0;}

    @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;}}
  `;

  /* ==================== CUSTOMIZE SHEET ==================== */
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
  const services=[
    {id:"order",emoji:night?"🍲":"☕",label:"สั่งอาหาร",sub:"สั่งจากโต๊ะ",go:"order"},
    {id:"redeem",emoji:"🥤",label:"อิตาเลียนโซดาฟรี",sub:isActive?"ใช้ได้วันนี้":"สมัครสมาชิก 299.-",go:"redeem",locked:!isActive},
    {id:"reserve",emoji:"🪑",label:"จองโต๊ะ",sub:night?"กลุ่ม/ห้องกระจก":"โซนทำงาน",go:"reserve"},
    {id:"member",emoji:"💳",label:isActive?"สมาชิก ✓":"สมัครสมาชิก",sub:isActive?"ใช้งานอยู่":isPending?"รอชำระ":"299.-/ปี",go:isActive?"profile":isPending?"pending":"register"},
    {id:"profile",emoji:"👤",label:"โปรไฟล์",sub:isActive?"ประวัติ":"เฉพาะสมาชิก",go:"profile",locked:!isActive},
    {id:"call",emoji:"🛎️",label:"เรียกพนักงาน",sub:"ขอน้ำซุป/เช็กบิล",action:"call"},
  ];

  const Nav=()=><nav className="nav">{[{id:"home",e:"🏠",l:"หน้าแรก"},{id:"order",e:"🍽️",l:"สั่งอาหาร"},{id:"redeem",e:"🎁",l:"สิทธิ์ของฉัน"},{id:"profile",e:"👤",l:"โปรไฟล์"}].map(n=><button key={n.id} className={page===n.id?"on":""} onClick={()=>setPage(n.id)}><span className="ne">{n.e}</span>{n.l}</button>)}</nav>;

  const MemberCard=()=>{
    if(isActive)return(<div className="mcard"><div className="tier">SAHAKON • Founder Member</div><div className="nm">คุณ{memberInfo.nickname}</div><div className="mid">{memberInfo.memberNo} • สมาชิกถึง มิ.ย. 2570</div><div className="bar"><i style={{width:msProgress+"%"}}/></div><div style={{display:"flex",justifyContent:"space-between",fontSize:10.5,color:"var(--muted)"}}><span>มาแล้ว {memberInfo.visits} ครั้ง</span><span>อีก {nextMs.at-memberInfo.visits} ครั้ง → <span style={{color:"var(--gold)"}}>{nextMs.reward}</span></span></div></div>);
    if(isPending)return(<div className="mcard" onClick={()=>setPage("pending")} style={{cursor:"pointer"}}><div className="tier">รอยืนยันการชำระ</div><div className="nm">คุณ{memberInfo.nickname} ⏳</div><div className="mid">ชำระ 299 ที่เคาน์เตอร์ แล้วแจ้งพนักงาน</div><button className="joinbtn">ดูขั้นตอนชำระ ›</button></div>);
    return(<div className="mcard" onClick={()=>setPage("register")} style={{cursor:"pointer"}}><div className="tier">SAHAKON • Founder Member</div><div className="nm">สมัครสมาชิก 299.-/ปี</div><div className="mid">อิตาเลียนโซดาฟรีวันละ 1 แก้ว ตลอด 1 ปี + บันไดรางวัลสะสม</div><button className="joinbtn">สมัครเลย</button></div>);
  };

  const Home=()=>(<div className="scroll">
    {/* HERO — typography-first, no image */}
    <div className={`hero ${night?"hero-night":"hero-day"}`}>
      <div className="hero-geo"/>
      <div className="hero-inner">
        <div className="hero-eyebrow">SAHAKON — {night?"NIGHT MODE":"DAY MODE"}</div>
        <div className="hero-title">
          {isActive
            ? <><span className="hi">สวัสดี</span><br/>คุณ{memberInfo.nickname}</>
            : night
              ? <>กิน<span className="dot">•</span>ดื่ม<span className="dot">•</span>ชิล</>
              : <>กาแฟ<span className="dot">•</span>งาน<span className="dot">•</span>ชิล</>
          }
        </div>
        <div className="hero-sub">
          {isActive
            ? (night?"Food • Chill • Social • หมูจุ่ม":"Cafe • Work • Study • โซดาฟรี")
            : "🥤 รับอิตาเลียนโซดาฟรีทุกวัน — สมัคร Founder Member 299.-"
          }
        </div>
      </div>
      <div className="hero-rule"/>
    </div>

    {!isActive&&(
      <div className="promo-strip">
        <span className="ps-icon">🥤</span>
        <div className="ps-text">
          <b>Founder Member 299.-/ปี</b>
          <small>อิตาเลียนโซดาฟรีวันละ 1 แก้ว ตลอดปี + บันไดรางวัล</small>
        </div>
        <button className="ps-cta" onClick={()=>setPage(isPending?"pending":"register")}>{isPending?"ดูขั้นตอน":"สมัครเลย"}</button>
      </div>
    )}
    <MemberCard/>
    <div className="grid">{services.map(s=><div key={s.id} className="svc" onClick={()=>{if(s.action==="call"){setToast("เรียกพนักงานแล้ว 🙏");return;}setPage(s.go);}}>{s.locked&&<span className="lock">🔒</span>}<div className="e">{s.emoji}</div><div className="l">{s.label}</div><div className="s">{s.sub}</div></div>)}</div>
    {showGuide&&<div className="flowbox"><h4>วิธีใช้งาน<button onClick={()=>setShowGuide(false)}>ซ่อน ✕</button></h4>
      {[["นั่งโต๊ะ","สแกน QR บนโต๊ะ สั่งอาหาร"],["สั่งจากมือถือ","ออเดอร์เข้าหน้าจอพนักงาน"],["อยากอิตาเลียนโซดาฟรีทุกวัน?","สมัคร Founder Member 299.-"],["ใช้สิทธิ์","โชว์ QR ตอนจ่ายเงิน"]].map(([t,d],i)=><div className="fstep" key={i}><span className="no">{i+1}</span><span><b>{t}</b> {d}</span></div>)}
    </div>}
    <div className="h2">{night?"คืนนี้ที่ SAHAKON":"ข่าวสาร"}</div>
    {(night?[{emoji:"🍲",title:"หมูจุ่ม M มา 4 จ่าย 3",sub:"ทุกอังคาร 17:00+",badge:"คืนนี้"}]:[{emoji:"💳",title:"Founder Member 299.-",sub:"อิตาเลียนโซดาฟรีวันละ 1 แก้ว ตลอดปี",badge:"ช่วงเปิดร้าน"}]).map((p,i)=><div className="promo" key={i}><div style={{fontSize:26}}>{p.emoji}</div><div><b>{p.title}</b><small>{p.sub}</small></div><div className="badge">{p.badge}</div></div>)}
  </div>);

  const Register=()=>{
    const[nick,setNick]=useState("");const[phone,setPhone]=useState("");const[bday,setBday]=useState("");
    const valid=nick.trim().length>=1&&/^0\d{9}$/.test(phone);
    return(<div className="scroll"><button className="back" onClick={()=>setPage("home")}>‹ กลับ</button>
      <div style={{textAlign:"center",marginTop:8}}><span style={{fontSize:40}}>💳</span></div>
      <h3 className="display" style={{textAlign:"center",fontSize:18,fontWeight:700,marginTop:6,letterSpacing:"-.01em"}}>สมัคร Founder Member</h3>
      <p style={{textAlign:"center",color:"var(--muted)",fontSize:12,marginBottom:20}}>299 บาท/ปี • อิตาเลียนโซดาฟรีวันละ 1 แก้ว</p>
      <div className="frow"><label>ชื่อเล่น</label><input value={nick} onChange={e=>setNick(e.target.value)} placeholder="เช่น เตชินท์" maxLength={20}/></div>
      <div className="frow"><label>เบอร์โทร</label><input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="08xxxxxxxx" inputMode="numeric"/></div>
      <div className="frow"><label>วันเกิด (วัน/เดือน)</label><input value={bday} onChange={e=>setBday(e.target.value)} placeholder="14/02" maxLength={5}/></div>
      <button className="cta" style={{opacity:valid?1:.4}} disabled={!valid} onClick={()=>{setMemberStatus("pending_payment");setMemberInfo(m=>({...m,nickname:nick.trim(),phone,birthday:bday,memberNo:"SHK-000"+(40+Math.floor(Math.random()*50))}));setPage("pending");}}>สมัคร — ไปชำระ 299</button>
    </div>);
  };

  const Pending=()=>(<div className="scroll"><button className="back" onClick={()=>setPage("home")}>‹ กลับ</button><div className="qrcard"><div className="privE">⏳</div><h3>รอชำระ 299 บาท</h3><p>รหัส: <b style={{color:"var(--gold)"}}>{memberInfo.memberNo}</b></p><div style={{display:"flex",justifyContent:"center",margin:"14px 0"}}><FakeQR seed={13}/></div><p><b style={{color:"var(--gold)"}}>QR PromptPay 299</b><br/>จ่ายแล้วแจ้งพนักงาน</p><button className="cta" onClick={()=>{setMemberStatus("active");setMemberInfo(m=>({...m,visits:1}));setToast("ยินดีต้อนรับ Founder Member! 🎉");setPage("home");}}>(เดโม) พนักงานยืนยันแล้ว</button><button className="ghost" onClick={()=>{setMemberStatus("guest");setMemberInfo({nickname:"",phone:"",birthday:"",memberNo:null,visits:0});setPage("home");}}>ยกเลิก</button></div><div className="demoNote">ของจริง: ปุ่มยืนยันอยู่ Staff Screen ลูกค้ากดเองไม่ได้</div></div>);

  /* ==================== ORDER ==================== */
  const Order=()=>{
    if(order&&!addingMore)return<OrderStatus/>;
    if(!table)return(<div className="scroll">
      <div style={{textAlign:"center",marginTop:16}}><span style={{fontSize:36}}>📍</span></div>
      <h3 className="display" style={{textAlign:"center",fontSize:18,fontWeight:800,marginTop:8,letterSpacing:"-.02em"}}>{night?"นั่งโต๊ะก่อน เปิดบิลโต๊ะ":"เลือกโต๊ะที่คุณนั่ง"}</h3>
      <p style={{textAlign:"center",color:"var(--muted)",fontSize:12,marginBottom:18}}>{night?"สั่งได้ตลอด รวมบิลเดียว":"ของจริงคือสแกน QR ที่ติดบนโต๊ะ"}</p>
      <div className="h2">โซนในร้าน</div>
      <div className="zonebtns" style={{gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>{["T01","T02","T03","T04","T05","T06","T07","T08"].map(t=><button key={t} onClick={()=>{setTable(t);setToast("เปิดโต๊ะ "+t);}}>{t}</button>)}</div>
      <div className="h2">โซนสวน / กระจก</div>
      <div className="zonebtns">{["สวน G1","สวน G2","กระจก K1","กระจก K2"].map(t=><button key={t} onClick={()=>{setTable(t);setToast("เปิดโต๊ะ "+t);}}>{t}</button>)}</div>
    </div>);
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
              <b>{m.name}{m.tag&&<span className="tag">{m.tag}</span>}{m.cust&&<span className="tag-cust">⚙️ ปรับได้</span>}</b>
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
        <div style={{display:"flex",justifyContent:"space-between"}}><b className="display" style={{fontSize:16,fontWeight:700}}>ออเดอร์ {order.no}</b><span style={{fontSize:10.5,color:"var(--muted)"}}>{table} • {order.rounds.length} รอบ</span></div>
        <div style={{fontSize:10.5,color:"var(--muted)",marginTop:2}}>สถานะรอบล่าสุด</div>
        <div style={{marginTop:12}}>{steps.map((s,i)=>(
          <div className="step" key={s.id}><div className="dotcol">
            <div className={"dot "+(i<idx?"done":i===idx?(["served","completed"].includes(lr.status)?"done":"now"):"")}>{i<idx||(i===idx&&["served","completed"].includes(lr.status))?"✓":i===idx?"●":""}</div>
            {i<steps.length-1&&<div className={"vline "+(i<idx?"done":"")}/>}
          </div><div className="tx" style={{paddingBottom:14}}><b style={{opacity:i<=idx?1:.35}}>{s.t}</b><small style={{opacity:i<=idx?1:.35}}>{s.s}</small></div></div>
        ))}</div>
        {!night&&lr.status==="waiting_payment"&&(<button className="cta" style={{padding:12,marginTop:4}} onClick={()=>setOrder(o=>{if(!o)return o;const rounds=o.rounds.map((r,i)=>i===o.rounds.length-1?{...r,status:"paid"}:r);return{...o,rounds};})}>
          (เดโม) ลูกค้าจ่ายเงินแล้ว
        </button>)}
      </div>
      <div className="statusCard">
        <b className="display" style={{fontSize:13,fontWeight:700,letterSpacing:"-.01em"}}>รายการทั้งหมด</b>
        {order.rounds.map(r=>(<div key={r.rNo} style={{marginTop:10}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span className="display" style={{fontSize:10.5,fontWeight:700,color:"var(--muted)",letterSpacing:".03em"}}>รอบ {r.rNo}</span><span className="badge" style={{marginLeft:0}}>{rLabel(r)}</span></div>
          {r.items.map((it,ii)=>(<div className="crow" key={r.rNo+"-"+ii}>
            <FoodImg id={it.menuId} emoji={it.emoji} size={36}/>
            <div style={{flex:1}}>
              <b>{it.name}</b><small> × {it.qty}</small>
              {it.free&&<small style={{display:"block",color:"var(--gold)"}}>สิทธิ์ Founder Member — ฟรี</small>}
              {optionSummary(it)&&<div className="optline">{optionSummary(it)}</div>}
            </div>
            <b>{it.free?"฿0":"฿"+(it.totalPrice*it.qty)}</b>
            <span style={{marginLeft:6,fontSize:13}}>{["served","completed"].includes(r.status)?"✅":"⏳"}</span>
          </div>))}
        </div>))}
        <div style={{display:"flex",justifyContent:"space-between",paddingTop:12,fontFamily:"Prompt",fontWeight:800,fontSize:15}}><span>ยอดรวม ({order.rounds.length} รอบ)</span><span style={{color:"var(--gold)"}}>฿{grandTotal}</span></div>
        {night?(<div style={{background:"var(--surface2)",borderRadius:10,padding:"12px 14px",marginTop:12,border:"1px solid var(--line)"}}><b className="display" style={{fontSize:12,fontWeight:700,color:"var(--gold)"}}>🍲 เปิดบิลโต๊ะ {table}</b><p style={{fontSize:11,color:"var(--muted)",marginTop:3,lineHeight:1.6}}>ทานก่อน จ่ายทีหลัง</p><button className="cta" style={{padding:12,marginTop:8}} onClick={()=>setToast("เช็กบิลโต๊ะ "+table+" — ฿"+grandTotal+" 🧾")}>เช็กบิลรวม — ฿{grandTotal}</button></div>)
        :(<div style={{textAlign:"center",marginTop:12}}><div style={{display:"flex",justifyContent:"center"}}><FakeQR size={108} seed={21}/></div><p style={{fontSize:11,color:"var(--muted)",marginTop:8}}>QR PromptPay จ่าย ฿{grandTotal}</p></div>)}
      </div>
      <button className="ghost" onClick={()=>{setOrder(null);setTable(null);setAddingMore(false);setPage("home");}}>ปิดบิล (เดโม)</button>
    </div>);
  };

  /* ==================== REDEEM ==================== */
  const Redeem=()=>{
    if(!isActive)return(<div className="scroll"><div style={{textAlign:"center",marginTop:24}}><span style={{fontSize:40}}>🔒</span></div><h3 className="display" style={{textAlign:"center",fontSize:18,fontWeight:700,marginTop:8}}>{isPending?"รอยืนยัน":"เฉพาะสมาชิก"}</h3><button className="cta" onClick={()=>setPage(isPending?"pending":"register")}>{isPending?"ดูขั้นตอนชำระ":"สมัคร 299.-"}</button><div className="h2" style={{marginTop:24}}>สิทธิ์ที่จะได้รับ</div>{MILESTONES.map(m=><div className="msrow locked" key={m.at}><div className="n">ครั้งที่ {m.at}</div><div style={{fontSize:12.5}}>{m.reward}</div><div className="chk">🔒</div></div>)}</div>);
    return(<div className="scroll">
      <div className="h2" style={{margin:"10px 0 12px"}}>สิทธิ์ของฉัน<span>Founder Member</span></div>
      <div className="qrcard">
        {redeemStep==="idle"&&(<><div className="privE">🥤</div><h3>อิตาเลียนโซดาฟรี 1 แก้ว</h3><p>เงื่อนไข: ซื้อเมนูราคาเต็ม 1 รายการ</p>{sodaRedeemed?<button className="ghost" disabled style={{opacity:.5}}>ใช้แล้ว ✓ ({sodaFlavor})</button>:<button className="cta" onClick={()=>setRedeemStep("qr")}>รับสิทธิ์ — แสดง QR</button>}</>)}
        {redeemStep==="qr"&&(<><h3>ยื่น QR ให้พนักงาน</h3><div style={{display:"flex",justifyContent:"center",margin:"14px 0"}}><FakeQR/></div><button className="cta" onClick={()=>setRedeemStep("flavor")}>(เดโม) พนักงานสแกนแล้ว</button><button className="ghost" onClick={()=>setRedeemStep("idle")}>ปิด</button></>)}
        {redeemStep==="flavor"&&(<><div className="privE">🥤</div><h3>เลือกรสอิตาเลียนโซดา</h3><div className="zonebtns" style={{gridTemplateColumns:"1fr 1fr 1fr",marginTop:10}}>{["แดงมะนาว","ลิ้นจี่","ส้ม"].map(f=><button key={f} className={sodaFlavor===f?"on":""} onClick={()=>setSodaFlavor(f)}>{f}</button>)}</div><button className="cta" style={{opacity:sodaFlavor?1:.4}} disabled={!sodaFlavor} onClick={()=>{setSodaRedeemed(true);setMemberInfo(m=>({...m,visits:m.visits+1}));addFreeSoda(sodaFlavor);setToast("อิตาเลียนโซดา"+sodaFlavor+" เข้าตะกร้าแล้ว (สิทธิ์ Founder Member)");setRedeemStep("upsell");}}>ยืนยันรส</button></>)}
        {redeemStep==="upsell"&&(<><div className="privE">😋</div><h3>เมนูแนะนำคู่โซดา</h3><p>{night?"โซดาตัดเลี่ยนน้ำจิ้มหมูจุ่ม":"เมนูที่ลูกค้าสั่งคู่อิตาเลียนโซดาบ่อยสุด"}</p></>)}
      </div>
      {redeemStep==="upsell"&&(<>{(night?[{id:"mj-s",copy:"เซ็ตเริ่มต้นยอดนิยม"},{id:"mj-m",copy:"3-4 คน อัป M คุ้มกว่า"},{id:"a4",copy:"ของทานเล่นรอน้ำซุป"}]:[{id:"bk1",copy:"อบร้อนชีสยืด คู่อิตาเลียนโซดา"},{id:"d1",copy:"จบในเซ็ตเดียว จานเดียว+อิตาเลียนโซดาฟรี"},{id:"set2",copy:"เซ็ตกาแฟ+เบเกอรี่ ราคาพิเศษ"}]).map(u=>{const m=MENU.find(x=>x.id===u.id);if(!m)return null;return(<div className="promo" key={u.id}><FoodImg id={m.id} emoji={m.emoji} size={48}/><div style={{flex:1}}><b>{m.name} — ฿{m.price}</b><small>{u.copy}</small></div><button className="qty add" style={{width:32,height:32}} onClick={()=>{quickAdd(m);setToast(m.name+" +1");}}>+</button></div>);})}<button className="cta" style={{opacity:paidCount>0?1:.4}} disabled={paidCount===0} onClick={()=>{setRedeemStep("idle");setPage("order");setCartOpen(true);}}>{paidCount>0?"ไปตะกร้า ("+cartCount+" รายการ ฿"+cartTotal+")":"เลือกเมนูอีก 1 รายการก่อน"}</button><button className="ghost" onClick={()=>{setRedeemStep("idle");setPage("order");}}>ดูเมนูหลักทั้งหมด</button></>)}
      <div className="h2">บันไดรางวัลสะสม<span>มาแล้ว {memberInfo.visits} ครั้ง</span></div>
      {MILESTONES.map(m=><div className={"msrow "+(memberInfo.visits>=m.at?"":"locked")} key={m.at}><div className="n">ครั้งที่ {m.at}</div><div style={{fontSize:12.5}}>{m.reward}</div><div className="chk">{memberInfo.visits>=m.at?"✅":"🔒"}</div></div>)}
    </div>);
  };

  /* ==================== RESERVE ==================== */
  const Reserve=()=>{
    const dateOpts=getDateOptions(isActive?60:7);
    const[zone,setZone]=useState(night?"โซนสวน":"โซนทำงาน ชั้น 2");
    const[ppl,setPpl]=useState("2");
    const[date,setDate]=useState(dateOpts[0].value);
    const[time,setTime]=useState(night?"19:00":"13:00");
    const[duration,setDuration]=useState("2 ชั่วโมง");
    const[guestName,setGuestName]=useState(isActive?memberInfo.nickname:"");
    const[guestPhone,setGuestPhone]=useState(isActive?memberInfo.phone:"");
    const[forOther,setForOther]=useState(false);
    const filtered=ZONES.filter(z=>night?z.night:z.day);
    const selZ=ZONES.find(z=>z.id===zone);
    const valid=guestName.trim().length>=1&&/^0\d{9}$/.test(guestPhone);

    if(resv)return(<div className="scroll"><button className="back" onClick={()=>setPage("home")}>‹ กลับ</button>
      <div className="qrcard">
        <div className="privE">✅</div><h3>ส่งคำขอจองแล้ว</h3>
        <div className="resv-code">{resv.code}</div>
        <p style={{marginBottom:4}}>ชื่อ: <b style={{color:"var(--ink)"}}>{resv.name}</b></p>
        <p>{resv.zone} • {resv.ppl} คน</p>
        <p>{resv.dateLabel} เวลา {resv.time} น. • {resv.duration}</p>
        <p style={{marginTop:8,color:"var(--gold)",fontSize:11}}>ร้านยืนยันผ่าน LINE ใน 10 นาที</p>
        <div className="notice-box" style={{textAlign:"left",marginTop:12}}>⚠️ <b>เก็บที่นั่งให้ 30 นาที</b> หลังเวลานัด หากไม่มาอาจถูกยกเลิกอัตโนมัติ</div>
        <button className="ghost" onClick={()=>setResv(null)}>จองใหม่</button>
      </div>
    </div>);

    return(<div className="scroll"><button className="back" onClick={()=>setPage("home")}>‹ กลับ</button>
      <h3 className="display" style={{fontSize:18,fontWeight:800,marginTop:8,letterSpacing:"-.02em"}}>จองโต๊ะ</h3>
      <p style={{color:"var(--muted)",fontSize:12,marginBottom:16}}>เลือกโซน — ไม่มีค่าใช้จ่าย</p>
      <div className="notice-box">📌 <b>จองฟรี ไม่การันตีที่นั่ง</b> — ร้านจะยืนยันผ่าน LINE ภายใน 10 นาที</div>

      {/* ZONE CARDS — gradient, no image */}
      <div className="zonepick">{filtered.map(z=>(<div key={z.id} className={"zonecard"+(zone===z.id?" on":"")} style={{background:z.grad}} onClick={()=>setZone(z.id)}>
        <div className="zonecard-deco">{z.icon}</div>
        <div className="zonecard-info"><b>{z.name}</b><small>{z.sub} • {z.cap}</small></div>
        <div className="zchk">{zone===z.id?"✓":""}</div>
      </div>))}</div>

      <div className="frow"><label>จำนวนคน {selZ?"("+selZ.cap+")":""}</label><select value={ppl} onChange={e=>setPpl(e.target.value)}>{["1","2","3","4","5-6","7-10"].map(n=><option key={n}>{n}</option>)}</select></div>
      <div className="frow">
        <label>วันที่ {isActive?"(จองล่วงหน้าได้ 60 วัน)":"(จองล่วงหน้าได้ 7 วัน)"}</label>
        <select value={date} onChange={e=>setDate(e.target.value)}>{dateOpts.map(d=><option key={d.value} value={d.value}>{d.label}</option>)}</select>
      </div>
      <div className="frow"><label>เวลาเริ่มใช้งาน</label><select value={time} onChange={e=>setTime(e.target.value)}>{TIME_SLOTS.map(t=><option key={t}>{t}</option>)}</select></div>
      <div className="frow"><label>ระยะเวลาใช้งาน</label><select value={duration} onChange={e=>setDuration(e.target.value)}>{DURATION_OPTS.map(d=><option key={d}>{d}</option>)}</select></div>
      <div className="frow"><label>ชื่อผู้จอง</label><input value={guestName} onChange={e=>setGuestName(e.target.value)} placeholder="ชื่อ-นามสกุล" maxLength={40}/></div>
      <div className="frow"><label>เบอร์ติดต่อ</label><input value={guestPhone} onChange={e=>setGuestPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="08xxxxxxxx" inputMode="numeric"/></div>
      {isActive&&(<div className="frow"><div className="opt-row" onClick={()=>{setForOther(p=>!p);if(!forOther){setGuestName("");setGuestPhone("");}else{setGuestName(memberInfo.nickname);setGuestPhone(memberInfo.phone);}}}><div className={"chkbox"+(forOther?" on":"")} style={{width:20,height:20,borderRadius:5,border:"2px solid var(--line)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"var(--gold)"}}>{forOther?"✓":""}</div><span style={{fontSize:13}}>จองในนามบุคคลอื่น</span></div></div>)}
      <div className="notice-box">⏰ <b>นโยบาย No-show:</b> เก็บที่นั่งให้ 30 นาที หลังจากนั้นอาจถูกยกเลิกอัตโนมัติ</div>
      <button className="cta" style={{opacity:valid?1:.4}} disabled={!valid} onClick={()=>{
        const dateLabel=dateOpts.find(d=>d.value===date)?.label||date;
        setResv({zone,ppl,time,date,dateLabel,duration,name:guestName.trim(),code:genBookingCode()});
      }}>ยืนยันการจอง</button>
    </div>);
  };

  /* ==================== PROFILE ==================== */
  const Profile=()=>{
    if(!isActive)return(<div className="scroll"><div style={{textAlign:"center",marginTop:24}}><span style={{fontSize:40}}>🔒</span></div><h3 className="display" style={{textAlign:"center",fontSize:18,fontWeight:700,marginTop:8}}>{isPending?"รอยืนยัน":"เฉพาะสมาชิก"}</h3><button className="cta" onClick={()=>setPage(isPending?"pending":"register")}>{isPending?"ดูขั้นตอนชำระ":"สมัคร 299.-"}</button></div>);
    return(<div className="scroll">
      <div className="mcard" style={{marginTop:10}}><div className="tier">MEMBER PROFILE</div><div className="nm">คุณ{memberInfo.nickname}</div><div className="mid">โทร {memberInfo.phone.replace(/(\d{3})(\d{3})(\d{4})/,"$1-xxx-$3")} • วันเกิด {memberInfo.birthday||"-"}</div></div>
      <div className="stat3"><div className="stat"><b>{memberInfo.visits}</b><small>ครั้งที่มา</small></div><div className="stat"><b>{sodaRedeemed?1:0}</b><small>อิตาเลียนโซดา</small></div><div className="stat"><b>365</b><small>วันคงเหลือ</small></div></div>
      <div className="h2">ประวัติ</div>
      {memberInfo.visits===0?<div className="promo"><div style={{fontSize:26}}>🌱</div><div><b>ยังไม่มีประวัติ</b><small>ใช้สิทธิ์อิตาเลียนโซดาครั้งแรกเพื่อเริ่มนับ</small></div></div>
      :<div className="promo"><div style={{fontSize:26}}>🥤</div><div><b>วันนี้ • ใช้สิทธิ์อิตาเลียนโซดา</b><small>ครั้งที่ {memberInfo.visits}</small></div><div className="badge">ล่าสุด</div></div>}
      <button className="ghost" onClick={()=>setToast("ต่ออายุปีที่ 2 ที่เคาน์เตอร์ 🎉")}>ต่ออายุปีที่ 2 — 299.-</button>
    </div>);
  };

  /* ==================== RENDER ==================== */
  return(<div className="app"><style>{css}</style>
    <header className="topbar">
      <div className="logo">SAHAKON<small>CAFE • WORK • CHILL</small></div>
      <div className="modepill">
        <button className={!night?"on":""} onClick={()=>setMode("day")}>☀ DAY</button>
        <button className={night?"on":""} onClick={()=>setMode("night")}>◐ NIGHT</button>
      </div>
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
          {ci.free?<small style={{color:"var(--gold)",fontWeight:700,display:"block"}}>สิทธิ์ Founder Member — ฟรี</small>:<small style={{display:"block"}}>฿{ci.totalPrice}</small>}
          {optionSummary(ci)&&<div className="optline">{optionSummary(ci)}</div>}
        </div>
        {ci.free?<b style={{fontFamily:"Prompt",color:"var(--gold)"}}>฿0</b>:<div className="qty"><button onClick={()=>updateCartQty(ci.uid,-1)}>−</button><b>{ci.qty}</b><button className="add" onClick={()=>updateCartQty(ci.uid,1)}>+</button></div>}
      </div>))}
      <div style={{display:"flex",justifyContent:"space-between",paddingTop:14,fontFamily:"Prompt",fontWeight:800,fontSize:15}}><span>รวม</span><span style={{color:"var(--gold)"}}>฿{cartTotal}</span></div>
      {hasFreeSodaInCart&&paidCount===0&&<p style={{fontSize:11,color:"var(--danger)",marginTop:8}}>⚠️ เลือกเมนูราคาเต็มอีก 1 รายการก่อนยืนยัน</p>}
      <button className="cta" style={{opacity:paidCount>0?1:.4}} disabled={paidCount===0} onClick={submitOrder}>ยืนยันเมนู — สั่งรายการนี้</button>
      <button className="ghost" onClick={()=>setCartOpen(false)}>เลือกเมนูต่อ</button>
    </div></div>)}
    {toast&&<div className="toast">{toast}</div>}
    <Nav/>
  </div>);
}
