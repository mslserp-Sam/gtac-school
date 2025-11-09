<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use App\Models\Course;
use App\Models\GalleryImage;
use App\Models\Page;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'courses' => Course::count(),
                'gallery_images' => GalleryImage::count(),
                'contact_inquiries' => ContactInquiry::where('status', 'new')->count(),
                'pages' => Page::count(),
                'team_members' => \App\Models\TeamMember::count(),
            ],
        ]);
    }
}

