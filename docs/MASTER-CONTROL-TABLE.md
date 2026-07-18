# SAHAKON — Master Control Table
## ตารางควบคุมการปฏิบัติ v1.0

> อัปเดต Status ทุกครั้งที่มีความคืบหน้า
> 🔲 = ยังไม่เริ่ม | 🔄 = กำลังทำ | ✅ = เสร็จ | ❌ = ยกเลิก | ⏸️ = รอ dependency

---

## PHASE 0 — เปิดตัว (สัปดาห์ที่ 1-2)

| ID | Feature | Priority | Owner | Dependency | Effort | Status | Definition of Done |
|---|---|---|---|---|---|---|---|
| P0-01 | เมนูจริง + ราคาจริง | **P0** | เจ้าของ → Agent | เจ้าของส่งข้อมูล | S | 🔲 | ทุกเมนูถูกต้อง 100% |
| P0-02 | รูปจริง (Hero + Zone + Food) | **P0** | เจ้าของถ่าย → Agent | เจ้าของส่งรูป | S | 🔲 | รูปโหลดเร็ว < 1 วินาที |
| P0-03 | Table QR auto-fill | **P0** | Agent + เจ้าของ print | เมนูจริง | M | 🔲 | Scan → table ตรง 100% |
| P0-04 | Deploy บน Vercel | **P0** | เจ้าของ add token → Agent | Vercel account | S | 🔲 | URL เปิดได้บนมือถือ |
| P0-05 | Custom domain + SSL | **P0** | เจ้าของ + Agent | Domain purchase | M | 🔲 | HTTPS ✅ |
| P0-06 | Staff PIN เปลี่ยนได้ | **P0** | Agent | - | S | 🔲 | PIN ไม่ hardcode |
| P0-07 | เวลาเปิด-ปิดใน Hero | **P0** | เจ้าของตัดสินใจ → Agent | OD-05 | S | 🔲 | แสดงถูกต้องทุก mode |
| P0-08 | Manual Fallback SOP | **P0** | เจ้าของ + Agent | - | M | ✅ (Volume 3) | SOP เป็นลายลักษณ์อักษร |
| P0-09 | Launch Checklist pass | **P0** | เจ้าของ | ทุก P0 อื่น | L | 🔲 | ทุกข้อ ✅ |
| P0-10 | Popular items section | **P1** | Agent | เมนูจริง | S | 🔲 | แสดง top 3-5 items |
| P0-11 | Sticky CTA ใน Booking | **P1** | Agent | - | S | 🔲 | ไม่ต้อง scroll ถึง confirm |

---

## PHASE 1 — ระยะสั้น (เดือนที่ 1-2)

| ID | Feature | Priority | Owner | Dependency | Effort | Status | Definition of Done |
|---|---|---|---|---|---|---|---|
| P1-01 | Firebase project setup | **P0** | เจ้าของ | Firebase account | S | 🔲 | Project ID พร้อม |
| P1-02 | Firebase Phone OTP auth | **P0** | Agent | P1-01 | M | ⏸️ | Login → token persist cross-device |
| P1-03 | Member persistence (Firestore) | **P0** | Agent | P1-02 | M | ⏸️ | TC-001-05 ผ่าน |
| P1-04 | Booking persist (Firestore) | **P0** | Agent | P1-01 | M | ⏸️ | TC-003-03 ผ่าน |
| P1-05 | Order real-time (Firestore) | **P0** | Agent | P1-01 | L | ⏸️ | Staff เห็น order < 3 วินาที |
| P1-06 | Cloud Fn: redeemSoda | **P0** | Agent | P1-03 | M | ⏸️ | TC-002-02, TC-002-03 ผ่าน |
| P1-07 | Cloud Fn: confirmMember | **P0** | Agent | P1-03 | M | ⏸️ | TC-001-04 ผ่าน |
| P1-08 | Staff Screen real-time | **P0** | Agent | P1-05 | L | ⏸️ | TC-004-06 ผ่าน |
| P1-09 | LINE OA setup | **P1** | เจ้าของ + Agent | LINE account | L | ⏸️ | Webhook ส่ง message ได้ |
| P1-10 | LINE: Order ready notif | **P1** | Agent | P1-09 | M | ⏸️ | ลูกค้าได้รับ LINE ทันที |
| P1-11 | LINE: Booking confirm notif | **P1** | Agent | P1-09 | S | ⏸️ | LINE ส่งเมื่อ staff confirm |
| P1-12 | Membership expiry คำนวณจริง | **P0** | Agent | P1-03 | S | ⏸️ | expiresAt = joinedAt + 365d |
| P1-13 | Google Review Prompt | **P2** | Agent | P1-05 | S | ⏸️ | แสดง 5 นาทีหลัง served |
| P1-14 | Menu search bar | **P1** | Agent | - | M | 🔲 | ค้นหา TH/EN ได้ |
| P1-15 | Estimated wait time | **P1** | Agent | - | S | 🔲 | แสดง ~X นาที ใน status |
| P1-16 | Staff: item availability toggle | **P1** | Agent | P1-08 | M | ⏸️ | "หมดแล้ว" ซ่อนจาก customer |
| P1-17 | Cart → localStorage bridge | **P1** | Agent | - | S | 🔲 | Cart ไม่หายเมื่อ lock screen |
| P1-18 | Feature flag system | **P1** | Agent | P1-01 | S | ⏸️ | Toggle feature ได้จาก Firestore |
| P1-19 | Firestore Security Rules | **P0** | Agent | P1-01 | M | ⏸️ | Security rules pass 100% |
| P1-20 | Audit log (critical actions) | **P0** | Agent | P1-01 | M | ⏸️ | ทุก write บันทึกใน /audit |

