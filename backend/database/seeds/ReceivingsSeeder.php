<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReceivingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('receivings')->insert([
            'suppliers_id' => '1',
            'payments_id' => '1',
            'total' => '8.00',
            'payments' => '1.50',
            'dues' => '2.00',
            'user_id' => '1',
            'comments' => 'comentarios test',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
