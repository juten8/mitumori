import React from 'react';
import { X, FileSpreadsheet, Check } from 'lucide-react';

interface OriginalSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalSheetModal: React.FC<OriginalSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f4] w-full max-w-5xl rounded-xl shadow-2xl border border-[#ded5c2] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#102a45] text-white px-5 py-4 flex items-center justify-between border-b border-[#213f63] shrink-0">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-[#f7f3ec]">
                原本シート：婚礼工程＆お見積り（20工程・完全準拠）
              </h2>
              <span className="text-xs text-[#a3b8cc]">
                ご提示いただいたマスター原本の進行段取りと計算仕様
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#a3b8cc] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="bg-[#eef4fa] border border-[#cbd9e8] rounded-lg p-3 text-xs text-[#1e3c5d] flex items-center gap-2">
            <Check className="w-4 h-4 text-[#2b6cb0] shrink-0" />
            <span>
              本システムは、以下の原本シート（工程1〜20、単価、数量、総額1,691,800円、予約金控除100,000円、最終ご請求残金1,591,800円、平均単価42,295円）を1円単位で完全再現しています。
            </span>
          </div>

          {/* Screenshot 1 */}
          <div className="border border-[#d2c7b5] rounded-lg overflow-hidden shadow-xs bg-white">
            <div className="p-2.5 bg-[#f5efe4] border-b border-[#dcd1bf] text-xs font-bold text-[#473928]">
              【工程1〜13】仮予約〜衣裳〜司会〜招待状〜料理〜装花〜撮影
            </div>
            <img
              src="/assets/aistudio/image_c81f0b08.png"
              alt="原本シート 前半（工程1〜13）"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Screenshot 2 */}
          <div className="border border-[#d2c7b5] rounded-lg overflow-hidden shadow-xs bg-white">
            <div className="p-2.5 bg-[#f5efe4] border-b border-[#dcd1bf] text-xs font-bold text-[#473928]">
              【工程14〜20および最終ご請求サマリー】音響〜引出物〜リハーサル〜最終確認〜サマリー計算
            </div>
            <img
              src="/assets/aistudio/image_c8d1ef60.png"
              alt="原本シート 後半（工程14〜20および計算サマリー）"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f5efe2] px-5 py-3 border-t border-[#dfd4c0] flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#102a45] hover:bg-[#1a3d63] rounded-md transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
