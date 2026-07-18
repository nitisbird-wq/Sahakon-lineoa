# SAHAKON Master Development Book
## Volume 2 — Technical Blueprint
### Version 1.0

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CUSTOMER DEVICE                            │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Web App (React + Vite)                                 │    │
│  │  https://sahakon.th                                     │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │    │
│  │  │  Home    │ │  Menu    │ │  Redeem  │ │  Book    │  │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │    │
│  └────────────────────────────────────────────────────────┘    │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       FIREBASE                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │ Firebase     │  │  Firestore   │  │  Cloud Functions      │ │
│  │ Auth (OTP)   │  │  (Database)  │  │  - redeemSoda         │ │
│  │              │  │  - members   │  │  - confirmMember      │ │
│  │  Phone OTP   │  │  - orders    │  │  - advanceOrder       │ │
│  │  Session     │  │  - redeems   │  │  - sendNotification   │ │
│  │  Token       │  │  - bookings  │  │  - auditLog           │ │
│  │              │  │  - products  │  │                       │ │
│  │              │  │  - audit     │  │                       │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
└─────────────────┬───────────────────────────────────────────────┘
                  │
     ┌────────────┼──────────────┐
     ▼            ▼              ▼
┌─────────┐  ┌─────────┐  ┌────────────┐
│  LINE   │  │  STAFF  │  │   OWNER    │
│  OA     │  │  TABLET │  │ DASHBOARD  │
│         │  │ /staff  │  │  /owner    │
│Notif.   │  │         │  │            │
│Messages │  │Order Q  │  │ 10 Metrics │
│Confirm  │  │Redeem   │  │ Analytics  │
└─────────┘  │Booking  │  └────────────┘
             └─────────┘

(Ocha POS ← optional integration via export/API)
```

---

## Database Schema (Firestore)

### Collection: `members/{uid}`
```typescript
interface Member {
  // Identity
  uid: string;              // Firebase Auth UID (document ID)
  memberNo: string;         // "SHK-00041"
  nickname: string;
  phone: string;            // "+66812345678"
  birthday: string;         // "14/02" (DD/MM)
  lineUserId?: string;

  // Status
  status: 'pending_payment' | 'active' | 'expired' | 'suspended';
  joinedAt: Timestamp;
  expiresAt: Timestamp;     // joinedAt + 365 days
  activatedAt?: Timestamp;
  activatedBy?: string;     // staff uid

  // Activity
  visits: number;
  lastVisitAt?: Timestamp;
  lastRedeemDate?: string;  // "2026-07-18" (YYYY-MM-DD) — daily guard key

