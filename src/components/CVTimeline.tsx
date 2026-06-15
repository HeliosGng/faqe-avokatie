import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS, CV_EXPERIENCE } from '../data';
import { Briefcase, GraduationCap, Award, Languages, Terminal, CheckCircle2, Phone, Mail, Calendar, MapPin, User, ChevronRight } from 'lucide-react';

interface CVTimelineProps {
  lang: Language;
}

type TabType = 'timeline' | 'personal' | 'skills';

export default function CVTimeline({ lang }: CVTimelineProps) {
  const [activeTab, setActiveTab] = useState<TabType>('timeline');
  const t = TRANSLATIONS[lang];

  // Soft Skills & Languages list
  const clientSkills = lang === 'al' ? [
    "Zgjedhja e mosmarrëveshjeve me kosto efektive",
    "Hartimi dhe rishikimi i kontratave komplekse",
    "Analizë strategjike e rrezikut tatimor",
    "Pajtueshmëria e punës me ligjin dhe kontratat kolektive",
    "Përfaqësim i fuqishëm përpara autoriteteve tatimore",
    "Aftësi të shkëlqyera komunikimi dhe negocimi",
    "Deshirë dhe aftësi e jashtëzakonshme për të punuar në grup",
    "Etikë rigoroze profesionale dhe konfidencialitet"
  ] : [
    "Cost-effective legal dispute resolution",
    "Drafting & auditing complex commercial contracts",
    "Strategic analysis of corporate tax risks",
    "Labor code compliance & collective bargaining",
    "Assertive defense in administrative tax appeals",
    "Exceptional negotiation and settlement abilities",
    "Strong collaborative team dynamics and leadership",
    "Uncompromising confidentiality and professional ethics"
  ];

  return (
    <div id="cv-timeline" className="scroll-mt-24">
      {/* Decorative Badge */}
      <div className="flex flex-col items-center mb-10 text-center">
        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-gold-700 uppercase bg-gold-100 rounded-full border border-gold-500/20 mb-3">
          {t.cvSectionTitle}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-brand-900 tracking-tight">
          {lang === 'al' ? 'Rruga Profesionale' : 'Career & Experience'}
        </h2>
        <div className="w-16 h-1 bg-gold-500 mt-4 rounded-full"></div>
      </div>

      {/* Tabs Selector */}
      <div className="flex justify-center p-1 max-w-lg mx-auto mb-12 bg-slate-100 rounded-xl border border-slate-200">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-display text-sm font-semibold transition-all ${
            activeTab === 'timeline'
              ? 'bg-brand-800 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase size={16} />
          {t.cvExperience}
        </button>
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-display text-sm font-semibold transition-all ${
            activeTab === 'personal'
              ? 'bg-brand-800 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User size={16} />
          {t.cvPersonal}
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-display text-sm font-semibold transition-all ${
            activeTab === 'skills'
              ? 'bg-brand-800 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award size={16} />
          {t.cvSkills}
        </button>
      </div>

      {/* Tab Panels with AnimatePresence */}
      <div className="max-w-4xl mx-auto min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: WORK TIMELINE & EDUCATION */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Timeline Tree */}
              <div className="relative border-l-2 border-brand-800/20 pl-6 md:pl-8 ml-4 space-y-10">
                {CV_EXPERIENCE.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group"
                  >
                    {/* Ring indicator */}
                    <div className="absolute -left-[35px] md:-left-[41px] top-1.5 flex items-center justify-center w-6 h-6 bg-white border-2 border-brand-800 rounded-full group-hover:bg-gold-500 group-hover:border-gold-500 transition-colors duration-300 shadow">
                      <div className="w-1.5 h-1.5 bg-brand-800 rounded-full group-hover:bg-white"></div>
                    </div>

                    {/* Timeline Card */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 font-mono text-xs font-semibold text-brand-800 bg-brand-100 rounded-full">
                          {exp.years}
                        </span>
                        
                        {/* Highlights high-profile position */}
                        {index === 0 && (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-amber-200">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                            {lang === 'al' ? 'Aktive' : 'Current'}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
                        {lang === 'al' ? exp.roleAl : exp.roleEn}
                      </h3>
                      <p className="font-sans text-sm font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                        <ChevronRight size={14} className="text-gold-500" />
                        {lang === 'al' ? exp.companyAl : exp.companyEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Education section embedded into workspace timeline */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="font-display text-xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                  <GraduationCap className="text-gold-500" size={24} />
                  {t.cvEducation}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -z-0 opacity-40 transition-transform group-hover:scale-110"></div>
                    <span className="text-xs font-bold text-gold-600 block mb-2 font-mono">2001 - 2005</span>
                    <h4 className="font-display font-bold text-slate-800 mb-1">
                      {lang === 'al' ? 'Universiteti i Tiranës' : 'University of Tirana'}
                    </h4>
                    <p className="text-sm font-semibold text-brand-800 mb-2">
                      {lang === 'al' ? 'Fakulteti i Drejtësisë' : 'Faculty of Law'}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {lang === 'al' 
                        ? 'Diplomuar si Jurist me njohuri të thelluara në teorinë e ligjit, procedurat administrative, civile dhe penale, me fokus të mëvonshëm ndaj rrymave rregullatore tregtare.'
                        : 'Graduated as a Jurist with deep insights in legal theory, administrative and civil procedure, paving a strategic pathway into employment and corporate structure.'}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -z-0 opacity-40 transition-transform group-hover:scale-110"></div>
                    <span className="text-xs font-bold text-gold-600 block mb-2 font-mono">1997 - 2001</span>
                    <h4 className="font-display font-bold text-slate-800 mb-1">
                      {lang === 'al' ? 'Shkolla e Mesme e Përgjithshme “Abaz Shehu”' : 'Abaz Shehu General High School'}
                    </h4>
                    <p className="text-sm font-semibold text-brand-800 mb-2">
                      Tepelenë, Shqipëri
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {lang === 'al'
                        ? 'Formim i lartë i përgjithshëm, me rekorde të shkëlqyera në lëndët shoqërore, retorikë dhe analizë llogjike.'
                        : 'Comprehensive general curriculum with high marks in humanities, public speaking and critical logical analysis.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PERSONAL IDENTITY CARDS */}
          {activeTab === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Details Column */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-display text-xl font-bold text-brand-900 border-b pb-4 border-slate-100 mb-4 flex items-center gap-2">
                  <User size={20} className="text-gold-500" />
                  {lang === 'al' ? 'Letërnjoftimi Profesional' : 'Official Credentials'}
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.labelName}</span>
                    <span className="text-sm font-semibold text-slate-800">Ernest Novrus Shimka</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.labelBirth}</span>
                    <span className="text-sm font-semibold text-slate-800">19/07/1982</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.labelProfession}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-100 text-gold-700 text-xs font-bold rounded-full border border-gold-500/10">
                      <Award size={12} />
                      {lang === 'al' ? 'Jurist / Avokat' : 'Jurist / Advocate'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.labelEmail}</span>
                    <a href="mailto:ernestshimka@yahoo.com" className="text-sm font-medium text-brand-800 hover:underline">
                      ernestshimka@yahoo.com
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.labelPhone}</span>
                    <a href="tel:+355693385664" className="text-sm font-semibold text-slate-800 hover:text-brand-800">
                      +355 69 33 85 664
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.labelLocation}</span>
                    <span className="text-sm font-medium text-slate-800 flex items-center gap-1">
                      <MapPin size={14} className="text-red-500" />
                      Tiranë, Shqipëri
                    </span>
                  </div>
                </div>
              </div>

              {/* Legal Specialization details & Bar statement */}
              <div className="bg-brand-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-800 rounded-full filter blur-xl opacity-20 transform translate-x-10 -translate-y-10"></div>
                
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-800 text-gold-500 mb-6 border border-brand-700">
                    <Award size={24} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4 tracking-tight">
                    {lang === 'al' ? 'Licenca & Titulli Kombëtar' : 'Bar License & Standing'}
                  </h3>
                  <div className="w-12 h-1 bg-gold-500 mb-6"></div>
                  <p className="text-brand-100 text-sm leading-relaxed mb-6">
                    {lang === 'al'
                      ? 'Ernest Shimka mban titullin zyrtar dhe të mbrojtur me ligj "Avokat", i çertifikuar për kryerjen e shërbimeve të plota të përfaqësimit dhe mbrojtjes përpara çdo niveli të sistemit gjyqësor dhe administrativ në Republikën e Shqipërisë.'
                      : 'Ernest Shimka holds the prestigious state-regulated title of "Avokat" (Licensed Attorney), legalizing direct client representation, defense orchestration, and contract certifications before any court and administration tier in Albania.'}
                  </p>
                </div>

                <div className="bg-brand-950 p-4 rounded-xl border border-brand-800 flex items-start gap-3">
                  <CheckCircle2 className="text-gold-500 flex-shrink-0 mt-0.5" size={16} />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-white uppercase tracking-wider">
                      {lang === 'al' ? 'Statuti Profesional' : 'Professional Standing'}
                    </p>
                    <p className="text-brand-300">
                      {lang === 'al' ? 'Regjistruar në Shqipëri • Avokat aktiv pranë Oracle Solicitors' : 'Admitted to the Albanian Bar • Counsel at Oracle Solicitors'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SKILLS AND LANGUAGES */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Interpersonal and Practice Skills */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-3 border-slate-100">
                    <Award size={18} className="text-gold-500" />
                    {lang === 'al' ? 'Aftësitë Kryesore' : 'Core Proficiencies'}
                  </h3>
                  <ul className="space-y-3.5">
                    {clientSkills.map((skill, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-brand-800 flex-shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical / Language skills */}
                <div className="space-y-6">
                  {/* Languages Card */}
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Languages size={18} className="text-gold-500" />
                      {t.cvLanguages}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                          <span>{lang === 'al' ? 'Anglisht (Certified High level)' : 'English (Certified Advanced / High)'}</span>
                          <span className="text-brand-800 font-mono">100%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-800 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                          <span>{lang === 'al' ? 'Gjermanisht (Nivel i lartë njohurish)' : 'German (High capacity / Intermediate)'}</span>
                          <span className="text-brand-800 font-mono">85%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-800 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                          <span>{lang === 'al' ? 'Shqip (Gjuhë Amatore)' : 'Albanian (Native / Mother tongue)'}</span>
                          <span className="text-brand-800 font-mono">100%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-800 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Systems Computer Card */}
                  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Terminal size={18} className="text-gold-500" />
                      {lang === 'al' ? 'Njohuri Kompjuterike' : 'Digital Competencies'}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {lang === 'al'
                        ? 'Njohuri profesionale të sistemeve administrative dhe zyrave ligjore.'
                        : 'Proficient with legal case management databases, tax electronic filing platforms, and digital collaboration software.'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Microsoft Office Suite", "Word", "Excel", "PowerPoint", "Legal Search Systems", "Tax Filing Platforms (e-Albania)", "Windows OS"].map((os, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs font-medium bg-slate-50 text-slate-600 rounded border border-slate-200">
                          {os}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  );
}
