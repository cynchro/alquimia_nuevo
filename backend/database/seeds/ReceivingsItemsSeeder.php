<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReceivingsItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('receivingItems')->insert([
            'receiving_id' => 1,
            'products_id' => 1,
            'selling_price' => '8.00',
            'quantity' => '1.50',
            'total' => '2.00',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
