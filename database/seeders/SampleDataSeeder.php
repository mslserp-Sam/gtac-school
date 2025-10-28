<?php

namespace Database\Seeders;

use App\Models\ContactInquiry;
use App\Models\Course;
use App\Models\GalleryImage;
use App\Models\Page;
use Illuminate\Database\Seeder;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // Create sample courses
        Course::create([
            'title' => 'Web Development Fundamentals',
            'description' => 'Learn the basics of web development including HTML, CSS, and JavaScript. Perfect for beginners who want to start their journey in web development.',
            'category' => 'Technology',
            'level' => 'Beginner',
            'duration' => '3 months',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        Course::create([
            'title' => 'Advanced React Development',
            'description' => 'Master React.js with advanced concepts including hooks, context API, and state management. Build modern, interactive web applications.',
            'category' => 'Technology',
            'level' => 'Advanced',
            'duration' => '4 months',
            'sort_order' => 2,
            'is_active' => true,
        ]);

        Course::create([
            'title' => 'Full-Stack Development Bootcamp',
            'description' => 'Comprehensive program covering frontend and backend development. Build complete applications from scratch.',
            'category' => 'Technology',
            'level' => 'Intermediate',
            'duration' => '6 months',
            'sort_order' => 3,
            'is_active' => true,
        ]);

        // Create sample pages
        Page::create([
            'slug' => 'home',
            'title' => 'Welcome to GTAC School',
            'content' => '<p>GTAC School is dedicated to providing quality education and fostering innovation in technology and beyond. Our mission is to empower students with practical skills and knowledge that prepare them for success in their chosen careers.</p><p>We offer a wide range of courses designed to meet the needs of students at all levels, from beginners to advanced professionals. Our experienced faculty and state-of-the-art facilities create an environment where learning thrives.</p>',
            'type' => 'home',
            'is_active' => true,
        ]);

        Page::create([
            'slug' => 'vision',
            'title' => 'Our Vision',
            'content' => '<p>To be a leading institution in technology education, recognized for innovation, excellence, and student success. We envision a future where our graduates are leaders in their fields, contributing positively to society through their skills and knowledge.</p>',
            'type' => 'vision',
            'is_active' => true,
        ]);

        Page::create([
            'slug' => 'mission',
            'title' => 'Our Mission',
            'content' => '<p>To provide accessible, high-quality education that empowers students to achieve their personal and professional goals. We are committed to:</p><ul><li>Delivering comprehensive, practical, and industry-relevant curricula</li><li>Fostering a supportive learning environment</li><li>Promoting innovation and critical thinking</li><li>Preparing students for successful careers</li><li>Maintaining the highest standards of academic excellence</li></ul>',
            'type' => 'mission',
            'is_active' => true,
        ]);

        Page::create([
            'slug' => 'about',
            'title' => 'About Us',
            'content' => '<p>GTAC School has been at the forefront of technology education for over a decade. Our institution was founded with a vision to bridge the gap between traditional education and the rapidly evolving tech industry.</p><p>We pride ourselves on our experienced faculty, modern facilities, and commitment to student success. Whether you are starting your journey or looking to advance your career, GTAC School provides the resources and support you need to succeed.</p>',
            'type' => 'about',
            'is_active' => true,
        ]);

        $this->command->info('Sample data seeded successfully!');
    }
}

