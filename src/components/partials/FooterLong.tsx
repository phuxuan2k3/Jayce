import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const interviewQuestions = [
  { title: "Top 50 React Interview Questions", url: "/interview/react" },
  { title: "JavaScript Interview Q&A", url: "/interview/javascript" },
  { title: "SQL Interview Questions", url: "/interview/sql" },
];

const courses = [
  { title: "React for Beginners", url: "/courses/react-beginners" },
  { title: "Advanced JavaScript", url: "/courses/advanced-js" },
  { title: "Backend with Node.js", url: "/courses/nodejs" },
];

const articles = [
  {
    title: "How to Ace Your Coding Interview",
    url: "/articles/ace-coding-interview",
  },
  { title: "Mastering JavaScript Closures", url: "/articles/js-closures" },
  { title: "CSS Grid vs Flexbox", url: "/articles/css-grid-flexbox" },
];

const socialLinks = [
  {
    icon: (
      <FaFacebook className="text-white text-2xl cursor-pointer hover:text-gray-400" />
    ),
    url: "https://facebook.com/skillsharp",
  },
  {
    icon: (
      <FaInstagram className="text-white text-2xl cursor-pointer hover:text-gray-400" />
    ),
    url: "https://instagram.com/skillsharp",
  },
  {
    icon: (
      <FaYoutube className="text-white text-2xl cursor-pointer hover:text-gray-400" />
    ),
    url: "https://youtube.com/skillsharp",
  },
];

const contactInfo = [
  {
    icon: <FaEnvelope className="text-white text-lg mr-2" />,
    label: "Email",
    value: "contact@skillsharp.com",
    href: "mailto:contact@skillsharp.com",
  },
  {
    icon: <FaPhone className="text-white text-lg mr-2" />,
    label: "Phone",
    value: "+84 67 066 873",
    href: "tel:+8567066873",
  },
  {
    icon: <FaMapMarkerAlt className="text-white text-lg mr-2" />,
    label: "Address",
    value: "227 Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh city",
    href: "https://goo.gl/maps/abcdef",
  },
];

const FooterLong: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Logo Section */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center">
                <span className="font-bold text-lg text-white">S</span>
              </div>
              <span className="text-xl font-bold">SkillSharp</span>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Follow us</p>
              <div className="flex space-x-3 mt-2">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="SkillSharp social"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Interview Questions */}
          <div>
            <h4 className="font-bold mb-3">Interview Questions</h4>
            <ul className="space-y-2">
              {interviewQuestions.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="hover:text-gray-400 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold mb-3">Courses</h4>
            <ul className="space-y-2">
              {courses.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="hover:text-gray-400 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Articles */}
          <div>
            <h4 className="font-bold mb-3">Popular Articles</h4>
            <ul className="space-y-2">
              {articles.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="hover:text-gray-400 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-3">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((info, idx) => (
                <li key={idx} className="flex items-center">
                  <a
                    href={info.href}
                    target={info.label === "Address" ? "_blank" : undefined}
                    rel={
                      info.label === "Address"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="hover:text-gray-400 flex items-center"
                  >
                    {info.icon}
                    <span>{info.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SkillSharp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterLong;
