import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, useInView, useReducedMotion, LazyMotion, domAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  Check, Sparkles, X, Download, Cloud, MessageSquare, MessageCircle, Send, 
  Settings, LogOut, Plus, Bell, Cookie, Zap, Brain, Slash 
} from "lucide-react";
import logoAsset from "@/assets/cat-icon-new.png.asset.json";
import { CatIcon } from "@/components/CatIcon";


import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Magnet from "@/components/react-bits/Magnet";
import StarBorder from "@/components/react-bits/StarBorder";
import GradientWaves from "@/components/react-bits/GradientWaves";
import GradualBlur from "@/components/react-bits/GradualBlur";
import GlareHover from "@/components/react-bits/GlareHover";
import MoltenMetal from "@/components/react-bits/MoltenMetal";
import CustomCursor from "@/components/CustomCursor";


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

// ── License validation config (publishable key — read-only, safe in frontend) ──
const _cfg = {
  u: "https://ndmnxixwcdnpmebbzgmv.supabase.co/rest/v1",
  k: "sb_publishable_pcE3bVaLZcoiO_Bo9_0yCA_iP_GJL6y",
};

// The Drive link is split + encoded so it can't be found by searching the source.
// Do NOT expose this as a plain string anywhere in the bundle.
function _resolveAsset(valid: boolean): string {
  if (!valid) return "";
  // Base64-encoded Drive URL, decoded only after a valid server-confirmed key.
  // Changing DRIVE_LINK: encode your new URL with btoa() and replace the string below.
  const _p = [
    "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8x",
    "QTA1V1RWLVVERzFGci1XOU5ERDNOd1lsTWh2RW1FOQ==",
    "L3ZpZXc/dXNwPXNoYXJpbmc=",
  ];
  try {
    return atob(_p[0]!) + atob(_p[1]!) + atob(_p[2]!);
  } catch {
    return "";
  }
}

async function _verifyKey(key: string): Promise<{
  ok: boolean;
  error?: string;
  daysLeft?: number | null;
}> {
  const ep = `${_cfg.u}/license_keys?key=eq.${encodeURIComponent(key)}&select=status,expires_at`;
  let res: Response;
  try {
    res = await fetch(ep, {
      headers: {
        apikey: _cfg.k,
        Authorization: "Bearer " + _cfg.k,
        "Content-Type": "application/json",
      },
    });
  } catch {
    return { ok: false, error: "Network error. Check your connection." };
  }
  if (!res.ok) return { ok: false, error: "Database error (" + res.status + ")." };
  const rows: Array<{ status: string; expires_at: string | null }> = await res.json();
  if (!rows || rows.length === 0) return { ok: false, error: "Key not found. Check for typos." };
  const row = rows[0]!;
  if (row.status === "revoked") return { ok: false, error: "This key has been revoked." };
  if (row.expires_at) {
    const exp = new Date(row.expires_at);
    if (exp < new Date()) {
      const d = exp.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      return { ok: false, error: `Key expired on ${d}. Contact @Bhavishyadalal to renew.` };
    }
    const daysLeft = Math.ceil((exp.getTime() - Date.now()) / 86400000);
    return { ok: true, daysLeft };
  }
  return { ok: true, daysLeft: null };
}

type DlState = "idle" | "loading" | "error" | "success";

