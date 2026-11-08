import React from 'react';
import { Award, Printer, RotateCcw, Sparkles } from 'lucide-react';

interface HeaderBannerProps {
  onApplyPreset: (grade: '梅' | '竹' | '松') => void;
  onReset: () => void;
  onPrint: () => void;
  onOpenTerms: () => void;
  onOpenOriginalSheet?: () => void;
  currentPreset?: '梅' | '竹' | '松' | 'custom';
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onApplyPreset,
  onReset,
  onPrint,
  onOpenTerms,
  onOpenOriginalSheet,
  currentPreset = '竹',
}) => {
  return (
    <header className="border-b border-[#e6decb] bg-white shadow-xs">
      {/* 1. 最上段（A1セル相当）：★ 一流ホテル監修 ★ */}
      <div className="bg-gradient-to-r from-[#d4af37]/15 via-[#f9f5ea] to-[#d4af37]/15 border-b border-[#e2d8bd] py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-[#9c7a23]" />
          <span className="font-bold tracking-widest text-[#7a5d10] text-sm md:text-base font-serif">
            ★ 一流ホテル監修 ★
          </span>
          <Award className="w-4 h-4 text-[#9c7a23]" />
        </div>
      </div>

      {/* 2. 大見出し & 制作クレジット */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8a7f73] font-medium tracking-wider mb-1">
              <span>主催：着付けナビウエディングプランナー養成</span>
              <span>·</span>
              <span>著作権：Shigenori Watanabe</span>
              <span>·</span>
              <span>開発：Y2Cサポート協同組合</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2d261e] tracking-tight font-serif">
              婚礼総合プロデュースお見積り＆進行段取りチェックシート
            </h1>
            <p className="text-xs sm:text-sm text-[#6d6459] mt-1">
              専門知識のない新郎新婦様やプランナースタッフでも「松竹梅のグレード差」「規格サイズ（四つ切・六つ切）」「実物イメージ」を直感的に把握できる視覚ナビゲーション搭載総合版
            </p>
          </div>

          {/* ツールバー操作エリア */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 print:hidden">
            {/* 松竹梅 一括シミュレーション */}
            <div className="flex items-center bg-[#f5f1e8] p-1 rounded-md border border-[#e2dac7]">
              <span className="text-xs font-semibold text-[#665a4a] px-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#bfa145]" />
                一括切替:
              </span>
              <button
                type="button"
                onClick={() => onApplyPreset('梅')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                  currentPreset === '梅'
                    ? 'bg-[#5b7a58] text-white shadow-xs'
                    : 'text-[#4d4437] hover:bg-white/80'
                }`}
                title="基本アイテム中心のリーズナブル設定"
              >
                梅（基本）
              </button>
              <button
                type="button"
                onClick={() => onApplyPreset('竹')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                  currentPreset === '竹'
                    ? 'bg-[#8d722d] text-white shadow-xs'
                    : 'text-[#4d4437] hover:bg-white/80'
                }`}
                title="ホテル婚礼で最も選ばれる安心の王道設定"
              >
                竹（標準）
              </button>
              <button
                type="button"
                onClick={() => onApplyPreset('松')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                  currentPreset === '松'
                    ? 'bg-[#7a3b3b] text-white shadow-xs'
                    : 'text-[#4d4437] hover:bg-white/80'
                }`}
                title="最上級の料理・装花・ドレスの特上設定"
              >
                松（特上）
              </button>
            </div>

            {/* 印刷/PDF出力 */}
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#3b3226] bg-[#f9f7f2] hover:bg-[#eae4d5] border border-[#d8cfbd] rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              印刷 / PDF出力
            </button>

            {/* リセット */}
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7d7366] hover:text-[#383127] hover:bg-[#f3ede1] border border-transparent hover:border-[#ded6c4] rounded-md transition-colors"
              title="初期設定に戻す"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              初期値
            </button>

            {/* 原本シート参照 */}
            {onOpenOriginalSheet && (
              <button
                type="button"
                onClick={onOpenOriginalSheet}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1a385c] bg-[#eef5fc] hover:bg-[#dce9f7] border border-[#bcd2ea] rounded-md transition-colors"
                title="提示された原本シート（工程＆見積り）の画像を確認"
              >
                <span>📷 原本シート参照</span>
              </button>
            )}

            {/* 規約・利用許諾 */}
            <button
              type="button"
              onClick={onOpenTerms}
              className="px-2.5 py-1.5 text-xs text-[#8c7438] underline hover:text-[#5e4b1c] transition-colors"
            >
              利用規約
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
