<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = ['name', 'level'];
    public function categories() {
        return $this->belongsToMany("App\Category", "word_categories");
    }
}
