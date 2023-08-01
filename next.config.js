/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pose',
        destination: 'http://localhost:5000/',
      },
      {
        source: '/api/pose/predict',
        destination: 'http://localhost:5000/predict',
      },
    ]
  },
}

module.exports = nextConfig
