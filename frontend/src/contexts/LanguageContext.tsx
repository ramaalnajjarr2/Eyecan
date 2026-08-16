import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}
const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    features: 'المميزات',
    whoWeHelp: 'من نساعد',
    technology: 'التقنيات',
    team: 'الفريق',
    simulation: 'المحاكاة',
    // Hero
    heroTitle: 'نظارة ذكية تُعيد القدرة على التعبير',
    heroSubtitle: 'للأشخاص الذين فقدوا النطق أو الحركة. جسر حقيقي يُعيد الصلة بين الإنسان والعالم من حولهم',
    prototypeNotice: 'تنبيه: هذا المشروع نموذج أولي (Prototype) لفكرة قابلة للتطوير، وليس منتجًا نهائيًا جاهزًا للاستخدام.',
    tryNow: 'جرّب النظارة',
    learnMore: 'تعرف أكثر',
    // Problem Section
    problemTitle: 'المشكلة التي نحلها',
    problemDesc:
      'يواجه بعض الأشخاص صعوبة في التعبير عن احتياجاتهم والتواصل مع من حولهم. تهدف Eyecan إلى تقديم فكرة تقنية تساعد على تسهيل هذا التواصل بطريقة بسيطة وقابلة للتطوير',

    // Who We Help
    whoWeHelpTitle: 'من نساعد؟',

    warVictims: 'الأشخاص ذوو صعوبات التواصل',
    warVictimsDesc:
      'أشخاص قد يواجهون صعوبة في التعبير اللفظي أو التواصل نتيجة إصابة أو حالة صحية أو ظرف مؤقت',
    warExamples:
      'صعوبات النطق • صعوبات الحركة • صعوبات التواصل',

    paralysisPatients: 'الأشخاص ذوو صعوبات الحركة',
    paralysisPatientsDesc:
      'أشخاص يحتفظون بقدرتهم على التفكير والوعي لكن قد يواجهون صعوبة في التحكم بالحركة والتواصل',
    paralysisExamples:
      'إعاقات حركية • إصابات عصبية • حالات تحد من الحركة',

    traumaVictims: 'الأشخاص الذين يحتاجون إلى وسيلة تواصل بديلة',
    traumaVictimsDesc:
      'أشخاص قد يستفيدون من وسائل تواصل تساعدهم على التعبير عن احتياجاتهم ومشاعرهم بصورة أبسط',
    traumaExamples:
      'صعوبات التعبير • صعوبات التواصل • الحاجة إلى وسائل مساعدة',

    medicalCases: 'حالات تحتاج إلى دعم في التواصل',
    medicalCasesDesc:
      'فكرة قابلة للتطوير لتوفير وسيلة تواصل مساعدة للأشخاص الذين يواجهون تحديات في التعبير',
    medicalExamples:
      'حالات حركية • حالات نطق • تحديات تواصل مختلفة',

    // Features
    featuresTitle: 'مميزات النظارة الذكية',
    featuresSubtitle:
      'نموذج أولي يجمع بين التفاعل بالصوت والنظر بهدف تسهيل التواصل وإظهار إمكانيات الفكرة',

    eyeTracking: 'تتبع العين',
    eyeTrackingDesc:
      'استخدام تتبع العين كوسيلة تفاعل تساعد المستخدم على التحكم والاختيار بطريقة تناسب احتياجاته',

    smartAnalysis: 'تحليل البيئة الذكي',
    smartAnalysisDesc:
      'فكرة تعتمد على الاستماع والتفاعل مع البيئة للمساعدة في فهم السياق وتقديم استجابات مناسبة',

    instantResponse: 'استجابة فورية',
    instantResponseDesc:
      'استجابة سريعة مع إمكانية التحكم بزمن الاستجابة بما يتناسب مع راحة المستخدم وطريقة تفاعله',

    mobileApp: 'تطبيق مصاحب',
    mobileAppDesc:
      'واجهة مصاحبة يمكن استخدامها للتحكم في التجربة وتخصيص الإعدادات والعبارات حسب احتياجات المستخدم',
    // Technology
    techTitle: 'التقنيات المستخدمة',
    techSubtitle:
      'تقنيات حديثة مستخدمة لبناء النموذج الأولي الحالي، مع رؤية واضحة لتطويره مستقبلًا',

    webInteraction: 'Web & Interaction',
    eyeTrackingTech: 'Eye Tracking / Gaze Interaction',
    eyeTrackingTechDesc:
      'في هذا النموذج الأولي يتم استخدام الماوس لمحاكاة نظرة العين وفترة تثبيت النظر على العناصر',

    browserSpeechRecognition: 'Browser Speech Recognition',
    browserSpeechRecognitionDesc:
      'التعرف على الكلام وتحويله إلى نص باستخدام إمكانيات المتصفح',

    browserInteraction: 'Browser-based Interaction',
    browserInteractionDesc:
      'التفاعل والاستجابة مباشرة داخل المتصفح دون الحاجة إلى Backend في هذا النموذج الأولي',

    voiceAudio: 'Voice & Audio',
    webSpeechApi: 'Web Speech API',
    webSpeechApiDesc:
      'استخدام واجهات الصوت المتوفرة في المتصفح للتعامل مع الكلام',

    speechRecognitionTech: 'Speech Recognition',
    speechRecognitionTechDesc:
      'تحويل الكلام المسموع من الميكروفون إلى نص داخل المتصفح',

    speechSynthesisTech: 'Speech Synthesis',
    speechSynthesisTechDesc:
      'تحويل النص إلى صوت باستخدام الأصوات التي يوفرها المتصفح والجهاز',

    development: 'Development',
    htmlCssJavascript: 'HTML / CSS / JavaScript',
    htmlCssJavascriptDesc:
      'التقنيات الأساسية لبناء وتصميم وتشغيل واجهة النموذج الأولي',

    reactTech: 'React',
    reactTechDesc:
      'بناء واجهة المستخدم والمكونات التفاعلية للنموذج الأولي',

    webApis: 'Web APIs',
    webApisDesc:
      'التفاعل مع إمكانيات المتصفح مثل الميكروفون والتعرف على الكلام والصوت',

    futureVision: 'Future Vision',
    futureFrontend: 'Frontend — React / React Native + TypeScript',
    futureFrontendDesc:
      'واجهة متقدمة للنظارة والتطبيق المصاحب مع دعم التفاعل بالصوت والنظر وإعدادات المستخدم',

    futureBackend: 'Backend — Python + FastAPI',
    futureBackendDesc:
      'خادم لمعالجة البيانات وإدارة المستخدمين وربط خدمات الذكاء الاصطناعي وقواعد البيانات',

    futureAI: 'AI & Computer Vision',
    futureAIDesc:
      'تحليل البيئة وتتبع العين وفهم السياق وتوليد استجابات مناسبة باستخدام نماذج الذكاء الاصطناعي',

    futureCloud: 'Cloud & Database',
    futureCloudDesc:
      'تخزين البيانات وإدارة الحسابات والمزامنة باستخدام قاعدة بيانات وخدمات سحابية آمنة',
    // Mission
    missionTitle: 'رسالتنا',
    missionText:
      'Eyecan هي نموذج أولي لفكرة إنسانية تهدف إلى تسهيل التواصل للأشخاص الذين يواجهون صعوبة في التعبير. هذا النموذج ليس منتجًا نهائيًا متكاملًا، بل خطوة أولى لإثبات أن الفكرة قابلة للتحقيق والتطوير مستقبلًا',

    // Team
    teamTitle: 'الفريق',
    rama: 'راما النجار',
    ramaRole: 'Full Stack / UI, UX',
    maryam: 'مريم الجلخ',
    maryamRole: ' Full Stack',
    aya: 'آية غرايبة',
    ayaRole: 'Cybersecurity',
    najwa: 'نجوى الجولاني',
    najwaRole: 'AI / Machine Learning',

    // Footer
    quickLinks: 'روابط سريعة',
    support: 'الدعم والمساعدة',
    contactUs: 'تواصل معنا',
    humanitarian:
      'هذا نموذج أولي لمشروع إنساني يهدف إلى تطوير وسائل مساعدة للتواصل',
    problemLabel: 'التحدي',
    examples: 'أمثلة الاستخدام',
    impact: 'التأثير الإنساني',
    innovation: 'الابتكار',
    advanced: 'التقنية',
    prototype: 'النموذج الأولي',
    contactDesc: 'تواصل معنا لأي استفسار أو ملاحظة',
    footerDesc:
      'Eyecan نموذج أولي لفكرة نظارة ذكية تهدف إلى تسهيل التواصل والتعبير',
    teamSubtitle:
      'فريق يعمل على تحويل الفكرة إلى نموذج أولي قابل للتطوير',
    technologies: 'التقنيات',
    madeWithLove: 'صُنع بشغف لخدمة الإنسانية',
    rights: 'جميع الحقوق محفوظة',
    developedBy: 'طُور بواسطة',

    // Simulation Page
    simulationTitle: 'محاكاة النظارة الذكية',
    categories: 'الفئات',
    greetings: 'تحيات',
    thanks: 'شكر',
    questions: 'أسئلة',
    emergency: 'طوارئ',
    feelings: 'مشاعر',
    needs: 'احتياجات',
    daily: 'يومية',
    medical: 'طبية',

    micOn: 'الميكروفون مفتوح',
    micOff: 'الميكروفون مغلق',
    listening: 'جاري الاستماع...',
    suggestions: 'الاقتراحات',
    exitSimulation: 'إنهاء المحاكاة',
    settings: 'الإعدادات',
    dwellTime: 'وقت التثبيت',
    language: 'اللغة',
    voiceType: 'نوع الصوت',
    male: 'ذكر',
    female: 'أنثى',
    scrollUp: 'تمرير لأعلى',
    scrollDown: 'تمرير لأسفل',
  },

  en: {
    // Navigation
    home: 'Home',
    features: 'Features',
    whoWeHelp: 'Who We Help',
    technology: 'Technology',
    team: 'Team',
    simulation: 'Simulation',
    // Hero
    heroTitle: 'Smart Glasses That Restore Expression',
    heroSubtitle: 'For those who have lost speech or movement. A real bridge reconnecting humans with the world around them',
    prototypeNotice: 'Notice: This project is a prototype demonstrating a feasible concept, not a finished product ready for use.',
    tryNow: 'Try the Glasses',
    learnMore: 'Learn More',
    // Problem Section
    problemTitle: 'The Problem We Aim to Address',
    problemDesc:
      'Some people face difficulties expressing their needs and communicating with others. Eyecan explores a simple and scalable technology concept that could help make communication easier',

    // Who We Help
    whoWeHelpTitle: 'Who We Help?',

    warVictims: 'People with Communication Difficulties',
    warVictimsDesc:
      'People who may experience difficulty with verbal expression or communication due to an injury, health condition, or temporary circumstance',
    warExamples:
      'Speech difficulties • Movement difficulties • Communication challenges',

    paralysisPatients: 'People with Limited Mobility',
    paralysisPatientsDesc:
      'People who remain mentally aware but may have difficulty controlling movement and communicating',
    paralysisExamples:
      'Motor disabilities • Neurological injuries • Limited mobility',

    traumaVictims: 'People Who Need Alternative Communication',
    traumaVictimsDesc:
      'People who may benefit from assistive communication methods that make it easier to express needs and feelings',
    traumaExamples:
      'Expression difficulties • Communication challenges • Assistive communication needs',

    medicalCases: 'People Who Need Communication Support',
    medicalCasesDesc:
      'A concept that can be developed into an assistive communication solution for people facing different communication challenges',
    medicalExamples:
      'Motor conditions • Speech conditions • Communication challenges',

    // Features
    featuresTitle: 'Smart Glasses Features',
    featuresSubtitle:
      'A prototype combining voice and eye-based interaction to explore a simpler and more accessible communication experience',

    eyeTracking: 'Eye Tracking',
    eyeTrackingDesc:
      'Using eye tracking as an interaction method that can help users control and make selections in a way that suits their needs',

    smartAnalysis: 'Smart Environment Analysis',
    smartAnalysisDesc:
      'A concept based on listening and interacting with the surrounding environment to understand context and provide suitable responses',

    instantResponse: 'Instant Response',
    instantResponseDesc:
      'Fast interaction with adjustable response timing based on the user’s comfort and preferred interaction style',

    mobileApp: 'Companion App',
    mobileAppDesc:
      'A companion interface for controlling the experience, customizing settings, and adapting phrases to user needs',
    // Technology
    techTitle: 'Technologies Used',
    techSubtitle:
      'Technologies used to build the current prototype, with a clear vision for future development',

    webInteraction: 'Web & Interaction',
    eyeTrackingTech: 'Eye Tracking / Gaze Interaction',
    eyeTrackingTechDesc:
      'In this prototype, the mouse is used to simulate eye gaze and dwell time on interface elements',

    browserSpeechRecognition: 'Browser Speech Recognition',
    browserSpeechRecognitionDesc:
      'Recognizing speech and converting it into text using browser capabilities',

    browserInteraction: 'Browser-based Interaction',
    browserInteractionDesc:
      'Direct interaction and response within the browser without a backend in this prototype',

    voiceAudio: 'Voice & Audio',
    webSpeechApi: 'Web Speech API',
    webSpeechApiDesc:
      'Using browser speech capabilities to handle voice interaction',

    speechRecognitionTech: 'Speech Recognition',
    speechRecognitionTechDesc:
      'Converting spoken input from the microphone into text directly in the browser',

    speechSynthesisTech: 'Speech Synthesis',
    speechSynthesisTechDesc:
      'Converting text into speech using the voices available through the browser and device',

    development: 'Development',
    htmlCssJavascript: 'HTML / CSS / JavaScript',
    htmlCssJavascriptDesc:
      'Core technologies used to build, style, and run the prototype interface',

    reactTech: 'React',
    reactTechDesc:
      'Building the user interface and interactive components of the prototype',

    webApis: 'Web APIs',
    webApisDesc:
      'Connecting the interface with browser capabilities such as the microphone, speech recognition, and audio',

    futureVision: 'Future Vision',
    futureFrontend: 'Frontend — React / React Native + TypeScript',
    futureFrontendDesc:
      'An advanced interface for the glasses and companion application with voice, eye-based interaction, and user settings',

    futureBackend: 'Backend — Python + FastAPI',
    futureBackendDesc:
      'A backend for data processing, user management, and integration with AI services and databases',

    futureAI: 'AI & Computer Vision',
    futureAIDesc:
      'Environment analysis, eye tracking, context understanding, and response generation using AI models',

    futureCloud: 'Cloud & Database',
    futureCloudDesc:
      'Secure data storage, account management, and synchronization using cloud services and databases',
    // Mission
    missionTitle: 'Our Mission',
    missionText:
      'Eyecan is a prototype of a humanitarian concept designed to explore easier communication for people who face expression difficulties. This is not a complete final product, but a first step demonstrating that the concept is achievable and can be developed further',

    // Team
    teamTitle: 'The Team',
    rama: 'Rama AlNajjar',
    ramaRole: 'Full Stack / UI, UX',
    maryam: 'Maryam AlJalakh',
    maryamRole: ' AI / Full Stack',
    aya: 'Aya Gharaibeh',
    ayaRole: 'Cybersecurity',
    najwa: 'Najwa AlJulani',
    najwaRole: 'AI / Machine Learning',

    // Footer
    quickLinks: 'Quick Links',
    support: 'Support & Help',
    contactUs: 'Contact Us',
    humanitarian:
      'This is a prototype of a humanitarian project exploring assistive communication technologies',
    problemLabel: 'Challenge',
    examples: 'Use Cases',
    impact: 'Human Impact',
    innovation: 'Innovation',
    advanced: 'Technology',
    prototype: 'Prototype',
    contactDesc: 'Contact us for any questions or feedback',
    footerDesc:
      'Eyecan is a prototype concept for smart glasses designed to explore easier communication and expression',
    teamSubtitle:
      'A team working to transform an idea into a scalable prototype',
    technologies: 'Technologies',
    madeWithLove: 'Made with passion to serve humanity',
    rights: 'All rights reserved',
    developedBy: 'Developed by',

    // Simulation Page
    simulationTitle: 'Smart Glasses Simulation',
    categories: 'Categories',
    greetings: 'Greetings',
    thanks: 'Thanks',
    questions: 'Questions',
    emergency: 'Emergency',
    feelings: 'Feelings',
    needs: 'Needs',
    daily: 'Daily',
    medical: 'Medical',
    social: 'Social',
    responses: 'Responses',

    micOn: 'Microphone On',
    micOff: 'Microphone Off',
    listening: 'Listening...',
    suggestions: 'Suggestions',
    exitSimulation: 'Exit Simulation',
    settings: 'Settings',
    dwellTime: 'Response Timing',
    language: 'Language',
    voiceType: 'Voice Type',
    male: 'Male',
    female: 'Female',
    scrollUp: 'Scroll Up',
    scrollDown: 'Scroll Down',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ar';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};