
// // File: components/Agent.tsx

// import { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import Image from "next/image";
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface FormData {
//   name: string;
//   email: string;
//   date: string;
//   time: string;
//   timezone: string;
//   medium: string;
// }

// interface TimeOption {
//   time: string;
//   timezone: string;
//   label: string;
// }

// const timezones = [
//   { name: "Eastern Daylight Time (EDT, UTC-4)", value: "EDT", offset: -4 },
//   { name: "British Summer Time (BST, UTC+1)", value: "BST", offset: 1 },
//   { name: "Central European Summer Time (CEST, UTC+2)", value: "CEST", offset: 2 },
//   { name: "China Standard Time (CST, UTC+8)", value: "CST", offset: 8 },
//   { name: "Indian Standard Time (IST, UTC+5:30)", value: "IST", offset: 5.5 },
//   { name: "Central Africa Time (CAT, UTC+2)", value: "CAT", offset: 2 },
//   { name: "Australian Eastern Standard Time (AEST, UTC+10)", value: "AEST", offset: 10 },
//   { name: "New Zealand Standard Time (NZST, UTC+12)", value: "NZST", offset: 12 },
// ];

// const meetingMediums = [
//   { name: "Phone", value: "phone" },
//   { name: "Video Call", value: "video" },
//   { name: "Email", value: "email" },
// ];

// // Key for storing email in localStorage
// const EMAIL_STORAGE_KEY = "snipercoders_meeting_email";

// const ScheduleMeeting: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     date: "",
//     time: "",
//     timezone: "",
//     medium: "",
//   });
//   const [loading, setLoading] = useState<boolean>(false);
//   const [aiResponse, setAiResponse] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [showTimeOptions, setShowTimeOptions] = useState<boolean>(false);
//   const [showTimezones, setShowTimezones] = useState<boolean>(false);
//   const [showMediumOptions, setShowMediumOptions] = useState<boolean>(false);
//   const [timeOptions, setTimeOptions] = useState<TimeOption[]>([]);
//   const [selectedTimeOption, setSelectedTimeOption] = useState<string>("");

//   // Load saved email from localStorage
//   useEffect(() => {
//     const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
//     if (savedEmail) {
//       setFormData((prev) => ({ ...prev, email: savedEmail }));
//     }
//   }, []);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");

//     // Save email to localStorage
//     if (name === "email") {
//       localStorage.setItem(EMAIL_STORAGE_KEY, value);
//     }
//   };

//   const validateDateTime = (date: string, time: string): boolean => {
//     const dateTime = new Date(`${date}T${time}`);
//     const now = new Date();
//     return !isNaN(dateTime.getTime()) && dateTime > now;
//   };

//   const handleTimezoneSelection = async (timezone: string) => {
//     setFormData((prev) => ({ ...prev, timezone }));
//     setShowTimezones(false);
//     setLoading(true);
//     setError("");
//     setAiResponse("Fetching suitable meeting times for your selected timezone...");

//     if (!validateDateTime(formData.date, formData.time)) {
//       setError("Please select a valid future date and time.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("/api/agent/get-time-options", {
//         date: formData.date,
//         time: formData.time,
//         timezone,
//       });
//       const timeOptions = response.data.timeOptions;

//       if (!timeOptions || timeOptions.length === 0) {
//         throw new Error("No time options received");
//       }

//       setTimeOptions(timeOptions);
//       setShowTimeOptions(true);
//       setAiResponse("Please select a suitable meeting time:");
//     } catch (error) {
//       console.error("Error fetching time options:", error);
//       setError("Failed to fetch time options. Using fallback options.");

//       // Fallback time options
//       const baseTime = new Date(`${formData.date}T${time}`);
//       const timeSlots = [];
//       for (let i = -1; i <= 3; i++) {
//         const slotTime = new Date(baseTime);
//         slotTime.setHours(slotTime.getHours() + i);
//         const timeString = `${slotTime.getHours().toString().padStart(2, "0")}:00`;
//         const formattedTime = slotTime.toLocaleTimeString("en-US", {
//           hour: "numeric",
//           minute: "numeric",
//           hour12: true,
//         });
//         timeSlots.push({
//           time: timeString,
//           timezone,
//           label: `${formattedTime} (${timezone})`,
//         });
//       }
//       setTimeOptions(timeSlots);
//       setShowTimeOptions(true);
//       setAiResponse("Please select a suitable meeting time:");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     setAiResponse("Validating your input...");

//     if (!validateDateTime(formData.date, formData.time)) {
//       setError("Please select a valid future date and time.");
//       setLoading(false);
//       return;
//     }

//     setAiResponse("Please select your preferred timezone...");
//     setShowTimezones(true);
//     setLoading(false);
//   };

//   const handleTimeSelection = (selectedTime: string) => {
//     setSelectedTimeOption(selectedTime);
//     setShowTimeOptions(false);
//     setShowMediumOptions(true);
//     setAiResponse("Please select your preferred meeting medium:");
//     setError("");
//   };

//   const handleMediumSelection = (medium: string) => {
//     setFormData((prev) => ({ ...prev, medium }));
//     setShowMediumOptions(false);
//     setAiResponse("Please confirm your meeting details:");
//     setError("");
//   };

//   const handleConfirmMeeting = async () => {
//     setLoading(true);
//     setError("");
//     setAiResponse("Confirming your meeting and sending details...");

//     try {
//       await axios.post("/api/agent/confirm-meeting", {
//         name: formData.name,
//         email: formData.email,
//         date: formData.date,
//         selectedTime: `${selectedTimeOption} (${formData.timezone})`,
//         medium: formData.medium,
//       });

//       // Remove email from localStorage
//       localStorage.removeItem(EMAIL_STORAGE_KEY);

//       // Update formData to clear email
//       setFormData((prev) => ({ ...prev, email: "" }));

//       // Show toast notification
//       toast.success(
//         '🎉 Your meeting has been successfully scheduled! Check your email (including spam folder) for confirmation.',
//         {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "colored",
//         }
//       );

//       // Prepare the confirmation message
//       const confirmationMessage = `Great! Your ${formData.medium} meeting with SniperCoders is scheduled for ${formData.date} at ${selectedTimeOption} (${formData.timezone}). A confirmation email has been sent to ${formData.email}. Please make sure to check your spam or junk folder if you don't see it in your inbox within a few minutes.`;

//       // Narrate the confirmation message using Web Speech API
//       const utterance = new SpeechSynthesisUtterance(confirmationMessage);
//       utterance.lang = 'en-US';
//       utterance.volume = 1;
//       utterance.rate = 1;
//       utterance.pitch = 1.2; // Slightly higher pitch for a more "female-like" tone

//       // Get available voices and select a female voice
//       const voices = window.speechSynthesis.getVoices();
//       const femaleVoice = voices.find(voice => 
//         voice.name.toLowerCase().includes('female') || 
//         voice.name.includes('Samantha') || 
//         voice.name.includes('Zira') || 
//         voice.name.includes('Google US English') ||
//         voice.lang === 'en-US'
//       );
//       if (femaleVoice) {
//         utterance.voice = femaleVoice;
//       }

//       // Ensure voices are loaded (some browsers load voices asynchronously)
//       if (voices.length === 0) {
//         window.speechSynthesis.onvoiceschanged = () => {
//           const updatedVoices = window.speechSynthesis.getVoices();
//           const selectedVoice = updatedVoices.find(voice => 
//             voice.name.toLowerCase().includes('female') || 
//             voice.name.includes('Samantha') || 
//             voice.name.includes('Zira') || 
//             voice.name.includes('Google US English') ||
//             voice.lang === 'en-US'
//           );
//           if (selectedVoice) {
//             utterance.voice = selectedVoice;
//           }
//           window.speechSynthesis.speak(utterance);
//         };
//       } else {
//         window.speechSynthesis.speak(utterance);
//       }

//       // Update UI with confirmation message
//       setAiResponse(
//         `✅ Great! Your ${formData.medium} meeting with SniperCoders is scheduled for ${formData.date} at ${selectedTimeOption} (${formData.timezone}). 

// 📧 A confirmation email has been sent to **${formData.email}**.

// 👉 **Please make sure to check your spam or junk folder** if you don't see it in your inbox within a few minutes.`
//       );
//     } catch (error) {
//       console.error("Error confirming meeting:", error);
//       setError("Failed to confirm meeting. Please try again later.");
//       setAiResponse(
//         `There was an issue confirming your meeting. Please try again or contact support at support@snipercoders.com.`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setAiResponse("");
//     setSelectedTimeOption("");
//     setShowMediumOptions(false);
//     setShowTimeOptions(false);
//     setShowTimezones(false);
//     setError("");

//     const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY) || "";
//     setFormData({
//       name: "",
//       email: savedEmail,
//       date: "",
//       time: "",
//       timezone: "",
//       medium: "",
//     });
//   };

//   return (
//     <section className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-16 px-6">
//       <ToastContainer />
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
//         <div className="flex-1 z-20 relative">
//           <h2 className="text-4xl font-bold mb-4">Schedule a Meet</h2>
//           <p className="text-lg mb-6 text-gray-300">
//             Let our AI-powered assistant help you plan a perfect time to connect with our experts at SniperCoders.
//           </p>

//           {error && (
//             <div className="bg-red-600 text-white p-3 rounded-lg mb-4">
//               {error}
//             </div>
//           )}

//           {!aiResponse ? (
//             <form onSubmit={handleSubmit} className="space-y-4 relative z-30">
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your Name"
//                   value={formData.name}
//                   className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                   onChange={handleChange}
//                   required
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Your Email"
//                   value={formData.email}
//                   className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                   onChange={handleChange}
//                   required
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="flex gap-4">
//                 <div className="relative w-full">
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="relative w-full">
//                   <input
//                     type="time"
//                     name="time"
//                     value={formData.time}
//                     className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300 transform active:scale-95 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//                 disabled={loading}
//               >
//                 Book with Our AI Agent
//               </button>
//             </form>
//           ) : (
//             <div className="bg-[#1e1e2f] border border-gray-700 rounded-xl p-6 relative overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50 animate-pulse z-10"></div>
//               <div className="relative z-20">
//                 <div className="flex items-center space-x-3 mb-4">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.707 1.707a1 1 0 001.414 1.414l2-2a1 1 0 00.293-.707V7z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl font-semibold">Our AI Assistant</h3>
//                 </div>

//                 <p className="text-gray-300 mb-6">{aiResponse}</p>

//                 {loading && (
//                   <div className="flex justify-center my-4">
//                     <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//                   </div>
//                 )}

//                 {showTimezones && (
//                   <div className="mt-4 space-y-3">
//                     {timezones.map((tz, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleTimezoneSelection(tz.value)}
//                         className="w-full text-left p-3 rounded-lg bg-[#2a2a45] hover:bg-[#3a3a60] transition duration-300 flex justify-between items-center transform hover:scale-102 hover:translate-x-1 border border-transparent hover:border-blue-500/30"
//                       >
//                         <span>{tz.name}</span>
//                         <span className="text-sm text-gray-400">{tz.value}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {showTimeOptions && (
//                   <div className="mt-4 space-y-3">
//                     {timeOptions.map((option, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleTimeSelection(option.time)}
//                         className="w-full text-left p-3 rounded-lg bg-[#2a2a45] hover:bg-[#3a3a60] transition duration-300 flex justify-between items-center transform hover:scale-102 hover:translate-x-1 border border-transparent hover:border-blue-500/30"
//                       >
//                         <span>{option.label}</span>
//                         <span className="text-sm text-gray-400">{option.timezone}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {showMediumOptions && (
//                   <div className="mt-4 space-y-3">
//                     {meetingMediums.map((medium, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleMediumSelection(medium.value)}
//                         className="w-full text-left p-3 rounded-lg bg-[#2a2a45] hover:bg-[#3a3a60] transition duration-300 flex justify-between items-center transform hover:scale-102 hover:translate-x-1 border border-transparent hover:border-blue-500/30"
//                       >
//                         <span>{medium.name}</span>
//                         <span className="text-sm text-gray-400">{medium.value}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {!showTimezones && !showTimeOptions && !showMediumOptions && formData.medium && !loading && (
//                   <div className="mt-4 flex space-x-4">
//                     <button
//                       onClick={handleConfirmMeeting}
//                       className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300 transform active:scale-95 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//                     >
//                       Confirm Meeting
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300 transform active:scale-95 outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 )}

