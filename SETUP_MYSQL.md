# MySQL Setup Instructions

## ✅ Tailwind is Already Configured!
The project is already set up with Tailwind CSS. All the pages use Tailwind classes.

## MySQL Configuration

### 1. Update .env File
Your `.env` file should have these MySQL settings:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gtac_school
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 2. Create the MySQL Database
Run this command in your MySQL client or terminal:

```bash
mysql -u root -p
```

Then create the database:
```sql
CREATE DATABASE gtac_school;
EXIT;
```

Or use this one-liner:
```bash
mysql -u root -p -e "CREATE DATABASE gtac_school;"
```

### 3. Run Migrations
```bash
php artisan migrate --seed
```

This will:
- Create all database tables
- Seed sample data
- Create the default admin user

### 4. Build Tailwind Assets
```bash
npm run build
```

Or for development with hot reload:
```bash
npm run dev
```

## Verify Tailwind is Working
After running `npm run build` or `npm run dev`, you should see Tailwind styles applied to your pages:
- Blue gradient backgrounds
- Rounded corners
- Responsive grid layouts
- Hover effects
- All the beautiful styling you see in the React components

## Development Workflow

### Terminal 1 - Laravel Server
```bash
php artisan serve
```

### Terminal 2 - Vite (for Tailwind hot reload)
```bash
npm run dev
```

### Terminal 3 - Run migrations/seeders
```bash
php artisan migrate:fresh --seed
```

## Access the Site
- **Frontend**: http://localhost:8000
- **Admin**: http://localhost:8000/admin/dashboard
- **Default Login**: 
  - Email: `admin@gtacschool.com`
  - Password: (check your UserFactory or create manually)

## Creating Admin User Manually
If you need to create an admin user manually:

```bash
php artisan tinker
```

Then:
```php
use App\Models\User;
use Illuminate\Support\Facades\Hash;

User::create([
    'name' => 'Admin',
    'email' => 'admin@gtacschool.com',
    'password' => Hash::make('your_password'),
]);
```

## Troubleshooting

### Tailwind Not Working?
1. Run `npm run build` to compile Tailwind
2. Clear Laravel cache: `php artisan cache:clear`
3. Clear view cache: `php artisan view:clear`
4. If using `npm run dev`, make sure Vite is running

### MySQL Connection Issues?
1. Check `.env` file has correct credentials
2. Ensure MySQL service is running
3. Test connection: `php artisan db:show`

### Database Errors?
1. Drop and recreate: `php artisan migrate:fresh --seed`
2. Check database exists: `php artisan db:show`

## All Tailwind Features Used
- ✅ Responsive design (mobile-first)
- ✅ Grid layouts
- ✅ Flexbox utilities
- ✅ Color gradients
- ✅ Hover effects
- ✅ Shadow utilities
- ✅ Forms styling (via @tailwindcss/forms)
- ✅ Typography utilities

