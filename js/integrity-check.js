/**
 * ============================================================
 * KRONOS 360 - Integridad del Sistema
 * Verifica que los archivos críticos no hayan sido modificados
 * ============================================================
 */

import { KRONOS_CONFIG } from './config.js';

// Hashes esperados de archivos críticos (generados en build)
const EXPECTED_HASHES = {
    'index.html': 'sha256-...',  // Se genera en el build
    'verify.html': 'sha256-...',
    'dashboard.html': 'sha256-...',
    'js/quantum-seal.js': 'sha256-...',
    'js/offline-vault.js': 'sha256-...',
    'js/forensic.js': 'sha256-...',
    'js/main.js': 'sha256-...'
};

/**
 * Genera hash SHA-256 de un texto
 */
export async function sha256Text(text) {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Genera hash SHA-256 de un archivo
 */
export async function sha256File(file) {
    const arrayBuffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', arrayBuffer);
    return Array.from(new Uint8Array(digest))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Verifica la integridad de un archivo contra un hash esperado
 */
export async function verifyFileIntegrity(file, expectedHash) {
    try {
        const actualHash = await sha256File(file);
        return {
            file: file.name,
            valid: actualHash === expectedHash,
            expected: expectedHash,
            actual: actualHash
        };
    } catch (error) {
        return {
            file: file.name,
            valid: false,
            error: error.message
        };
    }
}

/**
 * Verifica todos los archivos críticos
 */
export async function verifyAllIntegrity() {
    const results = [];
    const files = [
        '/index.html',
        '/verify.html',
        '/dashboard.html',
        '/js/quantum-seal.js',
        '/js/offline-vault.js',
        '/js/forensic.js',
        '/js/main.js'
    ];

    for (const filePath of files) {
        try {
            const response = await fetch(filePath);
            const text = await response.text();
            const hash = await sha256Text(text);
            const expected = EXPECTED_HASHES[filePath] || null;
            
            results.push({
                file: filePath,
                hash: hash,
                expected: expected,
                match: expected ? hash === expected : null
            });
        } catch (error) {
            results.push({
                file: filePath,
                error: error.message,
                match: false
            });
        }
    }

    return {
        timestamp: new Date().toISOString(),
        results: results,
        allValid: results.every(r => r.match !== false)
    };
}

/**
 * Verifica que el sistema esté corriendo sobre HTTPS
 */
export function isSecureContext() {
    return window.isSecureContext || location.protocol === 'https:';
}

/**
 * Verifica que el sistema esté en el entorno esperado
 */
export function verifyEnvironment() {
    const expected = KRONOS_CONFIG.environment;
    const actual = localStorage.getItem('kronos_environment') || expected;
    return {
        expected: expected,
        actual: actual,
        match: expected === actual
    };
}

/**
 * Reporte completo de integridad
 */
export async function integrityReport() {
    const integrity = await verifyAllIntegrity();
    const security = isSecureContext();
    const environment = verifyEnvironment();

    return {
        timestamp: new Date().toISOString(),
        version: KRONOS_CONFIG.version,
        genesisHash: KRONOS_CONFIG.genesisHash,
        integrity: integrity,
        security: {
            https: security,
            csp: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]')
        },
        environment: environment,
        results: {
            allValid: integrity.allValid && security && environment.match
        }
    };
}

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sha256Text,
        sha256File,
        verifyFileIntegrity,
        verifyAllIntegrity,
        isSecureContext,
        verifyEnvironment,
        integrityReport
    };
}