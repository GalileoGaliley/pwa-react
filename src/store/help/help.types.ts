export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type MessageList = Message[];

export interface FetchMessageRequest {
  message: string;
  historyId?: string;
}

export interface HelpState {
  messages: MessageList;
  historyId?: number;
  loading: boolean;
}

export interface FetchMessageResponse {
  data: {
    id: number,
    messages: MessageList
  }
}
