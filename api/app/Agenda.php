<?php

namespace App;

use App\Cliente;
use App\Horario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agenda extends Model
{

    use SoftDeletes;

    protected $table = 'Agendas';
    protected $fillable = [
        'idCliente',
        'idHorario',
        'valor',
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

    public function status()
    {
        return $this->belongsTo(Status::class, 'idStatus');
    }
}
