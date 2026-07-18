# SAHAKON Master Development Book
## Volume 3 — Operations Manual
### Version 1.0

---

## Definition of Done (per Critical Feature)

### P0-01 — Table QR Auto-fill
**Done เมื่อ:**
- [ ] QR scan แล้วเปิดแอปภายใน 2 วินาที
- [ ] URL param `?table=T01` ถูก detect และ set table อัตโนมัติ
- [ ] ลูกค้าไม่ต้องเลือกโต๊ะเอง (ข้ามหน้า table selection)
- [ ] ทดสอบ scan ครบทุกโต๊ะ (12 โต๊ะ)
- [ ] ถ้าสแกนซ้ำ โต๊ะไม่เปลี่ยน (lock หลัง order แรก)
- [ ] ถ้าเปิด URL โดยไม่มี param → แสดงหน้า table selection ตามปกติ

### P0 — Firebase Auth (Phone OTP)
**Done เมื่อ:**
- [ ] ลูกค้ากรอกเบอร์ → ได้รับ OTP ใน 30 วินาที
- [ ] OTP ถูกต้อง → login และ redirect กลับหน้าก่อนหน้า
- [ ] OTP ผิด → แสดง error ชัดเจน (ไม่ใช่ error code)
- [ ] Rate limit: OTP เกิน 5 ครั้ง/ชม → block พร้อม message
- [ ] Refresh page → ยังคง logged in (token persist)
- [ ] ปิดแอป เปิดใหม่ → ยังคง logged in

### P0 — Member Persistence
**Done เมื่อ:**
- [ ] สมัครสมาชิก → ข้อมูลบันทึกใน Firestore `/members/{uid}`
- [ ] Refresh → Member card ยังแสดงชื่อและสถานะถูกต้อง
- [ ] เปิดแอปบน device อื่น → ข้อมูลเดียวกัน (cross-device)
- [ ] `expiresAt` = `joinedAt` + 365 วัน (คำนวณ server-side)
- [ ] `memberNo` unique ไม่ซ้ำกับ member อื่น

### P0 — Redeem Server Guard
**Done เมื่อ:**
- [ ] วันนี้ยังไม่ redeem → ผ่าน
- [ ] วันนี้ redeem แล้ว → block พร้อม "ใช้แล้ววันนี้"
- [ ] Refresh page แล้ว redeem ซ้ำ → block (server-side verify)
- [ ] เที่ยงคืน → reset (date key เปลี่ยนเป็นวันใหม่)
- [ ] Membership expired → block
- [ ] Guest (ไม่ได้ login) → block
- [ ] ไม่มี qualifying order → block
- [ ] Staff approve → member ได้รับ LINE notification

### P0 — Staff Screen Real-time
**Done เมื่อ:**
- [ ] ลูกค้า submit order → ปรากฏใน Staff Screen ภายใน 3 วินาที
- [ ] Staff กด "รับออเดอร์" → สถานะเปลี่ยนใน customer app ภายใน 3 วินาที
- [ ] Audio beep ดังเมื่อมี order ใหม่
- [ ] Staff Screen ทำงานได้บน Tablet + มือถือ (responsive)
- [ ] PIN gate ป้องกัน unauthorized access
- [ ] Auto-lock หลัง idle 5 นาที (re-enter PIN)

---

## Test Cases (Critical Flows)

### TC-001: Member Registration & Activation

| # | Test Case | Steps | Expected Result | Pass/Fail |
|---|---|---|---|---|
| TC-001-01 | Register ใหม่ (valid) | กรอกชื่อ + เบอร์ถูก + วันเกิด → สมัคร | ไปหน้า Pending + แสดง QR | |
| TC-001-02 | เบอร์ผิด format | กรอกเบอร์ 9 หลัก → สมัคร | ปุ่ม disabled | |
| TC-001-03 | ชื่อว่าง | ไม่กรอกชื่อ → สมัคร | ปุ่ม disabled | |
| TC-001-04 | Staff activate | Staff เข้า Staff Screen → Pending → Approve | Member status → active | |
| TC-001-05 | Refresh หลัง active | Refresh browser | Member card แสดงถูกต้อง | |
| TC-001-06 | Expiry date | ดู member card | วันหมดอายุ = วันสมัคร + 365 วัน | |
| TC-001-07 | สมัครซ้ำเบอร์เดิม | ใช้เบอร์ที่มี account อยู่แล้ว | Login เข้าบัญชีเดิม (Firebase OTP) | |

### TC-002: Redeem Flow

