'use client';
import { useState } from 'react';
import { QUESTIONS } from '@/lib/constants';
import { calculateScores } from '@/lib/utils';
// Firebase系のimportは環境構築後に有効化するためコメントアウト
// import { addDoc, collection } from 'firebase/firestore'; 
// import { db } from '@/lib/firebase';

export default function SurveyPage({ params }: { params: { orgId: string } }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [step, setStep] = useState<'intro' | 'questions' | 'result'>('intro');
  const [scores, setScores] = useState<any[]>([]);

  // 1-5のラジオボタン生成ヘルパー
  const renderOptions = (qId: number) => (
    <div className="flex justify-between gap-1 mt-3">
      {[1, 2, 3, 4, 5].map((val) => (
        <label key={val} className="flex-1 text-center cursor-pointer">
          <input
            type="radio"
            name={`q-${qId}`}
            className="sr-only peer"
            onChange={() => setAnswers(prev => ({ ...prev, [qId]: val }))}
            checked={answers[qId] === val}
          />
          <div className="w-full py-3 rounded-lg border border-gray-200 peer-checked:bg-teal-600 peer-checked:text-white peer-checked:border-teal-600 transition text-sm">
            {val}
          </div>
        </label>
      ))}
    </div>
  );

  const handleSubmit = async () => {
    // スコア計算
    const result = calculateScores(answers);
    setScores(result);
    // TODO: ここでFirestoreに回答を保存 (addDoc)
    // await addDoc(collection(db, 'responses'), { ... })
    setStep('result');
  };

  if (step === 'intro') {
    return (
      <div className="max-w-md mx-auto p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">定期診断をはじめます</h1>
            <p className="mb-6 text-gray-600">全24問・所要時間約3分です。</p>
            <button onClick={() => setStep('questions')} className="w-full py-3 bg-teal-600 text-white rounded-full font-bold">開始する</button>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    // 個人結果画面
    const top2 = scores.slice(0, 2);
    const good2 = [...scores].reverse().slice(0, 2);

    return (
      <div className="max-w-lg mx-auto p-6 bg-white min-h-screen">
        <h2 className="text-xl font-bold text-center mb-6">あなたの「今月の整えポイント」</h2>
        
        {/* スコアグラフ */}
        <div className="space-y-4 mb-8">
          {scores.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <span className="w-24 text-xs font-bold text-gray-600">{cat.name}</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${cat.level === 'red' ? 'bg-orange-400' : cat.level === 'amber' ? 'bg-yellow-400' : 'bg-teal-400'}`} 
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* フィードバック */}
        <div className="bg-orange-50 p-6 rounded-xl mb-6">
          <h3 className="font-bold text-orange-800 mb-2">🌱 整えポイント</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            今は「{top2[0].name}」と「{top2[1].name}」の負担が少し高まっているようです。
            あなたが悪いわけではなく、環境やタイミングの影響かもしれません。
            まずは{top2[0].name}について、一つだけ小さな工夫をしてみませんか？
          </p>
        </div>

        <div className="bg-teal-50 p-6 rounded-xl mb-6">
          <h3 className="font-bold text-teal-800 mb-2">✨ あなたの強み・安定</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            一方で「{good2[0].name}」はとても安定しています。これはあなたの素晴らしいリソースです。
          </p>
        </div>

        <div className="text-center text-xs text-gray-400 mt-8">
          これは評価ではありません。結果はあなただけのものです。
        </div>
      </div>
    );
  }

  // 質問画面
  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-teal-500 transition-all" 
          style={{ width: `${(Object.keys(answers).length / QUESTIONS.length) * 100}%` }}
        />
      </div>
      
      <div className="space-y-8 mt-6">
        {QUESTIONS.map((q, idx) => (
          <div key={q.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="text-xs text-gray-400 font-bold mb-1">Q{idx + 1}</div>
            <p className="text-gray-800 font-medium mb-4">{q.text}</p>
            {renderOptions(q.id)}
            <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-1">
              <span>当てはまらない</span>
              <span>当てはまる</span>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100">
        <button 
          onClick={handleSubmit} 
          disabled={Object.keys(answers).length < QUESTIONS.length}
          className="w-full py-4 bg-teal-600 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg"
        >
          結果を見る
        </button>
      </div>
    </div>
  );
}