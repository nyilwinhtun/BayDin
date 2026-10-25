import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Compass, 
  Hand, 
  Star, 
  BookOpen, 
  Search, 
  X, 
  CheckCircle, 
  Share2, 
  AlertTriangle, 
  ArrowLeft,
  Phone,
  Heart,
  Eye,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Users,
  Activity,
  Bell,
  Zap,
  Check
} from 'lucide-react';

// ==========================================
// 1. DATA: 10 MODULES REGISTRY FOR DASHBOARD
// ==========================================
const ASTROLOGY_MODULES = [
  {
    id: 'yadaya',
    title: 'နေ့စဉ် ယတြာနှင့် အခါပေး',
    enTitle: 'Daily Yadaya & Guide',
    emoji: '🧭',
    desc: 'ရက်ရာဇာ/ပြဿဒါး အခြေအနေ၊ ကံစမ်းဂဏန်း၊ မျက်နှာမူအရပ်နှင့် နေ့စဉ် ယတြာ Checklist။',
    color: 'from-amber-500/20 to-amber-700/10',
    borderColor: 'border-amber-500/30',
    badge: 'နေ့စဉ်သုံး'
  },
  {
    id: 'palmistry',
    title: 'လက်ခဏာဗေဒင် စစ်တမ်း',
    enTitle: 'Palmistry Reading',
    emoji: '✋',
    desc: 'လက်ဖဝါး SVG ပုံကြမ်းများဖြင့် နှလုံး၊ ဉာဏ်၊ အသက်နှင့် ကံလမ်းကြောင်း အဆင့်ဆင့် စစ်ဆေးချက်။',
    color: 'from-emerald-500/20 to-teal-700/10',
    borderColor: 'border-emerald-500/30',
    badge: 'Interactive'
  },
  {
    id: 'body_omens',
    title: 'မျက်စိလှုပ်/ခန္ဓာကိုယ်နိမိတ်',
    enTitle: 'Body Omens & Twitching',
    emoji: '⚡',
    desc: 'မျက်စိ ဘယ်/ညာ၊ နှုတ်ခမ်း၊ လက်ဖဝါးယားခြင်း၊ နားအူခြင်းနှင့် အိမ်မြှောင်စုတ်ထိုး နိမိတ်များ။',
    color: 'from-cyan-500/20 to-blue-700/10',
    borderColor: 'border-cyan-500/30',
    badge: 'အသစ်'
  },
  {
    id: 'day_compatibility',
    title: 'ရိုးရာ မိတ်ဖက်/ရန်ဖက် နေ့နံစစ်တမ်း',
    enTitle: 'Day Compatibility & Pairs',
    emoji: '🤝',
    desc: 'အုန်းသီးရွှေခဲ မိတ်ဖက်နှင့် ဓမ္မာသောက ရန်ဖက်ကျမ်းလာ အိမ်ထောင်ရေး၊ စီးပွားဖက်စပ်မှု စစ်ဆေးစနစ်။',
    color: 'from-violet-500/20 to-purple-700/10',
    borderColor: 'border-violet-500/30',
    badge: 'အသစ်'
  },
  {
    id: 'dreams',
    title: 'အိပ်မက်နိမိတ် အဘိဓာန်',
    enTitle: 'Dream Dictionary',
    emoji: '📖',
    desc: 'မက်ခဲ့သော အိပ်မက်ကို မြန်မာလို အလွယ်တကူ ရှာဖွေပြီး နိမိတ်နှင့် ကံစမ်းထီဂဏန်း ကြည့်ရှုခြင်း။',
    color: 'from-purple-500/20 to-indigo-700/10',
    borderColor: 'border-purple-500/30',
    badge: 'ကံစမ်းဂဏန်း'
  },
  {
    id: 'mahabote',
    title: 'မဟာဘုတ်နှင့် ဖွားဇာတာ',
    enTitle: 'Mahabote Calculator',
    emoji: '☸️',
    desc: 'အေဒီနှစ်မှ မြန်မာနှစ်ပြောင်းပြီး ဘင်္ဂ၊ မရဏ၊ အထွန်း၊ သိုက်၊ ရာဇ၊ ပုတိ၊ အဓိပတိ တွက်ချက်ခြင်း။',
    color: 'from-blue-500/20 to-cyan-700/10',
    borderColor: 'border-blue-500/30',
    badge: 'မြန်မာ့ရိုးရာ'
  },
  {
    id: 'tarot',
    title: 'တစ်နေ့တာ တာရော့ကတ်',
    enTitle: 'Daily Tarot Pick',
    emoji: '🃏',
    desc: 'ရွှေရောင် လျှို့ဝှက်ကတ် ၃ ပြားမှ ၁ ပြား လှန်လှော၍ ယနေ့အတွက် အချစ်၊ စီးပွား လမ်းညွှန်ချက် ဖတ်ရှုခြင်း။',
    color: 'from-yellow-500/20 to-amber-800/10',
    borderColor: 'border-yellow-500/30',
    badge: 'Mystic'
  },
  {
    id: 'mole',
    title: 'မှည့်ဗေဒင် လက္ခဏာကျမ်း',
    enTitle: 'Mole Astrology',
    emoji: '✨',
    desc: 'မျက်နှာနှင့် ခန္ဓာကိုယ် အစိတ်အပိုင်းများရှိ မှည့်များ၏ စီးပွား၊ အိမ်ထောင်ရေးနှင့် စရိုက်ဟောကိန်း။',
    color: 'from-rose-500/20 to-pink-700/10',
    borderColor: 'border-rose-500/30',
    badge: 'အဟောကျမ်း'
  },
  {
    id: 'phone',
    title: 'ဖုန်းနံပါတ် ဓာတ်ဟောစနစ်',
    enTitle: 'Phone Numerology',
    emoji: '📱',
    desc: 'ဖုန်းနံပါတ် ဂဏန်းပေါင်းခြင်းဖြင့် စီးပွားလာဘ်ရွှင်မှု၊ ဆက်ဆံရေးနှင့် ဓာတ်အကျိုးပေး တွက်စက်။',
    color: 'from-teal-500/20 to-emerald-700/10',
    borderColor: 'border-teal-500/30',
    badge: 'ဂဏန်းဗေဒင်'
  },
  {
    id: 'zodiac',
    title: '၁၂ ရာသီခွင် အချစ်ရေး လိုက်ဖက်မှု',
    enTitle: 'Zodiac Love Match',
    emoji: '💞',
    desc: 'မိမိနှင့် ချစ်သူ့ရာသီခွင် ၂ ခုကို တွဲဖက်စစ်ဆေးပြီး လိုက်ဖက်မှု ရာခိုင်နှုန်းနှင့် အချစ်ရေး အကြံပြုချက်။',
    color: 'from-pink-500/20 to-rose-700/10',
    borderColor: 'border-pink-500/30',
    badge: 'အချစ်ရေး'
  }
];

