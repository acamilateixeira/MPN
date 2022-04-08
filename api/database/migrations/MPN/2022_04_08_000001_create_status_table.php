<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateStatusTable extends Migration
{
    public function up()
    {
        Schema::create('Status', function ($table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->string('descricao', 100);

            $table->string('cadastradoPor', 100);
            $table->string('atualizadoPor', 100);
            $table->string('deletadoPor', 100)->nullable();
        });
    }

    public function down()
    {
    }
}
