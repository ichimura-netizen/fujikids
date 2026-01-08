import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          こども未来舎 Pro <br/>
          <span className="text-teal-600 text-2xl">エンパシーマネジメント診断</span>
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          保育の現場を「評価」ではなく「改善の地図」として可視化する。<br/>
          人が幸せに働ける園をつくるための、新しい運用支援ツールです。
        </p>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-bold text-orange-800 mb-2">安心の約束</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>この診断は個人を評価するためのものではありません。</li>
            <li>回答は匿名化され、統計データとしてのみ活用されます。</li>
            <li>結果は「整えるためのヒント」としてご自身に還元されます。</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link href="/survey/demo_org" className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold shadow-lg hover:bg-teal-700 transition">
            回答をはじめる（職員の方）
          </Link>
          <Link href="/login" className="px-8 py-4 bg-white text-gray-600 border border-gray-300 rounded-full font-bold hover:bg-gray-50 transition">
            管理者ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}