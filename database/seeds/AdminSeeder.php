<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User;
        $admin->name = "Admin";
        $admin->email = "admin@admin.com";
        $admin->password = bcrypt("12345678");
        $admin->save();

        $admin->attachRole(Role::where("name", "admin")->first());        
    }
}
