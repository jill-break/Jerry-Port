'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
}

// Fallback projects for when API is unavailable
const fallbackProjects: Project[] = [
    {
        id: '1',
        title: 'Brand Identity - Luxe Cosmetics',
        description: 'Complete brand identity design including logo, color palette, typography, and packaging for a luxury cosmetics brand.',
        imageUrl: '/images/project-1.jpg',
        projectUrl: 'https://behance.net/project1',
    },
    {
        id: '2',
        title: 'UI/UX Design - Fintech App',
        description: 'Mobile app design for a modern fintech startup. Clean, intuitive interface with seamless user flows.',
        imageUrl: '/images/project-2.jpg',
        projectUrl: 'https://dribbble.com/project2',
    },
    {
        id: '3',
        title: 'Editorial Design - Arts Magazine',
        description: 'Layout design for a quarterly arts and culture magazine. Bold typography and creative compositions.',
        imageUrl: '/images/project-3.jpg',
        projectUrl: 'https://behance.net/project3',
    },
    {
        id: '4',
        title: 'Packaging Design - Organic Coffee',
        description: 'Sustainable packaging design for an artisan coffee roaster with eco-friendly materials.',
        imageUrl: '/images/project-4.jpg',
        projectUrl: 'https://dribbble.com/project4',
    },
    {
        id: '5',
        title: 'Website Design - Architecture Firm',
        description: 'Minimalist website design for a contemporary architecture studio with elegant typography.',
        imageUrl: '/images/project-5.jpg',
        projectUrl: 'https://behance.net/project5',
    },
    {
        id: '6',
        title: 'Motion Graphics - Tech Startup',
        description: 'Animated logo and promotional video for a tech startup launch with dynamic motion design.',
        imageUrl: '/images/project-6.jpg',
        projectUrl: 'https://vimeo.com/project6',
    },
];

export default function Portfolio() {
    const [projects, setProjects] = useState<Project[]>(fallbackProjects);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        setProjects(data);
                    }
                }
            } catch (error) {
                console.log('Using fallback projects');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="portfolio" className="section relative">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        A curated collection of my best work in branding, UI/UX, and visual design.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="glass-panel aspect-[4/3] animate-pulse bg-white/5"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                imageUrl={project.imageUrl}
                                projectUrl={project.projectUrl}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