| # | Test Case | Steps | Expected Result | Pass/Fail |
|---|---|---|---|---|
| TC-002-01 | Redeem ปกติ (วันใหม่ มี order) | Member + มี qualifying order → redeem | QR แสดง, staff approve, เลือกรสได้ | |
| TC-002-02 | Redeem ซ้ำวันเดียวกัน | Redeem แล้ว → redeem อีก | "ใช้แล้ววันนี้ ✓" | |
| TC-002-03 | Refresh แล้ว redeem ซ้ำ | Redeem แล้ว → refresh → redeem | Server block | |
| TC-002-04 | QR หมดอายุ 90 วินาที | รอ 90 วินาที | "QR หมดอายุ" + ปุ่ม refresh | |
| TC-002-05 | ไม่มี qualifying order | Redeem โดยไม่มีสินค้าราคาเต็ม | Block พร้อม message | |
| TC-002-06 | Guest (ไม่ได้ login) | เข้า Redeem tab | หน้า "เฉพาะสมาชิก" | |
| TC-002-07 | Membership expired | member หมดอายุ → redeem | Block "สมาชิกหมดอายุ" | |
| TC-002-08 | Staff reject | Staff กด reject | Redeem status = rejected, notify customer | |
| TC-002-09 | วันเกิด = วันนี้ + Redeem | Birthday month + redeem | Birthday ribbon แสดง (Phase 2) | |
| TC-002-10 | เที่ยงคืน reset | Redeem วันนี้ → รอถึง 00:01 → redeem | ผ่าน | |

### TC-003: Booking Flow

| # | Test Case | Steps | Expected Result | Pass/Fail |
|---|---|---|---|---|
| TC-003-01 | จองปกติ (guest) | กรอกครบ → ยืนยัน | Code แสดง + บันทึกใน Firestore | |
| TC-003-02 | Member auto-fill | Member login → เปิด booking | ชื่อ+เบอร์ auto-fill | |
| TC-003-03 | Refresh หลังจอง | จอง → refresh | Booking ยังอยู่ | |
| TC-003-04 | Staff เห็น booking | จอง → Staff Screen → Bookings tab | Booking แสดง | |
| TC-003-05 | Staff confirm | Staff กด confirm | Status → confirmed + LINE notify | |
| TC-003-06 | Cancel booking | กด cancel ใน app | Status → cancelled | |
| TC-003-07 | Overbooking | Zone เต็ม → จองอีก | Zone แสดง "เต็ม" | |
| TC-003-08 | No-show | ไม่มาภายใน 30 นาที | Staff mark no-show | |

### TC-004: Order Flow

| # | Test Case | Steps | Expected Result | Pass/Fail |
|---|---|---|---|---|
| TC-004-01 | Quick add | กด + item ธรรมดา | quantity เพิ่ม 1 | |
| TC-004-02 | Customize add | กด + item ⚙️ | Customize sheet เปิด | |
| TC-004-03 | Delete customized | กด ✕ ใน cart | Item หาย | |
| TC-004-04 | Delete free soda | กด ✕ ใน cart (free item) | Free soda หาย | |
| TC-004-05 | Submit order | กด ยืนยันเมนู | Staff Screen แสดง ภายใน 3 วินาที | |
| TC-004-06 | Staff advance | Staff กด รับออเดอร์ | Customer app สถานะเปลี่ยน 3 วินาที | |
| TC-004-07 | Multiple rounds | สั่งเพิ่ม round 2 | บิลรวมถูกต้อง | |
| TC-004-08 | Day 6-step status | Day mode order | waiting_pos → pay → preparing → ready → done | |
| TC-004-09 | Night 4-step status | Night mode order | waiting → preparing → ready → served | |

---

## Staff Workflow (SOP)

### เปิดร้านทุกวัน (Opening Procedure)

```
07:00 - เข้าร้าน
  □ เปิด Internet router
  □ เปิด Tablet (Staff Screen)
  □ Login Staff Screen (PIN)
  □ ตรวจสอบ booking วันนี้ (Bookings tab)
  □ ตรวจสอบ stock: น้ำ, ถ้วย, กาแฟ, วัตถุดิบ

08:00 - เตรียมร้าน
  □ เช็ค Table QR ทุกโต๊ะ (scan 1 โต๊ะ test)
  □ เช็ค Italian Soda stock (แดงมะนาว / ลิ้นจี่ / ส้ม)
  □ เช็ค Ocha POS ทำงานปกติ

10:00 - เปิดร้าน
  □ เปิด app mode = Day
  □ Staff Screen แสดง "ไม่มีออเดอร์" = ปกติ
```

### รับ Order (Order Handling SOP)

