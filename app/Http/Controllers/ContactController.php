<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function store(StoreContactInquiryRequest $request)
    {
        $data = $request->validated();
        // Make sure DB 'name' column gets something (map from full_name)
        if (isset($data['full_name']) && !isset($data['name'])) {
            $data['name'] = $data['full_name'];
        }
        // Save to database
        ContactInquiry::create($data);

        // Submit to Google Forms if URL is configured
        $googleFormUrl = env('GOOGLE_FORM_URL');
        if ($googleFormUrl) {
            try {
                $this->submitToGoogleForm($googleFormUrl, $data);
            } catch (\Exception $e) {
                // Log error but don't fail the request
                \Log::error('Failed to submit to Google Form: ' . $e->getMessage());
            }
        }

        return back()->with('success', 'Thank you for your inquiry! We will get back to you soon.');
    }

    /**
     * Submit form data to Google Forms
     * 
     * SETUP INSTRUCTIONS:
     * 1. Create a Google Form with the following fields (in order):
     *    - Full Name (Short answer)
     *    - Contact Number (Short answer)
     *    - Exact Address (Paragraph)
     *    - Email Address (Short answer)
     *    - Working Industry (Short answer)
     *    - Civil Status (Multiple choice or Short answer)
     * 
     * 2. Get the form URL: https://docs.google.com/forms/d/e/{FORM_ID}/viewform
     * 
     * 3. To find entry IDs:
     *    - Open your Google Form
     *    - Right-click and "Inspect" the page
     *    - Look for input fields with name attributes like "entry.123456789"
     *    - Or use this method: View page source, search for "entry."
     * 
     * 4. Add to .env file:
     *    GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
     * 
     * 5. Update the entry IDs below to match your Google Form's entry IDs
     */
    private function submitToGoogleForm($formUrl, $data)
    {
        // Extract form ID from Google Form URL
        // Google Forms URL format: https://docs.google.com/forms/d/e/{FORM_ID}/viewform
        preg_match('/\/d\/e\/([a-zA-Z0-9-_]+)\//', $formUrl, $matches);
        
        if (!isset($matches[1])) {
            throw new \Exception('Invalid Google Form URL format. Expected: https://docs.google.com/forms/d/e/{FORM_ID}/viewform');
        }

        $formId = $matches[1];
        $submitUrl = "https://docs.google.com/forms/d/e/{$formId}/formResponse";

        // Map our fields to Google Form entry IDs
        // Based on Google Form entry IDs from the form submission
        $entryIds = [
            'entry.1838105934' => $data['has_driver_license'] ?? '', // Do you have a valid driver's license?
            'entry.380246004' => $data['interested_course'] ?? '', // Course/Qualification
            'entry.1059127739' => $data['full_name'] ?? '', // Full Name
            'entry.458916710' => $data['contact_number'] ?? '', // Contact Number
            'entry.1532759976' => $data['email'] ?? $data['email_address'] ?? '', // Email
            'entry.1385080086' => $data['exact_address'] ?? '', // Address
            'entry.1410028182' => $data['civil_status'] ?? '', // Civil Status
            'entry.661506845' => $data['working_industry'] ?? '', // Industry
        ];

        // Filter out empty entries
        $entryIds = array_filter($entryIds, function($value) {
            return !empty($value);
        });

        // Submit to Google Forms
        // Note: Google Forms doesn't return a standard success response
        // A 200 status usually means the submission was accepted
        $response = Http::asForm()->timeout(10)->post($submitUrl, $entryIds);

        // Google Forms returns 200 even on success, so we consider it successful
        return $response->status() === 200;
    }
}

