export interface IHistory {
  id: number;
  createdAt: Date;
  userAgent: string;
  query: Record<string, string>;
}
