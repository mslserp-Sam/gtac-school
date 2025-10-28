<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $images = GalleryImage::orderBy('sort_order')->get();

        return Inertia::render('Admin/Gallery/Index', [
            'images' => $images,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Gallery/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'required|string',
            'category' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        GalleryImage::create($validated);

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery image created successfully.');
    }

    public function edit(GalleryImage $gallery)
    {
        return Inertia::render('Admin/Gallery/Edit', [
            'image' => $gallery,
        ]);
    }

    public function update(Request $request, GalleryImage $gallery)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'required|string',
            'category' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $gallery->update($validated);

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery image updated successfully.');
    }

    public function destroy(GalleryImage $gallery)
    {
        $gallery->delete();

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery image deleted successfully.');
    }
}

