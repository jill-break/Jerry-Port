import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
        a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    },
}));

describe('Hero Component', () => {
    it('renders the main heading with Jerry', () => {
        render(<Hero />);
        expect(screen.getByText('Jerry')).toBeInTheDocument();
    });

    it('renders the Portfolio text', () => {
        render(<Hero />);
        expect(screen.getByText('Portfolio')).toBeInTheDocument();
    });

    it('renders the creative designer tagline', () => {
        render(<Hero />);
        expect(screen.getByText(/Creative Designer/i)).toBeInTheDocument();
    });

    it('renders call-to-action buttons', () => {
        render(<Hero />);
        expect(screen.getByText('View My Work')).toBeInTheDocument();
        expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    });

    it('buttons are interactive elements', () => {
        render(<Hero />);
        const viewWorkButton = screen.getByText('View My Work');
        const contactButton = screen.getByText('Get In Touch');

        expect(viewWorkButton.tagName).toBe('BUTTON');
        expect(contactButton.tagName).toBe('BUTTON');
    });
});
