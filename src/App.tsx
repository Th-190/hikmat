/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Camera, 
  Award, 
  BookOpen, 
  Compass, 
  Image as ImageIcon, 
  Mail, 
  Globe, 
  Menu, 
  X, 
  ExternalLink, 
  ArrowUpRight, 
  CheckCircle2, 
  Send,
  MapPin,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

// Images generated via generate_image protocol
const IMAGES = {
  heroBanner: '/src/assets/images/hero_heritage_banner_1793636781974.jpg',
  wikiAward: '/src/assets/images/wiki_loves_monuments_award_1793636782103.jpg',
  archDoc: '/src/assets/images/architectural_documentation_1793636782272.jpg',
  culturalHeritage: '/src/assets/images/cultural_heritage_1793636781442.jpg',
  visualStory: '/src/assets/images/visual_storytelling_1793636782098.jpg',
};

type Language = 'ar' | 'en';

interface WorkItem {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  image: string;
  date: string;
  descriptionAr: string;
  descriptionEn: string;
  locationAr: string;
  locationEn: string;
}

const SELECTED_WORKS: WorkItem[] = [
  {
    id: '1',
    titleAr: 'أقواس التراث المعماري العراقي',
    titleEn: 'Iraqi Architectural Heritage Arches',
    categoryAr: 'التصوير المعماري',
    categoryEn: 'Architectural Photography',
    image: IMAGES.wikiAward,
    date: '2025',
    descriptionAr: 'توثيق بصري دقيق للأقواس التاريخية والزخارف الآجرية التي تميز التراث المعماري الأصيل في العراق.',
    descriptionEn: 'Detailed visual documentation of historical arches and brick motifs characterizing authentic Iraqi architectural heritage.',
    locationAr: 'العراق',
    locationEn: 'Iraq'
  },
  {
    id: '2',
    titleAr: 'أبواب وبوابات التاريخ',
    titleEn: 'Gates of History',
    categoryAr: 'التوثيق التاريخي',
    categoryEn: 'Historical Documentation',
    image: IMAGES.archDoc,
    date: '2024 - 2025',
    descriptionAr: 'دراسة بصرية بالأسود والأبيض لبوابات الحصون والقلاع القديمة، مستكشفة تباين الظلال على الأحجار العتيقة.',
    descriptionEn: 'Black-and-white visual study of ancient fortress gates, exploring the interplay of shadows on aged stone masonry.',
    locationAr: 'المواقع التراثية',
    locationEn: 'Heritage Sites'
  },
  {
    id: '3',
    titleAr: 'مفردات الذاكرة الثقافية',
    titleEn: 'Cultural Memory Artifacts',
    categoryAr: 'التراث الثقافي',
    categoryEn: 'Cultural Heritage',
    image: IMAGES.culturalHeritage,
    date: '2025',
    descriptionAr: 'سرد بصري للأدوات التراثية والمقتنيات التقليدية التي تحمل عبق التاريخ وتفاصيل الحياة اليومية للأسلاف.',
    descriptionEn: 'Visual storytelling of traditional heritage artifacts carrying the essence of history and daily ancestral life.',
    locationAr: 'المتحف التراثي',
    locationEn: 'Heritage Museum'
  },
  {
    id: '4',
    titleAr: 'حكايات الأزقة القديمة',
    titleEn: 'Tales of Ancient Alleys',
    categoryAr: 'السرد البصري',
    categoryEn: 'Visual Storytelling',
    image: IMAGES.visualStory,
    date: '2024',
    descriptionAr: 'التقاط تفاصيل الحياة في الأزقة التاريخية مع غروب الشمس، حيث تندمج الإضاءة الدافئة مع جدران الطين والآجر.',
    descriptionEn: 'Capturing life in historic alleyways at sunset, where warm ambient lighting merges with mudbrick and clay walls.',
    locationAr: 'الأحياء التاريخية',
    locationEn: 'Historic Quarters'
  },
  {
    id: '5',
    titleAr: 'شموخ الآثار والتاريخ',
    titleEn: 'Majesty of Monuments',
    categoryAr: 'التصوير الفني',
    categoryEn: 'Artistic Photography',
    image: IMAGES.heroBanner,
    date: '2025',
    descriptionAr: 'مشهد سينمائي واسع لواحدة من أبرز الحصون التاريخية العراقية عند شروق الشمس، مع عناية فائقة بالتفاصيل المكانية.',
    descriptionEn: 'Cinematic wide-angle view of a prominent Iraqi historical fortress at sunrise, with meticulous attention to spatial detail.',
    locationAr: 'المواقع الأثرية في العراق',
    locationEn: 'Archaeological Sites in Iraq'
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsContactOpen(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  const filteredWorks = activeCategory === 'all' 
    ? SELECTED_WORKS 
    : SELECTED_WORKS.filter(w => w.categoryEn.toLowerCase().includes(activeCategory.toLowerCase()) || w.categoryAr.includes(activeCategory));

  return (
    <div className={`min-h-screen bg-[#0b0b0b] text-[#f7f5f0] selection:bg-[#c5a880]/30 selection:text-white ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* HEADER / TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#0b0b0b]/90 backdrop-blur-md border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="flex flex-col">
            <span className="font-serif-heading text-lg md:text-xl font-bold tracking-tight text-[#f7f5f0] whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'حكمت العياشي' : 'HIKMAT AL-AYASHI'}
            </span>
            <span className="text-[10px] tracking-widest text-[#8a8a8a] uppercase whitespace-nowrap">
              {lang === 'ar' ? 'توثيق بصري وتراث' : 'Visual Storyteller'}
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#b3b3b3]">
            <a href="#achievement" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'الإنجاز' : 'Achievement'}
            </a>
            <a href="#about" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'من أنا' : 'About'}
            </a>
            <a href="#photography" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'التصوير والتوثيق' : 'Photography'}
            </a>
            <a href="#interests" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'مجالات الاهتمام' : 'Interests'}
            </a>
            <a href="#works" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'الأعمال الم مختارة' : 'Selected Works'}
            </a>
            <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact'}
            </a>
          </nav>

          {/* Zone 3: Primary Action & Language Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#c5a880] border border-[#c5a880]/30 rounded-full hover:bg-[#c5a880]/10 transition-colors whitespace-nowrap"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-medium text-[#121212] bg-[#f7f5f0] rounded-full hover:bg-[#c5a880] hover:text-white transition-all whitespace-nowrap shadow-sm"
            >
              <span>{lang === 'ar' ? 'تواصل معي' : 'Get in Touch'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#f7f5f0]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#161616] border-b border-[#262626] px-6 py-6 flex flex-col gap-4 shadow-2xl">
            <a href="#achievement" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#f7f5f0] hover:text-[#c5a880]">
              {lang === 'ar' ? 'الإنجاز' : 'Achievement'}
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#f7f5f0] hover:text-[#c5a880]">
              {lang === 'ar' ? 'من أنا' : 'About'}
            </a>
            <a href="#photography" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#f7f5f0] hover:text-[#c5a880]">
              {lang === 'ar' ? 'التصوير والتوثيق' : 'Photography'}
            </a>
            <a href="#interests" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#f7f5f0] hover:text-[#c5a880]">
              {lang === 'ar' ? 'مجالات الاهتمام' : 'Interests'}
            </a>
            <a href="#works" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#f7f5f0] hover:text-[#c5a880]">
              {lang === 'ar' ? 'الأعمال المختارة' : 'Selected Works'}
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-base text-[#f7f5f0] hover:text-[#c5a880]">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact'}
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); setIsContactOpen(true); }}
              className="mt-2 w-full py-3 text-center text-sm font-medium text-[#121212] bg-[#f7f5f0] rounded-lg"
            >
              {lang === 'ar' ? 'تواصل معي' : 'Get in Touch'}
            </button>
          </div>
        )}
      </header>

      {/* SECTION 01 — HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-6">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroBanner}
            alt="Hero Cinematic Heritage"
            className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] scale-105 transform transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1c]/80 backdrop-blur-md border border-[#333333] mb-8 text-xs tracking-wider text-[#c5a880] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'مصور وموثق التراث الثقافي' : 'Photographer & Cultural Heritage Documentarian'}</span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f7f5f0] mb-6 leading-[1.1]">
            {lang === 'ar' ? (
              <>حكمت العياشي<span className="block text-2xl sm:text-4xl mt-3 font-sans font-light text-[#c5a880]">«أوثّق التفاصيل، وأحفظ الحكايات.»</span></>
            ) : (
              <>HIKMAT AL-AYASHI<span className="block text-2xl sm:text-4xl mt-3 font-sans font-light text-[#c5a880]">"I document the details, and preserve the stories."</span></>
            )}
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-[#b3b3b3] font-light leading-relaxed mb-10 text-balance">
            {lang === 'ar' 
              ? 'أنا حكمت العياشي، مهتم بالتصوير الفوتوغرافي والتوثيق الثقافي والإبداع البصري. أبحث عن التفاصيل التي لا يلاحظها الجميع، وأحاول تحويلها إلى أعمال تحفظ جمال المكان وقيمته.'
              : 'I am Hikmat Al-Ayashi, passionate about photography, cultural documentation, and visual storytelling. I seek out details overlooked by many, turning them into works that preserve the beauty and value of place.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#works"
              className="px-8 py-3.5 text-sm font-medium text-[#121212] bg-[#f7f5f0] rounded-full hover:bg-[#c5a880] hover:text-white transition-all shadow-lg flex items-center gap-2"
            >
              <span>{lang === 'ar' ? 'اكتشف أعمالي' : 'Discover My Works'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 text-sm font-medium text-[#f7f5f0] bg-[#1c1c1c]/80 hover:bg-[#262626] border border-[#333333] rounded-full transition-all backdrop-blur-md"
            >
              <span>{lang === 'ar' ? 'تعرف عليّ' : 'About Me'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 02 — FEATURED ACHIEVEMENT */}
      <section id="achievement" className="py-24 px-6 bg-[#101010] border-t border-b border-[#222222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
              {lang === 'ar' ? 'اعتراف دولي ووطني' : 'Verified Distinction'}
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#f7f5f0] mt-2">
              {lang === 'ar' ? 'إنجاز يستحق التوثيق' : 'An Achievement Worth Documenting'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#161616] border border-[#262626] rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="lg:col-span-6 relative group overflow-hidden rounded-2xl">
              <img
                src={IMAGES.wikiAward}
                alt="Wiki Loves Monuments Iraq 2025 Winner"
                className="w-full h-[380px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-[#121212]/90 backdrop-blur-md border border-[#c5a880]/40 px-4 py-2 rounded-full text-xs text-[#c5a880] font-semibold flex items-center gap-2 shadow-lg">
                <Award className="w-4 h-4" />
                <span>{lang === 'ar' ? 'المركز الأول — 2025' : 'First Place — 2025'}</span>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs text-[#8a8a8a] mb-3">
                <span>{lang === 'ar' ? 'مسابقة دولية' : 'International Competition'}</span>
                <span>·</span>
                <span>Wiki Loves Monuments Iraq 2025</span>
              </div>

              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#f7f5f0] mb-4 leading-snug">
                {lang === 'ar' ? 'المركز الأول بين الفائزين في مسابقة ويكيبيديا تحب المعالم العراق 2025' : 'First Place Winner in Wiki Loves Monuments Iraq 2025'}
              </h3>

              <p className="text-[#b3b3b3] text-base leading-relaxed mb-8">
                {lang === 'ar' 
                  ? 'تتويجاً للجهود المستمرة في توثيق التراث المعماري والتاريخي العريق في العراق عبر العدسة الفوتوغرافية، حصدت المركز الأول في النسخة الوطنية من مسابقة "ويكيبيديا تحب المعالم" لعام 2025، لتوثيق وحماية الهوية البصرية للمعالم الأثرية.'
                  : 'Recognizing continuous dedication to documenting Iraq’s rich architectural and historical heritage through the camera lens, securing First Place in the national edition of Wiki Loves Monuments Iraq 2025.'}
              </p>

              <div className="flex items-center gap-6">
                <a
                  href="https://commons.wikimedia.org/wiki/Main_Page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#c5a880] hover:text-white transition-colors"
                >
                  <span>{lang === 'ar' ? 'زيارة صفحة المسابقة الرسمية' : 'Visit Official Competition Page'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — ABOUT ME */}
      <section id="about" className="py-28 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
            {lang === 'ar' ? 'الرؤية والرسالة' : 'Vision & Mission'}
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#f7f5f0] mt-2">
            {lang === 'ar' ? 'من أنا؟' : 'About Me'}
          </h2>
        </div>

        <div className="bg-[#141414] border border-[#222222] rounded-3xl p-8 sm:p-14 shadow-xl">
          <div className="prose prose-invert max-w-none text-lg text-[#d1d1d1] font-light leading-relaxed space-y-6 text-justify">
            {lang === 'ar' ? (
              <>
                <p>
                  «حكمت العياشي، مهتم بالتصوير الفوتوغرافي والتوثيق الثقافي، أجد في الصورة وسيلة للتعبير عن الجمال وحفظ الذاكرة وإبراز التفاصيل التي قد تمر دون أن يلاحظها أحد.»
                </p>
                <p>
                  «أهتم بتوثيق المعالم التاريخية والتراثية، واستكشاف العلاقة بين المكان والإنسان والتاريخ. أرى أن لكل موقع قصة تستحق أن تُروى، ولكل تفصيل قيمة تستحق أن تُحفظ.»
                </p>
                <p>
                  «أسعى إلى تطوير تجربتي الإبداعية وتوسيع أعمالي، لتكون مساهمة في حفظ الذاكرة البصرية والثقافية وإيصال جمال التراث إلى جمهور أوسع.»
                </p>
              </>
            ) : (
              <>
                <p>
                  "Hikmat Al-Ayashi, passionate about photography and cultural documentation. I find in photography a medium to express beauty, preserve memory, and highlight details that might otherwise go unnoticed."
                </p>
                <p>
                  "I focus on documenting historical and heritage landmarks, exploring the relationship between place, humanity, and history. I believe every location has a story waiting to be told, and every detail holds a value worth preserving."
                </p>
                <p>
                  "I strive to expand my creative experience and body of work, contributing to the preservation of visual and cultural memory while sharing the beauty of heritage with a broader audience."
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 04 — PHOTOGRAPHY & DOCUMENTATION */}
      <section id="photography" className="py-28 px-6 bg-[#101010] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
              {lang === 'ar' ? 'العدسة والموضوع' : 'Lens & Subject'}
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#f7f5f0] mt-2">
              {lang === 'ar' ? 'التصوير والتوثيق' : 'Photography & Documentation'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden group hover:border-[#c5a880]/50 transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={IMAGES.archDoc}
                  alt="Architectural Photography"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif-heading text-xl font-bold text-[#f7f5f0] mb-3">
                  {lang === 'ar' ? 'التصوير المعماري' : 'Architectural Photography'}
                </h3>
                <p className="text-sm text-[#9a9a9a] leading-relaxed">
                  {lang === 'ar'
                    ? 'إبراز جماليات التخطيط والهندسة التاريخية والزخارف العمرانية بدقة فنية عالية.'
                    : 'Highlighting the aesthetics of historical planning, engineering, and architectural motifs with high technical precision.'}
                </p>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden group hover:border-[#c5a880]/50 transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={IMAGES.wikiAward}
                  alt="Historical Documentation"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif-heading text-xl font-bold text-[#f7f5f0] mb-3">
                  {lang === 'ar' ? 'التوثيق التاريخي' : 'Historical Documentation'}
                </h3>
                <p className="text-sm text-[#9a9a9a] leading-relaxed">
                  {lang === 'ar'
                    ? 'تسجيل وحفظ القلاع والحصون والمواقع الأثرية لتوثيقها للأجيال القادمة.'
                    : 'Recording and preserving castles, fortresses, and archaeological sites for future generations.'}
                </p>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden group hover:border-[#c5a880]/50 transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={IMAGES.culturalHeritage}
                  alt="Cultural Heritage"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif-heading text-xl font-bold text-[#f7f5f0] mb-3">
                  {lang === 'ar' ? 'التراث الثقافي' : 'Cultural Heritage'}
                </h3>
                <p className="text-sm text-[#9a9a9a] leading-relaxed">
                  {lang === 'ar'
                    ? 'التركيز على العناصر التراثية والمقتنيات التقليدية التي تعكس عمق الهوية الثقافية.'
                    : 'Focusing on heritage elements and traditional items reflecting the depth of cultural identity.'}
                </p>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden group hover:border-[#c5a880]/50 transition-all flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={IMAGES.visualStory}
                  alt="Visual Storytelling"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif-heading text-xl font-bold text-[#f7f5f0] mb-3">
                  {lang === 'ar' ? 'السرد البصري' : 'Visual Storytelling'}
                </h3>
                <p className="text-sm text-[#9a9a9a] leading-relaxed">
                  {lang === 'ar'
                    ? 'صياغة حكايات متكاملة عبر الصور تروي تفاصيل المكان وأرواحه الكامنة.'
                    : 'Crafting cohesive tales through images that narrate the details of places and their latent spirits.'}
                </p>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden group hover:border-[#c5a880]/50 transition-all flex flex-col md:col-span-2 lg:col-span-2">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={IMAGES.heroBanner}
                  alt="Artistic Photography"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif-heading text-xl font-bold text-[#f7f5f0] mb-3">
                  {lang === 'ar' ? 'التصوير الفني' : 'Artistic Photography'}
                </h3>
                <p className="text-sm text-[#9a9a9a] leading-relaxed">
                  {lang === 'ar'
                    ? 'دمج الفن البصري مع المعايير التوثيقية لتقديم أعمال تتميز بجمالية عالية وروح أصيلة.'
                    : 'Blending visual art with documentary standards to deliver works characterized by high aesthetics and authentic soul.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 05 — AREAS OF INTEREST */}
      <section id="interests" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
            {lang === 'ar' ? 'الاهتمامات والتوجهات' : 'Focus & Passions'}
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#f7f5f0] mt-2">
            {lang === 'ar' ? 'مجالات الاهتمام' : 'Areas of Interest'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#141414] border border-[#222222] rounded-2xl p-8 hover:border-[#c5a880]/40 transition-all">
            <Camera className="w-8 h-8 text-[#c5a880] mb-4" />
            <h3 className="font-serif-heading text-lg font-bold text-[#f7f5f0] mb-2">
              {lang === 'ar' ? 'التصوير الفوتوغرافي' : 'Photography'}
            </h3>
            <p className="text-sm text-[#8a8a8a] leading-relaxed">
              {lang === 'ar' ? 'استكشاف زوايا جديدة وإضاءات طبيعية تبرز التفاصيل المعمارية.' : 'Exploring novel angles and natural lighting highlighting architectural details.'}
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222222] rounded-2xl p-8 hover:border-[#c5a880]/40 transition-all">
            <BookOpen className="w-8 h-8 text-[#c5a880] mb-4" />
            <h3 className="font-serif-heading text-lg font-bold text-[#f7f5f0] mb-2">
              {lang === 'ar' ? 'التوثيق التاريخي' : 'Historical Documentation'}
            </h3>
            <p className="text-sm text-[#8a8a8a] leading-relaxed">
              {lang === 'ar' ? 'حفظ ذاكرة الأماكن والمعالم التاريخية ضد النسيان والاندثار.' : 'Safeguarding the memory of historic places against oblivion.'}
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222222] rounded-2xl p-8 hover:border-[#c5a880]/40 transition-all">
            <Compass className="w-8 h-8 text-[#c5a880] mb-4" />
            <h3 className="font-serif-heading text-lg font-bold text-[#f7f5f0] mb-2">
              {lang === 'ar' ? 'التراث الثقافي' : 'Cultural Heritage'}
            </h3>
            <p className="text-sm text-[#8a8a8a] leading-relaxed">
              {lang === 'ar' ? 'إبراز الهوية الثقافية والتاريخية للمجتمعات العريقة.' : 'Highlighting the cultural and historical identity of ancient societies.'}
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222222] rounded-2xl p-8 hover:border-[#c5a880]/40 transition-all">
            <Layers className="w-8 h-8 text-[#c5a880] mb-4" />
            <h3 className="font-serif-heading text-lg font-bold text-[#f7f5f0] mb-2">
              {lang === 'ar' ? 'مشاريع الإبداع الرقمي' : 'Digital Creative Projects'}
            </h3>
            <p className="text-sm text-[#8a8a8a] leading-relaxed">
              {lang === 'ar' ? 'توظيف التقنيات الرقمية لإيصال التراث بأسلوب معاصر.' : 'Employing digital technologies to convey heritage in a contemporary style.'}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 06 — SELECTED WORKS */}
      <section id="works" className="py-28 px-6 bg-[#101010] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
              {lang === 'ar' ? 'معرض الأعمال' : 'Portfolio Gallery'}
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#f7f5f0] mt-2">
              {lang === 'ar' ? 'مختارات من أعمالي' : 'Selected Works'}
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 text-xs font-medium rounded-full transition-all ${activeCategory === 'all' ? 'bg-[#f7f5f0] text-[#121212]' : 'bg-[#1c1c1c] text-[#a0a0a0] hover:text-white'}`}
            >
              {lang === 'ar' ? 'الكل' : 'All Works'}
            </button>
            <button
              onClick={() => setActiveCategory('Architectural')}
              className={`px-5 py-2 text-xs font-medium rounded-full transition-all ${activeCategory === 'Architectural' ? 'bg-[#f7f5f0] text-[#121212]' : 'bg-[#1c1c1c] text-[#a0a0a0] hover:text-white'}`}
            >
              {lang === 'ar' ? 'التصوير المعماري' : 'Architecture'}
            </button>
            <button
              onClick={() => setActiveCategory('Historical')}
              className={`px-5 py-2 text-xs font-medium rounded-full transition-all ${activeCategory === 'Historical' ? 'bg-[#f7f5f0] text-[#121212]' : 'bg-[#1c1c1c] text-[#a0a0a0] hover:text-white'}`}
            >
              {lang === 'ar' ? 'التوثيق التاريخي' : 'Historical'}
            </button>
            <button
              onClick={() => setActiveCategory('Cultural')}
              className={`px-5 py-2 text-xs font-medium rounded-full transition-all ${activeCategory === 'Cultural' ? 'bg-[#f7f5f0] text-[#121212]' : 'bg-[#1c1c1c] text-[#a0a0a0] hover:text-white'}`}
            >
              {lang === 'ar' ? 'التراث الثقافي' : 'Heritage'}
            </button>
          </div>

          {/* Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => setSelectedWork(work)}
                className="group bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden cursor-pointer hover:border-[#c5a880]/50 transition-all flex flex-col shadow-lg"
              >
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={work.image}
                    alt={lang === 'ar' ? work.titleAr : work.titleEn}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-xs text-[#c5a880] font-medium flex items-center gap-1">
                      <span>{lang === 'ar' ? 'عرض العمل' : 'View Details'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#8a8a8a] mb-2">
                      <span>{lang === 'ar' ? work.categoryAr : work.categoryEn}</span>
                      <span>·</span>
                      <span>{work.date}</span>
                    </div>
                    <h3 className="font-serif-heading text-xl font-bold text-[#f7f5f0] mb-3 group-hover:text-[#c5a880] transition-colors">
                      {lang === 'ar' ? work.titleAr : work.titleEn}
                    </h3>
                    <p className="text-sm text-[#a0a0a0] line-clamp-2 leading-relaxed">
                      {lang === 'ar' ? work.descriptionAr : work.descriptionEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 07 — STAY CONNECTED */}
      <section id="contact" className="py-28 px-6 max-w-5xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
          {lang === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#f7f5f0] mt-2 mb-6">
          {lang === 'ar' ? 'لنبقَ على تواصل' : 'Stay Connected'}
        </h2>

        <p className="max-w-2xl mx-auto text-base text-[#b3b3b3] font-light leading-relaxed mb-10">
          {lang === 'ar'
            ? 'أرحب بالتواصل مع المهتمين بالتصوير والتوثيق الثقافي والمشاريع الإبداعية، وكذلك فرص التعاون والمشاركة في المبادرات التي تسهم في إبراز التراث والهوية البصرية.'
            : 'I welcome connections with those interested in photography, cultural documentation, creative projects, collaboration opportunities, and initiatives highlighting heritage and visual identity.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-8 py-3.5 text-sm font-medium text-[#121212] bg-[#f7f5f0] rounded-full hover:bg-[#c5a880] hover:text-white transition-all shadow-lg flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تواصل معي' : 'Contact Me'}</span>
          </button>
          <a
            href="#works"
            className="px-8 py-3.5 text-sm font-medium text-[#f7f5f0] bg-[#1c1c1c] hover:bg-[#262626] border border-[#333333] rounded-full transition-all"
          >
            <span>{lang === 'ar' ? 'استكشف أعمالي' : 'Explore My Works'}</span>
          </a>
        </div>
      </section>

      {/* SECTION 08 — FOOTER */}
      <footer className="bg-[#090909] border-t border-[#222222] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="md:col-span-2">
            <span className="font-serif-heading text-xl font-bold text-[#f7f5f0] block mb-3">
              {lang === 'ar' ? 'حكمت العياشي' : 'HIKMAT AL-AYASHI'}
            </span>
            <p className="text-sm text-[#8a8a8a] max-w-sm leading-relaxed">
              {lang === 'ar'
                ? 'مصور وموثق التراث الثقافي. الحائز على المركز الأول في مسابقة ويكيبيديا تحب المعالم العراق 2025.'
                : 'Photographer and cultural heritage documentarian. Winner of First Place in Wiki Loves Monuments Iraq 2025.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold mb-4">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li><a href="#achievement" className="hover:text-white transition-colors">{lang === 'ar' ? 'الإنجاز' : 'Achievement'}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{lang === 'ar' ? 'من أنا' : 'About'}</a></li>
              <li><a href="#photography" className="hover:text-white transition-colors">{lang === 'ar' ? 'التصوير والتوثيق' : 'Photography'}</a></li>
              <li><a href="#works" className="hover:text-white transition-colors">{lang === 'ar' ? 'الأعمال المختارة' : 'Selected Works'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold mb-4">
              {lang === 'ar' ? 'التواصل الاجتماعي' : 'Social Channels'}
            </h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li><a href="https://commons.wikimedia.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Wikimedia Commons</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707070]">
          <p>© {new Date().getFullYear()} {lang === 'ar' ? 'حكمت العياشي. جميع الحقوق محفوظة.' : 'Hikmat Al-Ayashi. All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-[#c5a880] hover:underline flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English Version' : 'النسخة العربية'}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* WORK MODAL / LIGHTBOX */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative bg-[#161616] border border-[#2a2a2a] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-8">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-black/60 text-[#f7f5f0] hover:bg-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 bg-black flex items-center justify-center">
                <img
                  src={selectedWork.image}
                  alt={lang === 'ar' ? selectedWork.titleAr : selectedWork.titleEn}
                  className="w-full max-h-[500px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#c5a880] mb-2 font-semibold">
                    <span>{lang === 'ar' ? selectedWork.categoryAr : selectedWork.categoryEn}</span>
                    <span>·</span>
                    <span>{selectedWork.date}</span>
                  </div>

                  <h3 className="font-serif-heading text-2xl font-bold text-[#f7f5f0] mb-4">
                    {lang === 'ar' ? selectedWork.titleAr : selectedWork.titleEn}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#8a8a8a] mb-6">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>{lang === 'ar' ? selectedWork.locationAr : selectedWork.locationEn}</span>
                  </div>

                  <p className="text-sm text-[#b3b3b3] leading-relaxed mb-6">
                    {lang === 'ar' ? selectedWork.descriptionAr : selectedWork.descriptionEn}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedWork(null)}
                  className="w-full py-3 text-sm font-medium text-[#121212] bg-[#f7f5f0] rounded-xl hover:bg-[#c5a880] hover:text-white transition-all text-center"
                >
                  {lang === 'ar' ? 'إغلاق المعاينة' : 'Close Viewer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative bg-[#161616] border border-[#2a2a2a] rounded-3xl max-w-xl w-full p-8 shadow-2xl my-8">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-black/60 text-[#f7f5f0] hover:bg-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-heading text-2xl font-bold text-[#f7f5f0] mb-2">
              {lang === 'ar' ? 'تواصل معي' : 'Get in Touch'}
            </h3>
            <p className="text-sm text-[#9a9a9a] mb-6">
              {lang === 'ar' ? 'أرحب بالاستفسارات ومقترحات التعاون والتوثيق الثقافي.' : 'Welcoming inquiries, collaborations, and cultural documentation proposals.'}
            </p>

            {submitted ? (
              <div className="bg-[#1c2e1c] border border-[#2e522e] rounded-2xl p-6 text-center my-6">
                <CheckCircle2 className="w-12 h-12 text-[#4ade80] mx-auto mb-3" />
                <h4 className="font-bold text-white text-lg mb-1">
                  {lang === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully'}
                </h4>
                <p className="text-xs text-[#a0a0a0]">
                  {lang === 'ar' ? 'شكراً لتواصلك، سأقوم بالرد عليك في أقرب وقت.' : 'Thank you for connecting. I will respond shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a0a0a0] mb-2">
                    {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880]"
                    placeholder={lang === 'ar' ? 'ادخل اسمك الكامل' : 'Enter your full name'}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a0a0a0] mb-2">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880]"
                    placeholder={lang === 'ar' ? 'name@example.com' : 'name@example.com'}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a0a0a0] mb-2">
                    {lang === 'ar' ? 'الرسالة' : 'Message'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-[#101010] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880]"
                    placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-medium text-[#121212] bg-[#f7f5f0] rounded-xl hover:bg-[#c5a880] hover:text-white transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
