<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SuppliersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('suppliers')->insert([
            'name' => 'empresa test',
            'email' => 'empresa@email.com',
            'phone_number' => 01115256325,
            'address' => 'avenida test',
            'city' => 'Ciudad',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
