'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    index: number;
}

export default function ProjectCard({
    title,
    description,
    imageUrl,
    projectUrl,
    index,
}: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
        >
            <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass-panel overflow-hidden card-hover"
            >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* View Project indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                    >
                        <span className="px-6 py-3 glass-panel-sm text-sm font-medium neon-border">
                            View Project →
                        </span>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all duration-300">
                        {title}
                    </h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Bottom glow line */}
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] transition-all duration-500" />
            </a>
        </motion.div>
    );
}
