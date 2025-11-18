export interface AssetItem {
  id: number;
  title: string;
  description: string;
  icon: 'frameworks' | 'media' | 'collaborations' | 'assessments' | 'reports';
  details?: (string | { text: string; link: string })[];
  children?: {
    title: string;
    details: string[];
  }[];
}