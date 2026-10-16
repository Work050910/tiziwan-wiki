import Link from 'next/link';
import { useState } from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import airportsData from '@/data/airports.json';
import articlesData from '@/data/articles.json';
import faqsData from '@/data/faqs.json';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  ExternalLink,
  Search,
  CheckCircle2,
  Calendar,
  Award
} from 'lucide-react';

export default function Home({ openSearch }) {
  const [copiedCode, setCopiedCode] = useState(false);

  // Top 5 airports: 全球云, 飞猫云, 暮光加速, 大佬云, 微风网络
  const top5Airports = airportsData.slice(0, 5);
  const globalCloud = top5Airports[0]; // 全球云 ALWAYS #1

  const recentArticles = articlesData.slice(0, 6);
  const homeFaqs = faqsData.slice(0, 6);

  const copyGlobalCode = () => {
    navigator.clipboard.writeText('qq88');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '梯子玩资料库',
    url: 'https://tiziwan.wiki/',
    description: '梯子玩资料库：2026梯子推荐与稳定梯子公开资料库，精选2026梯子推荐排行与深度评测。',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tiziwan.wiki/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Layout openSearch={openSearch}>
      <SEO
        title="2026梯子推荐指南：精选2026梯子推荐排行与稳定梯子测评 - 梯子玩资料库"
        description="梯子玩资料库围绕2026梯子推荐、稳定梯子、机场梯子和梯子vpn展开深度技术测评与公开资料核验。汇集全网28家专线机场真实晚高峰丢包率与节点倍率，2026梯子推荐年度首选全球云。"
        canonical="https://tiziwan.wiki/"
        schemaData={websiteSchema}
      />

      {/* Hero Section with Global Cloud Highlight - Solid Dark Slate #0f172a Background */}
      <section
        className="relative overflow-hidden rounded-3xl text-white p-6 sm:p-10 lg:p-14 mb-14 shadow-2xl border border-slate-700/80 bg-slate-900"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-700 text-xs sm:text-sm font-bold text-amber-400 mb-6"
            style={{ backgroundColor: '#1e293b' }}
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>2026梯子推荐年度权威修订 · 稳定梯子与专线机场公开测评</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-4 text-white">
            <span className="text-amber-400 font-extrabold">2026梯子推荐</span>指南：精选<span className="text-amber-400 font-extrabold">2026梯子推荐</span>排行与稳定梯子深度测评
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            专注<strong className="text-white">2026梯子推荐</strong>选型指南、<strong className="text-white">稳定梯子</strong>评测、<strong className="text-white">机场梯子</strong>与<strong className="text-white">梯子vpn</strong>的真实公开数据核验。根据全网晚高峰抗封锁、丢包率与原生 IP 质量综合测算，<strong className="text-amber-400">2026梯子推荐年度排位第 1 名：全球云</strong>，次选飞猫云、暮光加速、大佬云、微风网络。
          </p>

          {/* Super Conversion Banner for 全球云 in Hero */}
          <div
            className="p-4 sm:p-5 border border-amber-500/60 rounded-xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
            style={{ backgroundColor: '#1e293b' }}
          >
            <div>
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-sm sm:text-base mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>2026梯子推荐全网年度综合排位第 1 名：全球云（QuanQiu Cloud）</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                全线 BGP 混合国际专线，多国家纯净住宅 IP，极速解锁 ChatGPT 与 TikTok，晚高峰 4K/8K 拖拽秒开！结算输入专属优惠码【<span className="text-amber-400 font-bold">qq88</span>】直享 8 折特惠（折后仅 16 元/月起）。
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={globalCloud.affUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
              >
                <span>直达全球云注册</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/airport-recommend/"
              className="px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 group"
            >
              <span>阅读 2026 机场推荐深度长文评测</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={openSearch}
              style={{ backgroundColor: '#1e293b' }}
              className="px-4 py-3 rounded-lg border border-slate-600/80 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 hover:bg-slate-700"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>全站实时文章检索 (⌘K)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Top 5 Ranked Airports Section: 全球云, 飞猫云, 暮光加速, 大佬云, 微风网络 */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-600 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              2026 年度官方梯队排行 · 权威前五强
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              首页机场推荐排行榜 TOP 5
            </h2>
          </div>
          <Link
            href="/airport-recommend/"
            className="text-base font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 group"
          >
            <span>查看完整 28 家长文横评列表</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Highlight Card for 全球云 (Rank 1) */}
        <div className="mb-8 p-6 sm:p-10 bg-gradient-to-br from-amber-500/15 via-white to-amber-500/5 rounded-3xl border-2 border-amber-400 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-amber-200/60 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xs">
                  ★ 排行榜第 1 位 · 旗舰首选
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-bold text-xs sm:text-sm">
                  {globalCloud.lineType}
                </span>
                <span className="text-sm text-slate-500 font-medium">综合表现 9.9 分</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {globalCloud.name}：全能型国际专线旗舰方案
              </h3>
              <p className="text-slate-700 text-base sm:text-lg mt-3 leading-relaxed max-w-4xl">
                {globalCloud.conversionHighlight}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200 shrink-0 text-center w-full lg:w-80 shadow-xs">
              <div className="text-sm text-slate-500 mb-1">最低门槛（折后起步）</div>
              <div className="text-3xl font-black text-rose-600 mb-3">16 元/月 · 120GB</div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4 flex items-center justify-between text-sm">
                <span className="text-amber-900 font-semibold">8折优惠码:</span>
                <code className="font-mono font-bold text-amber-700 text-base">qq88</code>
                <button
                  onClick={copyGlobalCode}
                  className="px-2.5 py-1 bg-amber-200 text-amber-900 rounded font-semibold text-xs"
                >
                  {copiedCode ? '已复制' : '复制'}
                </button>
              </div>
              <a
                href={globalCloud.affUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base rounded-xl shadow-md transition-all block text-center"
              >
                立即注册全球云直达官网 →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm sm:text-base text-slate-700">
            <div className="p-4 bg-white rounded-xl border border-amber-200/80">
              <strong className="text-slate-900 block mb-1 text-base font-bold">节点与网络架构：</strong>
              <p className="leading-relaxed">{globalCloud.nodeDetails}</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-amber-200/80">
              <strong className="text-slate-900 block mb-1 text-base font-bold">核心受众人群：</strong>
              <p className="leading-relaxed">{globalCloud.targetAudience}</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-amber-200/80">
              <strong className="text-slate-900 block mb-1 text-base font-bold">流媒体与AI支持：</strong>
              <p className="leading-relaxed">全线支持 ChatGPT、Claude 3.5 与各大主流流媒体 4K 原生解锁。</p>
            </div>
          </div>
        </div>

        {/* 2 to 5 Ranked Airports Cards (飞猫云, 暮光加速, 大佬云, 微风网络) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {top5Airports.slice(1).map((airport, idx) => (
            <div
              key={airport.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-black text-xs sm:text-sm">
                    第 {idx + 2} 位
                  </span>
                  <span className="text-base font-black text-rose-600">{airport.minPrice.split('·')[0]}</span>
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 mb-2">{airport.name}</h4>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">{airport.summary}</p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700 space-y-1.5 mb-5">
                  <div><strong>线路：</strong>{airport.lineType}</div>
                  <div><strong>优惠码：</strong><code className="text-amber-700 font-bold">{airport.promoCode}</code></div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/airport-recommend/${airport.slug}/`}
                  className="text-sm font-semibold text-slate-700 hover:text-sky-600"
                >
                  测评详情
                </Link>
                <a
                  href={airport.affUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold rounded-xl shadow-2xs"
                >
                  直达官网
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/airport-recommend/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-md transition-all"
          >
            <span>进入 /airport-recommend/ 阅读 28 家机场长文全量排行榜</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Core Navigation Clusters */}
      <section className="mb-16">
        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600 mb-1.5">
          知识架构与专栏导航
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">
          梯子玩资料库全站核心专栏
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: '2026梯子推荐',
              href: '/ladder-recommend-2026/',
              count: '14 篇精选指南',
              desc: '围绕年度推荐指南、套餐性价比比较、流量计费倍率、防踩坑核查清单组织文档。',
              badge: '年度核心',
            },
            {
              title: '2026机场推荐',
              href: '/airport-recommend/',
              count: '28 家长文深度横评',
              desc: '全网 28 家专线机场万字测评长文，全量排位速查导航表与右侧定位目录，全球云位列榜首。',
              badge: '全站核心',
            },
            {
              title: '稳定梯子推荐',
              href: '/stable-ladder/',
              count: '14 篇技术评估',
              desc: '专线冗余架构、BGP中转入口、晚高峰抗拥堵资料与故障维护公告公开查询。',
              badge: '防断流必看',
            },
            {
              title: '机场梯子',
              href: '/airport-ladder/',
              count: '14 篇选型横评',
              desc: 'IPLC专线、VLESS新协议、三网优化接入、流媒体与ChatGPT解锁属性深度剖析。',
              badge: '协议与节点',
            },
            {
              title: '梯子 VPN',
              href: '/ladder-vpn/',
              count: '12 篇架构比对',
              desc: 'VPN全局加密与机场中转拓扑区别、无日志隐私政策核对、跨境业务出口固定策略。',
              badge: '隐私与架构',
            },
            {
              title: '常见问题 FAQ',
              href: '/faq/',
              count: '100 组独立问答',
              desc: '覆盖购买前核查、账号安全、节点测速、工单响应等 100 项高频长尾问题精准解答。',
              badge: '100 问速查',
            },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded bg-sky-50 text-sky-700">
                    {cat.badge}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">{cat.count}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2.5">
                  {cat.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{cat.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 mt-5 pt-3.5 border-t border-slate-100 group-hover:translate-x-1 transition-transform">
                <span>浏览专栏文章</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Guides & Articles */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600 mb-1.5">
              最新文档归档
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              精选选型与评估指南
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentArticles.map((art) => (
            <Link
              key={art.slug}
              href={`/${art.category}/${art.slug}/`}
              className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-50 text-sky-700">
                    {art.categoryName}
                  </span>
                  <span className="text-sm text-slate-400">{art.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2.5 leading-snug">
                  {art.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-2">
                  {art.seoDescription || art.description}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold text-sky-600 pt-4 border-t border-slate-100 mt-5">
                <span>阅读全文</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Selected FAQs */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600 mb-1.5">
              常见疑问解答
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              新手常见问题 FAQ
            </h2>
          </div>
          <Link
            href="/faq/"
            className="text-base font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 group"
          >
            <span>查看完整 100 组 FAQ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homeFaqs.map((faq) => (
            <div
              key={faq.id}
              className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs"
            >
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-3 flex items-start gap-2.5">
                <span className="text-sky-600 font-black shrink-0">Q:</span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
