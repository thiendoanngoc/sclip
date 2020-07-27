<?php

use Illuminate\Database\Seeder;
use App\SClip;

class SClipsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=1; $i < 10; $i++) {
            SClip::create([
                'sclip_id' => str_random(10),
                'user_id' => 1,
                'title' => str_random(10),
                'content' => str_random(30),
                'link' => 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
                'thumbnail' => 'https://p16-tiktokcdn-com.akamaized.net/obj/v0201/42af03553d77477ebfd4712f231249c4',
                'view' => mt_rand(1000000000, 9999999999)
            ]);
        }
    }
}
