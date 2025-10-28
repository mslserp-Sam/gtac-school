<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Courses', [
            'courses' => $courses,
        ]);
    }

    public function show(Course $course)
    {
        return Inertia::render('Courses/Show', [
            'course' => $course,
        ]);
    }
}

