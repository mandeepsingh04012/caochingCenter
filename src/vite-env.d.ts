/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_PHONE_NUMBER?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_EMAIL?: string;
  readonly VITE_ENQUIRY_ENDPOINT?: string;
  readonly VITE_MAP_EMBED_URL?: string;
  readonly VITE_MAP_PLACE_URL?: string;
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly VITE_GOOGLE_REVIEW_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
