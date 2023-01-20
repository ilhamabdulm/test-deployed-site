type Order = {
  createdAt: string;
  unit: string;
  id: string;
  mode: string;
  userId: string;
  status: string;
  source?: string;
  carbonOffset: number;
  treesToOffset: number;
  costToOffset: number;
  distanceOffset: number;
};
export type TransactionDetailsProps = {
  orders?: Order[];
};
