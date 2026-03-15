"use client"

import { addNewsletterSubscriber } from "@/lib/db/newsletter";
import { useState } from "react";

const NewsletterSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("who is your daddy ")
    e.preventDefault();
    await addNewsletterSubscriber(formData.firstName, formData.email);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-black px-6 py-48 text-white md:px-12">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="mb-4 text-[10px] tracking-[0.4em] uppercase">The Inner Circle</h2>
        <p className="mb-12 text-2xl font-light tracking-tight md:text-3xl">
          Join for early access to the Archive Sale and new collection drops.
        </p>

        {submitted ? (
          <p className="text-sm tracking-wide text-neutral-400 animate-[fadeIn_0.5s_ease-out]">
            Welcome to the inner circle.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col space-y-6 md:flex-row md:space-x-4 md:space-y-0"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border-b border-neutral-700 bg-transparent py-3 text-sm tracking-wide outline-none transition-colors duration-500 placeholder:text-neutral-600 focus:border-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-b border-neutral-700 bg-transparent py-3 text-sm tracking-wide outline-none transition-colors duration-500 placeholder:text-neutral-600 focus:border-white"
            />
            <button
              type="submit"
              className="shrink-0 border border-white px-10 py-3 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 hover:bg-white hover:text-black"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
