import path from 'path';
import { ResolveOptions } from 'vite';

export default {
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    path: 'path-browserify',
    crypto: 'crypto-browserify',
    stream: 'stream-browserify',
  },
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
} as ResolveOptions;
