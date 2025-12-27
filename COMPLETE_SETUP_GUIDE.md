# Complete Setup & Testing Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (already configured)
- Git (for version control)

### 1. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
npm install
```

### 2. Environment Configuration

Backend `.env` file is already configured with:
- MongoDB URI: Connected to your cluster
- JWT Secret: Configured
- Port: 5001

### 3. Start the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm start
```
Expected output:
```
🚀 Server running on port 5001
📍 API available at http://localhost:5001/api
✅ MongoDB connected successfully
```

#### Terminal 2 - Frontend Development Server
```bash
npm run dev
```
Expected output:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

## 🔐 Admin Access

### Login Credentials
- **Username**: `yihunebelay`
- **Password**: `yihune@123`

### Access Admin Dashboard
1. Open http://localhost:5173
2. Click "Admin" in the header navigation
3. Enter credentials
4. Access dashboard with 3 sections:
   - Projects Manager
   - Messages Manager
   - Settings

## ✨ Features to Test

### 1. Theme System (4 Themes)
- Click the palette icon in header
- Test all 4 themes:
  - 🔵 Ocean Blue
  - 🟣 Royal Purple
  - 🟢 Forest Green
  - 🟠 Sunset Orange
- Verify theme persists after page reload
- Test in both light and dark modes

### 2. Navigation
- Click any header link (Home, About, Projects, Contact, Admin)
- Verify smooth scroll to top
- Check all sections load correctly

### 3. Admin Dashboard - Projects Manager

#### Add New Project
1. Click "Add Project" button in top navigation
2. Modal opens with scrollable form
3. Fill in all fields:
   - **Project Title** (required, max 100 chars)
   - **Description** (required, max 500 chars)
   - **Technologies** (required, comma-separated)
   - **Your Role** (optional)
   - **GitHub URL** (optional)
   - **Live Demo URL** (optional)
   - **Mini Project** (checkbox)
   - **Project Image** (upload with preview)
4. Test scrolling through all inputs
5. Upload an image and verify preview
6. Click "Create Project"
7. Verify project appears in grid

#### Edit Project
1. Click "Edit" button on any project card
2. Modal opens with pre-filled data
3. Modify any field
4. Change or remove image
5. Click "Update Project"
6. Verify changes are saved

#### Delete Project
1. Click "Delete" button on any project card
2. Confirm deletion
3. Verify project is removed

#### View Project Stats
- Check stats cards showing:
  - Total projects count
  - Main projects count
  - Mini projects count

### 4. Admin Dashboard - Messages Manager

#### View Messages
1. Navigate to "Messages" tab
2. View all contact form submissions
3. Check message details:
   - Name
   - Email
   - Message content
   - Timestamp

#### Mark as Read/Unread
1. Click on message status toggle
2. Verify status changes
3. Check unread count updates

#### Delete Messages
1. Click "Delete" button
2. Confirm deletion
3. Verify message is removed

### 5. Admin Dashboard - Settings

#### Update Username
1. Navigate to "Settings" tab
2. Enter new username
3. Click "Save Username"
4. Verify success message
5. Check username updates in header

#### Change Password
1. Enter current password
2. Enter new password
3. Confirm new password
4. Click "Update Password"
5. Verify success message
6. Test login with new password

#### Password Visibility Toggle
- Click eye icon to show/hide passwords
- Test on all three password fields

### 6. Contact Form (Public)

#### Send Message
1. Navigate to Contact section
2. Fill in:
   - Name
   - Email
   - Message
3. Click "Send Message"
4. Verify success notification
5. Check message appears in admin Messages Manager

### 7. Projects Display (Public)

#### View Projects
1. Navigate to Projects section
2. Verify all projects display correctly
3. Check project cards show:
   - Image
   - Title
   - Description
   - Technologies
   - Role
   - GitHub/Demo links
4. Test "View Project" buttons
5. Verify mini projects have "Mini" badge

## 📱 Responsive Testing

