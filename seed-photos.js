const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PhotoLog = require('./models/PhotoLog');

dotenv.config();

const initialPhotos = [
    {
        photoId: 'photo-1',
        title: 'Professional Portrait',
        url: '/images/profile.jpg',
        category: 'Personal',
        likes: 156,
        comments: []
    },
    {
        photoId: 'photo-2',
        title: 'Creative Work',
        url: '/images/logo.png',
        category: 'Design',
        likes: 89,
        comments: []
    },
    {
        photoId: 'photo-3',
        title: 'Project Showcase',
        url: '/images/yihune-dire.png',
        category: 'Development',
        likes: 124,
        comments: []
    },
    {
        photoId: 'photo-4',
        title: 'Innovation Hub',
        url: '/images/innovation.png',
        category: 'Tech',
        likes: 98,
        comments: []
    }
];

async function seedPhotos() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing photos (optional - comment out if you want to keep existing data)
        // await PhotoLog.deleteMany({});
        // console.log('🗑️  Cleared existing photos');

        // Insert photos only if they don't exist
        for (const photoData of initialPhotos) {
            const existingPhoto = await PhotoLog.findOne({ photoId: photoData.photoId });

            if (!existingPhoto) {
                await PhotoLog.create(photoData);
                console.log(`✅ Created photo: ${photoData.title}`);
            } else {
                console.log(`⏭️  Photo already exists: ${photoData.title}`);
            }
        }

        console.log('✅ Photo seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding photos:', error);
        process.exit(1);
    }
}

seedPhotos();
