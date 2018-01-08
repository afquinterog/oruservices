<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('server_id')->unsigned();
            $table->string('name', 80);
            $table->string('repo', 150);
            $table->string('repo_secure', 150);
            $table->string('branch', 50);
            $table->dateTime('last_time_deployed');
            $table->string('deploy_command');
            $table->string('deploy_task'); 
            $table->string('route',100);  
            $table->integer('automatic_deploy')->default(0);
            $table->integer('new_versions')->default(0);
            $table->string('before_script');
            $table->string('deployment_type', 50);
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
        Schema::dropIfExists('applications');
    }
}
