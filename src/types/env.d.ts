interface ImportMetaEnv {
  readonly VITE_BASE: string;
  readonly VITE_SEARCH_API: string;
  readonly VITE_SEARCH_APIKEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
