'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
}

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    read: boolean;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        projectUrl: '',
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchData();
        }
    }, [status]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [projectsRes, messagesRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/contact'),
            ]);

            if (projectsRes.ok) setProjects(await projectsRes.json());
            if (messagesRes.ok) setMessages(await messagesRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
            const method = editingProject ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                await fetchData();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(projects.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            projectUrl: project.projectUrl,
        });
        setShowProjectForm(true);
    };

    const resetForm = () => {
        setShowProjectForm(false);
        setEditingProject(null);
        setFormData({ title: '', description: '', imageUrl: '', projectUrl: '' });
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-[var(--neon-cyan)] border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
                        <p className="text-[var(--muted)]">Welcome back, {session.user?.name}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="btn-secondary text-sm"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    {['projects', 'messages'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as 'projects' | 'messages')}
                            className={`px-6 py-3 rounded-lg transition-all ${activeTab === tab
                                    ? 'bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-black font-medium'
                                    : 'glass-panel-sm text-[var(--muted)] hover:text-white'
                                }`}
                        >
                            {tab === 'projects' ? `Projects (${projects.length})` : `Messages (${messages.length})`}
                        </button>
                    ))}
                </div>

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <button
                            onClick={() => setShowProjectForm(true)}
                            className="btn-primary"
                        >
                            + Add New Project
                        </button>

                        {/* Project Form Modal */}
                        {showProjectForm && (
                            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="glass-panel p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                                >
                                    <h2 className="text-2xl font-bold mb-6">
                                        {editingProject ? 'Edit Project' : 'Add New Project'}
                                    </h2>
                                    <form onSubmit={handleSubmitProject} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Title</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="input-glass"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Description</label>
                                            <textarea
                                                required
                                                rows={3}
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="input-glass resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Image URL</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.imageUrl}
                                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                                className="input-glass"
                                                placeholder="/images/project.jpg or https://..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Project URL</label>
                                            <input
                                                type="url"
                                                required
                                                value={formData.projectUrl}
                                                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                                                className="input-glass"
                                            />
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button type="submit" className="btn-primary flex-1">
                                                {editingProject ? 'Update' : 'Create'}
                                            </button>
                                            <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>
                        )}

                        {/* Projects List */}
                        <div className="grid gap-4">
                            {projects.map((project) => (
                                <div key={project.id} className="glass-panel p-6 flex flex-col md:flex-row gap-4 items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                                        <p className="text-[var(--muted)] text-sm line-clamp-2">{project.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditProject(project)}
                                            className="px-4 py-2 glass-panel-sm text-sm hover:border-[var(--neon-cyan)] transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="px-4 py-2 glass-panel-sm text-sm text-red-400 hover:border-red-400 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <p className="text-center text-[var(--muted)] py-12">No projects yet. Add your first project!</p>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        {messages.map((msg) => (
                            <div key={msg.id} className="glass-panel p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                    <div>
                                        <h3 className="font-semibold">{msg.name}</h3>
                                        <p className="text-[var(--neon-cyan)] text-sm">{msg.email}</p>
                                    </div>
                                    <span className="text-xs text-[var(--muted)]">
                                        {new Date(msg.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                <p className="text-[var(--muted)]">{msg.message}</p>
                            </div>
                        ))}
                        {messages.length === 0 && (
                            <p className="text-center text-[var(--muted)] py-12">No messages yet.</p>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
