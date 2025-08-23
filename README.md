# আইনজীবী ক্লায়েন্ট ব্যবস্থাপনা সিস্টেম | Lawyer Client Management System

বাংলাদেশী আইনজীবীদের জন্য সম্পূর্ণ বাংলা ভাষায় তৈরি একটি আধুনিক ক্লায়েন্ট ও মামলা ব্যবস্থাপনা সফটওয়্যার।

## ✨ প্রধান বৈশিষ্ট্যসমূহ | Key Features

### 🏢 ক্লায়েন্ট ব্যবস্থাপনা (Client Management)
- ক্লায়েন্টের সম্পূর্ণ তথ্য সংরক্ষণ (বাংলা ও ইংরেজি নাম)
- জাতীয় পরিচয়পত্র নম্বর ভ্যালিডেশন
- ঠিকানা সংরক্ষণ (জেলা, উপজেলা সহ)
- যোগাযোগের ইতিহাস ট্র্যাকিং
- ক্লায়েন্ট অনুসন্ধান (ফাজি সার্চ সাপোর্ট)

### ⚖️ মামলা ব্যবস্থাপনা (Case Management)
- মামলার ধরন অনুযায়ী শ্রেণীবিভাগ (দেওয়ানী, ফৌজদারি, পারিবারিক, বাণিজ্যিক)
- আদালতের তথ্য সংরক্ষণ
- ওয়াকালাতনামা ও অন্যান্য দলিল সংযুক্তি
- মামলার স্থিতি ট্র্যাকিং
- শুনানির তারিখ ও সময়সূচী

### 📅 ক্যালেন্ডার ও সময়সূচী (Calendar & Scheduling)
- শুনানির তারিখ নির্ধারণ
- ক্লায়েন্ট মিটিং সময়সূচী
- স্বয়ংক্রিয় স্মারক পাঠানো
- বাংলাদেশের সরকারি ছুটির দিন সাপোর্ট

### 📄 দলিল ব্যবস্থাপনা (Document Management)
- নিরাপদ ফাইল আপলোড ও সংরক্ষণ
- দলিলের ধরন অনুযায়ী শ্রেণীবিভাগ
- এনক্রিপশন সাপোর্ট
- ভার্সন কন্ট্রোল

## 🛠️ প্রযুক্তি স্ট্যাক | Technology Stack

### Frontend
- **Next.js 15** - React ফ্রেমওয়ার্ক
- **TypeScript** - টাইপ সেফটি
- **Tailwind CSS** - স্টাইলিং
- **Noto Sans Bengali** - বাংলা ফন্ট

### Backend
- **Next.js API Routes** - সার্ভারলেস API
- **MongoDB** - ডাটাবেস
- **JWT** - অথেন্টিকেশন
- **bcrypt** - পাসওয়ার্ড এনক্রিপশন

### বাংলা সাপোর্ট
- **বাংলা ইউআই** - সম্পূর্ণ ইন্টারফেস বাংলায়
- **তারিখ ফরম্যাট** - বাংলা তারিখ প্রদর্শন
- **কীবোর্ড সাপোর্ট** - অভ্র কীবোর্ড সাপোর্ট

## 🚀 ইনস্টলেশন ও সেটআপ | Installation & Setup

### প্রয়োজনীয় সফটওয়্যার | Prerequisites
```bash
Node.js 18.17 অথবা নতুন সংস্করণ
npm অথবা yarn
MongoDB (স্থানীয় অথবা MongoDB Atlas)
```

### ধাপে ধাপে ইনস্টলেশন | Step-by-step Installation

1. **প্রজেক্ট ক্লোন করুন | Clone the project**
```bash
git clone [repository-url]
cd LawEM
```

2. **ডিপেন্ডেন্সি ইনস্টল করুন | Install dependencies**
```bash
npm install
```

