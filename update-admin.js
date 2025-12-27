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

async function updateAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Find existing admin
        const existingAdmin = await Admin.findOne();
        if (!existingAdmin) {
            console.log('❌ No admin found. Run create-admin.js first.\n');
            process.exit(1);
        }

        console.log('📋 Current admin:', existingAdmin.username);
        console.log('🔄 Updating credentials...\n');

        // Update credentials
        const newUsername = 'yihunebelay';
        const newPassword = 'yihune@123';

        console.log('🔐 Hashing new password...');
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        existingAdmin.username = newUsername;
        existingAdmin.password = hashedPassword;
        await existingAdmin.save();

        console.log('\n✅ Admin credentials updated successfully!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📋 New Admin Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('   Username: yihunebelay');
        console.log('   Password: yihune@123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('🚀 You can now login with these credentials!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

updateAdmin();
