<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateClientesTable extends Migration
{
    public function up()
    {
        Schema::create('Clientes', function ($table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->string('username', 100)->unique();
            $table->string('nome', 100);
            $table->string('email', 100)->unique();
            $table->string('telefone', 100);
            $table->string('password', 100);

            $table->string('cadastradoPor', 100);
            $table->string('atualizadoPor', 100);
            $table->string('deletadoPor', 100)->nullable();
        });
    }

    public function down()
    {
    }
}
