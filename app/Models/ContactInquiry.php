<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactInquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'full_name',
        'email',
        'email_address',
        'has_driver_license',
        'interested_course',
        'phone',
        'contact_number',
        'exact_address',
        'working_industry',
        'educational_background',
        'civil_status',
        'subject',
        'message',
        'status',
    ];
}

