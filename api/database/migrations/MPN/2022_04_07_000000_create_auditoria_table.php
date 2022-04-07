<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateAuditoriaTable extends Migration
{
    public function up()
    {
        Schema::create('Auditoria', function ($table) {
            $table->id();

            $table->string('username');
            $table->integer('codEmpresa');
            $table->datetime('tokenGeradoEm');
            $table->datetime('tokenRevogadoEm');
        });
    }

    public function down()
    {
    }
}
