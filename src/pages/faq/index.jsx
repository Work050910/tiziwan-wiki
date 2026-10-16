import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import faqsData from '@/data/faqs.json';
import {
  HelpCircle,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export default function FAQPage({ openSearch }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = faqsData.filter((f) => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesQuery =
      !query.trim() ||
      f.keyword.toLowerCase().includes(query.toLowerCase()) ||
      f.question.toLowerCase().includes(query.toLowerCase()) ||
      f.answer.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // Generate FAQPage schema for visible FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filteredFaqs.slice(0, 30).map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <Layout openSearch={openSearch}>
      <SEO
        title="常见问题 FAQ (100问)｜梯子推荐与稳定专线实用答疑 - 梯子玩资料库"
        description="收录 100 组围绕梯子推荐2026、稳定梯子、机场梯子和梯子vpn的高频独立问答。覆盖套餐计费、流量倍率、晚高峰表现、售后工单、多设备连接与防踩坑核查。"
        canonical="https://tiziwan.wiki/faq/"
        schemaData={faqSchema}
      />

      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
          <Link href="/" className="hover:text-slate-900 transition-colors">首页</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">常见问题 FAQ</span>
        </nav>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>全量归集：100 组不重复独立问答 · 2026年最新</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
          常见问题与知识库 (100 FAQ)
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl mb-5">
          梯子玩资料库整理了围绕<strong>梯子推荐2026</strong>、<strong>稳定梯子</strong>、<strong>机场梯子</strong>和<strong>梯子vpn</strong>的 100 组高频问答。每组问答严格遵循“直接结论—需核对的资料或条件—下一步阅读”结构，帮助您快速找到针对具体技术或消费疑问的答案。
        </p>

        {/* Central Hub Pill */}
        <div className="p-4 sm:p-5 bg-amber-50/90 rounded-xl border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm mb-6">
          <div className="text-amber-950 font-medium">
            <strong>核心对比建议：</strong>阅读完常见问题后，可随时返回中心页查看 28 家服务商的套餐大表。
          </div>
          <Link
            href="/airport-recommend/"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg shadow-2xs shrink-0 flex items-center gap-1.5 transition-colors text-xs sm:text-sm"
          >
            <span>进入机场推荐核心中心页</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="输入关键词实时过滤 FAQ（如：倍率、退款、晚高峰、专线）..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs sm:text-sm pb-1 sm:pb-0">
            {[
              { id: 'all', name: '全部 (100)' },
              { id: 'ladder-recommend-2026', name: '梯子推荐2026 (25)' },
              { id: 'stable-ladder', name: '稳定梯子 (25)' },
              { id: 'airport-ladder', name: '机场梯子 (25)' },
              { id: 'ladder-vpn', name: '梯子 VPN (25)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-2 rounded-xl font-semibold shrink-0 transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4 mb-14">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm bg-white rounded-xl border border-slate-200">
            未检索到包含 &quot;{query}&quot; 的问答条目，请尝试其他词汇。
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {faq.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-xs">
                  {faq.keyword}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 tracking-tight">
                {faq.question}
              </h2>

              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-slate-50/90 p-3.5 sm:p-4 rounded-xl border border-slate-100/90">
                {faq.answer}
              </p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
