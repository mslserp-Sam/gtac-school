<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class VisionMissionController extends Controller
{
    public function index()
    {
        $vision = Page::where('type', 'vision')->where('is_active', true)->first();
        $mission = Page::where('type', 'mission')->where('is_active', true)->first();
        $about = Page::where('type', 'about')->where('is_active', true)->first();

        return Inertia::render('VisionMission', [
            'vision' => $vision,
            'mission' => $mission,
            'about' => $about,
        ]);
    }
}

