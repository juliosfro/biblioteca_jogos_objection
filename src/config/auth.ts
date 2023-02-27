const {
    JWT_AUTH_TOKEN_EXPIRES,
    JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY,
} = process.env;

const authConfig = {
    expires: JWT_AUTH_TOKEN_EXPIRES!,
    privateKey: Buffer.from(JWT_PRIVATE_KEY!, 'base64').toString('utf-8'),
    publicKey: Buffer.from(JWT_PUBLIC_KEY!, 'base64').toString('utf-8'),
};

export default authConfig;