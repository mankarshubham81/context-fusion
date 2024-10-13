"use client";
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-12 flex items-center justify-center bg-gray-200 dark:bg-slate-900 py-8">
      <form
        action={`https://formspree.io/f/${process.env.FORMS_PREE_KEY}`}
        method="POST"
        className="w-full max-w-2xl bg-gray-200 dark:bg-gray-800 shadow-2xl rounded-lg p-6"
      >
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
          Contact Me
        </h1>

        {/* Name and Email Row */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full p-3 border border-gray-200 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-800 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              required
              value={formData.name}
              onChange={handleChange}
              minLength={4}
              placeholder="Enter your name"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full p-3 border border-gray-200 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-800 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="block w-full p-3 border border-gray-200 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-800 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            required
            value={formData.subject}
            onChange={handleChange}
            minLength={8}
            placeholder="Enter your subject"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={8}
            className="block w-full p-3 border border-gray-200 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-800 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-customBlue hover:bg-blue-700 text-white font-bold rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300 transition ease-in-out duration-200"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
