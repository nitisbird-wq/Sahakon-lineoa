# SAHAKON Master Development Book
## Volume 1 — Business Roadmap
### Version 1.0 | Revised per CTO/Investor Review

---

## คำตอบ 5 คำถามนักลงทุน

| คำถาม | คำตอบ |
|---|---|
| เปิดร้านได้เร็วสุดเมื่อไร และใช้เงินเท่าไร | **2-3 สัปดาห์** นับจากวันที่เจ้าของส่งเมนูและรูปจริง ค่าใช้จ่าย infrastructure เดือนแรก **≈ 2,500–4,000 THB** |
| ถ้า Web App ยังไม่เสร็จ ร้านเปิดได้ไหม | **ได้** — ระบบออกแบบให้มี Manual Fallback ทุกจุด (ดู Volume 3) |
| Feature ไหนสร้างรายได้โดยตรง | Table QR, Membership, Redeem-with-purchase, Early Bird, Day Pass, Event Booking |
| เมื่อมี 500-1,000 ลูกค้า ระบบรองรับได้ไหม | **ได้** — Firebase Blaze รองรับ unlimited ตามการใช้จริง ค่าใช้จ่ายเพิ่มตามสัดส่วน (~3,000 THB/เดือนที่ 1,000 active users) |
| ถ้าผู้พัฒนาหยุดทำงาน ส่งต่อได้ไหม | **ได้** — ชุดเอกสาร 3 volumes นี้ + codebase บน GitHub ทำให้ developer ใหม่ onboard ได้ใน 2-3 วัน |

---

## Priority Matrix

> ใช้เมื่อต้องตัดสินใจว่าจะทำอะไรก่อน เมื่อเวลาหรือทรัพยากรจำกัด

| Priority | ความหมาย | ตัวอย่าง |
|---|---|---|
| **P0** | เปิดร้านไม่ได้ถ้าไม่มี | Table QR, Firebase Auth, Staff Screen |
| **P1** | ร้านทำงานได้แต่ไม่ราบรื่น | Order real-time, Redeem guard, Booking persist |
| **P2** | เพิ่มรายได้โดยตรง | Referral, Birthday reward, Google Review prompt |
| **P3** | เพิ่มความสะดวก / ลด friction | Digital receipt, Add to Calendar, Search menu |
| **P4** | Luxury — มีดีกว่าไม่มี แต่ไม่เร่งด่วน | AI Recommendation, Tax Invoice, Knowledge Base |

### Feature Priority Classification (ทุก Feature)

