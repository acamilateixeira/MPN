<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsServicosTable extends Migration
{
    public function up()
    {
        Schema::table('Servicos', function (Blueprint $table) {
            $table->decimal('valor', 10, 2);
            $table->string('detalhes', 500)->nullable();
        });
    }

    public function down()
    {
    }
}
