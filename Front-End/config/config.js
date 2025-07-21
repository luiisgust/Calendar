// Arquivo de configuração ou inicialização, como config.js
const getBackendURL = () => {
    const host = window.location.hostname; // Captura o hostname atual

    // Verifica os IPs permitidos e define a URL base do backend
    if (host === '192.168.0.162') {
        return 'http://192.168.0.162:3000'; // URL do backend para o primeiro IP
    } else if (host === '172.16.22.11') {
        return 'http://172.16.22.11:3000'; // URL do backend para o segundo IP
    } else {
        return 'http://localhost:3000'; // Fallback para desenvolvimento local
    }
};

// Exporta a URL base
export const BASE_URL = getBackendURL();
