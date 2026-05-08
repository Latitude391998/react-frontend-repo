export default function HomePage() {
  return (
    <div className='min-h-screen text-white relative overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-blue-900'>
        <div className='absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,150,0.4),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,200,255,0.4),transparent_40%)]' />
      </div>

      {/* Content */}
      <div className='relative z-10 p-6'>
        <div className='max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl'>
          <div>
            <h2 className='text-2xl font-bold mb-4'>🔥 Trending Now</h2>
            <ul className='space-y-3'>
              <li className='bg-white/10 p-3 rounded'>🚀 React 19 Updates</li>
              <li className='bg-white/10 p-3 rounded'>⚡ Tailwind CSS Tricks</li>
              <li className='bg-white/10 p-3 rounded'>🔥 Node.js Performance Tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
