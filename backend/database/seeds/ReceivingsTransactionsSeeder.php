<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class ReceivingsTransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('receivingTransactions')->insert([
            'products_id' => 1,
            'selling_price' => '10.00',
            'quantity' => 100,
            'total' => '1500',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