### Desktop (1920x1080)
- [ ] Header navigation works
- [ ] Theme selector visible
- [ ] Admin dashboard full layout
- [ ] Modal displays correctly
- [ ] All sections properly spaced

### Tablet (768x1024)
- [ ] Header collapses appropriately
- [ ] Admin dashboard adapts
- [ ] Modal scrolling works
- [ ] Touch interactions smooth

### Mobile (375x667)
- [ ] Mobile menu works
- [ ] Floating action button visible
- [ ] Modal fills screen properly
- [ ] Form inputs accessible
- [ ] Buttons properly sized

## 🌙 Dark Mode Testing

1. Toggle dark mode (moon/sun icon)
2. Verify all sections:
   - [ ] Header
   - [ ] Hero section
   - [ ] About section
   - [ ] Projects section
   - [ ] Contact section
   - [ ] Admin dashboard
   - [ ] Modal forms
3. Check contrast and readability
4. Test theme colors in dark mode

## 🎨 Theme Compatibility Testing

For each of the 4 themes:
1. Select theme
2. Navigate through all sections
3. Open admin dashboard
4. Open project add/edit modal
5. Verify colors are consistent
6. Check buttons use theme color
7. Test in both light and dark modes

## 🔍 Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

## 🐛 Common Issues & Solutions

### Backend won't start
**Issue**: MongoDB connection error
**Solution**: Check `.env` file has correct MONGODB_URI

### Frontend won't start
**Issue**: Port 5173 already in use
**Solution**: Kill process or use different port

### Admin login fails
**Issue**: Invalid credentials
**Solution**: Use exact credentials:
- Username: `yihunebelay`
- Password: `yihune@123`

### Images not uploading
**Issue**: File size too large
**Solution**: Ensure images are under 5MB

### Modal not scrolling
**Issue**: CSS not loaded
**Solution**: Restart dev server

## 📊 Performance Checklist

- [ ] Page loads in under 3 seconds
- [ ] Images load progressively
- [ ] Smooth scrolling animations
- [ ] No console errors
- [ ] API responses under 1 second
- [ ] Theme switching is instant
- [ ] Modal opens/closes smoothly

## 🔒 Security Checklist

- [ ] Admin routes protected
- [ ] JWT tokens working
- [ ] Passwords hashed (bcrypt)
- [ ] File upload validation
- [ ] XSS protection
- [ ] CORS configured
- [ ] Environment variables secure

## 📝 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `POST /api/messages` - Send contact message

### Protected Endpoints (Require JWT)
- `POST /api/admin/login` - Admin login
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/messages` - Get all messages
- `DELETE /api/messages/:id` - Delete message
- `PUT /api/admin/username` - Update username
- `PUT /api/admin/password` - Update password

## 🎯 Final Verification

### All Features Working
- [x] 4 Theme system
- [x] Dark/Light mode
- [x] Smooth navigation
- [x] Admin authentication
- [x] Project CRUD operations
- [x] Image upload with preview
- [x] Message management
- [x] Admin settings
- [x] Contact form
- [x] Responsive design
- [x] Modal scrolling
- [x] Theme compatibility

### All Files Configured
- [x] Backend `.env`
- [x] Backend `.gitignore`
- [x] Root `.gitignore`
- [x] MongoDB connected
- [x] JWT configured
- [x] File upload configured

## 🎉 Success Criteria

Your portfolio website is ready when:
1. ✅ Backend server runs without errors
2. ✅ Frontend loads at http://localhost:5173
3. ✅ Admin can login successfully
4. ✅ Projects can be added/edited/deleted
5. ✅ Images upload and display correctly
6. ✅ All 4 themes work properly
7. ✅ Dark mode works everywhere
8. ✅ Modal scrolling works smoothly
9. ✅ Contact form sends messages
10. ✅ No console errors

## 📞 Support

If you encounter any issues:
1. Check console for errors
2. Verify MongoDB connection
3. Ensure all dependencies installed
4. Restart both servers
5. Clear browser cache

---

**Status**: ✅ All Systems Ready
**Version**: 1.0.0
**Last Updated**: December 27, 2025