| Feature | Priority | เหตุผล | Phase |
|---|---|---|---|
| เมนูจริง + ราคาจริง | **P0** | ร้านขายอะไรไม่รู้ | 0 |
| Table QR auto-fill | **P0** | order ผิดโต๊ะ = chaos | 0 |
| Firebase Auth (OTP) | **P0** | ไม่มี identity ทุกอย่างพัง | 1 |
| Member persistence | **P0** | member รีเฟรชแล้วหาย | 1 |
| Redeem server guard | **P0** | revenue leak ทุกวัน | 1 |
| Staff Screen real-time | **P0** | staff ไม่รู้มี order | 1 |
| Order real-time sync | **P0** | customer ไม่รู้สถานะ | 1 |
| Booking persist (Firestore) | **P0** | booking หายทุก refresh | 1 |
| Manual Fallback SOP | **P0** | internet ร้านล่ม = ปิดร้าน | 0 |
| Domain + SSL | **P0** | ไม่น่าเชื่อถือ | 0 |
| Staff PIN (ไม่ hardcode) | **P0** | security hole | 0 |
| รูปจริง (Hero + Zone) | **P0** | แอปดูเป็น demo ไม่ใช่ร้าน | 0 |
| Popular items section | **P1** | conversion +30% | 1 |
| Estimated wait time | **P1** | ลด anxiety ลูกค้า | 1 |
| Audio beep (new order) | **P1** | 1 staff ทำงานคนเดียว | ✅ Done |
| Cart delete button | **P1** | order ผิดแก้ไม่ได้ | ✅ Done |
| QR timer 90s | **P1** | security basic | ✅ Done |
| Staff booking list | **P1** | staff ไม่รู้มีจอง | ✅ Done |
| Redeem staff approve | **P1** | security flow | ✅ Done |
| LINE OA notification | **P1** | customer engagement | 1 |
| Menu search | **P1** | เมนูขยายใหญ่ขึ้น | 1 |
| Zone availability real-time | **P1** | overbooking = conflict | 2 |
| Cancel booking in app | **P1** | staff รับโทรศัพท์แทน | 2 |
| Birthday reward | **P2** | recurring visit ทุกปี | 2 |
| Google Review prompt | **P2** | discovery / acquisition | 1 |
| Early Bird pricing | **P2** | smooth off-peak traffic | 2 |
| Day Pass co-working | **P2** | revenue stream ใหม่ | 2 |
| Referral program | **P2** | lowest CAC | 2 |
| Event/Workshop booking | **P2** | premium space revenue | 2 |
| Milestone notifications | **P2** | retention | 2 |
| Digital receipt | **P3** | workspace customer need | 2 |
| Add to Calendar | **P3** | reduce no-show | 2 |
| Transaction history | **P3** | trust building | 2 |
| Split bill | **P3** | group satisfaction | 3 |
| Dietary filter | **P3** | accessibility | 3 |
| Staff daily checklist | **P3** | operational quality | 2 |
| Alert panel (staff) | **P3** | service quality | 2 |
| Owner dashboard | **P3** | visibility | 2 |
| Tax invoice | **P4** | after B2B segment grows | 3 |
| AI recommendation | **P4** | after 6-12 mo. data | 3 |
| WiFi captive portal | **P4** | separate infra project | 3 |
| n8n automation | **P4** | after patterns emerge | 3 |
| Knowledge base | **P4** | org maturity | 3 |

---

## Dependency Map

```
FOUNDATION (ต้องมีก่อนทุกอย่าง)
└── Firebase Project Setup
    ├── [P0] Firebase Auth (Phone OTP)
    │   └── [P0] Member Profile (Firestore /members)
    │       ├── [P0] Redeem Cloud Function (daily guard)
    │       │   ├── [P1] LINE Notification (redeem confirm)
    │       │   └── [P3] Redeem History
    │       ├── [P0] Booking (Firestore /bookings)
    │       │   ├── [P1] Zone Availability
    │       │   ├── [P1] Cancel Booking
    │       │   └── [P1] LINE Notification (booking confirm)
    │       ├── [P2] Birthday Reward
    │       ├── [P2] Referral Program
    │       └── [P3] Transaction History
    ├── [P0] Firestore /orders (real-time)
    │   ├── [P0] Staff Screen live
    │   ├── [P1] Order Status push
    │   └── [P3] Owner Dashboard (requires 1+ month data)
    └── [P0] Cloud Functions
        ├── redeemSoda (daily limit)
        ├── confirmMember (staff trigger)
        └── advanceOrderStatus (audit log)

INTEGRATION LAYER (requires Foundation)
├── [P1] LINE OA Messaging
│   ├── Order ready notification
│   ├── Booking confirmation
│   └── Membership activation
├── [P0] Table QR system (static, no backend needed)
├── [P3] Dynamic PromptPay QR (requires bank agreement)
└── [P4] Ocha POS API (requires Ocha support)

ANALYTICS LAYER (requires 1+ month of data)
└── Owner Dashboard
    ├── Sales metrics
    ├── Member metrics
    └── [P4] Advanced analytics / n8n
```

**กฎ:** ห้ามเริ่มทำ feature ที่อยู่ในระดับสูงกว่า ถ้า dependency ระดับล่างยังไม่เสร็จ

---

## ROI Matrix

