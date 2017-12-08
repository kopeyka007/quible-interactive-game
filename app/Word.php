<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    public function category() {
        return $this->belongsToMany("App\Category", "word_categories", "word_id", "category_id");
    }
}
