<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'Cliente';
    protected $fillable = [
        'nome',
        'email',
        'telefone',
        'codEmpresa',
        'password',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'codEmpresa');
    }
}
