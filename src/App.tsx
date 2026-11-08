/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { initialWeddingItems } from './data/initialWeddingData';
import { WeddingItem, EstimateSummary, VisualTier } from './types/wedding';
import { HeaderBanner } from './components/HeaderBanner';
import { SummaryStats } from './components/SummaryStats';
import { EstimateTable } from './components/EstimateTable';
import { BottomSummarySection } from './components/BottomSummarySection';
import { VisualNavModal } from './components/VisualNavModal';
import { TermsModal } from './components/TermsModal';
import { OriginalSheetModal } from './components/OriginalSheetModal';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [items, setItems] = useState<WeddingItem[]>(initialWeddingItems);
  // Default to 40 guests and 100,000 yen deposit to match the master sheet screenshots exactly
  const [guestCount, setGuestCount] = useState<number>(40);
  const [depositAmount, setDepositAmount] = useState<number>(100000);
  const [currentPreset, setCurrentPreset] = useState<'梅' | '竹' | '松' | 'custom'>('竹');
  const [activeVisualItem, setActiveVisualItem] = useState<WeddingItem | null>(null);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [isOriginalSheetOpen, setIsOriginalSheetOpen] = useState<boolean>(false);

  // Table count derived from guest count (approx 8 guests per table)
  const tableCount = useMemo(() => {
    return Math.max(1, Math.ceil(guestCount / 8));
  }, [guestCount]);

  // Synchronize item quantities when guest count or table count changes
  const handleGuestCountChange = (count: number) => {
    const validCount = Math.max(1, count);
    const newTableCount = Math.max(1, Math.ceil(validCount / 8));
    setGuestCount(validCount);

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.qtyType === 'guest') {
          return {
            ...item,
            quantity: validCount,
            subtotal: item.unitPrice * validCount,
          };
        } else if (item.qtyType === 'table') {
          return {
            ...item,
            quantity: newTableCount,
            subtotal: item.unitPrice * newTableCount,
          };
        }
        return item;
      })
    );
  };

  // Toggle item in/out of calculation
  const handleToggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Update item unit price
  const handleUpdateUnitPrice = (id: string, price: number) => {
    setCurrentPreset('custom');
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            unitPrice: price,
            subtotal: price * item.quantity,
          };
        }
        return item;
      })
    );
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: qty,
            subtotal: item.unitPrice * qty,
          };
        }
        return item;
      })
    );
  };

  // Select tier for an individual item from modal or accordion
  const handleSelectTier = (itemId: string, tier: VisualTier) => {
    setCurrentPreset('custom');
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            unitPrice: tier.price,
            currentTier: tier.grade,
            subtotal: tier.price * item.quantity,
          };
        }
        return item;
      })
    );

    // Also update active visual item in modal if open
    if (activeVisualItem && activeVisualItem.id === itemId) {
      setActiveVisualItem((prev) =>
        prev
          ? {
              ...prev,
              unitPrice: tier.price,
              currentTier: tier.grade,
            }
          : null
      );
    }
  };

  // Apply Matsu / Take / Ume bulk preset across all items
  const handleApplyPreset = (grade: '梅' | '竹' | '松') => {
    setCurrentPreset(grade);
    setItems((prev) =>
      prev.map((item) => {
        if (item.visualInfo.tiers && item.visualInfo.tiers.length > 0) {
          const matchTier = item.visualInfo.tiers.find((t) => t.grade === grade);
          if (matchTier) {
            return {
              ...item,
              unitPrice: matchTier.price,
              currentTier: grade,
              subtotal: matchTier.price * item.quantity,
            };
          }
        }
        return item;
      })
    );
  };

  // Add custom row
  const handleAddItem = (newItem: WeddingItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  // Delete row
  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset to initial defaults
  const handleReset = () => {
    setItems(initialWeddingItems);
    setGuestCount(40);
    setDepositAmount(100000);
    setCurrentPreset('竹');
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Summary Metrics calculation
  const summary: EstimateSummary = useMemo(() => {
    const totalAmount = items.reduce((sum, item) => {
      return item.checked ? sum + item.unitPrice * item.quantity : sum;
    }, 0);

    const balanceAmount = Math.max(0, totalAmount - depositAmount);
    const perGuestAmount = guestCount > 0 ? Math.round(totalAmount / guestCount) : 0;
    // Standard estimated gifts in Japan: approx 33,000 yen per guest
    const estimatedGifts = guestCount * 33000;
    // Net out-of-pocket couple burden after expected gifts and deposit
    const netCoupleBurden = Math.max(0, totalAmount - estimatedGifts - depositAmount);

    return {
      guestCount,
      tableCount,
      totalAmount,
      depositAmount,
      balanceAmount,
      perGuestAmount,
      estimatedGifts,
      netCoupleBurden,
    };
  }, [items, guestCount, tableCount, depositAmount]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-[#2c251d]">
      {/* 1. 最上段タイトルエリア & ツールバー */}
      <HeaderBanner
        currentPreset={currentPreset}
        onApplyPreset={handleApplyPreset}
        onReset={handleReset}
        onPrint={handlePrint}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenOriginalSheet={() => setIsOriginalSheetOpen(true)}
      />

      {/* 2. 集計サマリー・計算表示エリア（ヘッダー直下 クイックサマリー） */}
      <SummaryStats
        summary={summary}
        onGuestCountChange={handleGuestCountChange}
        onDepositChange={setDepositAmount}
      />

      {/* 3. 明細・チェックシートテーブル（本体 厳密7列構成） */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EstimateTable
          items={items}
          onToggleItem={handleToggleItem}
          onUpdateUnitPrice={handleUpdateUnitPrice}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenVisualModal={(item) => setActiveVisualItem(item)}
          onSelectTier={handleSelectTier}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
        />

        {/* 原本シート通りの下部最終ご請求サマリー表示 */}
        <BottomSummarySection
          summary={summary}
          onDepositChange={setDepositAmount}
        />
      </main>

      {/* 4. 最下部フッター（利用規約・著作権・免責事項 厳密原文） */}
      <FooterSection onOpenTerms={() => setIsTermsOpen(true)} />

      {/* 第7列 視覚イメージ・詳細リンク モーダル */}
      <VisualNavModal
        item={activeVisualItem}
        onClose={() => setActiveVisualItem(null)}
        onSelectTier={handleSelectTier}
      />

      {/* 規定・利用規約・監修詳細 モーダル */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* 原本シート（スクリーンショット）確認モーダル */}
      <OriginalSheetModal
        isOpen={isOriginalSheetOpen}
        onClose={() => setIsOriginalSheetOpen(false)}
      />
    </div>
  );
}
