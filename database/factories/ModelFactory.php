<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Models\Servers\Category::class, function(Faker\Generator $faker){
	return [
		'description' => $faker->colorName,
		'color' => $faker->hexcolor
	];
});

$factory->define(App\Models\Servers\Metric::class, function(Faker\Generator $faker){
	return [
		'cpu' => $faker->numberBetween(0, 100),
		'memory' => $faker->numberBetween(0, 100),
		'memory_cache' => $faker->numberBetween(0, 100),
		'disk' => $faker->numberBetween(0, 100),
		'connections' => $faker->numberBetween(0, 500),
		'ips' => $faker->numberBetween(0, 300)
	];
});

$factory->define(App\Models\Servers\Server::class, function(Faker\Generator $faker){

		$category = factory(App\Models\Servers\Category::class)->create();

		return [
			'name' => $faker->name,
			'description' => $faker->paragraph(1),
			'status' => 1,
			'host' => $faker->ipv4,
			'created_at' => $faker->datetime,
			'updated_at' => $faker->datetime,
			'category_id' => $category->id
		];
});