<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
       Schema::defaultStringLength(191);


        if ( \App::environment('DEBUG')) {
            //Debug sql queries
            \Illuminate\Support\Facades\DB::listen(function ($query) {
            echo $query->sql;
            echo $query->time;
            //var_dump($query);
            });    
        }
        
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
         //Bind the Server Repository
        $this->app->bind(
            'App\Models\Interfaces\ServerRepository',
            'App\Models\Services\ServerService'
        );

    }
}
