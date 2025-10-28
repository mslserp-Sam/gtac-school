# GTAC School Website - Setup Guide

This is a Laravel + React school website project with CMS functionality.

## Features

✅ Homepage with overview and featured content  
✅ Courses page with detailed listings  
✅ Gallery page with lightbox image viewing  
✅ Contact page with inquiry form  
✅ Vision & Mission page  
✅ Location page with Google Maps integration  
✅ Admin CMS for managing all content  
✅ GitHub Actions CI/CD pipeline  

## Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18 or higher
- SQLite (for development) or MySQL/PostgreSQL

### Setup Steps

1. **Clone the repository and install dependencies:**
   ```bash
   composer install
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Update .env file** with your database configuration and school details:
   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=/absolute/path/to/database/database.sqlite
   
   # School location for Google Maps
   SCHOOL_LATITUDE=your_latitude
   SCHOOL_LONGITUDE=your_longitude
   SCHOOL_ADDRESS="Your School Address"
   ```

4. **Run migrations:**
   ```bash
   php artisan migrate
   ```

5. **Create a storage link:**
   ```bash
   php artisan storage:link
   ```

6. **Build assets:**
   ```bash
   npm run build
   # Or for development with hot reload:
   npm run dev
   ```

7. **Start the server:**
   ```bash
   php artisan serve
   ```

## CMS Usage

### Accessing the Admin Panel

1. Create an admin user:
   ```bash
   php artisan tinker
   User::create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => bcrypt('password')]);
   ```

2. Log in at `/login` using your admin credentials

3. Navigate to `/admin/dashboard` to access the CMS

### Managing Content

**Courses Management** (`/admin/courses`)
- Add, edit, and delete courses
- Upload course brochures (PDFs)
- Organize by category and level

**Gallery Management** (`/admin/gallery`)
- Upload images to the gallery
- Add descriptions and organize by category
- Images appear on the homepage and gallery page

**Contact Inquiries** (`/admin/contact-inquiries`)
- View all contact form submissions
- Update inquiry status
- Respond to inquiries

**Pages Management** (`/admin/pages`)
- Manage page content including:
  - Home page content
  - Vision statement
  - Mission statement
  - About us content

## Content Structure

### Courses
- Title, description, category, level, duration
- Optional brochure PDF download
- Sort order for display order

### Gallery Images
- Title, description, image path
- Category for filtering
- Sort order for display order

### Pages
- Slug, title, content (HTML supported)
- Type: home, vision, mission, about
- Meta description for SEO

## Adding Sample Data

You can create a seeder to add sample data:

```php
php artisan make:seeder SampleDataSeeder
```

Then run:
```bash
php artisan db:seed --class=SampleDataSeeder
```

## Customization

### Logo
Replace the "GTAC School" text in `resources/js/Layouts/MainLayout.jsx` with your logo.

### Colors
Modify the blue color scheme in Tailwind classes. Search for:
- `bg-blue-600`, `from-blue-600`, etc.
- Replace with your brand colors

### School Information
Update contact details in `resources/js/Pages/Contact.jsx` and `resources/js/Layouts/MainLayout.jsx`

## CI/CD

The GitHub Actions workflow is configured to:
- Run tests on push to main/master/develop branches
- Run tests on pull requests
- Uses SQLite for testing

To customize deployment, edit `.github/workflows/ci-cd.yml`

## Production Deployment

1. Set `APP_ENV=production` in `.env`
2. Run `npm run build` to compile assets
3. Run `php artisan config:cache`
4. Run `php artisan route:cache`
5. Run `php artisan view:cache`
6. Ensure storage and cache directories are writable

## Troubleshooting

**Routes not working?**
- Ensure `.env` has correct APP_URL
- Run `php artisan route:clear`

**Assets not loading?**
- Run `npm run build`
- Check public/build directory exists
- Ensure storage link is created

**Database errors?**
- Ensure SQLite file exists if using SQLite
- Check database permissions
- Run migrations again

## Next Steps

- [ ] Add file upload functionality for gallery images
- [ ] Implement brochure upload for courses
- [ ] Add more admin pages (Create/Edit forms)
- [ ] Implement search functionality
- [ ] Add multilingual support
- [ ] Set up email notifications for contact form
- [ ] Configure production deployment

