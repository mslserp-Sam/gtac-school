<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Models\ContactInquiry;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function store(StoreContactInquiryRequest $request)
    {
        ContactInquiry::create($request->validated());

        return back()->with('success', 'Thank you for your inquiry! We will get back to you soon.');
    }
}

