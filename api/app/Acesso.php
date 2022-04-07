<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Acesso extends Model
{

    use SoftDeletes;

    protected $table = 'Acessos';
    protected $fillable = [
        'descricao',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];
}
