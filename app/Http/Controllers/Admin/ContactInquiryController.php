<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactInquiryController extends Controller
{
    public function index()
    {
        $inquiries = ContactInquiry::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/ContactInquiries/Index', [
            'inquiries' => $inquiries,
        ]);
    }

    public function updateStatus(Request $request, ContactInquiry $inquiry)
    {
        $request->validate([
            'status' => 'required|in:new,read,responded',
        ]);

        $inquiry->update(['status' => $request->status]);

        return back()->with('success', 'Status updated successfully.');
    }

    public function destroy(ContactInquiry $inquiry)
    {
        $inquiry->delete();

        return redirect()->route('admin.contact-inquiries.index')->with('success', 'Inquiry deleted successfully.');
    }
}

