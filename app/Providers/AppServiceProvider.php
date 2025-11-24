<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\HomeSetting;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // Share footer settings globally with all Inertia pages
        Inertia::share([
            'footerSettings' => [
                'company_name' => HomeSetting::get('footer_company_name', 'GTAC'),
                'company_full_name' => HomeSetting::get('footer_company_full_name', 'Genesis Training and Assessment Center Inc.'),
                'description' => HomeSetting::get('footer_description', 'Empowering students through quality education and personalized learning experiences.'),
                'contact_title' => HomeSetting::get('footer_contact_title', 'Contact'),
                'copyright' => HomeSetting::get('footer_copyright', '© 2025 Genesis Training and Assessment Center Inc. All rights reserved.'),
                'contact_email' => HomeSetting::get('contact_email', 'GTACINC2024@YAHOO.COM'),
                'contact_phone_1' => HomeSetting::get('contact_phone_1', '(049) 544-7609'),
                'contact_phone_2' => HomeSetting::get('contact_phone_2', '0928-208-4959'),
                'contact_address' => HomeSetting::get('contact_address', 'Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna'),
            ],
        ]);
    }
}
