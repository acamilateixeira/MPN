<?php

namespace App;

use App\Cliente;
use App\Empresa;
use App\Horario;
use App\Servico;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agenda extends Model
{

    use SoftDeletes;

    protected $table = 'Agendas';
    protected $fillable = [
        'idCliente',
        'idHorario',
        'codEmpresa',
        'idStatus',
        'cadastradoPor',
        'atualizadoPor',
        'deletadoPor',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'idCliente');
    }

    public function horario()
    {
        return $this->belongsTo(Horario::class, 'idHorario');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'codEmpresa');
    }

    public function servicos()
    {
        return $this->belongsToMany(Servico::class, 'Agenda', 'idHorario', 'idServico');
    }
}
