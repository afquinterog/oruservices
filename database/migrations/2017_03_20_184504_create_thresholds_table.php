<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateThresholdsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thresholds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('server_id')->unsigned();
            $table->string('metric', 50);
            $table->integer('limit');
            $table->string('message', 200)->nullable();
            $table->timestamps();
            
            $table->foreign('server_id')->references('id')->on('servers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('thresholds');
    }
}
