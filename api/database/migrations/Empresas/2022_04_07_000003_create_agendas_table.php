<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateAgendasTable extends Migration
{
    public function up()
    {
        Schema::create('Agendas', function ($table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedInteger('codEmpresa');
            $table->unsignedBigInteger('idHorario');
            $table->unsignedBigInteger('idCliente');
            $table->unsignedBigInteger('idStatus');

            $table->string('cadastradoPor', 100);
            $table->string('atualizadoPor', 100);
            $table->string('deletadoPor', 100)->nullable();

            $table->foreign('codEmpresa')->references('codEmpresa')->on('Empresas');
            $table->foreign('idCliente')->references('id')->on('Clientes');
            $table->foreign('idHorario')->references('id')->on('Horarios');
            $table->foreign('idStatus')->references('id')->on('Status');
        });
    }

    public function down()
    {
    }
}
