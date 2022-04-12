<?php

namespace App;

use App\Empresa;
use App\Servico;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Horario extends Model
{

    use SoftDeletes;

    protected $table = 'Horarios';
    protected $fillable = [
        'hora',
        'idServico',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
        'codEmpresa',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'codEmpresa');
    }

    public function servicos()
    {
        return $this->belongsTo(Servico::class, 'idServico');
    }

    public function agendas()
    {
        return $this->hasMany(Agenda::class, 'id', 'idHorario');
    }
}
