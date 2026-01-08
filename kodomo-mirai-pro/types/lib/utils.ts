import { Question, Answer, CategoryScore } from '@/types';
import { QUESTIONS, CATEGORIES } from './constants';

// スコア計算ロジック (0-100)
export function calculateScores(answers: Record<number, number>): CategoryScore[] {
  const catSums: Record<string, { sum: number; count: number }> = {};
  
  // 初期化
  Object.keys(CATEGORIES).forEach(k => catSums[k] = { sum: 0, count: 0 });

  QUESTIONS.forEach(q => {
    const rawVal = answers[q.id] || 3; // 未回答は3(どちらとも言えない)扱い
    
    // 正規化: 1-5 -> 0-100
    // base = (val - 1) / 4 * 100
    const base = ((rawVal - 1) / 4) * 100;
    
    // リスクスコア化（高いほど悪い）
    // reverse=true（良い質問）なら反転(100-base)
    // reverse=false（悪い質問）ならそのまま(base)
    const riskScore = q.reverse ? (100 - base) : base;

    catSums[q.categoryId].sum += riskScore;
    catSums[q.categoryId].count += 1;
  });

  // 平均算出とレベル判定
  return Object.entries(catSums).map(([id, { sum, count }]) => {
    const avg = count > 0 ? sum / count : 0;
    let level: 'green' | 'amber' | 'red' = 'green';
    if (avg >= 70) level = 'red';
    else if (avg >= 40) level = 'amber';
    
    return {
      id,
      name: CATEGORIES[id as keyof typeof CATEGORIES],
      score: Math.round(avg),
      level
    };
  }).sort((a, b) => b.score - a.score); // リスク高い順
}

// レベルに応じた色コード
export const getLevelColor = (level: string) => {
  switch(level) {
    case 'green': return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'amber': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'red': return 'bg-orange-100 text-orange-800 border-orange-200';
    default: return 'bg-gray-100';
  }
};