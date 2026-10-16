import CategoryArchive from '@/components/CategoryArchive';
import articlesData from '@/data/articles.json';

export default function CategoryPage({ openSearch }) {
  const articles = articlesData.filter((a) => a.category === 'airport-ladder');
  return (
    <CategoryArchive
      categorySlug="airport-ladder"
      categoryTitle="机场梯子"
      pageH1="机场梯子推荐与节点选型手册：全球节点覆盖、流量倍率计算、通用订阅与流媒体解锁"
      seoTitle="机场梯子推荐与节点选型手册：节点覆盖、倍率计算与流媒体解锁 - 梯子玩资料库"
      categoryDesc="本专栏紧密围绕【机场梯子】核心关键词展开实用选型全指南。涵盖主流亚太低延迟与欧美大带宽节点分布矩阵、1倍率与高倍率真实计费测算、通用订阅格式跨端导入、ChatGPT及海外流媒体原生 IP 解锁机制，以及权威官方真实入口防钓鱼防假冒技巧。"
      articles={articles}
      openSearch={openSearch}
    />
  );
}
