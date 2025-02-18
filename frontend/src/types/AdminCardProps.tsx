export interface AdminCardProps {
  selectedTab: string;
  items: any[];
  loading: boolean;
  error: Error | null;
  addItem: (data: any) => void;
  editItem: (id: string, data: any) => void;
  removeItem: (id: string) => void;
}
