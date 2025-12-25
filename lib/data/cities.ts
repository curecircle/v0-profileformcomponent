export interface City {
  id: string
  state_id: string
  country_id: string
  name_en: string
  name_fa: string
}

export const cities: City[] = [
  // Tehran province cities
  {
    id: "tehran-city-001",
    state_id: "tehran-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Tehran",
    name_fa: "تهران",
  },
  {
    id: "rey-city-001",
    state_id: "tehran-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Rey",
    name_fa: "ری",
  },
  {
    id: "varamin-city-001",
    state_id: "tehran-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Varamin",
    name_fa: "ورامین",
  },
  {
    id: "shahr-rey-001",
    state_id: "tehran-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Shahr-e-Rey",
    name_fa: "شهر ری",
  },
  // Alborz province cities
  {
    id: "karaj-city-001",
    state_id: "alborz-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Karaj",
    name_fa: "کرج",
  },
  {
    id: "fardis-city-001",
    state_id: "alborz-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Fardis",
    name_fa: "فردیس",
  },
  // Isfahan province cities
  {
    id: "isfahan-city-001",
    state_id: "isfahan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Isfahan",
    name_fa: "اصفهان",
  },
  {
    id: "kashan-city-001",
    state_id: "isfahan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Kashan",
    name_fa: "کاشان",
  },
  {
    id: "najafabad-city-001",
    state_id: "isfahan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Najafabad",
    name_fa: "نجف‌آباد",
  },
  // Fars province cities
  {
    id: "shiraz-city-001",
    state_id: "fars-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Shiraz",
    name_fa: "شیراز",
  },
  {
    id: "marvdasht-city-001",
    state_id: "fars-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Marvdasht",
    name_fa: "مرودشت",
  },
  // Razavi Khorasan cities
  {
    id: "mashhad-city-001",
    state_id: "khorasan-razavi-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Mashhad",
    name_fa: "مشهد",
  },
  {
    id: "neyshabur-city-001",
    state_id: "khorasan-razavi-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Neyshabur",
    name_fa: "نیشابور",
  },
  // East Azerbaijan cities
  {
    id: "tabriz-city-001",
    state_id: "east-azerbaijan-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Tabriz",
    name_fa: "تبریز",
  },
  {
    id: "maragheh-city-001",
    state_id: "east-azerbaijan-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Maragheh",
    name_fa: "مراغه",
  },
  // West Azerbaijan cities
  {
    id: "urmia-city-001",
    state_id: "west-azerbaijan-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Urmia",
    name_fa: "ارومیه",
  },
  // Khuzestan cities
  {
    id: "ahvaz-city-001",
    state_id: "khuzestan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Ahvaz",
    name_fa: "اهواز",
  },
  {
    id: "abadan-city-001",
    state_id: "khuzestan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Abadan",
    name_fa: "آبادان",
  },
  // Kerman cities
  {
    id: "kerman-city-001",
    state_id: "kerman-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Kerman",
    name_fa: "کرمان",
  },
  {
    id: "rafsanjan-city-001",
    state_id: "kerman-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Rafsanjan",
    name_fa: "رفسنجان",
  },
  // Gilan cities
  {
    id: "rasht-city-001",
    state_id: "gilan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Rasht",
    name_fa: "رشت",
  },
  {
    id: "anzali-city-001",
    state_id: "gilan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Bandar Anzali",
    name_fa: "بندر انزلی",
  },
  // Mazandaran cities
  {
    id: "sari-city-001",
    state_id: "00438b91-2284-515a-a11f-4d73e0f3a50e",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Sari",
    name_fa: "ساری",
  },
  {
    id: "babol-city-001",
    state_id: "00438b91-2284-515a-a11f-4d73e0f3a50e",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Babol",
    name_fa: "بابل",
  },
  {
    id: "amol-city-001",
    state_id: "00438b91-2284-515a-a11f-4d73e0f3a50e",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Amol",
    name_fa: "آمل",
  },
  // Qom cities
  {
    id: "qom-city-001",
    state_id: "qom-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Qom",
    name_fa: "قم",
  },
  // Yazd cities
  {
    id: "yazd-city-001",
    state_id: "yazd-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Yazd",
    name_fa: "یزد",
  },
  // Ardabil cities
  {
    id: "ardabil-city-001",
    state_id: "ardabil-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Ardabil",
    name_fa: "اردبیل",
  },
  // Kurdistan cities
  {
    id: "sanandaj-city-001",
    state_id: "kurdistan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Sanandaj",
    name_fa: "سنندج",
  },
  // Hamadan cities
  {
    id: "hamadan-city-001",
    state_id: "hamedan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Hamadan",
    name_fa: "همدان",
  },
  // Kermanshah cities
  {
    id: "kermanshah-city-001",
    state_id: "kermanshah-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Kermanshah",
    name_fa: "کرمانشاه",
  },
  // Lorestan cities
  {
    id: "khorramabad-city-001",
    state_id: "lorestan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Khorramabad",
    name_fa: "خرم‌آباد",
  },
  // Hormozgan cities
  {
    id: "bandarabbas-city-001",
    state_id: "hormozgan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Bandar Abbas",
    name_fa: "بندرعباس",
  },
  // Bushehr cities
  {
    id: "bushehr-city-001",
    state_id: "bushehr-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Bushehr",
    name_fa: "بوشهر",
  },
  // Zanjan cities
  {
    id: "zanjan-city-001",
    state_id: "zanjan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Zanjan",
    name_fa: "زنجان",
  },
  // Semnan cities
  {
    id: "semnan-city-001",
    state_id: "semnan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Semnan",
    name_fa: "سمنان",
  },
  // Golestan cities
  {
    id: "gorgan-city-001",
    state_id: "golestan-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Gorgan",
    name_fa: "گرگان",
  },
  // Qazvin cities
  {
    id: "qazvin-city-001",
    state_id: "qazvin-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Qazvin",
    name_fa: "قزوین",
  },
  // Markazi cities
  {
    id: "arak-city-001",
    state_id: "markazi-state-001",
    country_id: "56de7c54-4780-5629-bf64-b3430636dd36",
    name_en: "Arak",
    name_fa: "اراک",
  },
  // Afghanistan cities
  {
    id: "fayzabad-city-001",
    state_id: "abd756a5-df12-535f-a2b5-f53d9e1ef188",
    country_id: "ae1bb592-3dcb-55e5-aa98-da9c1b76c0dc",
    name_en: "Fayzabad",
    name_fa: "فیض آباد",
  },
  {
    id: "kabul-city-001",
    state_id: "kabul-state-001",
    country_id: "ae1bb592-3dcb-55e5-aa98-da9c1b76c0dc",
    name_en: "Kabul",
    name_fa: "کابل",
  },
  {
    id: "herat-city-001",
    state_id: "herat-state-001",
    country_id: "ae1bb592-3dcb-55e5-aa98-da9c1b76c0dc",
    name_en: "Herat",
    name_fa: "هرات",
  },
  {
    id: "mazare-city-001",
    state_id: "balkh-state-001",
    country_id: "ae1bb592-3dcb-55e5-aa98-da9c1b76c0dc",
    name_en: "Mazar-i-Sharif",
    name_fa: "مزار شریف",
  },
  {
    id: "kandahar-city-001",
    state_id: "kandahar-state-001",
    country_id: "ae1bb592-3dcb-55e5-aa98-da9c1b76c0dc",
    name_en: "Kandahar",
    name_fa: "قندهار",
  },
  // Turkey cities
  {
    id: "istanbul-city-001",
    state_id: "istanbul-state-001",
    country_id: "cdb1b52b-502e-5262-a78c-1352b3730fab",
    name_en: "Istanbul",
    name_fa: "استانبول",
  },
  {
    id: "ankara-city-001",
    state_id: "ankara-state-001",
    country_id: "cdb1b52b-502e-5262-a78c-1352b3730fab",
    name_en: "Ankara",
    name_fa: "آنکارا",
  },
  {
    id: "izmir-city-001",
    state_id: "izmir-state-001",
    country_id: "cdb1b52b-502e-5262-a78c-1352b3730fab",
    name_en: "Izmir",
    name_fa: "ازمیر",
  },
  {
    id: "antalya-city-001",
    state_id: "antalya-state-001",
    country_id: "cdb1b52b-502e-5262-a78c-1352b3730fab",
    name_en: "Antalya",
    name_fa: "آنتالیا",
  },
  // UAE cities
  {
    id: "dubai-city-001",
    state_id: "dubai-state-001",
    country_id: "a8d6e5c4-b3a2-4f1e-9c8d-7b6a5e4d3c2b",
    name_en: "Dubai",
    name_fa: "دبی",
  },
  {
    id: "abudhabi-city-001",
    state_id: "abudhabi-state-001",
    country_id: "a8d6e5c4-b3a2-4f1e-9c8d-7b6a5e4d3c2b",
    name_en: "Abu Dhabi",
    name_fa: "ابوظبی",
  },
  {
    id: "sharjah-city-001",
    state_id: "sharjah-state-001",
    country_id: "a8d6e5c4-b3a2-4f1e-9c8d-7b6a5e4d3c2b",
    name_en: "Sharjah",
    name_fa: "شارجه",
  },
  // USA cities
  {
    id: "losangeles-city-001",
    state_id: "california-state-001",
    country_id: "i6l4m3k2-j1i0-2n9m-7k6l-5j4i3h2g1f0e",
    name_en: "Los Angeles",
    name_fa: "لس آنجلس",
  },
  {
    id: "sanfrancisco-city-001",
    state_id: "california-state-001",
    country_id: "i6l4m3k2-j1i0-2n9m-7k6l-5j4i3h2g1f0e",
    name_en: "San Francisco",
    name_fa: "سان فرانسیسکو",
  },
  {
    id: "sandiego-city-001",
    state_id: "california-state-001",
    country_id: "i6l4m3k2-j1i0-2n9m-7k6l-5j4i3h2g1f0e",
    name_en: "San Diego",
    name_fa: "سن دیگو",
  },
  {
    id: "newyork-city-001",
    state_id: "newyork-state-001",
    country_id: "i6l4m3k2-j1i0-2n9m-7k6l-5j4i3h2g1f0e",
    name_en: "New York City",
    name_fa: "نیویورک",
  },
  {
    id: "houston-city-001",
    state_id: "texas-state-001",
    country_id: "i6l4m3k2-j1i0-2n9m-7k6l-5j4i3h2g1f0e",
    name_en: "Houston",
    name_fa: "هیوستون",
  },
  {
    id: "dallas-city-001",
    state_id: "texas-state-001",
    country_id: "i6l4m3k2-j1i0-2n9m-7k6l-5j4i3h2g1f0e",
    name_en: "Dallas",
    name_fa: "دالاس",
  },
  {
    id: "miami-city-001",
    state_id: "florida-state-001",
    country_id: "i6l4m3k2-j1i0-2n9m-7k6l-5j4i3h2g1f0e",
    name_en: "Miami",
    name_fa: "میامی",
  },
  {
    id: "seattle-city-001",
    state_id: "washington-state-001",
    country_id: "i6l4m3k2-j1i0-2n9m-7k6l-5j4i3h2g1f0e",
    name_en: "Seattle",
    name_fa: "سیاتل",
  },
  // Germany cities
  {
    id: "berlin-city-001",
    state_id: "berlin-state-001",
    country_id: "e2h0i9g8-f7e6-8j5i-3g2h-1f0e9d8c7b6a",
    name_en: "Berlin",
    name_fa: "برلین",
  },
  {
    id: "munich-city-001",
    state_id: "bavaria-state-001",
    country_id: "e2h0i9g8-f7e6-8j5i-3g2h-1f0e9d8c7b6a",
    name_en: "Munich",
    name_fa: "مونیخ",
  },
  {
    id: "hamburg-city-001",
    state_id: "hamburg-state-001",
    country_id: "e2h0i9g8-f7e6-8j5i-3g2h-1f0e9d8c7b6a",
    name_en: "Hamburg",
    name_fa: "هامبورگ",
  },
  // UK cities
  {
    id: "london-city-001",
    state_id: "england-state-001",
    country_id: "f3i1j0h9-g8f7-9k6j-4h3i-2g1f0e9d8c7b",
    name_en: "London",
    name_fa: "لندن",
  },
  {
    id: "manchester-city-001",
    state_id: "england-state-001",
    country_id: "f3i1j0h9-g8f7-9k6j-4h3i-2g1f0e9d8c7b",
    name_en: "Manchester",
    name_fa: "منچستر",
  },
  {
    id: "birmingham-city-001",
    state_id: "england-state-001",
    country_id: "f3i1j0h9-g8f7-9k6j-4h3i-2g1f0e9d8c7b",
    name_en: "Birmingham",
    name_fa: "بیرمنگام",
  },
  {
    id: "edinburgh-city-001",
    state_id: "scotland-state-001",
    country_id: "f3i1j0h9-g8f7-9k6j-4h3i-2g1f0e9d8c7b",
    name_en: "Edinburgh",
    name_fa: "ادینبرا",
  },
  {
    id: "cardiff-city-001",
    state_id: "wales-state-001",
    country_id: "f3i1j0h9-g8f7-9k6j-4h3i-2g1f0e9d8c7b",
    name_en: "Cardiff",
    name_fa: "کاردیف",
  },
  // Canada cities
  {
    id: "toronto-city-001",
    state_id: "ontario-state-001",
    country_id: "h5k3l2j1-i0h9-1m8l-6j5k-4i3h2g1f0e9d",
    name_en: "Toronto",
    name_fa: "تورنتو",
  },
  {
    id: "ottawa-city-001",
    state_id: "ontario-state-001",
    country_id: "h5k3l2j1-i0h9-1m8l-6j5k-4i3h2g1f0e9d",
    name_en: "Ottawa",
    name_fa: "اتاوا",
  },
  {
    id: "montreal-city-001",
    state_id: "quebec-state-001",
    country_id: "h5k3l2j1-i0h9-1m8l-6j5k-4i3h2g1f0e9d",
    name_en: "Montreal",
    name_fa: "مونترال",
  },
  {
    id: "vancouver-city-001",
    state_id: "bc-state-001",
    country_id: "h5k3l2j1-i0h9-1m8l-6j5k-4i3h2g1f0e9d",
    name_en: "Vancouver",
    name_fa: "ونکوور",
  },
  // France cities
  {
    id: "paris-city-001",
    state_id: "paris-state-001",
    country_id: "g4j2k1i0-h9g8-0l7k-5i4j-3h2g1f0e9d8c",
    name_en: "Paris",
    name_fa: "پاریس",
  },
  {
    id: "marseille-city-001",
    state_id: "provence-state-001",
    country_id: "g4j2k1i0-h9g8-0l7k-5i4j-3h2g1f0e9d8c",
    name_en: "Marseille",
    name_fa: "مارسی",
  },
  // Australia cities
  {
    id: "sydney-city-001",
    state_id: "nsw-state-001",
    country_id: "j7m5n4l3-k2j1-3o0n-8l7m-6k5j4i3h2g1f",
    name_en: "Sydney",
    name_fa: "سیدنی",
  },
  {
    id: "melbourne-city-001",
    state_id: "victoria-state-001",
    country_id: "j7m5n4l3-k2j1-3o0n-8l7m-6k5j4i3h2g1f",
    name_en: "Melbourne",
    name_fa: "ملبورن",
  },
  // Russia cities
  {
    id: "moscow-city-001",
    state_id: "moscow-state-001",
    country_id: "m0p8q7o6-n5m4-6r3q-1o0p-9n8m7l6k5j4i",
    name_en: "Moscow",
    name_fa: "مسکو",
  },
  {
    id: "stpetersburg-city-001",
    state_id: "stp-state-001",
    country_id: "m0p8q7o6-n5m4-6r3q-1o0p-9n8m7l6k5j4i",
    name_en: "Saint Petersburg",
    name_fa: "سن پترزبورگ",
  },
  // Iraq cities
  {
    id: "baghdad-city-001",
    state_id: "baghdad-state-001",
    country_id: "c0f8g7e6-d5c4-6h3g-1e0f-9d8c7b6a5e4d",
    name_en: "Baghdad",
    name_fa: "بغداد",
  },
  {
    id: "basra-city-001",
    state_id: "basra-state-001",
    country_id: "c0f8g7e6-d5c4-6h3g-1e0f-9d8c7b6a5e4d",
    name_en: "Basra",
    name_fa: "بصره",
  },
  {
    id: "erbil-city-001",
    state_id: "erbil-state-001",
    country_id: "c0f8g7e6-d5c4-6h3g-1e0f-9d8c7b6a5e4d",
    name_en: "Erbil",
    name_fa: "اربیل",
  },
  // Saudi Arabia cities
  {
    id: "riyadh-city-001",
    state_id: "riyadh-state-001",
    country_id: "b9e7f6d5-c4b3-5g2f-0d9e-8c7b6a5e4d3c",
    name_en: "Riyadh",
    name_fa: "ریاض",
  },
  {
    id: "mecca-city-001",
    state_id: "makkah-state-001",
    country_id: "b9e7f6d5-c4b3-5g2f-0d9e-8c7b6a5e4d3c",
    name_en: "Mecca",
    name_fa: "مکه",
  },
  {
    id: "jeddah-city-001",
    state_id: "makkah-state-001",
    country_id: "b9e7f6d5-c4b3-5g2f-0d9e-8c7b6a5e4d3c",
    name_en: "Jeddah",
    name_fa: "جده",
  },
].sort((a, b) => a.name_en.localeCompare(b.name_en))

export function getCitiesByState(stateId: string) {
  return cities.filter((c) => c.state_id === stateId).sort((a, b) => a.name_en.localeCompare(b.name_en))
}

export function getCityById(id: string) {
  return cities.find((c) => c.id === id)
}
