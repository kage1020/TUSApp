/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pose',
        destination: 'http://localhost:8080',
      },
    ]
  },
}

module.exports = nextConfig
