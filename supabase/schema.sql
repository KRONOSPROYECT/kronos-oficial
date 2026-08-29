-- Tabla principal de certificados
CREATE TABLE kronos_certificados (
  id SERIAL PRIMARY KEY,
  folio TEXT UNIQUE NOT NULL,
  hash_foto TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now(),
  estado TEXT DEFAULT 'ORIGINAL VERIFICADO',
  responsable TEXT DEFAULT 'K2486',
  tenantId TEXT NOT NULL,
  evidenceType TEXT DEFAULT 'FOTO'
);

-- Tabla de licencias (para bloquear morosos)
CREATE TABLE licenses (
  id SERIAL PRIMARY KEY,
  tenantId TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  expiryDate TIMESTAMPTZ NOT NULL,
  maxFolios INT DEFAULT 1000,
  usedFolios INT DEFAULT 0
);