export type GradeType = '梅' | '竹' | '松' | 'standard';

export interface VisualTier {
  grade: '梅' | '竹' | '松';
  title: string;
  price: number;
  subtitle: string;
  description: string;
  highlights: string[];
  badgeColor?: string;
}

export interface SizeSpec {
  name: string;
  dimensions: string;
  ratioComparison: string;
  popularUse: string;
  isRecommended?: boolean;
}

export interface VisualInfo {
  buttonLabel: string;
  modalTitle: string;
  categoryTitle: string;
  type: 'tier_comparison' | 'size_comparison' | 'style_comparison' | 'sample_showcase';
  overview: string;
  heroImage?: string;
  tiers?: VisualTier[];
  sizeSpecs?: SizeSpec[];
  featurePoints?: string[];
  expertAdvice?: string;
}

export interface WeddingItem {
  id: string;
  checked: boolean;
  timing: string; // e.g. "挙式前", "当日", "事前・当日", "事前"
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  unitLabel: string; // e.g. "個", "卓", "名", "着", "冊", "式"
  subtotal: number;
  isAutoCalculatedQty?: boolean; // syncs with guest count or table count
  qtyType?: 'guest' | 'table' | 'fixed';
  visualInfo: VisualInfo;
  currentTier?: '梅' | '竹' | '松';
}

export interface EstimateSummary {
  guestCount: number;
  tableCount: number;
  totalAmount: number;
  depositAmount: number;
  balanceAmount: number;
  perGuestAmount: number;
  estimatedGifts: number;
  netCoupleBurden: number;
}
