import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
        },
    });
    console.log('✅ Admin user created:', admin.username);

    // Create sample projects
    const projects = [
        {
            title: 'Brand Identity - Luxe Cosmetics',
            description: 'Complete brand identity design including logo, color palette, typography, and packaging for a luxury cosmetics brand. The design embodies elegance and sophistication.',
            imageUrl: '/images/project-1.jpg',
            projectUrl: 'https://behance.net/project1',
        },
        {
            title: 'UI/UX Design - Fintech App',
            description: 'Mobile app design for a modern fintech startup. Clean, intuitive interface with seamless user flows for banking, investments, and payments.',
            imageUrl: '/images/project-2.jpg',
            projectUrl: 'https://dribbble.com/project2',
        },
        {
            title: 'Editorial Design - Arts Magazine',
            description: 'Layout design for a quarterly arts and culture magazine. Bold typography, creative grid systems, and stunning visual compositions.',
            imageUrl: '/images/project-3.jpg',
            projectUrl: 'https://behance.net/project3',
        },
        {
            title: 'Packaging Design - Organic Coffee',
            description: 'Sustainable packaging design for an artisan coffee roaster. Eco-friendly materials with hand-drawn illustrations and warm color palette.',
            imageUrl: '/images/project-4.jpg',
            projectUrl: 'https://dribbble.com/project4',
        },
        {
            title: 'Website Design - Architecture Firm',
            description: 'Minimalist website design for a contemporary architecture studio. Focus on large imagery, white space, and elegant typography.',
            imageUrl: '/images/project-5.jpg',
            projectUrl: 'https://behance.net/project5',
        },
        {
            title: 'Motion Graphics - Tech Startup',
            description: 'Animated logo and promotional video for a tech startup launch. Dynamic motion design with vibrant colors and modern aesthetics.',
            imageUrl: '/images/project-6.jpg',
            projectUrl: 'https://vimeo.com/project6',
        },
    ];

    // Delete existing projects and create fresh ones
    await prisma.project.deleteMany({});

    for (const project of projects) {
        await prisma.project.create({
            data: project,
        });
    }
    console.log(`✅ Created ${projects.length} sample projects`);

    console.log('🎉 Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
