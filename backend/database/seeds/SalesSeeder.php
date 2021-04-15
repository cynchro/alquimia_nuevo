<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SalesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sales')->insert([
            'customer_id' => 1,
            'user_id' => 1,
            'payment_id' => 1,
            'comments' => 'commentarios de test',
            'status' => 1,
            'discount' => '2.00',
            'total' => '5.00',
            'payment' => '4.00',
            'dues' => '1.00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
