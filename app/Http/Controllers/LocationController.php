<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        return Inertia::render('Location', [
            'latitude' => env('SCHOOL_LATITUDE', '14.281292682883482'),
            'longitude' => env('SCHOOL_LONGITUDE', '121.39607093283571'),
            'address' => env('SCHOOL_ADDRESS', 'Phase 2, Lynville Subd., Brgy. Bagumbayan, Santa Cruz, Laguna'),
        ]);
    }
}

