import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Copy, Check, Shield, Cpu, Tv, AlertCircle } from 'lucide-react';

export default function AirportCard({ airport }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (airport.promoCode && airport.promoCode !== '暂无优惠码') {
      navigator.clipboard.writeText(airport.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Top Banner / Tags */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0">
              {airport.id}
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
              {airport.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <span className="text-sm font-black text-rose-600 block">
              {airport.minPrice.split('·')[0].trim()}
            </span>
            <span className="text-[11px] text-slate-400">
              {airport.minPrice.split('·')[1]?.trim() || '起步配额'}
            </span>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
            {airport.lineType}
          </span>
          {airport.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Summary Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {airport.summary}
        </p>

        {/* AI & Streaming Badges */}
        <div className="space-y-1.5 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="line-clamp-1"><strong>AI 工具：</strong>{airport.aiSupport}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="line-clamp-1"><strong>流媒体：</strong>{airport.streaming}</span>
          </div>
        </div>

        {/* Promo Code Box */}
        <div className="flex items-center justify-between p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-xl mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-900 font-semibold">专属优惠码:</span>
            <code className="px-2 py-0.5 bg-white border border-amber-300 rounded font-mono font-bold text-xs text-amber-700">
              {airport.promoCode}
            </code>
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-amber-800 bg-amber-200/80 hover:bg-amber-300/80 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>复制</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Actions & Review Link */}
      <div className="p-4 pt-0 bg-white">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/airport-recommend/${airport.slug}/`}
            className="w-full text-center py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-slate-50 transition-colors"
          >
            查看专属测评
          </Link>
          <a
            href={airport.affUrl}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="w-full text-center py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <span>直达官网注册</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="text-[10px] text-slate-400 mt-2 text-center">
          核验提示：下单前请在结算页确认流量周期与可用库存
        </div>
      </div>
    </div>
  );
}