// ==========================================
// 2. DATA: BODY TWITCHING & OMENS (အသစ်)
// ==========================================
const BODY_OMENS_DATA = [
  {
    id: 'eye_right_upper',
    part: 'ညာဘက် မျက်ခုံး/မျက်ခွံအပေါ် လှုပ်ခြင်း',
    type: 'eye',
    nature: 'warning',
    status: 'သတိထားရန် နိမိတ်',
    meaning: 'မကြာမီ မလိုလားအပ်သော စကားများခြင်း၊ စိတ်အနှောင့်အယှက်ဖြစ်ရခြင်း သို့မဟုတ် ဒေါသဖြစ်ဖွယ်ကိစ္စ ကြုံရတတ်သည်။',
    timingDesc: 'နံနက်ခင်းတွင် လှုပ်ပါက ဧည့်သည်အနှောင့်အယှက် ကြုံရတတ်ပြီး၊ ညနေပိုင်းတွင် လှုပ်ပါက အလုပ်ခွင် ပြဿနာ သတိထားပါ။',
    remedy: 'မျက်နှာကို ရေအေးအေးဖြင့် သစ်ပါ၊ "သဗ္ဗီတိယော ဝိဝဇ္ဇန္တု" ပရိတ်တော် ရွတ်ဖတ်ပြီး စိတ်ကို အေးဆေးစွာ ထိန်းပါ။'
  },
  {
    id: 'eye_right_lower',
    part: 'ညာဘက် မျက်ခွံအောက် လှုပ်ခြင်း',
    type: 'eye',
    nature: 'warning',
    status: 'မျက်ရည်ကျတတ်သော နိမိတ်',
    meaning: 'စိတ်သောကရောက်ရခြင်း သို့မဟုတ် စိတ်မကောင်းဖွယ်ရာ သတင်းတစ်ခုခုကို ကြားသိရတတ်သည်။',
    timingDesc: 'နေ့လယ်အချိန်တွင် လှုပ်ပါက ငွေကြေးဆုံးရှုံးမှု သတိပြုပါ။',
    remedy: 'ငှက်စာကျွေးခြင်း ဒါနပြုပါ၊ မိဘဆရာသမားများအား စိတ်ထဲမှ ကန်တော့ပါ။'
  },
  {
    id: 'eye_left_upper',
    part: 'ဘယ်ဘက် မျက်ခုံး/မျက်ခွံအပေါ် လှုပ်ခြင်း',
    type: 'eye',
    nature: 'auspicious',
    status: 'မင်္ဂလာ ကောင်းသောနိမိတ်',
    meaning: 'မကြာမီ လာဘ်လာဘ ရွှင်လန်းမည်၊ မျက်နှာပွင့်လန်းပြီး မိတ်ဆွေကောင်းများထံမှ အကူအညီကောင်း ရရှိမည်။',
    timingDesc: 'နံနက်ပိုင်းတွင် လှုပ်ပါက မမျှော်လင့်ဘဲ ငွေဝင်မည်၊ ညနေပိုင်းတွင် လှုပ်ပါက မိတ်ဆွေနှင့် ပျော်ရွှင်စွာ ဆုံဆည်းရမည်။',
    remedy: 'ဘုရားစင်တွင် သောက်တော်ရေစင် လှူဒါန်းပြီး မေတ္တာပို့ပါ။'
  },
  {
    id: 'eye_left_lower',
    part: 'ဘယ်ဘက် မျက်ခွံအောက် လှုပ်ခြင်း',
    type: 'eye',
    nature: 'auspicious',
    status: 'ပျော်ရွှင်ရမည့် နိမိတ်',
    meaning: 'ဝမ်းမြောက်စရာ ကောင်းသော သတင်းစကားများ ရောက်ရှိလာမည်၊ ကြံစည်ထားသော အလုပ်များ အောင်မြင်မည်။',
    timingDesc: 'တစ်နေ့လုံး ကံကောင်းခြင်း စွမ်းအင်များ ရရှိစေပါသည်။',
    remedy: 'အလှူဒါန သေးငယ်သည်ဖြစ်စေ ပြုလုပ်ပေးပါ။'
  },
  {
    id: 'lip_upper',
    part: 'အပေါ်နှုတ်ခမ်း လှုပ်ခြင်း',
    type: 'lip',
    nature: 'auspicious',
    status: 'စားကောင်းသောက်ဖွယ် နိမိတ်',
    meaning: 'အရသာရှိသော စားသောက်ဖွယ်ရာများ ဧည့်ခံကျွေးမွေးခံရမည်၊ မိတ်ဆွေများနှင့် ပျော်ရွှင်စွာ စားသောက်ပွဲ တက်ရောက်ရမည်။',
    timingDesc: 'မကြာမီ နာရီပိုင်းအတွင်း ကောင်းမွန်သော ဖိတ်ကြားချက် ရရှိမည်။',
    remedy: 'ဆာလောင်နေသော သူများအား မုန့် သို့မဟုတ် အစားအစာ ဝေမျှလှူဒါန်းပါ။'
  },
  {
    id: 'lip_lower',
    part: 'အောက်နှုတ်ခမ်း လှုပ်ခြင်း',
    type: 'lip',
    nature: 'warning',
    status: 'စကားဆင်ခြင်ရန် နိမိတ်',
    meaning: 'အငြင်းပွားဖွယ်ရာ သို့မဟုတ် စကားမှားပြီး နာမည်ပျက်တတ်သည်၊ မဟုတ်မမှန် သတင်းများ လာရောက်ပြောဆိုခံရတတ်သည်။',
    timingDesc: 'အထူးသဖြင့် မွန်းလွဲပိုင်းတွင် စကားပြောဆိုရာ၌ သတိကြီးစွာထားပါ။',
    remedy: 'နှုတ်ဆိတ်ခြင်းကို ကျင့်သုံးပါ၊ ဘုရားတွင် ရေစင်လှူဒါန်းပါ။'
  },
  {
    id: 'palm_right_itch',
    part: 'ညာဘက် လက်ဖဝါး ယားယံခြင်း',
    type: 'palm',
    nature: 'auspicious',
    status: 'ငွေဝင်မည့် လာဘ်နိမိတ်',
    meaning: 'ရှေးရိုးရာအရ အလွန်ထင်ရှားသော လာဘ်နိမိတ်ဖြစ်သည်။ မကြာမီ လက်တွင်းသို့ မမျှော်လင့်ဘဲ ငွေကြေးဥစ္စာ စီးဝင်လာမည်။',
    timingDesc: 'ထီထိုးရန် သို့မဟုတ် အရောင်းအဝယ်ကိစ္စများ စတင်ရန် အလွန်သင့်လျော်သည်။',
    remedy: 'ရရှိလာသော ငွေကြေးထဲမှ အနည်းငယ်ကို ဘုရားနှင့် မိဘအား ကန်တော့လှူဒါန်းပါ။'
  },
  {
    id: 'palm_left_itch',
    part: 'ဘယ်ဘက် လက်ဖဝါး ယားယံခြင်း',
    type: 'palm',
    nature: 'warning',
    status: 'ငွေထွက်တတ်သော နိမိတ်',
    meaning: 'မလိုလားအပ်သော ကိစ္စများတွင် ငွေကြေး အကုန်အကျများခြင်း သို့မဟုတ် ငွေထုတ်ပေးရမည့် ကိစ္စများ ပေါ်ပေါက်တတ်သည်။',
    timingDesc: 'စျေးဝယ်ထွက်ခြင်းနှင့် ရင်းနှီးမြှုပ်နှံမှု အသစ်များကို ခေတ္တဆိုင်းငံ့ပါ။',
    remedy: 'ငွေထွက်သက်သာစေရန် မိမိဆန္ဒအလျောက် ကုသိုလ်ဒါန အရင်ပြုလုပ်လိုက်ပါ။'
  },
  {
    id: 'ear_ringing_morning',
    part: 'နားအူခြင်း (နံနက်ခင်းအချိန်)',
    type: 'ear',
    nature: 'auspicious',
    status: 'သတင်းကောင်း နိမိတ်',
    meaning: 'အဝေးရောက် မိတ်ဆွေ သို့မဟုတ် ဆွေမျိုးများက မိမိအား ကောင်းသော အကြောင်းအရာများဖြင့် သတိရတသနေခြင်း ဖြစ်သည်။',
    timingDesc: 'နံနက် ၆ နာရီမှ ၁၁ နာရီအတွင်း ဖြစ်ပေါ်ပါက အကျိုးပေးသည်။',
    remedy: 'ထိုမိတ်ဆွေများ အေးချမ်းပါစေကြောင်း မေတ္တာပို့သပါ။'
  },
  {
    id: 'ear_ringing_night',
    part: 'နားအူခြင်း (ညဘက်အချိန်)',
    type: 'ear',
    nature: 'warning',
    status: 'အတင်းပြောခံရတတ်သော နိမိတ်',
    meaning: 'ကွယ်ရာတွင် မိမိအကြောင်း မဟုတ်မမှန် ကောလာဟလ သို့မဟုတ် အတင်းအဖျင်း ပြောဆိုခံနေရတတ်သည်။',
    timingDesc: 'ည ၇ နာရီနောက်ပိုင်းတွင် နားအူပါက အထူးသတိထားပါ။',
    remedy: 'ညအိပ်ရာဝင် ပရိတ်တော်ရွတ်ဖတ်ပြီး မေတ္တာပို့ အိပ်စက်ပါ။'
  },
  {
    id: 'lizard_chirp_east',
    part: 'အိမ်မြှောင် စုတ်ထိုးခြင်း (အရှေ့အရပ်)',
    type: 'lizard',
    nature: 'auspicious',
    status: 'မင်္ဂလာ နိမိတ်',
    meaning: 'လုပ်ငန်းသစ်များ စတင်ရန် သင့်လျော်သည်၊ မကြာမီ မင်္ဂလာသတင်းကောင်း ကြားသိရမည်။',
    timingDesc: 'အိမ်အရှေ့ဘက်မှ ၃ ချက်ထက်မနည်း စုတ်ထိုးပါက ပိုမိုထင်ရှားသည်။',
    remedy: 'ဘုရားရှင်အား ဆီမီးနှင့် ရေတော်တင်လှူပါ။'
  },
  {
    id: 'lizard_chirp_south',
    part: 'အိမ်မြှောင် စုတ်ထိုးခြင်း (တောင်အရပ်)',
    type: 'lizard',
    nature: 'auspicious',
    status: 'လာဘ်ရွှင်မည့် နိမိတ်',
    meaning: 'ခရီးဝေးမှ လာဘ်လာဘ ရောက်ရှိလာမည်၊ ကုန်ရောင်းဝယ်မှုများ အမြတ်အစွန်း များပြားမည်။',
    timingDesc: 'မွန်းလွဲပိုင်းတွင် ကြားရပါက အရောင်းအဝယ် အထူးစွံမည်။',
    remedy: 'ငါးစာကျွေးခြင်း သို့မဟုတ် ရေအလှူ ပြုလုပ်ပါ။'
  }
];

// ==========================================
// 3. DATA: TRADITIONAL BURMESE DAY PAIRS (အသစ်)
// ==========================================
const BURMESE_DAYS = [
  { id: 1, name: 'တနင်္ဂနွေ', en: 'Sunday', planet: 'တနင်္ဂနွေ (နေ)', element: 'မီး', num: 1, symbol: 'ဂဠုန်' },
  { id: 2, name: 'တနင်္လာ', en: 'Monday', planet: 'တနင်္လာ (လ)', element: 'မြေ', num: 2, symbol: 'ကျား' },
  { id: 3, name: 'အင်္ဂါ', en: 'Tuesday', planet: 'အင်္ဂါ', element: 'မီး', num: 3, symbol: 'ခြင်္သေ့' },
  { id: 4, name: 'ဗုဒ္ဓဟူး', en: 'Wednesday (Morning)', planet: 'ဗုဒ္ဓဟူး', element: 'ရေ', num: 4, symbol: 'ဆင်စွယ်စုံ' },
  { id: 8, name: 'ရာဟု', en: 'Wednesday (Evening)', planet: 'ရာဟု', element: 'လေ', num: 8, symbol: 'ဆင်ဟိုင်း' },
  { id: 5, name: 'ကြာသပတေး', en: 'Thursday', planet: 'ကြာသပတေး', element: 'မြေ', num: 5, symbol: 'ကြွက်' },
  { id: 6, name: 'သောကြာ', en: 'Friday', planet: 'သောကြာ', element: 'လေ', num: 6, symbol: 'ပူး' },
  { id: 7, name: 'စနေ', en: 'Saturday', planet: 'စနေ', element: 'မီး', num: 7, symbol: 'နဂါး' },
];

