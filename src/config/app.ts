const {
    APP_NAME,
    APP_CONTACT_EMAIL,
    APP_LOGO_URL,
    PAINEL_URL,
    API_STAGE_URL,
    NODE_ENV,
    PORT,
    WEBSITE_URL,
} = process.env;

const appConfig = {
    env: NODE_ENV,
    port: PORT,

    pagination: {
        limit: 1000,
    },

    apiStageUrl: API_STAGE_URL!,

    defaultLanguage: 'pt',
    logFormat: NODE_ENV === 'production' ? 'combined' : 'dev',
    websiteUrl: WEBSITE_URL,
    painelUrl: PAINEL_URL,
    appName: APP_NAME!,
    appContactEmail: APP_CONTACT_EMAIL,
    appLogoUrl: APP_LOGO_URL,
};

export default appConfig;
