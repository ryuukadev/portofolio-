"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, MapPin, MessageCircle, Check, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactDockKeyboard } from "@/components/ui/ContactDockKeyboard";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
};

async function fireConfetti() {
  const confetti = (await import("canvas-confetti")).default;
  confetti({
    particleCount: 110,
    spread: 90,
    origin: { y: 0.65 },
    zIndex: 9999,
    colors: ["#ffffff", "#64748a", "#000000", "#f8fafc"],
  });
}

function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("contact-messages");
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch {
        setMessages([]);
      }
    }
  }, []);

  // Save messages to localStorage
  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem("contact-messages", JSON.stringify(newMessages));
    setMessages(newMessages);
  };

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    await fireConfetti();

    // Save message to history
    const newMessage: Message = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: Date.now(),
    };
    saveMessages([newMessage, ...messages]);

    setIsSent(true);
    setIsSubmitting(false);
    toast.success(t.contact.toastTitle, {
      description: t.contact.toastDesc,
    });
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSent(false);
    }, 2800);
  };

  return (
    <section id="kontak" className="py-10 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <span className={cn("h-px w-8", isDark ? "bg-white/15" : "bg-black/10")} />
          <span className={cn("text-[11px] font-bold tracking-[0.18em]", isDark ? "text-white/35" : "text-black/35")}>
            {t.contact.sectionNumber}
          </span>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
          {/* Info — static cards */}
          <div className="space-y-4">
            <h3 className={cn("font-black tracking-tighter text-[22px] leading-none", isDark ? "text-white" : "text-neutral-800")}>
              {t.contact.heading}
            </h3>
            <p className={cn("text-[13px] leading-6", isDark ? "text-white/60" : "text-neutral-600")}>
              {t.contact.intro}
            </p>

            {/* Contact Dock Keyboard */}
            <ContactDockKeyboard />

            <GlassCard className="p-5 flex gap-4 items-start">
              <div className={cn("w-10 h-10 rounded-xl grid place-items-center shrink-0 shadow-[3px_3px_0px_rgba(0,0,0,0.2)]", isDark ? "bg-white" : "bg-neutral-900")}>
                <Mail className={cn("w-5 h-5", isDark ? "text-black" : "text-white")} />
              </div>
              <div>
                <p className={cn("text-[11px] font-black tracking-widest", isDark ? "text-white/40" : "text-neutral-500")}>{t.contact.infoEmail}</p>
                <p className={cn("text-[13px] font-semibold", isDark ? "text-white" : "text-neutral-800")}>{personalInfo.email}</p>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex gap-4 items-start">
              <div className={cn("w-10 h-10 rounded-xl grid place-items-center shrink-0 border shadow-[3px_3px_0px_rgba(0,0,0,0.15)]", isDark ? "bg-neutral-900 border-white/10" : "bg-neutral-100 border-neutral-300")}>
                <MapPin className={cn("w-5 h-5", isDark ? "text-white" : "text-neutral-800")} />
              </div>
              <div>
                <p className={cn("text-[11px] font-black tracking-widest", isDark ? "text-white/40" : "text-neutral-500")}>{t.contact.infoLocation}</p>
                <p className={cn("text-[13px] font-semibold", isDark ? "text-white" : "text-neutral-800")}>{t.contact.infoLocationValue}</p>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex gap-4 items-start">
              <div className={cn("w-10 h-10 rounded-xl grid place-items-center shrink-0 border", isDark ? "bg-neutral-900 border-white/10" : "bg-neutral-100 border-neutral-300")}>
                <MessageCircle className={cn("w-5 h-5", isDark ? "text-white" : "text-neutral-800")} />
              </div>
              <div>
                <p className={cn("text-[11px] font-black tracking-widest", isDark ? "text-white/40" : "text-neutral-500")}>{t.contact.infoResponse}</p>
                <p className={cn("text-[13px] font-semibold", isDark ? "text-white" : "text-neutral-800")}>{t.contact.infoResponseValue}</p>
              </div>
            </GlassCard>
          </div>

          {/* Form */}
          <GlassCard className="p-6 sm:p-7">
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="py-10 text-center"
                >
                  <div className={cn("w-16 h-16 mx-auto rounded-2xl grid place-items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)]", isDark ? "bg-white" : "bg-neutral-900")}>
                    <Check className={cn("w-8 h-8", isDark ? "text-black" : "text-white")} />
                  </div>
                  <h4 className={cn("mt-4 font-black tracking-tighter text-[20px]", isDark ? "text-white" : "text-neutral-800")}>{t.contact.sentTitle}</h4>
                  <p className={cn("mt-1 text-[13px]", isDark ? "text-white/60" : "text-neutral-600")}>{t.contact.sentDesc}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className={cn("text-[11px] font-black tracking-widest flex items-center gap-1.5", isDark ? "text-white/60" : "text-neutral-500")}>
                      <User className="w-3.5 h-3.5" /> {t.contact.formName}
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.formNamePlaceholder}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-neutral-500/40 text-[14px]",
                        isDark
                          ? "bg-white/5 text-neutral-100 placeholder:text-neutral-400 border-white/10"
                          : "bg-neutral-100 text-neutral-800 placeholder:text-neutral-500 border-neutral-300"
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={cn("text-[11px] font-black tracking-widest flex items-center gap-1.5", isDark ? "text-white/60" : "text-neutral-500")}>
                      <Mail className="w-3.5 h-3.5" /> {t.contact.formEmail}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="nama@email.com"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-neutral-500/40 text-[14px]",
                        isDark
                          ? "bg-white/5 text-neutral-100 placeholder:text-neutral-400 border-white/10"
                          : "bg-neutral-100 text-neutral-800 placeholder:text-neutral-500 border-neutral-300"
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={cn("text-[11px] font-black tracking-widest flex items-center gap-1.5", isDark ? "text-white/60" : "text-neutral-500")}>
                      <MessageCircle className="w-3.5 h-3.5" /> {t.contact.formMessage}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={t.contact.formMessagePlaceholder}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-neutral-500/40 resize-none text-[14px] leading-6",
                        isDark
                          ? "bg-white/5 text-neutral-100 placeholder:text-neutral-400 border-white/10"
                          : "bg-neutral-100 text-neutral-800 placeholder:text-neutral-500 border-neutral-300"
                      )}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01, y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className={cn(
                      "w-full skew-x-[-8deg] py-3.5 shadow-[5px_5px_0px_rgba(0,0,0,0.2)] disabled:opacity-60 disabled:cursor-not-allowed",
                      isDark ? "bg-white shadow-[5px_5px_0px_black]" : "bg-neutral-900 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
                    )}
                  >
                    <span className={cn("skew-x-[8deg] inline-flex items-center justify-center gap-2 text-[13px] font-black tracking-widest", isDark ? "text-black" : "text-white")}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> {t.contact.submitting}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> {t.contact.submit}
                        </>
                      )}
                    </span>
                  </motion.button>

                  <p className={cn("text-center text-[11px] font-semibold tracking-wide", isDark ? "text-white/35" : "text-neutral-500")}>
                    {t.contact.consent}
                  </p>
                </motion.form>

                {/* Message History */}
                {messages.length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <h4 className={cn("font-black tracking-widest text-[12px] mb-4", isDark ? "text-white/60" : "text-neutral-500")}>
                      {t.contact.messageHistory}
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {messages.map((msg) => (
                        <GlassCard key={msg.id} className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className={cn("font-semibold text-[13px]", isDark ? "text-white" : "text-neutral-800")}>
                                {msg.name}
                              </p>
                              <p className={cn("text-[11px] font-medium", isDark ? "text-white/50" : "text-neutral-500")}>
                                {msg.email}
                              </p>
                              <p className={cn("mt-2 text-[12px] leading-5", isDark ? "text-white/70" : "text-neutral-600")}>
                                {msg.message}
                              </p>
                              <p className={cn("mt-2 text-[10px] font-medium tracking-wide", isDark ? "text-white/35" : "text-neutral-400")} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Clock className="w-3 h-3" /> {formatTime(msg.timestamp)}
                              </p>
                            </div>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                )}
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
