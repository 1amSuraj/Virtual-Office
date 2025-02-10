// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axiosInstance from '@/utils/axiosinstance';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/auth/login');
//       return;
//     }

//     // Verify token with backend
//     const verifyToken = async () => {
//       try {
//         const response = await axiosInstance.get('/api/user/verify', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.status !== 200) {
//           throw new Error('Invalid token');
//         }

//         setLoading(false);
//       } catch (err) {
//         localStorage.removeItem('token');
//         router.push('/auth/login');
//       }
//     };

//     verifyToken();
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//         {/* Add your dashboard content here */}
//       </div>
//     </div>
//   );
// }



'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosinstance';

const departments = [
  { department: 'hr', name: 'Human Resources' },
  { department: 'engineering', name: 'Engineering' },
  { department: 'marketing', name: 'Marketing' },
  { department: 'sales', name: 'Sales' },
  { department: 'finance', name: 'Finance' },
  { department: 'intern', name: 'Intern' }
];

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Verify token with backend
    const verifyToken = async () => {
      try {
        const response = await axiosInstance.get('/api/user/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status !== 200) {
          throw new Error('Invalid token');
        }

        setLoading(false);
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    };

    verifyToken();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleDepartmentClick = (department: string) => {
    router.push(`/dashboard/${department}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Departments</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
      </div>
      
      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map(dept => (
          <div key={dept.department} onClick={() => handleDepartmentClick(dept.department)}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-purple-700 hover:text-white transition">
            <h2 className="text-xl font-semibold">{dept.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}