---

## PHASE 2 — ระยะกลาง (เดือนที่ 3-4)

| ID | Feature | Priority | Owner | Dependency | Effort | Status | Definition of Done |
|---|---|---|---|---|---|---|---|
| P2-01 | Zone availability real-time | **P1** | Agent | P1-04 | M | ⏸️ | ว่าง/เต็ม แสดง real-time |
| P2-02 | Cancel booking in app | **P1** | Agent | P1-04 | M | ⏸️ | TC-003-06 ผ่าน |
| P2-03 | Birthday reward | **P2** | Agent | P1-06 | M | ⏸️ | Ribbon + free item เดือนเกิด |
| P2-04 | Early Bird pricing | **P2** | เจ้าของกำหนด → Agent | P1-05 | M | ⏸️ | ส่วนลด auto ก่อน 11:00 |
| P2-05 | Day Pass (99 THB/วัน) | **P2** | เจ้าของ OD-13 → Agent | P1-02 | L | ⏸️ | ซื้อ pass ได้ใน app |
| P2-06 | Referral Program | **P2** | เจ้าของ OD-15 → Agent | P1-03 | L | ⏸️ | Referral code + tracking |
| P2-07 | Event/Workshop Booking | **P2** | เจ้าของ OD-14 → Agent | P1-04 | L | ⏸️ | จองพื้นที่พิเศษได้ |
| P2-08 | Milestone notification | **P2** | Agent | P1-09 + P1-06 | M | ⏸️ | LINE เมื่อ visits = milestone-1 |
| P2-09 | Transaction history | **P3** | Agent | P1-05 | M | ⏸️ | ดู order/redeem/booking ย้อนหลัง |
| P2-10 | Digital receipt | **P3** | Agent | P1-05 | M | ⏸️ | Copy/share text receipt |
| P2-11 | Add to Calendar | **P3** | Agent | P1-04 | S | ⏸️ | .ics download + deep link |
| P2-12 | Staff: Daily checklist | **P3** | Agent | P1-08 | M | ⏸️ | Opening/closing checklist |
| P2-13 | Staff: Alert panel | **P3** | Agent | P1-05 | M | ⏸️ | Alert > 15 min order |
| P2-14 | Staff: Redeem daily report | **P3** | Agent | P1-06 | S | ⏸️ | Summary กี่คน กี่แก้ว |
| P2-15 | Owner Dashboard MVP | **P3** | Agent | P1-05 | L | ⏸️ | 10 metrics แสดงถูกต้อง |
| P2-16 | Dynamic PromptPay QR | **P1** | ธนาคาร + Agent | Bank API | XL | ⏸️ | QR expire + unique per txn |
| P2-17 | Ocha POS integration | **P2** | Ocha + Agent | Ocha API | XL | ⏸️ | Order ส่งเข้า Ocha auto |
| P2-18 | Complaint/Incident Log | **P3** | Agent | P1-01 | M | ⏸️ | ลูกค้ารายงานได้ → owner เห็น |

---

## PHASE 3 — ระยะยาว (เดือนที่ 5-12)