| Feature | Dev Cost | Monthly Op Cost | Revenue Impact | Payback | ROI Score |
|---|---|---|---|---|---|
| Table QR (print) | 2 ชม dev + 300 print | 0 | ลด wrong orders, เร็วขึ้น 30% | 1 วัน | ★★★★★ |
| Google Review Prompt | 2 ชม | 0 | +1 ลูกค้า/เดือน จาก discovery | 1 เดือน | ★★★★★ |
| Redeem Server Guard | 4 ชม | Firebase cost | ปิดช่องโหว่ 50-300 THB/วัน | ทันที | ★★★★★ |
| Popular Items | 2 ชม | 0 | +15% order conversion | 1 วัน | ★★★★★ |
| Birthday Reward | 4 ชม | 50 THB/ต่อ redeem | 3x visits ในเดือนเกิด | 2 เดือน | ★★★★ |
| Early Bird (10% ก่อน 11:00) | 3 ชม | ส่วนลด ~10 THB/order | traffic smooth, avg +20% ช่วงเช้า | 1 เดือน | ★★★★ |
| Day Pass (99 THB/วัน) | 1 สัปดาห์ | 0 | ~20 pass/เดือน = 1,980 THB | 2 สัปดาห์ | ★★★★ |
| Referral | 6 ชม | เครดิต 50 THB/referral | 1 member → 1.5 members avg | 3 เดือน | ★★★★ |
| Milestone Notification | 4 ชม | LINE API cost | +30% milestone redemption rate | 1 เดือน | ★★★ |
| Cancel Booking | 3 ชม | 0 | ลด no-show conflict, staff time | 2 สัปดาห์ | ★★★ |
| Split Bill | 1 สัปดาห์ | 0 | group satisfaction, repeat visit | ไม่แน่นอน | ★★ |
| Tax Invoice | 4 ชม | 0 | B2B segment (ถ้ามี) | ไม่แน่นอน | ★★ |
| AI Recommendation | 40+ ชม + ML | HIGH | +5-10% upsell (ถ้า data พอ) | 6-12 เดือน | ★ |
| WiFi Captive Portal | 2 สัปดาห์ + อุปกรณ์ | HIGH | brand lock-in | ไม่แน่นอน | ★ |

---

## Cost Dashboard

### รายเดือน (Recurring Costs)

| รายการ | Free Tier | หลัง Free Tier | ประมาณ/เดือน (launch) | ประมาณ/เดือน (500 users) |
|---|---|---|---|---|
| Firebase Auth | 10K verif/month | $0.0055/SMS | ~50–150 THB | ~200–400 THB |
| Firestore reads | 50K/day | $0.06/100K reads | ~0 THB | ~100–300 THB |
| Firestore writes | 20K/day | $0.18/100K writes | ~0 THB | ~50–150 THB |
| Cloud Functions | 2M calls/month | $0.40/million | ~0 THB | ~50–100 THB |
| Firebase Storage | 5 GB | $0.026/GB | ~0 THB | ~50 THB |
| LINE Messaging | 200 msg/month | 1,500 THB/3,000 msg | 0 THB (launch) | 1,500 THB |
| Vercel Hosting | Hobby (ฟรี) | $20/month Pro | 0 THB | 0 THB |
| Domain | - | ~300–500 THB/ปี | ~35 THB | ~35 THB |
| **รวม** | | | **~85–185 THB** | **~2,000–2,500 THB** |

### One-time Costs

| รายการ | ราคา |
|---|---|
| Print QR Table Tents (12 โต๊ะ) | ~300–600 THB |
| Tablet/device สำหรับ Staff Screen | ~3,000–8,000 THB |
| Custom domain (1 ปี) | ~300–500 THB |
| LINE OA Verified account | ฟรี (basic) |
| **รวมก่อนเปิดร้าน** | **~3,600–9,100 THB** |

---

## Risk Register

