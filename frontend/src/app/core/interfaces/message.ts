export interface Message {
  title: string;
  message: string;
  type?: 'success' | 'error';
  time?: number;
}
