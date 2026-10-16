import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import airportsData from '@/data/airports.json';
import articlesData from '@/data/articles.json';
import faqsData from '@/data/faqs.json';
import {
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Cpu,
  Tv,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  Layers,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export default function AirportDetailPage({ airport, relatedArticles, relatedFaqs, openSearch }) {
  const [copied, setCopied] = useState(false);

  if (!airport) return null;

  const copyCode = () => {
    if (airport.promoCode && airport.promoCode !== '暂无优惠码') {
      navigator.clipboard.writeText(airport.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${airport.name} 评测与公开资料：套餐价格、节点架构与优惠码 - 梯子玩资料库`,
    description: airport.summary,
    author: {
      '@type': 'Organization',
      name: '梯子玩资料库编辑部',
    },
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
  };

  return (
    <Layout openSearch={openSearch}>
      <SEO
        title={`${airport.name} 评测与公开资料：套餐价格、节点架构与优惠码 - 梯子玩资料库`}
        description={`${airport.name} 评测档案：${airport.summary} 涵盖最低价格 ${airport.minPrice}、${airport.lineType} 架构、专属优惠码 ${airport.promoCode} 与购买前核对要点。`}
        canonical={`https://tiziwan.wiki/airport-recommend/${airport.slug}/`}
        schemaData={articleSchema}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-700">首页</Link>
        <span>/</span>
        <Link href="/airport-recommend/" className="hover:text-sky-600 font-semibold text-slate-600">
          机场推荐核心中心页
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">{airport.name} 专属测评</span>
      </nav>

      {/* Main Review Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 text-xs font-black">
                编号 #{airport.id}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                {airport.lineType}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> 2026年核验档案
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              {airport.name} 专属测评与选型档案
            </h1>

            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              {airport.summary}
            </p>
          </div>

          {/* Quick CTA Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 shrink-0 w-full lg:w-72">
            <div className="text-xs text-slate-500 mb-1">最低参考起步价</div>
            <div className="text-2xl font-black text-rose-600 mb-3">{airport.minPrice}</div>

            {/* Promo Code Box */}
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl mb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-800 block">专属优惠码</span>
                <code className="text-xs font-mono font-bold text-amber-900">{airport.promoCode}</code>
              </div>
              <button
                onClick={copyCode}
                className="px-2.5 py-1 text-xs font-semibold bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-lg transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '已复制' : '复制'}</span>
              </button>
            </div>

            <a
              href={airport.affUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>前往 {airport.name} 官网注册</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Feature Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 block">AI 工具连通性</strong>
              <p className="text-slate-500 mt-0.5">{airport.aiSupport}</p>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <Tv className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 block">流媒体解锁能力</strong>
              <p className="text-slate-500 mt-0.5">{airport.streaming}</p>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 block">设备与客户端支持</strong>
              <p className="text-slate-500 mt-0.5">{airport.devices}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Section 1: Audience */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
              本文适合谁 / 不适合谁
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl">
                <div className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>适合以下用户与场景：</span>
                </div>
                <ul className="space-y-1.5 text-emerald-800 list-disc list-inside">
                  {airport.suitableFor.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-rose-50/70 border border-rose-200/70 rounded-2xl">
                <div className="font-bold text-rose-900 mb-2 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>不适合以下情况：</span>
                </div>
                <ul className="space-y-1.5 text-rose-800 list-disc list-inside">
                  {airport.unsuitableFor.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Detailed Plans Table */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-600" />
              {airport.name} 公开套餐与价格阶梯
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3">套餐名称</th>
                    <th className="py-2.5 px-3">参考价格</th>
                    <th className="py-2.5 px-3">流量配额</th>
                    <th className="py-2.5 px-3">结算周期</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {airport.plans.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{p.name}</td>
                      <td className="py-2.5 px-3 text-rose-600 font-bold">{p.price}</td>
                      <td className="py-2.5 px-3 text-slate-600">{p.traffic}</td>
                      <td className="py-2.5 px-3 text-slate-500">{p.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              注：价格与流量根据公开资料整理，最新折扣、当前可用库存及设备并发限制请以结算页最终显示为准。
            </p>
          </section>

          {/* Section 3: Pros & Cons */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-600" />
              客观优势与潜在局限剖析
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <strong className="text-slate-900 block mb-2 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" /> 核心优势亮点
                </strong>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  {airport.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <strong className="text-slate-900 block mb-2 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> 需要留意的事项
                </strong>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  {airport.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Pre-purchase Tips */}
          <section className="bg-amber-50/70 rounded-3xl p-6 sm:p-8 border border-amber-200/80 text-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
              购买前核对提示
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              {airport.checkTips}
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong>编辑部建议：</strong>坚持首先月付测试，观察一个完整的计费周期（重点考察每晚 20:00-23:00 晚高峰的表现），确认无频发断流与设备冲突后，再根据需求决定是否长期续约。
            </p>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Back to Pillar Link */}
          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-200 text-xs text-sky-900">
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>返回聚合对比中心</span>
            </div>
            <p className="text-sky-700 leading-relaxed mb-3">
              想要横向对比其他 27 家服务商的价格、专线类型与优惠码？
            </p>
            <Link
              href="/airport-recommend/"
              className="inline-flex items-center gap-1 font-bold text-sky-700 hover:text-sky-800 hover:underline"
            >
              <span>查看 28 家机场总览表</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Related Articles Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">相关选型指南</h3>
            <ul className="space-y-2.5 text-xs">
              {relatedArticles.map((art) => (
                <li key={art.slug}>
                  <Link
                    href={`/${art.category}/${art.slug}/`}
                    className="text-slate-700 hover:text-sky-600 hover:underline line-clamp-2 block leading-relaxed"
                  >
                    • {art.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Related FAQs Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">精选常见问题</h3>
            <div className="space-y-3 text-xs">
              {relatedFaqs.map((faq) => (
                <div key={faq.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-semibold text-slate-800 mb-1">{faq.question}</div>
                  <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-3">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = airportsData.map((airport) => ({
    params: { slug: airport.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const airport = airportsData.find((a) => a.slug === params.slug);
  const relatedArticles = articlesData.slice(0, 4);
  const relatedFaqs = faqsData.slice(0, 3);
  return {
    props: {
      airport,
      relatedArticles,
      relatedFaqs,
    },
  };
}
