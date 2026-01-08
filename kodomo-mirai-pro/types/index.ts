// データ型の定義
export type Role = 'admin' | 'advisor';

export interface User {
  uid: string;
  email: string;
  role: Role;
  orgIds: string[]; // 所属または担当園
}

export interface Answer {
  questionId: number;
  value: number; // 1-5
}

export interface CategoryScore {
  id: string;
  name: string;
  score: number; // 0-100
  level: 'green' | 'amber' | 'red';
}

// 質問データの型
export interface Question {
  id: number;
  categoryId: string;
  text: string;
  reverse: boolean;
}

// 施策モジュール
export interface ActionModule {
  id: string;
  name: string;
  category: 'human' | 'system' | 'business';
  description: string;
}