```
1. Staff Screen มี Alert เสียง + order ใหม่ขึ้น
2. Staff กด "รับออเดอร์ →" ภายใน 60 วินาที
3. คีย์ order เข้า Ocha POS (ถ้ายังไม่ integrate)
4. ทำอาหาร/เครื่องดื่ม
5. กด "พร้อมเสิร์ฟ →"
6. นำไปเสิร์ฟที่โต๊ะ
7. กด "เสิร์ฟแล้ว ✓"
8. Customer app แสดง ✅
```

### ตรวจสอบ Redeem (Redeem Verification SOP)

```
1. ลูกค้าแสดง QR (หน้า "ยื่น QR ให้พนักงาน")
2. Staff ดู Staff Screen → Redeem tab
3. ตรวจสอบชื่อและรหัสสมาชิกตรงกัน
4. กด "✓ อนุมัติ"
5. บอกลูกค้าให้เลือกรส Italian Soda
6. เตรียม Italian Soda ตามที่ลูกค้าเลือก

หมายเหตุ: ห้ามอนุมัติ redeem โดยไม่ดู Staff Screen
```

### จัดการ Booking (Booking Handling SOP)

```
ก่อนถึงเวลา 15 นาที:
  □ ดู Bookings tab ในวันนั้น
  □ เตรียมโซนที่จอง
  □ วางป้ายสำรอง (ถ้ามี)

เมื่อลูกค้ามาถึง:
  □ ขอชื่อหรือ booking code
  □ หา booking ใน Staff Screen
  □ กด "Check-in"

ถ้าลูกค้าไม่มาใน 30 นาที:
  □ กด "No-show"
  □ ปลดสำรองโต๊ะ
```

### ปิดร้าน (Closing Procedure)

```
21:30 - Last Order
  □ ประกาศ "last order" ให้ลูกค้าทราบ

22:00 - ปิดร้าน
  □ Staff Screen ตรวจสอบ order ทั้งหมด status = completed
  □ ดึง daily report จาก Ocha POS
  □ บันทึก cash (ยอด POS vs ยอดจริง)
  □ รายงาน discrepancy (ถ้ามี) ใน app

22:30 - ออกจากร้าน
  □ Logout Staff Screen
  □ ปิด Tablet ชาร์จไว้สำหรับพรุ่งนี้
  □ ปิด Internet router
```

---

## Disaster Recovery Plan (Manual Fallback)

### Scenario 1: Internet ร้านล่ม

```
DETECT: App โหลดไม่ได้ / หน้าขาว
ACTION:
  1. เปิด Hotspot จากมือถือ (สำรอง)
  2. ถ้า Hotspot ไม่ดีพอ → Manual mode

MANUAL MODE:
  - Order: ใช้ Order Book กระดาษ
  - รับออเดอร์: พนักงานเดินไปที่โต๊ะ
  - Ocha POS: ทำงานได้ offline (ไม่ depend on web app)
  - Redeem: Staff verify ด้วยตา (เช็ค member card หรือโทรถาม)
  - Payment: PromptPay ส่วนตัว หรือ cash เท่านั้น

RECOVERY: เมื่อ internet กลับมา
  - Order ที่บันทึกใน Ocha จะ sync ตามปกติ
  - Order ที่จดในกระดาษ → คีย์เข้า Ocha ย้อนหลัง
```

### Scenario 2: Firebase ล่ม (อาจเกิด <0.1% ของเวลา)

```
DETECT: Login ไม่ได้ / Order ไม่ขึ้น Staff Screen
ACTION:
  1. ตรวจสอบ status.firebase.google.com
  2. ถ้าเป็น Firebase outage → ใช้ Manual Mode
  3. แจ้งลูกค้าสุภาพ: "ระบบมีปัญหาชั่วคราว ขอโทษด้วยนะคะ"

MANUAL MODE: ดู Scenario 1
```

### Scenario 3: Tablet Staff Screen เสีย

```
ACTION:
  1. ใช้มือถือส่วนตัว (login Staff Screen ผ่าน browser ได้เลย)
  2. URL: https://sahakon.th → triple-tap logo → Staff PIN
  3. ถ้ามือถือแบตหมด → Manual Order Book
```

### Scenario 4: LINE OA ส่ง notification ไม่ได้

```
ACTION:
  1. LINE notification เป็น nice-to-have ไม่ใช่ critical
  2. ลูกค้ายังดู Order Status ใน App ได้
  3. Staff แจ้งด้วยปาก (วิธีดั้งเดิม)
  4. Log error → แก้ไข webhook ใน Firebase Console
```

### Scenario 5: Staff ลาป่วยกะทันหัน (1 คนทำคนเดียว)

