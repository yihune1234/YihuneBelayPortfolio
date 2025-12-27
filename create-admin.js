const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            console.log('⚠️  Admin already exists!');
            console.log('   Username:', existingAdmin.username);
            console.log('   Created:', existingAdmin.createdAt);
            console.log('\n❌ Cannot create another admin. Delete existing admin first.\n');
            process.exit(0);
        }

        // Create new admin
        const username = 'yihunebelay';
        const password = 'yihune@123';

        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('👤 Creating admin user...');
        const admin = new Admin({
            username: username,
            password: hashedPassword
        });

        await admin.save();

        console.log('\n✅ Admin created successfully!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📋 Admin Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('   Username: yihunebelay');
        console.log('   Password: yihune@123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('🚀 You can now login to the admin dashboard!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createAdmin();
