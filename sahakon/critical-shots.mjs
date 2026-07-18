import puppeteer from 'puppeteer';
const BASE = 'http://localhost:5176/Sahakon-lineoa/';
const OUT = '/opt/cursor/artifacts/screenshots';
const W = 430, H = 860;

const browser = await puppeteer.launch({
  executablePath: '/usr/local/bin/google-chrome',
  args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'],
  headless: 'new',
});
const newPage = async () => {
  const p = await browser.newPage();
  await p.setViewport({width:W,height:H,deviceScaleFactor:2});
  return p;
};
const shot = async (page, name) => {
  await page.screenshot({path:`${OUT}/${name}`});
  console.log('✓', name);
};
const wait = ms => new Promise(r => setTimeout(r, ms));

const activateMember = async (page) => {
  await page.goto(BASE, {waitUntil:'networkidle2'});
  await wait(400);
  await page.evaluate(() => document.querySelector('.joinbtn').click());
  await wait(500);
  const inp = await page.$$('.frow input');
  await inp[0].click(); await inp[0].type('ท่อนไม้');
  await inp[1].click(); await inp[1].type('0812345678');
  await inp[2].click(); await inp[2].type('14/02');
  await wait(300);
  await page.evaluate(() => [...document.querySelectorAll('button.cta')].find(x=>x.textContent.includes('สมัคร')).click());
  await wait(500);
  await page.evaluate(() => [...document.querySelectorAll('button.cta')].find(x=>x.textContent.includes('พนักงานยืนยัน')).click());
  await wait(500);
};

// FIX O5: Cart with delete buttons
{
  const page = await newPage();
  await page.goto(BASE, {waitUntil:'networkidle2'});
  await wait(400);
  // Night mode, add items to cart
  await page.evaluate(() => [...document.querySelectorAll('.nav button')].find(x=>x.textContent.includes('สั่งอาหาร')).click());
  await wait(400);
  await page.evaluate(() => document.querySelectorAll('.zonebtns button')[0].click());
  await wait(400);
  // Switch to Add-on (non-cust items)
  await page.evaluate(() => [...document.querySelectorAll('.rail button')].find(x=>x.textContent.includes('Add-on')).click());
  await wait(400);
  // Add 2 items
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.qty button.add')];
    btns[0]?.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  });
  await wait(300);
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.qty button.add')];
    btns[1]?.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  });
  await wait(400);
  // Open cart
  await page.evaluate(() => document.querySelector('.cartbar')?.dispatchEvent(new MouseEvent('click',{bubbles:true})));
  await wait(600);
  await shot(page, 'fix-O5-cart-delete.png');
  await page.close();
}

// FIX P4: QR timer (redeem QR screen)
{
  const page = await newPage();
  await activateMember(page);
  await page.evaluate(() => [...document.querySelectorAll('.nav button')].find(x=>x.textContent.includes('สิทธิ์')).click());
  await wait(500);
  await page.evaluate(() => [...document.querySelectorAll('button.cta')].find(x=>x.textContent.includes('รับสิทธิ์')).click());
  await wait(800);
  await shot(page, 'fix-P4-qr-timer.png');
  await page.close();
}

// STAFF SCREEN: PIN entry
{
  const page = await newPage();
  await page.goto(BASE, {waitUntil:'networkidle2'});
  await wait(600);
  // Triple-tap logo
  for(let i=0;i<3;i++){
    await page.evaluate(() => document.querySelector('.logo').click());
    await wait(200);
  }
  await wait(600);
  await shot(page, 'staff-01-pin-screen.png');

  // Enter PIN 1234
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].filter(b => ['1','2','3','4'].includes(b.textContent.trim()));
    // click 1, 2, 3, 4 in order
    const all = [...document.querySelectorAll('button')];
    const nums = [1,2,3,4];
    nums.forEach(n => {
      const b = all.find(x => x.textContent.trim() === String(n));
      b?.click();
    });
  });
  await wait(400);
  // Tap confirm
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='✓');
    b?.click();
  });
  await wait(600);
  await shot(page, 'staff-02-order-queue-empty.png');
  await page.close();
}

// STAFF SCREEN: with an order (submit order then open staff screen)
{
  const page = await newPage();
  await page.goto(BASE, {waitUntil:'networkidle2'});
  await wait(400);
  // Add items and submit order
  await page.evaluate(() => [...document.querySelectorAll('.nav button')].find(x=>x.textContent.includes('สั่งอาหาร')).click());
  await wait(400);
  await page.evaluate(() => document.querySelectorAll('.zonebtns button')[0].click());
  await wait(400);
  await page.evaluate(() => [...document.querySelectorAll('.rail button')].find(x=>x.textContent.includes('Add-on')).click());
  await wait(400);
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('.qty button.add')];
    btns[0]?.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  });
  await wait(300);
  await page.evaluate(() => document.querySelector('.cartbar')?.dispatchEvent(new MouseEvent('click',{bubbles:true})));
  await wait(500);
  await page.evaluate(() => [...document.querySelectorAll('button.cta')].find(x=>x.textContent.includes('ยืนยันเมนู')).click());
  await wait(800);
  // Open staff screen via triple-tap
  for(let i=0;i<3;i++){
    await page.evaluate(() => document.querySelector('.logo').click());
    await wait(200);
  }
  await wait(600);
  // Enter PIN
  await page.evaluate(() => {
    const all = [...document.querySelectorAll('button')];
    [1,2,3,4].forEach(n => all.find(x=>x.textContent.trim()===String(n))?.click());
  });
  await wait(200);
  await page.evaluate(() => [...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='✓')?.click());
  await wait(700);
  await shot(page, 'staff-03-order-queue-live.png');
  
  // Switch to Redeem tab
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].filter(x=>x.textContent.trim()==='Redeem');
    btns[0]?.click();
  });
  await wait(400);
  await shot(page, 'staff-04-redeem-tab.png');

  // Switch to Bookings tab
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].filter(x=>x.textContent.trim()==='จอง');
    btns[0]?.click();
  });
  await wait(400);
  await shot(page, 'staff-05-bookings-tab.png');
  await page.close();
}

await browser.close();
console.log('all done');
