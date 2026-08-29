export interface MIS {
  id: string;
  symbol: string;
  hash: string;
}

export interface MAS {
  id: string;
  signature: string;
  publicKey: string;
}

export interface MRA {
  id: string;
  assetType: string;
  folio: string;
}

export interface MTI {
  id: string;
  timestamp: string;
  hashChain: string[];
}

export interface MAR {
  id: string;
  auditHash: string;
  evidence: string;
}