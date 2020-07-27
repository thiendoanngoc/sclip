<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['user_id', 'sclip_id', 'body', 'created_at'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
