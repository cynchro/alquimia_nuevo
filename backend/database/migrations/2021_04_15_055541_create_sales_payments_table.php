<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salesPayments', function (Blueprint $table) {
            $table->id();
            $table->integer('sale_id');
            $table->integer('user_id');
            $table->decimal('payment');
            $table->string('comments');
            $table->decimal('dues');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salesPayments');
    }
}
