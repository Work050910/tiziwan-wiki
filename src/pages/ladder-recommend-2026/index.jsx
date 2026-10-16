import CategoryArchive from '@/components/CategoryArchive';
import articlesData from '@/data/articles.json';

export default function CategoryPage({ openSearch }) {
  const articles = articlesData.filter((a) => a.category === 'ladder-recommend-2026');
  return (
    <CategoryArchive
      categorySlug="ladder-recommend-2026"
      categoryTitle="2026梯子推荐"
      pageH1="2026梯子推荐权威指南：精选2026梯子推荐排位、套餐性价比比较与防踩坑决策大全"
      seoTitle="2026梯子推荐权威指南：2026梯子推荐选型与防踩坑决策 - 梯子玩资料库"
      categoryDesc="本专栏紧密围绕【2026梯子推荐】核心关键词展开深度评测。全方位解剖 2026梯子推荐选型标准、月度套餐可用流量核算、真实高峰倍率陷阱、小额月付风险把控与购买前防踩坑核验清单，助您科学搭建高速稳定的网络方案。"
      articles={articles}
      openSearch={openSearch}
    />
  );
}
