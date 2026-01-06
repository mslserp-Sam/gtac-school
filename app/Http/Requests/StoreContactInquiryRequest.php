<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactInquiryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|max:255',
            'interested_course' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:255',
            'email_address' => 'nullable|email|max:255',
            'educational_background' => 'required|string|max:255',
            'working_industry' => 'nullable|string|max:255',
            // Removed fields (kept nullable for backward compatibility)
            'has_driver_license' => 'nullable|string|in:yes,no',
            'exact_address' => 'nullable|string',
            'civil_status' => 'nullable|string|max:255',
            // Keep for backward compatibility
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ];
    }
    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        \Log::error('Validation failed', $validator->errors()->toArray());
        parent::failedValidation($validator);
    }
}

