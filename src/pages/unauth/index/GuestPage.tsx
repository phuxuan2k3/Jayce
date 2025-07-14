import { useNavigate } from "react-router-dom";
import paths from "../../../router/paths";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../LanguageProvider";

const heroIllustration =
  "https://imageio.forbes.com/specials-images/imageserve/663e3a5c927c44fd5629ad0f/product-visuals/0x0.png?format=png&crop=1586,891,x105,y0,safe&width=960";

const steps = [
  {
    title: "Sign Up",
    description:
      "Create your free SkillSharp account as a candidate or business.",
    img: "https://360matchpro.com/wp-content/uploads/2024/07/The-7-Best-Signup-Platforms_Feature.png",
  },
  {
    title: "Practice / Create Challenges",
    description:
      "Candidates practice mock interviews. Businesses create hiring challenges in minutes.",
    img: "https://static.vecteezy.com/system/resources/thumbnails/023/849/183/small_2x/build-your-team-help-or-assist-work-together-or-collaborate-for-success-lead-to-develop-teamwork-or-business-partners-giant-businessman-hand-linking-jigsaw-puzzle-with-office-business-team-vector.jpg",
  },
  {
    title: "Get Feedback & Connect",
    description:
      "Receive AI-powered feedback or discover top tech talent to hire.",
    img: "https://practicebusiness.co.uk/wp-content/uploads/2021/08/iStock-1264382760.jpg",
  },
];

