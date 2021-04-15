<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ClientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clients')->insert([
            'name' => 'empresa test',
            'email' => 'empresa@email.com',
            'phone_number' => 01115256325,
            'address' => 'avenida test',
            'city' => 'Ciudad',
            'ruc' => 123456789,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
