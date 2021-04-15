<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'item' => 'nombre del producto',
            'description' => 'descripcion del producto',
            'barcode' => 01115256325,
            'china' => '1.50',
            'uy' => '2.00',
            'may' => '5.00',
            'stock' => 100,
            'stock_min' => 5,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
