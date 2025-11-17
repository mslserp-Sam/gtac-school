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
            $table->string('full_name')->nullable()->after('name');
            $table->string('contact_number')->nullable()->after('phone');
            $table->text('exact_address')->nullable()->after('contact_number');
            $table->string('working_industry')->nullable()->after('exact_address');
            $table->string('civil_status')->nullable()->after('working_industry');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_inquiries', function (Blueprint $table) {
            $table->dropColumn(['full_name', 'contact_number', 'exact_address', 'working_industry', 'civil_status']);
        });
    }
};
