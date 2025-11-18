<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::orderBy('sort_order')->get();

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Courses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'level' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
            'brochure_path' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        // Handle file upload for course image
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = 'course_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $validated['image_path'] = '/storage/images/' . $filename;
        }

        // Remove image_file from validated array as it's not a database field
        unset($validated['image_file']);

        Course::create($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'level' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
            'brochure_path' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        // Handle file upload for course image
        if ($request->hasFile('image_file')) {
            // Delete old image if it exists
            if ($course->image_path && file_exists(public_path($course->image_path))) {
                unlink(public_path($course->image_path));
            }
            
            $file = $request->file('image_file');
            $filename = 'course_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $validated['image_path'] = '/storage/images/' . $filename;
        }

        // Remove image_file from validated array as it's not a database field
        unset($validated['image_file']);

        $course->update($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        // Delete associated image file if it exists
        if ($course->image_path && file_exists(public_path($course->image_path))) {
            unlink(public_path($course->image_path));
        }

        $course->delete();

        return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully.');
    }
}

