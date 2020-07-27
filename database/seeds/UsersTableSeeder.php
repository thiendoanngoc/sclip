<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'phutruongck',
            'email' => 'phutruongck@gmail.com',
            'password' => Hash::make('12345678'),
            'fullname' => 'Trương Phú Trường',
            'avatar' => '/images/user.svg'
        ]);

        // for ($i=0; $i < 10; $i++) {
        //     User::create([
        //         'name' => str_random(6),
        //         'email' => str_random(6).'@gmail.com',
        //         'password' => Hash::make('12345678'),
        //         'fullname' => str_random(10)
        //     ]);
        // }
    }
}
