import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import React from 'react';

interface MockProps {
    children?: React.ReactNode;
    [key: string]: unknown;
}

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: MockProps) => <div {...props}>{children}</div>,
        footer: ({ children, ...props }: MockProps) => <footer {...props}>{children}</footer>,
        a: ({ children, ...props }: MockProps) => <a {...props}>{children}</a>,
        span: ({ children, ...props }: MockProps) => <span {...props}>{children}</span>,
    },
}));

// Mock next/link
jest.mock('next/link', () => {
    return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
        return <a href={href}>{children}</a>;
    };
});

describe('Footer Component', () => {
    it('renders the logo', () => {
        render(<Footer />);
        expect(screen.getByText('JerryPort')).toBeInTheDocument();
    });

    it('renders copyright text with current year', () => {
        render(<Footer />);
        const year = new Date().getFullYear();
        expect(screen.getByText(`© ${year} Jerry Portfolio. All rights reserved.`)).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Footer />);
        expect(screen.getByText('Portfolio')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('has correct section links', () => {
        render(<Footer />);
        const portfolioLink = screen.getByRole('link', { name: 'Portfolio' });
        const aboutLink = screen.getByRole('link', { name: 'About' });
        const contactLink = screen.getByRole('link', { name: 'Contact' });

        expect(portfolioLink).toHaveAttribute('href', '#portfolio');
        expect(aboutLink).toHaveAttribute('href', '#about');
        expect(contactLink).toHaveAttribute('href', '#contact');
    });

    it('renders social media links', () => {
        render(<Footer />);
        expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
        expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
        expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    });
});
