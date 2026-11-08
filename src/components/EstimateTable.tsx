import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Filter,
  Check,
  Sparkles
} from 'lucide-react';
import { WeddingItem, VisualTier } from '../types/wedding';

interface EstimateTableProps {
  items: WeddingItem[];
  onToggleItem: (id: string) => void;
  onUpdateUnitPrice: (id: string, price: number) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onOpenVisualModal: (item: WeddingItem) => void;
  onSelectTier: (itemId: string, tier: VisualTier) => void;
  onAddItem: (newItem: WeddingItem) => void;
  onDeleteItem: (id: string) => void;
}

export const EstimateTable: React.FC<EstimateTableProps> = ({
  items,
  onToggleItem,
  onUpdateUnitPrice,
  onUpdateQuantity,
  onOpenVisualModal,
  onSelectTier,
  onAddItem,
  onDeleteItem,
}) => {
  // State for inline accordion expanded row IDs
  const [expandedRowIds, setExpandedRowIds] = useState<Record<string, boolean>>({});
  // Timing filter: 'all' | '挙式前' | '事前' | '事前・当日' | '当日'
  const [timingFilter, setTimingFilter] = useState<string>('all');
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleExpand = (id: string) => {
    setExpandedRowIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    items.forEach((item) => {
      allExpanded[item.id] = true;
    });
    setExpandedRowIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedRowIds({});
  };

  const formatYen = (amount: number) => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchTiming = timingFilter === 'all' || item.timing.includes(timingFilter);
    const matchSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTiming && matchSearch;
  });

  return (
    <div className="bg-white rounded-lg border border-[#ded5c0] shadow-xs overflow-hidden">
      {/* Table Toolbar Controls */}
      <div className="p-4 bg-[#fbf9f4] border-b border-[#e5dcce] flex flex-wrap items-center justify-between gap-3 print:hidden">
        {/* Timing Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-semibold text-[#665a4c] flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#8f742c]" />
            進行工程絞込:
          </span>
          {[
            { id: 'all', label: '全20工程' },
            { id: '決定', label: '1-3 初期決定' },
            { id: 'ヶ月前', label: '4-13 準備期' },
            { id: '週間前', label: '14-18 直前準備' },
            { id: '前', label: '19-20 最終確認' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTimingFilter(tab.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                timingFilter === tab.id
                  ? 'bg-[#102a45] text-white shadow-xs'
                  : 'bg-white text-[#524637] border border-[#d6cbbe] hover:bg-[#f3ede1]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Bulk Accordion Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="項目名を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs bg-white border border-[#d4c8b6] rounded px-2.5 py-1 text-[#2d2419] placeholder:text-[#9e9080] focus:ring-1 focus:ring-[#ad8e3a] outline-hidden"
          />

          <div className="flex items-center gap-1 border border-[#d4c8b6] rounded bg-white p-0.5 text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="px-2 py-0.5 text-[#5e5141] hover:bg-[#f5efe3] rounded text-[11px]"
              title="すべての画像・説明アコーディオンを展開"
            >
              全展開
            </button>
            <span className="text-[#c7baa8]">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2 py-0.5 text-[#5e5141] hover:bg-[#f5efe3] rounded text-[11px]"
              title="すべてのアコーディオンを閉じる"
            >
              全折畳
            </button>
          </div>
        </div>
      </div>

      {/* 厳密な7列構成テーブル */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[960px]">
          <thead>
            <tr className="bg-[#102a45] text-white text-xs font-serif font-bold border-b border-[#0b1d30]">
              {/* 第1列：確認 */}
              <th scope="col" className="w-14 py-3 px-3 text-center border-r border-[#1e3c5d]">
                確認
              </th>

              {/* 第2列：時期・タイミング */}
              <th scope="col" className="w-36 py-3 px-3 text-center border-r border-[#1e3c5d]">
                時期・タイミング
              </th>

              {/* 第3列：手配項目・タスク内容 */}
              <th scope="col" className="py-3 px-4 border-r border-[#1e3c5d]">
                手配項目・タスク内容（司会・撮影・着付け等）
              </th>

              {/* 第4列：単価 (円) */}
              <th scope="col" className="w-32 py-3 px-3 text-right border-r border-[#1e3c5d]">
                単価 (円)
              </th>

              {/* 第5列：数量 */}
              <th scope="col" className="w-20 py-3 px-2 text-center border-r border-[#1e3c5d]">
                数量
              </th>

              {/* 第6列：小計 (円) */}
              <th scope="col" className="w-36 py-3 px-3 text-right border-r border-[#1e3c5d]">
                小計 (円)
              </th>

              {/* 第7列：イメージ・説明ボタン */}
              <th scope="col" className="w-72 py-3 px-3 text-center bg-[#0d2238]">
                視覚イメージ・詳細リンク
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#ece4d6] text-xs">
            {filteredItems.map((item, index) => {
              const isExpanded = !!expandedRowIds[item.id];
              const subtotal = item.checked ? item.unitPrice * item.quantity : 0;

              return (
                <React.Fragment key={item.id}>
                  <tr
                    className={`transition-colors ${
                      item.checked
                        ? index % 2 === 0
                          ? 'bg-white hover:bg-[#fbf9f4]'
                          : 'bg-[#faf8f4] hover:bg-[#f7f3eb]'
                        : 'bg-[#f7f5f2] opacity-60 hover:opacity-80'
                    }`}
                  >
                    {/* 第1列：確認（チェックボックス） */}
                    <td className="py-3 px-3 text-center border-r border-[#eee6da]">
                      <button
                        type="button"
                        onClick={() => onToggleItem(item.id)}
                        className="inline-flex items-center justify-center p-1 rounded text-[#4d3f2d] hover:text-[#211a12] focus:outline-hidden"
                        title={item.checked ? '計算に含める（チェック解除で除外）' : '計算に含める'}
                      >
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5 text-[#82641a]" />
                        ) : (
                          <Square className="w-5 h-5 text-[#9e9180]" />
                        )}
                      </button>
                    </td>

                    {/* 第2列：時期・タイミング */}
                    <td className="py-3 px-3 border-r border-[#eee6da] whitespace-nowrap text-left">
                      <span className="font-semibold text-xs text-[#2c3e50] tracking-tight">
                        {item.timing}
                      </span>
                    </td>

                    {/* 第3列：手配項目・タスク内容 */}
                    <td className="py-3 px-4 border-r border-[#eee6da]">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-[#2d2418] text-sm font-serif">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[#635749] whitespace-pre-line mt-0.5 leading-relaxed">
                            {item.description}
                          </div>
                        </div>

                        {/* Inline Accordion Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="shrink-0 p-1 text-[#877457] hover:text-[#2d2418] hover:bg-[#ede5d5] rounded text-[11px] flex items-center gap-0.5 print:hidden transition-colors"
                          title="その場で写真と松竹梅解説を展開"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5" />
                              <span>閉じる</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5" />
                              <span>展開</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>

                    {/* 第4列：単価 (円) */}
                    <td className="py-3 px-3 text-right border-r border-[#eee6da]">
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="number"
                          min={0}
                          step={100}
                          value={item.unitPrice}
                          onChange={(e) =>
                            onUpdateUnitPrice(item.id, Math.max(0, parseInt(e.target.value) || 0))
                          }
                          className="w-24 text-right font-mono tabular-nums text-xs font-bold text-[#2d2419] bg-white border border-[#d6cbbe] rounded px-1.5 py-1 focus:ring-1 focus:ring-[#8d722d] outline-hidden"
                        />
                        <span className="text-[11px] text-[#695d4e]">円</span>
                      </div>
                    </td>

                    {/* 第5列：数量 */}
                    <td className="py-3 px-2 text-center border-r border-[#eee6da]">
                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={500}
                          value={item.quantity}
                          onChange={(e) =>
                            onUpdateQuantity(item.id, Math.max(0, parseInt(e.target.value) || 0))
                          }
                          className="w-12 text-center font-mono tabular-nums text-xs font-semibold text-[#2d2419] bg-white border border-[#d6cbbe] rounded px-1 py-1 focus:ring-1 focus:ring-[#8d722d] outline-hidden"
                        />
                        <span className="text-[10px] text-[#736657]">{item.unitLabel}</span>
                      </div>
                    </td>

                    {/* 第6列：小計 (円) 【計算式: 単価 * 数量】 */}
                    <td className="py-3 px-3 text-right border-r border-[#eee6da] whitespace-nowrap">
                      <span className="font-mono tabular-nums font-bold text-sm text-[#241c13]">
                        {formatYen(subtotal)}
                      </span>
                      <span className="text-[11px] text-[#695c4d] ml-1">円</span>
                      {!item.checked && (
                        <div className="text-[10px] text-[#a14040]">対象外</div>
                      )}
                    </td>

                    {/* 第7列：イメージ・説明ボタン（指定仕様） */}
                    <td className="py-2.5 px-3 text-center bg-[#fcfbf7]">
                      <button
                        type="button"
                        onClick={() => onOpenVisualModal(item)}
                        className="w-full py-1.5 px-2.5 text-xs font-bold rounded border shadow-2xs transition-all flex items-center justify-center gap-1.5 bg-[#f4ece0] hover:bg-[#ede0cf] text-[#4d3a17] border-[#cbba99] hover:border-[#ad966d]"
                        title="別画面で写真・松竹梅比較・実寸サイズをフル表示"
                      >
                        <span className="truncate">{item.visualInfo.buttonLabel}</span>
                        <ExternalLink className="w-3 h-3 text-[#7d6529] shrink-0" />
                      </button>
                    </td>
                  </tr>

                  {/* 【アコーディオン（グループ化）形式でのインライン画像展開行】 */}
                  {isExpanded && (
                    <tr className="bg-[#f9f6ef] border-b-2 border-[#d9ccb4] animate-fadeIn">
                      <td colSpan={7} className="p-4">
                        <div className="bg-white border border-[#ded4bf] rounded-lg p-4 shadow-xs">
                          <div className="flex flex-col md:flex-row items-start gap-4">
                            {/* Inline Visual Thumbnail */}
                            {item.visualInfo.heroImage && (
                              <div className="w-full md:w-64 shrink-0 rounded-md overflow-hidden border border-[#dcd1be] shadow-2xs">
                                <img
                                  src={item.visualInfo.heroImage}
                                  alt={item.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-40 object-cover"
                                />
                                <div className="p-1.5 bg-[#f4ede1] text-[11px] text-center text-[#594b38] font-semibold border-t border-[#e2d8c5]">
                                  {item.visualInfo.categoryTitle} 実物写真
                                </div>
                              </div>
                            )}

                            {/* Tiers or Size Explanation */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm text-[#382d20] font-serif">
                                  {item.visualInfo.modalTitle}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => onOpenVisualModal(item)}
                                  className="text-xs font-semibold text-[#8c6f27] hover:underline flex items-center gap-1"
                                >
                                  全画面詳細で比較する →
                                </button>
                              </div>

                              <p className="text-xs text-[#524536] leading-relaxed">
                                {item.visualInfo.overview}
                              </p>

                              {/* Tiers Quick Switcher */}
                              {item.visualInfo.tiers && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                                  {item.visualInfo.tiers.map((t) => (
                                    <div
                                      key={t.grade}
                                      className={`p-2.5 rounded border text-xs flex flex-col justify-between ${
                                        item.unitPrice === t.price
                                          ? 'border-[#a38029] bg-[#fffdf7] ring-1 ring-[#a38029]/30'
                                          : 'border-[#e2d8c3] bg-[#faf8f4]'
                                      }`}
                                    >
                                      <div>
                                        <div className="flex items-center justify-between font-bold">
                                          <span
                                            className={`text-[10px] px-1.5 py-0.2 rounded ${
                                              t.grade === '梅'
                                                ? 'bg-[#5b7a58] text-white'
                                                : t.grade === '竹'
                                                ? 'bg-[#8d722d] text-white'
                                                : 'bg-[#7a3b3b] text-white'
                                            }`}
                                          >
                                            {t.grade}
                                          </span>
                                          <span className="font-mono text-[#2d2419]">
                                            {formatYen(t.price)}円
                                          </span>
                                        </div>
                                        <div className="font-semibold text-[#3b3023] mt-1 text-[11px]">
                                          {t.title}
                                        </div>
                                        <p className="text-[10px] text-[#6b5e4f] mt-0.5 line-clamp-2">
                                          {t.description}
                                        </p>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => onSelectTier(item.id, t)}
                                        className={`mt-2 py-1 px-2 text-[11px] font-bold rounded transition-colors ${
                                          item.unitPrice === t.price
                                            ? 'bg-[#eadeca] text-[#5c4a25] cursor-default'
                                            : 'bg-[#3b2f21] hover:bg-[#524230] text-white'
                                        }`}
                                      >
                                        {item.unitPrice === t.price ? '適用中' : 'この単価に変更'}
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Stats & Add Task Button */}
      <div className="p-4 bg-[#f8f5ee] border-t border-[#ded3be] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#615444] print:hidden">
        <div>
          <span>
            表示中: <strong>{filteredItems.length}</strong> / 全{items.length}項目
          </span>
          <span className="mx-2">·</span>
          <span>
            有効（計算対象）:{' '}
            <strong className="text-[#2b2216]">
              {items.filter((i) => i.checked).length}
            </strong>
            項目
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            const newItem: WeddingItem = {
              id: `custom-${Date.now()}`,
              checked: true,
              timing: '事前',
              name: '新郎新婦オリジナル手配項目',
              description: '追加の演出、持込品、ウェルカムスペース装飾等。',
              unitPrice: 30000,
              quantity: 1,
              unitLabel: '式',
              subtotal: 30000,
              qtyType: 'fixed',
              visualInfo: {
                buttonLabel: '[📸 オリジナル手配の確認]',
                modalTitle: '追加手配項目の詳細・お打ち合わせ',
                categoryTitle: '特注演出・持込手配',
                type: 'sample_showcase',
                overview: 'おふたりのこだわり演出（ウェルカムボード、プチギフト持込、生演奏など）のお見積りです。',
                tiers: [
                  {
                    grade: '梅',
                    title: 'シンプルプラン',
                    price: 15000,
                    subtitle: '基本持込・セッティング料',
                    description: '会場側の基本セッティングサポート付き。',
                    highlights: ['持ち込み保管対応', '当日セッティング補助'],
                  },
                  {
                    grade: '竹',
                    title: '標準プロデュースプラン',
                    price: 30000,
                    subtitle: '演出ディレクション＋専任アテンド',
                    description: '音響照明との連動リハーサルを含む標準演出。',
                    highlights: ['音響照明連携', '専用スペース確保'],
                  },
                  {
                    grade: '松',
                    title: '特注ラグジュアリープラン',
                    price: 60000,
                    subtitle: '特注デザイン＋特別演出オペレーター',
                    description: 'プロのアーティストや特注装飾による特別演出。',
                    highlights: ['特注オーダーメイド', '専任オペレーター配置'],
                  },
                ],
              },
            };
            onAddItem(newItem);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#ede5d5] text-[#423524] border border-[#cfc3ad] font-semibold rounded-md shadow-2xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#8d722d]" />
          手配項目を行追加する
        </button>
      </div>
    </div>
  );
};
