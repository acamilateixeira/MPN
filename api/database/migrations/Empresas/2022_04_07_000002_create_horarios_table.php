<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateHorariosTable extends Migration
{
    public function up()
    {
        Schema::create('Horarios', function ($table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedInteger('codEmpresa');
            $table->dateTime('hora');
            $table->unsignedBigInteger('idServico');

            $table->string('cadastradoPor', 100);
            $table->string('atualizadoPor', 100);
            $table->string('deletadoPor', 100)->nullable();

            $table->foreign('codEmpresa')->references('codEmpresa')->on('Empresas');
            $table->foreign('idServico')->references('id')->on('Servicos');
        });
    }

    public function down()
    {
    }
}
