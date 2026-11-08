import React, { useState } from 'react';
import { X, Check, ArrowRight, Sparkles, HelpCircle, Layers, Maximize2 } from 'lucide-react';
import { WeddingItem, VisualTier } from '../types/wedding';

interface VisualNavModalProps {
  item: WeddingItem | null;
  onClose: () => void;
  onSelectTier: (itemId: string, tier: VisualTier) => void;
}

export const VisualNavModal: React.FC<VisualNavModalProps> = ({
  item,
  onClose,
  onSelectTier,
}) => {
  if (!item) return null;

  const [selectedSizeTab, setSelectedSizeTab] = useState<number>(1); // 0: 八つ切, 1: 六つ切, 2: 四つ切

  const formatYen = (amount: number) => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  const visual = item.visualInfo;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f4] w-full max-w-4xl rounded-xl shadow-2xl border border-[#ded5c2] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#2c241a] text-white px-5 py-4 flex items-center justify-between border-b border-[#473b2d] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium tracking-wide">
              <span>★ 一流ホテル婚礼ナビゲーション</span>
              <span>·</span>
              <span className="text-[#c7baa7]">{visual.categoryTitle}</span>
              <span>·</span>
              <span className="bg-[#423626] text-[#dfd4c4] px-1.5 py-0.5 rounded text-[11px]">
                {item.timing}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#f7f3ec] mt-1 tracking-tight">
              {visual.modalTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#baa995] hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Overview Banner with Hero Photo */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch bg-white border border-[#e2d9c5] rounded-lg overflow-hidden shadow-xs">
            {visual.heroImage ? (
              <div className="md:col-span-5 relative min-h-[200px] md:min-h-full bg-[#1e1913]">
                <img
                  src={visual.heroImage}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center max-h-[260px] md:max-h-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs text-[#fbf8f2] font-semibold tracking-wide drop-shadow-xs">
                    {visual.categoryTitle}（一流ホテル実物アーカイブ）
                  </span>
                </div>
              </div>
            ) : null}

            <div className={`${visual.heroImage ? 'md:col-span-7' : 'md:col-span-12'} p-4 sm:p-5 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#8c7028] bg-[#f7f1df] px-2 py-0.5 rounded border border-[#e8ddbe]">
                    {item.name}
                  </span>
                  <span className="text-xs text-[#706456]">
                    現在設定: <strong className="text-[#2b241c] font-mono">{formatYen(item.unitPrice)}円</strong>
                  </span>
                </div>
                <p className="text-sm text-[#4a3f33] leading-relaxed">
                  {visual.overview}
                </p>
              </div>

              {visual.expertAdvice && (
                <div className="mt-4 pt-3 border-t border-[#f0e9dc] text-xs text-[#7a642e] flex items-start gap-2 bg-[#fdfbf6] p-2.5 rounded border border-[#ece2cb]">
                  <Sparkles className="w-4 h-4 text-[#bfa145] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#66501d]">ホテルウエディングプランナーの助言：</span>
                    <span className="text-[#524430]">{visual.expertAdvice.replace(/^プランナーの助言：/, '')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Special Section: Studio Photography Size Comparison (四つ切り・六つ切り・八つ切り) */}
          {visual.sizeSpecs && visual.sizeSpecs.length > 0 && (
            <div className="bg-white border border-[#ded5c0] rounded-lg p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#8d7026]" />
                  <h3 className="font-bold text-[#2d251c] text-base font-serif">
                    【四つ切・六つ切・八つ切】実寸サイズ＆縮尺ビジュアル比較
                  </h3>
                </div>
                <span className="text-xs text-[#827565]">
                  一般的なA4用紙や手のひらとの比較
                </span>
              </div>

              {/* Size Tab Selector */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-[#f3ede1] rounded-lg mb-4">
                {visual.sizeSpecs.map((spec, idx) => (
                  <button
                    key={spec.name}
                    type="button"
                    onClick={() => setSelectedSizeTab(idx)}
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all text-center ${
                      selectedSizeTab === idx
                        ? 'bg-white text-[#2c2217] shadow-xs border border-[#d6cab2]'
                        : 'text-[#6e6150] hover:text-[#2c2217]'
                    }`}
                  >
                    {spec.name}
                    {spec.isRecommended && (
                      <span className="ml-1 text-[10px] text-[#916b18] font-bold">★推奨</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Visual Frame Simulation Diagram */}
              <div className="bg-[#f9f7f2] border border-[#e5dcce] rounded-lg p-4 sm:p-6 mb-4">
                <div className="flex flex-col lg:flex-row items-center justify-around gap-6">
                  {/* SVG Scale Comparison Canvas */}
                  <div className="relative w-full max-w-sm h-64 bg-white border border-[#d4c9b5] rounded-md shadow-inner flex items-center justify-center p-3">
                    {/* Background A4 comparison dashed box */}
                    <div
                      className="absolute border-2 border-dashed border-[#b8ab96] bg-[#f5f1ea]/40 flex items-start justify-end p-1 pointer-events-none"
                      style={{ width: '210px', height: '230px' }}
                      title="A4用紙（21.0cm × 29.7cm相当の比較枠）"
                    >
                      <span className="text-[10px] font-mono text-[#8a7a66] bg-white/90 px-1 rounded">
                        参考: A4用紙サイズ
                      </span>
                    </div>

                    {/* Active Selected Photo Frame */}
                    <div
                      className={`relative transition-all duration-300 border-4 border-[#3d2f21] bg-[#fbf9f5] shadow-lg flex flex-col items-center justify-center text-center p-2 ${
                        selectedSizeTab === 0
                          ? 'w-[165px] h-[190px]' // 八つ切り (16.5 x 21.6)
                          : selectedSizeTab === 1
                          ? 'w-[203px] h-[225px]' // 六つ切り (20.3 x 25.4)
                          : 'w-[254px] h-[255px]' // 四つ切り (25.4 x 30.5)
                      }`}
                    >
                      <div className="absolute inset-1 border border-[#c2b093] pointer-events-none" />
                      <div className="text-xs font-bold text-[#382b1c] font-serif">
                        {visual.sizeSpecs[selectedSizeTab].name}
                      </div>
                      <div className="text-sm font-mono font-bold text-[#8f7127] mt-0.5">
                        {visual.sizeSpecs[selectedSizeTab].dimensions}
                      </div>
                      <div className="text-[10px] text-[#786c5e] mt-1 px-1">
                        {selectedSizeTab === 2
                          ? '親族20〜30名の集合写真に最適'
                          : selectedSizeTab === 1
                          ? '全国写真館で最も選ばれる標準'
                          : '書棚に飾れるコンパクト判'}
                      </div>
                    </div>
                  </div>

                  {/* Size Spec Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="text-xs text-[#8c7438] font-bold">実寸ミリ規格</div>
                      <div className="text-lg font-bold text-[#2d2318] font-mono">
                        {visual.sizeSpecs[selectedSizeTab].dimensions}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-[#736554] font-semibold">大きさの目安・比率</div>
                      <p className="text-xs text-[#42372a] mt-0.5 leading-relaxed bg-[#f4eee3] p-2.5 rounded border border-[#e0d6c4]">
                        {visual.sizeSpecs[selectedSizeTab].ratioComparison}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs text-[#736554] font-semibold">おすすめの用途・シーン</div>
                      <p className="text-xs text-[#3b3125] mt-0.5">
                        {visual.sizeSpecs[selectedSizeTab].popularUse}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Matsu / Take / Ume (松・竹・梅) 3-Tier Comparison Grid */}
          {visual.tiers && visual.tiers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-[#2c2218] text-base font-serif flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#a8862d]" />
                  【松・竹・梅】グレード別の内容・価格・仕様比較
                </h3>
                <span className="text-xs text-[#786b5c]">
                  クリックでワンタップ適用
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visual.tiers.map((tier) => {
                  const isCurrent =
                    item.unitPrice === tier.price ||
                    (item.currentTier === tier.grade && !item.unitPrice);

                  return (
                    <div
                      key={tier.grade}
                      className={`relative bg-white rounded-lg border-2 p-4 flex flex-col justify-between transition-all ${
                        isCurrent
                          ? 'border-[#a8862d] shadow-md ring-1 ring-[#a8862d]/50 bg-[#fffdfa]'
                          : 'border-[#e0d7c5] hover:border-[#b8a783] shadow-xs'
                      }`}
                    >
                      {/* Grade Badge */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-0.5 text-xs font-bold rounded-sm ${
                              tier.grade === '梅'
                                ? 'bg-[#5b7a58] text-white'
                                : tier.grade === '竹'
                                ? 'bg-[#8d722d] text-white'
                                : 'bg-[#7a3b3b] text-white'
                            }`}
                          >
                            【{tier.grade}】{tier.grade === '梅' ? '基本' : tier.grade === '竹' ? '標準' : '特上'}
                          </span>

                          {isCurrent && (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#8d722d] bg-[#fbf5e6] px-1.5 py-0.5 rounded">
                              <Check className="w-3.5 h-3.5 text-[#8d722d]" />
                              現在の選択
                            </span>
                          )}
                        </div>

                        <div className="text-sm font-bold text-[#2d2419] font-serif">
                          {tier.title}
                        </div>

                        <div className="mt-1 mb-2">
                          <span className="text-xl font-bold font-mono tabular-nums text-[#2c2217]">
                            {formatYen(tier.price)}
                          </span>
                          <span className="text-xs text-[#615446] ml-1">円（税込）</span>
                        </div>

                        <div className="text-xs font-medium text-[#7a6435] mb-2 leading-tight">
                          {tier.subtitle}
                        </div>

                        <p className="text-xs text-[#524638] leading-relaxed mb-3">
                          {tier.description}
                        </p>

                        {/* Feature Highlights */}
                        <div className="space-y-1.5 pt-2 border-t border-[#f0e9dc] mb-4">
                          {tier.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#4a3f31]">
                              <Check className="w-3 h-3 text-[#705a26] shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button: Apply Grade */}
                      <button
                        type="button"
                        onClick={() => {
                          onSelectTier(item.id, tier);
                        }}
                        className={`w-full py-2 px-3 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                          isCurrent
                            ? 'bg-[#f0e8d8] text-[#5e4e2d] cursor-default border border-[#d8caa8]'
                            : 'bg-[#2d241a] hover:bg-[#453727] text-white shadow-xs'
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            選択中（{formatYen(tier.price)}円）
                          </>
                        ) : (
                          <>
                            【{tier.grade}】に変更（{formatYen(tier.price)}円）
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Checklist & Tips for Couples */}
          {visual.featurePoints && visual.featurePoints.length > 0 && (
            <div className="bg-[#faf6ee] border border-[#e5dac7] rounded-lg p-4 text-xs text-[#594d3e]">
              <div className="font-bold text-[#3d3223] mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#8f742c]" />
                新郎新婦様・スタッフ向け確認チェックポイント
              </div>
              <ul className="space-y-1 pl-4 list-disc text-[#4f4335]">
                {visual.featurePoints.map((pt, i) => (
                  <li key={i} className="leading-relaxed">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Bottom Close Footer */}
        <div className="bg-[#f5efe2] px-5 py-3 border-t border-[#dfd4c0] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#786b59]">
            ※ 単価を変更すると、サマリーの総額・残金・平均単価が自動で再計算されます。
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#3b2f21] hover:bg-[#524230] rounded-md transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