  // Referral
  referralCode: string;     // unique code for sharing
  referredBy?: string;      // uid of referrer

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Collection: `orders/{orderId}`
```typescript
interface Order {
  // Identity
  orderId: string;          // auto-generated
  orderNo: string;          // "A-142"
  tableId: string;          // "T01", "สวน G1"

  // Association
  memberId?: string;        // nullable for guest orders

  // Status
  status: 'open' | 'closed' | 'cancelled';
  createdAt: Timestamp;
  closedAt?: Timestamp;
  staffId?: string;

  // Financials
  total: number;
  paidAmount?: number;
  paymentMethod?: 'promptpay' | 'cash' | 'card';
  paidAt?: Timestamp;
}

// Sub-collection: orders/{orderId}/rounds/{roundId}
interface Round {
  rNo: number;
  items: OrderItem[];
  status: 'waiting' | 'waiting_pos' | 'waiting_payment' | 'paid' |
          'preparing' | 'ready' | 'served' | 'completed';
  subtotal: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy?: string;       // staff uid
}

interface OrderItem {
  productId: string;
  name: string;
  emoji: string;
  basePrice: number;
  totalPrice: number;       // base + addons
  qty: number;
  free: boolean;
  options?: {
    spicy?: string;
    addons?: { name: string; price: number }[];
  };
  note?: string;
}
```

### Collection: `redeems/{redeemId}`
```typescript
interface Redeem {
  redeemId: string;
  memberId: string;
  memberNo: string;
  memberName: string;

  // Benefit
  benefitType: 'italian_soda';
  flavor?: string;          // set after member confirms

  // Context
  orderId?: string;         // qualifying order
  tableId?: string;

  // Status
  status: 'pending_staff' | 'approved' | 'rejected' | 'expired';
  requestedAt: Timestamp;
  approvedAt?: Timestamp;
  approvedBy?: string;      // staff uid
  rejectedReason?: string;

  // Daily guard
  date: string;             // "2026-07-18" — indexed for daily check
}
```

### Collection: `bookings/{bookingId}`
```typescript
interface Booking {
  bookingId: string;
  code: string;             // "BK-0718-421"

  // What
  zone: string;             // "โซนทำงาน ชั้น 2"
  date: string;             // "2026-07-20"
  time: string;             // "14:00"
  duration: string;         // "2 ชั่วโมง"
  ppl: string;              // "3"

  // Who
  guestName: string;
  guestPhone: string;
  memberId?: string;

  // Status lifecycle
  status: 'pending' | 'confirmed' | 'cancelled' | 'no_show' | 'checked_in';
  createdAt: Timestamp;
  confirmedAt?: Timestamp;
  confirmedBy?: string;     // staff uid
  cancelledAt?: Timestamp;
  cancelledBy?: string;
  checkedInAt?: Timestamp;

  // No-show
  noShowAt?: Timestamp;
}
```

### Collection: `products/{productId}`
```typescript
interface Product {
  productId: string;
  name: string;
  nameTh: string;
  desc: string;
  price: number;
  category: 'rice' | 'drink' | 'bakery' | 'snack' | 'set' |
            'moojum' | 'isan' | 'beer' | 'addon_mj';
  mode: 'day' | 'night' | 'all';

  // Availability
  available: boolean;       // staff can toggle
  stockCount?: number;      // optional: for items with limited stock

  // Display
  emoji: string;
  imageUrl?: string;
  tags?: string[];          // ['ขายดี', 'แนะนำ']
  dietaryFlags?: string[];  // ['vegan', 'spicy', 'gluten-free']

  // Customization
  customizable: boolean;
  custOpts?: {
    spicy: boolean;
    egg: boolean;
    extra: boolean;
  };

  // Metadata
  sortOrder: number;
  prepTimeMin?: number;     // estimated prep time
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Collection: `staff/{staffId}`
```typescript
interface Staff {
  staffId: string;
  name: string;
  role: 'staff' | 'manager' | 'owner';
  pinHash: string;          // bcrypt hashed PIN
  active: boolean;
  createdAt: Timestamp;
  lastLoginAt?: Timestamp;
}
```

### Collection: `audit/{auditId}`
```typescript
interface AuditLog {
  auditId: string;
  action: string;           // "REDEEM_APPROVED" | "ORDER_ADVANCED" | ...
  actorId: string;          // uid of who did it
  actorRole: string;
  targetId: string;
  targetType: string;       // "redeem" | "order" | "member" | ...
  before?: object;
  after?: object;
  timestamp: Timestamp;
  reason?: string;
  ipAddress?: string;
}
```

### Collection: `settings/{key}`
```typescript
// Feature flags
settings/featureFlags: {
  referralEnabled: boolean;
  birthdayEnabled: boolean;
  earlyBirdEnabled: boolean;
  dayPassEnabled: boolean;
  reviewPromptEnabled: boolean;
  maintenanceMode: boolean;
}

// Shop config
settings/shopConfig: {
  openTime: string;         // "10:00"
  closeTime: string;        // "22:00"
  closedDays: number[];     // [0] = Sunday
  membershipPrice: number;  // 299
  membershipDays: number;   // 365
  redeemMinPurchase: number; // 0 (or minimum qualifying amount)
  noShowMinutes: number;    // 30
}
```

### Firestore Indexes Required
```
orders: tableId + status (composite)
orders: memberId + createdAt (composite)
orders/rounds: status + updatedAt
redeems: memberId + date (composite) ← most critical
redeems: status + requestedAt
bookings: date + status (composite)
bookings: guestPhone + date
audit: targetId + timestamp
```

---

## API Contract (Cloud Functions)

### `POST /redeemSoda`
**Purpose:** Server-side daily redeem validation (prevents double-redeem)

**Request:**
```json
{
  "memberId": "uid_123",
  "orderId": "ord_456",     // qualifying order
  "tableId": "T01"
}
```

**Response (success):**
```json
{
  "success": true,
  "redeemId": "rdm_789",
  "message": "Redeem pending staff approval"
}
```

**Response (fail):**
```json
{
  "success": false,
  "code": "ALREADY_REDEEMED_TODAY",
  "message": "You have already redeemed today"
}
```

**Error Codes:**
| Code | Meaning |
|---|---|
| `ALREADY_REDEEMED_TODAY` | lastRedeemDate === today |
| `MEMBERSHIP_EXPIRED` | expiresAt < now |
| `MEMBERSHIP_NOT_ACTIVE` | status !== 'active' |
| `NO_QUALIFYING_ORDER` | orderId not found or total = 0 |
| `RATE_LIMITED` | >3 attempts in 1 minute |

---

### `POST /confirmMember`
**Purpose:** Staff activates membership after payment

**Request:** (requires staff auth token)
```json
{
  "memberId": "uid_123",
  "paymentMethod": "promptpay",
  "amount": 299,
  "staffId": "staff_001"
}
```

**Response:**
```json
{
  "success": true,
  "memberNo": "SHK-00041",
  "expiresAt": "2027-07-18T00:00:00Z"
}
```

---

### `POST /advanceOrderStatus`
**Purpose:** Staff advances order round status (with audit log)

**Request:** (requires staff auth token)
```json
{
  "orderId": "ord_456",
  "roundId": "rnd_1",
  "newStatus": "preparing",
  "staffId": "staff_001"
}
```

**Allowed transitions:**
```
waiting → preparing
waiting_pos → waiting_payment
waiting_payment → paid
paid → preparing
preparing → ready
ready → served | completed
```

---

### `POST /approveRedeem`
**Purpose:** Staff approves a pending redeem request

**Request:** (requires staff auth token)
```json
{
  "redeemId": "rdm_789",
  "staffId": "staff_001"
}
```

**Response:**
```json
{
  "success": true,
  "nextStep": "flavor_selection"
}
```

---

### `POST /sendNotification`
**Purpose:** Send LINE message to member

**Request:** (internal, called by other functions)
```json
{
  "memberId": "uid_123",
  "templateId": "ORDER_READY",
  "data": {
    "orderNo": "A-142",
    "tableId": "T01"
  }
}
```

**Templates:**
| templateId | Trigger | Message |
|---|---|---|
| `ORDER_READY` | status → ready | "อาหารของคุณพร้อมเสิร์ฟแล้ว 🍽️" |
| `BOOKING_CONFIRMED` | staff confirm booking | "การจองของคุณยืนยันแล้ว ✅" |
| `MEMBER_ACTIVATED` | membership active | "ยินดีต้อนรับ Founder Member! 🎉" |
| `REDEEM_APPROVED` | staff approve | "รับ Italian Soda ได้เลย เลือกรสที่ชอบ 🥤" |
| `MILESTONE_NEAR` | visits = milestone - 1 | "อีก 1 ครั้งถึงรางวัล! 🏆" |
| `BIRTHDAY_REWARD` | birthday month | "สุขสันต์วันเกิด 🎂 ของขวัญรอคุณอยู่" |

---

## Security Checklist & Implementation

### Authentication
- [ ] Firebase Phone OTP — rate limit 5 attempts/phone/hour
- [ ] Staff PIN — bcrypt hash ก่อน store, ไม่ store plain text
- [ ] Admin token — ทุก Cloud Function verify Firebase Auth token ก่อน process
- [ ] Session timeout — Force re-auth หลัง 24 ชม

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Members: ดูได้เฉพาะข้อมูลตัวเอง
    match /members/{uid} {
      allow read, update: if request.auth != null && request.auth.uid == uid;
      allow create: if request.auth != null;
      allow delete: if false; // ห้าม delete
    }

    // Orders: member ดูของตัวเอง, staff/owner ดูทั้งหมด
    match /orders/{orderId} {
      allow read: if request.auth != null &&
        (resource.data.memberId == request.auth.uid ||
         get(/databases/$(database)/documents/staff/$(request.auth.uid)).data.active == true);
      allow create: if request.auth != null;
      allow update: if isStaff();
    }

    // Redeems: เขียนผ่าน Cloud Function เท่านั้น
    match /redeems/{redeemId} {
      allow read: if request.auth != null &&
        resource.data.memberId == request.auth.uid;
      allow write: if false; // Cloud Function เท่านั้น
    }

    // Bookings: member สร้างได้, staff อัปเดตได้
    match /bookings/{bookingId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null &&
        (resource.data.memberId == request.auth.uid || isStaff());
      allow update: if isStaff();
      allow delete: if false;
    }

    // Products: ทุกคนอ่านได้, staff แก้ได้
    match /products/{productId} {
      allow read: if true;
      allow write: if isStaff();
    }

    // Staff: เฉพาะ manager/owner
    match /staff/{staffId} {
      allow read, write: if isOwner();
    }

    // Audit: append-only, owner อ่านได้
    match /audit/{auditId} {
      allow read: if isOwner();
      allow create: if isStaff(); // Cloud Function creates
      allow update, delete: if false; // immutable
    }

    // Settings: owner แก้ได้
    match /settings/{key} {
      allow read: if true;
      allow write: if isOwner();
    }

    function isStaff() {
      return request.auth != null &&
        get(/databases/$(database)/documents/staff/$(request.auth.uid)).data.active == true;
    }

    function isOwner() {
      return isStaff() &&
        get(/databases/$(database)/documents/staff/$(request.auth.uid)).data.role == 'owner';
    }
  }
}
```

### Cloud Function Security
- [ ] ทุก function verify `request.auth` ก่อน process
- [ ] Rate limiting: 10 req/min per IP (Firebase App Check)
- [ ] Input validation: sanitize ทุก field ก่อน write
- [ ] Audit log: ทุก write operation บันทึกใน `/audit`
- [ ] Environment variables: secrets ใน Firebase Secret Manager (ไม่ hardcode)

### Application Security
- [ ] HTTPS only (enforce via Vercel)
- [ ] QR Redeem: unique per request, expire 90s, single-use
- [ ] Staff PIN: ไม่ส่งผ่าน URL, POST body เท่านั้น
- [ ] XSS prevention: React default escaping
- [ ] CSRF: Firebase token-based auth ป้องกันอยู่แล้ว

---

## Offline / Fallback Mode

```javascript
// Service Worker strategy: Cache menu data for offline
// ใช้ Workbox ใน Vite

// Cache strategy per resource:
// - Static assets (JS/CSS): Cache First
// - Menu data: Stale While Revalidate
// - Orders: Network First (real-time critical)
// - Images: Cache First with max-age 7 days
```

**Offline capabilities:**
| Feature | Online | Offline |
|---|---|---|
| Browse menu | ✅ Live | ✅ Cached (stale) |
| Add to cart | ✅ | ✅ Local state |
| Submit order | ✅ | ❌ Show error + manual fallback |
| Check booking | ✅ | ✅ Cached |
| Redeem QR | ✅ | ❌ Cannot verify |
| Staff Screen | ✅ | ❌ Show "ออฟไลน์" mode |

---

## Scalability Notes

| Metric | Current | Phase 1 (Firebase Free) | Phase 2 (Firebase Blaze) |
|---|---|---|---|
| Concurrent users | ~unlimited (static) | 50-100 | 500-1,000+ |
| Orders/day | demo | ~50/day free | unlimited |
| Notifications/month | 0 | 200 (LINE free) | 3,000 (1,500 THB) |
| Storage | Unsplash URLs | 5 GB free | pay-as-you-go |
| Cloud Functions | 0 | 2M calls/month free | pay-as-you-go |

**No scaling work needed until 500+ daily active users.**

---

## Deployment Pipeline

```
Developer → Git Push → GitHub
                          ↓
                    GitHub Actions
                          ↓
                   (npm install + build)
                          ↓
                    Vercel Deploy
                          ↓
              [Preview URL for PR testing]
                          ↓
                  Merge to main
                          ↓
              [Production URL live]
```

### Environment Structure
```
.env.local (dev)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=sahakon-dev
VITE_LINE_OA_URL=...

Vercel Environment Variables (production)
VITE_FIREBASE_PROJECT_ID=sahakon-prod
```

**Rule:** Never commit `.env` files. Use Vercel Dashboard for production secrets.