| Risk | Probability | Impact | Mitigation | Owner |
|---|---|---|---|---|
| **Internet ร้านล่ม** | 🔴 สูง | 🔴 สูง | Manual order book, POS ต่างหาก | เจ้าของ |
| **Firebase ล่ม** (Outage) | 🟢 ต่ำ | 🔴 สูง | Static menu fallback, offline state | Agent |
| **LINE API fail** | 🟡 กลาง | 🟡 กลาง | SMS backup via Twilio | Agent |
| **Tablet/device เสีย** | 🟡 กลาง | 🔴 สูง | มีมือถือสำรอง + QR backup | เจ้าของ |
| **Staff ลาออก กะทันหัน** | 🔴 สูง | 🟡 กลาง | SOP เป็นลายลักษณ์อักษร (Volume 3) | เจ้าของ |
| **Double redeem (QR เก่า)** | 🟡 กลาง | 🟡 กลาง | Server-side daily guard (P0 fix) | Agent |
| **Firebase cost spike** | 🟢 ต่ำ | 🟡 กลาง | Budget alert ที่ $10/month | Agent |
| **OTP fraud** | 🟢 ต่ำ | 🟡 กลาง | Rate limiting 5 OTP/phone/day | Agent |
| **QR scan แล้ว table ผิด** | 🟡 กลาง | 🟡 กลาง | Lock table หลัง 1st order | Agent |
| **Ocha API ไม่พร้อม** | 🟡 กลาง | 🟡 กลาง | ทำ manual integration ก่อน | เจ้าของ+Agent |
| **Feature ใช้ไม่เป็น (staff)** | 🔴 สูง | 🟡 กลาง | Training session + SOP video | เจ้าของ |
| **ลูกค้าไม่รู้ว่ามีแอป** | 🔴 สูง | 🟡 กลาง | QR ติดทุกโต๊ะ + พนักงาน guide | เจ้าของ |

---

## Owner Decision Queue

> สิ่งที่ Agent ต้องรอ Owner ตัดสินใจ — ตอบแล้วส่งมาเพื่อไม่ให้งานหยุด

### 🔴 ต้องตัดสินใจก่อน Phase 0

| # | คำถาม | ผลกระทบ | กำหนด |
|---|---|---|---|
| OD-01 | **เมนูจริงทุกรายการ** (ชื่อ, ราคา, หมวด) คืออะไร | เปลี่ยนทั้ง menu data | ก่อน Phase 0 |
| OD-02 | **รูปร้าน** ถ่ายเสร็จแล้วส่งมาได้ไหม | UI ดูจริงหรือไม่ | ก่อน Phase 0 |
| OD-03 | **Domain** ต้องการใช้ชื่ออะไร (sahakon.th, sahakon.coffee, etc.) | URL ของแอป | ก่อน Phase 0 |
| OD-04 | **Staff PIN** จะกำหนดเป็นเลขอะไร (แยกต่อ shift หรือ 1 PIN รวม) | Security | ก่อน Phase 0 |
| OD-05 | **เวลาเปิด-ปิดร้าน** วันธรรมดาและวันหยุด | แสดงในแอป | ก่อน Phase 0 |
| OD-06 | **โต๊ะทั้งหมด** มีกี่โต๊ะ ชื่ออะไรบ้าง แต่ละโต๊ะรับกี่คน | Table QR | ก่อน Phase 0 |
| OD-07 | **No-show policy** เก็บที่นั่งกี่นาที (30 นาที?) | Booking | ก่อน Phase 0 |

### 🟡 ต้องตัดสินใจก่อน Phase 1

