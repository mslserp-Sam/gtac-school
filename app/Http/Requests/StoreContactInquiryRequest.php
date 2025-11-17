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
            'full_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:255',
            'exact_address' => 'required|string',
            'email' => 'required|email|max:255',
            'working_industry' => 'required|string|max:255',
            'civil_status' => 'required|string|max:255',
            'name' => 'nullable|string|max:255', // Keep for backward compatibility
            'phone' => 'nullable|string|max:255', // Keep for backward compatibility
            'subject' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ];
    }
}

