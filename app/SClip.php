<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SClip extends Model
{
    protected $fillable = [
        'sclip_id', 'title', 'content', 'link', 'thumbnail', 'user_id', 'view', 'love'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
