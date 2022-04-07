<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateServicosTable extends Migration
{
    public function up()
    {
        Schema::create('Servicos', function ($table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->string('descricao', 100);
            $table->unsignedInteger('codEmpresa');

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
