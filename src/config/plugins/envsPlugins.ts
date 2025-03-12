import 'dotenv/config'
import * as env from 'env-var'

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_EMIAL: env.get('MAILER_EMIAL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    PRODUCTION: env.get('PROD').required().asBool(),
}