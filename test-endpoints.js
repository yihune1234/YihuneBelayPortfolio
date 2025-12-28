const axios = require('axios');

// Use production URL or local
const BASE_URL = process.env.API_URL || 'https://portfoliobackend-a6ah.onrender.com';
const API_URL = `${BASE_URL}/api/photolog`;

console.log(`🧪 Testing PhotoLog API at: ${API_URL}\n`);

async function testEndpoints() {
    const results = {
        passed: [],
        failed: []
    };

    // Test 1: Health Check
    console.log('1️⃣  Testing Health Check...');
    try {
        const response = await axios.get(`${BASE_URL}/api/health`);
        console.log('   ✅ Health check passed:', response.data);
        results.passed.push('Health Check');
    } catch (error) {
        console.log('   ❌ Health check failed:', error.message);
        results.failed.push('Health Check');
    }

    // Test 2: Get All Photos
    console.log('\n2️⃣  Testing GET /api/photolog (Get all photos)...');
    try {
        const response = await axios.get(API_URL);
        console.log(`   ✅ Found ${response.data.length} photos`);
        if (response.data.length > 0) {
            console.log('   Sample photo:', response.data[0]);
        }
        results.passed.push('GET /api/photolog');
    } catch (error) {
        console.log('   ❌ Failed:', error.response?.data || error.message);
        results.failed.push('GET /api/photolog');
    }

    // Test 3: Initialize a photo
    console.log('\n3️⃣  Testing POST /api/photolog/init (Initialize photo)...');
    try {
        const response = await axios.post(`${API_URL}/init`, {
            photoId: 'test-photo-1',
            title: 'Test Photo',
            url: '/images/test.jpg',
            category: 'Testing'
        });
        console.log('   ✅ Photo initialized:', response.data.message);
        results.passed.push('POST /api/photolog/init');
    } catch (error) {
        console.log('   ❌ Failed:', error.response?.data || error.message);
        results.failed.push('POST /api/photolog/init');
    }

    // Test 4: Get Single Photo
    console.log('\n4️⃣  Testing GET /api/photolog/:photoId (Get single photo)...');
    try {
        const response = await axios.get(`${API_URL}/test-photo-1`);
        console.log('   ✅ Photo retrieved:', response.data.title);
        results.passed.push('GET /api/photolog/:photoId');
    } catch (error) {
        console.log('   ❌ Failed:', error.response?.data || error.message);
        results.failed.push('GET /api/photolog/:photoId');
    }

    // Test 5: Like Photo
    console.log('\n5️⃣  Testing POST /api/photolog/:photoId/like (Like photo)...');
    try {
        const response = await axios.post(`${API_URL}/test-photo-1/like`);
        console.log('   ✅ Photo liked! Likes:', response.data.likes);
        results.passed.push('POST /api/photolog/:photoId/like');
    } catch (error) {
        console.log('   ❌ Failed:', error.response?.data || error.message);
        results.failed.push('POST /api/photolog/:photoId/like');
    }

    // Test 6: Add Comment
    console.log('\n6️⃣  Testing POST /api/photolog/:photoId/comment (Add comment)...');
    try {
        const response = await axios.post(`${API_URL}/test-photo-1/comment`, {
            text: 'This is a test comment!',
            author: 'Test User'
        });
        console.log('   ✅ Comment added:', response.data.message);
        console.log('   Comment count:', response.data.commentCount);
        results.passed.push('POST /api/photolog/:photoId/comment');
    } catch (error) {
        console.log('   ❌ Failed:', error.response?.data || error.message);
        results.failed.push('POST /api/photolog/:photoId/comment');
    }

    // Test 7: Get Comments (CORRECT ENDPOINT - plural "comments")
    console.log('\n7️⃣  Testing GET /api/photolog/:photoId/comments (Get comments - CORRECT)...');
    try {
        const response = await axios.get(`${API_URL}/test-photo-1/comments`);
        console.log('   ✅ Comments retrieved! Total:', response.data.total);
        if (response.data.comments.length > 0) {
            console.log('   Sample comment:', response.data.comments[0]);
        }
        results.passed.push('GET /api/photolog/:photoId/comments');
    } catch (error) {
        console.log('   ❌ Failed:', error.response?.data || error.message);
        results.failed.push('GET /api/photolog/:photoId/comments');
    }

    // Test 8: Test WRONG endpoint (singular "comment") - This should fail with 404
    console.log('\n8️⃣  Testing GET /api/photolog/:photoId/comment (WRONG - should fail)...');
    try {
        const response = await axios.get(`${API_URL}/test-photo-1/comment`);
        console.log('   ⚠️  Unexpectedly succeeded! This endpoint should not exist.');
        results.failed.push('GET /api/photolog/:photoId/comment (should be 404)');
    } catch (error) {
        if (error.response?.status === 404) {
            console.log('   ✅ Correctly returns 404 (endpoint does not exist)');
            console.log('   ℹ️  Use /comments (plural) instead!');
            results.passed.push('GET /api/photolog/:photoId/comment (correctly 404)');
        } else {
            console.log('   ❌ Unexpected error:', error.message);
            results.failed.push('GET /api/photolog/:photoId/comment');
        }
    }

    // Test 9: Unlike Photo
    console.log('\n9️⃣  Testing POST /api/photolog/:photoId/unlike (Unlike photo)...');
    try {
        const response = await axios.post(`${API_URL}/test-photo-1/unlike`);
        console.log('   ✅ Photo unliked! Likes:', response.data.likes);
        results.passed.push('POST /api/photolog/:photoId/unlike');
    } catch (error) {
        console.log('   ❌ Failed:', error.response?.data || error.message);
        results.failed.push('POST /api/photolog/:photoId/unlike');
    }

    // Test 10: Update Photo
    console.log('\n🔟 Testing PUT /api/photolog/:photoId (Update photo)...');
    try {
        const response = await axios.put(`${API_URL}/test-photo-1`, {
            title: 'Updated Test Photo',
            category: 'Updated Category'
        });
        console.log('   ✅ Photo updated:', response.data.message);
        results.passed.push('PUT /api/photolog/:photoId');
    } catch (error) {
        console.log('   ❌ Failed:', error.response?.data || error.message);
        results.failed.push('PUT /api/photolog/:photoId');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${results.passed.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    console.log('='.repeat(60));

    if (results.passed.length > 0) {
        console.log('\n✅ Passed Tests:');
        results.passed.forEach(test => console.log(`   - ${test}`));
    }

    if (results.failed.length > 0) {
        console.log('\n❌ Failed Tests:');
        results.failed.forEach(test => console.log(`   - ${test}`));
    }

    console.log('\n' + '='.repeat(60));
    console.log('🔍 IMPORTANT FINDINGS:');
    console.log('='.repeat(60));
    console.log('❌ WRONG:  GET /api/photolog/:photoId/comment  (singular)');
    console.log('✅ CORRECT: GET /api/photolog/:photoId/comments (plural)');
    console.log('\n💡 Update your frontend to use /comments (plural) for fetching!');
    console.log('='.repeat(60));
}

testEndpoints().catch(error => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
});
