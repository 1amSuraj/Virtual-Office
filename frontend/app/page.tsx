import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="p-5 flex justify-between items-center bg-purple-700 text-white">
        <h1 className="text-2xl font-bold">WorkVerse</h1>
        <div>
          <Link href="/auth/login">
            <button className="mr-4 px-4 py-2 bg-white text-purple-700 rounded-lg">Login</button>
          </Link>
          <Link href="/auth/signup"> 
          <button className="px-4 py-2 bg-purple-900 rounded-lg">Sign Up</button>
          </Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="text-center py-20 px-5">
        <h2 className="text-4xl font-bold">Revolutionizing Remote Work</h2>
        <p className="mt-4 text-lg">A virtual office space to collaborate, manage tasks, and enhance productivity.</p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-purple-700 text-white rounded-lg">Get Started</button>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-10 px-5">
        <h3 className="text-center text-3xl font-semibold mb-6">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">Virtual Rooms</h4>
            <p className="text-sm mt-2">Join dedicated spaces for teams and departments.</p>
          </div>
          <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">Task Management</h4>
            <p className="text-sm mt-2">Assign, track, and manage work efficiently.</p>
          </div>
          <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">Screen Monitoring</h4>
            <p className="text-sm mt-2">Real-time oversight for productivity.</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-5 text-center bg-purple-700 text-white mt-10">
        <p>&copy; 2025 WorkVerse. All Rights Reserved.</p>
      </footer>
    </div>
  );
}