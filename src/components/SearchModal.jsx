import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, Layers, HelpCircle, ArrowRight } from 'lucide-react';
import airportsData from '@/data/airports.json';
import articlesData from '@/data/articles.json';
import faqsData from '@/data/faqs.json';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, airports, articles, faqs
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Filter airports
  const matchedAirports = q
    ? airportsData.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.lineType.toLowerCase().includes(q) ||
          a.promoCode.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    : airportsData.slice(0, 6);

  // Filter articles
  const matchedArticles = q
    ? articlesData.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.description.toLowerCase().includes(q) ||
          art.categoryName.toLowerCase().includes(q)
      )
    : articlesData.slice(0, 6);

  // Filter faqs
  const matchedFaqs = q
    ? faqsData.filter(
        (f) =>
          f.keyword.toLowerCase().includes(q) ||
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      )
    : faqsData.slice(0, 6);

  const totalResults =
    (activeTab === 'all' || activeTab === 'airports' ? matchedAirports.length : 0) +
    (activeTab === 'all' || activeTab === 'articles' ? matchedArticles.length : 0) +
    (activeTab === 'all' || activeTab === 'faqs' ? matchedFaqs.length : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-slate-900/10 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 px-4 py-3.5 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="搜索全站 28 家机场、54 篇主题文章、100 组 FAQ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base text-slate-800 placeholder-slate-400 bg-transparent border-0 focus:outline-hidden focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70 flex items-center gap-2 text-xs">
          <span className="text-slate-400">过滤分类：</span>
          {[
            { id: 'all', name: '全部' },
            { id: 'airports', name: `机场资料 (${matchedAirports.length})` },
            { id: 'articles', name: `精选文章 (${matchedArticles.length})` },
            { id: 'faqs', name: `常见问题 (${matchedFaqs.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 divide-y divide-slate-100">
          {totalResults === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              未找到与 &quot;{query}&quot; 相关的文章或资料，您可以尝试精简关键词。
            </div>
          )}

          {/* Airports Section */}
          {(activeTab === 'all' || activeTab === 'airports') && matchedAirports.length > 0 && (
            <div className="pt-2 first:pt-0">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  收录机场资料 ({matchedAirports.length})
                </span>
                <Link
                  href="/airport-recommend/"
                  onClick={onClose}
                  className="text-xs text-sky-600 hover:underline flex items-center gap-1"
                >
                  查看全部中心页 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedAirports.map((airport) => (
                  <Link
                    key={airport.id}
                    href={`/airport-recommend/${airport.slug}/`}
                    onClick={onClose}
                    className="p-3 bg-slate-50 hover:bg-sky-50/60 rounded-xl border border-slate-200/80 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 group-hover:text-sky-600 text-sm">
                          {airport.name}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {airport.minPrice.split('·')[0].trim()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{airport.summary}</p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-200/60">
                      <span>优惠码: <strong className="text-slate-700">{airport.promoCode}</strong></span>
                      <span className="text-sky-600 group-hover:translate-x-0.5 transition-transform">
                        专属测评 →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {(activeTab === 'all' || activeTab === 'articles') && matchedArticles.length > 0 && (
            <div className="pt-4 first:pt-0">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  主题文章 ({matchedArticles.length})
                </span>
              </div>
              <div className="space-y-2">
                {matchedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/${article.category}/${article.slug}/`}
                    onClick={onClose}
                    className="p-3 bg-slate-50 hover:bg-sky-50/60 rounded-xl border border-slate-200/80 transition-all block group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-700">
                        {article.categoryName}
                      </span>
                      <span className="text-xs text-slate-400">{article.date}</span>
                    </div>
                    <h5 className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 line-clamp-1">
                      {article.title}
                    </h5>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                      {article.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {(activeTab === 'all' || activeTab === 'faqs') && matchedFaqs.length > 0 && (
            <div className="pt-4 first:pt-0">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                  精选问答 FAQ ({matchedFaqs.length})
                </span>
                <Link
                  href="/faq/"
                  onClick={onClose}
                  className="text-xs text-sky-600 hover:underline"
                >
                  查看全部 100 问 →
                </Link>
              </div>
              <div className="space-y-2">
                {matchedFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs"
                  >
                    <div className="font-semibold text-slate-800 mb-1 flex items-start gap-1.5">
                      <span className="text-sky-600 font-bold shrink-0">Q{faq.id}:</span>
                      <span>{faq.question}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px] bg-white p-2.5 rounded-lg border border-slate-100">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info in Modal */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
          <span>支持使用 <kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded">ESC</kbd> 快速关闭</span>
          <span>梯子玩资料库 · 实时本地静态索引</span>
        </div>
      </div>
    </div>
  );
}
