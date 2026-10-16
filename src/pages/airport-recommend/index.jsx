import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import airportsData from '@/data/airports.json';
import faqsData from '@/data/faqs.json';
import {
  ShieldCheck,
  TrendingUp,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Cpu,
  Tv,
  HelpCircle,
  Bookmark,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function AirportRecommend({ openSearch }) {
  const [copiedSlug, setCopiedSlug] = useState(null);

  const copyCode = (code, slug) => {
    if (code && code !== '暂无优惠码') {
      navigator.clipboard.writeText(code);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  const pillarFaqs = faqsData.slice(0, 10);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2026机场梯子推荐长文评测聚合中心',
    description: '全网 28 家机场梯子详尽深度评测文章集合，重点测评全球云、飞猫云、暮光加速、大佬云、微风网络等主流服务商的线路、价格与晚高峰稳定性。',
    url: 'https://tiziwan.wiki/airport-recommend/',
  };

  return (
    <Layout openSearch={openSearch}>
      <SEO
        title="2026机场梯子推荐长文深度评测（28家全量排位） - 梯子玩资料库"
        description="本站核心长文测评聚合页：深度剖析 2026 全网 28 家专线机场梯子。排位第一全球云（企业专线+纯净住宅IP），次席飞猫云、暮光加速、大佬云、微风网络。附右侧定位导航与 8 折优惠码。"
        canonical="https://tiziwan.wiki/airport-recommend/"
        schemaData={pageSchema}
      />

      {/* Header Area */}
      <div className="mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900 transition-colors">首页</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">2026 机场梯子推荐</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>全站核心长文评测聚合中心 · 2026 年度权威收录 28 家</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
          机场梯子推荐｜梯子推荐2026、稳定梯子与梯子 VPN 资料
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl mb-6">
          欢迎查阅梯子玩资料库的唯一核心长文聚合评测中心。我们从<strong>线路架构（IPLC专线/BGP中转）</strong>、<strong>晚高峰丢包抗压</strong>、<strong>原生住宅 IP 纯净度</strong>、<strong>真实倍率陷阱</strong>以及<strong>工单响应速度</strong>五个硬核维度，对全网 28 家主流机场展开了长周期横向评测与深度剖析。
        </p>

        {/* Global Cloud Flagship Anchor Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-2xl shadow-lg text-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-5 border border-amber-300">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-950 text-amber-400 font-bold text-xs mb-2.5">
              ★ 全网年度推荐综合第一名
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1.5">
              首推主力：全球云（QuanQiu Cloud）
            </h2>
            <p className="text-slate-950 font-medium text-xs sm:text-sm leading-relaxed max-w-2xl">
              全线部署 BGP 混合国际专线，多国家原生纯净独立住宅 IP，极速双向解锁 ChatGPT 与海外本土流媒体。结算输入专属优惠码【<span className="font-bold underline">qq88</span>】立享 8 折特惠（低至 16 元/月），可用性经受住了数轮晚高峰连续考验！
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={airportsData[0].affUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-1.5"
            >
              <span>立即直达全球云注册（享8折）</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Article Content (3 Columns) */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Quick Summary Navigation Box */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 pb-2.5 border-b border-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <span>2026 年度 28 家机场梯子排位速查导航表</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
              根据晚高峰稳定性、原生 IP 出口纯净度、三网优化与价格透明度综合评估，年度排行榜首位为<strong>全球云</strong>，第二至五名分别为<strong>飞猫云、暮光加速、大佬云、微风网络</strong>。点击任意机场即可直达该服务商的详细深度长文测评：
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold">
                    <th className="py-2.5 px-3 border border-slate-200 text-center w-14">排位</th>
                    <th className="py-2.5 px-3 border border-slate-200">机场名称</th>
                    <th className="py-2.5 px-3 border border-slate-200">最低门槛</th>
                    <th className="py-2.5 px-3 border border-slate-200">核心线路架构</th>
                    <th className="py-2.5 px-3 border border-slate-200">专属优惠码</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-center">文章锚点定位</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {airportsData.map((a, i) => (
                    <tr key={a.id} className={i === 0 ? "bg-amber-50/80 font-semibold text-slate-950" : "hover:bg-slate-50 transition-colors"}>
                      <td className="py-2.5 px-3 border border-slate-200 text-center">
                        {i === 0 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs sm:text-sm">
                            1
                          </span>
                        ) : (
                          <span className="text-slate-500 font-bold">{a.rank || i + 1}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 border border-slate-200 font-semibold text-slate-900">
                        <a href={`#airport-${a.slug}`} className="hover:text-sky-600 hover:underline">
                          {a.name} {i === 0 && <span className="text-xs text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md ml-1.5 font-bold">首推旗舰</span>}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 border border-slate-200 text-rose-600 font-bold">
                        {a.minPrice.split('·')[0].trim()}
                      </td>
                      <td className="py-3.5 px-4 border border-slate-200">
                        {a.lineType}
                      </td>
                      <td className="py-3.5 px-4 border border-slate-200">
                        <code className="font-mono bg-white px-2 py-1 border border-slate-300 rounded-md text-slate-900 text-xs sm:text-sm font-bold">
                          {a.promoCode}
                        </code>
                      </td>
                      <td className="py-3.5 px-4 border border-slate-200 text-center font-bold">
                        <a href={`#airport-${a.slug}`} className="text-sky-600 hover:text-sky-800 hover:underline">
                          跳转详解 ↓
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Comprehensive Long-form Reviews for Each Airport */}
          <section className="space-y-14">
            <div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600 mb-1.5">
                全维度详细测评
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                28 家收录机场全维度详细长文测评与选型分析
              </h2>
            </div>

            {airportsData.map((airport, idx) => {
              const isGlobalFirst = (airport.slug === 'quanqiuyun');

              return (
                <article
                  key={airport.id}
                  id={`airport-${airport.slug}`}
                  className={`scroll-mt-24 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border transition-all ${
                    isGlobalFirst
                      ? "bg-gradient-to-b from-amber-50/90 via-white to-amber-50/30 border-amber-300 shadow-md ring-2 ring-amber-400/40"
                      : "bg-white border-slate-200/90 shadow-2xs hover:shadow-xs"
                  }`}
                >
                  {/* Article Header for each airport */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isGlobalFirst
                            ? "bg-amber-500 text-slate-950 shadow-xs"
                            : "bg-slate-900 text-white"
                        }`}>
                          第 {airport.rank || idx + 1} 位 {isGlobalFirst && "★ 综合推荐首位"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
                          {airport.lineType}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        {airport.name}：{airport.summary.split('。')[0]}
                      </h3>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-xs text-slate-500 mb-0.5">起步参考价</div>
                      <div className="text-xl sm:text-2xl font-black text-rose-600">{airport.minPrice}</div>
                    </div>
                  </div>

                  {/* Highlight Banner for 全球云 */}
                  {isGlobalFirst && (
                    <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-extrabold text-sm sm:text-base flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-slate-950" />
                          <span>【全网首推必入旗舰】：强烈建议所有用户首选注册测试！</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-950 font-medium mt-1.5 leading-relaxed">
                          采用企业级 BGP + 国际专线混合调度，35+ 国家出口极速解锁 ChatGPT 与 TikTok 多国 IP。结算输入专属优惠码【qq88】立享 8 折特惠（低至 16 元/月），可用性经受住了数轮晚高峰连续考验！
                        </p>
                      </div>

                      <a
                        href={airport.affUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-xs sm:text-sm rounded-lg shadow-md shrink-0 flex items-center justify-center gap-1.5 transition-transform hover:scale-105"
                      >
                        <span>立刻直达官网锁定 8 折</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Body Text Sections */}
                  <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">服务定位与整体表现</h4>
                      <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                        {airport.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <strong className="text-slate-900 block mb-1 font-bold flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-sky-600" /> 节点与物理架构考量
                        </strong>
                        <p className="text-slate-700 leading-relaxed">{airport.nodeDetails}</p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <strong className="text-slate-900 block mb-1 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 核心适用人群定位
                        </strong>
                        <p className="text-slate-700 leading-relaxed">{airport.targetAudience}</p>
                      </div>
                    </div>

                    {/* Plan table */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-2">公开套餐与资费阶梯</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
                          <thead>
                            <tr className="bg-slate-100 text-slate-900 font-bold">
                              <th className="py-2.5 px-3 border border-slate-200">套餐规格</th>
                              <th className="py-2.5 px-3 border border-slate-200">参考资费</th>
                              <th className="py-2.5 px-3 border border-slate-200">月度可用配额</th>
                              <th className="py-2.5 px-3 border border-slate-200">结算周期</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 text-slate-700">
                            {airport.plans.map((p, pIdx) => (
                              <tr key={pIdx} className="hover:bg-slate-50 transition-colors">
                                <td className="py-2.5 px-3 border border-slate-200 font-semibold text-slate-900">{p.name}</td>
                                <td className="py-2.5 px-3 border border-slate-200 text-rose-600 font-bold">{p.price}</td>
                                <td className="py-2.5 px-3 border border-slate-200">{p.traffic}</td>
                                <td className="py-2.5 px-3 border border-slate-200 text-slate-500">{p.period}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* AI & Streaming */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <Cpu className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <div><strong>AI 工具解锁评估：</strong>{airport.aiSupport}</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Tv className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <div><strong>流媒体播放兼容：</strong>{airport.streaming}</div>
                      </div>
                    </div>

                    {/* Pre-purchase tip */}
                    <div className="p-3.5 sm:p-4 bg-amber-50/90 rounded-xl border border-amber-200/90 text-xs sm:text-sm text-amber-950 leading-relaxed">
                      <strong>购买前核对提示：</strong>{airport.checkTips}
                    </div>
                  </div>

                  {/* Actions & Promo code */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 font-bold">专属优惠码:</span>
                      <code className="px-2.5 py-0.5 bg-amber-50 border border-amber-300 rounded-md font-mono font-bold text-xs sm:text-sm text-amber-900">
                        {airport.promoCode}
                      </code>
                      <button
                        onClick={() => copyCode(airport.promoCode, airport.slug)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        {copiedSlug === airport.slug ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSlug === airport.slug ? '已复制' : '复制'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Link
                        href={`/airport-recommend/${airport.slug}/`}
                        className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors"
                      >
                        阅读单项深度测评
                      </Link>
                      <a
                        href={airport.affUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition-all ${
                          isGlobalFirst
                            ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20"
                            : "bg-sky-600 hover:bg-sky-500 text-white"
                        }`}
                      >
                        <span>直达 {airport.name} 官网</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* FAQs section */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-600" />
              <span>机场梯子推荐与使用核心 FAQ</span>
            </h2>

            <div className="space-y-4">
              {pillarFaqs.map((faq) => (
                <div key={faq.id} className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2 flex items-start gap-2">
                    <span className="text-sky-600 font-extrabold shrink-0">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-white p-3.5 rounded-lg border border-slate-100">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Sidebar (1 Column) for Easy In-Page Navigation */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-5">
            {/* Quick In-page Anchor Nav */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3 pb-2 border-b border-slate-100">
                <Bookmark className="w-4 h-4 text-sky-600" />
                <span>28 家机场长文目录快速定位</span>
              </div>
              <div className="max-h-[65vh] overflow-y-auto space-y-1 text-xs pr-1">
                {airportsData.map((a, i) => (
                  <a
                    key={a.id}
                    href={`#airport-${a.slug}`}
                    className={`block px-2.5 py-1.5 rounded-lg transition-colors truncate ${
                      i === 0
                        ? "bg-amber-100/90 text-amber-950 font-bold border border-amber-300"
                        : "text-slate-700 hover:bg-slate-100 hover:text-sky-600"
                    }`}
                  >
                    <span className="font-mono text-slate-400 mr-1.5 font-bold">{a.rank || i + 1}.</span>
                    <span>{a.name} {i === 0 && "★首推"}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Global Cloud High-Conversion Sticky Card */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-lg border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-2.5 text-sm">
                ★
              </div>
              <h4 className="font-bold text-sm sm:text-base text-white mb-1.5">
                2026 年度编辑部首选主力
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                <strong>全球云</strong>：全线 BGP 混合专线，多国家原生独立住宅 IP，折后 16 元/月起，晚高峰跑满带宽！
              </p>
              <div className="p-2.5 bg-slate-800 rounded-lg mb-3 flex items-center justify-between border border-slate-700 text-xs">
                <span className="text-slate-300">8折优惠码:</span>
                <code className="text-amber-400 font-bold font-mono text-xs sm:text-sm">qq88</code>
              </div>
              <a
                href={airportsData[0].affUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg text-center block shadow-md transition-colors"
              >
                立刻注册全球云体验 →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
