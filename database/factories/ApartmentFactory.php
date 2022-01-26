<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Apartment;
use Faker\Generator as Faker;

$factory->define(Apartment::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'units' => $faker->numberBetween(10,30),
        'location' => $faker->streetName

    ];
});
