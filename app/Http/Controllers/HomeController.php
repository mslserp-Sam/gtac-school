<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\HomeSetting;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $homePage = Page::where('type', 'home')->where('is_active', true)->first();
        $courses = \App\Models\Course::where('is_active', true)
            ->orderBy('sort_order')
            ->get();
        $galleryImages = \App\Models\GalleryImage::where('is_active', true)
            ->orderBy('sort_order')
            ->get();
        $vision = Page::where('type', 'vision')->where('is_active', true)->first();
        $mission = Page::where('type', 'mission')->where('is_active', true)->first();
        $about = Page::where('type', 'about')->where('is_active', true)->first();
        $teamMembers = \App\Models\TeamMember::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        // Get home settings with defaults
        $homeSettings = [
            'hero_title' => HomeSetting::get('hero_title', 'GENESIS'),
            'hero_subtitle' => HomeSetting::get('hero_subtitle', 'Training & Assessment Center Inc.'),
            'hero_background_image' => HomeSetting::get('hero_background_image', '/images/homeBg.jpg'),
            'hero_button_1_text' => HomeSetting::get('hero_button_1_text', 'Explore Courses'),
            'hero_button_1_link' => HomeSetting::get('hero_button_1_link', '#courses'),
            'hero_button_2_text' => HomeSetting::get('hero_button_2_text', 'Get In Touch'),
            'hero_button_2_link' => HomeSetting::get('hero_button_2_link', '#contact'),
            'value_g_letter' => HomeSetting::get('value_g_letter', 'G'),
            'value_g_title' => HomeSetting::get('value_g_title', 'Growth'),
            'value_g_description' => HomeSetting::get('value_g_description', 'We are committed to continuous learning and self-improvement to ensure professional and personal development for our trainees and staff.'),
            'value_e_letter' => HomeSetting::get('value_e_letter', 'E'),
            'value_e_title' => HomeSetting::get('value_e_title', 'Excellence'),
            'value_e_description' => HomeSetting::get('value_e_description', 'We uphold the highest standards in technical-vocational education, ensuring our graduates are well-equipped for success.'),
            'value_n_letter' => HomeSetting::get('value_n_letter', 'N'),
            'value_n_title' => HomeSetting::get('value_n_title', 'Nurturing'),
            'value_n_description' => HomeSetting::get('value_n_description', 'We create a supportive and inclusive learning environment that fosters personal and career growth.'),
            'value_e2_letter' => HomeSetting::get('value_e2_letter', 'E'),
            'value_e2_title' => HomeSetting::get('value_e2_title', 'Empowerment'),
            'value_e2_description' => HomeSetting::get('value_e2_description', 'We equip individuals with the skills and confidence to achieve financial independence and career success.'),
            'value_s_letter' => HomeSetting::get('value_s_letter', 'S'),
            'value_s_title' => HomeSetting::get('value_s_title', 'Service'),
            'value_s_description' => HomeSetting::get('value_s_description', 'We are dedicated to making a positive impact on society by providing quality education that transforms lives.'),
            'value_i_letter' => HomeSetting::get('value_i_letter', 'I'),
            'value_i_title' => HomeSetting::get('value_i_title', 'Integrity'),
            'value_i_description' => HomeSetting::get('value_i_description', 'We operate with honesty, transparency, and accountability in all our dealings with students, partners, and stakeholders.'),
            'value_s2_letter' => HomeSetting::get('value_s2_letter', 'S'),
            'value_s2_title' => HomeSetting::get('value_s2_title', 'Sustainability'),
            'value_s2_description' => HomeSetting::get('value_s2_description', 'We commit to sustainable practices in education and operations for a better tomorrow.'),
            'contact_email' => HomeSetting::get('contact_email', 'GTACINC2024@YAHOO.COM'),
            'contact_phone_1' => HomeSetting::get('contact_phone_1', '(049) 544-7609'),
            'contact_phone_2' => HomeSetting::get('contact_phone_2', '0928-208-4959'),
            'contact_address' => HomeSetting::get('contact_address', 'Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna'),
            'contact_facebook' => HomeSetting::get('contact_facebook', 'GENESIS TAC'),
            'contact_facebook_url' => HomeSetting::get('contact_facebook_url', '#'),
            'location_latitude' => HomeSetting::get('location_latitude', env('SCHOOL_LATITUDE', '14.281292682883482')),
            'location_longitude' => HomeSetting::get('location_longitude', env('SCHOOL_LONGITUDE', '121.39607093283571')),
            'location_address' => HomeSetting::get('location_address', 'Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna'),
        ];

        return Inertia::render('Home', [
            'homePage' => $homePage,
            'courses' => $courses,
            'galleryImages' => $galleryImages,
            'vision' => $vision,
            'mission' => $mission,
            'about' => $about,
            'teamMembers' => $teamMembers,
            'homeSettings' => $homeSettings,
            'latitude' => $homeSettings['location_latitude'],
            'longitude' => $homeSettings['location_longitude'],
            'address' => $homeSettings['location_address'],
        ]);
    }
}

