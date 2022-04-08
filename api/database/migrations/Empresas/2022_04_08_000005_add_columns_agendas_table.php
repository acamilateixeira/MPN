<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsAgendasTable extends Migration
{
    public function up()
    {
        Schema::table('Agendas', function (Blueprint $table) {
            $table->unsignedBigInteger('idStatus');
            $table->foreign('idStatus')->references('id')->on('Status');
        });
    }

    public function down()
    {
    }
}
