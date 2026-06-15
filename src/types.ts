export interface TranslationSet {
  // Navigation
  navHome: string;
  navAbout: string;
  navServices: string;
  navContact: string;
  navSchedule: string;

  // Hero Section
  heroTitle: string;
  heroSubTitle: string;
  heroDescription: string;
  heroCTAContact: string;
  heroCTASchedule: string;
  quoteText: string;
  quoteAuthor: string;

  // About / CV Section
  aboutTitle: string;
  aboutBadge: string;
  aboutDegree: string;
  cvSectionTitle: string;
  cvPersonal: string;
  cvEducation: string;
  cvExperience: string;
  cvLanguages: string;
  cvSkills: string;
  cvSpecializations: string;
  cvAftesi: string;

  // Personal Info Labels
  labelName: string;
  labelBirth: string;
  labelProfession: string;
  labelEmail: string;
  labelPhone: string;
  labelLocation: string;

  // Service Section
  servicesTitle: string;
  servicesBadge: string;
  servicesSubtitle: string;
  taxLawTitle: string;
  taxLawDesc: string;
  employmentLawTitle: string;
  employmentLawDesc: string;
  viewMoreDetails: string;

  // Contact Form
  contactTitle: string;
  contactBadge: string;
  contactSubtitle: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formSubject: string;
  formMessage: string;
  formSubmit: string;
  formSubmitting: string;
  formSuccessMessage: string;
  formErrorMessage: string;

  // WhatsApp & Scheduling
  scheduleTitle: string;
  scheduleBadge: string;
  scheduleSubtitle: string;
  selectTopic: string;
  selectMethod: string;
  meetingInPerson: string;
  meetingVirtual: string;
  meetingWhatsApp: string;
  btnWhatsApp: string;
  whatsappPreFill: string;

  // Footer & Miscellaneous
  allRightsReserved: string;
  locationTirana: string;
  lawChambersName: string;
}

export type Language = 'al' | 'en';

export interface ServiceDetail {
  id: string;
  titleAl: string;
  titleEn: string;
  itemsAl: string[];
  itemsEn: string[];
}

export interface CVExperienceItem {
  years: string;
  roleAl: string;
  roleEn: string;
  companyAl: string;
  companyEn: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  topic?: string;
  meetingMethod?: string;
}
