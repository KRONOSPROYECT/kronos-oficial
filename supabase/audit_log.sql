-- Tabla de auditoría para el Guardian
CREATE TABLE IF NOT EXISTS audit_log (
  id SERIAL PRIMARY KEY,
  event TEXT NOT NULL,
  metadata JSONB,
  hash TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Tabla de licencias para administrar morosos
CREATE TABLE IF NOT EXISTS licenses (
  id SERIAL PRIMARY KEY,
  tenantId TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  expiryDate TIMESTAMPTZ NOT NULL,
  maxFolios INT DEFAULT 1000,
  usedFolios INT DEFAULT 0
);

-- Tabla de certificados
CREATE TABLE IF NOT EXISTS kronos_certificados (
  id SERIAL PRIMARY KEY,
  folio TEXT UNIQUE NOT NULL,
  hash_foto TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now(),
  estado TEXT DEFAULT 'ORIGINAL VERIFICADO',
  responsable TEXT DEFAULT 'K2486',
  tenantId TEXT NOT NULL,
  evidenceType TEXT DEFAULT 'FOTO'
);