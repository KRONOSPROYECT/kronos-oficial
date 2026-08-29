-- Tabla de auditoría (el Guardián)
CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  event TEXT NOT NULL,
  metadata JSONB,
  hash TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);