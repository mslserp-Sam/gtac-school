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
            'has_driver_license' => 'required|string|in:yes,no',
            'interested_course' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:255',
            'email_address' => 'nullable|email|max:255',
            'exact_address' => 'required|string',
            'civil_status' => 'required|string|max:255',
            'working_industry' => 'required|string|max:255',
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

