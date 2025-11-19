<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="TESDA-accredited training and assessment center. Explore our courses!">

        <title inertia>GTAC – Genesis Training & Assessment Center</title>
        
        <!-- Open Graph Meta for Social Sharing -->
        <meta property="og:title" content="GTAC – Genesis Training & Assessment Center">
        <meta property="og:description" content="TESDA-accredited training and assessment center. Explore our courses!">
        <meta property="og:image" content="https://genesis-tac.com/storage/images/gtacLogo.jpg">
        <meta property="og:url" content="https://genesis-tac.com">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="GTAC – Genesis Training & Assessment Center">

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="GTAC – Genesis Training & Assessment Center">
        <meta name="twitter:description" content="TESDA-accredited training and assessment center. Explore our courses!">
        <meta name="twitter:image" content="https://genesis-tac.com/storage/images/gtacLogo.jpg">
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.bunny.net/css?family=montserrat:400,500,600,700,800,900&display=swap" rel="stylesheet" />
        <link rel="icon" href="{{ asset('storage/images/gtacLogo.jpg') }}" type="image/x-icon">
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
