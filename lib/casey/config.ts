const baseUrl = (process.env.NEXT_PUBLIC_CASEY_API_URL ?? 'https://ai-response-ten.vercel.app').replace(/\/+$/, '');

export const caseyWidgetConfig = {
  chatUrl: `${baseUrl}/casey/chat`,
  formUrl: `${baseUrl}/casey/form`,
  apiKey: process.env.NEXT_PUBLIC_CASEY_API_KEY ?? undefined,
};
