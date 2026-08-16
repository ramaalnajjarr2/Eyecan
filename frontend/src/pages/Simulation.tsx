// Simulation.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Mic,
  MicOff,
  Settings,
  Power,
  Smile,
  Heart,
  HelpCircle,
  AlertTriangle,
  Activity,
  Calendar,
  Stethoscope,
  Users,
  MessageCircle,
  MapPin,
  Utensils
} from "lucide-react";
import { toast } from "@/hooks/use-toast";


interface Category {
  id: string;
  icon: React.ReactNode;
  label: string;
  phrases: string[];
}

const Simulation: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("greetings");
  const [micActive, setMicActive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [micDialogOpen, setMicDialogOpen] = useState(false);
  const [dwellTime, setDwellTime] = useState(2000);
  const [voiceType, setVoiceType] = useState<"male" | "female">("female");
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [gazeTimer, setGazeTimer] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [transcript, setTranscript] = useState<string>("");
  const [selectedPhrase, setSelectedPhrase] = useState<string>("");

  const recognitionRef = useRef<any>(null); // for Web Speech API


  // Categories (same list as عندك)
  const categories: Category[] = [
    {
      id: "greetings",
      icon: <Smile className="w-6 h-6" />,
      label: t("greetings"),
      phrases:
        language === "ar"
          ? [
            "مرحبا",
            "كيفك؟",
            "صباح الخير",
            "مساء الخير",
            "السلام عليكم",
            "أهلاً",
            "كيف حالك؟",
            "شو أخبارك؟",
            "وينك من زمان",
            "تشرفت بلقائك",
            "نورت",
            "يا هلا",
            "صباح النور",
            "مساء النور",
            "الله يسعدك",
            "منور المكان"
          ]
          : [
            "Hello",
            "How are you?",
            "Good morning",
            "Good evening",
            "Hi there",
            "Hey",
            "What's up?",
            "Nice to meet you",
            "Long time no see",
            "How have you been?",
            "Good to see you",
            "How's it going?",
            "How's everything?",
            "Welcome",
            "Greetings",
            "Howdy"
          ]
    },
    // ... (باقي التصنيفات كما في ملفك) ...
    {
      id: "thanks",
      icon: <Heart className="w-6 h-6" />,
      label: t("thanks"),
      phrases:
        language === "ar"
          ? ["شكراً", "شكراً كتير", "تسلم", "يعطيك العافية", "الله يخليك", "ما قصرت", "ممنون", "مشكور", "جزاك الله خير", "بارك الله فيك", "تسلم إيدك", "يا ريت", "من عيوني", "كتر خيرك", "الله يوفقك", "يسعد قلبك"]
          : ["Thank you", "Thanks a lot", "Thanks", "I appreciate it", "Much appreciated", "Thank you so much", "You're the best", "God bless", "Cheers", "Thanks mate", "I owe you one", "You rock", "Thanks buddy", "Grateful", "You're amazing", "Many thanks"]
    },
    {
      id: "questions",
      icon: <HelpCircle className="w-6 h-6" />,
      label: t("questions"),
      phrases:
        language === "ar"
          ? ["شو اسمك؟", "وين أنا؟", "كم الساعة؟", "ممكن تساعدني؟", "شو صار؟", "متى رح نروح؟", "ليش هيك؟", "كيف بقدر؟", "مين هذا؟", "شو هذا؟", "بكم هذا؟", "من وين؟", "لوين رايح؟", "شو رأيك؟", "بتعرف؟", "ممكن أسأل؟"]
          : ["What's your name?", "Where am I?", "What time is it?", "Can you help me?", "What happened?", "When are we going?", "Why?", "How?", "Who is this?", "What is this?", "How much?", "Where from?", "Where to?", "What do you think?", "Do you know?", "May I ask?"]
    },
    {
      id: "emergency",
      icon: <AlertTriangle className="w-6 h-6" />,
      label: t("emergency"),
      phrases:
        language === "ar"
          ? ["ساعدوني!", "بدي دكتور", "عندي وجع", "اتصل بالإسعاف", "ضروري", "بسرعة", "حالة طارئة", "بدي دواء", "مش قادر أتنفس", "خطر", "النجدة", "بموت من الوجع", "دوخة", "غثيان", "ضغطي نازل", "قلبي بوجعني"]
          : ["Help me!", "I need a doctor", "I'm in pain", "Call 911", "Emergency", "Urgent", "Quick", "I need medicine", "Can't breathe", "Danger", "Help", "It's serious", "Call ambulance", "Need help now", "Heart pain", "Dizzy"]
    },
    {
      id: "feelings",
      icon: <Heart className="w-6 h-6" />,
      label: t("feelings"),
      phrases:
        language === "ar"
          ? ["أنا مبسوط", "أنا زعلان", "تعبان كتير", "خايف", "مرتاح", "بحبك", "مشتاقلك", "قلقان", "فرحان", "مكتئب", "متضايق", "حاسس حالي تمام", "مش مرتاح", "مبسوط منك", "زهقان", "حاسس بالوحدة"]
          : ["I'm happy", "I'm sad", "I'm tired", "I'm scared", "I'm comfortable", "I love you", "I miss you", "I'm worried", "I'm excited", "I'm depressed", "I'm upset", "I feel good", "Not feeling well", "I'm grateful", "I'm bored", "Feeling lonely"]
    },
    {
      id: "needs",
      icon: <Activity className="w-6 h-6" />,
      label: t("needs"),
      phrases:
        language === "ar"
          ? ["بدي ماء", "جوعان", "بدي أنام", "بدي الحمام", "بدي أطلع برا", "بدي أرتاح", "عطشان", "برد", "حر عليّ", "بدي أقعد", "بدي أقوم", "بدي أغير ملابسي", "بدي آكل", "بدي قهوة", "بدي دش", "بدي أتمشى"]
          : ["I need water", "I'm hungry", "I want to sleep", "Need bathroom", "Want to go out", "Need rest", "I'm thirsty", "I'm cold", "I'm hot", "Want to sit", "Want to stand", "Need to change", "Want food", "Want coffee", "Need a shower", "Want to walk"]
    },
    {
      id: "daily",
      icon: <Calendar className="w-6 h-6" />,
      label: t("daily"),
      phrases:
        language === "ar"
          ? ["صباح الخير", "تصبح على خير", "وقت الفطور", "وقت الغدا", "وقت العشا", "وقت النوم", "يلا نروح", "استنى شوي", "خلص", "لسه", "بكرا", "اليوم", "إمبارح", "بعد شوي", "هلق", "كمان شوي"]
          : ["Good morning", "Good night", "Breakfast time", "Lunch time", "Dinner time", "Bedtime", "Let's go", "Wait a bit", "Done", "Not yet", "Tomorrow", "Today", "Yesterday", "In a while", "Now", "Soon"]
    },
    {
      id: "medical",
      icon: <Stethoscope className="w-6 h-6" />,
      label: t("medical"),
      phrases:
        language === "ar"
          ? ["بدي دواء", "موعد الدكتور", "فحص", "ضغط الدم", "السكر", "الحرارة", "وجع راس", "وجع بطن", "دوخة", "غثيان", "حساسية", "كحة", "رشح", "ضيق نفس", "وجع ظهر", "تعب عام"]
          : ["Need medicine", "Doctor appointment", "Check-up", "Blood pressure", "Blood sugar", "Temperature", "Headache", "Stomach ache", "Dizzy", "Nausea", "Allergy", "Cough", "Cold", "Short of breath", "Back pain", "Fatigue"]
    },
    {
      id: "social",
      icon: <Users className="w-6 h-6" />,
      label: t("social"),
      phrases:
        language === "ar"
          ? ["كيف العيلة؟", "سلملي عليهم", "الله معك", "بالتوفيق", "مبروك", "ألف سلامة", "معليش", "ما في مشكلة", "عفواً", "آسف", "مع السلامة", "تعال هون", "روح", "استنى", "خليك", "بشوفك بعدين"]
          : ["How is family?", "Say hi to them", "God be with you", "Good luck", "Congratulations", "Get well soon", "It's okay", "No problem", "Excuse me", "Sorry", "Goodbye", "Come here", "Go", "Wait", "Stay", "See you later"]
    },
    {
      id: "responses",
      icon: <MessageCircle className="w-6 h-6" />,
      label: t("responses"),
      phrases:
        language === "ar"
          ? ["أيوة", "لا", "ممكن", "أكيد", "موافق", "مش موافق", "ما بعرف", "يمكن", "طبعاً", "أبداً", "صح", "غلط", "تمام", "ماشي", "إن شاء الله", "بلكي"]
          : ["Yes", "No", "Maybe", "Sure", "I agree", "I disagree", "I don't know", "Perhaps", "Of course", "Never", "Right", "Wrong", "Okay", "Fine", "Hopefully", "Possibly"]
    },
    {
      id: "places",
      icon: <MapPin className="w-6 h-6" />,
      label: language === "ar" ? "أماكن" : "Places",
      phrases:
        language === "ar"
          ? ["البيت", "المستشفى", "المدرسة", "السوق", "المطعم", "الحديقة", "المسجد", "الكنيسة", "المطار", "الفندق", "المكتبة", "الصيدلية", "البنك", "المحطة", "المول", "الشاطئ"]
          : ["Home", "Hospital", "School", "Market", "Restaurant", "Park", "Mosque", "Church", "Airport", "Hotel", "Library", "Pharmacy", "Bank", "Station", "Mall", "Beach"]
    },
    {
      id: "food",
      icon: <Utensils className="w-6 h-6" />,
      label: language === "ar" ? "طعام" : "Food",
      phrases:
        language === "ar"
          ? ["خبز", "رز", "لحمة", "دجاج", "سمك", "خضار", "فواكه", "حليب", "جبنة", "بيض", "شاي", "قهوة", "عصير", "ماء", "حلويات", "شوربة"]
          : ["Bread", "Rice", "Meat", "Chicken", "Fish", "Vegetables", "Fruits", "Milk", "Cheese", "Eggs", "Tea", "Coffee", "Juice", "Water", "Sweets", "Soup"]
    }
  ];

  const currentCategory = categories.find((c) => c.id === selectedCategory) || categories[0];

  // ------------------------
  // Local Web Speech API (recognition) — alternative for real-time recognition
  // ------------------------
  const startLocalRecognition = () => {
    // only if browser supports
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ description: language === "ar" ? "المتصفح لا يدعم التعرف الصوتي المحلي" : "Browser doesn't support Web Speech API" });
      return;
    }
    try {
      const recog = new SpeechRecognition();
      recog.lang = language === "ar" ? "ar-SA" : "en-US";
      recog.interimResults = false;
      recog.maxAlternatives = 1;
      recog.onresult = (e: any) => {
        const text = e.results[0][0].transcript.trim();

        if (!text) return;

        setTranscript(text);

        const newSuggestions = generateSuggestionsForText(text);
        setSuggestions(newSuggestions);
      };
      recog.onerror = (ev: any) => {
        console.error("recog error", ev);
      };
      recog.onend = () => {
        // setIsRecording(false);
      };
      recognitionRef.current = recog;
      recog.start();
    } catch (err) {
      console.error("startLocalRecognition error", err);
      toast({ description: "Local recognition error" });
    }
  };

  const stopLocalRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch { }
      recognitionRef.current = null;
    }
  };

  const requestTTS = async (text: string) => {
    if (!text) return;

    speakLocal(text);
  };




  // local speechSynthesis
  const speakLocal = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = language === "ar" ? "ar-SA" : "en-US";
      u.rate = 0.95;
      u.pitch = voiceType === "female" ? 1.2 : 0.9;
      window.speechSynthesis.speak(u);
      toast({ description: text });
    } else {
      toast({ description: language === "ar" ? "المتصفح لا يدعم تحويل النص لصوت" : "Browser doesn't support speechSynthesis" });
    }
  };

  // ------------------------
  // Small helper to propose responses
  // ------------------------
  const generateSuggestionsForText = (txt: string): string[] => {
    if (!txt.trim()) return [];

    const text = txt.toLowerCase().trim();

    if (language === "ar") {
      // Greetings
      if (
        /السلام عليكم|مرحبا|مرحباً|اهلا|أهلا|أهلين|هاي|صباح الخير|مساء الخير/.test(
          text
        )
      ) {
        return [
          "وعليكم السلام",
          "أهلاً وسهلاً",
          "كيف حالك؟",
        ];
      }

      // Help / emergency
      if (
        /مساعدة|ساعدني|ساعد|طوارئ|طارئة|إسعاف|اسعاف|شرطة|خطر|نجدة/.test(
          text
        )
      ) {
        return [
          "أنا بحاجة لمساعدة",
          "اتصل بالإسعاف",
          "هذه حالة طارئة",
        ];
      }

      // Questions / confusion
      if (
        /كيف|ماذا|شو|ايش|ليش|لماذا|وين|أين|متى|مش فاهم|لا أفهم/.test(
          text
        )
      ) {
        return [
          "ممكن توضح أكثر؟",
          "ممكن تساعدني؟",
          "ممكن تعيد كلامك؟",
        ];
      }

      // Thanks
      if (/شكرا|شكرًا|مشكور|ممنون/.test(text)) {
        return [
          "العفو",
          "على الرحب والسعة",
          "ولا يهمك",
        ];
      }

      // Default
      return [
        "نعم، من فضلك",
        "لا، شكرًا",
        "ممكن بعدين",
      ];
    }

    // English

    if (/hello|hi|hey|good morning|good evening/.test(text)) {
      return [
        "Hi there",
        "How can I help?",
        "Nice to meet you",
      ];
    }

    if (/help|help me|emergency|danger|police|ambulance/.test(text)) {
      return [
        "I need help",
        "Call emergency services",
        "This is an emergency",
      ];
    }

    if (
      /how|what|why|where|when|can you|could you|i don't understand/.test(
        text
      )
    ) {
      return [
        "Can you explain more?",
        "Can you help me?",
        "Could you repeat that?",
      ];
    }

    if (/thank you|thanks|thank/.test(text)) {
      return [
        "You're welcome",
        "No problem",
        "My pleasure",
      ];
    }

    return [
      "Yes, please",
      "No, thanks",
      "Maybe later",
    ];
  };
  // ------------------------
  // Event handlers for UI (mouse-enter = gaze simulation)
  // ------------------------
  const handleMouseEnter = useCallback(
    (elementId: string, action?: () => void) => {
      setHoveredElement(elementId);

      if (gazeTimer) clearTimeout(gazeTimer);

      const timer = setTimeout(() => {
        if (action) action();

        const element = document.getElementById(elementId);
        if (element) {
          element.classList.add("ring-4", "ring-primary", "scale-105");
          setTimeout(() => {
            element.classList.remove("ring-4", "ring-primary", "scale-105");
          }, 500);
        }
      }, dwellTime);

      setGazeTimer(timer);
    },
    [dwellTime, gazeTimer]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null);
    if (gazeTimer) {
      clearTimeout(gazeTimer);
      setGazeTimer(null);
    }
  }, [gazeTimer]);

  // ------------------------
  // Microphone button handler
  // ------------------------
  const toggleMic = async () => {
    if (micActive) {
      // turning off
      setMicActive(false);
      setMicDialogOpen(false);
      setTranscript("");
      setSuggestions([]);
      stopLocalRecognition();
      return;
    }

    // turning on
    setMicActive(true);
    setMicDialogOpen(true);
    setTranscript("");
    setSuggestions([]);


    startLocalRecognition();

  };

  // ------------------------
  // When user clicks a suggested reply or phrase -> play via TTS
  // ------------------------
  const onPhraseClick = (phrase: string) => {
    requestTTS(phrase);
    setSelectedPhrase(phrase);
    setTimeout(() => setSelectedPhrase(""), 2500);
  };

  // When user clicks suggestion
  const onSuggestionClick = (s: string) => {
    requestTTS(s);
    // close mic dialog and stop mic
    setMicDialogOpen(false);
    setMicActive(false);
    stopLocalRecognition();
    setTranscript("");
    setSuggestions([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLocalRecognition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------
  // Render
  // ------------------------
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            id="power-btn"
            variant="ghost"
            size="icon"
            className="rounded-full bg-destructive/10 hover:bg-destructive/20 transition-all duration-300"
            onMouseEnter={() =>
              handleMouseEnter("power-btn", () => {
                window.location.href = "/";
              })
            }
            onMouseLeave={handleMouseLeave}
            title={t("powerOff")}
          >
            <Power className="h-5 w-5 text-destructive" />
          </Button>

          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("simulationTitle")}
          </h1>
        </div>

        <Button
          id="settings-btn"
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/80 hover:bg-background transition-all duration-300"
          onMouseEnter={() => handleMouseEnter("settings-btn", () => setSettingsOpen(true))}
          onMouseLeave={handleMouseLeave}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Categories */}
        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {categories.map((category) => (
              <div
                key={category.id}
                id={`cat-${category.id}`}
                className={`relative p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedCategory === category.id ? "bg-primary text-primary-foreground shadow-lg" : "bg-background hover:bg-accent"
                  } ${hoveredElement === `cat-${category.id}` ? "ring-2 ring-primary/50" : ""}`}
                onMouseEnter={() => handleMouseEnter(`cat-${category.id}`, () => setSelectedCategory(category.id))}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col items-center gap-1">
                  {category.icon}
                  <span className="text-[10px] text-center">{category.label}</span>
                </div>
                {hoveredElement === `cat-${category.id}` && <div className="absolute inset-0 rounded-lg animate-pulse bg-primary/20" />}
              </div>
            ))}
          </div>
        </div>

        {/* Phrases Grid */}
        <div className="flex-1 bg-card/50 backdrop-blur-sm rounded-lg p-4 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 h-full overflow-y-auto">
            {currentCategory.phrases.map((phrase, index) => (
              <div
                key={index}
                id={`phrase-${index}`}
                className={`relative p-4 bg-background rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${hoveredElement === `phrase-${index}` ? "ring-2 ring-primary scale-105" : ""
                  } ${selectedPhrase === phrase ? "bg-primary/10" : ""}`}
                onMouseEnter={() =>
                  handleMouseEnter(`phrase-${index}`, () => {
                    onPhraseClick(phrase);
                  })
                }
                onMouseLeave={handleMouseLeave}
              >
                <p className="text-center font-medium">{phrase}</p>
                {hoveredElement === `phrase-${index}` && <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 animate-pulse" />}
              </div>
            ))}
          </div>
        </div>

        {/* Microphone Button */}
        <div className="flex justify-center">
          <Button
            id="mic-btn"
            variant={micActive ? "destructive" : "default"}
            size="lg"
            className={`rounded-full w-20 h-20 transition-all duration-300 ${micActive ? "animate-pulse shadow-lg shadow-destructive/50" : ""} ${hoveredElement === "mic-btn" ? "scale-110" : ""}`}
            onMouseEnter={() =>
              handleMouseEnter("mic-btn", () => {
                toggleMic();
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            {micActive ? <Mic className="h-8 w-8" /> : <MicOff className="h-8 w-8" />}
          </Button>
        </div>
      </div>

      {/* Microphone Dialog */}
      <Dialog open={micDialogOpen} onOpenChange={setMicDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">{language === "ar" ? "الاستماع للبيئة المحيطة" : "Listening to Environment"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Transcript */}
            {transcript && (
              <Card className="p-4 bg-muted animate-fade-in">
                <p className="text-sm text-muted-foreground mb-1">{language === "ar" ? "ما سمعته:" : "What I heard:"}</p>
                <p className="font-medium">{transcript}</p>
              </Card>
            )}

            {/* response  Suggestions */}

            {suggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{language === "ar" ? "ردود مقترحة:" : "Suggested responses:"}</p>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    id={`suggestion-${index}`}
                    className={`p-3 bg-background rounded-lg cursor-pointer transition-all duration-300 hover:bg-accent ${hoveredElement === `suggestion-${index}` ? "ring-2 ring-primary scale-105" : ""}`}
                    onMouseEnter={() => handleMouseEnter(`suggestion-${index}`, () => onSuggestionClick(suggestion))}
                    onMouseLeave={handleMouseLeave}
                    // keep onMouseEnter behavior as original; user can still click the suggestion if prefer
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            )}

            {!transcript && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2">
                  <div className="animate-pulse w-2 h-2 bg-primary rounded-full" />
                  <div className="animate-pulse w-2 h-2 bg-primary rounded-full delay-150" />
                  <div className="animate-pulse w-2 h-2 bg-primary rounded-full delay-300" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{language === "ar" ? "جاري الاستماع..." : "Listening..."}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("settings")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>
                {t("dwellTime")}: {dwellTime}ms
              </Label>
              <Slider value={[dwellTime]} onValueChange={(value) => setDwellTime(value[0])} min={500} max={3000} step={100} />
            </div>

            <div className="space-y-2">
              <Label>{t("voiceType")}</Label>
              <Select value={voiceType} onValueChange={(value: "male" | "female") => setVoiceType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t("male")}</SelectItem>
                  <SelectItem value="female">{t("female")}</SelectItem>
                </SelectContent>
              </Select>
            </div>


          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Simulation;
