import React, { useState } from 'react';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BottomNavbar from './Components/BottomNavbar';
export default function FaqSection() {
  const [expandedSection, setExpandedSection] = useState(0);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sections = [
    {
      id: 0,
      title: 'Getting Started:',
      questions: [
        {
          id: 'gs1',
          question: 'How do I download the Campus Shuttle Bus Tracker app?',
          answer: 'The Campus Shuttle Bus Tracker app is available on both iOS and Android. Visit the App Store or Google Play Store and search for "Campus Shuttle Bus Tracker". Download and install the app, then create your account using your student ID.',
        },
        {
          id: 'gs2',
          question: 'Do I need a student account to use the app?',
          answer: 'Yes, you need to register with your campus email address or student ID to access the app. This helps us verify that you are a current student and eligible to use the shuttle service.',
        },
        {
          id: 'gs3',
          question: 'How do I set up my account?',
          answer: 'Open the app and tap "Sign Up". Enter your campus email, create a password, and provide your student ID. You will receive a verification email. Click the link to verify your account, and you\'re ready to use the tracker!',
        },
      ],
    },
    {
      id: 1,
      title: 'Tracking & Routes:',
      questions: [
        {
          id: 'tr1',
          question: 'How do I track a shuttle bus in real-time?',
          answer: 'Open the app and tap "Track Bus". Select your desired route from the list and you\'ll see the live location of buses on a map. Green markers show active buses, and you can tap any marker to see arrival times at nearby stops.',
        },
        {
          id: 'tr2',
          question: 'What shuttle routes are available?',
          answer: 'We have 5 main routes: North Campus Loop, South Campus Express, Library Shuttle, Dorm Route, and Athletics Route. Each route operates during specific hours. Check the Routes tab in the app to see detailed stops, schedules, and estimated travel times.',
        },
        {
          id: 'tr3',
          question: 'How accurate is the arrival time estimate?',
          answer: 'Our real-time tracking provides arrival estimates accurate to within 2-3 minutes. Estimates may vary due to traffic, weather, or high passenger volume. We recommend checking the app 5-10 minutes before your intended pickup.',
        },
      ],
    },
    {
      id: 2,
      title: 'Booking & Reservations:',
      questions: [
        {
          id: 'br1',
          question: 'Can I reserve a seat on the shuttle?',
          answer: 'Currently, our shuttle service operates on a first-come, first-served basis. However, we offer a notification feature where you can save your favorite stops and receive alerts when buses are nearby.',
        },
        {
          id: 'br2',
          question: 'How do I set up arrival notifications?',
          answer: 'Go to "My Stops" and select the stops you frequently use. Toggle the notification button for each stop. You\'ll receive a push notification when a bus is 5 minutes away from that stop.',
        },
        {
          id: 'br3',
          question: 'What should I do if I miss my bus?',
          answer: 'Check the app for the next bus arriving at your stop. The frequency depends on the route and time of day. During peak hours, buses typically arrive every 10-15 minutes. Off-peak times may have longer intervals.',
        },
      ],
    },
    {
      id: 3,
      title: 'Support & Troubleshooting:',
      questions: [
        {
          id: 'st1',
          question: 'What do I do if the app is not showing my location correctly?',
          answer: 'Make sure you have enabled location services for the app in your phone settings. Go to Settings > Apps > Campus Shuttle Bus Tracker > Permissions and enable Location. If the issue persists, try closing and reopening the app.',
        },
        {
          id: 'st2',
          question: 'How do I report a bus that\'s not running on schedule?',
          answer: 'In the app, tap the bus on the map, then select "Report Issue". Choose the issue type (late, not running, unsafe driver, etc.) and provide any relevant details. Our operations team will investigate immediately.',
        },
        {
          id: 'st3',
          question: 'How do I contact customer support?',
          answer: 'Visit the "Help" section in the app to access our support portal. You can also email us at shuttle-support@campus.edu or call the Student Transportation Office at ext. 4567. We respond to inquiries within 24 hours.',
        },
      ],
    },
  ];
  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    setExpandedQuestion(null);
  };
  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };
  const openModal = () => {
    setIsModalOpen(true);
    setQuestionText('');
    setError('');
    setSubmitted(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setQuestionText('');
    setError('');
    setSubmitted(false);
    setIsLoading(false);
  };
  const handleSubmitQuestion = async () => {
    setError('');
    if (!questionText.trim()) {
      setError('Please type a question before submitting.');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitted(true);
    setIsLoading(false);
    // Auto close modal after 1.5 seconds
    setTimeout(() => {
      closeModal();
    }, 4000);
  };
  return (
    <div className="w-full bg-white min-h-screen p-6 md:p-8 lg:p-12">
      {/* Title */}
      <h1 className="text-3xl leading-normal md:text-5xl font-bold text-gray-900 mb-12 tracking-tight">
        Frequently Asked Questions:
      </h1>
      {/* FAQ Sections */}
      <div className="space-y-6 max-w-4xl">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="animate-in fade-in slide-in-from-bottom-3 duration-500"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full bg-gray-100 hover:bg-gray-150 active:bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between transition-all duration-200 group"
            >
              <span className="text-gray-600 font-semibold text-sm md:text-base">
                {section.title}
              </span>
              <ChevronUpIcon
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            {/* Questions Container */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedSection === section.id ? 'max-h-full' : 'max-h-0'
              }`}
            >
              <div className="pt-2 space-y-1">
                {section.questions.map((item) => (
                  <div key={item.id}>
                    {/* Question */}
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full px-4 py-3 text-left text-gray-400 hover:text-gray-600 text-xs md:text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-between group"
                    >
                      <span
                        className={`transition-colors duration-200 ${
                          expandedQuestion === item.id
                            ? 'text-gray-900 font-semibold'
                            : ''
                        }`}
                      >
                        {item.question}
                      </span>
                      <ChevronUpIcon
                        className={`w-4 h-4 text-gray-300 transition-all duration-300 flex-shrink-0 ml-2 ${
                          expandedQuestion === item.id
                            ? 'rotate-180 text-emerald-400'
                            : ''
                        }`}
                      />
                    </button>
                    {/* Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedQuestion === item.id
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-4 py-2 pb-3 text-gray-500 text-xs md:text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Send Question Button */}
      <button
        onClick={openModal}
        className="w-full mt-18 bg-violet-600 hover:from-emerald-500 hover:to-teal-600 active:from-emerald-600 active:to-teal-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Send us a question
      </button>
      {/* Modal Backdrop */}
      {isModalOpen && (
        <div
          className="bottom-0 left-0 right-0 fixed inset-0 bg-black/40 bg-opacity-50 flex p-4 z-50"
          onClick={closeModal}
        >
          {/* Modal */}
          <div
            className="h-[430px] fixed left-0 bottom-0 right-0 bg-white rounded-t-xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
             <div className='flex justify-center'>
                <div className="mt-3 w-15 h-[3px] bg-gray-500 rounded-full "></div>
             </div>
            {/* Modal Header */}

            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-gray-800 font-medium text-md">Send a Question</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <svg
                      className="w-16 h-16 mx-auto text-emerald-400 animate-bounce"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">Submitted!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Thank you for your question. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <textarea
                      value={questionText}
                      onChange={(e) => {
                        setQuestionText(e.target.value);
                        setError('');
                      }}
                      placeholder="Type your question here..."
                      className="text-lg w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
                      rows="4"
                    />
                  </div>
                  {/* Error Message */}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                  {/* Submit Button */}
                  <button
                    onClick={handleSubmitQuestion}
                    disabled={isLoading}
                    className={`mt-10 w-full py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isLoading
                        ? 'bg-gradient-to-r from-violet-400 to-violet-500 text-white opacity-70'
                        : 'bg-gradient-to-r from-violet-600 to-violet-600 hover:from-emerald-500 hover:to-teal-600 text-white'
                    }`}
                  >
                    {isLoading && (
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* <BottomNavbar /> */}
    </div>
  );
}