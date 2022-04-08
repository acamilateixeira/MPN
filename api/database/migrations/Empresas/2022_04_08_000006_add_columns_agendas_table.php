<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsAgendasTable extends Migration
{
    public function up()
    {
        Schema::table('Agendas', function (Blueprint $table) {
            $table->decimal('valor', 10, 2);
        });
    }

    public function down()
    {
    }
}
