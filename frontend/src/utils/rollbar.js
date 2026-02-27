const rollbarConfig = {
    accessToken: import.meta.env.VITE_API_TOKEN,
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true
  };
  export default rollbarConfig