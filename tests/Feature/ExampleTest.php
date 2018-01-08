<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\User;
use App\Models\Servers\Server;


class ExampleTest extends TestCase
{

    use DatabaseMigrations;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
    
        
    }

    public function testUserCanListServers(){
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)
                         ->withSession(['foo' => 'bar'])
                         ->get('/');

    }


}