| # | คำถาม | ผลกระทบ |
|---|---|---|
| OD-08 | **สร้าง Firebase account** (Google account ไหน) | Backend ทั้งหมด |
| OD-09 | **LINE OA** มีอยู่แล้วหรือต้องสมัครใหม่ | Notification system |
| OD-10 | **Membership ราคา** 299 THB/ปี ยืนยันแน่นอน? หรือมีแผน Early Bird price? | Payment flow |
| OD-11 | **Italian Soda flavors** มีกี่รส ชื่ออะไรบ้าง (ปัจจุบัน: แดงมะนาว, ลิ้นจี่, ส้ม) | Redeem flavor picker |
| OD-12 | **เงื่อนไข qualifying purchase** ต้องสั่งอะไร ราคาขั้นต่ำเท่าไร | Redeem logic |

### 🟠 ตัดสินใจก่อน Phase 2

| # | คำถาม |
|---|---|
| OD-13 | **Day Pass** ราคา 99 THB/วัน? รวมอะไรบ้าง (WiFi, ปลั๊ก, แต่ไม่รวมอาหาร?) |
| OD-14 | **Event space** ราคาเช่า/ชม สำหรับ workshop |
| OD-15 | **Referral reward** ให้อะไร (เครดิต? โซดาฟรี? ส่วนลด?) |
| OD-16 | **Birthday reward** ให้อะไร (ฟรี 1 เมนู? ส่วนลด 20%?) |
| OD-17 | **Early Bird discount** กี่ % สำหรับ order ก่อน 11:00 |

---

## Feature Reclassification (ปรับตามข้อเสนอ CTO/Investor)

| Feature | Phase เดิม | Phase ใหม่ | เหตุผล |
|---|---|---|---|
| Referral | Phase 1 | Phase 2 | เปิดร้านก่อน สร้าง product market fit ก่อน referral |
| Birthday Reward | Phase 1 | Phase 2 | ต้องมีฐาน member ก่อน จึงคุ้มค่า |
| Split Bill | Phase 2 | Phase 3 | ซับซ้อน, ลูกค้ากลุ่มนี้ยังไม่ชัดว่ามีมากน้อยแค่ไหน |
| Dietary Filter | Phase 2 | Phase 3 | เพิ่มเมื่อเมนูขยาย, ตอนนี้ menu เล็ก filter ไม่ช่วยมาก |
| AI Recommendation | Phase 3 | หลัง 6-12 เดือน | ต้องมีข้อมูลจริงก่อน ไม่งั้นเป็น random |
| Tax Invoice | Phase 2 | เมื่อ B2B segment ชัดเจน | สร้างก่อนที่จะรู้ว่าใครต้องการ = waste |
| n8n Automation | Phase 3 | หลัง patterns ชัดเจน | automate สิ่งที่ยังไม่รู้ว่าจะ automate อะไร |

---

## Analytics Event Tracking Plan

> กำหนด event ที่จะ track ตั้งแต่วันแรก เพื่อมีข้อมูลตัดสินใจ

| Event Name | Trigger | Parameters | ใช้ทำอะไร |
|---|---|---|---|
| `app_open` | ทุกครั้งที่เปิดแอป | mode, user_type | DAU/MAU |
| `mode_switch` | สลับ Day/Night | from, to | insight: ลูกค้ามากช่วงไหน |
| `menu_view` | เปิดหมวดเมนู | category, mode | popular category |
| `item_view` | กด item ดูรายละเอียด | item_id, price | menu interest |
| `item_add_cart` | กด + | item_id, price, customized | conversion funnel |
| `item_remove_cart` | กด ✕ | item_id | friction point |
| `checkout_start` | เปิด cart sheet | cart_total, item_count | checkout intent |
| `order_submit` | กด ยืนยันเมนู | total, items, table | revenue event |
| `redeem_start` | กด รับสิทธิ์ | member_no | engagement |
| `redeem_complete` | staff approve + flavor confirm | flavor, order_value | conversion |
| `booking_start` | เปิด booking form | zone | intent |
| `booking_submit` | กด ยืนยันการจอง | zone, ppl, date | booking funnel |
| `booking_cancel` | cancel | code, reason | churn signal |
| `register_start` | กด สมัครเลย | source | acquisition |
| `register_complete` | member activated | referral_code | CAC |
| `referral_share` | share referral | member_no | viral coefficient |
| `review_prompt_shown` | หลัง served 5 min | - | |
| `review_prompt_click` | กด ไป review | - | conversion |

