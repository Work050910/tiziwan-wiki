import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Info,
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ArticleDetail({
  article,
  relatedArticles,
  relatedFaqs,
  openSearch
}) {
  if (!article) return null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDescription || article.description,
    author: {
      '@type': 'Organization',
      name: '梯子玩资料库编辑部',
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: `https://tiziwan.wiki/${article.category}/${article.slug}/`,
  };

  // Determine dynamic sections
  const sections = article.sections || [];
  const hasDynamicSections = sections.length > 0;

  // Build dynamic TOC items
  const tocItems = hasDynamicSections
    ? sections.map((sec, idx) => ({ id: sec.id || `section-${idx}`, title: sec.title }))
    : [
        { id: 'section-conclusion', title: '核心结论与选型决策逻辑' },
        { id: 'section-metrics', title: '关键比较维度与技术背景标准' },
        { id: 'section-deep-dive', title: '深度技术剖析与常见避坑要诀' },
        ...(article.checklist ? [{ id: 'section-checklist', title: '购买、配置或使用前核心检查清单' }] : []),
        ...(article.customFaqs && article.customFaqs.length > 0 ? [{ id: 'section-faqs', title: '本主题关联常见问题答疑 (FAQ)' }] : []),
      ];

  return (
    <Layout openSearch={openSearch}>
      <SEO
        title={`${article.title} - 梯子玩资料库`}
        description={article.seoDescription || article.description}
        canonical={`https://tiziwan.wiki/${article.category}/${article.slug}/`}
        type="article"
        schemaData={articleSchema}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-900 transition-colors">首页</Link>
        <span>/</span>
        <Link href={`/${article.category}/`} className="hover:text-sky-600 text-slate-700 font-semibold transition-colors">
          {article.categoryName}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold line-clamp-1">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area (3 Cols) */}
        <article className="lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-2xs">
          {/* Header Area */}
          <div className="border-b border-slate-100 pb-6 mb-6">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-500 mb-3 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-sky-50 text-sky-700 border border-sky-200/60 text-xs">
                {article.categoryName}
              </span>
              <span className="flex items-center gap-1 font-medium text-xs sm:text-sm">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> 核验更新：{article.date}
              </span>
              {article.archetypeName && (
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-xs">
                  {article.archetypeName}
                </span>
              )}
            </div>

            {/* 唯一 H1 */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h1>
          </div>

          {/* 80 至 150 字首段：直接回答标题对应问题 */}
          <div className="p-4 sm:p-5 bg-sky-50/80 border-l-4 border-sky-500 rounded-r-xl mb-8 text-slate-800 text-xs sm:text-sm leading-relaxed shadow-2xs">
            <strong className="text-sky-950 font-bold block mb-1 text-xs sm:text-sm">【核心答复】：</strong>
            {article.leadAnswer || article.description}
          </div>

          {/* 适合谁 / 不适合谁 / 限制场景 */}
          {(article.suitableFor || article.notSuitableFor) && (
            <section className="mb-8 p-4 sm:p-5 bg-slate-50/90 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {article.suitableFor && article.suitableFor.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    目标读者与适用场景
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                    {article.suitableFor.map((item, idx) => (
                      <li key={idx} className="pl-0.5">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {article.notSuitableFor && article.notSuitableFor.length > 0 && (
                <div className="border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-5 pt-3 sm:pt-0">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    不适合人群与限制条件
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                    {article.notSuitableFor.map((item, idx) => (
                      <li key={idx} className="pl-0.5">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* 动态目录 TOC */}
          {tocItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50/80 rounded-xl border border-slate-200 mb-8">
              <span className="font-bold text-slate-800 text-xs sm:text-sm block mb-2">文章目录 (TOC)</span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-sky-700">
                {tocItems.map((toc, idx) => (
                  <li key={idx}>
                    <a href={`#${toc.id}`} className="hover:text-sky-900 hover:underline flex items-center gap-2 transition-colors">
                      <span className="w-4 h-4 rounded-md bg-sky-100 text-sky-800 text-[11px] flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{toc.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 渲染正文：若有动态 sections 则按非模板组织，否则回退到经典独立结构 */}
          {hasDynamicSections ? (
            <div className="space-y-8 mb-10">
              {sections.map((sec, secIdx) => (
                <section key={secIdx} id={sec.id || `section-${secIdx}`} className="scroll-mt-20">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                      {secIdx + 1}
                    </span>
                    <span>{sec.title}</span>
                  </h2>

                  {sec.lead && (
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4">
                      {sec.lead}
                    </p>
                  )}

                  {/* 决策树 / 步骤列表 */}
                  {sec.steps && sec.steps.length > 0 && (
                    <div className="space-y-3 my-4">
                      {sec.steps.map((st, stIdx) => (
                        <div key={stIdx} className="p-3.5 sm:p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 text-xs sm:text-sm">
                            <span className="px-2 py-0.5 rounded-md bg-sky-600 text-white text-[11px] font-bold">步骤 {stIdx + 1}</span>
                            <span>{st.title}</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed mb-1.5">{st.description}</p>
                          {st.riskPoint && (
                            <div className="text-rose-600 text-xs font-semibold flex items-center gap-1 mt-1.5 bg-rose-50/70 p-2 rounded-lg border border-rose-100">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                              <span>关键核查：{st.riskPoint}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 比较表格 */}
                  {sec.table && (
                    <div className="overflow-x-auto my-4">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
                        <thead>
                          <tr className="bg-slate-100 text-slate-900 font-bold">
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="py-2.5 px-3 border border-slate-200">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-700">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`py-2.5 px-3 border border-slate-200 ${cIdx === 0 ? 'font-semibold text-slate-900' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* 子小节 */}
                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="space-y-4 my-4">
                      {sec.subsections.map((sub, subIdx) => (
                        <div key={subIdx} className="p-4 sm:p-5 bg-slate-50/70 rounded-xl border border-slate-200/80">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                            <span>{sub.h3}</span>
                          </h3>
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                            {sub.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 检查清单 */}
                  {sec.checklist && sec.checklist.length > 0 && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 my-4">
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                        {sec.checklist.map((ck, ckIdx) => (
                          <li key={ckIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{ck}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 提示呼出框 */}
                  {sec.callout && (
                    <div className="p-4 bg-amber-50/90 border-l-4 border-amber-500 rounded-r-xl my-4 text-xs sm:text-sm text-amber-950 leading-relaxed shadow-2xs">
                      <strong className="block mb-1 font-bold">【说明要诀】：</strong>
                      <span>{sec.callout}</span>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            // 经典非空回退逻辑
            <div className="space-y-8 mb-10">
              <section id="section-conclusion" className="scroll-mt-20">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  核心结论与选型决策逻辑
                </h2>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-3">
                  {article.coreConclusion || article.keyTakeaway}
                </p>
                {article.decisionPath && (
                  <div className="p-4 bg-sky-50/70 rounded-xl border border-sky-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="text-sky-950 font-bold block mb-1 text-xs sm:text-sm">【针对本主题的选型决策路径】：</strong>
                    {article.decisionPath}
                  </div>
                )}
              </section>

              {article.metricsTable && article.metricsTable.length > 0 && (
                <section id="section-metrics" className="scroll-mt-20">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    关键比较维度与技术背景标准
                  </h2>
                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-slate-100 text-slate-900 font-bold">
                          <th className="py-2.5 px-3 border border-slate-200">评估维度</th>
                          <th className="py-2.5 px-3 border border-slate-200">推荐参考基准</th>
                          <th className="py-2.5 px-3 border border-slate-200">风险点排查</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-700">
                        {article.metricsTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-2.5 px-3 font-semibold text-slate-900 border border-slate-200">{row.dimension}</td>
                            <td className="py-2.5 px-3 border border-slate-200">{row.standard}</td>
                            <td className="py-2.5 px-3 border border-slate-200 text-rose-600 font-medium">{row.risk}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {article.deepDiveSections && article.deepDiveSections.length > 0 && (
                <section id="section-deep-dive" className="scroll-mt-20">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                    深度技术剖析与常见避坑要诀
                  </h2>
                  <div className="space-y-4">
                    {article.deepDiveSections.map((sec, idx) => (
                      <div key={idx} className="p-4 sm:p-5 bg-slate-50/70 rounded-xl border border-slate-200/80">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                          <span>{sec.h3}</span>
                        </h3>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                          {sec.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {article.checklist && article.checklist.length > 0 && (
                <section id="section-checklist" className="scroll-mt-20">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                    购买、配置或使用前核心检查清单
                  </h2>
                  <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                      {article.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </div>
          )}

          {/* 关联专属 FAQ（仅当有专属 Q&A 时呈现） */}
          {article.customFaqs && article.customFaqs.length > 0 && (
            <section id="section-faqs" className="mb-10 scroll-mt-20">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-600" />
                <span>本专题关联常见问题答疑 (FAQ)</span>
              </h2>
              <div className="space-y-4">
                {article.customFaqs.map((faq, idx) => (
                  <div key={idx} className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-start gap-2">
                      <span className="text-sky-600 font-bold shrink-0">Q{idx + 1}:</span>
                      <span>{faq.q || faq.question}</span>
                    </h3>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-white p-3.5 sm:p-4 rounded-lg border border-slate-100 shadow-2xs">
                      {faq.a || faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 紧凑权威参考提示框：自然内链回 /airport-recommend/ 核心评测聚合页 */}
          <div className="p-5 bg-gradient-to-r from-amber-50/90 via-white to-sky-50/90 rounded-xl border border-amber-200/90 mb-8 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-2 text-sm sm:text-base">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>全量 28 家服务商参数档案核对提示</span>
            </div>
            <p className="text-slate-700 leading-relaxed mb-3">
              专题文章仅围绕当前标题探讨具体选型条件与技术边界。如需查看包括<strong>全球云、飞猫云、暮光加速、大佬云、微风网络</strong>等全网 28 家服务商的实时价格阶梯、节点倍率总表及深度独立测评，请移步本站核心聚合页查阅完整档案：
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2.5">
              <Link
                href="/airport-recommend/"
                className="font-bold text-sky-700 hover:text-sky-800 underline flex items-center gap-1 text-xs sm:text-sm"
              >
                <span>查阅《2026机场梯子推荐长文评测聚合中心》(/airport-recommend/)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/airport-recommend/quanqiuyun/"
                className="text-xs text-amber-800 font-bold hover:underline"
              >
                全球云专属档案 →
              </Link>
            </div>
          </div>

          {/* 延伸阅读与分类导航 */}
          <section id="section-related" className="mb-6 scroll-mt-20">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-600" />
              <span>延伸阅读与核心专题导航</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.category}/${rel.slug}/`}
                  className="p-3 bg-slate-50 hover:bg-sky-50/70 rounded-xl border border-slate-200 transition-colors block group"
                >
                  <span className="text-[11px] font-bold text-sky-600 block mb-1">{rel.categoryName}</span>
                  <span className="font-semibold text-slate-900 group-hover:text-sky-600 text-xs sm:text-sm line-clamp-1 block">
                    {rel.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Footer disclaimer */}
          <div className="pt-5 border-t border-slate-200 text-xs text-slate-500 space-y-1.5">
            <div>最新核验日期：2026年10月 · 梯子玩资料库编辑部</div>
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-400">
              <strong>免责声明：</strong>本文档属于技术选型资料整理与客观网络参数对比，不构成绝对购买建议或服务保证。请严格遵守当地网络法律法规。
            </p>
          </div>
        </article>

        {/* Sidebar (1 Col) with High-converting Global Cloud Anchor */}
        <aside className="space-y-5">
          {/* Global Cloud High-Conversion Sticky Card */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-700/80">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black mb-2.5 text-sm">
              ★
            </div>
            <h3 className="font-bold text-sm sm:text-base text-white mb-1.5">
              全站首席力荐：全球云
            </h3>
            <p className="text-slate-300 leading-relaxed mb-3 text-xs sm:text-sm">
              全线 BGP 混合国际专线，多国家独立住宅 IP，折后 16 元/月起，晚高峰 YouTube 拖拽秒开！
            </p>
            <div className="p-2.5 bg-slate-800 rounded-lg mb-3 border border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-300">8折优惠码:</span>
              <code className="text-amber-400 font-bold font-mono text-xs sm:text-sm">qq88</code>
            </div>
            <a
              href="https://hueue09.gcvipaff.com/#/?code=z8U9aaa4"
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-center block shadow-md transition-colors text-xs sm:text-sm"
            >
              立刻注册全球云体验 →
            </a>
          </div>

          {/* Quick Pillar Jump */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">核心长文中心页</h4>
            <p className="text-slate-600 mb-3 text-xs leading-relaxed">
              汇集 28 家服务商长文测评与排行榜列表，支持右侧目录一键快速定位。
            </p>
            <Link
              href="/airport-recommend/"
              className="font-bold text-sky-600 hover:text-sky-700 underline block text-xs sm:text-sm"
            >
              进入机场推荐总览文章 →
            </Link>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
