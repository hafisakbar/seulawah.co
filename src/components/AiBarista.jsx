import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, ChefHat, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

// ─── Menu data (harus sinkron dengan MenuHighlight.jsx) ───────────────────────
const MENU_CATALOG = [
  { id: 1, name: "Strawberry Yakult",       price: "Rp 25.000", category: "minuman", desc: "Minuman segar perpaduan stroberi dan yakult, dingin dan asam-manis."   },
  { id: 2, name: "Pisang Coklat Lumer",     price: "Rp 25.000", category: "cemilan", desc: "Pisang goreng premium dibalut coklat lumer, cocok untuk cemilan sore."   },
  { id: 3, name: "Ayam Bakar Seulawah",     price: "Rp 35.000", category: "makanan", desc: "Ayam bakar bumbu khas Aceh, gurih dan sedikit pedas, cocok makan malam." },
  { id: 4, name: "Soto Ayam",               price: "Rp 22.000", category: "makanan", desc: "Kuah soto ayam hangat dengan cita rasa rempah nusantara."                },
];

// ─── Build system prompt ───────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Kamu adalah Minin, AI Barista virtual dari Seulawah.Co — sebuah cafe & resto beachfront di Meulaboh, Aceh Barat yang terkenal dengan pemandangan laut dan kopi khas Aceh.

Tugasmu:
1. Menyambut tamu dengan hangat dan ramah dalam bahasa Indonesia sehari-hari (boleh sedikit santai/gaul).
2. Merekomendasikan menu berdasarkan mood, selera, waktu kunjungan, atau cuaca yang disebutkan tamu.
3. Menjawab pertanyaan seputar menu, harga, suasana, lokasi, dan jam buka Seulawah.Co.
4. Jika tamu mau pesan, arahkan mereka ke tombol "Tambah ke Keranjang" di halaman menu, atau ke WhatsApp.

Informasi Seulawah.Co:
- Lokasi: Jl. Nasional, Meulaboh, Aceh Barat (pinggir pantai)
- Jam buka: 10.00–23.00 WIB setiap hari
- Jam ramai: 17.00–20.00 (sunset — waktu terbaik datang!)
- Suasana: live music tiap Jumat & Sabtu malam, pemandangan sunset, angin laut

Daftar Menu saat ini:
${MENU_CATALOG.map(m => `- ${m.name} (${m.category}) — ${m.price}: ${m.desc}`).join('\n')}