//                 {!showTimezones && !showTimeOptions && !showMediumOptions && !formData.medium && !loading && (
//                   <div className="mt-4 flex space-x-4">
//                     <button
//                       onClick={handleCancel}
//                       className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 active:scale-95 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//                     >
//                       Schedule Another Meeting
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex-1 flex justify-center relative z-10">
//           <div className="relative">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse z-0"></div>
//             <Image
//               src="/images/4-small[1].png"
//               alt="AI Assistant"
//               width={384}
//               height={384}
//               className="rounded-2xl shadow-lg relative z-10"
//             />
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         input,
//         button,
//         select {
//           pointer-events: auto !important;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ScheduleMeeting;


















import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Interface for form data
interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  medium: string;
}

// Interface for time option
interface TimeOption {
  time: string;
  timezone: string;
  label: string;
}

// Interface for timezone
interface Timezone {
  name: string;
  value: string;
  offset: number;
}

// Interface for meeting medium
interface MeetingMedium {
  name: string;
  value: string;
}

// Define timezones array
const timezones: Timezone[] = [
  { name: "Eastern Daylight Time (EDT, UTC-4)", value: "EDT", offset: -4 },
  { name: "British Summer Time (BST, UTC+1)", value: "BST", offset: 1 },
  { name: "Central European Summer Time (CEST, UTC+2)", value: "CEST", offset: 2 },
  { name: "China Standard Time (CST, UTC+8)", value: "CST", offset: 8 },
  { name: "Indian Standard Time (IST, UTC+5:30)", value: "IST", offset: 5.5 },
  { name: "Central Africa Time (CAT, UTC+2)", value: "CAT", offset: 2 },
  { name: "Australian Eastern Standard Time (AEST, UTC+10)", value: "AEST", offset: 10 },
  { name: "New Zealand Standard Time (NZST, UTC+12)", value: "NZST", offset: 12 },
];

