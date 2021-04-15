<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PaymentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('payments')->insert([
            'name' => 'efectivo',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
