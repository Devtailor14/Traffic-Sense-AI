import React from 'react';
import Card from '../components/Card';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
    const teamMembers = [
        { name: 'Dev Tailor', role: 'Full Stack Developer', regNo: '22BCE11250' },
        { name: 'Priyadarshi Nihal', role: 'Full Stack ML Engineer', regNo: '22BCE10665' },
        { name: 'Pratyush Dubey', role: 'AI & ML Engineer', regNo: '22BCE10582' },
        { name: 'Dattatrey', role: 'Backend Developer', regNo: '22BCE11036' },
        { name: 'Shivalik Mathur', role: 'Frontend Developer', regNo: '22BCE11223' },
    ];

    const techStack = [
        // ⚙️ Core AI & ML
        'PyTorch',
        'Ultralytics YOLOv8',
        'YOLO-FDE (Feature Dynamic Enhanced)',
        'Supervision',
        'OpenCV',
        'NumPy',
        'Matplotlib',

        // 🧠 Backend
        'Flask',
        'Flask-CORS',
        'Werkzeug',
        'SQLite',
        'SQLAlchemy',
        'yt-dlp',
        'threading',
        'os / pathlib',

        // 🌐 Frontend
        'React',
        'TypeScript',
        'Vite',
        'TailwindCSS',
        'Framer Motion',
        'Recharts',
        'React Router',
        'Lucide Icons',

        // ⚡ System Integration
        'Fetch API',
        'FormData API',
        'LocalStorage API',
        'concurrently',
        'Node.js',
        'npm'
    ];

    const milestones = [
        { date: 'Sep 2025', event: 'Dataset Preparation & Base Model (YOLOv8) Training' },
        { date: 'Oct 2025', event: 'Enhanced Models Trained, Tested & Compared' },
        { date: 'Nov 2025', event: 'Backend + Frontend Development & Integration' },
    ];

    return (
        <motion.div
            className="max-w-5xl mx-auto space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Page Title */}
            <motion.h1
                className="text-4xl font-bold text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                About Us
            </motion.h1>

            {/* Mission */}
            <Card>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        <strong>Traffic Sense AI</strong> is built with a vision to enable efficient, accurate, and real-time traffic monitoring
                        for smarter roads and safer cities. Using state-of-the-art YOLO-based models, our system performs
                        real-time vehicle detection, tracking, counting, and detailed analytics across multiple live or offline video streams.
                    </p>
                </motion.div>
            </Card>

            {/* Team */}
            <Card>
                <h2 className="text-2xl font-bold mb-4 text-center">Meet the Capstone Team</h2>
                <div className="flex flex-wrap gap-8 justify-center">
                    {teamMembers.map(member => (
                        <motion.div
                            key={member.name}
                            className="text-center"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="w-24 h-24 rounded-full mx-auto mb-2 shadow-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                                <span className="text-3xl font-bold text-primary-700 dark:text-primary-300">
                                    {member.name.charAt(0)}
                                </span>
                            </div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-primary-500 dark:text-primary-400">{member.role}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{member.regNo}</p>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Supervisor Acknowledgment */}
            <Card>
                <h2 className="text-2xl font-bold mb-3">Acknowledgment</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We express our sincere gratitude to <strong>Dr. I. Jasmine Selvakumari Jeya, Assistant Dean, VIT Bhopal</strong>,
                    for her valuable guidance, encouragement, and academic support throughout this project.
                    Her direction in selecting the YOLO-FDD research foundation and mentoring us in enhancing
                    and structuring the model into our improved YOLO-FDE architecture played a pivotal role
                    in shaping this work. We are truly grateful for her mentorship in research paper structuring,
                    model evaluation methodologies, and continuous motivation.
                </p>
            </Card>

            {/* Core Features */}
            <Card>
                <h2 className="text-2xl font-bold mb-3">Core Features of Traffic Sense AI</h2>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Real-time multi-stream inference (up to 4 videos at once)</li>
                    <li>Accurate vehicle tracking with ByteTrack-based non-duplicate counting</li>
                    <li>Supports YouTube, live feeds, and local video inference</li>
                    <li>Detailed traffic analytics with total & class-wise vehicle stats</li>
                    <li>Interactive dashboard and YOLO model performance comparison</li>
                </ul>
            </Card>

            {/* Tech Stack & YOLO-FDE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h2 className="text-2xl font-bold mb-3">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map(tech => (
                            <span
                                key={tech}
                                className="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-2xl font-bold mb-3">What is YOLO-FDE?</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        <strong>YOLO-FDE (Feature Dynamic Enhanced)</strong> is our custom YOLO variant designed specifically for
                        traffic surveillance. It enhances detection accuracy, mAP performance, and robustness by integrating
                        feature dynamic interaction heads, deformable convolution, dynamic sampling, and a refined attention-based
                        backbone—optimizing detection across varying lighting, occlusion, and motion conditions.
                    </p>
                </Card>
            </div>

            {/* Roadmap */}
            <Card>
                <h2 className="text-2xl font-bold mb-3">Project Roadmap</h2>
                <ul className="space-y-2">
                    {milestones.map(item => (
                        <li key={item.event} className="flex items-center">
                            <span className="font-semibold text-primary-500 w-28">{item.date}</span>
                            <span className="text-gray-600 dark:text-gray-300">{item.event}</span>
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Github Link */}
            <Card>
                <div className="flex flex-col items-center space-y-3 text-center">
                    <a
                        href="https://github.com/pnihal6/Traffic-Sense-AI"
                        target="_blank"
                        className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        GitHub Repository Link
                    </a>
                </div>
            </Card>
        </motion.div>
    );
};

export default AboutPage;