```
PRIORITY ลดลงเหลือ:
  1. รับ Order (Priority 1)
  2. Serve อาหาร (Priority 1)
  3. Redeem approve (Priority 2)
  4. Booking check-in (Priority 3)

ปิด feature ชั่วคราว:
  - Disable Event booking (settings/featureFlags)
  - ปิดรับ Booking ใหม่ชั่วคราว (staff แจ้งเอง)
```

---

## QA Testing Schedule

### Before Launch (Soft Open — 1 วันก่อนเปิดจริง)

```
09:00 - Infrastructure Test
  □ เปิด URL บน 5 device ต่างกัน (iPhone, Android, Desktop)
  □ Scan QR ทุกโต๊ะ
  □ Login ด้วยเบอร์จริง (OTP)

10:00 - Full Flow Test (simulate real customer)
  □ Test 1: Register → Activate → Redeem → Order
  □ Test 2: Guest Order → Pay → Status track
  □ Test 3: Booking → Staff confirm → Check-in
  □ Test 4: Staff Screen full workflow

13:00 - Edge Case Test
  □ Test: Double redeem (ควร block)
  □ Test: Internet ปิดกลางคัน
  □ Test: Tablet กลางน้ำ switch to mobile
  □ Test: Order form แล้ว back button
  □ Test: ลบ item จาก cart (customized + regular)

15:00 - Performance Test
  □ ทดสอบ 10 คนพร้อมกัน (ขอให้เพื่อน staff ช่วย)
  □ วัด load time < 2 วินาที
  □ วัด order → staff screen < 3 วินาที

17:00 - Fix & Retest
  □ แก้ bugs ที่พบ
  □ Retest flows ที่แก้

19:00 - Go/No-Go Decision
  □ ถ้า P0 tests ผ่านทั้งหมด → GO
  □ ถ้า P0 tests fail → fix ก่อน → postpone 1 วัน
```

### Weekly QA (หลังเปิดร้าน)

```
ทุกวันจันทร์ เวลา 09:00
  □ ตรวจ Firebase error logs
  □ ตรวจ failed orders (orders with status stuck)
  □ ตรวจ failed redeems
  □ ตรวจ LINE notification delivery rate
  □ ตรวจ cost dashboard (Firebase console)
  □ Review customer feedback / complaints
```

---

## Training Guide (Staff Onboarding)

### วันที่ 1 — Basic Operations (2 ชม)
1. เปิดแอปและ Staff Screen
2. รับ order และ advance status
3. Approve redeem
4. ดู booking list

### วันที่ 2 — Edge Cases (1 ชม)
1. Internet ล่ม → Manual Mode
2. Tablet เสีย → มือถือสำรอง
3. ลูกค้า claim redeem ซ้ำ → ดู Staff Screen ก่อนทุกครั้ง
4. Booking conflict → โทรยืนยันลูกค้าก่อน

### Reference Card (ติดหน้า Counter)
```
┌─────────────────────────────────────────────────────┐
│  SAHAKON STAFF QUICK REFERENCE                       │
│                                                      │
│  เปิด Staff Screen: แตะ SAHAKON 3 ครั้ง → PIN       │
│  PIN วันนี้: ___________                             │
│                                                      │
│  Order มาใหม่: เสียง BEEP → รับออเดอร์ → ทำ → เสิร์ฟ │
│                                                      │
│  Redeem: ลูกค้าแสดง QR → ดู Staff Screen → อนุมัติ  │
│                                                      │
│  Internet ล่ม: ใช้ Order Book + เปิด Hotspot        │
│                                                      │
│  ฉุกเฉิน โทร: ___________                           │
└─────────────────────────────────────────────────────┘
```

---

## Key Metrics Monitoring (ทำทุกเช้า 5 นาที)

### Daily Check (เจ้าของ/ผู้จัดการ)
- ยอดขายเมื่อวาน vs เป้า
- Member สมัครใหม่กี่คน
- Redeem กี่ครั้ง (ยิ่งสูง ยิ่งดี = member active)
- Order ที่ stuck (status ไม่เปลี่ยน > 30 นาที)
- Firebase cost สะสมเดือนนี้

### Weekly Review (เจ้าของ 30 นาที)
- Avg order value เปลี่ยนไม่
- Booking show-up rate
- เมนูขายดีสุด 5 อันดับ
- เมนูไม่มีคนสั่งเลย (พิจารณาตัดออก)
- Member retention (คนที่มาครั้งเดียวแล้วหาย)

### Monthly Review (เจ้าของ + Agent)
- Revenue trend (เพิ่ม/ลด/ทรง)
- Member LTV estimate
- Feature ไหนใช้งานมาก/น้อย
- Bug reports / errors
- Plan next sprint
