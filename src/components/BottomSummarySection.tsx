import React from 'react';
import { EstimateSummary } from '../types/wedding';
import { ShieldCheck, Info } from 'lucide-react';

interface BottomSummarySectionProps {
  summary: EstimateSummary;
  onDepositChange: (deposit: number) => void;
}

export const BottomSummarySection: React.FC<BottomSummarySectionProps> = ({
  summary,
  onDepositChange,
}) => {
  const formatYen = (amount: number) => {
    return new Intl.NumberFormat('ja-JP').format(Math.round(amount));
  };

  return (
    <div className="mt-6 bg-[#fffdfa] border-2 border-[#d4bc78] rounded-xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#e8dcb8] pb-3 mb-4">
        <h3 className="text-base font-bold text-[#2d2217] font-serif flex items-center gap-2">
          <span>【婚礼総合プロデュース 最終ご請求サマリー】</span>
        </h3>
        <span className="text-xs text-[#7d6c57] font-mono">
          参列者数：{summary.guestCount}名 基準
        </span>
      </div>

      {/* Screenshot 2 Layout Exact Replication */}
      <div className="space-y-3 max-w-xl ml-auto">
        {/* お見積り総額（税込） */}
        <div className="flex items-center justify-between text-sm sm:text-base">
          <span className="font-semibold text-[#423627]">
            お見積り総額（税込）：
          </span>
          <div className="text-right">
            <span className="font-mono font-bold text-lg sm:text-xl text-[#2b2116] tabular-nums">
              {formatYen(summary.totalAmount)}
            </span>
            <span className="font-medium text-[#4a3d2e] ml-1">円</span>
          </div>
        </div>

        {/* 挙式披露宴会場のご予約金（控除） */}
        <div className="flex items-center justify-between text-sm sm:text-base">
          <span className="font-semibold text-[#423627]">
            挙式披露宴会場のご予約金（控除）：
          </span>
          <div className="flex items-center gap-1.5 justify-end">
            <input
              type="number"
              min={0}
              step={10000}
              value={summary.depositAmount}
              onChange={(e) => onDepositChange(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-32 sm:w-36 text-right font-mono font-bold text-sm sm:text-base text-[#241c13] bg-white border border-[#c4b59a] rounded px-2 py-1 focus:ring-1 focus:ring-[#9e7d2b] outline-hidden shadow-2xs"
            />
            <span className="font-medium text-[#4a3d2e]">円</span>
          </div>
        </div>

        {/* 境界線 */}
        <div className="border-t-2 border-[#382b1c] my-2 pt-2">
          {/* 最終ご請求残金 */}
          <div className="flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-black text-[#1a2d42] font-serif">
              最終ご請求残金：
            </span>
            <div className="text-right">
              <span className="font-mono font-black text-2xl sm:text-3xl text-[#102a45] tabular-nums tracking-tight">
                {formatYen(summary.balanceAmount)}
              </span>
              <span className="font-bold text-[#1a2d42] text-lg ml-1">円</span>
            </div>
          </div>
        </div>

        {/* 参列者1人あたり平均単価 */}
        <div className="flex items-center justify-between text-xs sm:text-sm pt-1 text-[#544636]">
          <span className="font-medium">
            参列者1人あたり平均単価：
          </span>
          <div className="text-right font-mono font-bold text-[#2d2317] tabular-nums">
            {formatYen(summary.perGuestAmount)} 円 / 名
          </div>
        </div>
      </div>

      {/* 必須注記テキスト */}
      <div className="mt-5 pt-3 border-t border-[#ebdfc4] flex items-start gap-2 text-xs text-[#6e541b] bg-[#fbf6e9] p-3 rounded-lg">
        <Info className="w-4 h-4 text-[#8f7129] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-bold text-[#5c4412]">
            ※ 会費またはお祝い、ご祝儀等により、総費用の8割ぐらいは、この費用が軽減されます（目安）。
          </p>
          <p className="text-[11px] text-[#78612a] mt-0.5">
            一般的なご祝儀相場（ご友人3万円、ご親族5〜10万円 / 平均約3.3万円/名）での試算例です。ご祝儀想定：約{formatYen(summary.estimatedGifts)}円、実質自己負担目安：約{formatYen(summary.netCoupleBurden)}円
          </p>
        </div>
      </div>
    </div>
  );
};
