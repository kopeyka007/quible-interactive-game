<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new Role();
        $admin->name         = 'admin';
        $admin->display_name = 'Admin';
        $admin->description  = '';
        $admin->save();
        
        $gamer = new Role();
        $gamer->name         = 'gamer';
        $gamer->display_name = 'Gamer';
        $gamer->description  = '';
        $gamer->save();
    }
}
