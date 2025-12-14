require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/dugsi_management";
const client = new MongoClient(uri);

async function seed() {
    try {
        await client.connect();
        const db = client.db('dugsi_management');
        console.log("Connected to DB for seeding");

        // Clear existing data (optional, be careful in prod)
        // await db.collection('students').deleteMany({});
        // await db.collection('teachers').deleteMany({});
        // await db.collection('classes').deleteMany({});
        // await db.collection('fee_structures').deleteMany({});

        // check if data exists
        const studentCount = await db.collection('students').countDocuments();
        if (studentCount > 0) {
            console.log("Data already exists, skipping seed.");
            return;
        }

        // 1. Classes
        const classes = [
            { name: "Grade 1", section: "A" },
            { name: "Grade 2", section: "A" }
        ];
        const classResult = await db.collection('classes').insertMany(classes);
        const classIds = Object.values(classResult.insertedIds);
        console.log("Seeded Classes");

        // 2. Teachers
        const teachers = [
            { name: "Ahmed Ali", subject: "Math", email: "ahmed@school.com" },
            { name: "Fatima Noor", subject: "English", email: "fatima@school.com" }
        ];
        await db.collection('teachers').insertMany(teachers);
        console.log("Seeded Teachers");

        // 3. Fee Structures
        const fees = [
            { classId: classIds[0], className: "Grade 1", amount: 50, currency: "USD" },
            { classId: classIds[1], className: "Grade 2", amount: 60, currency: "USD" }
        ];
        await db.collection('fee_structures').insertMany(fees);
        console.log("Seeded Fees");

        // 4. Students
        const students = [
            {
                name: "Abdi Hassan",
                classId: classIds[0],
                parentName: "Hassan",
                phone: "123456",
                joinedDate: new Date()
            },
            {
                name: "Ayan Mohamed",
                classId: classIds[1],
                parentName: "Mohamed",
                phone: "654321",
                joinedDate: new Date()
            }
        ];
        await db.collection('students').insertMany(students);
        console.log("Seeded Students");

        console.log("Seeding Complete!");

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

seed();