// Traditional Rhyme Matching Engine:
// မိတ်ဖက်: အုန်းသီး (၁+၄), ရွှေခဲ (၂+၅), ဇေယျာ (၃+၆), ရတနာ (၇+၈)
// ရန်ဖက်: ဓမ္မာ (၁+၆), သောက (၂+၃), အင်းဝ (၄+၇), ရာဇာ (၅+၈)
function evaluateTraditionalPair(day1, day2) {
  const d1 = day1.id;
  const d2 = day2.id;
  const pairKey = [d1, d2].sort().join('-');

  // 1. မိတ်ဖက် (True Astrological Allies)
  const trueFriends = {
    '1-4': 'အုန်းသီး မိတ်ဖက် (တနင်္ဂနွေ + ဗုဒ္ဓဟူး)',
    '2-5': 'ရွှေခဲ မိတ်ဖက် (တနင်္လာ + ကြာသပတေး)',
    '3-6': 'ဇေယျာ မိတ်ဖက် (အင်္ဂါ + သောကြာ)',
    '7-8': 'ရတနာ မိတ်ဖက် (စနေ + ရာဟု)',
  };

  // 2. ရန်ဖက် (Traditional Clash Pairs)
  const enemyPairs = {
    '1-6': 'ဓမ္မာ ရန်ဖက် (တနင်္ဂနွေ + သောကြာ)',
    '2-3': 'သောက ရန်ဖက် (တနင်္လာ + အင်္ဂါ)',
    '4-7': 'အင်းဝ ရန်ဖက် (ဗုဒ္ဓဟူး + စနေ)',
    '5-8': 'ရာဇာ ရန်ဖက် (ကြာသပတေး + ရာဟု)',
  };

  // 3. Same Day
  if (d1 === d2) {
    return {
      type: 'same',
      badge: 'နေ့တူ ဓာတ်တူ',
      score: 82,
      rhyme: 'စိတ်နေသဘောထား တူညီသော တွဲဖက်မှု',
      marriageAnalysis: 'တစ်ဦး၏ အားသာချက်/အားနည်းချက်ကို တစ်ဦးက ကောင်းစွာ သိမြင်နားလည်သည်။ မာနချင်း မပြိုင်ဘဲ ညှိနှိုင်းပါက အလွန်သာယာသော အိမ်ထောင်ရေး ဖြစ်မည်။',
      businessAnalysis: 'ရည်မှန်းချက်တူညီသဖြင့် အလုပ်တွင်ကျယ်သည်။ သို့သော် ဆုံးဖြတ်ချက်ချရာတွင် တစ်ဖက်သတ်မဖြစ်အောင် ပြင်ပအမြင်ကိုလည်း ထည့်သွင်းစဉ်းစားသင့်သည်။',
      advice: 'အိမ်တွင် သပြေပန်း အမြဲမပြတ် လှူဒါန်းပြီး အချင်းချင်း သည်းခံခွင့်လွှတ်ခြင်းကို ရှေးရှုပါ။'
    };
  }

  // Check True Friends
  if (trueFriends[pairKey]) {
    return {
      type: 'friend',
      badge: 'အထူးမင်္ဂလာ မိတ်ဖက် (အထူးသင့်လျော်)',
      score: 96,
      rhyme: trueFriends[pairKey],
      marriageAnalysis: 'ရှေးမြန်မာ့ကျမ်းအရ "အုန်းသီးရွှေခဲ ဇေယျာရတနာ" မိတ်စစ်မိတ်မှန် ဖြစ်သည်။ ရာသက်ပန် အပြန်အလှန် ကျေးဇူးပြုမည့် အလွန်ကံထူးသော အိမ်ထောင်ဖက် ဖြစ်သည်။',
      businessAnalysis: 'စီးပွားဖက်စပ်ရာတွင် တစ်ဦးအကြံကို တစ်ဦးက အားဖြည့်ပေးနိုင်ပြီး ငွေကြေးစီးဆင်းမှု လာဘ်လာဘ ဆတက်ထမ်းပိုး တိုးပွားစေမည်။',
      advice: 'မင်္ဂလာအခါတော်ပေးများတွင် အတူတကွ ကုသိုလ်ဒါနပြုပါက ဘုန်းကံ ပိုမိုကြီးမားပါမည်။'
    };
  }

  // Check Enemies
  if (enemyPairs[pairKey]) {
    return {
      type: 'enemy',
      badge: 'သတိထားရမည့် ရန်ဖက်တွဲ (ယတြာလိုအပ်)',
      score: 42,
      rhyme: enemyPairs[pairKey],
      marriageAnalysis: 'ရှေးကျမ်းအရ "ဓမ္မာသောက အင်းဝရာဇာ" ရန်ဖက်တွဲ ဖြစ်သဖြင့် သဘောထား မကြာခဏ ကွဲလွဲတတ်သည်။ အချင်းချင်း အလျှော့မပေးပါက စကားများ အထင်လွဲရတတ်သည်။',
      businessAnalysis: 'ငွေကြေးစာရင်းအင်းနှင့် စာချုပ်ကိစ္စများကို တိကျသေချာစွာ မလုပ်ပါက အငြင်းပွားဖွယ်ရာ ပေါ်ပေါက်တတ်သည်။',
      advice: 'မေတ္တာသုတ် အမြဲရွတ်ဆိုပါ၊ သက်ဆိုင်ရာ နေ့နံအလိုက် အလှူဒါနများ ပြုလုပ်၍ ယတြာချေပေးပါ။'
    };
  }

  // Normal Neutral / Compatible Pairs
  return {
    type: 'neutral',
    badge: 'အလယ်အလတ် သင့်တင့်သောတွဲဖက်',
    score: 75,
    rhyme: `${day1.name} နှင့် ${day2.name} ပေါင်းစပ်မှု`,
    marriageAnalysis: 'ဆိုးဝါးသော ရန်ဖက်မရှိသလို အထူးမိတ်လည်း မဟုတ်သဖြင့် ကိုယ်ပိုင်နားလည်မှုနှင့် မေတ္တာတရားအပေါ် အခြေခံ၍ သာယာသောအိမ်ထောင် တည်ဆောက်နိုင်ပါသည်။',
    businessAnalysis: 'တာဝန်ခွဲဝေမှု ရှင်းလင်းပါက စီးပွားရေး ပုံမှန်တိုးတက် အောင်မြင်နိုင်ပါသည်။',
    advice: 'တစ်ဦး၏ အမြင်ကို တစ်ဦးက လေးစားနားထောင်ပေးခြင်းဖြင့် ကံကြမ္မာ ပိုမိုတက်လှမ်းနိုင်မည်။'
  };
}

// ==========================================
// 4. DATA: OTHER MODULES PRESERVED
// ==========================================
const DREAM_DATABASE = [
  {
    id: 'snake',
    title: 'မြွေကိုက်ခြင်း သို့မဟုတ် မြွေတွေ့ခြင်း',
    keywords: ['မြွေ', 'မြွေကိုက်', 'မြွေပွေး', 'မြွေဟောက်', 'အဆိပ်'],
    category: 'animal',
    nature: 'warning',
    badgeText: 'သတိပြုရန် နိမိတ်',
    summary: 'အချစ်ရေးနှင့် ပတ်ဝန်းကျင်တွင် စကားများခြင်း သို့မဟုတ် မနာလိုသူ ပေါ်ပေါက်တတ်သည်။',
    meaning: 'မြွေကိုက်ခံရသည်ဟု မက်ပါက မကြာမီ အချစ်ရေးတွင် ပြိုင်ဘက်ပေါ်လာခြင်း သို့မဟုတ် အိမ်ထောင်ဖက်၊ ချစ်သူနှင့် စကားများ စိတ်ကသိကအောက် ဖြစ်ရတတ်သည်။ မြွေကို သတ်နိုင်သည်ဟု မက်ပါက ရန်သူကို အနိုင်ရမည်။',
    advice: 'စကားပြောဆိုရာတွင် ချင့်ချိန်ပါ၊ အင်္ဂါနံ သို့မဟုတ် စနေနံ ပန်း ဘုရားကပ်လှူ၍ မေတ္တာသုတ် ရွတ်ဖတ်ပါ။',
    luckyNumbers: ['05', '50', '58', '85', '09'],
    lotteryTip: 'ထီထိုးလျှင် ၅ ထိပ် သို့မဟုတ် ၈ နောက်ပိတ်ကို ဦးစားပေးပါ။'
  },
  {
    id: 'baby_birth',
    title: 'ကလေးမွေးဖွားခြင်း သို့မဟုတ် ကလေးချီရခြင်း',
    keywords: ['ကလေး', 'မွေးဖွား', 'မွေးလူနာ', 'ရင်သွေး', 'ကလေးချီ'],
    category: 'wealth',
    nature: 'auspicious',
    badgeText: 'မင်္ဂလာ ကောင်းသောနိမိတ်',
    summary: 'လုပ်ငန်းသစ်များ စတင်ခွင့်ရမည်၊ သတင်းကောင်းများ ကြားရပြီး မမျှော်လင့်သော လာဘ်လာဘ ရရှိမည်။',
    meaning: 'ကလေးမွေးဖွားသည် သို့မဟုတ် ချစ်စဖွယ် ကလေးငယ်အား ချီပိုးယုယရသည်ဟု မက်ပါက ကာလကြာရှည် ကြံစည်ထားသော စီမံကိန်းအသစ်များ အောင်မြင်စွာ စတင်နိုင်မည်။ သားသမီးဆု တောင်းသူများ ဆုတောင်းပြည့်တတ်သည်။',
    advice: 'မိဘမဲ့ကလေးငယ်များအား မုန့် သို့မဟုတ် စာရေးကိရိယာ လှူဒါန်းပါ။',
    luckyNumbers: ['01', '10', '16', '61', '11'],
    lotteryTip: '၁ ထိပ် သို့မဟုတ် ၁ ပူးများကို ကံစမ်းပါ။'
  },
  {
    id: 'mountain_climb',
    title: 'တောင်တက်ခြင်း သို့မဟုတ် တောင်ထိပ်သို့ ရောက်ရှိခြင်း',
    keywords: ['တောင်', 'တောင်တက်', 'တောင်ထိပ်', 'ကျောက်တောင်', 'တောင်စွယ်'],
    category: 'nature',
    nature: 'auspicious',
    badgeText: 'မင်္ဂလာ ကောင်းသောနိမိတ်',
    summary: 'ရာထူးအဆင့်အတန်း တိုးတက်မည်၊ အခက်အခဲများကို ကျော်လွှားနိုင်ပြီး ကြီးမားသော အောင်မြင်မှု ရမည်။',
    meaning: 'တောင်မြင့်ကြီးပေါ်သို့ ပင်ပန်းစွာ တက်ရောက်ပြီး ထိပ်ဆုံးသို့ ရောက်ရှိသွားသည်ဟု မက်ပါက မကြာမီ ကြီးမားသော ရာထူးတိုးခြင်း၊ စာမေးပွဲ သို့မဟုတ် ပြိုင်ပွဲများတွင် ထိပ်ဆုံးမှ အောင်ပွဲခံရခြင်း ဖြစ်မည်။',
    advice: 'ဘုရားစေတီပုထိုးများတွင် ရွှေသင်္ကန်း သို့မဟုတ် ဆီမီးတိုင် လှူဒါန်းပါ။',
    luckyNumbers: ['09', '99', '91', '79', '97'],
    lotteryTip: '၉ ထိပ် သို့မဟုတ် ၉ ပူးများကို ဦးစားပေးပါ။'
  },
  {
    id: 'gold_treasure',
    title: 'ရွှေ၊ ငွေ၊ ရတနာများ ကောက်ရခြင်း သို့မဟုတ် လက်ဆောင်ရခြင်း',
    keywords: ['ရွှေ', 'ငွေ', 'ရတနာ', 'ကျောက်မျက်', 'ပတ္တမြား', 'စိန်'],
    category: 'wealth',
    nature: 'auspicious',
    badgeText: 'မင်္ဂလာ ကောင်းသောနိမိတ်',
    summary: 'လာဘ်လာဘ ရွှင်လန်းမည်၊ ဂုဏ်သိက္ခာ တက်လာပြီး စီးပွားတက်လမ်း ပွင့်မည်။',
    meaning: 'ရွှေတုံး၊ ရွှေဆွဲကြိုး သို့မဟုတ် ရတနာများ ရရှိသည်ဟု မက်ပါက မကြာမီ ကြီးမားသော လာဘ်လာဘ၊ အမွေအနှစ် သို့မဟုတ် ရာထူးတိုးခြင်း၊ လုပ်ငန်းအောင်မြင်ခြင်းတို့ ကြုံတွေ့ရမည်။',
    advice: 'ရွှေသင်္ကန်း ဘုရားကပ်လှူပါ၊ ဆင်းရဲသားများအား အာဟာရဒါန ပေးဝေပါ။',
    luckyNumbers: ['01', '19', '91', '14', '99'],
    lotteryTip: '၁ ထိပ် သို့မဟုတ် ၉ ပူးဂဏန်းများကို အလေးထားပါ။'
  },
  {
    id: 'tooth_loss',
    title: 'သွားကျိုးခြင်း သို့မဟုတ် သွားကျွတ်ထွက်ခြင်း',
    keywords: ['သွား', 'သွားကျိုး', 'သွားကျွတ်', 'သွားနုတ်', 'သွားနာ'],
    category: 'warning',
    nature: 'warning',
    badgeText: 'သတိပြုရန် နိမိတ်',
    summary: 'မိသားစုဆွေမျိုး သို့မဟုတ် မိမိကိုယ်တိုင် ကျန်းမာရေး သတိထားရမည့် နိမိတ်။',
    meaning: 'အထက်သွားကျွတ်ပါက အကြီးအကဲ မိဘဘိုးဘွားများ ကျန်းမာရေးချို့ယွင်းတတ်ပြီး အောက်သွားကျွတ်ပါက ငယ်ရွယ်သူများ အညံ့ရှိတတ်သည်။',
    advice: 'သက်ကြီးရွယ်အို မိဘဆွေမျိုးများအား ဆေးဝါးဓာတ်စာ လှူဒါန်းပြီး အန္တရာယ်ကင်း ပရိတ်တော်များ ရွတ်ဖတ်ပါ။',
    luckyNumbers: ['03', '30', '32', '37'],
    lotteryTip: 'ကံစမ်းရန် မသင့်တော်ပါ၊ အလှူအတန်းသာ ပိုမိုပြုလုပ်ပါ။'
  },
  {
    id: 'new_clothes',
    title: 'အဝတ်အစားအသစ် ဝတ်ဆင်ရခြင်း',
    keywords: ['အဝတ်', 'အဝတ်အစား', 'အဝတ်သစ်', 'ပုဆိုး', 'ထဘီ', 'ဝတ်စုံ'],
    category: 'wealth',
    nature: 'auspicious',
    badgeText: 'မင်္ဂလာ ကောင်းသောနိမိတ်',
    summary: 'ဂုဏ်သရေတက်မည်၊ အခမ်းအနားများ တက်ရောက်ရမည်၊ ဘဝအပြောင်းအလဲ ကောင်းများ ပေါ်ပေါက်မည်။',
    meaning: 'လှပသစ်လွင်သော အဝတ်တန်ဆာများကို ဝတ်ဆင်ရသည်ဟု မက်ပါက လူအများကြားတွင် ဂုဏ်တက်ခြင်း၊ ရာထူးနေရာသစ် ရရှိခြင်း ဖြစ်မည်။',
    advice: 'ဆင်းရဲနွမ်းပါးသူများအား အဝတ်အထည် ဒါနပြုပါ။',
    luckyNumbers: ['04', '44', '46', '64', '84'],
    lotteryTip: '၄ နှင့် ၆ အစပ်ဂဏန်းများကို ရွေးချယ်ပါ။'
  },
  {
    id: 'water_clear',
    title: 'ရေကြည်လင်စွာ သောက်ရခြင်း သို့မဟုတ် ရေကူးခြင်း',
    keywords: ['ရေ', 'ရေကူး', 'ရေသောက်', 'မြစ်', 'အိုင်', 'ရေကြည်'],
    category: 'nature',
    nature: 'auspicious',
    badgeText: 'မင်္ဂလာ ကောင်းသောနိမိတ်',
    summary: 'ကျန်းမာရေး ပြန်လည်လန်းဆန်းမည်၊ စိတ်အေးချမ်းသာမှုနှင့် ဥစ္စာဓန တိုးပွားမည်။',
    meaning: 'ကြည်လင်အေးမြသော ရေကို သောက်ရခြင်း၊ ရေချိုးရခြင်း မက်ပါက ရောဂါဘယ ကင်းရှင်းမည်။ ကြံစည်ထားသော အလုပ်အကိုင်များ အဆင်ချောမွေ့စွာ ပြီးမြောက်မည်။',
    advice: 'ရေအေးအလှူဒါန သို့မဟုတ် ဘုရားတွင် သောက်တော်ရေစင် ၈ ခွက် လှူဒါန်းပါ။',
    luckyNumbers: ['02', '24', '42', '20', '72'],
    lotteryTip: '၂ နှင့် ၄ အစပ် ဂဏန်းများကို ကံစမ်းပါ။'
  }
];

