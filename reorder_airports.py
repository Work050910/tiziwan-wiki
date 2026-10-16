import json

with open('src/data/airports.json', 'r', encoding='utf-8') as f:
    airports = json.load(f)

by_slug = {a['slug']: a for a in airports}

# Desired top 5:
# 1. 全球云 (quanqiuyun)
# 2. 飞猫云 (feimaoyun)
# 3. 暮光加速 (muguang)
# 4. 大佬云 (dalaoyun)
# 5. 微风网络 (breezenet)
top5_slugs = ['quanqiuyun', 'feimaoyun', 'muguang', 'dalaoyun', 'breezenet']

# U1S1 and Weituyun must NOT be in top 20 (they must be at position 21 or later, i.e. index >= 20)
late_slugs = ['weituyun', 'u1s1']

# Middle slugs (rank 6 to 26)
other_slugs = [
    'jilianyun', 'guangnianti', 'guangshuyun', 'yuzhouyun', 'sujie', 
    'sogoyun', 'kuaili', 'ermaoyun', 'yifanyun', 'edgenova', 
    'kexinyun', 'wavenet', 'laddercloud', 'lingdongyun', 'yinxingren', 
    'flyv', 'wuyoulianjie', 'civet', 'flashleap', 'firefly', 'kuajieyun'
]

# Order: top5 (0..4) + other_slugs (5..25, total 21 items) + late_slugs (26..27)
# Total = 5 + 21 + 2 = 28!
# Notice: index of weituyun will be 26 (Rank 27), u1s1 will be 27 (Rank 28). Both are safely beyond top 20!

new_order_slugs = top5_slugs + other_slugs + late_slugs
print('New order length:', len(new_order_slugs))
assert len(new_order_slugs) == 28
assert len(set(new_order_slugs)) == 28

reordered = []
for rank, slug in enumerate(new_order_slugs, 1):
    item = by_slug[slug].copy()
    item['rank'] = rank
    item['id'] = f"{rank:02d}"
    reordered.append(item)

print('Top 5:', [(x['rank'], x['name']) for x in reordered[:5]])
print('Ranks of weituyun and u1s1:', [(x['rank'], x['name']) for x in reordered if x['slug'] in ['weituyun', 'u1s1']])

with open('src/data/airports.json', 'w', encoding='utf-8') as f:
    json.dump(reordered, f, ensure_ascii=False, indent=2)

print('Saved reordered airports successfully')
