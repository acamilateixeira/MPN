<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Servico extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'Servico';
    protected $fillable = [
        'descricao',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];
}
