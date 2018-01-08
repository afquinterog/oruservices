<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\User;
use App\Models\Servers\Server;
use App\Models\Servers\Category;
use App\Models\Servers\Metric;

class ServerTest extends TestCase
{

		use DatabaseMigrations;

		protected $servers;

		public function setUp()
    {
        parent::setUp();
        $servers = factory( Server::class , 4 )->create();
        $servers->each( function($server){
        	factory( Metric::class)->create([
        		'server_id' => $server->id
        	]);
        });

        $this->servers = $servers;

        //$categories = factory(Category::class, 10)->create();
    }


    /**
     * @test
     * User can access the categories end point
     *
     * @return void
     */
    public function a_user_can_get_server_categories()
    {
    		$user = factory( User::class )->create();
    		$category = factory(Category::class)->create();
    		
        $response = $this->actingAs($user)
        								 ->json('GET', '/server/categories');
                         
        $response
            ->assertStatus(200)
            ->assertSee( $category->description);
    }

    /**
     * @test 
     * User can access the server list
     */
    public function a_user_can_get_the_server_list(){
    	$user = factory( User::class )->create();

    	$response = $this->actingAs($user)
        								 ->json('GET', '/servers');

      // $response
      //       ->assertStatus(200)
      //       ->assertSee( $this->servers->first()->name );

    }
}











