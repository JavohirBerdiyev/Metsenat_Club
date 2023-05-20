export interface Sponsor {
  id: number;
  title: string;
  readOnly: true;
  full_name: string;
  phone: string;
  sum: number;
  payment_type: string[];
  firm?: string;
  spent?: number;
  created_at: string;
  get_status_display: string;
  comment: string;
}