const YADAYA_DAYS = [
  {
    id: 0,
    name: 'တနင်္ဂနွေ (Sunday)',
    planet: 'နေမင်း',
    auspiciousStatus: 'ရက်ရာဇာ',
    luckyColor: 'အနီရောင်၊ ပန်းရောင်၊ ရွှေရောင်',
    luckyNumbers: '၁၊ ၆၊ ၈',
    direction: 'အရှေ့မြောက်အရပ်',
    remedy: 'နံနက်ခင်းတွင် ဘုရားစင်၌ အုန်းသီးဆွမ်း သို့မဟုတ် ဩဇာသီး ၆ လုံး လှူဒါန်းပြီး မေတ္တာပို့ပါ။ တိရစ္ဆာန်များကို အစာကျွေးပါ။',
    caution: 'စိတ်တိုဒေါသဖြစ်ခြင်းနှင့် အဆင်ခြင်မဲ့ အာမခံပေးခြင်းကို ရှောင်ကြဉ်ပါ။',
  },
  {
    id: 1,
    name: 'တနင်္လာ (Monday)',
    planet: 'လမင်း',
    auspiciousStatus: 'အမြိုက်သုတ်',
    luckyColor: 'အဖြူရောင်၊ ငွေရောင်၊ အဝါနုရောင်',
    luckyNumbers: '၂၊ ၄၊ ၇',
    direction: 'အရှေ့အရပ်',
    remedy: 'ဘုရားရှင်အား သပြေပန်း ၇ ညွန့်နှင့် ရေစင်လှူဒါန်းပါ။ လူကြီးမိဘများကို ချိုချဉ် သို့မဟုတ် သစ်သီး ကန်တော့ပါ။',
    caution: 'ငွေကြေးအလွယ်တကူ ချေးငှားခြင်းနှင့် စိတ်လှုပ်ရှားစွာ ဆုံးဖြတ်ခြင်းကို ရှောင်ပါ။',
  },
  {
    id: 2,
    name: 'အင်္ဂါ (Tuesday)',
    planet: 'အင်္ဂါဂြိုဟ်',
    auspiciousStatus: 'ပြဿဒါး',
    luckyColor: 'ပန်းရောင်၊ နီညိုရောင်၊ လိမ္မော်ရောင်',
    luckyNumbers: '၃၊ ၉၊ ၅',
    direction: 'အရှေ့တောင်အရပ်',
    remedy: 'နှင်းဆီနီ ၈ ပွင့် ဘုရားကပ်လှူပါ။ လမ်းဘေးခွေး သို့မဟုတ် ငှက်ငယ်များကို ပေါင်မုန့်ကျွေးကုသိုလ်ပြုပါ။',
    caution: 'စကားအခြေအတင် ငြင်းခုံခြင်းနှင့် လက်နက်၊ ထက်ထက်သော ပစ္စည်းများ ကိုင်တွယ်ရာတွင် သတိထားပါ။',
  },
  {
    id: 3,
    name: 'ဗုဒ္ဓဟူး (Wednesday)',
    planet: 'ဗုဒ္ဓဟူးဂြိုဟ်',
    auspiciousStatus: 'ရက်ရာဇာ',
    luckyColor: 'အစိမ်းရောင်၊ မြရောင်၊ မိုးပြာရောင်',
    luckyNumbers: '၄၊ ၅၊ ၈',
    direction: 'တောင်အရပ်',
    remedy: 'ဘုရားတွင် ရွက်လှ ၁၇ ညွန့် သို့မဟုတ် ကြာပန်း လှူဒါန်းပါ။ ပညာဒါန စာအုပ်စာပေ လှူဒါန်းခြင်းဖြင့် ကံပွင့်စေပါသည်။',
    caution: 'လိမ်လည်လှည့်ဖြားတတ်သူများနှင့် မရေရာသော အကြံပေးချက်များကို သတိထားပါ။',
  },
  {
    id: 4,
    name: 'ကြာသပတေး (Thursday)',
    planet: 'ကြာသပတေးဂြိုဟ်',
    auspiciousStatus: 'သမိုက်',
    luckyColor: 'အဝါရောင်၊ ရွှေဝါရောင်၊ လိမ္မော်နုရောင်',
    luckyNumbers: '၅၊ ၁၊ ၃',
    direction: 'အနောက်အရပ်',
    remedy: 'ဘုရားစင်၌ မာလကာသီး သို့မဟုတ် သရက်သီး ၁၉ စိပ် လှူဒါန်းပါ။ သံဃာတော်များအား ဆွမ်း/ဆေးဝါး ကပ်လှူပါ။',
    caution: 'အတိတ်က အမှားများကို စိတ်ထဲထားပြီး စိတ်ဓာတ်ကျဆင်းမနေပါနှင့်။',
  },
  {
    id: 5,
    name: 'သောကြာ (Friday)',
    planet: 'သောကြာဂြိုဟ်',
    auspiciousStatus: 'ရက်ရာဇာ',
    luckyColor: 'အပြာရောင်၊ ပန်းနုရောင်၊ အဖြူရောင်',
    luckyNumbers: '၆၊ ၂၊ ၈',
    direction: 'မြောက်အရပ်',
    remedy: 'သပြေညွန့် ၂၁ ညွန့် ဘုရားတင်လှူပါ။ ရေအေးအလှူဒါနပြုခြင်း သို့မဟုတ် ငါးစာကျွေး ယတြာပြုလုပ်ပါ။',
    caution: 'မလိုအပ်ဘဲ အပိုအသုံးအစွဲများခြင်းနှင့် ဖျော်ဖြေရေးဘက် လွန်ကဲခြင်းကို ဆင်ခြင်ပါ။',
  },
  {
    id: 6,
    name: 'စနေ (Saturday)',
    planet: 'စနေဂြိုဟ်',
    auspiciousStatus: 'ဝါရမိတ္တု',
    luckyColor: 'အနက်ရောင်၊ ခရမ်းရောင်၊ မီးခိုးရောင်',
    luckyNumbers: '၇၊ ၃၊ ၉',
    direction: 'အနောက်တောင်အရပ်',
    remedy: 'ဘုရားစင်တွင် ဒန်းညွန့် သို့မဟုတ် နှင်းဆီ ၁၀ ပွင့် လှူဒါန်းပါ။ သက်ကြီးရွယ်အိုများကို ကူညီစောင့်ရှောက်ပါ။',
    caution: 'အမှုအခင်းစကားများ၊ အဆောက်အဦး အသစ်တက်ခြင်းတို့ကို ရှောင်ကြဉ်ပါ။',
  },
];

