<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasTable extends Migration
{
    public function up()
    {
        Schema::create('Empresas', function ($table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->string('nomeRazaoSocial', 100);
            $table->integer('codEmpresa')->unique();
            $table->string('email', 100);
            $table->string('telefone', 100);
            $table->unsignedBigInteger('idAcesso');

            $table->string('cadastradoPor', 100);
            $table->string('atualizadoPor', 100);
            $table->string('deletadoPor', 100)->nullable();

            $table->foreign('idAcesso')->references('id')->on('Acessos');
        });
    }

    public function down()
    {
    }
}
