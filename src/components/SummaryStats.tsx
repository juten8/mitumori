import React from 'react';
import { Users, CreditCard, Calculator, Receipt, ShieldCheck } from 'lucide-react';
import { EstimateSummary } from '../types/wedding';

interface SummaryStatsProps {
  summary: EstimateSummary;
  onGuestCountChange: (count: number) => void;
  onDepositChange: (deposit: number) => void;
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({
  summary,
  onGuestCountChange,
  onDepositChange,
}) => {
  const formatYen = (amount: number) => {
    return new Intl.NumberFormat('ja-JP').format(Math.round(amount));
  };

  return (
    <section className="bg-white border-b border-[#e6decb] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* 集計サマリー・計算表示エリア（ヘッダー直下） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* 1. 参列者数（入力枠） */}
          <div className="bg-[#faf8f3] border border-[#e8dfcb] rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#706454] font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#8d722d]" />
                参列者数
              </span>
              <span className="text-[11px] text-[#9c8e7e]">約{summary.tableCount}卓</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                min={1}
                max={500}
                value={summary.guestCount || ''}
                onChange={(e) => onGuestCountChange(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#2c241c] bg-white border border-[#d6cbb5] rounded-md px-2.5 py-1 focus:ring-2 focus:ring-[#c2a24d] focus:border-[#c2a24d] outline-hidden text-right"
              />
              <span className="text-sm font-semibold text-[#5a4e40] shrink-0">名</span>
            </div>
            <div className="text-[11px] text-[#8a7f72] mt-1 text-right">
              料理・引出物等と連動
            </div>
          </div>

          {/* 2. お見積り総額（税込） */}
          <div className="bg-[#fefcf7] border-2 border-[#d9bf77] rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#735a1a] font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-[#a68224]" />
                お見積り総額（税込）
              </span>
              <span className="text-[10px] bg-[#d4af37]/20 text-[#6e5109] px-1.5 py-0.5 rounded font-mono">
                自動合算
              </span>
            </div>
            <div className="mt-1 text-right">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-[#2b2217] tracking-tight">
                {formatYen(summary.totalAmount)}
              </span>
              <span className="text-sm font-bold text-[#5c4d3d] ml-1">円</span>
            </div>
            <div className="text-[11px] text-[#8a7d6e] mt-1 text-right">
              全20工程手配項目（小計の合計値）
            </div>
          </div>

          {/* 3. 挙式披露宴会場のご予約金（控除） */}
          <div className="bg-[#faf8f3] border border-[#e8dfcb] rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#706454] font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#6e5843]" />
                会場ご予約金（控除）
              </span>
              <span className="text-[10px] text-[#8e8070]">既払い内金</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <input
                type="number"
                min={0}
                step={10000}
                value={summary.depositAmount}
                onChange={(e) => onDepositChange(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-lg sm:text-xl font-bold font-mono tabular-nums text-[#2c241c] bg-white border border-[#d6cbb5] rounded-md px-2.5 py-1 focus:ring-2 focus:ring-[#c2a24d] focus:border-[#c2a24d] outline-hidden text-right"
              />
              <span className="text-sm font-semibold text-[#5a4e40] shrink-0">円</span>
            </div>
            <div className="text-[11px] text-[#8a7f72] mt-1 text-right">
              申込金・内金を控除
            </div>
          </div>

          {/* 4. 最終ご請求残金 */}
          <div className="bg-[#f7f5ed] border border-[#dcd2be] rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#594a39] font-medium mb-1">
              <span className="flex items-center gap-1.5 font-semibold">
                <Calculator className="w-4 h-4 text-[#8a6e26]" />
                最終ご請求残金
              </span>
              <span className="text-[10px] text-[#706250]">総額 − 予約金</span>
            </div>
            <div className="mt-1 text-right">
              <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#872a2a]">
                {formatYen(summary.balanceAmount)}
              </span>
              <span className="text-sm font-semibold text-[#5c4d3d] ml-1">円</span>
            </div>
            <div className="text-[11px] text-[#8a7e70] mt-1 text-right">
              挙式前最終振込額（目安）
            </div>
          </div>

          {/* 5. 参列者1人あたり平均単価 */}
          <div className="bg-[#faf8f3] border border-[#e8dfcb] rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#706454] font-medium mb-1">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#8d722d]" />
                参列者1人あたり平均
              </span>
              <span className="text-[10px] text-[#8e8070]">総額 ÷ 参列者</span>
            </div>
            <div className="mt-1 text-right">
              <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#2c241c]">
                {formatYen(summary.perGuestAmount)}
              </span>
              <span className="text-xs font-semibold text-[#5c4d3d] ml-1">円 / 名</span>
            </div>
            <div className="text-[11px] text-[#8a7f72] mt-1 text-right">
              全国平均: 約4.2万〜5.5万
            </div>
          </div>
        </div>

        {/* 必須注記テキスト（サマリー直下に必ず明記するテキスト） */}
        <div className="mt-4 p-3 rounded-md bg-[#fffdf8] border border-[#ebd9a9] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-[#6e5317]">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#a68224] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#5c4410]">
                ※ 会費またはお祝い、ご祝儀等により、総費用の8割ぐらいは、この費用が軽減されます（目安）。
              </p>
              <p className="text-[11px] text-[#806933] mt-0.5">
                一般的なご祝儀相場（ご友人3万円、ご親族5〜10万円 / 平均約3.3万円/名）での試算例です。
              </p>
            </div>
          </div>

          {/* 実質自己負担額の安心シミュレーションバッジ */}
          <div className="bg-white/80 border border-[#dfce9f] px-3 py-1.5 rounded text-right shrink-0">
            <span className="text-[11px] text-[#735e2e] mr-2">
              ご祝儀想定（{summary.guestCount}名 × 約3.3万）: 約{formatYen(summary.estimatedGifts)}円
            </span>
            <span className="text-xs font-bold text-[#2d2419]">
              実質自己負担目安: <span className="font-mono text-sm text-[#9e3b3b]">約{formatYen(summary.netCoupleBurden)}円</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
