import { Question, ActionModule } from '@/types';

// カテゴリ定義
export const CATEGORIES = {
  mood: '今の気持ち',
  fatigue: '疲れ・消耗',
  engagement: 'やりがい・活力',
  fairness: '働き方の納得感',
  connection: '職場のつながり',
  recovery: '休憩・柔軟性',
};

// 質問データ（全24問・逆転項目設定済み）
export const QUESTIONS: Question[] = [
  // 今の気持ち
  { id: 1, categoryId: 'mood', text: '過去2週間、仕事に向かう気持ちに前向きさがある。', reverse: true },
  { id: 2, categoryId: 'mood', text: '過去2週間、出勤前から気が重い日が多い。', reverse: false },
  { id: 3, categoryId: 'mood', text: '過去2週間、気持ちの余裕がなくなる瞬間が増えた。', reverse: false },
  { id: 4, categoryId: 'mood', text: '過去2週間、「今日もやれそう」と思える日がある。', reverse: true },
  // 疲れ・消耗
  { id: 5, categoryId: 'fatigue', text: '過去2週間、疲れが翌日に残ることが多い。', reverse: false },
  { id: 6, categoryId: 'fatigue', text: '過去2週間、心身がすり減っている感覚がある。', reverse: false },
  { id: 7, categoryId: 'fatigue', text: '過去2週間、回復できている実感がある。', reverse: true },
  { id: 8, categoryId: 'fatigue', text: '過去2週間、休んでも疲れが抜けにくい。', reverse: false },
  // やりがい・活力
  { id: 9, categoryId: 'engagement', text: '過去2週間、保育の面白さや手応えを感じる瞬間がある。', reverse: true },
  { id: 10, categoryId: 'engagement', text: '過去2週間、自分の成長を実感できる。', reverse: true },
  { id: 11, categoryId: 'engagement', text: '過去2週間、仕事が「作業」になっている感覚がある。', reverse: false },
  { id: 12, categoryId: 'engagement', text: '過去2週間、子どもや保護者との関わりに力をもらえる。', reverse: true },
  // 働き方の納得感
  { id: 13, categoryId: 'fairness', text: '過去2週間、役割分担や負担の配分に納得できている。', reverse: true },
  { id: 14, categoryId: 'fairness', text: '過去2週間、忙しさや負担が自分に偏っていると感じる。', reverse: false },
  { id: 15, categoryId: 'fairness', text: '過去2週間、急な依頼や後出しの仕事が多い。', reverse: false },
  { id: 16, categoryId: 'fairness', text: '過去2週間、園の判断や方針に理解・納得できている。', reverse: true },
  // 職場のつながり
  { id: 17, categoryId: 'connection', text: '過去2週間、困ったときに相談できる相手がいる。', reverse: true },
  { id: 18, categoryId: 'connection', text: '過去2週間、「ありがとう」「助かった」が自然に交わされている。', reverse: true },
  { id: 19, categoryId: 'connection', text: '過去2週間、一人で抱え込む場面があった。', reverse: false },
  { id: 20, categoryId: 'connection', text: '過去2週間、チームとして助け合えている感覚がある。', reverse: true },
  // 休憩・柔軟性
  { id: 21, categoryId: 'recovery', text: '過去2週間、休憩を「実際に」取れている。', reverse: true },
  { id: 22, categoryId: 'recovery', text: '過去2週間、休憩や交代が形だけになっていると感じる。', reverse: false },
  { id: 23, categoryId: 'recovery', text: '過去2週間、勤務調整や相談がしにくいと感じた。', reverse: false },
  { id: 24, categoryId: 'recovery', text: '過去2週間、無理が出そうなときに調整できる雰囲気がある。', reverse: true },
];

// 施策モジュール定義
export const ACTION_MODULES: Record<string, ActionModule> = {
  H1: { id: 'H1', name: '状態の言語化', category: 'human', description: '責めない共有・感情の可視化' },
  H2: { id: 'H2', name: '10分1on1導線', category: 'human', description: '短時間・高頻度の対話' },
  H3: { id: 'H3', name: '承認循環', category: 'human', description: 'フィードバックの日常化' },
  S1: { id: 'S1', name: '回復設計', category: 'system', description: '休憩を制度から運用へ' },
  S2: { id: 'S2', name: '業務棚卸し', category: 'system', description: 'やめる・減らす・まとめる' },
  S3: { id: 'S3', name: '連絡・会議OS', category: 'system', description: '締切と導線の統一' },
  S4: { id: 'S4', name: '役割・偏り是正', category: 'system', description: '担当＋副担当制' },
  B1: { id: 'B1', name: '採用導線', category: 'business', description: '見学→応募→定着フロー' },
  B2: { id: 'B2', name: 'ブランド言語化', category: 'business', description: '選ばれる理由の定義' },
  B3: { id: 'B3', name: 'LINE発信OS', category: 'business', description: '外部発信の仕組化' },
};
