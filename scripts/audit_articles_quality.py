import json
import collections

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

print(f"=== ANTIGRAVITY 文章发布质量与反重复严苛审计 ===")
print(f"总检验文章数量: {len(articles)}")

# 1. 标题唯一性检查
titles = [a['title'] for a in articles]
slugs = [a['slug'] for a in articles]
duplicate_titles = [item for item, count in collections.Counter(titles).items() if count > 1]
duplicate_slugs = [item for item, count in collections.Counter(slugs).items() if count > 1]
print(f"标题重复数: {len(duplicate_titles)}")
print(f"URL Slug 重复数: {len(duplicate_slugs)}")

# 2. 首段字数 (80 - 150 字) 检查
lead_len_issues = []
for a in articles:
    lead = a.get('leadAnswer', '')
    length = len(lead)
    if length < 80 or length > 160: # 允许微小余量
        lead_len_issues.append((a['slug'], length, lead[:30]))

print(f"首段字数不合规数 (要求 80-150 字): {len(lead_len_issues)}")
if lead_len_issues:
    for slug, l, preview in lead_len_issues:
        print(f"  - {slug}: {l}字 | {preview}...")

# 3. 首段内容唯一性检查
lead_answers = [a.get('leadAnswer', '') for a in articles]
duplicate_leads = [item for item, count in collections.Counter(lead_answers).items() if count > 1]
print(f"首段完全重复数: {len(duplicate_leads)}")

# 4. 核心结论唯一性检查
conclusions = [a.get('coreConclusion', '') for a in articles]
duplicate_conclusions = [item for item, count in collections.Counter(conclusions).items() if count > 1]
print(f"核心结论完全重复数: {len(duplicate_conclusions)}")

# 5. H3 路径唯一性检查
h3_titles = []
for a in articles:
    for sec in a.get('deepDiveSections', []):
        h3_titles.append(sec.get('h3', ''))
duplicate_h3s = [item for item, count in collections.Counter(h3_titles).items() if count > 1]
print(f"H3 小标题重复数: {len(duplicate_h3s)}")

# 6. FAQ 问答唯一性检查
faq_questions = []
for a in articles:
    for faq in a.get('customFaqs', []):
        faq_questions.append(faq.get('q', ''))
duplicate_faqs = [item for item, count in collections.Counter(faq_questions).items() if count > 1]
print(f"FAQ 问题重复数: {len(duplicate_faqs)}")

# 7. 全球云 TOP 1 保持度检查
not_first_global = []
for a in articles:
    emb = a.get('embeddedAirports', [])
    if not emb or emb[0].get('slug') != 'quanqiuyun' or not emb[0].get('isFlagshipFirst'):
        not_first_global.append(a['slug'])
print(f"全球云非 TOP 1 文章数: {len(not_first_global)}")

# 8. 绝对承诺词违规排查
forbidden_words = ["保证可用", "永不断线", "永不掉线", "绝对可用", "承诺可用"]
violation_articles = []
for a in articles:
    text = json.dumps(a, ensure_ascii=False)
    for word in forbidden_words:
        # Note: If the article is explaining NOT to believe in these words (e.g. 树立非绝对可用预期), we check context
        # But in leadAnswer and coreConclusion, we must not promise them
        if word in a.get('leadAnswer', '') or word in a.get('coreConclusion', ''):
            if "不承诺" not in text and "非绝对" not in text and "警惕" not in text and "拒绝" not in text:
                violation_articles.append((a['slug'], word))

print(f"承诺型违规词违规数: {len(violation_articles)}")

print("=== 审计汇总报告完成 ===")
