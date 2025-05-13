

// import { useState, ChangeEvent, FormEvent } from 'react';

// interface FormData {
//   name: string;
//   email: string;
//   date: string;
//   time: string;
// }

// const ScheduleMeeting: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     date: '',
//     time: '',
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     alert(`Meeting scheduled with: ${formData.name} on ${formData.date} at ${formData.time}`);
//   };

//   return (
//     <section className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-16 px-6">
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
//         <div className="flex-1">
//           <h2 className="text-4xl font-bold mb-4">Schedule a Meet</h2>
//           <p className="text-lg mb-6 text-gray-300">
//             Let our AI-powered assistant help you plan a perfect time to connect with our experts.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white"
//               onChange={handleChange}
//               required
//             />
//             <div className="flex gap-4">
//               <input
//                 type="date"
//                 name="date"
//                 className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white"
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="time"
//                 name="time"
//                 className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
//             >
//               Book with AI Agent
//             </button>
//           </form>
//         </div>

//         <div className="flex-1 flex justify-center">
//           <img
//             src="/images/4-small[1].png"
//             alt="AI Assistant"
//             className="max-w-sm rounded-2xl shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ScheduleMeeting;













import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
}

const ScheduleMeeting: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Meeting scheduled with: ${formData.name} on ${formData.date} at ${formData.time}`);
  };

  return (
    <section className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Schedule a Meet</h2>
          <p className="text-lg mb-6 text-gray-300">
            Let our AI-powered assistant help you plan a perfect time to connect with our experts.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white"
              onChange={handleChange}
              required
            />
            <div className="flex gap-4">
              <input
                type="date"
                name="date"
                className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white"
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="time"
                className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Book with AI Agent
            </button>
          </form>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/images/4-small[1].png"
            alt="AI Assistant"
            width={384}
            height={384}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ScheduleMeeting;