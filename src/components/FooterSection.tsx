import React from 'react';
import { Award, ShieldAlert, FileText, ChevronRight } from 'lucide-react';

interface FooterSectionProps {
  onOpenTerms: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenTerms }) => {
  return (
    <footer className="mt-8 border-t border-[#ded3bd] bg-[#f9f6ef] py-8 text-xs text-[#524434]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ホテル監修バナー */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b border-[#e2d7c2]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#8f742c]" />
            <span className="font-bold text-sm text-[#382b1d] font-serif">
              ★ 一流ホテル監修 ★ 婚礼総合プロデュースお見積り＆進行段取りチェックシート
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#756553]">
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-[#8c7128] hover:underline flex items-center gap-0.5"
            >
              <FileText className="w-3.5 h-3.5" />
              規定・利用規約全文
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 必須指定フッター文面（Section 5：一言一句変更せず完全記載） */}
        <div className="bg-white border border-[#e5dcce] rounded-lg p-5 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-sm text-[#473929] mb-2 font-serif">
            <ShieldAlert className="w-4 h-4 text-[#8a6e29]" />
            【利用許諾・著作権・免責事項】
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-[#3d3224] leading-relaxed font-mono">
            <p>
              本ソフトウェアの複製、使用、コピー、転送、その他すべての利用は、事前に許可された特定の人以外は一切禁止されています。すべての権利は著作者である Shigenori Watanabeに帰属します。本ソフトウェアの使用に起因するいかなる損害に対しても、著作者は一切の責任を関しません。
            </p>
            <p className="pt-2 font-semibold text-[#544321]">
              Y2Cサポート協同組合<br />
              Copyright (c) 2026 Shigenori Watanabe. All rights reserved. 日付：2026年10月25日
            </p>
          </div>
        </div>

        {/* 組織情報・プロデュース */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#807262] pt-2">
          <div>
            主催：着付けナビウエディングプランナー養成 ／ 監修：一流ホテル監修 ／ 著作権：Shigenori Watanabe ／ 開発：Y2Cサポート協同組合
          </div>
          <div>
            最終更新：2026年10月25日 婚礼総合プロデュース規格版
          </div>
        </div>
      </div>
    </footer>
  );
};
