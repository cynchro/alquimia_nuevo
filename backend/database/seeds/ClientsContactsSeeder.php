<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ClientsContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clientsContact')->insert([
            'client_id' => 1,
            'name' => 'juan encargado',
            'email' => 'email@email.com',
            'phone_number' => 01115256325,
            'address' => 'avenita test',
            'city' => 'Ciudad',
            'ruc' => 123456789,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
