import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

// const interviewQuestions = [
//   { title: "Top 50 React Interview Questions", url: "" },
//   { title: "JavaScript Interview Q&A", url: "" },
//   { title: "SQL Interview Questions", url: "" },
// ];

// const courses = [
//   { title: "React for Beginners", url: "" },
//   { title: "Advanced JavaScript", url: "" },
//   { title: "Backend with Node.js", url: "" },
// ];

// const articles = [
//   {
//     title: "How to Ace Your Coding Interview",
//     url: "/articles/ace-coding-interview",
//   },
//   { title: "Mastering JavaScript Closures", url: "" },
//   { title: "CSS Grid vs Flexbox", url: "" },
// ];

const socialLinks = [
  {
    icon: (
      <FaFacebook className="text-white text-2xl cursor-pointer hover:text-gray-400" />
    ),
    url: "https://www.facebook.com/VNUHCM.US",
  },
  {
    icon: (
      <FaInstagram className="text-white text-2xl cursor-pointer hover:text-gray-400" />
    ),
    url: "https://www.instagram.com/explore/locations/1536226829925551/ai-hoc-khoa-hoc-tu-nhien-hqg-tphcm/",
  },
  {
    icon: (
      <FaYoutube className="text-white text-2xl cursor-pointer hover:text-gray-400" />
    ),
    url: "https://www.youtube.com/channel/UCYtIjCGvl-VNizt_XWk9Uzg",
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
        <div className="flex justify-between gap-6">
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
