<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agenda extends Model
{

    use SoftDeletes;

    protected $table = 'Status';
    protected $fillable = [
        'descricao',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];
}
