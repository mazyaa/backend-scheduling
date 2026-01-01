import { PORT, NODE_ENV } from '../utils/env';

interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: PORT,
    nodeEnv: NODE_ENV,
};

export default config;