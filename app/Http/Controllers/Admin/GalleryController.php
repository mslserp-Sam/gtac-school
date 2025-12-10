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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'category' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);
        // STEP 1 DEBUG ONLY — check what Laravel receives
        return response()->json([
            'all' => $request->all(),
            'files' => array_keys($request->files->all()),
            'has_image' => $request->hasFile('image'),
        ]);
        // Handle image upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'gallery_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            // Save to public/images/gallery
            $file->move(public_path('images/gallery'), $filename);
            
            $validated['image_path'] = '/images/gallery/' . $filename;
        }

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'category' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        // Handle image upload if new file is provided
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'gallery_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            // Save to public/images/gallery
            $file->move(public_path('images/gallery'), $filename);
            
            $validated['image_path'] = '/images/gallery/' . $filename;
            
            // Optional: Delete old image file
            if ($gallery->image_path && file_exists(public_path($gallery->image_path))) {
                @unlink(public_path($gallery->image_path));
            }
        }

        $gallery->update($validated);

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery image updated successfully.');
    }

    public function destroy(GalleryImage $gallery)
    {
        $gallery->delete();

        return redirect()->route('admin.gallery.index')->with('success', 'Gallery image deleted successfully.');
    }
}