const MOLE_DATA = {
  face: [
    {
      id: 'forehead_center',
      region: 'နဖူးအလယ်',
      title: 'နဖူးအလယ်တည့်တည့်ရှိ မှည့်',
      meaning: 'ဉာဏ်ပညာကြီးမားပြီး ဩဇာအာဏာရှိမည့် လက္ခဏာဖြစ်သည်။ ဘဝအလယ်ပိုင်းတွင် အကြီးအကဲ သို့မဟုတ် ခေါင်းဆောင်နေရာသို့ ရောက်ရှိတတ်သည်။',
      wealth: '⭐⭐⭐⭐⭐ (အထူးကြွယ်ဝမည်)',
      love: '⭐⭐⭐ (ကိုယ့်အားကိုယ်ကိုး စိတ်များ၍ အိမ်ထောင်ဖက်နှင့် ညှိနှိုင်းရမည်)',
      advice: 'မာနကိုလျှော့ပြီး လက်အောက်ငယ်သားများအပေါ် ကြင်နာပါက အောင်မြင်မှု အဆမတန် ကြီးမားမည်။'
    },
    {
      id: 'eyebrow_right',
      region: 'ညာဘက် မျက်ခုံး',
      title: 'ညာဘက် မျက်ခုံးနားရှိ မှည့်',
      meaning: 'အိမ်ထောင်ရေး ကံအထူးကောင်းမွန်ပြီး သစ္စာရှိသော အဖော်နှင့် ဆုံတွေ့ရတတ်သည်။ စီးပွားဥစ္စာ ရှာဖွေရာတွင် အကူအညီကောင်းများ အစဉ်ရရှိမည်။',
      wealth: '⭐⭐⭐⭐ (ဥစ္စာစုဆောင်းနိုင်မည်)',
      love: '⭐⭐⭐⭐⭐ (သာယာချမ်းမြေ့မည့် အချစ်ရေး)',
      advice: 'မိတ်ဆွေကောင်းများနှင့် ပူးပေါင်းလုပ်ကိုင်ခြင်းဖြင့် အကျိုးအမြတ် ပိုမိုဖြစ်ထွန်းမည်။'
    },
    {
      id: 'upper_lip',
      region: 'အပေါ်နှုတ်ခမ်း',
      title: 'အပေါ်နှုတ်ခမ်းအနီးရှိ မှည့်',
      meaning: 'နှုတ်ချိုသာပြီး စကားပြောဆွဲဆောင်မှု အလွန်ကောင်းသည်။ အစားအသောက် အလှအပကို ကြိုက်နှစ်သက်ပြီး လူချစ်လူခင် ပေါများသည်။',
      wealth: '⭐⭐⭐⭐ (အရောင်းအဝယ် စကားပြောအလုပ်များ ကံကောင်းသည်)',
      love: '⭐⭐⭐⭐⭐ (စကားပြောနူးညံ့၍ ဖူးစာရှင်များ ဝိုင်းဝိုင်းလည်မည်)',
      advice: 'စကားကတိပေးရာတွင် သတိထားပါ၊ အရောင်းအဝယ်လုပ်ငန်းများ အထူးသင့်လျော်သည်။'
    },
    {
      id: 'nose_tip',
      region: 'နှာခေါင်းထိပ်',
      title: 'နှာခေါင်းထိပ်ရှိ မှည့်',
      meaning: 'ဝင်ငွေကောင်းသလောက် အသုံးအစွဲ ကြမ်းတတ်သည်။ စိတ်မြန်လက်မြန် ဆုံးဖြတ်တတ်ပြီး အပျော်အပါးနှင့် ဖျော်ဖြေရေးကို နှစ်သက်သည်။',
      wealth: '⭐⭐⭐ (ငွေဝင်လွယ် ထွက်လွယ်သည်)',
      love: '⭐⭐⭐⭐ (စွဲဆောင်မှုရှိပြီး အချစ်ရေးကံပွင့်သည်)',
      advice: 'စုငွေသီးသန့်ထားရှိပါ၊ ရေရှည်ရင်းနှီးမြှုပ်နှံမှုများကို ဦးစားပေးပါ။'
    }
  ],
  body: [
    {
      id: 'palm_center',
      region: 'လက်ဖဝါးအလယ်',
      title: 'လက်ဖဝါးအလယ်ရှိ မှည့် (လာဘ်မှည့်)',
      meaning: 'ရှေးမြန်မာ့ကျမ်းအရ အလွန်ထူးခြားသော "လာဘ်မှည့်" ဖြစ်သည်။ ငွေကြေးဥစ္စာ လက်တွင်းသို့ မပြတ်စီးဝင်လာမည်။',
      wealth: '⭐⭐⭐⭐⭐ (ဘဝတစ်သက်တာ ငွေကြေးမချို့တဲ့ပါ)',
      love: '⭐⭐⭐⭐ (မိသားစုကို ကြွယ်ဝစွာ ထောက်ပံ့နိုင်မည်)',
      advice: 'အလှူဒါန မကြာခဏ ပြုလုပ်ပေးပါက လာဘ်လာဘ ဆတက်ထမ်းပိုး တိုးပွားမည်။'
    },
    {
      id: 'chest_left',
      region: 'ရင်ဘတ် (နှလုံးသားဘက်)',
      title: 'ရင်ဘတ်ဘယ်ဘက်ရှိ မှည့်',
      meaning: 'မေတ္တာတရား ကြီးမားပြီး စာနာနားလည်တတ်သူဖြစ်သည်။ သူတစ်ပါးအကျိုးအတွက် စွန့်လွှတ်အနစ်နာခံတတ်သဖြင့် အများ၏ လေးစားမှုကို ရရှိမည်။',
      wealth: '⭐⭐⭐⭐ (ကုသိုလ်ကံကြောင့် လာဘ်မပြတ်ရရှိမည်)',
      love: '⭐⭐⭐⭐⭐ (အလွန်သစ္စာရှိသော ချစ်သူ/အိမ်ထောင်ဖက်)',
      advice: 'သူတစ်ပါးအား အလွန်အမင်း ယုံကြည်လွန်းခြင်းကို ဆင်ခြင်ပါ။'
    }
  ]
};

const ZODIAC_SIGNS = [
  { id: 'aries', name: 'မိဿ (Aries)', element: 'မီး', dates: 'မတ် ၂၁ - ဧပြီ ၁၉', icon: '♈' },
  { id: 'taurus', name: 'ပြိဿ (Taurus)', element: 'မြေ', dates: 'ဧပြီ ၂၀ - မေ ၂၀', icon: '♉' },
  { id: 'gemini', name: 'မေထုန် (Gemini)', element: 'လေ', dates: 'မေ ၂၁ - ဇွန် ၂၀', icon: '♊' },
  { id: 'cancer', name: 'ကရကဋ် (Cancer)', element: 'ရေ', dates: 'ဇွန် ၂၁ - ဇူလိုင် ၂၂', icon: '♋' },
  { id: 'leo', name: 'သိဟ် (Leo)', element: 'မီး', dates: 'ဇူလိုင် ၂၃ - သြဂုတ် ၂၂', icon: '♌' },
  { id: 'virgo', name: 'ကန် (Virgo)', element: 'မြေ', dates: 'သြဂုတ် ၂၃ - စက်တင်ဘာ ၂၂', icon: '♍' },
  { id: 'libra', name: 'တူ (Libra)', element: 'လေ', dates: 'စက်တင်ဘာ ၂၃ - အောက်တိုဘာ ၂၂', icon: '♎' },
  { id: 'scorpio', name: 'ဗြိစ္ဆာ (Scorpio)', element: 'ရေ', dates: 'အောက်တိုဘာ ၂၃ - နိုဝင်ဘာ ၂၁', icon: '♏' },
  { id: 'sagittarius', name: 'ဓနု (Sagittarius)', element: 'မီး', dates: 'နိုဝင်ဘာ ၂၂ - ဒီဇင်ဘာ ၂၁', icon: '♐' },
  { id: 'capricorn', name: 'မကာရ (Capricorn)', element: 'မြေ', dates: 'ဒီဇင်ဘာ ၂၂ - ဇန်နဝါရီ ၁၉', icon: '♑' },
  { id: 'aquarius', name: 'ကုမ် (Aquarius)', element: 'လေ', dates: 'ဇန်နဝါရီ ၂၀ - ဖေဖော်ဝါရီ ၁၈', icon: '♒' },
  { id: 'pisces', name: 'မိန် (Pisces)', element: 'ရေ', dates: 'ဖေဖော်ဝါရီ ၁၉ - မတ် ၂၀', icon: '♓' },
];

const TAROT_CARDS = [
  {
    id: 'sun',
    name: 'The Sun (နေမင်းကတ်)',
    burmeseName: 'အောင်မြင်မှုနှင့် ဉာဏ်အလင်း',
    message: 'ယနေ့သည် သင့်အတွက် အောင်မြင်မှု၊ ပျော်ရွှင်မှုနှင့် စွမ်းအင်အပြည့်ရရှိမည့် နေ့ထူးနေ့မြတ်ဖြစ်သည်။ စိုးရိမ်ပူပန်မှုများ ကင်းဝေးမည်။',
    iconText: '☀️',
  },
  {
    id: 'star',
    name: 'The Star (ကြယ်တာရာကတ်)',
    burmeseName: 'မျှော်လင့်ချက်နှင့် ဆုတောင်းပြည့်ခြင်း',
    message: 'အခက်အခဲများ ပြီးဆုံးသွားတော့မည်။ စိတ်အေးချမ်းသာမှုရရှိပြီး မျှော်လင့်ထားသော ကိစ္စများ တစ်စတစ်စ အကောင်အထည် ပေါ်လာပါလိမ့်မည်။',
    iconText: '⭐',
  },
  {
    id: 'wheel',
    name: 'Wheel of Fortune (ကံကြမ္မာစက်ဘီး)',
    burmeseName: 'ကံတက်လမ်းနှင့် အပြောင်းအလဲ',
    message: 'မမျှော်လင့်ထားသော ကံကောင်းမှုများနှင့် ကောင်းသော အပြောင်းအလဲများ ဆိုက်ရောက်လာမည်။ အခွင့်အရေးကို လက်လွတ်မခံပါနှင့်။',
    iconText: '☸️',
  },
  {
    id: 'magician',
    name: 'The Magician (ဖန်ဆင်းရှင်ကတ်)',
    burmeseName: 'စွမ်းရည်နှင့် ဖန်တီးနိုင်စွမ်း',
    message: 'သင့်လက်ထဲတွင် လိုအပ်သော အရည်အချင်းနှင့် စွမ်းရည်များ အပြည့်ရှိနေပြီ။ မိမိကိုယ်ကို ယုံကြည်ပြီး ချက်ချင်း စတင်လိုက်ပါ။',
    iconText: '🪄',
  }
];

