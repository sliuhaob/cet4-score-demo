import type { NextConfig } from 'next';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isPagesBuild =
  process.env.GITHUB_ACTIONS === 'true' ||
  process.env.npm_lifecycle_event === 'build:pages';
const isProjectPages =
  isPagesBuild &&
  repositoryName &&
  !repositoryName.endsWith('.github.io');

const basePath = isProjectPages ? `/${repositoryName}` : '';

const nextConfig: NextConfig = {
  ...(isPagesBuild
    ? {
        output: 'export' as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