| ID | Feature | Priority | Owner | Dependency | Effort | Status | Definition of Done |
|---|---|---|---|---|---|---|---|
| P3-01 | Split Bill | **P3** | Agent | P1-05 | L | ⏸️ | แบ่งบิลต่อคนได้ |
| P3-02 | Dietary Filter | **P3** | Agent | P2 menu data | M | ⏸️ | Filter Vegan/Spicy/GF |
| P3-03 | WiFi Captive Portal | **P4** | IT vendor + Agent | Router hardware | XL | ⏸️ | Login → WiFi access |
| P3-04 | n8n Automation | **P4** | Agent | 3+ months data | XL | ⏸️ | ≥5 workflows automated |
| P3-05 | Staff Performance Dashboard | **P3** | Agent | 1+ month data | L | ⏸️ | avg time per order per staff |
| P3-06 | Advanced Analytics | **P3** | Agent | 1+ month data | L | ⏸️ | Peak hours, Best seller |
| P3-07 | Customer LTV | **P4** | Agent | 3+ months data | L | ⏸️ | CLV per member segment |
| P3-08 | Multi-year Membership | **P4** | เจ้าของกำหนด → Agent | P1-03 | M | ⏸️ | 2 ปี ราคา special |
| P3-09 | GROUP deals | **P3** | เจ้าของ → Agent | P1-05 | M | ⏸️ | Bundle pricing เมื่อ 4+ คน |
| P3-10 | Tax Invoice | **P4** | Agent | B2B segment data | M | ⏸️ | กรอก tax ID → receipt |
| P3-11 | AI Recommendation | **P4** | Agent | 6-12 mo. data | XL | ⏸️ | CTR recommendation > 15% |
| P3-12 | LINE Login | **P3** | Agent | P1-09 | M | ⏸️ | สมัครด้วย LINE ได้ |
| P3-13 | Knowledge Base | **P4** | เจ้าของ + Agent | - | L | ⏸️ | ทุก decision บันทึก |

---

## Progress Tracker (อัปเดตทุกสัปดาห์)

| Phase | Total | Done | In Progress | Blocked | % |
|---|---|---|---|---|---|
| Phase 0 | 11 | 1 | 0 | 0 | 9% |
| Phase 1 | 20 | 5 | 0 | 15 | 25% |
| Phase 2 | 18 | 0 | 0 | 18 | 0% |
| Phase 3 | 13 | 0 | 0 | 13 | 0% |
| **รวม** | **62** | **6** | **0** | **46** | **10%** |

*(อัปเดตล่าสุด: Jul 2026)*

---

## Effort Scale Reference

| Scale | ความหมาย | ตัวอย่าง |
|---|---|---|
| **XS** | < 30 นาที | เปลี่ยน copy, แก้ไข config |
| **S** | 1-4 ชม | UI component ใหม่, simple state |
| **M** | 4-16 ชม | Firebase integration, Cloud Function |
| **L** | 2-5 วัน | Feature ใหม่ที่ซับซ้อน, full flow |
| **XL** | 1-3 สัปดาห์ | 3rd party integration, major system |

---

## Owner Actions Queue (สิ่งที่รอเจ้าของดำเนินการ)

| # | Action Required | ใช้เมื่อ | Status |
|---|---|---|---|
| OA-01 | ส่งเมนูจริงและราคา | Phase 0 | 🔲 |
| OA-02 | ส่งรูปถ่ายร้าน (Hero + Zone) | Phase 0 | 🔲 |
| OA-03 | ตัดสินใจ Domain name | Phase 0 | 🔲 |
| OA-04 | กำหนด Staff PIN | Phase 0 | 🔲 |
| OA-05 | ยืนยันเวลาเปิด-ปิดร้าน | Phase 0 | 🔲 |
| OA-06 | แจ้งจำนวนและชื่อโต๊ะทั้งหมด | Phase 0 | 🔲 |
| OA-07 | กำหนด No-show policy (กี่นาที) | Phase 0 | 🔲 |
| OA-08 | สร้าง Firebase account + project | Phase 1 | 🔲 |
| OA-09 | Add VERCEL_TOKEN ใน Cursor Secrets | Phase 0 | 🔲 |
| OA-10 | สมัคร LINE OA Business account | Phase 1 | 🔲 |
| OA-11 | ซื้อ Domain | Phase 0 | 🔲 |
| OA-12 | ซื้อ Tablet สำหรับ Staff Screen | Phase 0 | 🔲 |
| OA-13 | ตัดสินใจ Day Pass ราคาและสิทธิ์ | Phase 2 | 🔲 |
| OA-14 | ตัดสินใจ Event space ราคา | Phase 2 | 🔲 |
| OA-15 | ตัดสินใจ Referral reward | Phase 2 | 🔲 |
