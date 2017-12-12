const config = {
    ...window.__config
};

config.api.resolveEndpoint = (type) => {
    return config.api.endpoint[type];
}

export default config;