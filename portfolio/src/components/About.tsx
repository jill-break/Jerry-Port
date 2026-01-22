'use client';

import { motion } from 'framer-motion';

const skills = [
    { name: 'Brand Identity', level: 95 },
    { name: 'UI/UX Design', level: 90 },
    { name: 'Typography', level: 88 },
    { name: 'Illustration', level: 85 },
    { name: 'Motion Graphics', level: 80 },
    { name: 'Print Design', level: 92 },
];

const tools = [
    { name: 'Figma', icon: '🎨' },
    { name: 'Adobe Photoshop', icon: '📸' },
    { name: 'Adobe Illustrator', icon: '✏️' },
    { name: 'After Effects', icon: '🎬' },
    { name: 'Blender', icon: '🎯' },
    { name: 'Procreate', icon: '🖌️' },
];

export default function About() {
    return (
        <section id="about" className="section relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[var(--neon-purple)]/5 to-transparent blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title mb-6">
                            About <span className="gradient-text">Me</span>
                        </h2>

                        <div className="glass-panel p-8 mb-8">
                            <p className="text-[var(--muted)] leading-relaxed mb-6">
                                I&apos;m a passionate graphic designer with over 8 years of experience
                                crafting visual identities and digital experiences that leave lasting
                                impressions. My approach combines strategic thinking with creative
                                execution to deliver designs that not only look stunning but also
                                drive results.
                            </p>
                            <p className="text-[var(--muted)] leading-relaxed">
                                From Fortune 500 companies to innovative startups, I&apos;ve had the
                                privilege of working with diverse clients across various industries.
                                I believe great design is the intersection of aesthetics,
                                functionality, and human connection.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { value: '8+', label: 'Years Experience' },
                                { value: '150+', label: 'Projects Completed' },
                                { value: '50+', label: 'Happy Clients' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="glass-panel-sm p-4 text-center"
                                >
                                    <div className="text-3xl font-bold gradient-text mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-[var(--muted)]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Skills & Tools */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Skills */}
                        <div className="glass-panel p-8 mb-8">
                            <h3 className="text-xl font-semibold mb-6">Skills & Expertise</h3>
                            <div className="space-y-5">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>{skill.name}</span>
                                            <span className="text-[var(--neon-cyan)]">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                                className="h-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Tools */}
                        <div className="glass-panel p-8">
                            <h3 className="text-xl font-semibold mb-6">Tools I Use</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {tools.map((tool, index) => (
                                    <motion.div
                                        key={tool.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="glass-panel-sm p-4 text-center cursor-default hover:border-[var(--neon-cyan)] transition-colors"
                                    >
                                        <div className="text-2xl mb-2">{tool.icon}</div>
                                        <div className="text-xs text-[var(--muted)]">{tool.name}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
