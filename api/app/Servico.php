<?php

namespace App;

use App\Agenda;
use App\Empresa;
use App\Horario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Servico extends Model
{

    use SoftDeletes;

    protected $table = 'Servicos';
    protected $fillable = [
        'descricao',
        'valor',
        'detalhes',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
        'codEmpresa',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'codEmpresa', 'codEmpresa');
    }

    public function horarios()
    {
        return $this->hasMany(Horario::class, 'codEmpresa', 'codEmpresa');
    }

    public function agendas()
    {
        return $this->hasMany(Agenda::class, 'codEmpresa', 'codEmpresa');
    }
}
