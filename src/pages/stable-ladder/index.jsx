import CategoryArchive from '@/components/CategoryArchive';
import articlesData from '@/data/articles.json';

export default function CategoryPage({ openSearch }) {
  const articles = articlesData.filter((a) => a.category === 'stable-ladder');
  return (
    <CategoryArchive
      categorySlug="stable-ladder"
      categoryTitle="稳定梯子"
      pageH1="稳定梯子推荐与技术评估指南：BGP多入口冗余、IPLC专线架构与晚高峰抗拥堵资料"
      seoTitle="稳定梯子推荐与技术评估指南：专线架构与晚高峰抗拥堵核验 - 梯子玩资料库"
      categoryDesc="本专栏紧密围绕【稳定梯子】核心关键词展开技术核验与长效运维分析。深入剖析国内三网 BGP 边缘入口调度、IPLC/IEPL 国际内网专线抗丢包能力、晚高峰 QoS 突破技术、官方运维通报时效性以及科学的主备双梯容灾策略，杜绝无实据的绝对稳定营销宣传。"
      articles={articles}
      openSearch={openSearch}
    />
  );
}
