<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSClipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_clips', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('sclip_id');
            $table->integer('user_id');
            $table->string('title');
            $table->string('content');
            $table->string('link');
            $table->string('thumbnail');
            $table->integer('view');
            $table->integer('love');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('s_clips');
    }
}
