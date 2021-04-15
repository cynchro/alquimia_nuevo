<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SalesPaymentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('salesPayments')->insert([
            'sale_id' => 1,
            'user_id' => 1,
            'payment' => '8.00',
            'comments' => 'comentarios de test',
            'dues' => '2.00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
