import React from 'react';
import { X, Shield, FileText, CheckCircle, Scale, AlertTriangle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f4] w-full max-w-2xl rounded-xl shadow-2xl border border-[#ded5c2] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2c241a] text-white px-5 py-4 flex items-center justify-between border-b border-[#473b2d] shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-base sm:text-lg font-bold font-serif text-[#f7f3ec]">
              利用許諾・著作権・免責事項および監修規定
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#baa995] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-[#45392d] leading-relaxed">
          {/* 法的指定文面（完全原文） */}
          <div className="bg-[#fffdf8] border-2 border-[#d9be75] rounded-lg p-4 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-sm text-[#735817] mb-2 font-serif">
              <Scale className="w-4 h-4 text-[#a68224]" />
              【利用許諾・著作権・免責事項】規定条項
            </div>
            <div className="bg-white p-3.5 rounded border border-[#e8dcb8] font-mono text-xs sm:text-sm text-[#2b2216] leading-relaxed select-all">
              <p className="mb-2">
                本ソフトウェアの複製、使用、コピー、転送、その他すべての利用は、事前に許可された特定の人以外は一切禁止されています。すべての権利は著作者である Shigenori Watanabeに帰属します。本ソフトウェアの使用に起因するいかなる損害に対しても、著作者は一切の責任を関しません。
              </p>
              <p className="font-semibold text-[#66501a] mt-3">
                Y2Cサポート協同組合<br />
                Copyright (c) 2026 Shigenori Watanabe. All rights reserved. 日付：2026年10月25日
              </p>
            </div>
          </div>

          {/* 監修・プロデュース組織について */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-[#2e2418] font-serif flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#8a6f2b]" />
              本ツールの監修・開発体制
            </h3>
            <ul className="space-y-2 bg-white p-3.5 rounded-lg border border-[#e0d6c2]">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#5b7a58] shrink-0 mt-0.5" />
                <div>
                  <strong>主催</strong>：着付けナビウエディングプランナー養成
                  <p className="text-[#6e604f] mt-0.5">
                    プロの婚礼着付け師・ブライダルプランナーの育成ノウハウを凝縮した総合進行シート。
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#5b7a58] shrink-0 mt-0.5" />
                <div>
                  <strong>監修</strong>：★ 一流ホテル監修 ★
                  <p className="text-[#6e604f] mt-0.5">
                    格式あるホテルウエディングの厳格な進行基準と高品質な手配規格（松竹梅基準）に完全準拠。
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#5b7a58] shrink-0 mt-0.5" />
                <div>
                  <strong>著作権者</strong>：Shigenori Watanabe（渡辺 繁徳）
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#5b7a58] shrink-0 mt-0.5" />
                <div>
                  <strong>システム開発・サポート</strong>：Y2Cサポート協同組合
                </div>
              </li>
            </ul>
          </div>

          {/* お見積りの注意事項 */}
          <div className="bg-[#fbf7ee] p-3.5 rounded-lg border border-[#e6dbc8]">
            <h4 className="font-bold text-[#5c4a1e] mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-[#a88225]" />
              新郎新婦様へのご案内とご祝儀相殺に関する注記
            </h4>
            <p className="text-[#5e513f] leading-relaxed">
              ※ 会費またはお祝い、ご祝儀等により、総費用の8割ぐらいは、この費用が軽減されます（目安）。
              実際の婚礼費用は、ご参列者様からのご祝儀（一般的にご友人3万円、ご親族5〜10万円）によって大部分が相殺され、実質のご負担額は記載の総額よりも大幅に少なくなります。会場プランナーとのお打合せ時に自己負担シミュレーションをあわせてご活用ください。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f5efe2] px-5 py-3 border-t border-[#dfd4c0] flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#3b2f21] hover:bg-[#524230] rounded-md transition-colors"
          >
            同意して閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
