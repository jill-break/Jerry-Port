// Simple test to verify Prisma client works
require('dotenv').config();

async function test() {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    try {
        const { PrismaClient } = require('@prisma/client');
        console.log('PrismaClient imported successfully');

        const prisma = new PrismaClient();
        console.log('PrismaClient instantiated');

        await prisma.$connect();
        console.log('Connected to database');

        const count = await prisma.admin.count();
        console.log('Admin count:', count);

        await prisma.$disconnect();
    } catch (err) {
        console.error('Error:', err.message);
        console.error('Stack:', err.stack);
    }
}

test();