Gaya komunikasi: hangat, friendly, pakai emoji sesekali 🌅☕🌊. Jawaban singkat dan to the point (maks 3–4 kalimat). Jika tidak tahu sesuatu, bilang jujur dan sarankan tanya langsung via WhatsApp.`;

// ─── Call Groq API (OpenAI-compatible, CORS-friendly) ────────────────────────
async function callAI(messages, apiKey) {
  const payload = {
    model: 'openai/gpt-oss-120b',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
    ],
    temperature: 0.8,
    max_tokens: 500,
  };

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq error: HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'Maaf, ada kendala teknis. Coba lagi ya! 🙏';
}

// ─── Quick prompt chips ───────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  "Rekomendasiin minuman segar dong!",
  "Lagi mau makan berat, apa ya?",
  "Cemilan buat nemenin sunset?",
  "Jam berapa paling enak datang?",
];

// ─── Format markdown (bold, italic, newlines) ─────────────────────────────
const formatMessage = (text) => {
  if (!text) return null;

  return text.split('\n').map((line, lineIdx, arr) => {
    const parts = [];
    const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIdx) {
        parts.push(line.substring(lastIdx, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={`${lineIdx}-${match.index}`} className="font-bold">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(
          <em key={`${lineIdx}-${match.index}`} className="italic">
            {token.slice(1, -1)}
          </em>
        );
      }
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < line.length) {
      parts.push(line.substring(lastIdx));
    }

    return (
      <React.Fragment key={lineIdx}>
        {parts.length > 0 ? parts : ' '}
        {lineIdx < arr.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

// ─── Message bubble ───────────────────────────────────────────────────────────
const Bubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-ocean-500 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot size={14} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-ocean-500 text-white rounded-br-sm'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-600'
        }`}
      >
        {formatMessage(msg.content)}
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AiBarista = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Halo! Aku Minin, AI Barista Seulawah.Co ☕🌊\nMau rekomendasikan menu, cerita suasana cafe, atau tanya-tanya dulu? Yuk ngobrol!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey] = useState(() => import.meta.env.VITE_GROQ_API_KEY || '');
  const [noKey, setNoKey] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    if (!apiKey) {
      setNoKey(true);
      return;
    }

    setNoKey(false);
    const userMsg = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await callAI(nextMessages, apiKey);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Aduh, ada error nih: "${e.message}". Coba lagi ya! 🙏` },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading, apiKey]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="Buka AI Barista"
      >
        <div className="relative bg-gradient-to-br from-ocean-500 to-ocean-700 text-white p-4 rounded-full shadow-2xl hover:shadow-ocean-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center">
          <ChefHat size={28} />
          {/* Sparkle badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-sunset-500 shadow-md">
            <Sparkles size={11} className="text-white" />
          </span>
          {/* Ping ring */}
          <span className="absolute inset-0 rounded-full border-2 border-ocean-400 animate-ping opacity-30 pointer-events-none" />
        </div>
        {/* Tooltip */}
        <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm font-medium px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Tanya Minin AI 🤖
        </span>
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.85, y: 30, originX: 0, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`${isDark ? 'dark' : ''} fixed bottom-24 left-6 z-50 w-[340px] sm:w-[380px] max-h-[560px] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900`}
            style={{ maxHeight: 'min(560px, calc(100vh - 110px))' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-ocean-600 to-ocean-500 px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <ChefHat size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold font-poppins text-sm">Minin AI Barista</p>
                  <p className="text-ocean-100 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Powered by GPT-OSS 120B · Groq
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
                aria-label="Tutup chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* No API Key Warning */}
            {noKey && (
              <div className="mx-4 mt-3 px-4 py-3 bg-sunset-50 dark:bg-sunset-900/30 border border-sunset-200 dark:border-sunset-700 rounded-xl text-xs text-sunset-700 dark:text-sunset-300 flex-shrink-0">
                ⚠️ <strong>API Key belum diatur.</strong> Tambahkan <code className="bg-sunset-100 dark:bg-sunset-900 px-1 rounded">VITE_GROQ_API_KEY</code> ke file <code className="bg-sunset-100 dark:bg-sunset-900 px-1 rounded">.env</code> dan restart dev server.
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <Bubble key={i} msg={msg} />
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-start"
                >
                  <div className="w-7 h-7 rounded-full bg-ocean-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <Loader2 size={16} className="animate-spin text-ocean-500" />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Prompts (only on first message) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {QUICK_PROMPTS.map((qp) => (
                  <button
                    key={qp}
                    onClick={() => sendMessage(qp)}
                    className="text-xs bg-ocean-50 dark:bg-ocean-900/40 text-ocean-700 dark:text-ocean-300 border border-ocean-200 dark:border-ocean-700 px-3 py-1.5 rounded-full hover:bg-ocean-100 dark:hover:bg-ocean-800 transition-colors"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-end gap-2 flex-shrink-0">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Tanya Minin sesuatu…"
                rows={1}
                disabled={loading}
                className="flex-1 resize-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm px-4 py-2.5 rounded-2xl outline-none focus:ring-2 focus:ring-ocean-400 max-h-28 overflow-y-auto transition-all disabled:opacity-60"
                style={{ scrollbarWidth: 'thin' }}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="p-2.5 bg-ocean-500 hover:bg-ocean-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex-shrink-0"
                aria-label="Kirim pesan"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiBarista;
