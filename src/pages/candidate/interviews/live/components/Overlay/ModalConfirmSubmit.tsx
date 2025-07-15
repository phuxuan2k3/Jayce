import { FC, MouseEvent } from "react";
import { useLanguage } from "../../../../../../LanguageProvider";

type EndInterviewDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
};

const ModalConfirmSubmit: FC<EndInterviewDialogProps> = ({
  open,
  onClose,
  onSubmit,
  loading,
}) => {
  const { t } = useLanguage();

  if (!open) return null;

  const handleBackdropClick = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 z-[9999] w-[100vw] h-[100vh] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md transition-all duration-300"
        onClick={handleModalClick}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-center text-[#2e808a] mb-2">
            {t("end_interview_early")}
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <p className="text-gray-700 text-center mb-2">
            {t("about_to_end_interview")}{" "}
            <strong>{t("end_the_interview")}</strong>{" "}
            {t("before_completing_questions")}
          </p>
          <p className="text-gray-700 text-center mb-2">
            {t("unanswered_questions_note")}
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 pt-4 flex gap-4 justify-center">
          <button
            onClick={onClose}
            disabled={loading}
            className={`px-8 py-2.5 border-2 border-[#2e808a] text-[#2e808a] font-semibold rounded-lg transition-all duration-200 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#f1fafa] hover:border-[#2e808a]"
            }`}
          >
            {t("cancel")}
          </button>

          <button
            onClick={onSubmit}
            disabled={loading}
            className={`px-8 py-2.5 bg-gradient-to-r from-[#2e808a] to-[#0fc2c0] text-white font-semibold rounded-lg transition-all duration-200 min-w-[140px] flex items-center justify-center gap-2 ${
              loading ? "opacity-90 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? t("submitting") : t("end_interview")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmSubmit;