const testimonials = [
  {
    name: "An Nguyen",
    role: "Software Engineer, Candidate",
    text: "SkillSharp gave me the confidence I needed for my interviews! The mock sessions and AI feedback were spot on.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Minh Tran",
    role: "Software Engineer, Candidate",
    text: "We hired 3 amazing developers thanks to SkillSharp's AI-generated challenges. It saved our team days of work.",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    name: "Hieu Le",
    role: "Frontend Developer, Candidate",
    text: "The step-by-step feedback and realistic scenarios helped me land my dream job. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const faqs = [
  {
    question: "Is SkillSharp free to use?",
    answer:
      "SkillSharp offers free access for candidates and trial features for businesses. Premium plans unlock more advanced features.",
  },
  {
    question: "How does AI feedback work?",
    answer:
      "Our AI models analyze your interview answers and provide actionable feedback on technical skills, communication, and more.",
  },
  {
    question: "Can businesses customize challenges?",
    answer:
      "Yes! Businesses can choose from templates or use QuickGenerate AI to create custom challenges in minutes.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard security protocols to keep your information safe.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const GuestPage = () => {
  const { t } = useLanguage();

  const navigate = useNavigate();
  const hash = window.location.hash;

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-[#bfeaff] via-[#ffe0ec] to-[#ffd6b0] min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="mx-24 relative flex items-center justify-center h-screen px-4 md:px-0">
        <motion.div
          className="absolute inset-0 z-0"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="absolute left-[-120px] top-[-120px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(57,160,173,0.15)_0%,transparent_80%)] blur-xl"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.div
            className="absolute right-[-100px] bottom-[-100px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(57,160,173,0.10)_0%,transparent_80%)] blur-xl"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={fadeUp}
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="block text-gradient-animated font-black pb-2">
                <p>{t("landing_hero_title_line1")}</p>
                {t("landing_hero_title_line2")}
              </span>
            </h1>
            <p className="text-lg md:text-2xl font-semibold mb-8 max-w-xl">
              {t("landing_hero_description")}
            </p>
            <div className="flex gap-6 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(paths.auth.REGISTER)}
                className="px-8 py-4 bg-[var(--primary-color)] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-[0_0_24px_rgba(57,160,173,0.25)] transition"
              >
                {t("landing_button_candidate")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(paths.auth.BUSINESS_REGISTER)}
                className="px-8 py-4 bg-white text-primary-tone-800 border-2 border-primary rounded-full font-bold text-lg shadow-lg hover:shadow-[0_0_24px_rgba(57,160,173,0.12)] transition"
              >
                {t("landing_button_business")}
              </motion.button>
            </div>
          </motion.div>
          {/* Illustration */}
          <motion.div className="flex-1 flex justify-center" variants={fadeUp}>
            <img
              src={heroIllustration}
              alt="Interview illustration"
              className="w-[400px] md:w-[520px] h-auto animate-fade-in rounded-xl shadow-2xl border-4 border-white"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section id="tests" className="py-24 h-[100vh] bg-primary-toned-50 ">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
        >
          <h2 className="text-center text-4xl font-bold text-primary-tone-800 mb-12">
            {t("landing_steps_title")}
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-200"
                variants={fadeUp}
              >
                <img
                  src={step.img}
                  alt={t(`landing_step_${i + 1}_title`)}
                  className="w-40 h-40 mb-4 object-contain"
                  loading="lazy"
                />
                <h4 className="text-xl font-bold mb-2">{t(`landing_step_${i + 1}_title`)}</h4>
                <p className="text-md text-gray-600">{t(`landing_step_${i + 1}_description`)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24  h-[100vh] bg-gradient-to-r from-[#d5eef1]/90 via-white to-[#ffd6b0]/10">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <h2 className="text-center text-4xl font-bold text-primary-toned-800 mb-12">
            {t("landing_testimonials_title")}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {testimonials.map((tData, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-all duration-150"
                variants={fadeUp}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={tData.avatar}
                    alt={t(`landing_testimonial_${i + 1}_name`)}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <div className="font-bold text-lg">{t(`landing_testimonial_${i + 1}_name`)}</div>
                    <div className="text-sm text-gray-500">{t(`landing_testimonial_${i + 1}_role`)}</div>
                  </div>
                </div>
                <p className="text-lg text-gray-700 italic">“{t(`landing_testimonial_${i + 1}_text`)}”</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section (existing content, improved animation) */}
      <section
        id="interviews"
        className="py-24 bg-gradient-to-r from-[#bfeaff]/20 to-[#ffe0ec]/30"
      >
        <motion.div
          className="space-y-14 px-6 md:px-20 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <h2 className="text-center text-4xl font-bold text-primary-tone-800 mb-12">
            {t("landing_features_title")}
          </h2>
          {[
            {
              title: "Practice and learn to get your dream job",
              description:
                "Join the SkillSharp community to practice interviews and technical tests with AI-powered scenarios.",
              linkText: "Learn more →",
              image: "/defaults/landing_img_316.png",
            },
            {
              title: "Search for tech talent",
              description:
                "Business managers can attract candidates by creating relevant challenges. QuickGenerate AI sets up in minutes.",
              linkText: "Learn more →",
              image: "/defaults/landing_img_319.png",
            },
            {
              title: "Prepare with Mock Interview",
              description:
                "Practice with real interview questions. SkillSharp analyzes your performance and gives detailed feedback.",
              linkText: "Learn more →",
              image: "/defaults/landing_img_322.png",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 rounded-lg p-6 shadow-lg bg-white/80`}
              variants={fadeUp}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{t(`landing_feature_${index + 1}_title`)}</h3>
                <p className="mb-3 text-gray-700">{t(`landing_feature_${index + 1}_description`)}</p>
                <a
                  href="#"
                  className="text-primary-tone-800 font-medium hover:underline"
                >
                  {t("landing_feature_link_text")}
                </a>
              </div>
              <img
                src={feature.image}
                alt={t(`landing_feature_${index + 1}_title`)}
                className="w-full md:w-80 rounded-lg object-cover drop-shadow-xl"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-[#ffe0ec]/10 to-[#bfeaff]/10">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <h2 className="text-center text-4xl font-bold text-primary-tone-800 mb-12">
            {t("landing_faqs_title")}
          </h2>
          <div className="space-y-6">
            {faqs.map((_faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 transition cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg">{t(`landing_faq_${i + 1}_question`)}</h4>
                  <span className="text-primary-tone-800 font-bold text-2xl">
                    {openFAQ === i ? "-" : "+"}
                  </span>
                </div>
                {openFAQ === i && (
                  <p className="mt-4 text-gray-700">{t(`landing_faq_${i + 1}_answer`)}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary-toned-50 flex justify-center">
        <motion.div
          className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary-tone-800">
              {t("landing_cta_title")}
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              {t("landing_cta_description")}
            </p>
          </div>
          <div className="flex gap-6">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(paths.auth.REGISTER)}
              className="px-8 py-4 bg-[var(--primary-color)] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-[0_0_24px_rgba(57,160,173,0.25)] transition"
            >
              {t("landing_cta_button_candidate")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(paths.auth.BUSINESS_REGISTER)}
              className="px-8 py-4 bg-white text-primary-tone-800 border-2 border-primary rounded-full font-bold text-lg shadow-lg hover:shadow-[0_0_24px_rgba(57,160,173,0.12)] transition"
            >
              {t("landing_cta_button_business")}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default GuestPage;
