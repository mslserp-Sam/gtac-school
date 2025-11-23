<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contact_inquiries', function (Blueprint $table) {
            $table->string('has_driver_license')->nullable()->after('email');
            $table->string('interested_course')->nullable()->after('has_driver_license');
            $table->string('email_address')->nullable()->after('interested_course');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_inquiries', function (Blueprint $table) {
            $table->dropColumn(['has_driver_license', 'interested_course', 'email_address']);
        });
    }
};
