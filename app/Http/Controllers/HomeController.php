<?php

namespace App\Http\Controllers;

use App\Models\Page;
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

        return Inertia::render('Home', [
            'homePage' => $homePage,
            'courses' => $courses,
            'galleryImages' => $galleryImages,
            'vision' => $vision,
            'mission' => $mission,
            'about' => $about,
            'latitude' => env('SCHOOL_LATITUDE', '14.281292682883482'),
            'longitude' => env('SCHOOL_LONGITUDE', '121.39607093283571'),
            'address' => env('SCHOOL_ADDRESS', 'Phase 2, Lynville Subd., Brgy. Bagumbayan, Santa Cruz, Laguna'),
        ]);
    }
}

