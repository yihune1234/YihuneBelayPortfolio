# PhotoLog API Documentation

## Overview
The PhotoLog API allows anonymous users to like and comment on photos in the portfolio. All interactions are tracked in MongoDB and displayed in real-time on the frontend.

## Base URL
```
Production: https://portfoliobackend-a6ah.onrender.com/api/photolog
Local: http://localhost:5001/api/photolog
```

## Endpoints

### 1. Get All Photos
**GET** `/`

Returns all photos with their likes and comment counts.

**Response:**
```json
[
  {
    "photoId": "photo-1",
    "title": "Professional Portrait",
    "url": "/images/profile.jpg",
    "category": "Personal",
    "likes": 156,
    "commentCount": 24,
    "createdAt": "2025-12-28T00:00:00.000Z"
  }
]
```

### 2. Get Single Photo
**GET** `/:photoId`

Returns a specific photo with all its comments.

**Response:**
```json
{
  "photoId": "photo-1",
  "title": "Professional Portrait",
  "url": "/images/profile.jpg",
  "category": "Personal",
  "likes": 156,
  "comments": [
    {
      "_id": "...",
      "text": "Great photo!",
      "author": "John Doe",
      "createdAt": "2025-12-28T00:00:00.000Z"
    }
  ],
  "createdAt": "2025-12-28T00:00:00.000Z"
}
```

### 3. Initialize Photo
**POST** `/init`

Creates a new photo entry in the database (idempotent - won't create duplicates).

**Request Body:**
```json
{
  "photoId": "photo-1",
  "title": "Professional Portrait",
  "url": "/images/profile.jpg",
  "category": "Personal"
}
```

**Response:**
```json
{
  "message": "Photo initialized successfully",
  "photo": {
    "photoId": "photo-1",
    "title": "Professional Portrait",
    "url": "/images/profile.jpg",
    "category": "Personal",
    "likes": 0,
    "commentCount": 0
  }
}
```

### 4. Like Photo
**POST** `/:photoId/like`

Increments the like count for a photo.

**Response:**
```json
{
  "message": "Photo liked successfully",
  "likes": 157
}
```

### 5. Unlike Photo
**POST** `/:photoId/unlike`

Decrements the like count for a photo.

**Response:**
```json
{
  "message": "Photo unliked successfully",
  "likes": 156
}
```

### 6. Add Comment
**POST** `/:photoId/comment`

Adds a comment to a photo. Anonymous users can comment without authentication.

**Request Body:**
```json
{
  "text": "This is a great photo!",
  "author": "John Doe"  // Optional, defaults to "Anonymous"
}
```

**Response:**
```json
{
  "message": "Comment added successfully",
  "comment": {
    "text": "This is a great photo!",
    "author": "John Doe",
    "createdAt": "2025-12-28T00:00:00.000Z"
  },
  "commentCount": 25
}
```

### 7. Get Comments
**GET** `/:photoId/comments`

Returns all comments for a specific photo, sorted by newest first.

**Response:**
```json
{
  "photoId": "photo-1",
  "comments": [
    {
      "_id": "...",
      "text": "Great photo!",
      "author": "John Doe",
      "createdAt": "2025-12-28T00:00:00.000Z"
    }
  ],
  "total": 25
}
```

### 8. Delete Comment (Admin)
**DELETE** `/:photoId/comment/:commentId`

Deletes a specific comment from a photo.

**Response:**
```json
{
  "message": "Comment deleted successfully",
  "commentCount": 24
}
```

### 9. Delete Photo (Admin)
**DELETE** `/:photoId`

Deletes a photo and all its associated data (likes and comments).

**Response:**
```json
{
  "message": "Photo deleted successfully",
  "photo": {
    "photoId": "photo-1",
    "title": "Professional Portrait"
  }
}
```

### 10. Update Photo (Admin)
**PUT** `/:photoId`

Updates photo details (title, category, or URL).

**Request Body:**
```json
{
  "title": "Updated Title",
  "category": "Updated Category",
  "url": "/images/new-image.jpg"
}
```

**Response:**
```json
{
  "message": "Photo updated successfully",
  "photo": {
    "photoId": "photo-1",
    "title": "Updated Title",
    "url": "/images/new-image.jpg",
    "category": "Updated Category",
    "likes": 156,
    "commentCount": 24
  }
}
```

### 11. Reset Likes (Admin)
**POST** `/:photoId/reset-likes`

Resets the like count for a photo to 0.

**Response:**
```json
{
  "message": "Likes reset successfully",
  "likes": 0
}
```

### 12. Clear All Comments (Admin)
**DELETE** `/:photoId/comments`

Deletes all comments for a specific photo.

**Response:**
```json
{
  "message": "Deleted 24 comments successfully",
  "commentCount": 0
}
```

## Setup Instructions

### 1. Seed Initial Photos
Run the seed script to initialize photos in the database:

```bash
cd backend
node seed-photos.js
```

### 2. Frontend Integration
The frontend automatically:
- Fetches photos on component mount
- Stores liked photos in localStorage
- Updates UI in real-time when likes/comments change
- Falls back to static data if API is unavailable

### 3. Anonymous User Features
- **Likes**: Tracked in localStorage to prevent duplicate likes
- **Comments**: No authentication required, optional name field
- **Real-time Updates**: All changes reflected immediately

## Data Models

### PhotoLog Schema
```javascript
{
  photoId: String (unique),
  title: String,
  url: String,
  category: String,
  likes: Number (default: 0),
  comments: [
    {
      text: String (max 500 chars),
      author: String (max 50 chars, default: "Anonymous"),
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a message:
```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Security Considerations

1. **Rate Limiting**: Consider implementing rate limiting for production
2. **Input Validation**: All text inputs are sanitized and limited in length
3. **Anonymous Tracking**: Uses localStorage for client-side like tracking
4. **CORS**: Configured to allow frontend access

## Future Enhancements

- Add image upload capability
- Implement comment moderation
- Add reply functionality to comments
- Include emoji reactions
- Add reporting system for inappropriate content
