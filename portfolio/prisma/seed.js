require('dotenv').config();
const { PrismaClient } = require('.prisma/client/default');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');
    console.log('Database URL:', process.env.DATABASE_URL);

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

    // Delete existing projects and create fresh ones
    await prisma.project.deleteMany({});

    // Create sample projects
    const projects = [
        {
            title: 'Brand Identity - Luxe Cosmetics',
            description: 'Complete brand identity design including logo, color palette, typography, and packaging for a luxury cosmetics brand.',
            imageUrl: '/images/project-1.jpg',
            projectUrl: 'https://behance.net/project1',
        },
        {
            title: 'UI/UX Design - Fintech App',
            description: 'Mobile app design for a modern fintech startup. Clean, intuitive interface with seamless user flows.',
            imageUrl: '/images/project-2.jpg',
            projectUrl: 'https://dribbble.com/project2',
        },
        {
            title: 'Editorial Design - Arts Magazine',
            description: 'Layout design for a quarterly arts and culture magazine. Bold typography and creative compositions.',
            imageUrl: '/images/project-3.jpg',
            projectUrl: 'https://behance.net/project3',
        },
        {
            title: 'Packaging Design - Organic Coffee',
            description: 'Sustainable packaging design for an artisan coffee roaster with eco-friendly materials.',
            imageUrl: '/images/project-4.jpg',
            projectUrl: 'https://dribbble.com/project4',
        },
        {
            title: 'Website Design - Architecture Firm',
            description: 'Minimalist website design for a contemporary architecture studio with elegant typography.',
            imageUrl: '/images/project-5.jpg',
            projectUrl: 'https://behance.net/project5',
        },
        {
            title: 'Motion Graphics - Tech Startup',
            description: 'Animated logo and promotional video for a tech startup launch with dynamic motion design.',
            imageUrl: '/images/project-6.jpg',
            projectUrl: 'https://vimeo.com/project6',
        },
    ];

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
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
