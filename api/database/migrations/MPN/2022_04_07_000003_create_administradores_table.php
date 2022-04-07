<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateAdministradoresTable extends Migration
{
    public function up()
    {
        Schema::create('Administradores', function ($table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedInteger('codEmpresa');
            $table->string('username', 100)->unique();
            $table->string('password', 100);

            $table->string('cadastradoPor', 100);
            $table->string('atualizadoPor', 100);
            $table->string('deletadoPor', 100)->nullable();

            $table->foreign('codEmpresa')->references('codEmpresa')->on('Empresas');
        });
    }

    public function down()
    {
    }
}
