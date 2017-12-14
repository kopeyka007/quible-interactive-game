<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User;
        $admin->name = "Den";
        $admin->email = "den@dee.com";
        $admin->password = bcrypt("12345678");
        $admin->save();

    }
}
