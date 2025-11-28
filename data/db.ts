
export interface Asset {
  id: string;
  url: string;
  alt: string;
  type: 'image' | 'document';
}

export interface Partner {
  id: string;
  name: string;
  assetId: string; // Foreign Key para Assets
  website?: string;
}

// ==========================================
// TABELA DE ARQUIVOS (ASSETS STORAGE)
// ==========================================
export const ASSETS_DB: Record<string, Asset> = {
  // --- Logos dos Parceiros ---
  'logo-prefeitura': {
    id: 'logo-prefeitura',
    url: 'https://drive.google.com/thumbnail?id=1pXDUakXD05i5pOd-1Ie_KMood1ciQ7A2',
    alt: 'Prefeitura de Olinda',
    type: 'image'
  },
  'logo-sebrae': {
    id: 'logo-sebrae',
    url: 'https://drive.google.com/thumbnail?id=1jaxekQsRAr-4pKsYqanyeboHKe_ia9jP',
    alt: 'SEBRAE',
    type: 'image'
  },
  'logo-occa': {
    id: 'logo-occa',
    url: 'https://drive.google.com/thumbnail?id=15krP64PG-fXxsjWFiE9nyRAS1AFETwUI&sz=w1000',
    alt: 'OCCA',
    type: 'image'
  },
  'logo-ifpe': {
    id: 'logo-ifpe',
    url: 'https://drive.google.com/thumbnail?id=1ojPaEePzjbU4tEqTKV0HIe-ga31Z3GuB', 
    alt: 'IFPE',
    type: 'image'
  },
  'logo-massa': {
    id: 'logo-massa',
    url: 'https://drive.google.com/thumbnail?id=1LYireo9hvFrkJbSZkbPlozXPsWeyn1Zq',
    alt: 'Massa Hub',
    type: 'image'
  },
  'logo-hactus': {
    id: 'logo-hactus',
    url: 'https://drive.google.com/thumbnail?id=1DXdW03V2-vscJiN4Z9Si_V6irsoqxprc',
    alt: 'Hactus',
    type: 'image'
  },
  'logo-uninassau': {
    id: 'logo-uninassau',
    url: 'https://drive.google.com/thumbnail?id=1vT70v_jiixwWmNCwSzJAi9whneug4vt4',
    alt: 'Uninassau',
    type: 'image'
  },
  'logo-uninovo': {
    id: 'logo-uninovo',
    url: 'https://drive.google.com/thumbnail?id=1KPX8kN6_dU-PsjcR6Uozd5iqZUTQi84s',
    alt: 'Uninovo',
    type: 'image'
  },
  'logo-olinda-aberta': {
    id: 'logo-olinda-aberta',
    url: 'https://drive.google.com/thumbnail?id=15ZwEAwtms_GLYMOsKgvQWyBYAinA6R86',
    alt: 'Olinda Aberta',
    type: 'image'
  },
  'logo-adepe': {
    id: 'logo-adepe',
    url: 'https://drive.google.com/thumbnail?id=16YVpkVZ1CfzD01IBR5KsecGC7mw_6_fg',
    alt: 'Adepe',
    type: 'image'
  },
  'logo-aesho': {
    id: 'logo-aesho',
    url: 'https://drive.google.com/thumbnail?id=1gQkBZ8MPSMl1bkqc8aZSG2EGU6k6JcmH',
    alt: 'AESHO',
    type: 'image'
  },
  'logo-casa-criatura': {
    id: 'logo-casa-criatura',
    url: 'https://drive.google.com/thumbnail?id=1paNYu4R6cu3AqyuAZS2VhlqB6IrN0zzl',
    alt: 'Casa Criatura',
    type: 'image'
  },

  // --- Documentos ---
  'doc-edital-v1': {
    id: 'doc-edital-v1',
    url: 'https://docs.google.com/document/d/1JXYpMGL9y4uBK7Ik9oI3NONTTW2MB72wLga0TLTuNRQ/edit?usp=sharing',
    alt: 'Edital Oficial em PDF',
    type: 'document'
  }
};

// ==========================================
// TABELA DE PARCEIROS (RELACIONAMENTO)
// ==========================================
export const PARTNERS_DB: Partner[] = [
  { id: '1', name: 'Prefeitura de Olinda', assetId: 'logo-prefeitura' },
  { id: '2', name: 'SEBRAE', assetId: 'logo-sebrae' },
  { id: '3', name: 'OCCA', assetId: 'logo-occa' },
  { id: '4', name: 'IFPE', assetId: 'logo-ifpe' },
  { id: '5', name: 'Massa Hub', assetId: 'logo-massa' },
  { id: '6', name: 'Hactus', assetId: 'logo-hactus' },
  { id: '7', name: 'Uninassau', assetId: 'logo-uninassau' },
  { id: '8', name: 'Uninovo', assetId: 'logo-uninovo' },
  { id: '9', name: 'Olinda Aberta', assetId: 'logo-olinda-aberta' },
  { id: '10', name: 'Adepe', assetId: 'logo-adepe' },
  { id: '11', name: 'AESHO', assetId: 'logo-aesho' },
  { id: '12', name: 'Casa Criatura', assetId: 'logo-casa-criatura' },
];

// Helper para pegar URL do Asset
export const getAssetUrl = (assetId: string): string => {
  return ASSETS_DB[assetId]?.url || 'https://via.placeholder.com/150';
};