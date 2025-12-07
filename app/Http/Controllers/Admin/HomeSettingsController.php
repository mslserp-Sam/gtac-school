<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeSettingsController extends Controller
{
    public function index()
    {
        $settings = HomeSetting::getAll();
        
        // Define all possible settings with their defaults
        $defaultSettings = [
            // Hero Section
            'hero_title' => 'GENESIS',
            'hero_subtitle' => 'Training & Assessment Center Inc.',
            'hero_background_image' => '/storage/images/homeBg.jpg',
            'hero_button_1_text' => 'Explore Courses',
            'hero_button_1_link' => '#courses',
            'hero_button_2_text' => 'Get In Touch',
            'hero_button_2_link' => '#contact',
            'hero_tagline' => '“Empowering Skills. Building Careers. Transforming Lives.”',
            
            // Core Values
            'value_g_letter' => 'G',
            'value_g_title' => 'Growth',
            'value_g_description' => 'We are committed to continuous learning and self-improvement to ensure professional and personal development for our trainees and staff.',
            'value_e_letter' => 'E',
            'value_e_title' => 'Excellence',
            'value_e_description' => 'We uphold the highest standards in technical-vocational education, ensuring our graduates are well-equipped for success.',
            'value_n_letter' => 'N',
            'value_n_title' => 'Nurturing',
            'value_n_description' => 'We create a supportive and inclusive learning environment that fosters personal and career growth.',
            'value_e2_letter' => 'E',
            'value_e2_title' => 'Empowerment',
            'value_e2_description' => 'We equip individuals with the skills and confidence to achieve financial independence and career success.',
            'value_s_letter' => 'S',
            'value_s_title' => 'Service',
            'value_s_description' => 'We are dedicated to making a positive impact on society by providing quality education that transforms lives.',
            'value_i_letter' => 'I',
            'value_i_title' => 'Integrity',
            'value_i_description' => 'We operate with honesty, transparency, and accountability in all our dealings with students, partners, and stakeholders.',
            'value_s2_letter' => 'S',
            'value_s2_title' => 'Sustainability',
            'value_s2_description' => 'We commit to sustainable practices in education and operations for a better tomorrow.',
            
            // Contact Information
            'contact_email' => 'GTACINC2024@YAHOO.COM',
            'contact_phone_1' => '(049) 544-7609',
            'contact_phone_2' => '0928-208-4959',
            'contact_address' => 'Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna',
            'contact_facebook' => 'GENESIS TAC',
            'contact_facebook_url' => '#',
            
            // Location
            'location_latitude' => '14.281292682883482',
            'location_longitude' => '121.39607093283571',
            'location_address' => 'Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna',
            
            // Footer
            'footer_company_name' => 'GTAC',
            'footer_company_full_name' => 'Genesis Training and Assessment Center Inc.',
            'footer_description' => 'Empowering students through quality education and personalized learning experiences.',
            'footer_contact_title' => 'Contact',
            'footer_copyright' => '© 2025 Genesis Training and Assessment Center Inc. All rights reserved.',
        ];

        // Merge defaults with existing settings
        $mergedSettings = array_merge($defaultSettings, $settings);

        return Inertia::render('Admin/HomeSettings/Edit', [
            'settings' => $mergedSettings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string|max:255',
            'hero_background_image' => 'nullable|string|max:255',
            'hero_background_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'hero_button_1_text' => 'nullable|string|max:255',
            'hero_button_1_link' => 'nullable|string|max:255',
            'hero_button_2_text' => 'nullable|string|max:255',
            'hero_button_2_link' => 'nullable|string|max:255',
            'hero_tagline' => 'nullable|string|max:255',
            'value_g_letter' => 'nullable|string|max:1',
            'value_g_title' => 'nullable|string|max:255',
            'value_g_description' => 'nullable|string',
            'value_e_letter' => 'nullable|string|max:1',
            'value_e_title' => 'nullable|string|max:255',
            'value_e_description' => 'nullable|string',
            'value_n_letter' => 'nullable|string|max:1',
            'value_n_title' => 'nullable|string|max:255',
            'value_n_description' => 'nullable|string',
            'value_e2_letter' => 'nullable|string|max:1',
            'value_e2_title' => 'nullable|string|max:255',
            'value_e2_description' => 'nullable|string',
            'value_s_letter' => 'nullable|string|max:1',
            'value_s_title' => 'nullable|string|max:255',
            'value_s_description' => 'nullable|string',
            'value_i_letter' => 'nullable|string|max:1',
            'value_i_title' => 'nullable|string|max:255',
            'value_i_description' => 'nullable|string',
            'value_s2_letter' => 'nullable|string|max:1',
            'value_s2_title' => 'nullable|string|max:255',
            'value_s2_description' => 'nullable|string',
            'contact_email' => 'nullable|string|max:255',
            'contact_phone_1' => 'nullable|string|max:255',
            'contact_phone_2' => 'nullable|string|max:255',
            'contact_address' => 'nullable|string',
            'contact_facebook' => 'nullable|string|max:255',
            'contact_facebook_url' => 'nullable|string|max:255',
            'location_latitude' => 'nullable|string|max:255',
            'location_longitude' => 'nullable|string|max:255',
            'location_address' => 'nullable|string',
            'footer_company_name' => 'nullable|string|max:255',
            'footer_company_full_name' => 'nullable|string|max:255',
            'footer_description' => 'nullable|string',
            'footer_contact_title' => 'nullable|string|max:255',
            'footer_copyright' => 'nullable|string|max:255',
        ]);

        // Handle file upload for background image
        if ($request->hasFile('hero_background_image_file')) {
            $file = $request->file('hero_background_image_file');
            $filename = 'homeBg_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            HomeSetting::set('hero_background_image', '/images/' . $filename);
        }

        // Save other settings
        foreach ($validated as $key => $value) {
            if ($value !== null && $key !== 'hero_background_image_file' && $key !== 'hero_background_image') {
                HomeSetting::set($key, $value);
            }
        }

        return redirect()->route('admin.home-settings.index')->with('success', 'Home settings updated successfully.');
    }
}
