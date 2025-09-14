export default () => ({
  env: {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
    licenseApiUrl: process.env.LICENSE_API_URL || 'http://localhost:32001',
  },
});