function DownloadSection() {
  const [key, setKey] = useState("");
  const [state, setState] = useState<DlState>("idle");
  const [msg, setMsg] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [daysLeft, setDaysLeft] = useState<number | null | undefined>(undefined);

  // Auto-format input to CATT-XXXX-XXXX-XXXX
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const segs = [raw.slice(0, 4), raw.slice(4, 8), raw.slice(8, 12), raw.slice(12, 16)];
    setKey(segs.filter(Boolean).join("-"));
    if (state === "error") { setState("idle"); setMsg(""); }
  }

  async function handleVerify() {
    if (state === "loading") return;
    const trimmed = key.trim();
    if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(trimmed)) {
      setState("error");
      setMsg("Invalid format — key should look like CATT-XXXX-XXXX-XXXX.");
      return;
    }
    setState("loading");
    setMsg("");
    setDriveUrl("");
    const result = await _verifyKey(trimmed);
    if (result.ok) {
      // Only resolve the link after confirmed valid — never before
      const url = _resolveAsset(true);
      setDriveUrl(url);
      setDaysLeft(result.daysLeft);
      setState("success");
    } else {
      setState("error");
      setMsg(result.error ?? "Verification failed.");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleVerify();
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ borderColor: "rgba(255, 60, 172, 0.4)" }}
      className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm text-center transition-colors"
    >
      <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
        <motion.span whileInView={{ rotate: 360 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Settings size={28} />
        </motion.span>
        Ready to Build Faster?
      </h2>
      <p className="text-gray-400 mb-6">Enter your license key to download the latest version.</p>

      <input
        type="text"
        value={key}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        maxLength={19}
        autoComplete="off"
        spellCheck={false}
        placeholder="CATT-XXXX-XXXX-XXXX"
        className={[
          "w-full bg-black/50 border rounded-full px-6 py-3 mb-4 font-mono tracking-widest text-sm",
          "focus:outline-none transition-all placeholder:font-sans placeholder:tracking-normal",
          state === "error"
            ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : state === "success"
            ? "border-[#00FF88]/60 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88]"
            : "border-purple-500/30 focus:border-[#FF3CAC] focus:ring-1 focus:ring-[#FF3CAC]",
        ].join(" ")}
      />

      <motion.button
        whileHover={{ scale: state === "loading" ? 1 : 1.02, opacity: state === "loading" ? 0.7 : 0.9 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleVerify}
        disabled={state === "loading"}
        className="w-full rounded-full bg-gradient-to-r from-[#7B2FBE] to-[#FF3CAC] py-3 font-bold transition-all mb-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Verifying...
          </>
        ) : (
          <>
            <Download size={18} /> Verify &amp; Download
          </>
        )}
      </motion.button>

      {/* Error state */}
      {state === "error" && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mb-3"
        >
          ✗ {msg}{" "}
          {msg.includes("not found") || msg.includes("revoked") || msg.includes("expired") ? (
            <a
              href="https://t.me/Bhavishyadalal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              @Bhavishyadalal
            </a>
          ) : null}
        </motion.p>
      )}

      {/* Success state — drive link revealed only here, not in DOM until verified */}
      {state === "success" && driveUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-4 rounded-xl border border-[#00FF88]/30 bg-[#00FF88]/5"
        >
          <p className="text-[#00FF88] font-bold text-sm mb-1">✓ Key verified!</p>
          <p className="text-gray-400 text-xs mb-3">
            {daysLeft === null || daysLeft === undefined
              ? "Lifetime license"
              : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining`}
          </p>
          <motion.a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#00FF88] text-[#0D0B1A] px-6 py-2.5 font-bold text-sm transition-all hover:bg-[#00cc6c]"
          >
            <Download size={16} /> Download Cattitude
          </motion.a>
        </motion.div>
      )}

      <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1 mt-4">
        <motion.span whileInView={{ rotate: 360 }} viewport={{ once: true }}>
          <Zap size={10} />
        </motion.span>{" "}
        Verified via secure license server · SSL encrypted
      </p>
    </motion.div>
  );
}

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

      <motion.div className="min-h-screen bg-[#0D0B1A] text-white overflow-x-hidden relative cursor-none">
        <CustomCursor />

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
              <div className="flex items-center gap-2 text-xl font-bold cursor-pointer font-display group">
                <div className="relative">
                  <img 
                    src={logoAsset.url} 
                    alt="Logo" 
                    className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" 
                  />
                  <div className="absolute inset-0 bg-[#00FF88]/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                </div>
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Cattitude</span>
              </div>
            </Magnet>
            <div className="hidden space-x-6 md:flex">
              {["Features", "Plans", "FAQ", "Download"].map((item) => (
                <button 
                  key={item} 
                  onClick={() => {
                    if (item === "Download") {
                      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
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
                  ✦ NEW VERSION IS LIVE · STARTING AT $1 · NO SUBSCRIPTION
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

              Cattitude supercharges your Lovable.dev workflow. Auto-approve every prompt, optimize with AI, remove watermarks, and download your full project — starting at just $1.
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
                <img src={logoAsset.url} className="w-6 h-6 inline-block mr-2 object-contain" alt="" /> Get Cattitude Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://t.me/Bhavishyadalal', '_blank')}
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

        {/* Extension UI Showcase Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 0.9, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-bold mb-6 tracking-widest uppercase">
                Premium Extension Interface
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display leading-tight">
                Powerful Modules. <br />
                <span className="text-[#7B2FBE]">Intuitive Design.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl font-sans leading-relaxed">
                Experience a revolutionary workflow with our high-end Chrome extension. Every module is crafted for performance, giving you total control over your Lovable projects directly from a sleek, neon-infused sidebar.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "One-Click Approve", desc: "No more manual clicks. Auto-approve prompts instantly." },
                  { title: "Pro Analytics", desc: "Track your usage and credits in real-time." },
                  { title: "Cloud Migration", desc: "Move your projects across environments seamlessly." },
                  { title: "VIP Support", desc: "Direct access to our expert team whenever you need it." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#7B2FBE]/20 flex items-center justify-center text-[#7B2FBE]">
                      <Check size={12} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 font-display">{item.title}</h4>
                      <p className="text-gray-500 text-sm font-sans">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Visual Mockup */}
            <div className="relative flex justify-center items-center">
              {/* Decorative Glows */}
              <div className="absolute -z-10 w-[120%] h-[120%] bg-gradient-to-tr from-[#7B2FBE]/20 via-transparent to-[#00FF88]/20 blur-[100px]" />
              
              {/* Main Panel (License Settings) */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-20 w-full max-w-[310px] rounded-[32px] border border-white/10 bg-[#0D0B1A]/95 backdrop-blur-3xl p-5 shadow-2xl shadow-black/50"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      <Settings size={18} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-200">License Settings</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors cursor-pointer">
                    <X size={16} />
                  </div>
                </div>

                {/* Profile Section */}
                <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7B2FBE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-gradient-to-br from-[#7B2FBE] to-[#FF3CAC] p-0.5">
                      <div className="w-full h-full bg-[#0D0B1A] flex items-center justify-center overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop" className="w-full h-full object-cover" alt="Profile" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base">@USER</span>
                        <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-black">PRO</span>
                      </div>
                      <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider">PRO LIFETIME PLAN</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Activation</div>
                      <div className="text-xs font-bold text-gray-300">08/05/2026</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Expiration</div>
                      <div className="text-xs font-bold text-gray-300">09/04/2026</div>
                    </div>
                  </div>
                  <div className="mt-6">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500">Plan Time</span>
                        <span className="text-[9px] font-bold text-red-500">29D 8H LEFT</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "70%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-red-500 rounded-full" 
                        />
                     </div>
                  </div>
                </div>

                {/* Method Selection */}
                <div className="space-y-4 mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-500" /> Which method do you want to use?
                  </div>
                  {[
                    { id: "01", name: "METHOD 1", sub: "" },
                    { id: "02", name: "METHOD 2", sub: "Standard sending", active: true },
                    { id: "03", name: "METHOD 3", sub: "Advanced sending" },
                    { id: "04", name: "METHOD 4", sub: "Native DOM Send" },
                  ].map((method) => (
                    <motion.div 
                      key={method.id}
                      whileHover={{ x: 4 }}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${method.active ? 'border-red-500 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${method.active ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-500'}`}>
                          {method.id}
                        </div>
                        <div>
                          <div className={`text-xs font-black tracking-widest ${method.active ? 'text-white' : 'text-gray-400'}`}>{method.name}</div>
                          {method.sub && <div className="text-[9px] text-gray-600">{method.sub}</div>}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method.active ? 'border-red-500 bg-red-500' : 'border-white/10'}`}>
                         {method.active && <Check size={12} className="text-white" />}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Auto Texts */}
                <div className="mb-8">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-500" /> Auto Texts
                  </div>
                  <div className="h-24 w-full rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center border-dashed border-gray-700">
                    <span className="text-[10px] uppercase tracking-widest text-gray-600">No active text.</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <button className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-colors mb-6 group">
                   <div className="w-4 h-0.5 bg-red-500 group-hover:w-6 transition-all" />
                   Manage Texts
                   <div className="w-4 h-0.5 bg-red-500 group-hover:w-6 transition-all" />
                </button>

                <div className="flex items-center justify-between px-2 text-[9px] font-bold text-gray-600">
                  <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                    <MessageSquare size={12} /> SUPPORT
                  </div>
                  <div className="text-red-500 tracking-widest uppercase">Cattitude AI</div>
                  <div className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5">V16.8</div>
                </div>
              </motion.div>

              {/* Sidebar Menu */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute left-[88%] lg:left-[85%] top-16 z-10 w-12 rounded-[28px] border border-white/10 bg-[#0D0B1A]/95 backdrop-blur-3xl p-2.5 flex flex-col gap-5 shadow-2xl shadow-black/50"
              >
                <div className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-white transition-colors cursor-pointer">
                   <Check size={18} className="rotate-180" />
                </div>
                {[
                  { icon: <Settings size={18} />, active: false },
                  { icon: <LogOut size={18} />, active: false },
                  { icon: <Check size={18} />, active: false },
                  { icon: <Zap size={18} />, active: false },
                  { icon: <Sparkles size={18} />, active: false },
                  { icon: <Plus size={18} />, active: false },
                  { icon: <Cloud size={18} />, active: false },
                  { icon: <MessageSquare size={18} />, active: true },
                  { icon: <Bell size={18} />, active: false, dot: true },
                  { icon: <Cookie size={18} />, active: false },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex justify-center group">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer ${item.active ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20' : 'text-gray-600 hover:text-gray-300'}`}>
                      {item.icon}
                    </div>
                    {item.dot && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-[#0D0B1A]" />}
                    {item.active && <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#00FF88] rounded-full" />}
                  </div>
                ))}
                
                <div className="mt-8 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)] relative">
                    <img src={logoAsset.url} className="w-5 h-5 object-contain" alt="" />
                    <div className="absolute inset-0 bg-red-500 blur-md opacity-50 rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Features */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} 
              viewport={{ once: true }} 
              className="text-4xl md:text-5xl font-bold mb-4 font-display"
            >
              Out-of-This-World Features
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }} 
              className="text-gray-400 font-sans"
            >
              Everything you need to build at lightspeed.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: "Auto-Approve", desc: "Skip manual confirmation clicks and speed up your workflow." },
              { icon: <Settings />, title: "License Management", desc: "Easily activate and manage your Pro lifetime plans." },
              { icon: <Check />, title: "Native DOM Send", desc: "High-performance messaging using native browser methods." },
              { icon: <Download />, title: "Full Project Export", desc: "Own your code completely. Download the entire project in one click." },
              { icon: <MessageCircle />, title: "Auto Texts", desc: "Manage and automate your frequently used responses." },
              { icon: <Sparkles />, title: "Optimize with AI", desc: "Smarter prompts, better output. Get the most out of every interaction." },
            ].map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: "rgba(0, 255, 136, 0.3)" }}
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#00FF88]/10 text-[#00FF88] group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white font-display">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">{feat.desc}</p>
              </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {[
              { name: "Trial", price: "Free", features: ["5-min access", "Live demo", "Contact admin for trial"] },
              { name: "1 Day", price: "$1", features: ["24hr access", "Auto-Approve", "AI Optimize", "Remove Watermark"] },
              { name: "5 Days", price: "$2", popular: "🔥 MOST POPULAR", features: ["5 days access", "All features"] },
              { name: "15 Days", price: "$5", features: ["15 days access", "All features"] },
              { name: "1 Month", price: "$7", vip: "👑 VIP", features: ["30 days access", "All features", "Priority Support"] },
              { name: "1 Year", price: "$65", features: ["365 days access", "All features", "VIP Support"] },
              { name: "Lifetime", price: "$75", best: "⭐ BEST VALUE", features: ["Permanent access", "All features", "Lifetime Updates"] },
              { name: "White Label", price: "$95", features: ["Own branding", "Unlimited resellers", "Unlimited keys", "VVIP Support"] },
              { name: "Source Code", price: "$90", features: ["Full source code", "Server source", "Master panel", "Customizable"] },
            ].map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative flex flex-col p-8 rounded-3xl border ${plan.popular ? 'border-[#FF3CAC]/50 bg-[#FF3CAC]/5 shadow-2xl shadow-[#FF3CAC]/10' : 'border-white/10 bg-white/5'} backdrop-blur-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF3CAC] text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-wider whitespace-nowrap">
                    {plan.popular}
                  </div>
                )}
                {plan.vip && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-wider whitespace-nowrap">
                    {plan.vip}
                  </div>
                )}
                {plan.best && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FF88] text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-wider whitespace-nowrap">
                    {plan.best}
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2 text-white font-display">{plan.name}</h3>
                <div className="text-4xl font-black bg-gradient-to-r from-[#FF3CAC] to-[#7B2FBE] bg-clip-text text-transparent mb-6">
                  {plan.price}
                </div>
                
                <div className="h-px bg-white/10 mb-6" />
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-gray-400 flex items-center gap-3 font-sans">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00FF88]/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-[#00FF88]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('https://t.me/Bhavishyadalal', '_blank')}
                    className="w-full rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs py-3 font-black hover:bg-green-500 hover:text-white transition-all shadow-[0_0_15px_rgba(34,197,94,0.1)] uppercase tracking-widest"
                  >
                    WhatsApp
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open('https://t.me/Bhavishyadalal', '_blank')}
                    className="w-full rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs py-3 font-black hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] uppercase tracking-widest"
                  >
                    Telegram
                  </motion.button>
                </div>
              </motion.div>
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
        <section id="download" className="container mx-auto px-4 py-20">
          <DownloadSection />
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-gray-400 font-display group">
              <img src={logoAsset.url} className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100" alt="" /> Cattitude <span className="text-xs font-normal">© 2026. All rights reserved.</span>
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
            onClick={() => window.open('https://t.me/Bhavishyadalal', '_blank')}
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
            onClick={() => window.open('https://t.me/Bhavishyadalal', '_blank')}
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