---

## Opening Day Mode (Feature Flags)

> วันแรกเปิดร้าน — ปิด feature ที่ยังไม่พร้อม เหลือแค่ core

### เปิด (ON) วันแรก
- ✅ Menu + Order
- ✅ Cart + Checkout
- ✅ Order Status (staff-driven)
- ✅ Staff Screen
- ✅ Membership Register
- ✅ Redeem flow
- ✅ Table booking (basic)

### ปิด (OFF) วันแรก — เปิดเมื่อพร้อม
- 🔲 Referral program
- 🔲 Birthday reward
- 🔲 Early Bird pricing
- 🔲 Day Pass
- 🔲 Event booking
- 🔲 Analytics dashboard
- 🔲 Google Review prompt (เปิดสัปดาห์ที่ 2)

### วิธี implement: Feature Flag ใน Firestore
```
settings/featureFlags
  - referralEnabled: false
  - birthdayEnabled: false
  - earlyBirdEnabled: false
  - dayPassEnabled: false
  - reviewPromptEnabled: false
```
Agent หรือเจ้าของ toggle ได้จาก Firestore Console โดยไม่ต้อง redeploy

---

## Launch Checklist (ก่อนเปิดวันแรก)

### Infrastructure
- [ ] Domain ชี้ไปยัง Vercel ถูกต้อง
- [ ] SSL certificate active (https://)
- [ ] Firebase project production พร้อม
- [ ] Environment variables ทั้งหมด set ใน Vercel
- [ ] Firebase Security Rules deploy แล้ว
- [ ] Cloud Functions deploy แล้วและทดสอบแล้ว
- [ ] LINE OA Webhook endpoint ทดสอบแล้ว

### Content
- [ ] เมนูทุกรายการถูกต้อง (ชื่อ, ราคา, หมวด)
- [ ] รูปจริงทุกจุด (Hero + Zone + Food หลัก)
- [ ] เวลาเปิด-ปิดร้านถูกต้อง
- [ ] ข้อมูลที่อยู่ร้านถูกต้อง
- [ ] Terms & Conditions สมาชิกครบ

### Hardware
- [ ] Tablet Staff Screen ชาร์จเต็ม + case กันกระแทก
- [ ] Tablet สำรอง (มือถือ) พร้อม
- [ ] QR Table Tent ติดทุกโต๊ะแล้ว
- [ ] ทดสอบ scan QR ทุกโต๊ะ (12 โต๊ะ)
- [ ] Internet ร้าน ทดสอบ speed + stability
- [ ] Internet backup (มือถือ hotspot)
- [ ] Printer receipt ทดสอบ (ถ้ามี)

### Staff
- [ ] Staff ทุกคน login Staff Screen ได้
- [ ] Staff เข้าใจ flow: รับ order → advance → serve
- [ ] Staff เข้าใจ flow: approve redeem
- [ ] Staff เข้าใจ manual fallback (ถ้า internet ล่ม)
- [ ] Staff PIN เปลี่ยนจาก 1234 เป็น PIN จริงแล้ว

### Testing (ก่อน soft open 24 ชม)
- [ ] ทดสอบ order flow ครบ (Day + Night mode)
- [ ] ทดสอบ membership registration → activation
- [ ] ทดสอบ redeem ครบ (approve + reject + expire)
- [ ] ทดสอบ booking (submit + staff see + cancel)
- [ ] ทดสอบ ปิด internet แล้วใช้ manual mode

### Backup Plan
- [ ] Order book กระดาษพร้อม
- [ ] Pen พร้อม
- [ ] Ocha POS ทำงานได้อิสระ (ไม่ depend on Web App)
- [ ] เบอร์โทรสำรองร้าน (ลูกค้าโทรจองได้)
