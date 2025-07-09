import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../../LanguageProvider';

const FAQPage = () => {
    const { language } = useLanguage();
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (index: string) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    const faqData = {
        vi: {
            sections: [
                {
                    icon: "🔐",
                    title: "Đăng nhập & Đăng ký",
                    items: [
                        {
                            question: "Làm thế nào để tôi đăng nhập thành công?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Điều kiện:</p>
                                        <p className="text-gray-600">Bạn đã có tài khoản trên hệ thống (đăng ký bằng email hoặc phương thức liên kết như Google).</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Các bước thực hiện:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Truy cập vào trang chủ hoặc ứng dụng.</li>
                                            <li>Nhấn vào nút "Đăng nhập".</li>
                                            <li>Chọn phương thức đăng nhập: email/mật khẩu hoặc đăng nhập với Google.</li>
                                            <li>Nhập thông tin xác thực.</li>
                                            <li>Nhấn "Xác nhận".</li>
                                            <li>Nếu thông tin chính xác, hệ thống sẽ điều hướng bạn đến giao diện chính.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "Làm thế nào để tôi đăng ký tài khoản mới?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Điều kiện:</p>
                                        <p className="text-gray-600">Bạn chưa từng có tài khoản trên hệ thống.</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Các bước thực hiện:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Truy cập vào trang chủ hoặc ứng dụng.</li>
                                            <li>Nhấn vào nút "Đăng ký".</li>
                                            <li>Nhập email, mật khẩu và xác nhận lại mật khẩu.</li>
                                            <li>Chọn loại tài khoản (Ứng viên hoặc Doanh nghiệp).</li>
                                            <li>Nhấn "Đăng ký" để hoàn tất.</li>
                                            <li>Kiểm tra email để xác thực tài khoản nếu có yêu cầu.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        }
                    ]
                },
                {
                    icon: "👤",
                    title: "Tài khoản",
                    items: [
                        {
                            question: "Tại sao lại có 2 loại tài khoản là Candidate (Ứng viên) và Business (Doanh nghiệp)?",
                            content: (
                                <div className="space-y-2 text-gray-600">
                                    <p><strong>Candidate</strong> là tài khoản cá nhân để luyện tập kỹ năng phỏng vấn hoặc làm bài kiểm tra mô phỏng.</p>
                                    <p><strong>Business</strong> dành cho các tổ chức, nhà tuyển dụng hoặc huấn luyện viên muốn tạo bài kiểm tra/phỏng vấn và mời các ứng viên tham gia.</p>
                                </div>
                            )
                        },
                        {
                            question: "Tại sao lại cần credit (SSC) để thực hiện các tính năng với AI?",
                            content: (
                                <div className="space-y-2 text-gray-600">
                                    <p>Credit (SSC) được dùng để chi trả chi phí cho các tác vụ sử dụng tài nguyên AI như: tạo câu hỏi, chấm điểm, phỏng vấn ảo, phân tích phát âm,...</p>
                                    <p>Việc sử dụng credit giúp hệ thống vận hành bền vững và đảm bảo chất lượng của các dịch vụ AI.</p>
                                </div>
                            )
                        },
                        {
                            question: "Mỗi credit (SSC) ứng với bao nhiêu tiền?",
                            content: (
                                <div className="space-y-2 text-gray-600">
                                    <p>Mỗi credit (SSC) tương đương với một mức giá nhất định (1.000 VND = 1 credit).</p>
                                    <p>Tỷ lệ quy đổi có thể thay đổi tùy theo chương trình khuyến mãi hoặc chính sách của hệ thống.</p>
                                    <p>Bạn có thể xem chi tiết tại mục "Số dư" trong phần cài đặt tài khoản.</p>
                                </div>
                            )
                        }
                    ]
                },
                {
                    icon: "📝",
                    title: "Làm bài kiểm tra",
                    items: [
                        {
                            question: "Làm thế nào để tôi tự tạo bài kiểm tra?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Điều kiện:</p>
                                        <p className="text-gray-600">Bạn có tài khoản candidate và còn đủ credit (SSC).</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Các bước thực hiện:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Truy cập trang "Bài kiểm tra".</li>
                                            <li>Nhấn "Tạo mới".</li>
                                            <li>Chọn chủ đề, trình độ và ngôn ngữ.</li>
                                            <li>Tùy chọn: thêm mẫu có sẵn hoặc để hệ thống tự tạo.</li>
                                            <li>Nhấn "Tạo bài kiểm tra" và bắt đầu làm bài.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "Làm thế nào để tôi tự tạo mẫu (template)?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Điều kiện:</p>
                                        <p className="text-gray-600">Bạn đã đăng nhập và có quyền tạo bài kiểm tra.</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Các bước thực hiện:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Vào mục "Mẫu bài kiểm tra".</li>
                                            <li>Nhấn "Tạo mẫu mới".</li>
                                            <li>Nhập tiêu đề, chọn chủ đề, cấp độ, ngôn ngữ.</li>
                                            <li>Nhập các câu hỏi thủ công hoặc để hệ thống đề xuất.</li>
                                            <li>Lưu mẫu để sử dụng lại cho nhiều bài kiểm tra sau này.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "Tại sao tôi phải cần tạo mẫu?",
                            content: (
                                <div className="space-y-2 text-gray-600">
                                    <p>Tạo mẫu giúp bạn tiết kiệm thời gian trong việc chuẩn bị bài kiểm tra.</p>
                                    <p>Có thể dùng lại cho nhiều ứng viên (đối với tài khoản business) hoặc để luyện tập nhiều lần (đối với candidate).</p>
                                    <p>Cho phép tùy biến sâu các yếu tố: số lượng câu hỏi, loại câu hỏi, kỹ năng đánh giá.</p>
                                </div>
                            )
                        },
                        {
                            question: "Làm thế nào để tôi tham gia vào bài kiểm tra của tài khoản business?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Điều kiện:</p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            <li>Bạn có tài khoản candidate.</li>
                                            <li>Bạn được mời hoặc có mã bài kiểm tra từ business.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Các bước thực hiện:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Truy cập mục "Bài kiểm tra".</li>
                                            <li>Nhập mã bài kiểm tra hoặc truy cập qua liên kết được gửi.</li>
                                            <li>Nhấn "Tham gia".</li>
                                            <li>Làm bài theo hướng dẫn và gửi kết quả.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "Sự khác biệt giữa bài kiểm tra tự tạo của ứng viên và bài kiểm tra của tài khoản business?",
                            content: (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="border border-gray-300 px-4 py-2 text-left">Tiêu chí</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Candidate tự tạo</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Business cung cấp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Mục tiêu sử dụng</td>
                                                <td className="border border-gray-300 px-4 py-2">Luyện tập cá nhân</td>
                                                <td className="border border-gray-300 px-4 py-2">Đánh giá ứng viên</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Chấm điểm AI</td>
                                                <td className="border border-gray-300 px-4 py-2">Có</td>
                                                <td className="border border-gray-300 px-4 py-2">Có</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Hệ thống phân tích kết quả</td>
                                                <td className="border border-gray-300 px-4 py-2">Có</td>
                                                <td className="border border-gray-300 px-4 py-2">Có, kèm phân tích tổng quan</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Được mời người khác tham gia</td>
                                                <td className="border border-gray-300 px-4 py-2">Không</td>
                                                <td className="border border-gray-300 px-4 py-2">Có</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Khả năng tái sử dụng mẫu</td>
                                                <td className="border border-gray-300 px-4 py-2">Có</td>
                                                <td className="border border-gray-300 px-4 py-2">Có</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    ]
                },
                {
                    icon: "🗣️",
                    title: "Phỏng vấn với AI",
                    items: [
                        {
                            question: "Làm thế nào để tôi tự tạo phiên phỏng vấn?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Điều kiện:</p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            <li>Bạn có tài khoản candidate.</li>
                                            <li>Bạn còn đủ credit (SSC) và đã chọn lĩnh vực, ngôn ngữ, giới tính người phỏng vấn.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Các bước thực hiện:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Truy cập mục "Phỏng vấn AI".</li>
                                            <li>Nhấn "Tạo mới".</li>
                                            <li>Chọn vị trí ứng tuyển, ngôn ngữ, giới tính người hỏi, và kiểu phỏng vấn (chung hoặc theo chủ đề).</li>
                                            <li>Nhấn "Bắt đầu".</li>
                                            <li>Hệ thống sẽ lần lượt hỏi và ghi nhận câu trả lời, sau đó chấm điểm và phân tích.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "Hệ thống hỗ trợ bao nhiêu ngôn ngữ/vị trí?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-600 mb-2">Hệ thống hiện hỗ trợ phỏng vấn bằng tiếng Việt và tiếng Anh.</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 mb-2">Các vị trí hiện có bao gồm:</p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            <li>Kỹ sư phần mềm (Backend, Frontend, Fullstack)</li>
                                            <li>Data Analyst, Data Engineer</li>
                                            <li>Machine Learning Engineer</li>
                                            <li>Product Manager, QA Engineer, v.v.</li>
                                        </ul>
                                    </div>
                                    <p className="text-gray-600">Danh sách được cập nhật thường xuyên theo nhu cầu thực tế và phản hồi người dùng.</p>
                                </div>
                            )
                        }
                    ]
                }
            ]
        },
        en: {
            sections: [
                {
                    icon: "🔐",
                    title: "Login & Registration",
                    items: [
                        {
                            question: "How do I successfully log in?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Prerequisites:</p>
                                        <p className="text-gray-600">You already have an account on the system (registered with email or linked methods like Google).</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Steps to follow:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Access the homepage or application.</li>
                                            <li>Click the "Login" button.</li>
                                            <li>Choose login method: email/password or login with Google.</li>
                                            <li>Enter authentication information.</li>
                                            <li>Click "Confirm".</li>
                                            <li>If information is correct, the system will redirect you to the main interface.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "How do I register a new account?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Prerequisites:</p>
                                        <p className="text-gray-600">You don't have an account on the system yet.</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Steps to follow:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Access the homepage or application.</li>
                                            <li>Click the "Register" button.</li>
                                            <li>Enter email, password and confirm password.</li>
                                            <li>Choose account type (Candidate or Business).</li>
                                            <li>Click "Register" to complete.</li>
                                            <li>Check email for account verification if required.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        }
                    ]
                },
                {
                    icon: "👤",
                    title: "Account",
                    items: [
                        {
                            question: "Why are there 2 types of accounts: Candidate and Business?",
                            content: (
                                <div className="space-y-2 text-gray-600">
                                    <p><strong>Candidate</strong> is a personal account for practicing interview skills or taking simulation tests.</p>
                                    <p><strong>Business</strong> is for organizations, recruiters or trainers who want to create tests/interviews and invite candidates to participate.</p>
                                </div>
                            )
                        },
                        {
                            question: "Why do I need credits (SSC) to use AI features?",
                            content: (
                                <div className="space-y-2 text-gray-600">
                                    <p>Credits (SSC) are used to pay for tasks that use AI resources such as: creating questions, scoring, virtual interviews, pronunciation analysis, etc.</p>
                                    <p>Using credits helps the system operate sustainably and ensures the quality of AI services.</p>
                                </div>
                            )
                        },
                        {
                            question: "How much money does each credit (SSC) correspond to?",
                            content: (
                                <div className="space-y-2 text-gray-600">
                                    <p>Each credit (SSC) may be equivalent to a certain price level (1,000 VND = 1 credit).</p>
                                    <p>Exchange rates may change depending on promotional programs or system policies.</p>
                                    <p>You can see details in the "Balance" section in account settings.</p>
                                </div>
                            )
                        }
                    ]
                },
                {
                    icon: "📝",
                    title: "Taking Tests",
                    items: [
                        {
                            question: "How do I create a test myself?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Prerequisites:</p>
                                        <p className="text-gray-600">You have a candidate account and enough credits.</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Steps to follow:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Access the "Tests" page.</li>
                                            <li>Click "Create new".</li>
                                            <li>Choose topic, level and language.</li>
                                            <li>Optional: add existing template or let system auto-generate.</li>
                                            <li>Click "Create test" and start taking the test.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "How do I create a template?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Prerequisites:</p>
                                        <p className="text-gray-600">You are logged in and have permission to create tests.</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Steps to follow:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Go to "Test Templates" section.</li>
                                            <li>Click "Create new template".</li>
                                            <li>Enter title, choose topic, level, language.</li>
                                            <li>Enter questions manually or let system suggest.</li>
                                            <li>Save template for reuse in future tests.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "Why do I need to create templates?",
                            content: (
                                <div className="space-y-2 text-gray-600">
                                    <p>Creating templates helps you save time in test preparation.</p>
                                    <p>Can be reused for multiple candidates (for business accounts) or for multiple practice sessions (for candidates).</p>
                                    <p>Allows deep customization of factors: number of questions, question types, assessment skills.</p>
                                </div>
                            )
                        },
                        {
                            question: "How do I join a business account's test?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Prerequisites:</p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            <li>You have a candidate account.</li>
                                            <li>You are invited or have a test code from business.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Steps to follow:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Access "Tests" section.</li>
                                            <li>Enter test code or access via sent link.</li>
                                            <li>Click "Join".</li>
                                            <li>Take the test according to instructions and submit results.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "What's the difference between candidate self-created tests and business account tests?",
                            content: (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="border border-gray-300 px-4 py-2 text-left">Criteria</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Candidate Self-Created</th>
                                                <th className="border border-gray-300 px-4 py-2 text-left">Business Provided</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Usage Purpose</td>
                                                <td className="border border-gray-300 px-4 py-2">Personal Practice</td>
                                                <td className="border border-gray-300 px-4 py-2">Candidate Assessment</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">AI Scoring</td>
                                                <td className="border border-gray-300 px-4 py-2">Yes</td>
                                                <td className="border border-gray-300 px-4 py-2">Yes</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Result Analysis System</td>
                                                <td className="border border-gray-300 px-4 py-2">Yes</td>
                                                <td className="border border-gray-300 px-4 py-2">Yes, with comprehensive analysis</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Invite Others to Participate</td>
                                                <td className="border border-gray-300 px-4 py-2">No</td>
                                                <td className="border border-gray-300 px-4 py-2">Yes</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 px-4 py-2 font-medium">Template Reusability</td>
                                                <td className="border border-gray-300 px-4 py-2">Yes</td>
                                                <td className="border border-gray-300 px-4 py-2">Yes</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    ]
                },
                {
                    icon: "🗣️",
                    title: "AI Interview",
                    items: [
                        {
                            question: "How do I create an interview session?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Prerequisites:</p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            <li>You have a candidate account.</li>
                                            <li>You have enough credits (SSC) and have selected field, language, interviewer gender.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700 mb-2">Steps to follow:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                            <li>Access "AI Interview" section.</li>
                                            <li>Click "Create new".</li>
                                            <li>Choose application position, language, interviewer gender, and interview type (general or topic-specific).</li>
                                            <li>Click "Start".</li>
                                            <li>System will ask questions sequentially and record answers, then score and analyze.</li>
                                        </ol>
                                    </div>
                                </div>
                            )
                        },
                        {
                            question: "How many languages/positions does the system support?",
                            content: (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-600 mb-2">The system currently supports interviews in Vietnamese and English.</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 mb-2">Available positions include:</p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            <li>Software Engineer (Backend, Frontend, Fullstack)</li>
                                            <li>Data Analyst, Data Engineer</li>
                                            <li>Machine Learning Engineer</li>
                                            <li>Product Manager, QA Engineer, etc.</li>
                                        </ul>
                                    </div>
                                    <p className="text-gray-600">The list is regularly updated based on actual needs and user feedback.</p>
                                </div>
                            )
                        }
                    ]
                }
            ]
        }
    };

    const currentData = faqData[language];

    return (
        <div className="min-h-screen">
            <div className="mx-auto p-4 sm:p-6 w-[320px] sm:w-[480px] md:w-[640px] lg:w-[768px] xl:w-[896px]">
                {/* FAQ Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 text-center">
                    {language === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions'}
                </h1>

                {/* FAQ Sections */}
                <div className="space-y-4 sm:space-y-6">
                    {currentData.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="bg-primary-toned-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                                <h2 className="text-lg sm:text-xl font-semibold text-primary flex items-center">
                                    <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">{section.icon}</span>
                                    <span className="text-sm sm:text-base md:text-lg">{section.title}</span>
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {section.items.map((item, itemIndex) => {
                                    const globalIndex = `${sectionIndex}-${itemIndex}`;
                                    const isOpen = openItems.has(globalIndex);

                                    return (
                                        <div key={itemIndex} className="border-b border-gray-200 last:border-b-0">
                                            <button
                                                onClick={() => toggleItem(globalIndex)}
                                                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-medium text-primary-toned-500 pr-4">
                                                        {item.question}
                                                    </h3>
                                                    {isOpen ? (
                                                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                                    )}
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="px-6 pb-4">
                                                    <div className="pl-4 border-l-4 border-primary-toned-200">
                                                        {item.content}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-gray-600">
                    <p>
                        {language === 'vi'
                            ? 'Không tìm thấy câu trả lời? Liên hệ với chúng tôi để được hỗ trợ.'
                            : "Can't find an answer? Contact us for support."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;