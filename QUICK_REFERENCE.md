# Quick Reference Card

## 🚀 Start Commands

### Start Backend
```bash
cd backend
npm start
```
**URL**: http://localhost:5001

### Start Frontend
```bash
npm run dev
```
**URL**: http://localhost:5173

## 🔐 Admin Credentials

```
Username: yihunebelay
Password: yihune@123
```

## 🎨 Features Summary

| Feature | Location | Description |
|---------|----------|-------------|
| **4 Themes** | Header (palette icon) | Ocean Blue, Royal Purple, Forest Green, Sunset Orange |
| **Dark Mode** | Header (moon/sun icon) | Toggle light/dark mode |
| **Admin Login** | Header → Admin | Access dashboard |
| **Add Project** | Admin Dashboard → Add Project button | Create new project with image |
| **Edit Project** | Project card → Edit button | Modify existing project |
| **Delete Project** | Project card → Delete button | Remove project |
| **View Messages** | Admin Dashboard → Messages tab | See contact submissions |
| **Update Settings** | Admin Dashboard → Settings tab | Change username/password |
| **Contact Form** | Public site → Contact section | Send message to admin |

## 📁 Project Structure

```
YihuneBelayPortfolio/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & upload
│   ├── uploads/         # Project images
│   ├── .env            # Environment variables
│   └── server.js       # Express server
├── src/
│   ├── admin/          # Admin dashboard components
│   ├── components/     # Public site components
│   ├── App.jsx         # Main app component
│   └── index.css       # Global styles
└── package.json        # Frontend dependencies
```

## 🔧 Common Commands

### Install Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
npm install
```

### Create Admin User
```bash
cd backend
node create-admin.js
```

### Update Admin Credentials
```bash
cd backend
node update-admin.js
```

### Check Backend Health
```bash
curl http://localhost:5001/api/health
```

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `backend/.env` | MongoDB URI, JWT secret, port |
| `backend/server.js` | Express server setup |
| `src/App.jsx` | Main React component |
| `src/admin/ProjectsManager.jsx` | Project CRUD interface |
| `src/admin/AdminDashboard.jsx` | Admin dashboard layout |
| `src/components/ThemeSelector.jsx` | Theme switcher |
| `src/index.css` | Global styles & themes |

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MongoDB URI in `.env` |
| Frontend won't start | Run `npm install` |
| Can't login | Use exact credentials (case-sensitive) |
| Images not uploading | Check file size (max 5MB) |
| Modal not scrolling | Restart dev server |
| Theme not changing | Clear browser cache |

## 📊 API Endpoints Quick Reference

### Public
- `GET /api/projects` - List projects
- `POST /api/messages` - Send message

### Admin (Requires JWT Token)
- `POST /api/admin/login` - Login
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/messages` - List messages
- `DELETE /api/messages/:id` - Delete message
- `PUT /api/admin/username` - Update username
- `PUT /api/admin/password` - Update password

## 🎨 Theme CSS Variables

```css
/* Use in your components */
background: var(--primary);
color: var(--primary);
border-color: var(--primary);
```

**Available themes:**
- Ocean Blue: `#3b82f6`
- Royal Purple: `#a855f7`
- Forest Green: `#10b981`
- Sunset Orange: `#f97316`

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

## ✅ Pre-Launch Checklist

- [ ] Backend running on port 5001
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] Admin login works
- [ ] Can add/edit/delete projects
- [ ] Images upload successfully
- [ ] All 4 themes work
- [ ] Dark mode works
- [ ] Contact form works
- [ ] Modal scrolling works
- [ ] No console errors

## 🎉 You're Ready!

Everything is configured and ready to use. Start both servers and access your portfolio at http://localhost:5173

---

**Quick Help**: Check `COMPLETE_SETUP_GUIDE.md` for detailed instructions
