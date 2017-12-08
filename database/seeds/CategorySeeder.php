<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            "One #1",
            "One #2",
            "One #3",
        ];

        foreach($categories as $c) {
            $cat = new Category;
            $cat->name = $c;
            $cat->save();
        }
    }
}
