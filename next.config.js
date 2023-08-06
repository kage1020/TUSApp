/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pose',
        destination: 'http://127.0.0.1:8080',
      },
      {
        source: '/api/pose/predict',
        destination: 'http://127.0.0.1:8080/predict',
      },
    ]
  },
}

module.exports = nextConfig
