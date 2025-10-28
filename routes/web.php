<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VisionMissionController;
use Illuminate\Support\Facades\Route;

// Public routes - Single page website
Route::get('/', [HomeController::class, 'index'])->name('home');

// Legacy routes that redirect to home page sections
Route::get('/courses', function () {
    return redirect('/#courses');
});
Route::get('/gallery', function () {
    return redirect('/#gallery');
});
Route::get('/contact', function () {
    return redirect('/#contact');
});
Route::get('/vision-mission', function () {
    return redirect('/#vision-mission');
});
Route::get('/location', function () {
    return redirect('/#location');
});

// Admin routes - protected by auth middleware
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [ProfileController::class, 'edit'])->name('dashboard');
    
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Admin dashboard
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
        
        // Courses management
        Route::resource('courses', \App\Http\Controllers\Admin\CourseController::class);
        
        // Gallery management
        Route::resource('gallery', \App\Http\Controllers\Admin\GalleryController::class);
        
        // Contact inquiries
        Route::get('contact-inquiries', [\App\Http\Controllers\Admin\ContactInquiryController::class, 'index'])->name('contact-inquiries.index');
        Route::patch('contact-inquiries/{inquiry}/status', [\App\Http\Controllers\Admin\ContactInquiryController::class, 'updateStatus'])->name('contact-inquiries.update-status');
        Route::delete('contact-inquiries/{inquiry}', [\App\Http\Controllers\Admin\ContactInquiryController::class, 'destroy'])->name('contact-inquiries.destroy');
        
        // Pages management
        Route::resource('pages', \App\Http\Controllers\Admin\PageController::class);
    });
});

require __DIR__.'/auth.php';
