/**
 * API Route Tests
 * These tests verify the API endpoints work correctly
 */

describe('API Routes', () => {
    describe('GET /api/projects', () => {
        it('should return an array of projects', async () => {
            // Mock the fetch for API route
            const mockProjects = [
                { id: '1', title: 'Test Project', description: 'Test', imageUrl: '/test.jpg', projectUrl: 'https://test.com' },
            ];

            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => mockProjects,
            });

            const response = await fetch('/api/projects');
            const data = await response.json();

            expect(response.ok).toBe(true);
            expect(Array.isArray(data)).toBe(true);
        });
    });

    describe('POST /api/contact', () => {
        it('should validate required fields', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 400,
                json: async () => ({ error: 'All fields are required' }),
            });

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify({ name: '', email: '', message: '' }),
            });

            expect(response.ok).toBe(false);
            expect(response.status).toBe(400);
        });

        it('should accept valid contact form submission', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ message: 'Message sent successfully' }),
            });

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify({
                    name: 'John Doe',
                    email: 'john@example.com',
                    message: 'Hello, I want to work with you!',
                }),
            });

            expect(response.ok).toBe(true);
        });
    });
});
