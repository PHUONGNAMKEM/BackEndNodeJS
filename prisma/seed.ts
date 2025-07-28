import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Create Mock data for first time run create table User
    const user1 = await prisma.user.create({
        data: {
            username: 'Phuong Nam',
            email: 'phuongnam@gmail.com',
            password: '123456',
            point: 100,
            rank: 'bronze',
        },
    });

    // Goal
    const goal1 = await prisma.goal.create({
        data: {
            title: 'Học Prisma',
            description: 'Học ORM với Prisma trong 10 ngày',
            startDate: new Date('2025-07-20'),
            endDate: new Date('2025-07-30'),
            status: 'active',
            progress: 0,
            isPublic: true,
            idUser: user1.idUser,
        },
    });

    // Task
    await prisma.task.createMany({
        data: [
            {
                title: 'Cài Prisma',
                isDone: true,
                dueDate: new Date('2025-07-21'),
                idGoal: goal1.idGoal,
            },
            {
                title: 'Tạo model',
                isDone: false,
                dueDate: new Date('2025-07-22'),
                idGoal: goal1.idGoal,
            },
        ],
    });
}

main()
    .then(() => {
        console.log('Seeding data first done.');
    })
    .catch((e) => {
        console.error(e);
    })
    .finally(() => {
        prisma.$disconnect();
    });
