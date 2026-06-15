import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS, SERVICES } from './data';
import { Language, ContactMessage } from './types';
import Logo from './components/Logo';
import CVTimeline from './components/CVTimeline';

const portraitImg = "https://oraclelawglobal.com/wp-content/uploads/2025/09/ernest-final.png";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Award, 
  MessageSquare, 
  ShieldCheck, 
  Check, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

const STORAGE_KEY = "advocate_ernest_shimka_messages";

export default function App() {
  const [lang, setLang] = useState<Language>('al');
  const [activeServiceId, setActiveServiceId] = useState<string>('tax_law');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact Form States
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [subjectVal, setSubjectVal] = useState("");
  const [messageVal, setMessageVal] = useState("");
  const [topicVal, setTopicVal] = useState("general");
  const [methodVal, setMethodVal] = useState("Takim Fizik (Tiranë)");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const t = TRANSLATIONS[lang];

  // Sync index.html lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Handle Contact Submit and Save in Local Storage
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameVal || !phoneVal || !messageVal) {
      alert(lang === 'al' ? "Ju lutem plotësoni fushat e detyrueshme (Emrin, Telefonin dhe Mesazhin)" : "Please fill in all mandatory fields (Name, Phone and Message)");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: "msg-" + Date.now(),
        name: nameVal,
        email: emailVal || "n/a",
        phone: phoneVal,
        subject: subjectVal || (lang === 'al' ? "Çështje e Re Ligjore" : "New Legal Case"),
        message: messageVal,
        topic: topicVal,
        meetingMethod: methodVal,
        date: new Date().toLocaleString()
      };

      const existingData = localStorage.getItem(STORAGE_KEY);
      let list = [];
      if (existingData) {
        try {
          list = JSON.parse(existingData);
        } catch (err) {
          list = [];
        }
      }
      list.unshift(newMessage);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

      setIsSubmitting(false);
      setFormSuccess(true);
      
      // Clear values
      setNameVal("");
      setEmailVal("");
      setPhoneVal("");
      setSubjectVal("");
      setMessageVal("");
    }, 1000);
  };

  // Helper function to trigger pre-filled WhatsApp conversation
  const triggerWhatsApp = () => {
    const topicText = topicVal === 'tax_law' 
      ? (lang === 'al' ? 'të Drejtën Tatimore' : 'Tax Law')
      : topicVal === 'employment_law'
      ? (lang === 'al' ? 'të Drejtën e Punësimit' : 'Employment Law')
      : (lang === 'al' ? 'Zgjidhje Ligjore të Përgjithshme' : 'General Legal Inquiry');

    const messageString = `${t.whatsappPreFill}${topicText} (${methodVal}). Emri im: ${nameVal || 'Kërkues'}.`;
    const encoded = encodeURIComponent(messageString);
    window.open(`https://wa.me/355693385664?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#faf9f5]">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-6 md:px-12 transition-all">
        <div className="flex justify-between items-center w-full">
          <a href="#hero" className="outline-none" onClick={() => setMobileMenuOpen(false)}>
            <Logo lang={lang} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <a href="#about" className="hover:text-brand-900 transition-colors py-2">{t.navAbout}</a>
            <a href="#services" className="hover:text-brand-900 transition-colors py-2">{t.navServices}</a>
            <a href="#cv-timeline" className="hover:text-brand-900 transition-colors py-2">{t.cvSectionTitle}</a>
            <a href="#contact" className="text-slate-900 border-b-2 border-gold-500 pb-1 py-1 px-1">{t.navContact}</a>
          </nav>

          {/* Control Actions (Bilingual & Hamburguer) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Badge */}
            <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
              <button 
                onClick={() => setLang('al')}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all uppercase ${lang === 'al' ? 'bg-brand-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                AL
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all uppercase ${lang === 'en' ? 'bg-brand-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Action Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-brand-950 hover:bg-slate-100 transition-all focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Overlay Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-slate-100 mt-4 bg-white rounded-b-xl"
            >
              <div className="flex flex-col py-4 gap-2 text-xs font-semibold uppercase tracking-widest text-slate-600">
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 hover:bg-slate-50 hover:text-brand-900 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{t.navAbout}</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </a>
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 hover:bg-slate-50 hover:text-brand-900 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{t.navServices}</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </a>
                <a 
                  href="#cv-timeline" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 hover:bg-slate-50 hover:text-brand-900 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{t.cvSectionTitle}</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-4 my-2 px-4 py-3 bg-brand-800 text-white text-center rounded-lg hover:bg-brand-900 shadow-sm transition-all tracking-[0.2em]"
                >
                  {t.navContact}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DYNAMIC split hero panel incorporating "GEOMETRIC BALANCE" styling */}
      <section id="hero" className="w-full flex-1 flex flex-col lg:flex-row border-b border-slate-200 min-h-[680px]">
        
        {/* LEFT COLUMN: IDENTITY & PORTRAIT (40% width on large screens) */}
        <div className="w-full lg:w-[40%] bg-brand-950 text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          
          {/* Decorative geometric outline overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full filter blur-3xl opacity-10 -z-0"></div>
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 border border-gold-500/50 text-gold-500 text-[10px] font-bold uppercase tracking-widest mb-6 rounded-sm">
              {lang === 'al' ? 'EKSELENCË LIGJORE COMBËTARE' : 'NATIONAL LEGAL EXCELLENCE'}
            </span>
            
            {/* Elegant Serif Italic Heading matching Geometric Balance design */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic leading-tight text-white mb-6">
              {t.heroTitle}
            </h2>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 font-light">
              {t.heroDescription}
            </p>

            {/* Advocate Portrait Display with premium gold framing */}
            <div className="my-8 flex items-center gap-5 bg-black/30 p-4 rounded-2xl border border-white/10 backdrop-blur-sm max-w-sm">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-gold-500 flex-shrink-0 bg-slate-800 shadow-md">
                <img 
                  src={portraitImg} 
                  alt="Ernest Shimka Advocate" 
                  className="w-full h-full object-cover object-top scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white tracking-tight">Ernest Shimka</h4>
                <p className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mt-0.5">Avokat | Licensed Advocate</p>
                <p className="text-xs text-slate-300 mt-1">{t.locationTirana}</p>
              </div>
            </div>

            {/* Split Highlight points for Geometric feel */}
            <div className="space-y-4 my-6">
              <a href="#services" onClick={() => setActiveServiceId('tax_law')} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 border border-slate-700 group-hover:border-gold-500 flex items-center justify-center rounded-full transition-colors duration-300 bg-slate-900">
                  <span className="text-gold-500 text-xs font-mono">01</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">
                  {lang === 'al' ? 'E Drejta Tatimore (Tax Law)' : 'Corporate & International Tax Law'}
                </span>
              </a>
              <a href="#services" onClick={() => setActiveServiceId('employment_law')} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 border border-slate-700 group-hover:border-gold-500 flex items-center justify-center rounded-full transition-colors duration-300 bg-slate-900">
                  <span className="text-gold-500 text-xs font-mono">02</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">
                  {lang === 'al' ? 'E Drejta e Punësimit' : 'Employment & Labor Law'}
                </span>
              </a>
            </div>
          </div>

          {/* Golden-bordered quote card */}
          <div className="p-6 bg-brand-900/60 rounded-xl border-l-4 border-gold-500 backdrop-blur-sm mt-8 relative z-10 shadow-lg">
            <p className="text-xs text-slate-200 italic leading-relaxed">
              &ldquo;{t.quoteText}&rdquo;
            </p>
            <p className="text-right text-[11px] font-bold text-gold-500 uppercase tracking-widest mt-3">
              &mdash; {t.quoteAuthor}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED SERVICES & BOOKING (60% width on large screens) */}
        <div id="services" className="w-full lg:w-[60%] flex flex-col bg-white">
          
          {/* Service items Selector Grid */}
          <div className="p-6 md:p-10 border-b border-slate-200 bg-slate-50">
            <span className="px-3 py-1 text-[10px] font-bold text-gold-700 tracking-widest uppercase bg-gold-100 rounded-md border border-gold-500/15 mb-3 inline-block">
              {t.servicesBadge}
            </span>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
              {t.servicesTitle}
            </h3>
            <p className="text-xs text-slate-500 max-w-xl mb-6">
              {t.servicesSubtitle}
            </p>

            <div className="flex gap-4 border-b border-slate-200">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceId(s.id)}
                  className={`pb-3 text-xs uppercase font-bold tracking-widest transition-all relative ${
                    activeServiceId === s.id 
                      ? 'text-brand-900' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {lang === 'al' ? s.titleAl : s.titleEn}
                  {activeServiceId === s.id && (
                    <motion.div 
                      layoutId="activeServiceLine" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-900"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* List display based on active tab with staggered layout */}
          <div className="p-6 md:p-10 flex-1 grid md:grid-cols-2 gap-6 bg-white overflow-hidden">
            {SERVICES.filter(group => group.id === activeServiceId).map(group => (
              <React.Fragment key={group.id}>
                {/* Left col list */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gold-600 uppercase tracking-widest border-b pb-2 border-slate-100">
                    {lang === 'al' ? 'Planifikim & Pajtueshmëri' : 'Planning & Representation'}
                  </h4>
                  <ul className="space-y-3">
                    {(lang === 'al' ? group.itemsAl : group.itemsEn).slice(0, 4).map((item, id) => (
                      <li key={id} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-gold-500 font-bold flex-shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right col list */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gold-600 uppercase tracking-widest border-b pb-2 border-slate-100">
                    {lang === 'al' ? 'Zgjidhja e Konflikteve' : 'Conflict Resolution'}
                  </h4>
                  <ul className="space-y-3">
                    {(lang === 'al' ? group.itemsAl : group.itemsEn).slice(4).map((item, id) => (
                      <li key={id} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-gold-500 font-bold flex-shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Quick contact and Call-To-Action terms */}
          <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">{lang === 'al' ? 'KONSULENCË DIREKTE' : 'DIRECT LINE CONSULTING'}</span>
              <p className="text-slate-800 font-display font-medium text-sm">
                {lang === 'al' ? 'Kontakto për takim urgjent pune apo tatimi' : 'Connect for tax and labor urgencies inside Albania'}
              </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <a 
                href="#contact" 
                className="flex-1 md:flex-none text-center bg-brand-800 hover:bg-brand-900 p-3 px-6 text-xs font-bold uppercase tracking-widest text-white rounded-md transition-colors"
              >
                {t.heroCTAContact}
              </a>
              <a 
                href="https://wa.me/355693385664" 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 md:flex-none text-center bg-emerald-600 hover:bg-emerald-700 p-3 px-6 text-xs font-bold uppercase tracking-widest text-white rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* DETAILED INTERACTIVE ABOUT PANEL WITH SECURE METRIC COUNTERS */}
      <section id="about" className="py-20 px-6 md:px-12 lg:px-24 bg-white border-b border-rose-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-gold-700 uppercase bg-gold-100 rounded-full border border-gold-500/20">
              {t.aboutBadge}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold text-brand-900 tracking-tight">
              {t.aboutTitle}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {lang === 'al' 
                ? "Ernest Shimka është një profesionist i dalluar ligjor me diplomë të Fakultetit të Drejtësisë pranë Universitetit të Tiranës. Bazuar në Tiranë, ai është i specializuar në të Drejtën Tatimore dhe Ligjin e Punësimit."
                : "Ernest Shimka is a distinguished legal practitioner based in Tirana, Albania. Armed with a comprehensive law degree from the University of Tirana, Ernest matches meticulous statutory compliance with decisive corporate protection."}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {lang === 'al'
                ? "Ai ofron konsulencë ligjore dhe përfaqësim të nivelit të lartë për kompani kombëtare dhe ndërkombëtare, duke pasur një eksperiencë të pasur në mbledhjen e detyrimeve tatimore, auditimin e rregulloreve të punës, dhe mbrojtjen në gjykatë."
                : "With professional tenures spanning across public collection offices, micro-finance banking portfolios, and premier firms like Oracle Solicitors, he helps businesses navigate regulatory minefields with peace of mind."}
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="block text-3xl font-display font-extrabold text-brand-800">20+</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{lang === 'al' ? 'Vite nga Arsimimi' : 'Years since Graduation'}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="block text-3xl font-display font-extrabold text-brand-800">100%</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{lang === 'al' ? 'Pajtueshmëri' : 'Compliance Rate'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#faf9f5] p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
              <Sparkles size={18} />
            </div>
            
            <h4 className="font-display font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
              <Award className="text-gold-500" size={20} />
              {t.aboutDegree}
            </h4>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="p-4 bg-white rounded-lg border-l-2 border-brand-800 shadow-xs">
                <p className="font-bold text-slate-800 mb-1">{lang === 'al' ? 'E Drejta Tatimore (Tax Law)' : 'Tax Law Specialist'}</p>
                <p>{lang === 'al' ? 'Planifikim strategjik tatimor, çmimet e transferimit, optimizim i legjislacionit të TVSH-së dhe mbrojtje nga gjobat tatimore.' : 'Maximizing structural security, audit-proofing transfer files, corporate VAT planning, and administrative tribunal appeal filings.'}</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-l-2 border-brand-800 shadow-xs">
                <p className="font-bold text-slate-800 mb-1">{lang === 'al' ? 'E Drejta e Punësimit (Employment Law)' : 'Employment Relations'}</p>
                <p>{lang === 'al' ? 'Pajtim i plotë me Kodin e Punës, eliminimi i rreziqeve nga largimet e njëanshme rregullimi i përfitimeve të stafit.' : 'Complete compliance setups, crafting binding executive agreements, collective layoff resolution, and Labor Inspectorate representation.'}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE FULL TIMELINE COMPONENT PORTING */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <CVTimeline lang={lang} />
        </div>
      </section>

      {/* SPLIT COMBINED CONTACT & WHATSAPP MEETING ACTION ZONE incorporating "Geometric Balance" layout */}
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          
          {/* Lëft side form information */}
          <div className="lg:col-span-4 space-y-6">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-gold-700 uppercase bg-gold-100 rounded-full border border-gold-500/20">
              {t.contactBadge}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold text-brand-900 tracking-tight">
              {t.contactTitle}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.contactSubtitle}
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-100 text-sm">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-brand-800 border border-slate-200 flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">{lang === 'al' ? 'Telefon' : 'Phone'}</h5>
                  <a href="tel:+355693385664" className="font-semibold text-slate-800 hover:text-brand-800">+355 69 33 85 664</a>
                </div>
              </div>

              <a href="mailto:ernestshimka@yahoo.com" className="flex gap-4 group cursor-pointer outline-none">
                <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-brand-50 flex items-center justify-center text-brand-800 border border-slate-200 flex-shrink-0 transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-400 uppercase text-[9px] tracking-widest group-hover:text-brand-800 transition-colors">Email</h5>
                  <span className="font-semibold text-slate-800 group-hover:text-brand-800 underline decoration-slate-300 group-hover:decoration-brand-800 transition-all">ernestshimka@yahoo.com</span>
                </div>
              </a>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-brand-800 border border-slate-200 flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">{lang === 'al' ? 'Adresa / Selia' : 'Office Location'}</h5>
                  <p className="font-semibold text-slate-800">Tiranë, Albania</p>
                </div>
              </div>
            </div>

            {/* In-app instant WhatsApp scheduler promotion */}
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-500/20 shadow-xs space-y-3">
              <h4 className="font-display font-bold text-emerald-800 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                {lang === 'al' ? 'Cakto takim në WhatsApp' : 'Book Instantly on WhatsApp'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'al' 
                  ? 'Planifikoni një takim të shpejtë fizik apo virtual brenda Shqipërisë duke u lidhur direkt në WhatsApp falas.' 
                  : 'Receive express scheduling for corporate audits or dispute reviews by executing a quick booking directly onto WhatsApp.'}
              </p>
              <button 
                onClick={triggerWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={13} />
                {t.btnWhatsApp}
              </button>
            </div>
          </div>

          {/* Interactive Form Segment */}
          <div className="lg:col-span-8 bg-slate-50 p-6 md:p-8 lg:p-10 rounded-3xl border border-slate-200">
            
            <div className="mb-8 border-b border-slate-200 pb-6">
              <h4 className="font-display font-extrabold text-brand-900 text-xl md:text-2xl tracking-tight mb-2">
                {lang === 'al' ? t.scheduleTitle : 'Direct Booking Details'}
              </h4>
              <p className="text-xs text-slate-500">
                {t.scheduleSubtitle}
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* User Name input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    {t.formName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nameVal}
                    onChange={(e) => setNameVal(e.target.value)}
                    placeholder={lang === 'al' ? "Emri dhe mbiemri juaj" : "e.g. John Doe"}
                    className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-800 transition-colors"
                  />
                </div>

                {/* User Phone Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    {t.formPhone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneVal}
                    onChange={(e) => setPhoneVal(e.target.value)}
                    placeholder={lang === 'al' ? "Ndrysho +355" : "e.g. +355 69 000 0000"}
                    className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-800 transition-colors"
                  />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6 pb-2">
                
                {/* Choose Specialty selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    {t.selectTopic}
                  </label>
                  <select
                    value={topicVal}
                    onChange={(e) => setTopicVal(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-800 transition-all"
                  >
                    <option value="tax_law">{lang === 'al' ? 'Tatim-Taksat / Këshillim' : 'Corporate Tax / Statutory Tax'}</option>
                    <option value="employment_law">{lang === 'al' ? 'Kontratat & Kodi i Punës' : 'Employment Law Compliance'}</option>
                    <option value="general">{lang === 'al' ? 'Zgjidhje tjetër ligjore' : 'Other Legal Assistance'}</option>
                  </select>
                </div>

                {/* Choose Meeting form preferred type */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    {t.selectMethod}
                  </label>
                  <select
                    value={methodVal}
                    onChange={(e) => setMethodVal(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-800 transition-all"
                  >
                    <option value="Takim Fizik (Tiranë)">{t.meetingInPerson}</option>
                    <option value="Takim Online (Zoom / Meet)">{t.meetingVirtual}</option>
                    <option value="WhatsApp Audio Call & Chat">{t.meetingWhatsApp}</option>
                  </select>
                </div>

              </div>

              {/* Subject of Case */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  {t.formSubject}
                </label>
                <input
                  type="text"
                  value={subjectVal}
                  onChange={(e) => setSubjectVal(e.target.value)}
                  placeholder={lang === 'al' ? "p.sh. Apelim i masës administrative" : "e.g. Audit preparation or contract redraft"}
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-800 transition-colors"
                />
              </div>

              {/* Message Details */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  {t.formMessage} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={messageVal}
                  onChange={(e) => setMessageVal(e.target.value)}
                  placeholder={lang === 'al' ? "Ju lutem përshkruani shkurtimisht problematikën ose kërkesën tuaj..." : "Briefly describe your case requirements..."}
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-brand-800 transition-colors resize-y"
                ></textarea>
              </div>

              {/* Submission actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 justify-between items-center">
                
                {formSuccess ? (
                  <div className="w-full bg-green-50 text-green-700 text-xs p-4 rounded-xl border border-green-200 flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-800 flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <span>{t.formSuccessMessage}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    {lang === 'al' ? 'Duke klikuar, informacioni ruhet në mënyrë të sigurt.' : 'By scheduling, your details are held strictly confidential.'}
                  </p>
                )}

                <div className="flex gap-3 w-full sm:w-auto">
                  {/* WhatsApp Express Planner */}
                  <button
                    type="button"
                    onClick={triggerWhatsApp}
                    className="flex-1 sm:flex-none uppercase tracking-wider py-3 px-6 text-xs text-emerald-800 bg-emerald-100 hover:bg-emerald-200 font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Instant</span> WhatsApp
                  </button>

                  {/* Standard Form submission */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none bg-brand-850 hover:bg-brand-900 bg-brand-800 text-white font-bold py-3 px-6 text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? t.formSubmitting : t.formSubmit}
                  </button>
                </div>

              </div>

            </form>
          </div>

        </div>
      </section>

      {/* FOOTER ACCENTS & CREDENTIALS BANNER */}
      <footer className="bg-slate-900 text-white pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 text-xs text-slate-400">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-brand-800 flex items-center justify-center border border-brand-700 text-gold-500">
                <ShieldCheck size={18} />
              </div>
              <span className="font-serif font-bold text-base text-white tracking-wide">
                ES | ZYRE AVOKATIE
              </span>
            </div>
            <p className="leading-relaxed text-slate-400 max-w-sm">
              {lang === 'al'
                ? "Studio Ligjore e specializuar në çështje korporative, apelim administrativ të gjobave tatimore dhe mbrojtjen tërësore të punëmarrësve dhe punëdhënësve në Shqipëri."
                : "Dedicated corporate and employee legal chambers. Orchestrating strategic audits, administrative tax disputes, and proactive labor compliance models."}
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h5 className="font-display font-bold text-white uppercase text-[10px] tracking-widest">{lang === 'al' ? 'FUSHA E EKSPERTIZËS' : 'LEGAL BRANCHES'}</h5>
            <div className="space-y-2">
              <p className="hover:text-gold-500 cursor-pointer flex items-center gap-1.5">
                <ChevronRight size={12} className="text-gold-500" />
                {lang === 'al' ? 'Tatim Korporatash & Çmimet e Transferimit' : 'Corporate Tax & Transfer pricing'}
              </p>
              <p className="hover:text-gold-500 cursor-pointer flex items-center gap-1.5">
                <ChevronRight size={12} className="text-gold-500" />
                {lang === 'al' ? 'Kontratat e Punës & Zgjidhja e Konflikteve' : 'Employment contracts & severance audits'}
              </p>
              <p className="hover:text-gold-500 cursor-pointer flex items-center gap-1.5">
                <ChevronRight size={12} className="text-gold-500" />
                {lang === 'al' ? 'Përfaqësim pranë Oracle Solicitors' : 'Representation with Oracle Solicitors'}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h5 className="font-display font-bold text-white uppercase text-[10px] tracking-widest">{lang === 'al' ? 'KONSULENCË TATIMORE' : 'TAX INCENTIVES'}</h5>
            <p className="leading-relaxed">
              {lang === 'al' 
                ? 'Anëtar aktiv i Dhomës Kombëtare të Avokatisë, me seli qendrore në Tiranë. Përfaqësim i vlefshëm në të gjithë rrethet e Shqipërisë.' 
                : 'Licensed Advocate admitted to the Albanian National Bar, prioritizing seamless business transitions and secure operational frameworks.'}
            </p>
            <div className="flex gap-2">
              <span className="bg-slate-800 text-gold-500 text-[10px] font-semibold px-2.5 py-1 rounded">
                Tirana Bar Registry
              </span>
              <span className="bg-slate-800 text-gold-500 text-[10px] font-semibold px-2.5 py-1 rounded">
                Oracle Solicitors Albania
              </span>
            </div>
          </div>

        </div>

        {/* Outer bottom accent margin */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-medium tracking-widest">
          <p>© 2026 ERNEST SHIMKA | DHOMA E AVOKATISË TIRANË</p>
          <div className="flex gap-4">
            <span>TAX LAW</span>
            <span className="text-slate-700">/</span>
            <span>EMPLOYMENT LAW</span>
            <span className="text-slate-700">/</span>
            <span>CORPORATE ADVISOR</span>
          </div>
        </div>
      </footer>



    </div>
  );
}