// Define meeting mediums array
const meetingMediums: MeetingMedium[] = [
  { name: "Phone", value: "phone" },
  { name: "Video Call", value: "video" },
  { name: "Email", value: "email" },
];

// Key for storing email in localStorage
const EMAIL_STORAGE_KEY: string = "snipercoders_meeting_email";

const ScheduleMeeting: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    date: "",
    time: "",
    timezone: "",
    medium: "",
  });

  // State for UI control
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showTimeOptions, setShowTimeOptions] = useState<boolean>(false);
  const [showTimezones, setShowTimezones] = useState<boolean>(false);
  const [showMediumOptions, setShowMediumOptions] = useState<boolean>(false);
  const [timeOptions, setTimeOptions] = useState<TimeOption[]>([]);
  const [selectedTimeOption, setSelectedTimeOption] = useState<string>("");

  // Load saved email from localStorage on mount
  useEffect((): void => {
    const savedEmail: string | null = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (savedEmail) {
      setFormData((prev: FormData): FormData => ({ ...prev, email: savedEmail }));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData): FormData => ({ ...prev, [name]: value }));
    setError("");

    // Save email to localStorage
    if (name === "email") {
      localStorage.setItem(EMAIL_STORAGE_KEY, value);
    }
  };

  // Validate date and time (ensure it's in the future)
  const validateDateTime = (date: string, time: string): boolean => {
    const dateTime: Date = new Date(`${date}T${time}`);
    const now: Date = new Date();
    return !isNaN(dateTime.getTime()) && dateTime > now;
  };

  // Handle timezone selection and fetch time options
  const handleTimezoneSelection = async (timezone: string): Promise<void> => {
    setFormData((prev: FormData): FormData => ({ ...prev, timezone }));
    setShowTimezones(false);
    setLoading(true);
    setError("");
    setAiResponse("Fetching suitable meeting times for your selected timezone...");

    // Validate date and time
    if (!validateDateTime(formData.date, formData.time)) {
      setError("Please select a valid future date and time.");
      setLoading(false);
      return;
    }

    try {
      const response: AxiosResponse<{ timeOptions: TimeOption[] }> = await axios.post(
        "/api/agent/get-time-options",
        {
          date: formData.date,
          time: formData.time,
          timezone,
        }
      );
      const timeOptions: TimeOption[] = response.data.timeOptions;

      if (!timeOptions || timeOptions.length === 0) {
        throw new Error("No time options received");
      }

      setTimeOptions(timeOptions);
      setShowTimeOptions(true);
      setAiResponse("Please select a suitable meeting time:");
    } catch (error: unknown) {
      console.error("Error fetching time options:", error);
      setError("Failed to fetch time options. Using fallback options.");

      // Fallback time options
      if (!formData.date || !formData.time) {
        setError("Date and time are required for fallback options.");
        setLoading(false);
        return;
      }

      const baseTime: Date = new Date(`${formData.date}T${formData.time}`);
      const timeSlots: TimeOption[] = [];
      for (let i = -1; i <= 3; i++) {
        const slotTime: Date = new Date(baseTime);
        slotTime.setHours(slotTime.getHours() + i);
        const timeString: string = `${slotTime.getHours().toString().padStart(2, "0")}:00`;
        const formattedTime: string = slotTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        timeSlots.push({
          time: timeString,
          timezone,
          label: `${formattedTime} (${timezone})`,
        });
      }
      setTimeOptions(timeSlots);
      setShowTimeOptions(true);
      setAiResponse("Please select a suitable meeting time:");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setAiResponse("Validating your input...");

    // Validate date and time
    if (!validateDateTime(formData.date, formData.time)) {
      setError("Please select a valid future date and time.");
      setLoading(false);
      return;
    }

    setAiResponse("Please select your preferred timezone...");
    setShowTimezones(true);
    setLoading(false);
  };

  // Handle time option selection
  const handleTimeSelection = (selectedTime: string): void => {
    setSelectedTimeOption(selectedTime);
    setShowTimeOptions(false);
    setShowMediumOptions(true);
    setAiResponse("Please select your preferred meeting medium:");
    setError("");
  };

  // Handle meeting medium selection
  const handleMediumSelection = (medium: string): void => {
    setFormData((prev: FormData): FormData => ({ ...prev, medium }));
    setShowMediumOptions(false);
    setAiResponse("Please confirm your meeting details:");
    setError("");
  };

  // Confirm meeting and send details
  const handleConfirmMeeting = async (): Promise<void> => {
    setLoading(true);
    setError("");
    setAiResponse("Confirming your meeting and sending details...");

    try {
      await axios.post("/api/agent/confirm-meeting", {
        name: formData.name,
        email: formData.email,
        date: formData.date,
        selectedTime: `${selectedTimeOption} (${formData.timezone})`,
        medium: formData.medium,
      });

      // Remove email from localStorage
      localStorage.removeItem(EMAIL_STORAGE_KEY);

      // Update formData to clear email
      setFormData((prev: FormData): FormData => ({ ...prev, email: "" }));

      // Show toast notification
      toast.success(
        "🎉 Your meeting has been successfully scheduled! Check your email (including spam folder) for confirmation.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );

      // Prepare the confirmation message
      const confirmationMessage: string = `Great! Your ${formData.medium} meeting with SniperCoders is scheduled for ${formData.date} at ${selectedTimeOption} (${formData.timezone}). A confirmation email has been sent to ${formData.email}. Please make sure to check your spam or junk folder if you don't see it in your inbox within a few minutes.`;

      // Narrate the confirmation message using Web Speech API
      const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(confirmationMessage);
      utterance.lang = "en-US";
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1.2; // Slightly higher pitch for a more "female-like" tone

      // Get available voices and select a female voice
      const voices: SpeechSynthesisVoice[] = window.speechSynthesis.getVoices();
      const femaleVoice: SpeechSynthesisVoice | undefined = voices.find(
        (voice: SpeechSynthesisVoice): boolean =>
          voice.name.toLowerCase().includes("female") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Zira") ||
          voice.name.includes("Google US English") ||
          voice.lang === "en-US"
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      // Ensure voices are loaded (some browsers load voices asynchronously)
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = (): void => {
          const updatedVoices: SpeechSynthesisVoice[] = window.speechSynthesis.getVoices();
          const selectedVoice: SpeechSynthesisVoice | undefined = updatedVoices.find(
            (voice: SpeechSynthesisVoice): boolean =>
              voice.name.toLowerCase().includes("female") ||
              voice.name.includes("Samantha") ||
              voice.name.includes("Zira") ||
              voice.name.includes("Google US English") ||
              voice.lang === "en-US"
          );
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
          window.speechSynthesis.speak(utterance);
        };
      } else {
        window.speechSynthesis.speak(utterance);
      }

      // Update UI with confirmation message
      setAiResponse(
        `✅ Great! Your ${formData.medium} meeting with SniperCoders is scheduled for ${formData.date} at ${selectedTimeOption} (${formData.timezone}). 

📧 A confirmation email has been sent to **${formData.email}**.

👉 **Please make sure to check your spam or junk folder** if you don't see it in your inbox within a few minutes.`
      );
    } catch (error: unknown) {
      console.error("Error confirming meeting:", error);
      setError("Failed to confirm meeting. Please try again later.");
      setAiResponse(
        `There was an issue confirming your meeting. Please try again or contact support at support@snipercoders.com.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Cancel the scheduling process
  const handleCancel = (): void => {
    setAiResponse("");
    setSelectedTimeOption("");
    setShowMediumOptions(false);
    setShowTimeOptions(false);
    setShowTimezones(false);
    setError("");

    const savedEmail: string | null = localStorage.getItem(EMAIL_STORAGE_KEY) || "";
    setFormData({
      name: "",
      email: savedEmail,
      date: "",
      time: "",
      timezone: "",
      medium: "",
    });
  };

  return (
    <section className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-16 px-6">
      <ToastContainer />
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 z-20 relative">
          <h2 className="text-4xl font-bold mb-4">Schedule a Meet</h2>
          <p className="text-lg mb-6 text-gray-300">
            Let our AI-powered assistant help you plan a perfect time to connect with our experts at SniperCoders.
          </p>

          {error && (
            <div className="bg-red-600 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {!aiResponse ? (
            <form onSubmit={handleSubmit} className="space-y-4 relative z-30">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="flex gap-4">
                <div className="relative w-full">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative w-full">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    className="w-full p-3 rounded-xl bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300 transform active:scale-95 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                disabled={loading}
              >
                Book with Our AI Agent
              </button>
            </form>
          ) : (
            <div className="bg-[#1e1e2f] border border-gray-700 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50 animate-pulse z-10"></div>
              <div className="relative z-20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.707 1.707a1 1 0 001.414 1.414l2-2a1 1 0 00.293-.707V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Our AI Assistant</h3>
                </div>

                <p className="text-gray-300 mb-6">{aiResponse}</p>

                {loading && (
                  <div className="flex justify-center my-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}

                {showTimezones && (
                  <div className="mt-4 space-y-3">
                    {timezones.map((tz: Timezone, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleTimezoneSelection(tz.value)}
                        className="w-full text-left p-3 rounded-lg bg-[#2a2a45] hover:bg-[#3a3a60] transition duration-300 flex justify-between items-center transform hover:scale-102 hover:translate-x-1 border border-transparent hover:border-blue-500/30"
                      >
                        <span>{tz.name}</span>
                        <span className="text-sm text-gray-400">{tz.value}</span>
                      </button>
                    ))}
                  </div>
                )}

                {showTimeOptions && (
                  <div className="mt-4 space-y-3">
                    {timeOptions.map((option: TimeOption, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleTimeSelection(option.time)}
                        className="w-full text-left p-3 rounded-lg bg-[#2a2a45] hover:bg-[#3a3a60] transition duration-300 flex justify-between items-center transform hover:scale-102 hover:translate-x-1 border border-transparent hover:border-blue-500/30"
                      >
                        <span>{option.label}</span>
                        <span className="text-sm text-gray-400">{option.timezone}</span>
                      </button>
                    ))}
                  </div>
                )}

                {showMediumOptions && (
                  <div className="mt-4 space-y-3">
                    {meetingMediums.map((medium: MeetingMedium, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleMediumSelection(medium.value)}
                        className="w-full text-left p-3 rounded-lg bg-[#2a2a45] hover:bg-[#3a3a60] transition duration-300 flex justify-between items-center transform hover:scale-102 hover:translate-x-1 border border-transparent hover:border-blue-500/30"
                      >
                        <span>{medium.name}</span>
                        <span className="text-sm text-gray-400">{medium.value}</span>
                      </button>
                    ))}
                  </div>
                )}

                {!showTimezones && !showTimeOptions && !showMediumOptions && formData.medium && !loading && (
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={handleConfirmMeeting}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300 transform active:scale-95 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                      Confirm Meeting
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300 transform active:scale-95 outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {!showTimezones && !showTimeOptions && !showMediumOptions && !formData.medium && !loading && (
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={handleCancel}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 active:scale-95 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                      Schedule Another Meeting
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-center relative z-10">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse z-0"></div>
            <Image
              src="/images/4-small[1].png"
              alt="AI Assistant"
              width={384}
              height={384}
              className="rounded-2xl shadow-lg relative z-10"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        input,
        button,
        select {
          pointer-events: auto !important;
        }
      `}</style>
    </section>
  );
};

export default ScheduleMeeting;
