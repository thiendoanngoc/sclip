<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = ['sclip_id', 'user_id', 'note', 'created_at', 'updated_at'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
