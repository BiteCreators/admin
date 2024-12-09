import { CodegenConfig } from '@graphql-codegen/cli'
import confDotenv from 'dotenv'

confDotenv.config({ path: './.env.local' })
const config: CodegenConfig = {
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/common/__generated-types__/': {
      plugins: [],
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
}

export default config
