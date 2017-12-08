<?php

use Illuminate\Database\Seeder;
use App\Word;

class WordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $words = [
            [
                "name" => "One #1",
                "level" => 1,
                "categories" => [1, 2, 3]
            ],
            [
                "name" => "One #2",
                "level" => 2,
                "categories" => [1, 2]
            ],
            [
                "name" => "One #3",
                "level" => 3,
                "categories" => [1]
            ]
        ];

        foreach($words as $w) {
            $word = new Word;
            $word->name = $w["name"];
            $word->level = $w["level"];
            $word->save();

            $word->category()->attach($w["categories"]);
        }
    }
}
