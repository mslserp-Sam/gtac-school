<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Models\ContactInquiry;
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

        // Ensure "name" field always has value (DB requirement)
        if (isset($data['full_name']) && !isset($data['name'])) {
            $data['name'] = $data['full_name'];
        }

        // Ensure "email" field is populated (DB requirement)
        if (empty($data['email']) && !empty($data['email_address'])) {
            $data['email'] = $data['email_address'];
        }

        // Save to database
        ContactInquiry::create($data);

        // Submit to Google Forms
        $googleFormUrl = env('GOOGLE_FORM_URL');

        if ($googleFormUrl) {
            try {
                $this->submitToGoogleForm($googleFormUrl, $data);
            } catch (\Exception $e) {
                \Log::error('Failed to submit to Google Form: ' . $e->getMessage());
            }
        } else {
            \Log::warning('GOOGLE_FORM_URL is not set. Skipping Google Form submission.');
        }

        return back()->with('success', 'Thank you for your inquiry! We will get back to you soon.');
    }

    /**
     * Submit form data to Google Forms
     */
    private function submitToGoogleForm($formUrl, $data)
    {
        \Log::info('Submitting to Google Form', ['url' => $formUrl, 'data' => $data]);

        // Extract Google Form ID
        preg_match('/\/d\/e\/([a-zA-Z0-9-_]+)\//', $formUrl, $matches);

        if (!isset($matches[1])) {
            \Log::error('Invalid Google Form URL format', ['url' => $formUrl]);
            throw new \Exception('Invalid Google Form URL format.');
        }

        $formId = $matches[1];
        $submitUrl = "https://docs.google.com/forms/d/e/{$formId}/formResponse";

        // Correct Google Form entry IDs (your working IDs)
        $entryIds = [
            'entry.1532759976' => $data['email'] ?? $data['email_address'] ?? '', // Email Address
            'entry.380246004'  => $data['interested_course'] ?? '',             // Course
            'entry.1059127739' => $data['full_name'] ?? '',                     // Full Name
            'entry.458916710'  => $data['contact_number'] ?? '',                // Contact Number
            'entry.661506845'  => $data['working_industry'] ?? '',              // Working Experience (optional)
            'entry.1385080086' => $data['educational_background'] ?? '',        // Educational Background (reusing exact_address ID)
        ];

        // Remove empty fields (Google accepts partial submissions if non-required fields exist)
        $entryIds = array_filter($entryIds, fn($v) => $v !== "");

        \Log::info('Google Form Payload', ['submitUrl' => $submitUrl, 'payload' => $entryIds]);

        // Submit to Google Form
        $response = Http::asForm()
            ->timeout(10)
            ->post($submitUrl, $entryIds);

        \Log::info('Google Form Response', [
            'status' => $response->status(),
            'body' => $response->body()
        ]);

        return $response->status() === 200;
    }
}