3. **এনভায়রনমেন্ট ভ্যারিয়েবল সেটআপ | Environment setup**
```bash
# .env.local ফাইল তৈরি করুন এবং নিচের তথ্য যোগ করুন:

# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lawem_cms

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here

# Encryption
ENCRYPTION_KEY=your-32-character-encryption-key

# SMS API (ঐচ্ছিক)
SMS_API_URL=https://api.provider.com/sms
SMS_API_KEY=your-sms-api-key

# Google Calendar API (ঐচ্ছিক)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. **ডেভেলপমেন্ট সার্ভার চালু করুন | Start development server**
```bash
npm run dev
```

5. **ব্রাউজারে দেখুন | View in browser**
```
http://localhost:3000
```

## 🔐 ডেমো লগইন | Demo Login

**ব্যবহারকারীর নাম:** `admin`  
**পাসওয়ার্ড:** `123456`

## 📱 ব্যবহারের নির্দেশনা | Usage Instructions

### প্রথম ব্যবহার | First Time Setup
1. ডেমো ক্রেডেনশিয়াল দিয়ে লগইন করুন
2. ড্যাশবোর্ড থেকে সিস্টেমের ওভারভিউ দেখুন
3. নতুন ক্লায়েন্ট যোগ করুন
4. মামলা তৈরি করুন ও ট্র্যাক করুন

### নিরাপত্তা বৈশিষ্ট্য | Security Features
- JWT ভিত্তিক অথেন্টিকেশন
- পাসওয়ার্ড এনক্রিপশন
- সেনসিটিভ ডেটা এনক্রিপশন
- অডিট লগিং
- রোল ভিত্তিক অ্যাক্সেস কন্ট্রোল

## 🏗️ প্রজেক্ট স্ট্রাকচার | Project Structure

```
LawEM/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Authentication APIs
│   │   │   └── dashboard/     # Dashboard APIs
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/            # React Components
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── Login.tsx         # Login form
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   ├── Header.tsx        # Header component
│   │   ├── ClientManagement.tsx  # Client management
│   │   ├── CaseManagement.tsx    # Case management
│   │   ├── Calendar.tsx      # Calendar component
│   │   └── DocumentManagement.tsx # Document management
│   ├── lib/
│   │   └── mongodb.ts        # Database connection
│   └── types/
│       └── database.ts       # TypeScript interfaces
├── public/
│   └── locales/              # Translation files
│       ├── bn/               # Bengali translations
│       └── en/               # English translations
├── .env.local                # Environment variables
├── .env.example             # Environment template
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json            # Dependencies
```

## 🔧 ডেটাবেস স্কিমা | Database Schema

### ক্লায়েন্ট কলেকশন | Clients Collection
```javascript
{
  _id: ObjectId,
  name_bn: String,        // বাংলা নাম
  name_en: String,        // ইংরেজি নাম
  nid: String,           // জাতীয় পরিচয়পত্র
  phone: String,         // ফোন নম্বর
  email: String,         // ইমেইল
  address: {
    district: String,    // জেলা
    upazila: String,     // উপজেলা
    details: String      // বিস্তারিত
  },
  status: String,        // অবস্থা
  created_at: Date,
  updated_at: Date
}
```

### মামলা কলেকশন | Cases Collection
```javascript
{
  _id: ObjectId,
  case_number: String,   // মামলা নম্বর
  court: String,         // আদালত
  type: String,          // মামলার ধরন
  status: String,        // অবস্থা
  clients: [ObjectId],   // ক্লায়েন্ট তালিকা
  filing_date: Date,     // দাখিলের তারিখ
  created_at: Date,
  updated_at: Date
}
```

## 📞 সাপোর্ট ও যোগাযোগ | Support & Contact

### বাগ রিপোর্ট | Bug Reports
গিটহাব ইস্যুতে বাগ রিপোর্ট করুন অথবা [ইমেইল] পাঠান।

### ফিচার রিকুয়েস্ট | Feature Requests
নতুন ফিচারের জন্য গিটহাব ডিসকাশনে অংশগ্রহণ করুন।

### অবদান | Contributing
1. ফর্ক করুন
2. ফিচার ব্র্যাঞ্চ তৈরি করুন (`git checkout -b feature/AmazingFeature`)
3. কমিট করুন (`git commit -m 'Add some AmazingFeature'`)
4. পুশ করুন (`git push origin feature/AmazingFeature`)
5. পুল রিকুয়েস্ট তৈরি করুন

## 📋 রোডম্যাপ | Roadmap

### Phase 1 (সম্পন্ন | Completed) ✅
- [x] প্রাথমিক সেটআপ ও বাংলা UI
- [x] অথেন্টিকেশন সিস্টেম
- [x] ক্লায়েন্ট ম্যানেজমেন্ট
- [x] ড্যাশবোর্ড

### Phase 2 (পরবর্তী | Next) 🚧
- [ ] সম্পূর্ণ মামলা ম্যানেজমেন্ট
- [ ] ক্যালেন্ডার ইন্টিগ্রেশন
- [ ] এসএমএস নোটিফিকেশন
- [ ] ডকুমেন্ট ম্যানেজমেন্ট

### Phase 3 (ভবিষ্যৎ | Future) 🔮
- [ ] মোবাইল অ্যাপ
- [ ] রিপোর্টিং সিস্টেম
- [ ] পেমেন্ট ট্র্যাকিং
- [ ] গুগল ক্যালেন্ডার সিঙ্ক

## 📄 লাইসেন্স | License

এই প্রজেক্টটি MIT লাইসেন্সের অধীনে লাইসেন্সপ্রাপ্ত। বিস্তারিত জানতে [LICENSE](LICENSE) ফাইল দেখুন।

## 🏆 স্বীকৃতি | Acknowledgments

- **বাংলাদেশ বার কাউন্সিল** - আইনি নির্দেশনার জন্য
- **গুগল ফন্টস** - Noto Sans Bengali ফন্টের জন্য
- **Next.js টিম** - চমৎকার ফ্রেমওয়ার্কের জন্য
- **Tailwind CSS** - সুন্দর UI কম্পোনেন্টের জন্য

---

### 📱 ডেমো দেখুন | View Demo
[http://localhost:3000](http://localhost:3000)

**ডেমো অ্যাকাউন্ট:**
- ব্যবহারকারী: admin
- পাসওয়ার্ড: 123456

---

*তৈরি করেছেন ❤️ দিয়ে বাংলাদেশী আইনজীবীদের জন্য | Made with ❤️ for Bangladeshi Lawyers*
