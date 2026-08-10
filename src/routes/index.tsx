import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Sparkles, X, Download, Cloud, MessageSquare, MessageCircle, Send } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-[#0D0B1A] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0D0B1A]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">🐱</span> Cattitude
          </div>
          <div className="hidden space-x-6 md:flex">
            {["Features", "Plans", "FAQ", "Login"].map((item) => (
              <a key={item} href="#" className="text-sm text-gray-400 hover:text-[#00FF88]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-20 text-center">
        <div className="mx-auto mb-8 inline-block rounded-full border border-purple-500/30 bg-purple-900/20 px-4 py-1 text-sm text-purple-200">
          ✦ NEW VERSION IS LIVE · STARTING AT $X · NO SUBSCRIPTION
        </div>
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
          Build in Lovable. <br />
          <span className="bg-gradient-to-r from-[#FF3CAC] to-[#7B2FBE] bg-clip-text text-transparent">
            10x Faster.
          </span>
          <br />
          <span className="text-3xl text-gray-300 md:text-5xl">Without wasting a single credit.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
          Cattitude supercharges your Lovable.dev workflow. Auto-approve every prompt, optimize with AI, remove watermarks, and download your full project.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button className="rounded-full border-2 border-[#00FF88] px-8 py-3 font-semibold text-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:bg-[#00FF88] hover:text-[#0D0B1A]">
            🐱 Get Cattitude Now
          </button>
          <button className="rounded-full bg-[#7B2FBE] px-8 py-3 font-semibold hover:bg-[#6a27a8]">
            Contact on Telegram
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Out-of-This-World Features</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: <Check />, title: "Auto-Approve", desc: "Skip manual confirmation clicks." },
            { icon: <Sparkles />, title: "Optimize with AI", desc: "Smarter prompts, better output." },
            { icon: <X />, title: "Remove Watermark", desc: "Export clean, professional projects." },
            { icon: <Download />, title: "Download Full Project", desc: "Own your code completely." },
            { icon: <Cloud />, title: "Cloud Sync", desc: "Access settings from anywhere." },
            { icon: <MessageSquare />, title: "Default Chat", desc: "One-click default chat mode." },
          ].map((feat, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#7B2FBE]">
              <div className="mb-4 text-[#00FF88]">{feat.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{feat.title}</h3>
              <p className="text-gray-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fixed Support Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110">
          <MessageCircle />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110">
          <Send />
        </button>
      </div>
    </div>
  );
}