const PALM_QUESTIONS = [
  {
    id: 'heart',
    title: '၁။ နှလုံးလမ်းကြောင်း (Heart Line)',
    subtitle: 'လက်သန်းအောက်မှစတင်ကာ လက်ညှိုး/လက်ခလယ်ဆီသို့ ဦးတည်သွားသော မျဉ်း',
    options: [
      { id: 'curved_up', label: 'လက်ညှိုးအောက်သို့ ကွေးတက်သည်', desc: 'သံယောဇဉ်ကြီးမားပြီး အချစ်ရေးတွင် အလွန်သစ္စာရှိသူ၊ ကြင်နာတတ်သူဖြစ်သည်။' },
      { id: 'stops_middle', label: 'လက်ခလယ်တည့်တည့်တွင် ဆုံးသည်', desc: 'လက်တွေ့ဆန်ပြီး စိတ်ခံစားချက်ထက် ကိုယ်ပိုင်ရပ်တည်မှုကို ဦးစားပေးတတ်သည်။' },
      { id: 'straight', label: 'ဖြောင့်တန်းစွာ သွားသည်', desc: 'စိတ်ခံစားချက်ကို အသိဉာဏ်ဖြင့် အလွယ်တကူ ထိန်းချုပ်နိုင်ပြီး တည်ငြိမ်သူဖြစ်သည်။' },
    ],
  },
  {
    id: 'head',
    title: '၂။ ဉာဏ်လမ်းကြောင်း (Head Line)',
    subtitle: 'လက်မနှင့် လက်ညှိုးကြားမှစတင်ကာ လက်ဖဝါးအလယ်ကို ဖြတ်သွားသော မျဉ်း',
    options: [
      { id: 'curves_down', label: 'အောက်ဘက်သို့ ပြေပြေလေး ကွေးဆင်းသည်', desc: 'ဖန်တီးမှုဉာဏ်ရည်ထူးချွန်ပြီး စိတ်ကူးစိတ်သန်း အလွန်ကြွယ်ဝသော အနုပညာသမား စရိုက်ရှိသည်။' },
      { id: 'straight_across', label: 'ဖြောင့်တန်းစွာ လက်ဖဝါးကို ဖြတ်သည်', desc: 'ယုတ္တိဗေဒကျကျ စဉ်းစားတတ်ပြီး လက်တွေ့ကျသော စီးပွားရေးနှင့် စီမံခန့်ခွဲမှု အမြင်စူးရှသည်။' },
    ],
  },
  {
    id: 'life',
    title: '၃။ အသက်လမ်းကြောင်း (Life Line)',
    subtitle: 'လက်မကို ဝိုင်းရံကာ လက်ကောက်ဝတ်ဆီသို့ ကွေးဆင်းသွားသော မျဉ်း',
    options: [
      { id: 'wide_arc', label: 'လက်မကို ကျယ်ကျယ်ပြန့်ပြန့် ဝိုင်းရံသည်', desc: 'ခွန်အားပြည့်ဝပြီး တက်ကြွလန်းဆန်းသော စွမ်းအင်ရှိသည်။ ကျန်းမာရေးခံနိုင်ရည် ကောင်းမွန်သည်။' },
      { id: 'deep_clear', label: 'ထင်ရှားပြတ်သားပြီး နက်ရှိုင်းသည်', desc: 'ဘဝ၏ အဆန်အလှည့်အခက်အခဲများကို ကြံ့ကြံ့ခံကျော်လွှားနိုင်သော ဇွဲသတ္တိ ထူးကဲသည်။' },
    ],
  },
  {
    id: 'fate',
    title: '၄။ ကံလမ်းကြောင်း (Fate Line)',
    subtitle: 'လက်ကောက်ဝတ်ဘက်မှ လက်ခလယ်ဆီသို့ ဒေါင်လိုက်တက်သော မျဉ်း',
    options: [
      { id: 'straight_middle', label: 'အောက်ခြေမှ လက်ခလယ်ထိ ရှည်လျားစွာ တက်သည်', desc: 'ငယ်စဉ်ကတည်းက ဘဝရည်မှန်းချက် ရှင်းလင်းပြီး ကံတက်လမ်းပွင့်ကာ အောင်မြင်မှုမြန်ဆန်သည်။' },
      { id: 'faint_none', label: 'မထင်ရှားပါ / မျဉ်းမပါရှိပါ', desc: 'ကံကြမ္မာအလှည့်အပြောင်းထက် ကိုယ်ပိုင်ဆုံးဖြတ်ချက်နှင့် လက်တွေ့ကြိုးစားမှုဖြင့် ဘဝကို ဖန်တီးရသူ။' },
    ],
  },
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const activeModule = useMemo(() => {
    return ASTROLOGY_MODULES.find((m) => m.id === activeModuleId);
  }, [activeModuleId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 px-5 py-2 rounded-full shadow-2xl font-bold text-xs sm:text-sm flex items-center gap-2 animate-bounce border border-amber-300">
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Global Top Header */}
      <header className="border-b border-amber-500/20 bg-slate-900/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div 
            onClick={() => setActiveModuleId(null)} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 text-xl group-hover:scale-105 transition-transform">
              🔮
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-amber-300 tracking-wide flex items-center gap-1.5">
                ရတနာ ဗေဒင်
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-normal">
                  Yadana Baydin
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">မြန်မာ့ရိုးရာ ကံကြမ္မာနှင့် ဗေဒင်ဆန်းစစ်ချက်များ</p>
            </div>
          </div>

          {activeModuleId ? (
            <button
              onClick={() => setActiveModuleId(null)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-400/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ပင်မသို့ ပြန်သွားမည်</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ယနေ့: {new Date().toLocaleDateString('my-MM', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 pb-20">
        {/* VIEW 1: CLEAN DASHBOARD GRID */}
        {!activeModuleId && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> ရတနာ ဗေဒင်မှ ကြိုဆိုပါသည်
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  သင့်ကံကြမ္မာနှင့် ဗေဒင်အမျိုးအစား ရွေးချယ်ပါ
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  နေ့စဉ်ယတြာ၊ လက်ခဏာ၊ အိပ်မက်နိမိတ်များမှသည် အသစ်ထည့်သွင်းထားသော မျက်စိလှုပ်နိမိတ်နှင့် မိတ်ဖက်/ရန်ဖက် နေ့နံစစ်တမ်းအထိ စုံလင်စွာ ကြည့်ရှုနိုင်ပါသည်။
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 px-1">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <span>✨</span> ဗေဒင်အမျိုးအစားများ ({ASTROLOGY_MODULES.length} မျိုး)
              </h3>
              <span className="text-xs text-slate-400">တစ်ခုနှိပ်၍ ကြည့်ရှုပါ</span>
            </div>

            {/* 10 Modules Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ASTROLOGY_MODULES.map((module) => (
                <div
                  key={module.id}
                  onClick={() => setActiveModuleId(module.id)}
                  className={`group cursor-pointer rounded-2xl p-5 border bg-slate-900/90 hover:bg-slate-800/90 ${module.borderColor} hover:border-amber-400 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1 hover:shadow-amber-500/10`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl border border-white/5 group-hover:scale-110 transition-transform`}>
                        <span>{module.emoji}</span>
                      </div>
                      {module.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          module.badge === 'အသစ်' 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {module.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {module.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {module.enTitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {module.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-300 transition-colors">
                    <span>စစ်ဆေးကြည့်မည်</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: DEDICATED SINGLE MODULE FOCUS */}
        {activeModuleId && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
              <button
                onClick={() => setActiveModuleId(null)}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← ပင်မစာမျက်နှာသို့ (ဗေဒင်များ ပြန်ရွေးရန်)</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline">ကူးပြောင်းရန်:</span>
                <select
                  value={activeModuleId}
                  onChange={(e) => setActiveModuleId(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-xs text-amber-300 font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400"
                >
                  {ASTROLOGY_MODULES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.emoji} {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Render Selected View */}
            <div>
              {activeModuleId === 'yadaya' && <YadayaModule showToast={showToast} />}
              {activeModuleId === 'palmistry' && <PalmistryModule showToast={showToast} />}
              {activeModuleId === 'body_omens' && <BodyOmensModule showToast={showToast} />}
              {activeModuleId === 'day_compatibility' && <DayCompatibilityModule showToast={showToast} />}
              {activeModuleId === 'dreams' && <DreamDictionaryModule showToast={showToast} />}
              {activeModuleId === 'mahabote' && <MahaboteModule showToast={showToast} />}
              {activeModuleId === 'tarot' && <TarotModule showToast={showToast} />}
              {activeModuleId === 'mole' && <MoleModule showToast={showToast} />}
              {activeModuleId === 'phone' && <PhoneNumerologyModule showToast={showToast} />}
              {activeModuleId === 'zodiac' && <ZodiacLoveModule showToast={showToast} />}
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-900 bg-slate-950">
        <p>© ရတနာ ဗေဒင် - စိတ်ချမ်းမြေ့ဖွယ် မြန်မာ့ရိုးရာ ဗေဒင်ဆန်းစစ်ချက်များ</p>
      </footer>
    </div>
  );
}

// ==========================================
// MODULE: BODY TWITCHING & OMENS (အသစ်)
// ==========================================
function BodyOmensModule({ showToast }) {
  const [filterType, setFilterType] = useState('all');
  const [selectedOmen, setSelectedOmen] = useState(BODY_OMENS_DATA[0]);

  const filteredList = useMemo(() => {
    if (filterType === 'all') return BODY_OMENS_DATA;
    return BODY_OMENS_DATA.filter((o) => o.type === filterType);
  }, [filterType]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950 border border-cyan-500/30 rounded-2xl p-5 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>⚡</span> မျက်စိလှုပ်ခြင်းနှင့် ခန္ဓာကိုယ် နိမိတ်များ
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          မျက်စိလှုပ်ခြင်း၊ နှုတ်ခမ်းလှုပ်ခြင်း၊ လက်ဖဝါးယားခြင်း၊ နားအူခြင်းနှင့် အိမ်မြှောင်စုတ်ထိုး အကျိုးအပြစ်များ
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'အားလုံး' },
          { id: 'eye', label: '👁️ မျက်စိလှုပ်ခြင်း' },
          { id: 'lip', label: '👄 နှုတ်ခမ်း' },
          { id: 'palm', label: '✋ လက်ဖဝါးယားခြင်း' },
          { id: 'ear', label: '👂 နားအူခြင်း' },
          { id: 'lizard', label: '🦎 အိမ်မြှောင်စုတ်ထိုး' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left List */}
        <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
          <label className="text-xs font-semibold text-slate-400 block mb-1">
            နိမိတ်အမျိုးအစား ရွေးချယ်ပါ -
          </label>
          <div className="flex flex-col gap-1.5">
            {filteredList.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedOmen(item)}
                className={`p-3 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedOmen.id === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="truncate pr-2">
                  <span>{item.part}</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${
                  item.nature === 'auspicious' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {item.nature === 'auspicious' ? 'ကောင်း' : 'သတိ'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Detail */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedOmen.nature === 'auspicious' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {selectedOmen.status}
              </span>
              <h3 className="text-lg font-bold text-white mt-1.5">{selectedOmen.part}</h3>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300">ကျမ်းလာ နိမိတ်အဓိပ္ပာယ် -</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {selectedOmen.meaning}
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-1">⏱️ အချိန်ကာလ အကျိုးပေးမှု</span>
            <span className="font-semibold text-cyan-300">{selectedOmen.timingDesc}</span>
          </div>

          <div className="bg-gradient-to-r from-cyan-950/20 to-slate-950 p-4 rounded-xl border border-cyan-500/20 text-xs text-slate-300">
            <strong className="text-cyan-400 block mb-1">✨ အကြံပြု ယတြာနှင့် ဖြေဆေး:</strong>
            {selectedOmen.remedy}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MODULE: TRADITIONAL BURMESE DAY COMPATIBILITY (အသစ်)
// ==========================================
function DayCompatibilityModule({ showToast }) {
  const [day1Id, setDay1Id] = useState(1); // Sunday
  const [day2Id, setDay2Id] = useState(4); // Wednesday (Friend by default)

  const day1 = BURMESE_DAYS.find((d) => d.id === day1Id) || BURMESE_DAYS[0];
  const day2 = BURMESE_DAYS.find((d) => d.id === day2Id) || BURMESE_DAYS[3];

  const analysis = useMemo(() => {
    return evaluateTraditionalPair(day1, day2);
  }, [day1, day2]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-950/40 via-slate-900 to-indigo-950 border border-violet-500/30 rounded-2xl p-5 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🤝</span> မြန်မာ့ရိုးရာ မိတ်ဖက်/ရန်ဖက် နေ့နံစစ်တမ်း
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          "အုန်းသီးရွှေခဲ ဇေယျာရတနာ" မိတ်ဖက်ကျမ်းနှင့် "ဓမ္မာသောက အင်းဝရာဇာ" ရန်ဖက်တွက်ချက်မှု
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Person 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-semibold text-violet-300 block">
            ၁။ ပထမသူ၏ မွေးနေ့နံ (မိမိ) -
          </label>
          <select
            value={day1Id}
            onChange={(e) => setDay1Id(parseInt(e.target.value, 10))}
            className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-400"
          >
            {BURMESE_DAYS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.symbol} - {d.element} ဓာတ်)
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400">{day1.planet} ဂြိုဟ်စိုးမိုးသည်</p>
        </div>

        {/* Person 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-semibold text-purple-300 block">
            ၂။ ဒုတိယသူ၏ မွေးနေ့နံ (ချစ်သူ/စီးပွားဘက်) -
          </label>
          <select
            value={day2Id}
            onChange={(e) => setDay2Id(parseInt(e.target.value, 10))}
            className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-400"
          >
            {BURMESE_DAYS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.symbol} - {d.element} ဓာတ်)
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400">{day2.planet} ဂြိုဟ်စိုးမိုးသည်</p>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-slate-900/90 border border-violet-500/30 rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-2">
          <div>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              analysis.type === 'friend' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : analysis.type === 'enemy'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
            }`}>
              {analysis.badge}
            </span>
            <h3 className="text-xl font-bold text-white mt-1.5">{analysis.rhyme}</h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">လိုက်ဖက်မှု ရမှတ်</span>
            <p className={`text-2xl font-black font-mono ${
              analysis.score >= 80 ? 'text-emerald-400' : analysis.score <= 50 ? 'text-rose-400' : 'text-amber-400'
            }`}>
              {analysis.score}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-rose-400">💍 အိမ်ထောင်ဖက် လိုက်ဖက်မှု</span>
            <p className="text-xs text-slate-200 leading-relaxed">{analysis.marriageAnalysis}</p>
          </div>
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400">💼 စီးပွားဖက်စပ်မှု ကံကြမ္မာ</span>
            <p className="text-xs text-slate-200 leading-relaxed">{analysis.businessAnalysis}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-950/20 to-slate-950 p-4 rounded-xl border border-violet-500/20 text-xs text-slate-300">
          <strong className="text-violet-400 block mb-1">💡 သဟဇာတဖြစ်စေရန် ရိုးရာအကြံပြုချက်:</strong>
          {analysis.advice}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MODULE: DAILY YADAYA (နေ့စဉ် ယတြာ)
// ==========================================
function YadayaModule({ showToast }) {
  const currentDayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(currentDayIndex);
  const [completedYadaya, setCompletedYadaya] = useState({});

  const dayData = YADAYA_DAYS[selectedDay];
  const isDone = completedYadaya[selectedDay];

  const toggleDone = () => {
    setCompletedYadaya((prev) => ({
      ...prev,
      [selectedDay]: !prev[selectedDay],
    }));
    if (!isDone) {
      showToast('သာဓု သာဓု သာဓု! ယနေ့အတွက် ကုသိုလ်ယတြာ ပြီးမြောက်ပါပြီ ✨');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950 border border-amber-500/30 rounded-2xl p-5 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🧭</span> နေ့စဉ် ယတြာနှင့် မင်္ဂလာအခါပေး
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          မွေးနေ့နံအလိုက် ကံပွင့်စေမည့် ယတြာများ၊ အကျိုးပေးအရောင်နှင့် ရှောင်ကြဉ်ရန်များ
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {YADAYA_DAYS.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDay(d.id)}
            className={`py-2 px-1 rounded-xl text-xs font-medium text-center transition-all ${
              selectedDay === d.id
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20 scale-105'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div>{d.name.split(' ')[0]}</div>
            <div className="text-[10px] opacity-75">{d.auspiciousStatus}</div>
          </button>
        ))}
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div>
            <h3 className="text-lg font-bold text-amber-300">{dayData.name}</h3>
            <p className="text-xs text-slate-400">စိုးမိုးဂြိုဟ် - {dayData.planet}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            dayData.auspiciousStatus === 'ရက်ရာဇာ'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}>
            {dayData.auspiciousStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-0.5">🎨 ကံကောင်းစေသော အရောင်</span>
            <span className="font-semibold text-slate-200">{dayData.luckyColor}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-0.5">🔢 အကျိုးပေးဂဏန်းများ</span>
            <span className="font-bold text-amber-300">{dayData.luckyNumbers}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-0.5">🧭 မျက်နှာမူရမည့် အရပ်</span>
            <span className="font-semibold text-slate-200">{dayData.direction}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/20 rounded-xl p-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <strong className="text-amber-400 block mb-1">✨ ယနေ့ ပြုလုပ်ရန် ယတြာကုသိုလ်:</strong>
          {dayData.remedy}
        </div>

        <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3.5 text-xs text-slate-300">
          <strong className="text-rose-400 block mb-0.5">⚠️ ယနေ့ ရှောင်ကြဉ်ရန်:</strong>
          {dayData.caution}
        </div>

        <button
          onClick={toggleDone}
          className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            isDone
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-slate-800 text-amber-300 border border-amber-500/30 hover:bg-slate-700'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          {isDone ? 'ယနေ့ ယတြာပြုလုပ်ပြီးပါပြီ (ပြီးမြောက်)' : 'ယနေ့ ယတြာပြုလုပ်ပြီးပါက နှိပ်ပါ'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// MODULE: PALMISTRY (လက်ခဏာ)
// ==========================================
function PalmistryModule({ showToast }) {
  const [step, setStep] = useState(0);
  const [hand, setHand] = useState('right');
  const [answers, setAnswers] = useState({ heart: null, head: null, life: null, fate: null });

  const q = PALM_QUESTIONS[step - 1];

  const handleSelect = (key, opt) => {
    setAnswers((prev) => ({ ...prev, [key]: opt }));
  };

  return (
    <div className="space-y-6">
      {step === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-6 shadow-xl">
          <h3 className="text-xl font-bold text-white">မည်သည့်လက်ကို စစ်ဆေးလိုပါသလဲ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              onClick={() => setHand('left')}
              className={`p-4 rounded-xl border text-left ${hand === 'left' ? 'border-amber-400 bg-amber-500/10' : 'border-slate-800 bg-slate-950'}`}
            >
              <div className="text-2xl mb-1">✋</div>
              <p className="font-bold text-sm text-amber-300">ဘယ်လက် (Left Hand)</p>
              <p className="text-xs text-slate-400 mt-0.5">မွေးရာပါ ပါရမီနှင့် အတွင်းစိတ်</p>
            </button>
            <button
              onClick={() => setHand('right')}
              className={`p-4 rounded-xl border text-left ${hand === 'right' ? 'border-amber-400 bg-amber-500/10' : 'border-slate-800 bg-slate-950'}`}
            >
              <div className="text-2xl mb-1">🤚</div>
              <p className="font-bold text-sm text-amber-300">ညာလက် (Right Hand)</p>
              <p className="text-xs text-slate-400 mt-0.5">လက်ရှိကံနှင့် ကြိုးစားအားထုတ်မှု</p>
            </button>
          </div>
          <button
            onClick={() => setStep(1)}
            className="w-full max-w-xs py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm"
          >
            မေးခွန်းများ စတင်မည် →
          </button>
        </div>
      )}

      {step >= 1 && step <= 4 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <span className="text-[11px] text-amber-400 font-semibold">မေးခွန်း {step} / 4</span>
          <h3 className="text-lg font-bold text-white">{q.title}</h3>
          <p className="text-xs text-slate-400">{q.subtitle}</p>

          <div className="space-y-2 pt-2">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(q.id, opt)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  answers[q.id]?.id === opt.id
                    ? 'border-amber-400 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                }`}
              >
                <p className="font-bold text-xs sm:text-sm text-amber-300">{opt.label}</p>
                <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-3 border-t border-slate-800">
            <button onClick={() => setStep(step - 1)} className="text-xs text-slate-400">← နောက်သို့</button>
            <button
              disabled={!answers[q.id]}
              onClick={() => setStep(step + 1)}
              className={`px-5 py-2 rounded-xl text-xs font-bold ${
                answers[q.id] ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'
              }`}
            >
              {step === 4 ? 'ရလဒ် ထုတ်ယူမည် ✨' : 'ရှေ့သို့ →'}
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="text-center space-y-1">
            <span className="text-3xl">📜</span>
            <h3 className="text-xl font-bold text-amber-300">လက်ခဏာ ဆန်းစစ်ချက် ရလဒ်</h3>
            <p className="text-xs text-slate-400">စစ်ဆေးခဲ့သောလက်: {hand === 'left' ? 'ဘယ်လက်' : 'ညာလက်'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">❤️ အချစ်ရေး</span>
              <p className="text-slate-300">{answers.heart?.desc}</p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">🧠 ဉာဏ်ရည်</span>
              <p className="text-slate-300">{answers.head?.desc}</p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-pink-400 font-bold block mb-1">🌿 ကျန်းမာရေး</span>
              <p className="text-slate-300">{answers.life?.desc}</p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-sky-400 font-bold block mb-1">💼 စီးပွားရေး</span>
              <p className="text-slate-300">{answers.fate?.desc}</p>
            </div>
          </div>

          <button
            onClick={() => { setStep(0); setAnswers({ heart: null, head: null, life: null, fate: null }); }}
            className="w-full py-2.5 rounded-xl bg-slate-800 text-amber-300 text-xs font-semibold"
          >
            အစမှ ပြန်လည်စစ်ဆေးမည် 🔄
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MODULE: DREAM DICTIONARY
// ==========================================
function DreamDictionaryModule({ showToast }) {
  const [q, setQ] = useState('');
  const [modalDream, setModalDream] = useState(null);

  const dreams = useMemo(() => {
    if (!q.trim()) return DREAM_DATABASE;
    const s = q.toLowerCase();
    return DREAM_DATABASE.filter(d => d.title.includes(s) || d.summary.includes(s) || d.keywords.some(k => k.includes(s)));
  }, [q]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950 border border-purple-500/30 rounded-2xl p-5 shadow-xl space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📖</span> အိပ်မက်နိမိတ် အဘိဓာန်နှင့် ကံစမ်းဂဏန်းများ
        </h2>
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ဥပမာ - မြွေ၊ ရေ၊ ကလေး၊ တောင်၊ အဝတ်၊ ရွှေငွေ..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
          />
          {q && (
            <button onClick={() => setQ('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dreams.map((d) => (
          <div key={d.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.nature === 'auspicious' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {d.badgeText}
              </span>
              <h3 className="text-base font-bold text-amber-300 mt-1">{d.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{d.summary}</p>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex gap-1">
                {d.luckyNumbers.slice(0, 3).map((n, i) => (
                  <span key={i} className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold text-[11px]">{n}</span>
                ))}
              </div>
              <button onClick={() => setModalDream(d)} className="text-amber-400 font-bold hover:underline">အပြည့်အစုံ →</button>
            </div>
          </div>
        ))}
      </div>

      {modalDream && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-5 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-amber-300">{modalDream.title}</h3>
              <button onClick={() => setModalDream(null)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{modalDream.meaning}</p>
            <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/20 text-xs text-amber-200">
              <strong>အကြံပြုယတြာ:</strong> {modalDream.advice}
            </div>
            <button onClick={() => setModalDream(null)} className="w-full py-2 bg-slate-800 rounded-xl text-xs font-bold text-white">ပိတ်မည်</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MODULE: MAHABOTE
// ==========================================
function MahaboteModule({ showToast }) {
  const [adYear, setAdYear] = useState(1998);
  const myYear = adYear > 638 ? adYear - 638 : 0;
  const rem = myYear > 0 ? (myYear % 7 === 0 ? 7 : myYear % 7) : 0;

  const houses = {
    1: { name: 'ဘင်္ဂ (Binga)', trait: 'အပြောင်းအလဲများပြီး လွတ်လပ်မှုကို ကြိုက်တတ်သည်၊ ခရီးသွားလာခြင်းဖြင့် အောင်မြင်တတ်သည်။' },
    2: { name: 'မရဏ (Marana)', trait: 'သည်းခံနိုင်စွမ်းမြင့်မားပြီး အခက်အခဲများကို ကိုယ်တိုင်ကြိုးစားမှုဖြင့် တွန်းလှန်နိုင်သူဖြစ်သည်။' },
    3: { name: 'အထွန်း (Ahtun)', trait: 'ထွန်းတောက်အောင်မြင်လွယ်ပြီး လူချစ်လူခင်ပေါများကာ ပညာရေး/အနုပညာ အထူးထူးချွန်သည်။' },
    4: { name: 'သိုက် (Thike)', trait: 'စီးပွားဥစ္စာ ရှာဖွေစုဆောင်းတတ်ပြီး မိသားစုဆွေမျိုးအပေါ် သံယောဇဉ်ကြီးမားသူဖြစ်သည်။' },
    5: { name: 'ရာဇ (Raza)', trait: 'ဩဇာအာဏာရှိပြီး ခေါင်းဆောင်နိုင်စွမ်း မြင့်မားသည်၊ လူအများ လေးစားကြည်ညိုခံရသည်။' },
    6: { name: 'ပုတိ (Puti)', trait: 'စိတ်ထားနူးညံ့ပြီး မေတ္တာတရားကြီးမားသည်၊ ကုသိုလ်တရားကို အလေးထားသူဖြစ်သည်။' },
    7: { name: 'အဓိပတိ (Adhipati)', trait: 'ထိပ်တန်းခေါင်းဆောင်၊ မွန်မြတ်သော စိတ်ဓာတ်ရှိပြီး အများအကျိုးကို ရှေးရှုဆောင်ရွက်တတ်သည်။' },
  };

  const house = houses[rem] || houses[1];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-xl font-bold text-amber-300">☸️ မြန်မာ့ရိုးရာ မဟာဘုတ် တွက်စက်</h2>
        <label className="text-xs text-slate-300 block">မွေးသက္ကရာဇ် (အေဒီနှစ်) ထည့်ပါ -</label>
        <input
          type="number"
          value={adYear}
          onChange={(e) => setAdYear(parseInt(e.target.value, 10) || 0)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
        />
        <p className="text-xs text-amber-400 font-mono">မြန်မာနှစ်: {myYear} (၇ ဖြင့်စား၍ အကြွင်းရှာသည်)</p>
      </div>

      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-3">
        <span className="text-xs text-amber-400 font-semibold">မဟာဘုတ် အကြွင်း</span>
        <h3 className="text-2xl font-bold text-white">{rem} ကြွင်း - <span className="text-amber-300">{house.name}</span></h3>
        <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/60 p-4 rounded-xl border border-slate-800 leading-relaxed">{house.trait}</p>
      </div>
    </div>
  );
}

// ==========================================
// MODULE: TAROT
// ==========================================
function TarotModule({ showToast }) {
  const [card, setCard] = useState(null);

  return (
    <div className="space-y-6 text-center max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold text-white">🃏 တစ်နေ့တာ တာရော့ကတ်</h2>
        <p className="text-xs text-slate-400 mt-1">အာရုံပြုကာ ကတ်တစ်ပြားကို ရွေးချယ်ပါ</p>
      </div>

      {!card ? (
        <div className="grid grid-cols-3 gap-3 py-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              onClick={() => { setCard(TAROT_CARDS[i]); showToast('ကတ်ကို ဖွင့်လှစ်လိုက်ပါပြီ! ✨'); }}
              className="aspect-[2/3] rounded-2xl bg-gradient-to-b from-amber-600 to-slate-950 border border-amber-400/40 p-2 flex flex-col items-center justify-center cursor-pointer hover:-translate-y-2 transition-all"
            >
              <span className="text-3xl">✨</span>
              <span className="text-[10px] text-amber-300 mt-2 font-mono">ကတ်လှန်ပါ</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <span className="text-5xl">{card.iconText}</span>
          <h3 className="text-xl font-bold text-amber-300">{card.name}</h3>
          <p className="text-xs font-semibold text-emerald-400">{card.burmeseName}</p>
          <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/70 p-4 rounded-xl border border-slate-800 leading-relaxed">{card.message}</p>
          <button onClick={() => setCard(null)} className="w-full py-2 bg-slate-800 text-amber-300 rounded-xl text-xs font-bold">အခြားတစ်ပြား ရွေးမည် 🔄</button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MODULE: MOLE ASTROLOGY
// ==========================================
function MoleModule({ showToast }) {
  const [section, setSection] = useState('face');
  const [mole, setMole] = useState(MOLE_DATA.face[0]);
  const list = section === 'face' ? MOLE_DATA.face : MOLE_DATA.body;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => { setSection('face'); setMole(MOLE_DATA.face[0]); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${section === 'face' ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
        >
          👤 မျက်နှာပေါ်ရှိ မှည့်များ
        </button>
        <button
          onClick={() => { setSection('body'); setMole(MOLE_DATA.body[0]); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${section === 'body' ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
        >
          🧍 ခန္ဓာကိုယ် အစိတ်အပိုင်း
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          {list.map((m) => (
            <button
              key={m.id}
              onClick={() => setMole(m)}
              className={`w-full p-3 rounded-xl text-left text-xs font-semibold ${mole.id === m.id ? 'bg-amber-500/20 text-amber-300 border border-amber-400' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
            >
              {m.region}
            </button>
          ))}
        </div>
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-base font-bold text-amber-300">{mole.title}</h3>
          <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/60 p-4 rounded-xl border border-slate-800 leading-relaxed">{mole.meaning}</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-slate-400 block">စီးပွား:</span><span className="text-amber-300 font-bold">{mole.wealth}</span></div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-slate-400 block">အချစ်ရေး:</span><span className="text-rose-300 font-bold">{mole.love}</span></div>
          </div>
          <p className="text-xs text-amber-400/90 bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">💡 <strong>အကြံပြုချက်:</strong> {mole.advice}</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MODULE: PHONE NUMEROLOGY
// ==========================================
function PhoneNumerologyModule({ showToast }) {
  const [num, setNum] = useState('09791234567');
  const digits = num.replace(/\D/g, '');
  let sum = 0;
  for (let c of digits) sum += parseInt(c, 10);
  let root = sum;
  while (root > 9) {
    let t = 0;
    for (let c of root.toString()) t += parseInt(c, 10);
    root = t;
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-xl font-bold text-white">📱 ဖုန်းနံပါတ် ဓာတ်ဟောစနစ်</h2>
        <input
          type="text"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="09xxxxxxxxx"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
        />
        <p className="text-xs text-slate-400">ပေါင်းလဒ်: <span className="text-amber-400 font-bold font-mono">{sum}</span> → ဓာတ်နံပါတ်: <span className="text-emerald-400 font-bold font-mono text-sm">[{root || 1}]</span></p>
      </div>

      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-3">
        <h3 className="text-lg font-bold text-amber-300">ဓာတ်နံပါတ် [{root || 1}] ၏ သဘော</h3>
        <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/60 p-4 rounded-xl border border-slate-800 leading-relaxed">
          {root === 4 ? 'အရောင်းအဝယ် စကားပြောအလုပ်များ အထူးစွံပြီး ငွေကြေးစီးဆင်းမှု ကောင်းမွန်စေသည်။' : 'ခေါင်းဆောင်မှုနှင့် စီးပွားရေးလုပ်ငန်းရှင်များအတွက် အထူးသင့်လျော်သော စွမ်းအင်ရှိသည်။'}
        </p>
      </div>
    </div>
  );
}

// ==========================================
// MODULE: ZODIAC LOVE MATCH
// ==========================================
function ZodiacLoveModule({ showToast }) {
  const [z1, setZ1] = useState('aries');
  const [z2, setZ2] = useState('leo');

  const sign1 = ZODIAC_SIGNS.find((s) => s.id === z1) || ZODIAC_SIGNS[0];
  const sign2 = ZODIAC_SIGNS.find((s) => s.id === z2) || ZODIAC_SIGNS[4];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <label className="text-xs text-rose-300 font-bold block mb-1">၁။ သင့်ရာသီခွင် -</label>
          <select value={z1} onChange={(e) => setZ1(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white">
            {ZODIAC_SIGNS.map(z => <option key={z.id} value={z.id}>{z.icon} {z.name}</option>)}
          </select>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <label className="text-xs text-pink-300 font-bold block mb-1">၂။ ချစ်သူ့ရာသီခွင် -</label>
          <select value={z2} onChange={(e) => setZ2(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white">
            {ZODIAC_SIGNS.map(z => <option key={z.id} value={z.id}>{z.icon} {z.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-slate-900 border border-pink-500/30 rounded-2xl p-6 text-center space-y-3">
        <div className="text-4xl text-rose-400 font-mono font-bold">88%</div>
        <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/60 p-4 rounded-xl border border-slate-800 leading-relaxed max-w-lg mx-auto">
          {sign1.name} နှင့် {sign2.name} တွဲဖက်မှုသည် တစ်ဦးနှင့်တစ်ဦး မျှဝေနားလည်နိုင်စွမ်းရှိပြီး ရေရှည်ခိုင်မြဲသော အချစ်ရေးဖြစ်စေပါသည်။
        </p>
      </div>
    </div>
  );
}