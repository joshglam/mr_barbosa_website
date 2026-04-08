import type { ChatMessage } from './types';

const STORAGE_KEY = 'casey_chat_history';

interface StoredSession {
  sessionId: string;
  messages: ChatMessage[];
}

export function saveMessages(sessionId: string, messages: ChatMessage[]): void {
  try {
    const stored: StoredSession = { sessionId, messages };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch (error) {
    console.warn('Failed to save chat history:', error);
  }
}

export function loadMessages(sessionId: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const stored: StoredSession = JSON.parse(raw);
    if (stored.sessionId === sessionId) {
      return stored.messages || [];
    }
    return [];
  } catch (error) {
    console.warn('Failed to load chat history:', error);
    return [];
  }
}

export function clearMessages(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear chat history:', error);
  }
}
