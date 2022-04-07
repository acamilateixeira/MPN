<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'Empresa';
    protected $fillable = [
        'nomeRazaoSocial',
        'email',
        'telefone',
        'acesso',
        'codEmpresa',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];
}
