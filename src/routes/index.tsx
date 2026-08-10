import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, useInView, useReducedMotion, LazyMotion, domAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  Check, Sparkles, X, Download, Cloud, MessageSquare, MessageCircle, Send, 
  Settings, LogOut, Plus, Bell, Cookie, Zap, Brain, Slash 
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Magnet from "@/components/react-bits/Magnet";
import StarBorder from "@/components/react-bits/StarBorder";
import GradientWaves from "@/components/react-bits/GradientWaves";
import GradualBlur from "@/components/react-bits/GradualBlur";
import GlareHover from "@/components/react-bits/GlareHover";
import MoltenMetal from "@/components/react-bits/MoltenMetal";

const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  return { mouseX, mouseY };
};


export const Route = createFileRoute("/")({
  head: () => ({
    title: "Cattitude | Build in Lovable. 10x Faster.",
    meta: [
      { name: "description", content: "Supercharge your Lovable.dev workflow with Cattitude." },
    ],
  }),
  component: Index,
});

function Index() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });
  const { mouseX, mouseY } = useMousePosition();
  const cursorX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const cursorY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(13, 11, 26, 0)", "rgba(13, 11, 26, 0.9)"]
  );
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>

      <motion.div className="min-h-screen bg-[#0D0B1A] text-white overflow-x-hidden relative">
        {/* Molten Metal Background */}
        <div className="fixed inset-0 z-0 opacity-60 pointer-events-none">
          <MoltenMetal
            color1="#0D0B1A"
            color2="#7B2FBE"
            color3="#00FF88"
            speed={0.25}
            scale={3}
            detail={4}
            glow={1.8}
            swirl={0.8}
            brightness={1.5}
          />
        </div>

        {/* Top Blur */}
        <GradualBlur position="top" height="8rem" strength={3} zIndex={40} />
        
        {/* Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7B2FBE] to-[#FF3CAC] z-[100] origin-left" style={{ scaleX }} />
        
        {/* Cursor Glow */}
        <motion.div 
          className="fixed top-0 left-0 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl pointer-events-none z-0 hidden md:block"
          style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        />

        {/* Navbar */}
        <motion.nav 
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ backgroundColor: navBackground, borderBottomColor: navBorder }}
          className="sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300"
        >
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Magnet padding={50} magnetStrength={30}>
              <div className="flex items-center gap-2 text-xl font-bold cursor-pointer">
                <span className="text-2xl">🐱</span> Cattitude
              </div>
            </Magnet>
            <div className="hidden space-x-6 md:flex">
              {["Features", "Plans", "FAQ"].map((item) => (
                <button 
                  key={item} 
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-gray-400 hover:text-[#00FF88] transition-colors relative group py-2"
                >
                  {item}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-[#00FF88] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" 
                  />
                </button>
              ))}
            </div>

            <motion.button 
              animate={{ boxShadow: ["0 0 0px rgba(0,255,136,0)", "0 0 15px rgba(0,255,136,0.4)", "0 0 0px rgba(0,255,136,0)"] }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-[#00FF88] px-4 py-1.5 text-sm font-semibold text-[#0D0B1A] hover:bg-[#00cc6c]"
            >
              Get License
            </motion.button>
          </div>
        </motion.nav>


        {/* Hero */}
        <section className="relative container mx-auto px-4 pt-20 pb-20 text-center overflow-hidden">
          <motion.div 
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute -top-40 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-900/30 blur-3xl" 
          />
          <motion.div 
            animate={{ x: [0, -30, 20, 0], y: [0, 20, -10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-40 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-blue-900/20 blur-3xl" 
          />
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div 
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mx-auto mb-8 inline-block"
            >
              <StarBorder color="#7B2FBE" speed="4s" thickness={2}>
                <div className="px-6 py-2 text-sm text-purple-200">
                  ✦ NEW VERSION IS LIVE · STARTING AT $X · NO SUBSCRIPTION
                </div>
              </StarBorder>
            </motion.div>
            <h1 className="mb-6 text-5xl font-black leading-tight md:text-[80px]">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>Build in Lovable.</motion.div>
              <motion.div 
                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                className="relative inline-block overflow-hidden"
              >
                <span className="bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#00FF88] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-flow">
                  10x Faster.
                </span>
              </motion.div>
              <br />
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-3xl text-gray-300 md:text-5xl">Without wasting a single credit.</motion.div>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">

              Cattitude supercharges your Lovable.dev workflow. Auto-approve every prompt, optimize with AI, remove watermarks, and download your full project — starting at just $X.
            </motion.p>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.0 }} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border-2 border-[#00FF88] px-8 py-3 font-semibold text-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:bg-[#00FF88] hover:text-[#0D0B1A] transition-all"
                style={{ boxShadow: "0 0 10px rgba(0, 255, 136, 0.3)" }}
                animate={{ boxShadow: ["0 0 10px rgba(0, 255, 136, 0.3)", "0 0 25px rgba(0, 255, 136, 0.5)", "0 0 10px rgba(0, 255, 136, 0.3)"] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🐱 Get Cattitude Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://t.me/your_telegram', '_blank')}
                className="rounded-full border-2 border-[#7B2FBE] px-8 py-3 font-semibold text-[#7B2FBE] shadow-[0_0_15px_rgba(123,47,190,0.3)] hover:bg-[#7B2FBE] hover:text-white transition-all"
                style={{ boxShadow: "0 0 10px rgba(123, 47, 190, 0.3)" }}
                animate={{ boxShadow: ["0 0 10px rgba(123, 47, 190, 0.3)", "0 0 25px rgba(123, 47, 190, 0.5)", "0 0 10px rgba(123, 47, 190, 0.3)"] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                💬 Contact on Telegram
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          {["Auto-Approve", "AI Optimize", "No Watermarks", "Installs in 60s", "15-day guarantee", "WhatsApp Support"].map((b, i) => (
            <motion.div 
              key={b} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="flex items-center gap-1.5"
            >
              <Check className="h-4 w-4 text-[#00FF88]" /> {b}
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-4 text-xs text-gray-600">
          One-time payment. Lifetime support.
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* UI Mockup Section */}
        <section className="container mx-auto px-4 py-20 perspective-1000">
          <GlareHover
            glareColor="#00FF88"
            glareOpacity={0.2}
            className="mx-auto max-w-sm"
            style={{ border: 'none', background: 'transparent' }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -12, 0] }}
              transition={{ 
                duration: 0.7,
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
              className="w-full rounded-2xl border border-purple-500/20 bg-[#0D0B1A]/80 backdrop-blur-xl p-4 shadow-2xl shadow-purple-900/20 transition-transform duration-300"
            >
            <div className="mb-4 text-center text-xs font-bold text-purple-400">✦ Cattitude ✦</div>
            <div className="space-y-1">
              {[
                { icon: <Settings size={18}/>, label: "License Settings" },
                { icon: <LogOut size={18}/>, label: "Sign out" },
                { icon: <Check size={18}/>, label: "Auto-Approve", badge: "ON" },
                { icon: <Sparkles size={18}/>, label: "Optimize with AI" },
                { icon: <Slash size={18}/>, label: "Remove Watermark" },
                { icon: <Plus size={18}/>, label: "Create Project in Lovable" },
                { icon: <Download size={18}/>, label: "Download Full Project" },
                { icon: <Cloud size={18}/>, label: "Migrate Cloud" },
                { icon: <MessageSquare size={18}/>, label: "Use Default Chat", active: true },
                { icon: <Bell size={18}/>, label: "Notifications", dot: true },
                { icon: <Cookie size={18}/>, label: "Cookies Manager" },
                { icon: <Cloud size={18}/>, label: "Enable Cloud" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 4 }}
                  className={`flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${item.active ? 'border border-[#00FF88]/50 text-white shadow-[0_0_10px_rgba(0,255,136,0.3)]' : 'text-gray-400 hover:bg-white/5'}`}
                  {...(item.active ? {
                    animate: { opacity: [0.5, 1, 0.5] },
                    transition: { repeat: Infinity, duration: 2 }
                  } : {})}
                >
                  <div className="flex items-center gap-3">
                    {item.icon} {item.label}
                  </div>
                  {item.badge && <span className="text-[10px] bg-[#00FF88]/20 text-[#00FF88] px-1.5 rounded">{item.badge}</span>}
                  {item.dot && (
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }} 
                      className="w-2 h-2 rounded-full bg-red-500" 
                    />
                  )}
                </motion.div>
              ))}
              </div>
            </motion.div>
          </GlareHover>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Features */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold mb-4">Out-of-This-World Features</motion.h2>
            <motion.p initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-400">Everything you need to build at lightspeed.</motion.p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: <Zap />, title: "Auto-Approve", desc: "Skip manual confirmation clicks." },
              { icon: <Brain />, title: "Optimize with AI", desc: "Smarter prompts, better output." },
              { icon: <Slash />, title: "Remove Watermark", desc: "Export clean, professional projects." },
              { icon: <Download />, title: "Download Full Project", desc: "Own your code completely." },
              { icon: <Cloud />, title: "Cloud Sync", desc: "Access settings from anywhere." },
              { icon: <MessageSquare />, title: "Default Chat", desc: "One-click default chat mode." },
            ].map((feat, i) => (
              <FeatureCard key={i} feat={feat} i={i} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Pricing */}
        <section id="plans" className="container mx-auto px-4 py-20 relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="w-[800px] h-[800px] opacity-20">
              <GradientWaves
                horizonColor="transparent"
                waveColor="#7B2FBE"
                crestColor="#FF3CAC"
                speed={0.1}
                amplitude={1}
                waveScale={0.3}
              />
            </div>
          </div>
          
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              Plans that fit your budget
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400"
            >
              No monthly subscriptions. Pay only for what you use.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {[
              { name: "1 Day", price: "$X", features: ["24hr access", "Auto-Approve", "AI Optimize", "Remove Watermark"] },
              { name: "5 Days", price: "$X", features: ["5 days access", "All features"] },
              { name: "15 Days", price: "$X", popular: "🔥 MOST POPULAR", features: ["15 days access", "All features"] },
              { name: "1 Month", price: "$X", vip: "👑 VIP", features: ["30 days access", "All features", "Priority Support"] },
              { name: "1 Year", price: "$X", features: ["365 days access", "All features", "VIP Support"] },
              { name: "Lifetime", price: "$X", best: "⭐ BEST VALUE", features: ["Permanent access", "All features", "Lifetime Updates"] },
              { name: "White Label", price: "$X", features: ["Own branding", "Unlimited resellers", "Unlimited keys", "VVIP Support"] },
              { name: "Source Code", price: "$X", features: ["Full source code", "Server source", "Master panel", "Customizable"] },
            ].map((plan, i) => (
              <Magnet key={i} padding={20} magnetStrength={40} wrapperClassName="h-full" innerClassName="h-full">
                <PricingCard plan={plan} i={i} />
              </Magnet>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* FAQ */}
        <section id="faq" className="container mx-auto max-w-3xl px-4 py-20">
            <motion.h2 
              initial={{ x: -40, opacity: 0 }} 
              whileInView={{ x: 0, opacity: 1 }} 
              viewport={{ once: true }} 
              className="mb-12 text-center text-4xl font-bold"
            >
              Frequently Asked Questions
            </motion.h2>

          <Accordion type="single" collapsible className="w-full">
            {[
              ["What is Cattitude?", "Cattitude is a Chrome extension that supercharges Lovable.dev. It auto-approves prompts, optimizes messages with AI, removes watermarks, enables full project downloads, and syncs your settings to the cloud — all from a sleek sidebar panel."],
              ["How do I install Cattitude?", "Installation takes under 60 seconds. After purchase, you receive the extension file via WhatsApp or Telegram. Load it in Chrome via Developer Mode, paste your license key, and you're ready to build at 10x speed."],
              ["Is it safe to use with my Lovable account?", "Yes. Cattitude runs entirely inside your browser. It does not collect, store, or transmit your Lovable account data or project files. Your work stays private."],
              ["How do I buy a plan?", "Click any WhatsApp or Telegram button on a plan card. Our team replies instantly with payment instructions and delivers your license key within minutes."],
              ["Do I get updates with my plan?", "Yes. All plans include silent auto-updates. Your extension updates in the background — no reinstallation needed."],
              ["Can I get a free trial?", "Yes! Contact us on Telegram for a 5-minute live demo and free trial so you can experience Cattitude before purchasing."],
            ].map(([q, a], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <AccordionItem value={`item-${i}`} className="border-white/10 group">
                  <AccordionTrigger className="text-white hover:no-underline hover:text-[#00FF88] text-left">
                    <span className="flex items-center gap-2">{q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                      {a}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <GradualBlur position="bottom" height="12rem" strength={5} zIndex={40} />

        {/* Download */}
        <section className="container mx-auto px-4 py-20">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            whileInView={{ scale: 1, opacity: 1 }} 
            viewport={{ once: true }} 
            whileHover={{ borderColor: "rgba(255, 60, 172, 0.4)" }}
            className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm text-center transition-colors"
          >
            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <motion.span whileInView={{ rotate: 360 }} viewport={{ once: true }} transition={{ duration: 0.6 }}><Settings size={28} /></motion.span>
              Ready to Build Faster?
            </h2>
            <p className="text-gray-400 mb-6">Enter your license key to download the latest version.</p>
            <input 
              type="text" 
              placeholder="Enter your license key..." 
              className="w-full bg-black/50 border border-purple-500/30 rounded-full px-6 py-3 mb-4 focus:outline-none focus:border-[#FF3CAC] focus:ring-1 focus:ring-[#FF3CAC] transition-all" 
            />
            <motion.button 
              whileHover={{ scale: 1.02, opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert('Verification and download process started...')}
              className="w-full rounded-full bg-gradient-to-r from-[#7B2FBE] to-[#FF3CAC] py-3 font-bold transition-all mb-4 flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Extension
            </motion.button>
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
              <motion.span whileInView={{ rotate: 360 }} viewport={{ once: true }}><Zap size={10} /></motion.span> Direct server link · Secure SSL encryption
            </p>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-gray-400">
              <span className="text-xl">🐱</span> Cattitude <span className="text-xs font-normal">© 2026. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white"><Send size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><MessageCircle size={20} /></a>
            </div>
          </div>
        </footer>

        {/* Support Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
            onClick={() => window.open('https://wa.me/your_number', '_blank')}
            transition={{ 
              x: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            className="h-14 w-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center transition-all hover:shadow-green-500/50 shadow-green-500/20"
          >
            <MessageCircle />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
            onClick={() => window.open('https://t.me/your_telegram', '_blank')}
            transition={{ 
              x: { delay: 1.2, duration: 0.5 },
              y: { repeat: Infinity, duration: 3, delay: 1.5, ease: "easeInOut" }
            }}
            className="h-14 w-14 rounded-full bg-blue-500 shadow-lg flex items-center justify-center transition-all hover:shadow-blue-500/50 shadow-blue-500/20"
          >
            <Send />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  </LazyMotion>
  );
}


function FeatureCard({ feat, i }: { feat: any, i: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -8, borderColor: "#FF3CAC", backgroundColor: "rgba(255, 60, 172, 0.05)" }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all group"
    >
      <motion.div 
        initial={{ rotate: 0 }}
        whileInView={{ rotate: 360 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 inline-flex p-3 rounded-full bg-white/5 text-[#00FF88] group-hover:scale-115 group-hover:bg-[#00FF88]/10 transition-all shadow-[0_0_15px_transparent] group-hover:shadow-[#00FF88]/20"
      >
        {feat.icon}
      </motion.div>
      <h3 className="mb-2 text-xl font-semibold">{feat.title}</h3>
      <p className="text-gray-400">{feat.desc}</p>
    </motion.div>
  );
}

function PricingCard({ plan, i }: { plan: any, i: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      whileHover={{ scale: 1.03, borderColor: "rgba(255, 255, 255, 0.3)" }}
      className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all h-full flex flex-col"
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF3CAC] text-[10px] font-bold px-3 py-1 rounded-full overflow-hidden">
          {plan.popular}
          <motion.div 
            animate={{ x: ["-100%", "200%"] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full" 
          />
        </div>
      )}
      {plan.vip && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-[10px] font-bold px-3 py-1 rounded-full">{plan.vip}</div>}
      {plan.best && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00FF88] text-black text-[10px] font-bold px-3 py-1 rounded-full">{plan.best}</div>}
      
      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="text-3xl font-black bg-gradient-to-r from-[#FF3CAC] to-[#7B2FBE] bg-clip-text text-transparent mb-4"
      >
        {plan.price}
      </motion.div>
      <div className="h-px bg-white/10 mb-4" />
      <ul className="space-y-2 mb-6 flex-grow">
        {plan.features.map((f: string, j: number) => (
          <li key={j} className="text-xs text-gray-400 flex items-center gap-2"><Check className="h-3 w-3 text-[#00FF88]" /> {f}</li>
        ))}
      </ul>
      <div className="flex gap-2">
        <motion.button 
          whileHover={{ scale: 1.08 }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/your_number', '_blank')}
          className="flex-1 rounded-full bg-green-500/20 text-green-500 text-xs py-2 font-bold hover:bg-green-500 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
        >
          WhatsApp
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.08 }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://t.me/your_telegram', '_blank')}
          className="flex-1 rounded-full bg-blue-500/20 text-blue-500 text-xs py-2 font-bold hover:bg-blue-500 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
        >
          Telegram
        </motion.button>
      </div>
    </motion.div>
  );
}


